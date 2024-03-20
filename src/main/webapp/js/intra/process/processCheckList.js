var pcList = {

    global : {},


    fn_defaultScript : function (){


        pcList.mainGrid();
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
                    data.empSeq = $("#myEmpSeq").val();
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
            height: 500,
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
                    title: "승인",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-button k-button-solid-info" onclick="open_in_frame(\'' +e.TYPE_URL+ '\')">승인</button>';
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");
    }
}