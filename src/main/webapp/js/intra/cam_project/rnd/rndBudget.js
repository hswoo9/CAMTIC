var rndBg = {


    fn_defaultScript : function (){

        rndBg.budgetMainGrid();
    },

    gridReload : function (){
        $("#budgetMainGrid").data("kendoGrid").dataSource.read();
    },

    budgetMainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#pjtSn").val();
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

        $("#budgetMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    template: "#= ++record #",
                    title: "번호",
                    width : 80
                }, {
                    field: "",
                    title: "구분",
                    width: 100
                }, {
                    title: "계정코드",
                    field: "",
                    width: 150
                }, {
                    title: "지원부처(기관)",
                    width: 250,
                    field: ""
                }, {
                    title: "예산항목",
                    field: "",
                    width: 250
                }, {
                    title: "예산액(현금)",
                    field: "",
                    width: 150
                }, {
                    title: "예산액(현물)",
                    field: "",
                    width: 150
                }, {
                    title: "예산액 합계",
                    field: "",
                    footerTemplate: function (e){
                        return "합계 : 0";
                    }
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_popBudgetAdd : function (){
        var data = {
            pjtSn : $("#pjtSn").val()
        }
        var url = "/projectRnd/pop/popBudget.do?pjtSn="+data.pjtSn;

        var name = "_blank";
        var option = "width = 900, height = 420, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


}