var g20Project = {


    fn_defaultScript : function (){
        var today = new Date();
        customKendo.fn_datePicker("pjtFromDate", "decade", "yyyy-MM-dd", new Date(today.setFullYear(today.getFullYear(),0,1)));
        customKendo.fn_datePicker("pjtToDate", "decade", "yyyy-MM-dd", new Date(today.setFullYear(today.getFullYear(),11,31)));


        g20Project.mainGrid();
    },

    gridReload : function (){

    },

    mainGrid : function () {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/g20/getProjectList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtFromDate = $("#pjtFromDate").val().replaceAll("-", "");
                    data.pjtToDate = $("#pjtToDate").val().replaceAll("-", "");

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

        $("#mainGrid").kendoGrid({
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
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").dblclick(function (e) {
                    const dataItem = grid.dataItem($(this));
                    // const crmMemSn = dataItem.CRM_MEM_SN;
                    opener.parent.$("#atTrName").val(dataItem.atTrName);
                    opener.parent.$("#bankNumber").val(dataItem.bankNumber);
                    opener.parent.$("#isBusinessLink").val(dataItem.isBusinessLink);
                    opener.parent.$("#pjtDeptName").val(dataItem.pjtDeptName);
                    opener.parent.$("#pjtName").val(dataItem.pjtName);
                    opener.parent.$("#pjtSeq").val(dataItem.pjtSeq);
                    opener.parent.$("#progFg").val(dataItem.progFg);
                    opener.parent.$("#trSeq").val(dataItem.trSeq);
                    opener.parent.$("#uid").val(dataItem.uid);

                    window.close();
                });
            },
            columns: [
               {
                    field: "pjtSeq",
                    title: "구분",
                    width: 200
               }, {
                    title: "프로젝트명",
                    field: "pjtName"
               }
            ],
        }).data("kendoGrid");
    },


}