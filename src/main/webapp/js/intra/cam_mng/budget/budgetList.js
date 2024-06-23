var budgetList = {

    global : {
        dropDownDataSource : [],
        now : new Date()
    },

    fn_defaultScript: function (){

        budgetList.global.dropDownDataSource = [
            { text: "진행", value: "1" },
            { text: "종료", value: "2" }
        ]
        customKendo.fn_dropDownList("searchDept", budgetList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", budgetList.gridReload);

        customKendo.fn_datePicker("strDate", "depth", "yyyy-MM-dd", new Date(budgetList.global.now.getFullYear() + '-01-01'));
        customKendo.fn_datePicker("endDate", "depth", "yyyy-MM-dd", new Date(budgetList.global.now.getFullYear() + '-12-31'));


        budgetList.global.dropDownDataSource = [
            { text: "프로젝트 명", value: "PJT_NM" },
            { text: "프로젝트 코드", value: "PJT_CD" },
        ]

        customKendo.fn_dropDownList("searchKeyword", budgetList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);

        budgetList.mainGrid();

    },


    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/g20/getProjectList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.searchDept = $("#searchDept").val();
                    data.pjtFromDate = $("#strDate").val();
                    data.pjtToDate = $("#endDate").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
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
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            excel : {
                fileName : "예산현황 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="budgetList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field : "pjtSeq",
                    title : "코드",
                    width: 150
                }, {
                    field : "pjtName",
                    title : "프로젝트 명",
                    width: 500,
                    template:function (e){
                        return "<a href='javascript:void(0);' style='font-weight: bold' onclick='budgetList.fn_popBudgetDetail(\"" + e.pjtSeq + "\")'>" + e.pjtName + "</a>";
                    }
                }, {
                    field: "pjtFromDate",
                    title: "시작일자",
                    width: 80,
                }, {
                    field: "pjtToDate",
                    title: "종료일자",
                    width: 80,
                }, /*{
                    field: "",
                    title: "",
                    width: 80,
                    template : function(e){
                        return "<button onclick='budgetList.fn_test(\"" + e.pjtSeq + "\")'>TEST</button>";
                    }
                }*/
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_popBudgetDetail: function (pjtCd){
        var url = "/mng/pop/budgetListDetail.do?pjtCd=" + pjtCd;

        var name = "_blank";
        var option = "width = 1800, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    },

    fn_test : function(pjtCd){
        $.ajax({
            url: "/mng/insProjectBudgetStatus",
            data: {
                pjtCd : pjtCd
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function(rs) {

            },
            error: function (e) {
                console.log('error : ', e);
            }
        });
    }
}