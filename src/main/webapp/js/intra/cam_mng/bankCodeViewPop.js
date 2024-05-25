var bankCodeViewPop = {

    global: {

    },

    fn_defaultScript: function () {
        bankCodeViewPop.mainGrid();
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

        $("#bankCodeView").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            pageSize: 10,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            persistSelection : true,
            columns: [
                {
                    field : "",
                    title : "은행코드",
                    width : 100
                },
                {
                    field : "",
                    title : "은행명",
                    width : 150
                }]
        }).data("kendoGrid");
    },


}