var studyMng = {
    init: function(){
        studyMng.pageSet();
        studyMng.mainGrid();
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
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: studyMng.onDataBound,
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
                        if(row.STATUS == 0){
                            return "신청서 작성중"
                        }else if(row.STATUS == 10) {
                            return "신청서 승인요청중"
                        }else if(row.STATUS == 100){
                            return "신청서 제출"
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
            studyMng.studyViewPop(dataItem.STUDY_INFO_SN);
        });
    },

    studyViewPop: function(pk){
        let url = "";
        if(pk == null || pk == "" || pk == undefined){
            url = "/Campus/pop/studyViewPop.do";
        } else {
            url = "/Campus/pop/studyViewPop.do?mode=mng&studyInfoSn="+pk;
        }
        let name = "studyReqPop";
        let option = "width = 920, height = 900, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}
