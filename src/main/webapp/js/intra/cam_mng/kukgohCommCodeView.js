var kukgohCommCodeView = {

    global: {

    },

    fn_defaultScript: function () {
        kukgohCommCodeView.mainGrid();
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

        $("#kukgohCommCodeGrid").kendoGrid({
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depositList.gridReload()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>'+
                            '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="depositList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }],
            persistSelection : true,
            columns: [
                {
                    field : "CMMN_DETAIL_CODE",
                    title : "코드",
                    width : 100
                },
                {
                    field : "CMMN_DETAIL_CODE_NM",
                    title : "코드명",
                    width : 150
                },
                {
                    field : "CUSTOM_MANAGE1",
                    title : "관리항목1"
                },
                {
                    field : "CUSTOM_MANAGE2",
                    title : "관리항목2"
                },
                {
                    field : "CMMN_CODE_DC",
                    title : "코드설명",
                    width : 180
                },
                {
                    field : "MANAGE_IEM_CN_1",
                    title : "e나라도움 관리항목1"
                },
                {
                    field : "MANAGE_IEM_CN_2",
                    title : "e나라도움 관리항목2"
                },
                {
                    field : "MANAGE_IEM_CN_3",
                    title : "e나라도움 관리항목3"
                },
                {
                    field : "MANAGE_IEM_CN_4",
                    title : "e나라도움 관리항목4"
                },
                {
                    field : "MANAGE_IEM_CN_5",
                    title : "e나라도움 관리항목5"
                },
                {
                    title : "첨부파일",
                    width : 100
                }]
        }).data("kendoGrid");
    },



}