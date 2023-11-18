var budgetList = {

    global : {
        dropDownDataSource : []
    },

    fn_defaultScript: function (){

        budgetList.global.dropDownDataSource = [
            { text: "진행", value: "1" },
            { text: "종료", value: "2" }
        ]
        customKendo.fn_dropDownList("searchDept", budgetList.global.dropDownDataSource, "text", "value");
        $("#searchDept").data("kendoDropDownList").bind("change", budgetList.gridReload);

        customKendo.fn_datePicker("strDate", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDate", "depth", "yyyy-MM-dd", new Date());


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
                    url: '/mng/getBudgetList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.searchDept = $("#searchDept").val();
                    data.strDate = $("#strDate").val();
                    data.endDate = $("#endDate").val();
                    data.searchKeyword = $("#searchKeyWord").val();
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
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
                    title : "코드",
                    field : "PJT_CD",
                    width: 150
                }, {
                    title : "프로젝트 명",
                    width: 500,
                    template:function (e){
                        return "<a href='javascript:void(0);' style='font-weight: bold' onclick='budgetList.fn_popBudgetDetail(\"" + e.PJT_CD + "\")'>" + e.PJT_NM + "</a>";
                    }
                }, {
                    title : "프로젝트 시작",
                    field : "FR_DT",
                    width: 150,
                    template: function(e){
                        var dt = e.FR_DT.toString().substring(0, 4) + "-" + e.FR_DT.toString().substring(4, 6) + "-" + e.FR_DT.toString().substring(6, 8)
                        return dt
                    }
                }, {
                    title : "프로젝트 종료",
                    field : "TO_DT",
                    width: 150,
                    template: function(e){
                        var dt = e.TO_DT.toString().substring(0, 4) + "-" + e.TO_DT.toString().substring(4, 6) + "-" + e.TO_DT.toString().substring(6, 8)
                        return dt
                    }
                }
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
    }
}