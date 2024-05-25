let bustSum = 0;

var busiList = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript: function(){
        busiList.pageSet();
        busiList.gridReload();
    },

    pageSet: function(){
        /** 출장기간 */
        bustrip.fn_periodSet();

        /** 출장구분 */
        bustrip.fn_tripCodeSearchSet();
        $("#tripCode").data("kendoDropDownList").value("4");

        /** 관련사업 */
        bustrip.fn_projectSearchSet();

        customKendo.fn_textBox(["busnName"]);
    },

    gridReload: function (){
        busiList.global.searchAjaxData = {
            startDate : $("#start_date").val(),
            endDate : $("#end_date").val(),
            tripCode : $("#tripCode").data("kendoDropDownList").value(),
            project : $("#project").val(),
            busnName : $("#busnName").val(),
            empSeq : $("#regEmpSeq").val()
        }

        busiList.mainGrid("/bustrip/getBustripList", busiList.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#bustripMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="busiList.gridReload()">' +
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
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bustripList.fn_delBtn()">' +
                            '	<span class="k-button-text">신청취소</span>' +
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
                        if(row.STATUS == 0){
                            return "<input type='checkbox' id='bst"+row.HR_BIZ_REQ_ID+"' name='bstCheck' value='"+row.HR_BIZ_REQ_ID+"' style='position: relative; top:3px' class='bstCheck'/>"
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
                    width: 160,
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
                        if(row.COMPANION != 0){
                            return row.EMP_NAME + " 외 "+row.COMPANION+"명";
                        }else{
                            return row.EMP_NAME;
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
                        if(e.STATUS == 100){
                            return '<button type="button" class="k-button k-button-solid-info" onclick="busiList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">출장신청서</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="busiList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">출장신청서</button>';
                        }
                    }
                }, {
                    title : "결과보고",
                    width: 70,
                    template : function (e){
                        console.log(e);
                        if(e.STATUS == 100){
                            if(e.HR_BIZ_REQ_RESULT_ID == "" || e.HR_BIZ_REQ_RESULT_ID == null || e.HR_BIZ_REQ_RESULT_ID == undefined){
                                return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes(\'N\', '+e.HR_BIZ_REQ_ID+')">결과보고</button>'
                            }else{
                                if(e.RS_STATUS == 100){
                                    return '<button type="button" class="k-button k-button-solid-info" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">결과보고</button>'
                                } else {
                                    if(e.EXP_STAT == 100){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">출장정산완료</button>'
                                    } else {
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResList.popBustripRes('+e.HR_BIZ_REQ_RESULT_ID+', '+e.HR_BIZ_REQ_ID+')">출장정산중</button>'
                                    }
                                }
                            }
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title : "지급신청",
                    width: 80,
                    template : function (e){
                        if(e.RS_STATUS == 100 && e.EXP_STAT == 100 && e.PAY_APP_SN == null){
                            return '<button type="button" class="k-button k-button-solid-base" onclick="busiList.fn_reqRegPopup('+e.HR_BIZ_REQ_RESULT_ID+')">지급신청</button>'
                        }else if (e.PAY_APP_SN != null){
                            return '<button type="button" class="k-button k-button-solid-info" onclick="busiList.fn_reqRegPopup('+e.PAY_APP_SN+', 2)">지급신청</button>'
                        }else{
                            return '-';
                        }
                    },
                    footerTemplate: "출장완료 여비합계"
                }, {
                    title: "입금상태",
                    width: 50,
                    template : function (e){
                        return "-";
                    }
                }, {
                    title : "여비금액",
                    width: 70,
                    template : function (e){
                        if(e.RS_STATUS == "100"){
                            bustSum  += Number(e.RES_EXNP_SUM);
                        }
                        return "<div style='text-align: right'>"+comma(e.RES_EXNP_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(bustSum)+"</div>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_delBtn: function(){
        let keyAr = [];
        if($("input[name='bstCheck']:checked").length == 0){ alert("취소할 출장을 선택해주세요.") }
        if(!confirm("선택한 출장 신청을 취소하시겠습니까?")){ return; }

        $("input[name='bstCheck']:checked").each(function(){
            keyAr.push(this.value);
        });

        $.ajax({
            url : "/bustrip/delBustripReq",
            data: {
                keyAr : keyAr
            },
            type : "post",
            traditional: true,
            dataType: "json",
            success : function(){
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
    }
}

function gridReload(){
    busiList.gridReload();
}