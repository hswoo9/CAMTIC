var rndDS = {

    fn_defaultScript: function(){

        rndDS.rndDSMainGrid();
    },


    rndDSMainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/projectRnd/getRndDevScheduleList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){

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

        $("#rndDSMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
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
                    title: "코드번호",
                    width: 80
                }, {
                    title: "업무내용",
                    width: 100
                }, {
                    title: "예정일",
                    field: "",
                    width: 180
                }, {
                    title: "처리일",
                    field: "",
                    width: 180
                }, {
                    title: "처리자",
                    field: "",
                    width: 180
                }, {
                    title: "파일명",
                    field: "",
                    width: 180
                }, {
                    title: "비고",
                    field: "",
                    width: 180
                }, {
                    title: "상태",
                    width: 100
                }
            ],

            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },
}