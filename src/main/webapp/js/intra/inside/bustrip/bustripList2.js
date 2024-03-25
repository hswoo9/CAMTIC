let bustSum = 0;

var bustList = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript: function(){
        bustList.pageSet();
        bustList.gridReload();
    },

    pageSet: function(){
        /** 출장기간 */
        bustrip.fn_periodSet();

        /** 출장구분 */
        bustrip.fn_tripCodeSearchSet();

        /** 관련사업 */
        bustrip.fn_projectSearchSet();

        customKendo.fn_textBox(["busnName"]);
    },

    gridReload: function (){
        bustList.global.searchAjaxData = {
            startDate : $("#start_date").val(),
            endDate : $("#end_date").val(),
            tripCode : $("#tripCode").data("kendoDropDownList").value(),
            project : $("#project").val(),
            busnName : $("#busnName").val(),
            empSeq : $("#regEmpSeq").val()
        }

        bustList.mainGrid("/bustrip/getBustripList", bustList.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#bustripMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 555,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bustPop.bustripReqPop()">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, /*{
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bustList.fn_delBtn()">' +
                            '	<span class="k-button-text">신청취소</span>' +
                            '</button>';
                    }
                }, */{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bustList.fn_checkedReqRegPopup();">' +
                            '	<span class="k-button-text">지급신청</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    const dataItem = grid.dataItem($(this));

                    grid.tbody.find("tr").each(function (){
                        $(this).css("background-color", "");
                    });

                    $(this).css("background-color", "#a7e1fc");
                });

                bustSum = 0;
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'bstCheck\');" class=""/>',
                    template: function(row){
                        if(row.RS_STATUS == 100 && row.EXP_STAT == 100 && row.PAY_APP_SN == null){
                            return "<input type='checkbox' id='bst"+row.HR_BIZ_REQ_RESULT_ID+"' name='bstCheck' value='"+row.HR_BIZ_REQ_RESULT_ID+"' trip-code='"+row.TRIP_CODE+"' style='position: relative; top:3px' class='bstCheck'/>"
                        }else{
                            return "";
                        }
                    },
                    width: 30
                }, {
                    title: "출장구분",
                    width: 50,
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                },{
                    title: "사업명",
                    width: 130,
                    template: function(row){
                        if(row.BUSN_NAME != null && row.BUSN_NAME != ""){
                            if(row.BUSN_NAME.toString().length > 30){
                                return  row.BUSN_NAME.toString().substring(0, 30)+ "...";
                            }
                            return  row.BUSN_NAME;
                        }else{
                            return "-";
                        }
                    }
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80,
                    template: function(row){
                        if(row.RS_STATUS != null){
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
                    width: 125
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 85
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 85
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 60,
                    template : function (e){
                        if(e.USE_TRSPT == 1){
                            return "카니발";
                        } else if(e.USE_TRSPT == 5){
                            return "아반떼";
                        } else if (e.USE_TRSPT == 3){
                            return "트럭";
                        } else if (e.USE_TRSPT == 12){
                            return "모하비";
                        } else if (e.USE_TRSPT == 13){
                            return "솔라티";
                        } else if (e.USE_TRSPT == 14){
                            return "드론관제차량";
                        } else if (e.USE_TRSPT == 10){
                            return "자가";
                        } else if (e.USE_TRSPT == 0){
                            return "대중교통";
                        } else if (e.USE_TRSPT == 15){
                            return "기타(" + e.USE_TRSPT_RMK + ")";
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title : "출장신청",
                    width: 70,
                    template : function (e){
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.STATUS == 100){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재완료</button>';
                            }else if(e.STATUS == 10){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재중</button>';
                            }else if(e.STATUS == 30){
                                return '<button type="button" class="k-button k-button-solid-error" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">반려</button>';
                            }else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">작성중</button>';
                            }
                        }else{
                            if(e.STATUS != "100"){
                                if(e.STATUS == "30"){
                                    return '<button type="button" class="k-button k-button-solid-error" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">반려</button>';
                                } else if(e.STATUS == 10){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재중</button>';
                                } else {
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">작성중</button>';
                                }
                            } else if(e.STATUS == "100" && e.BF_EXP_STAT == "0"){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">사전정산</button>';
                            } else if(e.STATUS == "100" && e.BF_EXP_STAT == "100"){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">사전정산</button>';
                            } else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재완료</button>';
                            }
                        }
                    }
                }, {
                    title : "결과보고",
                    width: 60,
                    template : function (e){
                        console.log("bustrip:", e);
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.STATUS == 100){
                                if(e.HR_BIZ_REQ_RESULT_ID == "" || e.HR_BIZ_REQ_RESULT_ID == null || e.HR_BIZ_REQ_RESULT_ID == undefined){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes(\'N\', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">작성중</button>'
                                }else{
                                    if(e.RS_STATUS == 100) {
                                        return '<button type="button" class="k-button k-button-solid-info" onclick="bustripResList.popBustripRes(' + e.HR_BIZ_REQ_RESULT_ID + ', ' + e.HR_BIZ_REQ_ID + ', '+e.TRIP_CODE+')">결재완료</button>'
                                    }else if(e.RS_STATUS == 10 || e.RS_STATUS == 50){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">결재중</button>'
                                    } else if(e.RS_STATUS == 30){
                                        return '<button type="button" class="k-button k-button-solid-error" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">반려</button>'
                                    } else {
                                        // if(e.EXP_STAT == 100){
                                        //     return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">작성완료</button>'
                                        // } else {
                                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">작성중</button>'
                                        // }
                                    }
                                }
                            }else {
                                return "-";
                            }
                        }else{
                            /** 사전정산 -> 지급신청 */
                            if(e.BF_PAY_APP_SN != null){
                                /** 결과보고 작성 -> 사후정산 -> -> 결과보고 전자결재 */
                                if(e.STATUS == "100" && e.BF_EXP_STAT == "100" && e.BF_DOC_STATUS == "100" && e.DOC_STATUS == null && e.HR_BIZ_REQ_RESULT_ID == null){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes(\'N\', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">작성중</button>';
                                } else if(e.RS_STATUS == "0"){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">작성중</button>';
                                } else if(e.EXP_STAT == "0" || e.EXP_STAT == "10" || e.RS_STATUS == "10"){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">결재중</button>';
                                } else if(e.EXP_STAT == "100" && e.RS_STATUS != "100"){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">결재중</button>';
                                } else if(e.RS_STATUS == "100"){
                                    return '<button type="button" class="k-button k-button-solid-info" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+', '+e.TRIP_CODE+')">결재완료</button>';
                                } else {
                                    return "-";
                                }
                            }else{
                                return "-";
                            }
                        }
                    }
                }, {
                    title : "지급신청",
                    width: 100,
                    template : function (e){
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.RS_STATUS == 100 && e.EXP_STAT == 100 && e.PAY_APP_SN == null){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.fn_reqRegPopup('+e.HR_BIZ_REQ_RESULT_ID+')">작성중</button>'
                            }else if (e.PAY_APP_SN != null){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustList.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">결재완료</button>'
                            }else{
                                return '-';
                            }
                        }else{
                            if(e.BF_EXP_STAT == "100" && e.PAY_APP_SN == null){
                                if(e.RS_STATUS != "100"){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustPop.businessExnp('+e.HR_BIZ_REQ_ID+')">사전정산 지급신청</button>'
                                }else {
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustPop.businessExnp(' + e.HR_BIZ_REQ_ID + ')">사후정산 지급신청</button>'
                                }
                            }else if (e.PAY_APP_SN != null){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustPop.businessExnp('+e.HR_BIZ_REQ_ID+', '+e.HR_BIZ_REQ_RESULT_ID+')">결재완료</button>'
                            }else{
                                return '-';
                            }
                        }
                    },
                    footerTemplate: "출장완료 여비합계"
                }, {
                    title: "입금상태",
                    width: 60,
                    template : function (e){
                        var docStatus = e.EXNP_DOC_STATUS;
                        var payExnpDe = e.PAY_EXNP_DE;

                        if(payExnpDe != undefined && docStatus != 100){
                            return '입금예정';
                        }else if(docStatus == 100){
                            return '입금완료';
                        }else{
                            return '-';
                        }
                    }
                }, {
                    title: "지출일자",
                    width: 60,
                    template : function (e){
                        var payExnpDe = e.PAY_EXNP_DE;
                        var docStatus = e.EXNP_DOC_STATUS;
                        var approvalDate = e.APPROVAL_DATE;

                        if((payExnpDe == undefined || payExnpDe == null || payExnpDe == "") && docStatus != 100){
                            return '-';
                        }else if(docStatus != 100){
                            return payExnpDe;
                        }else{
                            return approvalDate;
                        }
                    }
                }, {
                    title : "여비금액",
                    width: 70,
                    template : function (e){
                        if(e.TRIP_CODE != "4"){
                            if(e.RS_STATUS == "100"){
                                bustSum  += Number(e.RES_EXNP_SUM);
                            }
                            return "<div style='text-align: right'>"+comma(e.RES_EXNP_SUM)+"</div>";
                        } else {
                            console.log(e)
                            return "<div style='text-align: right'>"+comma(e.OVER_TOT_COST)+"</div>";
                        }

                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(bustSum)+"</div>";
                    }
                }, {
                    title : "취소",
                    width: 60,
                    template : function (e){
                        if(e.STATUS == 0 || e.STATUS == 30 || e.STATUS == 40){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bustList.fn_delBtn('+e.HR_BIZ_REQ_ID+')">' +
                                '	<span class="k-button-text">신청취소</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_delBtn: function(e){
        let keyAr = [];

        if(!confirm("출장 신청을 취소하시겠습니까?")){ return; }

        /*$("input[name='bstCheck']:checked").each(function(){
            keyAr.push(this.value);
        });*/

        keyAr.push(e);

        $.ajax({
            url : "/bustrip/delBustripReq",
            data: {
                keyAr : keyAr
            },
            type : "post",
            traditional: true,
            dataType: "json",
            success : function(){
                alert("취소되었습니다.");
                gridReload();
            }
        });
    },

    bustripReqPop: function(e){
        let url = "";
        if(e == null || e == "" || e== undefined){
            url = "/bustrip/pop/bustripReqPop.do";
        } else {
            url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+e;
        }
        let name = "bustripReqPop";
        let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    fn_reqRegPopup : function (key, type){
        var url = "/payApp/pop/regPayAppPop.do?hrBizReqResultId="+key+"&reqType=bustrip";

        if(type == 2){
            var url = "/payApp/pop/regPayAppPop.do?payAppSn="+key;
        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_checkedReqRegPopup : function (){
        var hrBizReqResultId = "";
        var flag = true;
        var flag2 = true;
        var tripCode = null;

        $('input[name="bstCheck"]:checked').each(function(){
            hrBizReqResultId += $(this).val() + ",";

            if($(this).attr("trip-code") == null || $(this).attr("trip-code") == "" || $(this).attr("trip-code") == undefined){
                flag2 = false;
                return false;
            }

            if (tripCode === null) {
                tripCode = $(this).attr("trip-code");
            } else {
                if (tripCode !== $(this).attr("trip-code")) {
                    flag = false;
                }
            }
        });

        if(hrBizReqResultId == ""){
            alert("선택된 출장이 없습니다.");
            return false;
        }
        if(!flag){
            alert("서로 다른 출장구분은 일괄 지급신청이 불가합니다.");
            return false;
        }
        if(!flag2){
            alert("지급신청 불가한 신청건이 존재합니다.");
            return false;
        }

        hrBizReqResultId = hrBizReqResultId.substring(0, hrBizReqResultId.length - 1);

        var url = "/payApp/pop/regPayAppPop.do?hrBizReqResultId="+hrBizReqResultId+"&reqType=bustrip";

        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    bustList.gridReload();
}