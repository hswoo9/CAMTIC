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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="studyInfo.studyReqPop();">' +
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
                    title: "학습기간",
                    width: 200,
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "EDU_TIME_TOTAL",
                    title: "교육시간",
                    width: 150
                }, {
                    field: "STUDY_LOCATION",
                    title: "장소",
                    width: 300
                }, {
                    title: "진행현황",
                    width: 120,
                    template: function(row){
                        let studyClass = row.STUDY_CLASS_SN;
                        if(studyClass == 1){
                            if(row.STATUS == 0){
                                return "신청서 작성중"
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중"
                            }else if(row.STATUS == 100){
                                return "신청서 제출"
                            }
                        }else if(studyClass == 2){
                            if(row.STATUS == 0){
                                return "신청서 작성중"
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중"
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨"
                            }else if(row.STATUS == 100){
                                return "학습종료"
                            }
                        }else if(studyClass == 3){
                            if(row.STATUS == 0){
                                return "신청서 작성중"
                            }else if(row.STATUS == 10) {
                                return "신청서 승인요청중"
                            }else if(row.STATUS == 30) {
                                return "신청서 반려됨"
                            }else if(row.STATUS == 100){
                                return "OJT 진행중(0회)"
                            }else if(row.STATUS == 101){
                                return "OJT완료"
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
    }
}
