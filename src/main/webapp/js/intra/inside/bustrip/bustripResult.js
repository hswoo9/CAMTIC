var now = new Date();

var bustripResult = {

    init : function(){
        bustripResult.dataSet();
        bustripResult.mainGrid();
    },

    dataSet() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#pjt_cd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "해당없음", value: "0" },
                { text: "연구개발", value: "1" },
                { text: "개발사업", value: "2" },
                { text: "교육사업", value: "3" },
                { text: "일자리사업", value: "4" },
                { text: "지원사업", value: "5" },
                { text: "평생학습", value: "6" },
                { text: "캠스타트업", value: "7" }
            ],
            index : 0,
        });

        customKendo.fn_textBox(["busnName"]);
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "사업명",
                    width: 250,
                    template : function(d){
                        var busnName = "";
                        var project = "";
                        if(d.busn_name != "" && d.busn_name != null && d.busn_name != undefined){
                            busnName = d.busn_name;
                        }

                        if(d.project_cd != "" && d.project_cd != null){
                            project = "(" + d.project + ") ";
                        }
                        return  project + busnName;
                    }
                }, {
                    field: "emp_name",
                    title: "출장자",
                    width: 80
                }, {
                    title: "출장지<br>(경유지)",
                    template: function(d){
                        return d.visit_loc + " → " + d.visit_loc_sub;
                    },
                    width: 120
                }, {
                    title: "출발일시",
                    template: function(d){
                        return d.trip_day_fr + " " + d.trip_time_fr;
                    },
                    width: 100
                }, {
                    title: "복귀일시",
                    template: function(d){
                        return d.trip_day_to + " " + d.trip_time_to;
                    },
                    width: 100
                }, {
                    title: "업무차량",
                    template : function(d){
                        if(d.use_car == "Y"){
                            if(d.use_trspt == 1){
                                return "사용 (카니발)";
                            } else if(d.use_trspt == 5){
                                return "사용 (아반떼)";
                            } else if(d.use_trspt == 3){
                                return "사용 (트럭)";
                            }
                            return "사용";
                        } else {
                            return "사용안함";
                        }
                    },
                    width: 100
                }, {
                    title: "결과보고",
                    template : function(d){
                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResult.popBustripRes('+d.hr_biz_req_id+')">결과보고</button>'
                    },
                    width: 100
                }, {
                    title : "결재",
                    template : function(d){
                        return '<button type="button" class="k-button k-button-solid-base">결재</button>'
                    },
                    width: 100
                }
            ]
        }).data("kendoGrid");
    },

    popBustripRes : function(e) {
        var url = "/bustrip/pop/bustripResultPop.do?hrBizReqId="+e;
        var name = "bustripResultPop";
        var option = "width=1200, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
