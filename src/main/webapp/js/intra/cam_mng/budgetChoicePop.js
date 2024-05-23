var budgetChoicePop = {

    global: {

    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("fromMonth", 'decade', "yyyy", new Date());

        budgetChoicePop.mainGrid();
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

        $("#budgetChoice").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 650,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns: [
                {
                    field : "",
                    title : "보조비세목코드",
                    width : 80
                },
                {
                    field : "",
                    title : "보조비목명",
                    width : 80
                },
                {
                    field : "",
                    title : "보조세목명",
                    width : 80
                },
                {
                    field : "",
                    title : "보조비목세목설명",
                    width : 300
                }
                ]
        }).data("kendoGrid");
    },


}