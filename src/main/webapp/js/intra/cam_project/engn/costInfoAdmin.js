var costInfo = {

    global : {
        searchAjaxData2 : "",
        searchAjaxData3 : "",
        searchAjaxData4 : ""
    },

    fn_defaultScript : function (){
        const pjtSn = $("#pjtSn").val();
        commonProject.setPjtStat();
        costInfo.pageSet();
        costInfoGrid.mainGrid();
        costInfo.dataSet(pjtSn);
    },

    pageSet(){
        if(commonProject.global.teamYn == null || commonProject.global.teamYn != "N"){
            return;
        }
        const pjtSn = $("#pjtSn").val();
        const result = customKendo.fn_customAjax("/project/getTeamPjtList", {pjtSn: pjtSn});
        const list = result.list;
        console.log(list);

        if(list.length > 1){
            const arr = [];
            for(let i=0; i<list.length; i++){
                const map = list[i];
                const data = {
                    label: map.DEPT_NAME,
                    value: map.PJT_SN
                };
                arr.push(data);
            }

            $("#costInfoDiv").show();

            customKendo.fn_radioGroup("costPjtClass", arr, "horizontal");
            $("#costPjtClass").data("kendoRadioGroup").value(pjtSn);

            $("#costPjtClass").data("kendoRadioGroup").bind("change", function(){
                costInfo.dataSet($("#costPjtClass").data("kendoRadioGroup").value());
                $("#searchPjtSn").val($("#costPjtClass").data("kendoRadioGroup").value());
                costInfoGrid.gridReload();
            })
        }
    },

    dataSet(pjtSn){
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const pjtMap = result.map;
        console.log("pjtMap", pjtMap);

        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            const e = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn}).rs;
            if(e.YEAR_CLASS == "M" && e.PJT_CD != null && e.PARENT_PJT_SN == null){
                $(".multiUi").show();
            }
            $("#taxGubun").val(e.TAX_GUBUN);
        }

        /** 사업정보 */
        costInfo.step1(pjtMap);

        /** 재무실적내역 */
        costInfo.step2(pjtMap);
    },

    step1(pjtMap){
        const pjtSn = $("#pjtSn").val();
        const tmYn = pjtMap.TM_YN;

        $("#busnNm").val(pjtMap.BUSN_NM);

        const result = customKendo.fn_customAjax("/project/getPjtCostData", {pjtSn: pjtSn});
        const data2 = result.data;
        const e = data2;
        let html = '';
        if(e.YEAR_CLASS == "M") {
            html += '<table id="pjtInfoRow" class="popTable table table-bordered mb-0">\n' +
                '            <colgroup>\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '                <col width="%">\n' +
                '            </colgroup>\n' +
                '            <thead >\n' +
                '            <tr>\n' +
                '                <th style="text-align: center">구분</th>\n' +
                '                <th style="text-align: center">프로젝트 코드</th>\n' +
                '                <th style="text-align: center">부서</th>\n' +
                '                <th style="text-align: center">팀</th>\n' +
                '                <th style="text-align: center">수주금액</th>\n' +
                '                <th style="text-align: center">당해년도 사업비</th>\n' +
                '                <th style="text-align: center">달성 매출액</th>\n' +
                '                <th style="text-align: center">달성 운영수익</th>\n' +
                '                <th style="text-align: center">예상 매출액</th>\n' +
                '                <th style="text-align: center">예상 운영수익</th>\n' +
                '            </tr>\n' +
                '            <tr>\n' +
                '                <td id="PJT_TYPE" style="text-align: center"></td>\n' +
                '                <td id="PJT_CD2" style="text-align: center"></td>\n' +
                '                <td id="PM_DEPT" style="text-align: center"></td>\n' +
                '                <td id="PM_TEAM" style="text-align: center"></td>\n' +
                '                <td id="PJT_AMT2" style="text-align: right"></td>\n' +
                '                <td id="PJT_AMT3" style="text-align: right"></td>\n' +
                '                <td id="RES_AMT" style="text-align: right"></td>\n' +
                '                <td id="RES_NOT_INV_AMT" style="text-align: right"></td>\n' +
                '                <td id="DEV_AMT" style="text-align: right"></td>\n' +
                '                <td id="DEV_NOT_INV_AMT" style="text-align: right"></td>\n' +
                '            </tr>\n' +
                '            </thead>\n' +
                '        </table>';
            $("#pjtInfoRow").html(html);
        }
        if(tmYn != "Y"){
            $("#PJT_TYPE").text("수주");
        }else{
            $("#PJT_TYPE").text("협업");
        }
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
    },

    step2(pjtMap){
        const pjtSn = $("#pjtSn").val();

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const result = customKendo.fn_customAjax("/project/getPjtCostData", {pjtSn: pjtSn});
        const data = result.data;
        const e = data;
        console.log("e", e);

        /** 수주금액 */
        if(e.YEAR_CLASS == "M"){
            $("#PJT_AMT2").text(comma(e.ALL_PJT_AMT));
            $("#PJT_AMT3").text(comma(e.PJT_AMT));
        } else {
            $("#PJT_AMT2").text(comma(e.PJT_AMT));
        }

        if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V"){

            /** 달성매출액 */
            $("#RES_AMT").text(comma(Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0)));

            /** 달성운영수익 */
            $("#RES_NOT_INV_AMT").text(comma(Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0)));

            /** 예상매출액 */
            $("#DEV_AMT").text(comma(Number(Number(e.PJT_AMT || 0) - Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0))));

            /** 예상운영수익 */
            $("#DEV_NOT_INV_AMT").text(comma(Number(e.PJT_AMT || 0) - Number(e.INV_AMT || 0) - Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0)));

        }else{
            /** 공통 변수 */
            const date = new Date();
            const year = date.getFullYear().toString().substring(2, 4);

            /** 사업비 분리사용 유무 확인 */
            const result2 = customKendo.fn_customAjax("/projectRnd/getAccountInfo", {pjtSn: pjtSn});
            const list = result2.list;
            let arr = []
            for(let i=0; i<list.length; i++){
                arr.push($("#costMgtCd").val().slice(0, -1) + list[i].IS_TYPE);
            }
            if(list.length == 0){
                arr.push($("#costMgtCd").val());
            }
            console.log("arr : ", arr);

            /** 지출완료금액 */
            let usedBudget = 0;
            /** 수익설정 예산액 */
            let revenueBudget = 0;
            /** 수익설정 지출완료금액 */
            let usedRevenueBudget = 0;
            /** 비용설정 지출완료금액 */
            let usedCostBudget = 0;

            /**
             * ** 달성 매출액 = 지출완료금액(과세일시 나누기 1.1)
             * ** 달성 운영수익 = 수익설정 지출완료금액 + (비용설정 지출완료금액 - 비용총합계)
             * ** 예상매출 = 당해년도 사업비 - 달성 매출액
             * ** 예상수익 = 수익설정 예산액 - 수익설정 지출완료금액
             * */

            /** 달성매출액 */
            for(let i=0; i<arr.length; i++){
                const result3 = customKendo.fn_customAjax("/g20/getSubjectList", {
                    stat: "project",
                    gisu: year,
                    fromDate: $("#sbjStrDe").val().replace(/-/g, ""),
                    toDate: $("#sbjEndDe").val().replace(/-/g, ""),
                    mgtSeq: arr[i],
                    opt01: "3",
                    opt02: "1",
                    opt03: "2",
                    baseDate: date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, "0") + date.getDate().toString().padStart(2, "0"),
                    pjtSn: pjtSn,
                    temp: 2
                });
                const g20List = result3.list;
                console.log("g20List : ", g20List);

                const bgtInfo = customKendo.fn_customAjax("/mng/getProjectBgtList", {
                    pjtSn: arr[i]
                });
                const bgtList = bgtInfo.list;
                console.log("bgtList : ", bgtList);

                for(let j=0; j<g20List.length; j++){
                    const jMap = g20List[j];
                    if(jMap.DIV_FG_NM == "항"){
                        for (let k=0; k<bgtList.length; k++){
                            const kMap = bgtList[k];
                            if(jMap.BGT_CD == kMap.BGT_CD){
                                usedBudget += Number(jMap.ACCT_AM_3);
                                if(kMap.BGT_AT == "1"){
                                    revenueBudget += Number(jMap.CALC_AM);
                                    usedRevenueBudget += Number(jMap.ACCT_AM_3);
                                }else if(kMap.BGT_AT == "2"){
                                    usedCostBudget += Number(jMap.ACCT_AM_3);
                                }
                            }
                        }
                    }
                }
            }
            let asrAmt = 0;
            if($("#taxGubun").val() == "1"){
                asrAmt = Number((usedBudget * 10 / 11).toString().split(".")[0]);
            }else{
                asrAmt = usedBudget
            }
            $("#RES_AMT").text(comma(asrAmt));

            /** 달성운영수익 */
            let aopAmt = 0;
            let invSum = Number(uncomma($("#invSum").text())) || 0;
            if($("#taxGubun").val() == "1"){
                let tmpAmt = Number(((usedCostBudget - invSum) * 10 / 11).toString().split(".")[0]);
                aopAmt = usedRevenueBudget + tmpAmt;
            }else{
                aopAmt = usedRevenueBudget + (usedCostBudget - invSum);
            }
            console.log("usedRevenueBudget", usedRevenueBudget);
            console.log("usedCostBudget", usedCostBudget);
            console.log("invSum", invSum);
            console.log("aopAmt", aopAmt);
            $("#RES_NOT_INV_AMT").text(comma(aopAmt));

            /** 예상매출액 */
            let devAmt = 0;
            devAmt = Number(e.PJT_AMT || 0) - asrAmt;
            $("#DEV_AMT").text(comma(devAmt));

            /** 예상운영수익 */
            let eopAmt = 0;
            eopAmt = revenueBudget - usedRevenueBudget;
            $("#DEV_NOT_INV_AMT").text(comma(eopAmt));
        }

        console.log(Number(e.INV_AMT || 0));
        console.log(Number(e.incpCompAmt || 0));
        console.log(Number(e.befExpProfitAmt || 0));
        console.log(Number(e.aftProfitAmt || 0));
    },

    step2Bak(pjtMap){
        const pjtSn = $("#pjtSn").val();

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
    }
}