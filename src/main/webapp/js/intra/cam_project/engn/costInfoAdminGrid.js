var costInfoGrid = {

    mainGrid: function(){
        costInfoGrid.grid2();
        costInfoGrid.grid3();
        costInfoGrid.grid4();

        if(commonProject.global.busnClass == "D" || commonProject.global.busnClass == "V"){
            $("#engnSelBtn").show();
        }else{
            $("#engnSelBtn").hide();
        }

        /** 총 합계 */
        costInfoGrid.sumTable();
    },

    gridReload: function(){
        $("#grid2").data("kendoGrid").dataSource.read();
        $("#grid3").data("kendoGrid").dataSource.read();
        $("#grid4").data("kendoGrid").dataSource.read();
        costInfoGrid.sumTable();
    },

    sumTable: function(){
        const purcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList2.do", {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#searchPjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        });
        const bustResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {
            pjtSn : $("#searchPjtSn").val()
        });
        const payResult = customKendo.fn_customAjax("/payApp/getPjtExnpList", {
            pjtSn : $("#searchPjtSn").val()
        });

        const purcList = purcResult.list;
        const bustList = bustResult.list;
        let payList = new Array();
        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            payList = payResult.list;
        }

        let purcSum = 0;
        for(let i=0; i<purcList.length; i++){
            const purcMap = purcList[i];
            if(purcMap.CLAIM_STATUS == "CAYSY"){
                if(purcMap.ORG_YN == 'N'){
                    purcSum += Number(purcMap.PURC_ITEM_AMT_SUM);
                } else {
                    let amt = Number(purcMap.PURC_ITEM_AMT_SUM);
                    let amt2 = Math.round(amt/10);
                    let itemAmt = 0;

                    if(purcMap.InTax == "0"){     // 부가세 미포함
                        itemAmt = amt + amt2;
                    } else if(purcMap.InTax == "1"){  // 부가세 포함
                        itemAmt = amt;
                    } else  if(purcMap.InTax == "2"){ // 면세
                        itemAmt = amt
                    }

                    purcSum += Number(itemAmt);
                }
            }
        }

        console.log();
        let bustSum = 0;
        for(let i=0; i<bustList.length; i++){
            const bustMap = bustList[i];
            if(bustMap.TRIP_CODE != "4"){
                bustSum  += Number(bustMap.RES_EXNP_SUM);
            } else {
                bustSum  += Number(bustMap.OVER_TOT_COST);
            }
        }

        let paySum = 0;
        for(let i=0; i<payList.length; i++){
            const payMap = payList[i];
            paySum += Number(payMap.COST_SUM);
        }

        let sumHtml = "";
        sumHtml += '<colgroup>';
        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
            sumHtml += '    <col width="12.5%">';
        }else{
            sumHtml += '    <col width="16.5%">';
            sumHtml += '    <col width="16.5%">';
            sumHtml += '    <col width="16.5%">';
            sumHtml += '    <col width="16.5%">';
            sumHtml += '    <col width="17%">';
            sumHtml += '    <col width="17%">';
        }
        sumHtml += '</colgroup>';
        sumHtml += '<thead>';
        sumHtml += '<tr>';
        sumHtml += '    <th style="text-align: center">구매</th>';
        sumHtml += '    <td id="purcSum" style="text-align: right">'+comma(Math.round(purcSum))+'</td>';
        sumHtml += '    <th style="text-align: center">출장</th>';
        sumHtml += '    <td id="bustSum" style="text-align: right">'+comma(Math.round(bustSum))+'</td>';
        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            sumHtml += '    <th style="text-align: center">비용</th>';
            sumHtml += '    <td id="costSum" style="text-align: right">'+comma(Math.round(paySum))+'</td>';
        }
        sumHtml += '    <th style="text-align: center">총 합계</th>';
        sumHtml += '    <td id="invSum" style="text-align: right">'+comma(comma(Math.round(purcSum) + Math.round((bustSum)) + Math.round(paySum)))+'</td>';
        sumHtml += '</tr>';
        sumHtml += '</thead>';
        $("#sumTable").html(sumHtml);

        $("#purcSumTemp").text(comma(Math.round(purcSum)));
        $("#bustSumTemp").text(comma(Math.round(bustSum)));
        $("#costSumTemp").text(comma(Math.round(paySum)));
        $("#purcSumTemp2").text(comma(Math.round(purcSum)));
        $("#bustSumTemp2").text(comma(Math.round(bustSum)));
        $("#costSumTemp2").text(comma(Math.round(paySum)));
    },

    sumTable2: function(){
        $("#purcSumTemp").text($("#purcSumTemp2").text());
        $("#bustSumTemp").text($("#bustSumTemp2").text());
        $("#costSumTemp").text($("#costSumTemp2").text());
    },

    grid2: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/purc/getPurcReqClaimList2.do",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empSeq = $("#loginEmpSeq").val();
                    data.pjtSn = $("#searchPjtSn").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
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

        $("#grid2").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : function(e){
                costInfoGrid.sumTable2();
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "문서번호",
                    field: "DOC_NO",
                    width: 180,
                }, {
                    field: "PURC_REQ_DATE",
                    title: "요청일",
                    width: 120,
                }, {
                    title: "요청자",
                    field: "EMP_NAME_KR",
                    width: 100
                }, {
                    title: "목적",
                    field: "PURC_REQ_PURPOSE",
                    template : function(e){
                        if(e.ORG_YN == 'N'){
                            return '<div onclick="costInfoPop.fn_reqClaiming(' + e.CLAIM_SN + ');" style="cursor : pointer">' + e.PURC_REQ_PURPOSE + '</div>';
                        } else {
                            return e.PURC_REQ_PURPOSE;
                        }
                    }
                }, {
                    title: "상태",
                    field: "STATUS",
                    width: 120,
                    template : function(e){
                        var status = "";
                        if(e.ORG_YN == 'N'){
                            /** 구매요청서 */
                            if(e.DOC_STATUS == "0" || e.DOC_STATUS == "30" || e.DOC_STATUS == "40"){
                                status = "구매요청작성중";
                            }else if(e.DOC_STATUS == "10" || e.DOC_STATUS == "20" || e.DOC_STATUS == "50"){
                                status = "구매요청결재중";
                            }else if(e.DOC_STATUS == "100" || e.DOC_STATUS == "101"){
                                status = "구매요청완료";

                                /** 구매청구서 */
                                if(e.CLAIM_STATUS == "CN"){
                                    status = "구매요청완료";
                                }else if(e.CLAIM_STATUS == "CAN"){
                                    status = "구매청구작성중";
                                }else if(e.CLAIM_STATUS == "CAYSN"){
                                    status = "구매청구작성중";
                                }else if(e.CLAIM_STATUS == "CAYSY"){
                                    if(e.CLAIM_DOC_STATUS == "100" || e.CLAIM_DOC_STATUS == "101"){

                                        status = "구매청구완료";

                                        if(e.PAYMENT_METHOD == "A"){
                                            if(e.ORDER_DT != null && e.ORDER_DT != ""){
                                                if(e.INSPECT_YN == "Y"){
                                                    if(e.INSPECT_STATUS != "100"){
                                                        status = "검수요청중";
                                                    }else{
                                                        status = "<div style='font-weight: bold'>검수승인완료</div>";
                                                    }
                                                }
                                            } else {
                                                status = "발주대기중";
                                            }
                                        } else {
                                            if(e.INSPECT_YN == "Y"){
                                                if(e.INSPECT_STATUS != "100"){
                                                    status = "검수요청중";
                                                }else{
                                                    status = "<div style='font-weight: bold'>검수승인완료</div>";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            status = '이관 데이터';
                        }
                        return status
                    },
                    footerTemplate: "청구 합계"
                }, {
                    title: "금액",
                    width: 100,
                    template: function(e){
                        if(e.ORG_YN == 'N'){
                            return "<div style='text-align: right'>"+comma(Math.round(e.PURC_ITEM_AMT_SUM))+"</div>";
                        } else {
                            let amt = Number(e.PURC_ITEM_AMT_SUM);
                            let amt2 = Math.round(amt/10);
                            let itemAmt = 0;

                            if(e.InTax == "0"){     // 부가세 미포함
                                itemAmt = amt + amt2;
                            } else if(e.InTax == "1"){  // 부가세 포함
                                itemAmt = amt;
                            } else  if(e.InTax == "2"){ // 면세
                                itemAmt = amt
                            }

                            return "<div style='text-align: right'>"+comma(Math.round(itemAmt))+"</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div id='purcSumTemp' style='text-align: right'></div>";
                    }
                }, {
                    title: "업체선택",
                    width: 100,
                    template: function(e){
                        if(e.ORG_YN == 'N'){
                            if(e.PJT_UNIT_SN != null && e.PJT_UNIT_SN != "" && e.PJT_UNIT_SN != undefined && e.BUSN_NM != "비R&D"){
                                return '';
                            } else {
                                return '<button type="button" class="k-button k-button-solid-base" onclick="costInfoPop.lectureTeamListPop(' + e.PURC_SN + ')">선택</button>';
                            }
                        } else {
                            return '';
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    grid3: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/bustrip/getProjectBustList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#searchPjtSn").val();
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

        $("#grid3").kendoGrid({
            dataSource: dataSource,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="costInfoGrid.gridReload()">' +
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
                costInfoGrid.sumTable2();
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 200,
                    template: function(row){
                        if(row.ORG_YN == "N"){
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
                        } else {
                            if(row.COMPANION == 0){
                                return row.EMP_NAME;
                            } else {
                                return row.EMP_NAME + " 외 " + row.COMPANION + "명";
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
                    }
                }, {
                    title: "출발일시",
                    template: function(row){
                        return row.TRIP_DAY_FR + " " + row.TRIP_TIME_FR;
                    },
                    width: 140
                }, {
                    title: "복귀일시",
                    template: function(row){
                        return row.TRIP_DAY_TO + " " + row.TRIP_TIME_TO;
                    },
                    width: 140
                }, {
                    field: "CAR_CLASS_NAME",
                    title: "차량",
                    width: 180,
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
                    },
                    footerTemplate: "출장여비 합계"
                }, {
                    title : "여비금액",
                    width: 140,
                    template : function (e){
                        if(e.TRIP_CODE != "4"){
                            return "<div style='text-align: right'>"+comma(e.RES_EXNP_SUM)+"</div>";
                        } else {
                            return "<div style='text-align: right'>"+comma(e.OVER_TOT_COST)+"</div>";
                        }
                    },
                    footerTemplate: function(){
                        return "<div id='bustSumTemp' style='text-align: right'></div>";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    grid4: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/payApp/getPjtExnpList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.pjtSn = $("#searchPjtSn").val();
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
            aggregate: [{ field: "ITEM_SUM", aggregate: "sum" }]
        });

        $("#grid4").kendoGrid({
            dataSource: dataSource,
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
                        return '<button type="button" id="engnSelBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="display:none" onclick="costInfoPop.payAppChoosePop()">' +
                            '	<span class="k-button-text">지급신청서 선택</span>' +
                            '</button>';
                    }
                },{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="costInfoGrid.gridReload()">' +
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
                costInfoGrid.sumTable2();
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "APP_DE",
                    title: "지급신청일",
                    width: 100
                }, {
                    field: "APP_TITLE",
                    title: "신청건명",
                    footerTemplate: function(){
                        return "<div style='text-align: right'>금액합계</div>";
                    }
                }, {
                    title: "금액",
                    width: 120,
                    template: function(row){
                        return "<div style='text-align: right'>"+comma(row.ITEM_SUM)+"</div>";
                    },
                    footerTemplate: function(data){
                        console.log(data);
                        return "<div style='text-align: right'>"+ comma(data.ITEM_SUM.sum) +"</div>";
                    }
                }, {
                    title: "구매/출장 문서번호",
                    width: 160,
                    template : function(row){
                        if(row.PURC_DOC_NO != null){
                            return row.PURC_DOC_NO;
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title: "비용처리",
                    width: 100,
                    template: function(row){
                        return '<button type="button" class="k-button k-button-solid-info" onclick="costInfoPop.fn_reqRegPopup('+row.PAY_APP_SN+')">비용처리</button>';
                    }
                }, {
                    title: "상태",
                    width: 100,
                    template: function(row){
                        if (row.COST_YN == 'Y') {
                            return "처리완료";
                        }else{
                            return "-";
                        }
                    },
                    footerTemplate: "비용합계"
                }, {
                    title: "비용",
                    width: 120,
                    template: function(row){
                        return "<div style='text-align: right'>"+comma(row.COST_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div id='costSumTemp' style='text-align: right'></div>";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    fn_reqRegPopup : function (key){
        var url = "/payApp/pop/regPayAppCostPop.do?payAppSn=" + key + "&auth=mng&status=rev&reqType=costProcess";
        if(key != null && key != ""){

        }
        var name = "regPayAppPop";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_reqClaiming : function(key){
        var url = "/purc/pop/reqClaiming.do";

        if(key != null && key != ""){
            url = "/purc/pop/reqClaiming.do?claimSn=" + key;
        }

        var name = "_blank";
        var option = "width = 1540, height = 840, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}