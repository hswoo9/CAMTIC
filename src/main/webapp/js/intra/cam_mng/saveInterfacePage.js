var saveInterfacePage = {

    global: {

    },

    fn_defaultScript: function () {
        CKEDITOR.replace('editor', {
            height: 250
        });

        saveInterfacePage.mainGrid();
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

        $("#kukgohInterfaceGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height : 300,
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
                    field : "code",
                    title : "인터페이스 ID",
                },
                {
                    field : "code_kr",
                    title : "인터페이스 명",
                },
                {
                    field : "code_val",
                    title : "배치 시간"
                },
                {
                    title : "다운받기",
                    width : 100
                }],
        }).data("kendoGrid");
    },


}