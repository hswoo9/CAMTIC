var eduInfo = {
    init: function(){
        eduInfo.dataSet();
        eduInfo.mainGrid();
    },

    dataSet: function(){
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });
        $("#eduYear").data("kendoDatePicker").bind("change", gridReload);
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getEduInfoList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#regEmpSeq").val();
                    data.eduYear = $("#eduYear").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return'<button type="button" class="k-button k-button-solid-error" onclick=" eduInfo.setEduInfoDelete();">' +
                                '	<span class="k-button-text">삭제</span>' +
                                '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick=" eduInfo.goEduInfoReq();">' +
                                '	<span class="k-button-text">학습신청</span>' +
                                '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return'<button type="button" class="k-button k-button-solid-base" onclick=" eduInfo.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "개인학습 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            // dataBound: eduInfo.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'eduPk\');"/>',
                   /* template : "<input type='checkbox' id='eduPk#=EDU_INFO_ID#' name='eduPk' class='eduPk' value='#=EDU_INFO_ID#'/>",*/
                    template : function(row){
                        if(row.STATUS == "0" || row.STATUS == "30" ){
                            return "<input type='checkbox' id='eduPk="+row.EDU_INFO_ID+"' name='eduPk' class='eduPk'  value='"+row.EDU_INFO_ID+"'>";
                        }
                        return "";
                    },
                    width: 50
                }, {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "EDU_FORM_TYPE",
                    title: "학습방법",
                    width: 200,
                    template: function(row){
                        if(row.EDU_FORM_TYPE == "1") {
                            return "교육기관 참가교육";
                        }else if(row.EDU_FORM_TYPE == "2") {
                            return "온라인 학습";
                        }else if(row.EDU_FORM_TYPE == "3") {
                            return "세미나/포럼/학술대회";
                        }else if(row.EDU_FORM_TYPE == "4") {
                            return "박람회/기술대전 참관";
                        }else if(row.EDU_FORM_TYPE == "5") {
                            return "도서학습";
                        }else if(row.EDU_FORM_TYPE == "6") {
                            return "논문/학술지 독서";
                        }else if(row.EDU_FORM_TYPE == "7") {
                            return "국내/외 논문 저술";
                        }else if(row.EDU_FORM_TYPE == "8") {
                            return "직무관련 저술";
                        }else if(row.EDU_FORM_TYPE == "9") {
                            return "국내외 현장견학";
                        }else if(row.EDU_FORM_TYPE == "10") {
                            return "자격증 취득";
                        }else {
                            return "데이터 오류";
                        }
                    }
                },{
                    field: "EDU_NAME",
                    title: "학습명"
                }, {
                    field: "START_DT",
                    title: "학습기간",
                    template: "<span>#=START_DT# ~ #=END_DT#</span>",
                    width: 200
                }, {
                    field: "CARE_LOCATION",
                    title: "교육장소",
                    width: 200,
                    template: function(row){
                        return (row.CARE_LOCATION == null || row.CARE_LOCATION == "undefined") ? "" : row.CARE_LOCATION;
                    }
                }, {
                    field: "LEVEL_ID",
                    title: "목표레벨",
                    width: 100
                }, {
                    field: "TERM_TIME",
                    title: "학습시간",
                    width: 100,
                    template: function(row){
                        const eduTime = row.TERM_TIME;
                        const eduType = row.EDU_FORM_TYPE;
                        let returnText = eduTime+"시간";
                        if(eduType == "7" || eduType == "8"){
                            returnText = "-";
                        }
                        return returnText;
                    }
                },  {
                    field: "REAL_EDU_TIME",
                    title: "인정시간",
                    template: "<span>#=REAL_EDU_TIME#시간</span>",
                    width: 100
                }, {
                    field: "STATUS",
                    title: "진행현황",
                    width: 180,
                    template: function(row){
                        if(row.STATUS == "0" || row.STATUS == "30" ) {
                            return "계획";
                        }else if(row.STATUS == "10") {
                            return "학습신청서 승인요청중";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "1") {
                            return "신청완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "0") {
                            return "결과보고서 작성완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "10") {
                            return "결과보고서 승인요청중";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "N") {
                            return "교육완료";
                        }else if(row.STATUS == "100" && row.RES_STATUS == "100" && row.MNG_CHECK == "Y") {
                            return "이수완료";
                        }else {
                            return "교육취소";
                        }
                    }
                }, {
                    title: "학습신청서",
                    width: 85,
                    template: function(row){
                        let statusText = "";
                        let btnText = "";

                        if(row.STATUS == "0" || row.STATUS == "40" || row.STATUS == "60"){
                            statusText = "작성중";
                            btnText = "k-button-solid-base";
                        } else if(row.STATUS == "10" || row.STATUS == "20" || row.STATUS == "50"){
                            statusText = "결재중";
                            btnText = "k-button-solid-info";
                        } else if(row.STATUS == "30"){
                            statusText = "반려";
                            btnText = "k-button-solid-error";
                        } else if(row.STATUS == "100" || row.STATUS == "101"){
                            statusText = "결재완료";
                            btnText = "k-button-solid-info";
                        } else {
                            return "";
                        }

                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid '+btnText+'" onclick=" eduInfo.eduReqPop('+row.EDU_INFO_ID+', '+row.EDU_FORM_TYPE+');">' +
                            '	<span class="k-button-text">'+statusText+'</span>' +
                            '</button>';
                    }
                }, {
                    title: "결과보고서",
                    width: 85,
                    template: function(row){
                        if(row.STATUS == "100"){
                            let statusText = "";
                            let btnText = "";

                            if(row.RES_STATUS == "0" || row.RES_STATUS == "1" || row.RES_STATUS == "40" || row.RES_STATUS == "60"){
                                statusText = "작성중";
                                btnText = "k-button-solid-base";
                            } else if(row.RES_STATUS == "10" || row.RES_STATUS == "20" || row.RES_STATUS == "50"){
                                statusText = "결재중";
                                btnText = "k-button-solid-info";
                            } else if(row.RES_STATUS == "30"){
                                statusText = "반려";
                                btnText = "k-button-solid-error";
                            } else if(row.RES_STATUS == "100" || row.RES_STATUS == "101"){
                                statusText = "결재완료";
                                btnText = "k-button-solid-info";
                            } else {
                                return "";
                            }

                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid '+btnText+'" onclick="eduInfo.eduResultReqPop('+row.EDU_INFO_ID+', '+row.RES_STATUS+');">' +
                                '	<span class="k-button-text">'+statusText+'</span>' +
                                '</button>';
                        } else {
                            return "";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const RES_STATUS = dataItem.RES_STATUS;

            if(RES_STATUS == "0" || RES_STATUS == "10" || RES_STATUS == "100"){
                const dataItem = grid.dataItem($(this));
                const eduInfoId = dataItem.EDU_INFO_ID;
                eduInfo.eduResultViewPop(eduInfoId);
            }else{
                const dataItem = grid.dataItem($(this));
                const eduInfoId = dataItem.EDU_INFO_ID;
                eduInfo.eduInfoViewPop(eduInfoId);
            }
        });
    },

    eduInfoViewPop: function(eduInfoId){
        let url = "/Campus/pop/eduInfoViewPop.do?eduInfoId="+eduInfoId;
        const name = "popup";
        const option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    eduResultViewPop: function(eduInfoId) {
        let url = "/Campus/pop/eduResultViewPop.do?eduInfoId="+eduInfoId;
        const name = "popup";
        const option = "width = 1000, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    eduReqPop : function(eduInfoId, eduFormType){
        let url = "/Campus/pop/eduReqPop.do?eduInfoId="+eduInfoId+"&eduFormType="+eduFormType;
        const name = "popup";
        const option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    eduResultReqPop: function(eduInfoId, resStatus) {
        var url = "/Campus/pop/eduResultReqPop.do?eduInfoId="+eduInfoId;
        if(resStatus != '1'){
            url += "&mode=upd";
        }

        var name = "_target";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    goEduInfoReq: function(){
        open_in_frame('/Campus/eduReq.do');
    },

    setEduInfoDelete: function(){
            /*active=N 으로*/
            if(!confirm("학습신청을 취소하시겠습니까?")) {return false;}

            $("input[name=eduPk]:checked").each(function(){
                let dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));

                let data = {
                    pk: $(this).val()
                }

                let url = "/campus/setEduInfoDelete";
                customKendo.fn_customAjax(url, data);
            });
            gridReload();
        }

}

function gridReload(){
    eduInfo.mainGrid();
}