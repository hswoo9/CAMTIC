var costInfo = {

    global : {
        searchAjaxData2 : "",
        searchAjaxData3 : "",
        searchAjaxData4 : ""
    },

    fn_defaultScript : function (){
        commonProject.setPjtStat();
        this.dataSet();
        this.gridReload();
    },

    dataSet : function (){
        const pjtSn = $("#pjtSn").val();
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const pjtMap = result.map;
        console.log(pjtMap);

        const delvMap = result.delvMap;
        $("#busnNm").val(pjtMap.BUSN_NM);
        $("#PJT_CD").text(pjtMap.PJT_CD);
        $("#PJT_CD2").text(pjtMap.PJT_CD);
        $("#PJT_NM").text(pjtMap.PJT_NM);
        $("#PM").text(pjtMap.PM);
        $("#PJT_STR_DT").text(pjtMap.PJT_START_DT);
        $("#PJT_END_DT").text(pjtMap.PJT_EXP_END_DT);
        $("#PJT_AMT").text(fn_numberWithCommas(pjtMap.PJT_AMT));

        if(pjtMap.PM_EMP_SEQ != null){
            const pmInfo = getUser(pjtMap.PM_EMP_SEQ);
            if(pmInfo != null){
                $("#PM_DEPT").text(pmInfo.deptNm);
                $("#PM_TEAM").text(pmInfo.teamNm);
            }
        }

        let sbjText = "미사용";
        if(pjtMap.SBJ_SEP != undefined){
            if(pjtMap.SBJ_SEP == "Y"){
                sbjText = "사용 / ";
                var data = {
                    pjtSn: pjtSn
                }
                let result = customKendo.fn_customAjax("/projectRnd/getAccountInfo", data);
                $("#checkboxDiv").show();
                for(let i=0; i<result.list.length; i++){
                    sbjText += result.list[i].IS_TYPE;
                }
            }
        }
        $("#SBJ_SEP").text(sbjText);

        /** 사업정보 */
        if(commonProject.global.busnClass == "D"){
            let html = '';
            html += '<tr>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '<td>';
            html += pjtMap.PJT_START_DT == null ? "" : pjtMap.PJT_START_DT.substring(0, 4)+"년";
            html += '</td>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '<td>';
            html += pjtMap.DEPT_NAME;
            html += '</td>';
            html += '</tr>';
            //$("#pjtInfoRow").append(html);
        }



        /** 재무실적내역 */

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const devResult = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn, lastCk: "Y"});
        const resResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});
        let type = "";

        const devMap = devResult.rs;
        const resMap = resResult.result.map;
        if(resMap == null && devMap != null){
            type = "dev";
        }else if(resMap != null){
            type = "res";
        }else{
            type = "delv";
        }

        const pjtAmt = pjtMap.PJT_AMT;
        const tmYn = pjtMap.TM_YN;

        /** 엔지니어링/용역/기타*/
        if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V" || pjtMap.BUSN_CLASS == "R" || pjtMap.BUSN_CLASS == "S"){

            if(type == "res"){

                /** 구매/비용내역 */
                const resPurcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList.do", {pjtSn: pjtSn});
                /** 출장/비용내역 */
                const tripResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {pjtSn: pjtSn});
                let resInvSum = 0;
                const resPurcList = resPurcResult.list;
                for(let i=0; i<resPurcList.length; i++){
                    const map = resPurcList[i];
                    if(map.CLAIM_STATUS == "CAYSY"){
                        resInvSum += Number(map.PURC_ITEM_AMT_SUM);
                    }
                }
                const bustList = tripResult.list;
                for(let i=0; i<bustList.length; i++){
                    const bustMap = bustList[i];
                    if(bustMap.RS_STATUS == "100"){
                        resInvSum  += Number(bustMap.RES_EXNP_SUM);
                    }
                }

                $("#PJT_AMT2").text(comma(pjtAmt));
                $("#RES_AMT").text(comma(pjtAmt));
                $("#RES_NOT_INV_AMT").text(comma(Number(pjtAmt)-resInvSum));
                $("#DEV_AMT").text(comma(0));
                $("#DEV_NOT_INV_AMT").text(comma(0));

            }else if(type == "dev"){

                /** 투자내역 */
                const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});
                const purcList = purcResult.list;
                let invSum = 0;
                for(let i=0; i<purcList.length; i++){
                    const map = purcList[i];
                    invSum += Number(map.EST_TOT_AMT);
                }

                $("#PJT_AMT2").text(comma(pjtAmt));
                $("#RES_AMT").text(comma(0));
                $("#RES_NOT_INV_AMT").text(comma(0));
                $("#DEV_AMT").text(comma(Number(pjtAmt)-invSum));
                $("#DEV_NOT_INV_AMT").text(comma(Number(pjtAmt)-invSum));

            }else{

                $("#PJT_AMT2").text(comma(pjtAmt));
                $("#RES_AMT").text(comma(0));
                $("#RES_NOT_INV_AMT").text(comma(0));
                $("#DEV_AMT").text(comma(0));
                $("#DEV_NOT_INV_AMT").text(comma(0));
            }
        }
    },

    gridReload : function (){
        costInfo.global.searchAjaxData2 = {
            empSeq : $("#loginEmpSeq").val(),
            pjtSn : $("#pjtSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }
        costInfo.global.searchAjaxData3 = {
            startDate : $("#start_date").val(),
            endDate : $("#end_date").val(),
            projectCd : $("#pjtSn").val(),
            busnName : $("#busnName").val(),
            empSeq : $("#regEmpSeq").val(),
            pjtSn : $("#pjtSn").val()
        }
        costInfo.global.searchAjaxData4 = {
            pjtSn : $("#pjtSn").val()
        }

        this.grid2("/purc/getPurcReqClaimList.do", costInfo.global.searchAjaxData2);
        this.grid3("/bustrip/getProjectBustList", costInfo.global.searchAjaxData3);
        this.grid4("/payApp/getPjtExnpList", costInfo.global.searchAjaxData4);

        const purcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList.do", costInfo.global.searchAjaxData2);
        const bustResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", costInfo.global.searchAjaxData3);
        const payResult = customKendo.fn_customAjax("/payApp/getPjtExnpList", costInfo.global.searchAjaxData4);

        const purcList = purcResult.list;
        const bustList = bustResult.list;
        const payList = payResult.list;

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
            if(bustMap.RS_STATUS == "100"){
                bustSum  += Number(bustMap.RES_EXNP_SUM);
            }
        }

        let paySum = 0;
        for(let i=0; i<payList.length; i++){
            const payMap = payList[i];
            paySum += Number(payMap.COST_SUM);
        }


        $("#purcSum").text(comma(Math.round(purcSum)));
        $("#bustSum").text(comma(Math.round(bustSum)));
        $("#costSum").text(comma(Math.round(paySum)));
        $("#purcSumTemp").text(comma(Math.round(purcSum)));
        $("#bustSumTemp").text(comma(Math.round(bustSum)));
        $("#costSumTemp").text(comma(Math.round(paySum)));

        $("#invSum").text(comma(Math.round(purcSum) + Math.round((bustSum)) + Math.round(paySum)));
    },

    grid2 : function (url, params){
        $("#grid2").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
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
                            return '<div onclick="costInfo.fn_reqClaiming(' + e.CLAIM_SN + ');" style="cursor : pointer">' + e.PURC_REQ_PURPOSE + '</div>';
                        } else {
                            return e.PURC_REQ_PURPOSE;
                        }
                    }
                }
                // , {
                //     title: "구매",
                //     width: 100,
                //     template : function(e){
                //         return e.CP_CNT + "건 / " + '<span style="color:red;">'+e.RP_CNT+'</span>' + "건"
                //     }
                // }
                // , {
                //     title: "외주",
                //     width: 100
                // }
                , {
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
                                return '<button type="button" class="k-button k-button-solid-base" onclick="costInfo.lectureTeamListPop(' + e.PURC_SN + ')">선택</button>';
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

    grid3 : function (url, params){
        $("#grid3").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="costInfo.gridReload()">' +
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
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                /*{
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
                },*/ {
                    field: "EMP_NAME",
                    title: "출장자",
                    width: 80,
                    template: function(row){
                        if(row.ORG_YN = 'N'){
                            return row.EMP_NAME;
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
                    footerTemplate: "출장완료 여비합계"
                }, {
                    title : "여비금액",
                    width: 50,
                    template : function (e){
                        return "<div style='text-align: right'>"+comma(e.RES_EXNP_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div id='bustSumTemp' style='text-align: right'></div>";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    grid4 : function (url, params){
        $("#grid4").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="costInfo.gridReload()">' +
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
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "APP_DE",
                    title: "지급신청일"
                }, {
                    title: "금액",
                    template: function(row){
                        return "<div style='text-align: right'>"+comma(row.ITEM_SUM)+"</div>";
                    }
                }, {
                    title: "구매/출장 문서번호",
                    template : function(row){
                        if(row.PURC_DOC_NO != null){
                            return row.PURC_DOC_NO;
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title: "비용처리",
                    template: function(row){
                        if(row.PURC_DOC_NO != null){
                            return "-";
                        } else {
                            return '<button type="button" class="k-button k-button-solid-info" onclick="costInfo.fn_reqRegPopup('+row.PAY_APP_SN+')">비용처리</button>';
                        }
                    }
                }, {
                    title: "상태",
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
                    template: function(row){
                        return "<div style='text-align: right'>"+comma(row.COST_SUM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div id='costSumTemp' style='text-align: right'></div>";
                    }
                }
            ]
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
    },

    lectureTeamListPop: function(key){
        let url = "/projectUnRnd/lectureTeamListPop.do?pjtSn="+$("#pjtSn").val() + "&purcSn=" + key;
        const name = "lectureReqPop";
        const option = "width = 1250, height = 650, top = 100, left = 300, location = no";
        window.open(url, name, option);
    }
}