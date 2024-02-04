var makeBudget = {

    global : {

    },

    fn_defaultScript: function (){

        customKendo.fn_datePicker("baseYear", "decade", "yyyy", new Date());


        makeBudget.makeBudgetGrid();
    },


    makeBudgetGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: '/budget/getBudgetList',
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.baseYear = $("#baseYear").val();
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

        $("#makeBudgetGrid").kendoGrid({
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="makeBudget.fn_popBudgetDetail()">' +
                            '	<span class="k-button-text">예산등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="makeBudget.gridReload()">' +
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
                    title : "구분",
                    field : "",
                    width: 100
                }, {
                    title : "등록일자",
                    width: 100
                }, {
                    field: "",
                    title: "연도",
                    width: 100,
                }, {
                    field: "",
                    title: "예산액",
                    width: 80,
                }, {
                    field: "",
                    title: "수입결산",
                    width: 80,
                }, {
                    field: "",
                    title: "지출결산",
                    width: 80,
                }, {
                    field: "",
                    title: "이월금",
                    width: 80,
                }, {
                    field: "",
                    title: "전년대비증감",
                    width: 80,
                }, {
                    field: "",
                    title: "마감",
                    width: 80,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function (){
        $("#makeBudgetGrid").data("kendoGrid").dataSource.read();
    },

    fn_popBudgetDetail: function (key){
        var url = "/budget/pop/regMakeBudget.do";

        if(key != "" && key != null){
            url += "?key=" + key;
        }

        var name = "_blank";
        var option = "width = 900, height = 750, top = 100, left = 200, location = no";

        var popup = window.open(url, name, option);
    }
}