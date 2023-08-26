var commonEdu = {

    init : function(){
        commonEdu.dataSet();
        commonEdu.mainGrid();
    },

    dataSet() {
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getCommonEduList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : commonEdu.onDataBound,
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "COMMON_CLASS_TEXT",
                    title: "구분",
                    width: 50
                }, {
                    title: "학습기간",
                    width: 150,
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "EDU_TIME",
                    title: "교육시간",
                    width: 80
                }, {
                    field: "EDU_LOCATION",
                    title: "장소",
                    width: 150
                }, {
                    title: "수료/미수료",
                    width: 80,
                    template: function(row){
                        return row.PART_COUNT+"/"+row.NO_PART_COUNT;
                    }
                }, {
                    title: "진행현황",
                    width: 80,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "계획";
                        }else{
                            return "수료";
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
            const pk = dataItem.COMMON_EDU_SN;
            commonEdu.commonEduReqPop("view", pk);
        });
    },

    commonEduReqPop: function(mode, pk){
        let url = "/Campus/pop/commonEduReqPop.do?mode="+mode;
        if(mode == "view"){
            url += "&pk="+pk;
        }
        const name = "commonEduReqPop";
        const option = "width = 1000, height = 489, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}
