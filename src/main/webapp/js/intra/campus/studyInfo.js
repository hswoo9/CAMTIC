var studyInfo = {
    init: function(){
        studyInfo.pageSet();
        studyInfo.mainGrid();
    },

    pageSet: function(){
        customKendo.fn_datePicker("applyYear", "decade", "yyyy", new Date());
        let studyDataSource = [
            { text: "학습조", value: "1" },
            { text: "전파학습", value: "2" },
            { text: "OJT", value: "3" }
        ]
        customKendo.fn_dropDownList("studyClass", studyDataSource, "text", "value", 2);
        $("#applyYear").attr("readonly", true);
        $("#studyClass").data("kendoDropDownList").bind("change", gridReload);
        $("#applyYear").data("kendoDatePicker").bind("change", gridReload);
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getStudyInfoList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.studyClass = $("#studyClass").val();
                    data.applyYear = $("#applyYear").val();
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
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return'<button type="button" class="k-button k-button-solid-base" onclick=" studyInfo.setStudyInfoDelete();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>'+
                        '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="studyInfo.studyReqPop();">' +
                            '	<span class="k-button-text">학습신청</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: studyInfo.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'studyPk\');"/>',
                    /* template : "<input type='checkbox' id='eduPk#=EDU_INFO_ID#' name='eduPk' class='eduPk' value='#=EDU_INFO_ID#'/>",*/
                    template : function(row){
                        if(row.STATUS == "0"){
                            return "<input type='checkbox' id='studyPk="+row.STUDY_INFO_SN+"' name='studyPk' class='studyPk'  value='"+row.STUDY_INFO_SN+"'>";
                        }
                        return "";
                    },
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "STUDY_CLASS_TEXT",
                    title: "구분",
                    width: 250
                }, {
                    field: "STUDY_NAME",
                    title: "학습명"
                }, {
                    field: "STUDY_NAME",
                    title: "지도자(조장)",
                    template : function (e){
                        if(e.STUDY_CLASS_SN == "2" || e.STUDY_CLASS_SN == "3"){
                            if(e.OJT_READER != "" && e.OJT_READER != null){
                                if(e.COUNT_STUDY_MEMBER == "0" || e.COUNT_STUDY_MEMBER == "-1"){
                                    return e.OJT_READER;
                                }else {
                                    return e.OJT_READER + " 외 " + e.COUNT_STUDY_MEMBER + "명";
                                }
                            } else {
                                return "";
                            }
                        } else {
                            if(e.STUDY_READER != "" && e.STUDY_READER != null){
                                if(e.COUNT_STUDY_MEMBER == "0" || e.COUNT_STUDY_MEMBER == "-1"){
                                    return e.STUDY_READER;
                                }else {
                                    return e.STUDY_READER + " 외 " + e.COUNT_STUDY_MEMBER + "명";
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    width: 100
                }, {
                    title: "학습기간",
                    width: 200,
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "STUDY_LOCATION",
                    title: "교육장소",
                    width: 300
                },{
                    field: "EDU_TIME_TOTAL",
                    title: "학습시간",
                    width: 100,
                    template : function (e){
                        if(e.STUDY_CLASS_SN == "3"){
                            if(e.ST_SUM != "" && e.ST_SUM != null){
                                return e.ST_SUM+"시간";
                            } else {
                                return "0시간";
                            }
                        } else if(e.STUDY_CLASS_SN == "2"){
                            return e.PROPAG_SUM == null ? "0시간" : e.PROPAG_SUM+"시간";
                        }else {
                            if(e.EDU_TIME_TOTAL != "" && e.EDU_TIME_TOTAL != null){
                                return e.EDU_TIME_TOTAL+"시간";
                            } else {
                                return "0시간";
                            }
                        }
                    }
                },  {
                    title: "인정시간",
                    width: 100,
                    template : function (e){
                        if(e.STUDY_CLASS_SN == "1"){
                            if(e.STUDY_TIME == "" || e.STUDY_TIME == null) {
                                return "0시간";
                            }else{
                                return e.STUDY_TIME+"시간";
                            }
                        }else if(e.STUDY_CLASS_SN == "2"){
                            if(e.PROPAG_TIME == "" || e.PROPAG_TIME == null) {
                                return "0시간";
                            }else{
                                return e.PROPAG_TIME+"시간";
                            }
                        }else if(e.STUDY_CLASS_SN == "3"){
                            if(e.OJT_TIME == "" || e.OJT_TIME == null) {
                                return "0시간";
                            }else{
                                return e.OJT_TIME+"시간";
                            }
                        }else{
                            return "0시간";
                        }
                    }
                },

               /* {
                    field: "EDU_TIME_TOTAL",
                    title: "교육시간",
                    width: 150,
                    template : function (e){
                        if(e.STUDY_CLASS_SN == "3"){
                            if(e.ST_SUM != "" && e.ST_SUM != null){
                                return e.ST_SUM;
                            } else {
                                return "0";
                            }
                        } else if(e.STUDY_CLASS_SN == "2"){
                            return e.PROPAG_SUM == null ? "0" : e.PROPAG_SUM;
                        } else{
                            if(e.EDU_TIME_TOTAL != "" && e.EDU_TIME_TOTAL != null){
                                return e.EDU_TIME_TOTAL;
                            } else {
                                return "0";
                            }
                        }
                    }
                },*/ {
                    title: "진행현황",
                    width: 120,
                    template: function(row){
                        let studyClass = row.STUDY_CLASS_SN;
                        if(studyClass == 1){
                            if(row.STATUS == 0){
                                return "신청서 작성중";
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중";
                            }else if(row.STATUS == 100){
                                if(row.ADD_STATUS == "Y"|| row.ADD_STATUS == "C"){
                                    return "학습완료";
                                } else if (row.ADD_STATUS == "S") {
                                    return "이수완료";
                                } else {
                                    return "학습 진행중";
                                }
                            } else if(row.STATUS == 30){
                                return  "신청서 반려됨";
                            }
                        }else if(studyClass == 2){
                            if(row.STATUS == 0){
                                return "신청서 작성중";
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중";
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨";
                            }else if(row.STATUS == 100){
                                if(row.ADD_STATUS == "Y"|| row.ADD_STATUS == "C"){
                                    return "학습완료";
                                } else if (row.ADD_STATUS == "S") {
                                    return "이수완료";
                                } else {
                                    return "학습 진행중";
                                }
                            }
                        }else if(studyClass == 3){
                            if(row.STATUS == 0){
                                return "신청서 작성중";
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중";
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨";
                            }else if(row.STATUS == 100){
                                return "OJT 진행중("+row.ST_CNT+"회)";
                            }else if(row.STATUS == 101){
                                return "OJT완료";
                            }
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        let grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let studyClass = dataItem.STUDY_CLASS_SN;
            if(studyClass == 1){
                studyInfo.studyViewPop("upd", dataItem.STUDY_INFO_SN);
            }else if(studyClass == 2){
                studyInfo.propagViewPop("upd", dataItem.STUDY_INFO_SN);
            }else if(studyClass == 3){
                studyInfo.ojtViewPop("upd", dataItem.STUDY_INFO_SN);
            }
        });
    },

    studyReqPop: function(){
        let url = "/Campus/pop/studyReqPop.do";
        let name = "studyReqPop";
        let option = "width = 1170, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    studyViewPop: function(mode, pk){
        let url = "/Campus/pop/studyViewPop.do?mode="+mode+"&pk="+pk;
        const name = "studyReqPop";
        const option = "width = 920, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    propagViewPop: function(mode, pk){
        let url = "/Campus/pop/propagViewPop.do?mode="+mode+"&pk="+pk;
        const name = "studyReqPop";
        const option = "width = 1200, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    ojtViewPop: function(mode, pk){
        let url = "/Campus/pop/ojtViewPop.do?mode="+mode+"&pk="+pk;
        const name = "ojtViewPop";
        const option = "width = 1200, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    setStudyInfoDelete: function(){
        /*active=N 으로*/
        if(!confirm("학습신청을 취소하시겠습니까?")) {return false;}

        $("input[name=studyPk]:checked").each(function(){
            let dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));

            let data = {
                pk: $(this).val()
            }

            let url = "/campus/setStudyInfoDelete";
            customKendo.fn_customAjax(url, data);
        });
        gridReload();
    }
}

function gridReload(){
    studyInfo.mainGrid();
}