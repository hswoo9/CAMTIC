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
                    field : "UPPER_BSNS_ID",
                    title : "상위사업ID",
                    width : 100
                },
                {
                    field : "UPPER_BSNS_NM",
                    title : "상위사업명",
                    width : 90
                },
                {
                    field : "DDTLBZ_ID",
                    title : "상세사업ID",
                    width : 90
                },
                {
                    field : "DDTLBZ_NM",
                    title : "상세사업명",
                    width : 90
                },
                {
                    field : "REQST_DE",
                    title : "신청일자",
                    width : 90
                },
                {
                    field : "REQST_MAN_NM",
                    title : "신청자",
                    width : 90
                },
                {
                    title : "첨부파일",
                    width : 70
                }]
        }).data("kendoGrid");
    },


}