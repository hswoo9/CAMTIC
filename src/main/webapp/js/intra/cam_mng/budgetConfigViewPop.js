var budgetConfigViewPop = {

    global: {

    },

    fn_defaultScript: function () {
        budgetConfigViewPop.mainGrid();
    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    return data;
                }

            },
            pageSize: 10,
        });

        $("#budgetGroupView").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns: [
                {
                    field : "",
                    title : "예산그룹코드",
                    width : 100
                },
                {
                    field : "",
                    title : "예산그룹명",
                    width : 150
                }]
        }).data("kendoGrid");
    },


}