var pcList = {

    global : {},


    fn_defaultScript : function (){
        pcList.pageSet();
        pcList.mainGrid();
    },

    pageSet : function (){
        const d = new Date();
        const bd = new Date(d.setMonth(d.getMonth() - 1)); // 이전달
        const bdStr = d.getFullYear() + "-" + ('0' + (bd.getMonth() +  1 )).slice(-2) + "-" + ('0' + bd.getDate()).slice(-2)
        customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", bdStr);
        customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date());

        const statDataSource = [
            { text: "미승인", value: "N" },
            { text: "승인", value: "Y" }
        ]
        customKendo.fn_dropDownList("inspectStat", statDataSource, "text", "value");

        const searchDataSource = [
            { text: "구분", value: "A" },
            { text: "요청부서", value: "B" },
            { text: "요청자", value: "C" }
        ]
        customKendo.fn_dropDownList("searchKeyword", searchDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
    },

    gridReload : function(){
        $("#processMainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid : function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/process/getPsCheckList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#regEmpSeq").val();
                    data.strDe = $("#strDe").val();
                    data.endDe = $("#endDe").val();
                    data.inspectStat = $("#inspectStat").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#processMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 500,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="pcList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "승인함 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "TYPE",
                    title: "구분",
                    width: 200
                }, {
                    field: "SND_DEPT_NAME",
                    title: "요청부서",
                }, {
                    field: "SND_EMP_NAME",
                    title: "요청자",
                }, {
                    field: "REG_DT_F",
                    title: "요청일시"
                }, {
                    field: "PS_STAT",
                    title: "승인",
                    width: 100,
                    template: function(e){
                        if(e.PS_STAT == "N"){
                            return '<button type="button" class="k-button k-button-solid-info" onclick="open_in_frame(\'' +e.TYPE_URL+ '\')">승인</button>';
                        }else{
                            return '승인완료';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");
    }
}