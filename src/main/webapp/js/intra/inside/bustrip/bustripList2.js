let bustSum = 0;

var bustList = {

    fn_defaultScript: function(){
        bustList.pageSet();
        bustList.mainGrid();
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

    mainGrid: function(){
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
                    data.tripCode = $("#tripCode").data("kendoDropDownList").value();
                    data.project = $("#project").val();
                    data.busnName = $("#busnName").val();
                    data.empSeq = $("#regEmpSeq").val();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bustripList.bustripReqPop()">' +
                            '	<span class="k-button-text">신청</span>' +
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
                    title: "사업명",
                    width: 200,
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
                    width: 140
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
                            return '<button type="button" class="k-button k-button-solid-info" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">출장신청서</button>';
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.bustripReqPop('+e.HR_BIZ_REQ_ID+', \'req\', '+e.PJT_SN+')">출장신청서</button>';
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
                    width: 70,
                    template : function (e){
                        if(e.RS_STATUS == 100 && e.EXP_STAT == 100){
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustList.fn_reqRegPopup('+e.HR_BIZ_REQ_RESULT_ID+')">지급신청</button>'
                        } else {
                            return '-';
                        }
                    },
                    footerTemplate: "출장완료 여비합계"
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

    fn_reqRegPopup : function (hrBizReqResultId){
        var url = "/payApp/pop/regPayAppPop.do?hrBizReqResultId="+hrBizReqResultId+"&reqType=bustrip";
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    bustripList.mainGrid();
}