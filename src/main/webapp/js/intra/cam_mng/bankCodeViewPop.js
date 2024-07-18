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
                    url : '/kukgoh/getEnaraBankList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.bankNm = $("#tmpBankNm").val()
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

        $("#bankCodeView").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 500,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    opener.parent.$("#BCNC_BANK_CODE_NM").val(dataItem.CMMN_DETAIL_CODE_NM);
                    opener.parent.$("#BCNC_BANK_CODE").val(dataItem.CMMN_DETAIL_CODE)
                    window.close();
                });
            },
            columns: [
                {
                    field : "CMMN_DETAIL_CODE",
                    title : "은행코드",
                    width : 100
                },
                {
                    field : "CMMN_DETAIL_CODE_NM",
                    title : "은행명",
                    width : 150
                }]
        }).data("kendoGrid");
    },


}