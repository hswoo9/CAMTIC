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
            value : new Date(now.setMonth(now.getMonth() + 1))
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
                    title: "여비정산",
                    template : function(d){
                        console.log(d);
                        if(d.RES_STATUS != 30 && d.RES_STATUS != null && d.RES_STATUS != 0){
                            return "-";
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResult.popBustripSetExnp('+d.hr_biz_req_id+')">여비정산</button>'
                        }
                    },
                    width: 100
                }, {
                    title: "결과보고",
                    template : function(d){
                        if(d.RES_STATUS != 30 && d.RES_STATUS != null && d.RES_STATUS != 0){
                            return "-";
                        } else if(d.EXP_STAT != "N" && d.EXP_STAT != null){
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResult.popBustripRes('+d.HR_BIZ_REQ_RESULT_ID+', '+d.hr_biz_req_id+')">결과보고</button>'
                        } else {
                            return "-";
                        }
                    },
                    width: 100
                }, {
                    title : "결재",
                    template : function(e){
                        if(e.SAVE_YN == "Y"){
                            if(e.RES_STATUS == 0){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripResult.bustripResDrafting(\""+e.hr_biz_req_id+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>상신</span>" +
                                    "</button>";
                            } else if(e.RES_STATUS == 10){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+e.doc_id+"\", \""+e.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                    "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                    "<span class='k-button-text'>회수</span>" +
                                    "</button>";
                            } else if(e.RES_STATUS == 30 || e.RES_STATUS == 40){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.doc_id+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>재상신</span>" +
                                    "</button>";
                            } else if(e.RES_STATUS == 100){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.doc_id+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>열람</span>" +
                                    "</button>";
                            } else{
                                return "-";
                            }
                        } else {
                            return "-"
                        }
                    },
                    width: 100
                }
            ]
        }).data("kendoGrid");
    },

    popBustripRes : function(e, d) {
        var url = "/bustrip/pop/bustripResultPop.do?hrBizReqResultId="+e+"&hrBizReqId="+d;
        var name = "bustripResultPop";
        var option = "width=1200, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    popBustripSetExnp : function (e) {
        var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqId="+e;
        var name = "bustripResultPop";
        var option = "width=1600, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    bustripResDrafting: function(hrBizReqId) {
        $("#hrBizReqId").val(hrBizReqId);
        $("#bustripResDraftFrm").one("submit", function() {
            var url = "/Inside/pop/approvalFormPopup/bustripResApprovalPop.do";
            var name = "bustripResApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Inside/pop/approvalFormPopup/bustripResApprovalPop.do";
            this.method = 'POST';
            this.target = 'bustripResApprovalPop';
        }).trigger("submit");
    }
}
