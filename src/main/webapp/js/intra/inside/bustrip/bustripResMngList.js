var bustripResMngList = {
    init: function(){
        bustripResList.dataSet();
        bustripResMngList.mainGrid();
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/bustrip/getBustripReqCheck",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.projectCd = $("#pjt_cd").val();
                    data.busnName = $("#busnName").val();

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.rs;
                },
                total: function (data) {
                    return data.rs.length;
                },
            },
            pageSize: 10,
        });
        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 525,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustripResMngList.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "사업명",
                    width: 200,
                    template : function(row){
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  project + busnName;
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80
                }, {
                    title: "출장지 (경유지)",
                    template: function(row){
                        return row.VISIT_CRM + " (" + row.VISIT_LOC_SUB+")";
                    },
                    width: 160
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 100
                }, {
                    title: "업무차량",
                    template : function(row){
                        if(row.USE_CAR == "Y"){
                            if(row.USE_TRSPT == 1){
                                return "사용 (카니발)";
                            } else if(row.USE_TRSPT == 5){
                                return "사용 (아반떼)";
                            } else if(row.USE_TRSPT == 3){
                                return "사용 (트럭)";
                            }
                            return "사용";
                        } else {
                            return "사용안함";
                        }
                    },
                    width: 100
                }, {
                    title: "여비정산",
                    template : function(row){
                        console.log(row);
                        if(row.RES_STATUS != 30 && row.RES_STATUS != null && row.RES_STATUS != 0){
                            return "-";
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResMngList.popBustripSetExnp('+row.HR_BIZ_REQ_ID+')">여비정산</button>'
                        }
                    },
                    width: 80
                }, {
                    title: "결과보고",
                    template : function(row){
                        if(row.SAVE_YN == "Y"){
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResMngList.popBustripRes('+row.HR_BIZ_REQ_RESULT_ID+', '+row.HR_BIZ_REQ_ID+')">결과보고</button>'
                        } else {
                            return "-";
                        }
                    },
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    popBustripRes : function(e, d) {
        var url = "/bustrip/pop/bustripResultPop.do?hrBizReqResultId="+e+"&hrBizReqId="+d+"&mode=mng";
        var name = "bustripResListPop";
        var option = "width=1200, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    popBustripSetExnp : function (e) {
        var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqId="+e+"&mode=mng";
        var name = "bustripResListPop";
        var option = "width=1700, height=750, scrollbars=no, top=100, left=100, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
