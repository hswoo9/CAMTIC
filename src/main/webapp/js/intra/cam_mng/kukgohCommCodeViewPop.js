var kukgohCommCodeViewPop = {

    global: {

    },

    fn_defaultScript: function () {

        customKendo.fn_textBox(["budgetGroup"])

        kukgohCommCodeViewPop.mainGrid();


    },

    mainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/kukgoh/getCmmnCodeList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.cmmnCodeNm = $("#budgetGroup").val();
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
        });

        $("#codeView").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 525,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(e){
                console.log(this);
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    kukgohCommCodeViewPop.dataBound(dataItem);
                });
            },
            columns: [
                {
                    field : "CMMN_CODE",
                    title : "코드",
                    width : 100
                },
                {
                    field : "CMMN_CODE_NM",
                    title : "코드명",
                    width : 150
                }]
        }).data("kendoGrid");
    },


    dataBound: function (m){
        console.log(m)
        opener.parent.$("#cmmnCode").val(m.CMMN_CODE);
        opener.parent.kukgohCommCodeView.mainGrid();
    }

}