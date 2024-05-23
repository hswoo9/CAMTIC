var openStudyRes = {

    init: function(){
        openStudyRes.dataSet();
        openStudyRes.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_datePicker("eduYear", "decade", "yyyy", new Date());
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOpenStudyInfoList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.eduYear = $("#eduYear").val();
                    data.step = "D";
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            dataBound : openStudyRes.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "OPEN_STUDY_NAME",
                    title: "학습주제"
                }, {
                    field: "REG_EMP_NAME",
                    title: "지도자",
                    width: 80
                }, {
                    title: "구성원",
                    width: 150,
                    template: function(row){
                        let text = row.MEMBER;
                        if(row.MEMBER_COUNT != 0){
                            text += " 외 "+row.MEMBER_COUNT+"명";
                        }
                        return text;
                    }
                }, {
                    title: "학습기간",
                    width: 300,
                    template: function(row){
                        return row.OPEN_STUDY_DT + " " + row.START_TIME + " ~ " + row.END_TIME
                    }
                }, {
                    field: "STUDY_LOCATION",
                    title: "교육장소",
                    width: 300
                },{
                    field: "EDU_TIME",
                    title: "학습시간",
                    width: 80
                }, {
                    title: "인정시간",
                    /*template: "<span>#=STUDY_TIME#시간</span>",*/
                    width: 80
                },{
                    field: "",
                    title: "진행현황",
                    width: 100,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "결과보고서 작성중";
                        }else if(row.STATUS == 10){
                            return "승인요청중";
                        }else if(row.STATUS == 30){
                            return "반려";
                        }else if(row.STATUS == 100){
                            return "학습종료";
                        }else{
                            return "-";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.OPEN_STUDY_INFO_SN;
            openStudyRes.openStudyResPop(pk);
        });
    },

    openStudyResPop : function(pk) {
        let url = "/Campus/pop/openStudyResPop.do?mode=upd&pk="+pk;
        const name = "openStudyResPop";
        const option = "width = 1230, height = 935, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}
