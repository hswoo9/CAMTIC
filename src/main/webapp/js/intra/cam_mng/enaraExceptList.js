var enaraExceptList = {

    global: {

    },

    fn_defaultScript: function () {
        enaraExceptList.mainGrid();
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

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 700,
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="enaraExceptList.gridReload()">' +
                            '	<span class="k-button-text">전송제외 해제</span>' +
                            '</button>';
                    }
                }],
            persistSelection : true,
            columns: [
                {
                    headerTemplate : function(e){
                        return '<input type="checkbox" id = "checkboxAll">';
                    },
                    template : function(e) {
                        return '<input type="checkbox" class = "mainCheckBox">';
                    },
                    width : 25
                },
                {	field : "GISU_DT",				title : "결의일자",				width : 40 },
                {	field : "RMK_DC",				title : "적요",						width : 160 },
                {	field : "GISU_SQ",				title : "결의번호",				width : 40 },
                {	field : "BG_SQ",				title : "예산순번",				width : 40 },
                {	field : "LN_SQ",				title : "거래처순번",				width : 40 },
                {
                    template : function(data) {
                        return Budget.fn_formatMoney(data.SUM_AMOUNT);
                    },
                    title : "금액",
                    width : 40
                }
            ]
        }).data("kendoGrid");
    },


}