var budgetPjtChoicePop = {

    global: {

    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("fromMonth", 'decade', "yyyy", new Date());

        budgetPjtChoicePop.mainGrid();
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

        $("#budgetPjtChoice").kendoGrid({
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
                    title : "사업코드",
                    width : 80
                },
                {
                    field : "",
                    title : "사업명",
                    width : 150
                },
                {
                    field : "",
                    title : "상위사업코드",
                    width : 150
                },
                {
                    field : "",
                    title : "상위사업명",
                    width : 150
                },
                {
                    field : "",
                    title : "신청일자",
                    width : 80
                }
                ]
        }).data("kendoGrid");
    },


}