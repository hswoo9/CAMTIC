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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick=" eduInfo.goEduInfoReq();">' +
                            '	<span class="k-button-text">학습신청</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: eduInfo.onDataBound,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
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
                    title: "학습시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 100
                },  {
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 100
                }, {
                    title: "진행현황",
                    width: 180,
                    template: function(row){
                        if(row.STATUS == "0") {
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
                            return "교육취소"
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
            const eduInfoId = dataItem.EDU_INFO_ID;
            eduInfo.eduInfoViewPop(eduInfoId);
        });
    },

    eduInfoViewPop: function(eduInfoId){
        let url = "/Campus/pop/eduInfoViewPop.do?eduInfoId="+eduInfoId;
        const name = "popup";
        const option = "width = 965, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    goEduInfoReq: function(){
        open_in_frame('/Campus/eduReq.do');
    }
}

function gridReload(){
    eduInfo.mainGrid();
}