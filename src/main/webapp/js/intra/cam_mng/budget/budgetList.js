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
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            selectable: "row",
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
                    field : "",
                    width: 150
                }, {
                    title : "프로젝트 명",
                    field : "",
                    width: 500
                }, {
                    title : "프로젝트 등록",
                    field : "",
                    width: 150,
                }, {
                    title : "프로젝트 시작",
                    field : "",
                    width: 150,
                }, {
                    title : "프로젝트 종료",
                    field : "",
                    width: 150,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function (){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}