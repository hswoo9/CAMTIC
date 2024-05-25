var projectConfigView = {

    global: {

    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("fromMonth", 'decade', "yyyy", new Date());

        projectConfigView.mainGrid();
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

        $("#kukgohPjtConfigGrid").kendoGrid({
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
                    field : "PJT_CD",
                    title : "프로젝트코드",
                    width : 100
                },
                {
                    field : "PJT_NM",
                    title : "프로젝트명",
                    width : 100
                },
                {
                    field : "",
                    title : "사업코드",
                    width : 100,
                    template : function(dataItem){
                        return "<input type='button' class='btnChoice' value='선택' onclick='projectConfigView.fn_btnPjtChoice(this);'>";
                    },
                },
                {
                    field : "",
                    title : "설젱취소",
                    width : 100
                },
                {
                    field : "",
                    title : "상세사업ID",
                    width : 90
                },
                {
                    field : "",
                    title : "상세사업명",
                    width : 90
                },
                {
                    field : "",
                    title : "상위사업명",
                    width : 90
                },
                {
                    field : "",
                    title : "회계연도",
                    width : 90
                },
                {
                    field : "",
                    title : "신청일자",
                    width : 90
                }
               ]
        }).data("kendoGrid");
    },

    fn_btnPjtChoice : function(){
        var url = "/mng/budgetPjtChoicePop.do";
        var name = "budgetChoicePop";
        var option = "width=1200, height=800, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

}