var rndPM = {


    fn_defaultScript: function (){

        rndPM.pmMainGrid();
    },

    gridReload : function (){
        $("#pmMainGrid").data("kendoGrid").dataSource.read();
    },

    pmMainGrid : function () {
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

        $("#pmMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 300,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                    title: "일자",
                    field: "",
                    width: 150
                }, {
                    title: "항목",
                    width: 250,
                    field: ""
                }, {
                    title: "내역",
                    field: "",
                    width: 250
                }, {
                    title: "입/출금액",
                    field: "",
                    width: 150
                }, {
                    title: "잔액",
                    field: "",
                    width: 150
                }, {
                    title: "지출처",
                    field: "",
                    width: 180
                }, {
                    title: "산출내역",
                    field: "",
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

}