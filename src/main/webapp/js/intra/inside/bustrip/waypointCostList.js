var waypointList = {

    init : function(){
        waypointList.dataSet();
        waypointList.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/bustrip/getWaypointCostList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="waypointList.waypointCostReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "WAYPOINT_NAME",
                    title: "경유지명"
                }, {
                    title: "거리",
                    template: function(row){
                        return row.DISTANCE+" km";
                    }
                }, {
                    field: "REMARK_CN",
                    title: "비고"
                }, {
                    field: "REG_EMP_NAME",
                    title: "등록자"
                }
            ]
        }).data("kendoGrid");
    },

    waypointCostReqPop : function() {
        const url = "/bustrip/pop/waypointCostReqPop.do";
        const name = "waypointCostReqPop";
        const option = "width=575, height=280, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}
