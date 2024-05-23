var budgetConfigView = {

    global: {

    },

    fn_defaultScript: function () {
        budgetConfigView.mainGrid();
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
                parameterMap: function() {

                    return ;
                }

            },
            pageSize: 10
        });

        $("#budgetConfigViewGrid").kendoGrid({
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
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                },
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="budgetConfigView.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            persistSelection : true,
            columns: [
                {
                    field : "",
                    title : "예산코드",
                    width : 100
                },
                {
                    field : "",
                    title : "예산명",
                    width : 100
                },
                {
                    field : "",
                    title : "상위예산명",
                    width : 90
                },
                {
                    field : "",
                    title : "보조비목세목코드",
                    width : 150,
                    template : function(dataItem) {
                        return "<input type='button' id='btnChoice' style='width: 45%;' value='' onclick='budgetConfigView.fn_budgetChoice(this)' class='btnChoice' width='100' />";
                    }
                },
                {
                    title : "설정취소",
                    width : 90,
                    template : function(dataItem) {
                        return "<input type='button' class='btnChoice' value='설정취소' onclick='cnclSetting(this);'>";
                    },
                },
                {
                    field : "",
                    title : "보조비목명",
                    width : 90
                },
                {
                    field : "",
                    title : "보조세목명",
                    width : 90
                },
                {
                    field : "",
                    title : "회계연도",
                    width : 90
                }]
        }).data("kendoGrid");
    },

    fn_reqPopOnen : function(){
        var url = "/mng/budgetConfigViewPop.do";
        var name = "budgetConfigViewPop";
        var option = "width=520, height=650, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_budgetChoice : function(){
        var url = "/mng/budgetChoicePop.do";
        var name = "budgetChoicePop";
        var option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

}