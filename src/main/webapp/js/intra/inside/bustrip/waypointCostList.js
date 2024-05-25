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
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="waypointList.fn_delWayPointCost();">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='wpSn#=HR_WAYPOINT_INFO_SN#' name='wpSn' value='#=HR_WAYPOINT_INFO_SN#' style=\"top: 3px; position: relative\" />",
                    width: 60,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 60
                }, {
                    field: "WAYPOINT_NAME",
                    title: "경유지명",
                    template: function(row){
                        return '<a onclick="waypointList.fn_modWaypointCost(' +  row.HR_WAYPOINT_INFO_SN + ')" style="font-weight: bold; cursor:pointer;">' + row.WAYPOINT_NAME + '</a>';
                    }
                }, {
                    field: "DISTANCE",
                    title: "거리",
                    template: function(row){
                        return row.DISTANCE+" km";
                    }
                }, {
                    field: "REMARK_CN",
                    title: "비고",
                }, {
                    field: "REG_EMP_NAME",
                    title: "등록자",
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=wpSn]").prop("checked", true);
            else $("input[name=wpSn]").prop("checked", false);
        });
    },

    waypointCostReqPop : function() {
        const url = "/bustrip/pop/waypointCostReqPop.do";
        const name = "waypointCostReqPop";
        const option = "width=575, height=280, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    fn_modWaypointCost : function(key){
        const url = "/bustrip/pop/waypointCostReqPop.do?key="+key;
        const name = "waypointCostReqPop";
        const option = "width=575, height=280, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    fn_delWayPointCost : function(){
        if($("input[name='wpSn']:checked").length == 0){
            alert("삭제할 경유지를 선택해주세요.");
            return
        }

        if(!confirm("경유지를 삭제하시겠습니까?\n삭제 후 복구가 불가능합니다.")){
            return;
        }

        var wpSn = "";

        $.each($("input[name='wpSn']:checked"), function(){
            wpSn += "," + $(this).val()
        })

        var data = {
            wpSnArr : wpSn.substring(1)
        }

        var result = customKendo.fn_customAjax("/bustrip/setWaypointCostDelete", data);
        if(result.flag){
            alert("삭제되었습니다.");
            waypointList.mainGrid();
        }
    }
}
