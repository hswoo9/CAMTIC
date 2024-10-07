let bustSum = 0;
var bustripMngList = {
    init: function(){
        bustripMngList.pageSet();
        bustripMngList.mainGrid();
    },

    pageSet: function(){
        /** 출장기간 */
        bustrip.fn_periodSet();

        /** 부서, 팀 */
        fn_deptSetting();

        /** 출장구분 */
        bustrip.fn_tripCodeSearchSet();

        /** 관련사업 */
        bustrip.fn_projectSearchSet();

        customKendo.fn_textBox(["busnName"]);

        $("#searchValue").kendoDropDownList({
            dataSource : [
                {text : "사업명", value : "a"},
                {text : "출장자", value : "b"}
            ],
            dataTextField : "text",
            dataValueField : "value"
        });
    },

    mainGrid: function(){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getBustripList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.deptSeq = $("#team").val() == "" ? ($("#dept").val() == "" ? "" : $("#dept").val()) : $("#team").val();
                    data.tripCode = $("#tripCode").data("kendoDropDownList").value();
                    data.project = $("#project").val();
                    data.searchValue = $("#searchValue").val();
                    data.busnName = $("#busnName").val();
                    data.depositStat = $("#depositStat").val();
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
            height: 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustripMngList.mainGrid();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "출장신청(관리자) 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: bustripMngList.onDataBound,
            columns: [
                {
                    field: "TRIP_CODE",
                    title: "출장구분",
                    width: 60,
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                }, {
                    field: "PROJECT",
                    title: "사업명",
                    width: 200,
                    template: function(row){
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
                    field: "VISIT_CRM",
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
                    field: "TRIP_DAY_FR",
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 100
                }, {
                    field: "TRIP_DAY_TO",
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 100
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 80,
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
                        } else if (e.USE_TRSPT == 11){
                            return "기타(" + e.USE_TRSPT_RMK + ")";
                        } else {
                            return "-";
                        }
                    }
                },{
                    title: "출장신청",
                    width: 70,
                    template : function (e){
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.STATUS == 100){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재완료</button>';
                            }else if(e.STATUS == 10 || e.STATUS == 20 || e.STATUS == 50){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재중</button>';
                            }else if(e.STATUS == 30){
                                return '<button type="button" class="k-button k-button-solid-error" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">반려</button>';
                            }else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">작성중</button>';
                            }
                        }else{
                            if(e.STATUS != "100"){
                                if(e.STATUS == "30"){
                                    return '<button type="button" class="k-button k-button-solid-error" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">반려</button>';
                                } else if(e.STATUS == 10 || e.STATUS == 20 || e.STATUS == 50){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재중</button>';
                                } else {
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">작성중</button>';
                                }
                            } else if(e.STATUS == "100" && e.BF_EXP_STAT == "0"){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">사전정산</button>';
                            } else if(e.STATUS == "100" && e.BF_EXP_STAT == "100"){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">사전정산</button>';
                            } else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재완료</button>';
                            }
                        }
                    }
                }, {
                    title: "결과보고",
                    width: 70,
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
                                    }else if(e.RS_STATUS == 10 || e.RS_STATUS == 20 || e.RS_STATUS == 50){
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
                            /** 사전정산 금액 0일때 */
                            if(e.BF_PAY_APP_SN == null && e.BF_EXP_STAT == 100 && e.BF_OVER_TOT_COST == 0){
                                /** 결과보고 작성 -> 사후정산 -> -> 결과보고 전자결재 */
                                if(e.STATUS == "100" && e.BF_EXP_STAT == "100" && e.DOC_STATUS == null && e.HR_BIZ_REQ_RESULT_ID == null){
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
                            } else if(e.BF_PAY_APP_SN != null){ /** 사전정산 -> 지급신청 */
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
                    title: "지급신청",
                    width: 110,
                    template : function (e){
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.RS_STATUS == 100 && e.EXP_STAT == 100 && e.PAY_APP_SN == null){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.fn_reqRegPopup('+e.HR_BIZ_REQ_RESULT_ID+')">지급신청</button>'
                            }else if (e.PAY_APP_SN != null){
                                if(e.DOC_STATUS == 100){
                                    return '<button type="button" class="k-button k-button-solid-info" onclick="bustripMngList.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">결재완료</button>'
                                }else if(e.DOC_STATUS == 10 || e.DOC_STATUS == 20 || e.DOC_STATUS == 50){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">결재중</button>'
                                }else if(e.DOC_STATUS == 30){
                                    return '<button type="button" class="k-button k-button-solid-error" onclick="bustripMngList.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">반려</button>'
                                }else {
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripMngList.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">작성중</button>'
                                }
                            }else{
                                return '-';
                            }
                        }else{
                            if(e.BF_EXP_STAT == "100" && e.PAY_APP_SN == null){
                                if(e.RS_STATUS != "100"){
                                    if(e.BF_EXP_STAT == 100 && e.BF_OVER_TOT_COST == 0){
                                        return '-';
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustPop.businessExnp('+e.HR_BIZ_REQ_ID+')">사전정산 지급신청</button>'
                                    }
                                }else {
                                    if(e.OVER_TOT_COST == 0){
                                        return '-';
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustPop.businessExnp(' + e.HR_BIZ_REQ_ID + ')">사후정산 지급신청</button>'
                                    }
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
                    field: "EXNP_DOC_STATUS",
                    title: "입금상태",
                    width: 60,
                    template : function (e){
                        var docStatus = e.EXNP_DOC_STATUS;
                        var payExnpDe = e.PAY_EXNP_DE;
                        var reStat = e.EXNP_RE_STAT;

                        if(payExnpDe != undefined && reStat != "Y"){
                            return '입금예정';
                        }else if(payExnpDe != undefined && reStat == "Y"){
                            return '입금완료';
                        }else{
                            return '-';
                        }
                    }
                }, {
                    field: "PAY_EXNP_DE",
                    title: "지출일자",
                    width: 70,
                    template : function (e){
                        var payExnpDe = e.PAY_EXNP_DE;
                        var reStat = e.EXNP_RE_STAT;
                        var dt3 = e.DT3;

                        if(payExnpDe != undefined && reStat == "Y" && dt3 != null){
                            return dt3;
                        }else{
                            return '-';
                        }
                    }
                }, {
                    field: "RES_EXNP_SUM",
                    title: "여비금액",
                    width: 80,
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
                    width: 70,
                    template : function (e){
                        if(e.STATUS == 0 || e.STATUS == 30 || e.STATUS == 40){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bustripMngList.fn_delBtn('+e.HR_BIZ_REQ_ID+')">' +
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

    onDataBound: function(){
        var grid = this;
        grid.element.off('dblclick');
        grid.tbody.find("tr").dblclick(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            bustripMngList.bustripReqPop(dataItem.HR_BIZ_REQ_ID);
        });

        bustSum = 0;
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
                bustripMngList.mainGrid();
            }
        });
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
}

function gridReload(){
    bustripMngList.mainGrid();
}