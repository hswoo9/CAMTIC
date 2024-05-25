var rndRPRQ = {


    fn_defaultScript : function (){
        rndRPRQ.payReqMainGrid();
    },

    gridReload : function (){
        $("#payReqMainGrid").data("kendoGrid").dataSource.read();
    },

    payReqMainGrid : function () {
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

        $("#payReqMainGrid").kendoGrid({
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
                    title: "항목",
                    width: 150
                }, {
                    title: "신청건명",
                    field: "",
                    width: 300
                }, {
                    title: "채주",
                    width: 200,
                    field: ""
                }, {
                    title: "현재잔액",
                    field: "",
                    width: 200
                }, {
                    title: "금회신청액",
                    field: "",
                    width: 200
                }, {
                    title: "신청후 잔액",
                    field: "",
                    width: 200
                }, {
                    title: "입금계좌",
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

}