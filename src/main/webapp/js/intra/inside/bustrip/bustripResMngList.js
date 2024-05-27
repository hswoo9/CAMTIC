var bustripResMngList = {
    init: function(){
        bustripResMngList.pageSet();
        bustripResMngList.mainGrid();
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

        /** 입금상태 */
        bustrip.fn_depositStatSearchSet();

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

    mainGrid: function(){
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
                    data.deptSeq = $("#team").val() == "" ? ($("#dept").val() == "" ? "" : $("#dept").val()) : $("#team").val();
                    data.tripCode = $("#tripCode").data("kendoDropDownList").value();
                    data.project = $("#project").val();
                    data.busnName = $("#busnName").val();
                    data.depositStat = $("#depositStat").val();
                    return data;
                }
            },
            schema: {
                data: function (data){
                    return data.rs;
                },
                total: function (data){
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
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
            dataBound : bustripResMngList.onDataBound,
            columns: [
                {
                    title: "출장구분",
                    width: 80,
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                }, {
                    title: "사업명",
                    width: 200,
                    template : function(row){
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
                    width: 80,
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
                    template : function(row){
                        if(row.USE_CAR == "Y"){
                            if(row.USE_TRSPT == 1){
                                return "사용 (카니발)";
                            } else if(row.USE_TRSPT == 5){
                                return "사용 (아반떼)";
                            } else if(row.USE_TRSPT == 3){
                                return "사용 (트럭)";
                            } else if (row.USE_TRSPT == 12){
                                return "사용 (모하비)";
                            } else if (row.USE_TRSPT == 13){
                                return "사용 (솔라티)";
                            } else if (row.USE_TRSPT == 14){
                                return "사용 (드론관제차량)";
                            } else if (row.USE_TRSPT == 10){
                                return "사용 (자가)";
                            } else if (row.USE_TRSPT == 0){
                                return "사용 (대중교통)";
                            } else if (row.USE_TRSPT == 11){
                                return "사용 (기타(" + row.USE_TRSPT_RMK + "))";
                            } else {
                                return "사용";
                            }
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
                    title: "여비정산",
                    template : function(row){
                        console.log(row);
                        if((row.RES_STATUS != 30 && row.RES_STATUS != null && row.RES_STATUS != 0) || row.HR_BIZ_REQ_RESULT_ID == undefined || row.HR_BIZ_REQ_RESULT_ID == ""){
                            return "-";
                        } else {
                            return '<button type="button" class="k-button k-button-solid-base" onclick="bustripResMngList.popBustripRes('+row.HR_BIZ_REQ_ID+', '+row.HR_BIZ_REQ_RESULT_ID+')">여비정산</button>'
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

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            const dataItem = grid.dataItem($(this));
            const hrBizReqId = dataItem.HR_BIZ_REQ_ID;
            const hrBizReqResultId = dataItem.HR_BIZ_REQ_RESULT_ID;
            bustripResMngList.popBustripRes(hrBizReqId, hrBizReqResultId);
        });
    },

    popBustripRes : function(e, d) {
        var url = "/bustrip/pop/bustripResultPop.do?hrBizReqId="+e+"&hrBizReqResultId="+d+"&mode=mng";
        var name = "bustripResListPop";
        var option = "width=1200, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    bustripResMngList.mainGrid();
}
