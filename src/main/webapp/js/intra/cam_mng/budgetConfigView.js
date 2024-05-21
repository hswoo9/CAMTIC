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
            pageSize: 10,
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
                    field : "BGT_CD",
                    title : "예산코드",
                    width : 100
                },
                {
                    field : "BGT_NM",
                    title : "예산명",
                    width : 100
                },
                {
                    field : "HBGT_NM",
                    title : "상위예산명",
                    width : 90
                },
                {
                    field : "ASSTN_EXPITM_TAXITM_CODE",
                    title : "보조비목세목코드",
                    width : 150
                },
                {
                    title : "설정취소",
                    width : 90
                },
                {
                    field : "ASSTN_EXPITM_NM",
                    title : "보조비목명",
                    width : 90
                },
                {
                    field : "ASSTN_TAXITM_NM",
                    title : "보조세목명",
                    width : 90
                },
                {
                    field : "FSYR",
                    title : "회계연도",
                    width : 90
                }]
        }).data("kendoGrid");
    },


}