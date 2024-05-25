var bustripResList = {
    init: function(){
        bustrip.fn_setPageName();
        bustripResList.pageSet();
        bustripResList.mainGrid();
    },

    pageSet: function(){
        /** 출장기간 */
        bustrip.fn_periodSet();

        /** 출장구분 */
        bustrip.fn_tripCodeSearchSet();

        /** 관련사업 */
        // bustrip.fn_projectSearchSet();
        let projectDataSource = [
                { text: "없음", value: "1" },
                { text: "있음 (종료 이전)", value: "2" },
                { text: "있음 (종료 이후)", value: "3" },
            ]
        customKendo.fn_dropDownList("project", projectDataSource, "text", "value", 1);

        customKendo.fn_textBox(["busnName"]);
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getBustripReqCheck",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data) {
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.tripCode = $("#tripCode").data("kendoDropDownList").value();
                    data.project = $("#project").val();
                    data.busnName = $("#busnName").val();
                    data.empSeq = $("#regEmpSeq").val();
                    return data;
                }
            },
            schema: {
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
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bustripResList.fn_reqRegPopup()">' +
                            '	<span class="k-button-text">지급신청</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (){
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'evalChk\');"/>',
                    template : function(e){
                        if(e.RES_STATUS == 100 || e.RES_STATUS == 101) {
                            return "<input type='checkbox' id='eval_" + e.HR_BIZ_REQ_RESULT_ID + "' name='evalChk' value='" + e.HR_BIZ_REQ_RESULT_ID + "'/>"
                        } else {
                            return '';
                        }
                    },
                    width: 50
                }, {
                    title: "출장구분",
                    width: 80,
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                }, {
                    title: "사업명",
                    width: 200,
                    template: function(row){
                        var busnName = "";
                        var project = "";
                        var endYn = "";
                        if(row.END_YN == 'Y'){
                            endYn = "(종료 이후) ";
                        }
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  endYn + project + busnName;
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 120,
                    template: function(row){
                        if(row.RES_STATUS != null){
                            if(row.COMPANION2 != 0){
                                return row.EMP_NAME + " 외 "+row.COMPANION2+"명";
                            }else{
                                return row.EMP_NAME;
                            }
                        }else{
                            if(row.COMPANION != 0){
                                return row.EMP_NAME + " 외 "+row.COMPANION+"명";
                            }else{
                                return row.EMP_NAME;
                            }
                        }
                    }
                }, {
                    title: "출장지 (경유지)",
                    template: function(row){
                        if(row.VISIT_LOC_SUB != ""){
                            return row.VISIT_CRM + " (" + row.VISIT_LOC_SUB+")";
                        }else{
                            return row.VISIT_CRM;
                        }
                    },
                    width: 160
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 120
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 120
                }, {
                    title: "업무차량",
                    template: function(row){
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
                    width: 120
                }, {
                    title: "운행거리",
                    template: function(row){
                        if(row.MOVE_DST == null){
                            return "-";
                        }
                        return row.MOVE_DST+" km";
                    },
                    width: 80
                }, {
                    title: "개인여비",
                    template: function(row){
                        return "<div style='text-align: right'>"+fn_comma(row.PERSON_TOTAL)+"</div>";
                    },
                    width: 100
                }, {
                    title: "법인카드",
                    template: function(row){
                        return "<div style='text-align: right'>"+fn_comma(row.CORP_TOTAL)+"</div>";
                    },
                    width: 100
                }, {
                    title: "법인차량",
                    template: function(row){
                        return "<div style='text-align: right'>"+fn_comma(row.CAR_TOTAL)+"</div>";
                    },
                    width: 100
                }, {
                    title: "여비",
                    template: function(row){
                        if(row.TOT_COST == null || row.TOT_COST == 0){
                            return "-";
                        }
                        return "<div style='text-align: right'>"+fn_numberWithCommas(row.TOT_COST)+"</div>";
                    },
                    width: 100
                }, {
                    title: "입금예정",
                    template: function(row){
                        return "-";
                    },
                    width: 80
                }, {
                    title: "결과보고",
                    template: function(row){
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
                    width: 85
                }, {
                    title: "결재",
                    template: function(row){
                        if(row.EXP_STAT == 100){
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
                    width: 85
                }, {
                    title: "결재상태",
                    template: function(row){
                        if(row.EXP_STAT == 100){
                            if(row.RES_STATUS == 0){
                                return "미결재";
                            }else if(row.RES_STATUS == 10){
                                return "상신";
                            }else if(row.RES_STATUS == 30){
                                return "반려";
                            }else if(row.RES_STATUS == 40){
                                return "회수";
                            }else if(row.RES_STATUS == 100){
                                return "결재완료";
                            }else {
                                return "-";
                            }
                        }else if(row.EXP_STAT == 10){
                            return "여비정산 승인요청 중";
                        }else if(row.EXP_STAT == 30){
                            return "여비정산 반려";
                        }else if(row.EXP_STAT == 0){
                            return "결과보고서 작성중";
                        }else{
                            return "결과보고서 미작성";
                        }
                    },
                    width: 140
                }
            ]
        }).data("kendoGrid");
    },

    popBustripRes: function(e, d, t) {
        if(e == "N"){
            var url = "/bustrip/pop/bustripResultPop.do?hrBizReqId="+d+"&tripType="+t;
        }else{
            var url = "/bustrip/pop/bustripResultPop.do?hrBizReqResultId="+e+"&hrBizReqId="+d+"&tripType="+t;;
        }
        var name = "bustripResListPop";
        var option = "width=1200, height=795, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    bustripResDrafting: function(hrBizReqResultId) {
        // pdf 생성 및 저장
        bustripResultPop.makeHtmlToPdf();

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

        window.close();
    },

    bustripResReDrafting: function(docId, menuCd, approKey, linkageType, type, target) {
        // pdf 생성 및 저장
        bustripResultPop.makeHtmlToPdf();

        tempOrReDraftingPop(docId, menuCd, approKey, linkageType, type, target);
    },

    fn_reqRegPopup : function (key){
        var url = "/payApp/pop/regPayAppPop.do";
        if(key != null && key != ""){
            url = "/payApp/pop/regPayAppPop.do?payAppSn=" + key;
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    bustripResList.mainGrid();
}
