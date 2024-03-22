let bustSum = 0;

var bustInfo = {

    fn_defaultScript : function(){
        commonProject.setPjtStat();
        customKendo.fn_textBox(["bustripReq"]);

        $("#contEtc").kendoTextArea({
            rows: 5,
        });

        bustInfo.fn_setData();
    },

    fn_setData : function (){
        bustInfo.bustripMainGrid();
    },

    bustripMainGrid : function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getProjectBustList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDate = $("#start_date").val();
                    data.endDate = $("#end_date").val();
                    data.projectCd = $("#pjtSn").val();
                    data.busnName = $("#busnName").val();
                    data.empSeq = $("#regEmpSeq").val();
                    data.pjtSn = $("#pjtSn").val();
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

        $("#bustripMainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustInfo.bustripMainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : function(e){
                const grid = this;
                grid.tbody.find("tr").click(function (e) {
                    const dataItem = grid.dataItem($(this));
                    console.log(dataItem);

                    $("#contEtc").val(dataItem.RESULT);

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
                    title: "사업명",
                    width: 150,
                    template: function(row){
                        var busnName = "";
                        var project = "";
                        if(row.BUSN_NAME != "" && row.BUSN_NAME != null && row.BUSN_NAME != undefined){
                            busnName = row.BUSN_NAME;
                        }

                        if(row.PROJECT_CD != "" && row.PROJECT_CD != null){
                            project = "(" + row.PROJECT + ") ";
                        }
                        return  $("#pjtNm").val();
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
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 80,
                    template : function (e){
                        console.log(e);
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
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title : "출장신청",
                    width: 60,
                    template : function (e){
                        console.log("출장 결재 상태값 ::"+e.STATUS);
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.STATUS == 100){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재완료</button>';
                            }else if(e.STATUS == 10){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재중</button>';
                            }else if(e.STATUS == 30){
                                return '<button type="button" class="k-button k-button-solid-error" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">반려</button>';
                            }else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">작성중</button>';
                            }
                        }else{
                            if(e.STATUS != "100"){
                                if(e.STATUS == "30"){
                                    return '<button type="button" class="k-button k-button-solid-error" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">반려</button>';
                                } else {
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">작성중</button>';
                                }
                            } else if(e.STATUS == "100" && e.BF_EXP_STAT == "0"){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">사전정산</button>';
                            } else if(e.STATUS == "100" && e.BF_EXP_STAT == "100"){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">사전정산</button>';
                            } else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">결재완료</button>';
                            }
                        }
                    }
                }, {
                    title : "결과보고",
                    width: 70,
                    template : function (e){
                        console.log("결과보고 컬럼 console.log");
                        console.log(e);
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.STATUS == 100){
                                if(e.HR_BIZ_REQ_RESULT_ID == "" || e.HR_BIZ_REQ_RESULT_ID == null || e.HR_BIZ_REQ_RESULT_ID == undefined){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes(\'N\', '+e.HR_BIZ_REQ_ID+')">작성중</button>'
                                }else{
                                    if(e.RS_STATUS == 100) {
                                        return '<button type="button" class="k-button k-button-solid-info" onclick="bustripResList.popBustripRes(' + e.HR_BIZ_REQ_RESULT_ID + ', ' + e.HR_BIZ_REQ_ID + ')">결재완료</button>'
                                    }else if(e.RS_STATUS == 10){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">결재중</button>'
                                    } else if(e.RS_STATUS == 30){
                                        return '<button type="button" class="k-button k-button-solid-error" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">반려</button>'
                                    } else {
                                        // if(e.EXP_STAT == 100){
                                        //     return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">작성완료</button>'
                                        // } else {
                                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">작성중</button>'
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
                                if(e.STATUS == "100" && e.BF_EXP_STAT == "100" && e.EXP_STAT == null){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes(\'N\', '+e.HR_BIZ_REQ_ID+')">작성중</button>';
                                } else if(e.EXP_STAT == "0"){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">작성중</button>';
                                } else if(e.EXP_STAT == "100" && e.RS_STATUS != "100"){
                                    return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">작성중</button>';
                                } else if(e.RS_STATUS == "100"){
                                    return '<button type="button" class="k-button k-button-solid-info" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">결재완료</button>';
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
                    width: 70,
                    template : function (e){
                        /** 국내출장 해외출장 분기 */
                        if(e.TRIP_CODE != "4"){
                            if(e.RS_STATUS == 100 && e.EXP_STAT == 100 && e.PAY_APP_SN == null){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.fn_reqRegPopup('+e.HR_BIZ_REQ_RESULT_ID+')">지급신청</button>'
                            }else if (e.PAY_APP_SN != null){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustInfo.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">지급신청</button>'
                            }else{
                                return '-';
                            }
                        }else{
                            console.log(e.BF_EXP_STAT);
                            console.log(e.PAY_APP_SN == null);
                            console.log(e.BF_EXP_STAT == "100" && e.PAY_APP_SN == null);
                            if(e.BF_EXP_STAT == "100" && e.PAY_APP_SN == null){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustInfo.businessExnp('+e.HR_BIZ_REQ_ID+')">작성중</button>'
                            }else if (e.PAY_APP_SN != null){
                                return '<button type="button" class="k-button k-button-solid-info" onclick="bustInfo.businessExnp('+e.HR_BIZ_REQ_ID+', '+e.HR_BIZ_REQ_RESULT_ID+')">결재완료</button>'
                            }else{
                                return '-';
                            }
                        }
                    },
                    footerTemplate: "출장완료 여비합계"
                }, {
                    title : "여비금액",
                    width: 50,
                    template : function (e){
                        if(e.RS_STATUS == "100"){
                            bustSum  += Number(e.RES_EXNP_SUM);
                        }
                        return "<div style='text-align: right'>"+comma(e.RES_EXNP_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(bustSum)+"</div>";
                    }
                }, {
                    title : "처리",
                    width: 50,
                    template : function (e){
                        return '<button type="button" class="k-button k-button-solid-error" onclick="bustInfo.fn_delPjtBustrip('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">제외</button>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_delPjtBustrip : function (key, reqKey){
        if(!confirm("해당 출장내역을 제외하시겠습니까?")){
            return ;
        }

        var data= {
            hrBizReqResultId : key,
            hrBizReqId : reqKey,
        }

        $.ajax({
            url : "/project/engn/delPjtBustrip",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
               if(rs.code == 200){
                   alert("처리되었습니다.");
                   $("#bustripMainGrid").data("kendoGrid").dataSource.read();
               }
            }
        })
    },

    fn_popBustrip : function (){
        var url = "/bustrip/pop/viewBustripList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_save : function (){

        if($("#hrBizReqResultId").val() == ""){
            alert("출장 내역을 선택해주세요.");
            return ;
        }

        if(!confirm("저장하시겠습니까?")){
            return ;
        }

        var data ={
            contEtc : $("#contEtc").val(),
            hrBizReqResultId : $("#hrBizReqResultId").val(),
            hrBizReqId : $("#hrBizReqId").val(),
            bustripReq : $("#bustripReq").val(),
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val(),
            busnName : $("#pjtNm").val()
        }

        $.ajax({
            url : "/project/engn/setBustInfo",
            data : data,
            type : "post",
            dataType : "json",
            success: function(){
                alert("저장되었습니다.");
                if(commonProject.global.teamStat == "Y"){
                    if(commonProject.global.busnClass == "D"){
                        window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=5";
                    }else if(commonProject.global.busnClass == "R"){
                        window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=5";
                    }else if(commonProject.global.busnClass == "S"){
                        window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=5";
                    }
                }else{
                    if(commonProject.global.busnClass == "D"){
                        window.location.href="/project/pop/viewRegProject.do?pjtSn=" + data.pjtSn + "&tab=9";
                    }else if(commonProject.global.busnClass == "R"){
                        window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=9";
                    }else if(commonProject.global.busnClass == "S"){
                        window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + data.pjtSn + "&tab=9";
                    }
                }
            }
        });


        console.log("출장 정보");
    },

    bustripReqPop: function(e, type, d){
        let url = "/bustrip/pop/bustripReqPop.do?pjtSn=" + e;

        if(type == "req"){
            url = "/bustrip/pop/bustripReqPop.do?hrBizReqId=" + e + "&type=" + type + "&pjtSn=" + d;
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

    businessExnp: function(hrBizReqId){
        let url = "/bustrip/pop/businessExnp.do?hrBizReqId="+hrBizReqId;
        const name = "_blank";
        const option = "width = 450, height = 200, top = 200, left = 300, location = no";
        window.open(url, name, option);
    },
}

function gridReload(){
    bustInfo.bustripMainGrid();
}