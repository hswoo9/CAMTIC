var bustripResList = {
    init: function(){
        bustripResList.dataSet();
        bustripResList.mainGrid();
    },

    dataSet: function(){
        now = new Date();
        customKendo.fn_datePicker("start_date", 'month', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 6)));
        customKendo.fn_datePicker("end_date", 'month', "yyyy-MM-dd", new Date());

        $("#pjt_cd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
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
                    data.empSeq = $("#regEmpSeq").val();

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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustripResList.mainGrid()">' +
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
                    title: "결과보고",
                    template : function(row){
                        if(row.STATUS == 100){
                            if(row.HR_BIZ_REQ_RESULT_ID == ""){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes(\'N\', '+row.HR_BIZ_REQ_ID+')">결과보고</button>'
                            }else{
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+row.HR_BIZ_REQ_RESULT_ID+', '+row.HR_BIZ_REQ_ID+')">결과보고</button>'
                            }
                        } else {
                            return "-";
                        }
                    },
                    width: 80
                }, {
                    title : "결재",
                    template : function(row){
                        if(row.EXP_STAT == "100"){
                            if(row.RES_STATUS == 0){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripResList.bustripResDrafting(\""+row.HR_BIZ_REQ_RESULT_ID+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>상신</span>" +
                                    "</button>";
                            } else if(row.RES_STATUS == 10){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+row.RES_DOC_ID+"\", \""+row.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                    "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                    "<span class='k-button-text'>회수</span>" +
                                    "</button>";
                            } else if(row.RES_STATUS == 30 || row.RES_STATUS == 40){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+row.RES_DOC_ID+"\", \""+row.DOC_MENU_CD+"\", \""+row.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>재상신</span>" +
                                    "</button>";
                            } else if(row.RES_STATUS == 100 || row.RES_STATUS == 101){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+row.RES_DOC_ID+"\", \""+row.APPRO_KEY+"\", \""+row.DOC_MENU_CD+"\");'>" +
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
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    popBustripRes : function(e, d) {
        if(e.HR_BIZ_REQ_RESULT_ID == "N"){
            var url = "/bustrip/pop/bustripResultPop.do?hrBizReqId="+d;
        }else{
            var url = "/bustrip/pop/bustripResultPop.do?hrBizReqResultId="+e+"&hrBizReqId="+d;
        }
        var name = "bustripResListPop";
        var option = "width=1200, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    bustripResDrafting: function(hrBizReqResultId) {
        $("#hrBizReqResultId").val(hrBizReqResultId);
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
