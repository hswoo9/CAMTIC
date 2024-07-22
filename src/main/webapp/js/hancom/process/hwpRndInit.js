var rndInit = {

    global: {
        pjtInfo: new Object(),
        rndInfo: new Object()
    },

    globalDataSet: function(pjtSn, menuCd){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        rndInit.global.pjtInfo = pjtInfo;

        const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
        rndInit.global.rndInfo = rndInfo;

        if(menuCd == "res"){
            const devInfo = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});
            rndInit.global.devInfo = devInfo;
        }
    },

    delvSet: function(type){
        const pjtInfo = rndInit.global.pjtInfo;
        const rndInfo = rndInit.global.rndInfo;

        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;

        /** 과제구분(참여형태) */
        var sbjDs = customKendo.fn_customAjax("/common/commonCodeList", {
            cmGroupCode : "RND_SUBJECT",
        }).rs;
        let codeTxt = "";
        for(let i=0; i<sbjDs.length; i++){
            if(sbjDs[i].CM_CODE == map.SBJ_CLASS){
                codeTxt = sbjDs[i].CM_CODE_NM;
            }
        }

        /** 연구비지원기관 */
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {
            grpSn: "SUP_DEP"
        }).list;
        let supDepTxt = "";
        for(let i=0; i<lgCodeDs.length; i++){
            if(lgCodeDs[i].LG_CD == map.SBJ_DEP){
                supDepTxt = lgCodeDs[i].LG_CD_NM;
            }
        }

        /** 전담기관 */
        var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", {
            lgCd: map.SBJ_DEP,
            grpSn: "SUP_DEP"
        }).rs;
        let supDepSubTxt = "";
        for(let i=0; i<smCodeDs.length; i++){
            if(smCodeDs[i].PJT_CD == map.SBJ_DEP_SUB){
                supDepSubTxt = smCodeDs[i].PJT_CD_NM;
            }
        }

        /** 사업기간 */
        let yearText = " ";
        if(map.YEAR_CLASS != null){
            if(map.YEAR_CLASS == "M"){
                yearText = "다년";
                hwpDocCtrl.putFieldText("PJT_DT_NOW", delvMap.NOW_STR_DE + " ~ " + delvMap.NOW_END_DE);
            }else{
                yearText = "단년";
                hwpDocCtrl.putFieldText("PJT_DT_NOW", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
            }
        }
        /** 사업구분 */
        hwpDocCtrl.putFieldText('YEAR_CLASS', yearText);
        /** 과제구분(참여형태) */
        hwpDocCtrl.putFieldText('SBJ_CLASS', codeTxt);
        /** 지원부처 */
        hwpDocCtrl.putFieldText("SUP_DEP", supDepTxt);
        /** 세무정보 */
        let taxText = "";
        if(map.TAX_GUBUN == "1"){
            taxText = "과세";
        }else if(map.TAX_GUBUN == "2"){
            taxText = "면세";
        }else if(map.TAX_GUBUN == "3"){
            taxText = "비과세";
        }
        hwpDocCtrl.putFieldText("TAX_GUBUN", taxText);

        /** 전담기관 */
        hwpDocCtrl.putFieldText("SUP_DEP_SUB", supDepSubTxt);
        /** 주관기관 */
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        /** 참여기관 */
        if(map.CRM_PART_NM != null){
            hwpDocCtrl.putFieldText('CRM_PART_NM', map.CRM_PART_NM);
        }
        /** 위탁기관 */
        if(map.CRM_CON_NM != null){
            hwpDocCtrl.putFieldText('CRM_CON_NM', map.CRM_CON_NM);
        }
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);


        /** 사업명 */
        hwpDocCtrl.putFieldText('BS_TITLE', map.BS_TITLE);
        /** 과제명 */
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);


        /** 총사업비 */
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(map.ALL_BUSN_COST));
        /** 법인사업비(수주금액) */

        if(type == "delv"){
            if(map.TAX_GUBUN == "1"){
                hwpDocCtrl.putFieldText('PJT_AMT', comma((map.PJT_EXP_AMT / 1.1).toString().split(".")[0]));
            }else{
                hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_EXP_AMT));
            }
        }else{
            hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_AMT));
        }

        /** 사업책임자 */
        const mngInfo = getUser(map.PM_EMP_SEQ);
        const mngText = mngInfo.deptNm + " " + map.PM + " " + fn_getSpot(mngInfo.DUTY_NAME, mngInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('MANAGE_NM', mngText);
        /** 사업담당자 */
        const pmInfo = getUser(map.EMP_SEQ);
        const pmText = pmInfo.deptNm + " " + map.EMP_NAME + " " + fn_getSpot(pmInfo.DUTY_NAME, pmInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('PM_EMP_NM', pmText);
    },

    delvInit: function(pjtSn){
        rndInit.globalDataSet(pjtSn, "delv");
        const pjtInfo = rndInit.global.pjtInfo;
        const rndInfo = rndInit.global.rndInfo;

        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;

        const customG20 = customKendo.fn_customAjax("/project/getProjectBudgetListSum.do", {pjtSn: pjtSn});

        /** 1. 사업정보 */
        rndInit.delvSet("delv");

        /** 2. 사업 목적 및 내용 */
        hwpDocCtrl.putFieldText('OBJ', delvMap.RND_OBJ);
        if(map.TAX_GUBUN == "1"){
            hwpDocCtrl.putFieldText('NOW_AMT', comma(Number((delvMap.TOT_RES_COST / 1.1).toString().split(".")[0]) + Number(delvMap.PEO_RES_ITEM)));
            hwpDocCtrl.putFieldText('BUSN_COST', comma((delvMap.TOT_RES_COST / 1.1).toString().split(".")[0]));
        }else{
            hwpDocCtrl.putFieldText('NOW_AMT', comma(Number((delvMap.TOT_RES_COST).toString().split(".")[0]) + Number(delvMap.PEO_RES_ITEM)));
            hwpDocCtrl.putFieldText('BUSN_COST', comma((delvMap.TOT_RES_COST).toString().split(".")[0]));
        }
        hwpDocCtrl.putFieldText('PEO_RES_ITEM', delvMap.PEO_RES_ITEM == 0 ? "0" : fn_numberWithCommas(delvMap.PEO_RES_ITEM));

        let g20Sum = 0;
        console.log("customG20", customG20);

        /** 초기화 */
        hwpDocCtrl.putFieldText('CB_BUDGET_AMT0', "0");
        hwpDocCtrl.putFieldText('CB_BUDGET_PER0', "0%");
        hwpDocCtrl.putFieldText('CB_BUDGET_AMT0', "0");
        hwpDocCtrl.putFieldText('CB_BUDGET_PER0', "0%");
        hwpDocCtrl.putFieldText('CB_BUDGET_AMT0', "0");
        hwpDocCtrl.putFieldText('CB_BUDGET_PER0', "0%");

        for(let i=0; i<customG20.list.length; i++){
            const g20Map = customG20.list[i];
            if(g20Map.CB_CODE_NAME_1 == "인건비" && g20Map.CB_BUDGET != null){
                hwpDocCtrl.putFieldText('CB_BUDGET_AMT0', fn_numberWithCommas(g20Map.CB_BUDGET));
                hwpDocCtrl.putFieldText('CB_BUDGET_PER0', (Math.round((g20Map.CB_BUDGET / delvMap.TOT_RES_COST * 100)  * 10) / 10 +"%"));
                g20Sum += g20Map.CB_BUDGET;
            }else if(g20Map.CB_CODE_NAME_1 == "직접비" && g20Map.CB_BUDGET != null){
                hwpDocCtrl.putFieldText('CB_BUDGET_AMT1', fn_numberWithCommas(g20Map.CB_BUDGET));
                hwpDocCtrl.putFieldText('CB_BUDGET_PER1', (Math.round((g20Map.CB_BUDGET / delvMap.TOT_RES_COST * 100)  * 10) / 10 +"%"));
                g20Sum += g20Map.CB_BUDGET;
            }else if(g20Map.CB_CODE_NAME_1 == "간접비" && g20Map.CB_BUDGET != null){
                hwpDocCtrl.putFieldText('CB_BUDGET_AMT2', fn_numberWithCommas(g20Map.CB_BUDGET));
                hwpDocCtrl.putFieldText('CB_BUDGET_PER2', (Math.round((g20Map.CB_BUDGET / delvMap.TOT_RES_COST * 100)  * 10) / 10 +"%"));
                g20Sum += g20Map.CB_BUDGET;
            }
        }
        hwpDocCtrl.putFieldText('G20_TOT', fn_numberWithCommas(g20Sum));

        /** 3. 특이사항 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("ETC", " ");
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(delvMap.RND_ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    devInit: function(devSn){
        const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;

        rndInit.globalDataSet(pjtSn, "dev");
        const pjtInfo = rndInit.global.pjtInfo;
        const rndInfo = rndInit.global.rndInfo;
        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;

        let pjtAmt = 0;

        if(map.PJT_AMT != null && map.PJT_AMT != "" && map.PJT_AMT != 0){
            pjtAmt = Number(map.PJT_AMT);
        }else{
            if(map.TAX_GUBUN == "1"){
                pjtAmt = Number(delvMap.TOT_RES_COST/1.1);
            }else{
                pjtAmt = Number(delvMap.TOT_RES_COST);
            }
        }

        const customG20Result = customKendo.fn_customAjax("/project/getProjectBudgetList.do", {pjtSn: pjtSn});
        const processResult = customKendo.fn_customAjax("/project/getProcessList2", {devSn: devSn});
        const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devSn});
        const getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: devSn});
        const purcList = purcResult.list;

        /** 1. 사업정보 */
        rndInit.delvSet("dev");

        /** 1-1. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);

            const tmPmInfo = getUser(team.TM_PM_SEQ);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', tmPmInfo.deptNm + " " + tmPmInfo.EMP_NAME_KR + " " + fn_getSpot(tmPmInfo.DUTY_NAME, tmPmInfo.POSITION_NAME));
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            let per;
            per = (team.TM_AMT/pjtAmt) * 100;
            hwpDocCtrl.putFieldText('TM_PER', pjtPer(per, 2));
        }

        /** 5. 예상재무성과 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.EST_TOT_AMT);
        }
        let allPjtAmt = 0;
        if(map.YEAR_CLASS != null && map.YEAR_CLASS == "M"){
            allPjtAmt = map.ALL_PJT_AMT;
        }else{
            allPjtAmt = pjtAmt;
        }
        hwpDocCtrl.putFieldText('AMT0', String(comma(allPjtAmt)));
        hwpDocCtrl.putFieldText('AMT1', String(comma(pjtAmt)));
        hwpDocCtrl.putFieldText('INV_AMT', String(fn_numberWithCommas(invSum)));
        let invPer = (invSum / pjtAmt * 100);
        hwpDocCtrl.putFieldText('INV_PER2', pjtPer(invPer, 1));
        hwpDocCtrl.putFieldText('INV_AMT2', (pjtAmt-invSum) == 0 ? "0" : String(fn_numberWithCommas(pjtAmt-invSum)));
        hwpDocCtrl.putFieldText('INV_PER3', pjtPer(100-invPer, 1));

        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: map.PJT_SN});
            const team = teamResult.map;
            const teamPurcResult = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: team.PNT_PJT_SN});
            const teamPurcList = teamPurcResult.list;
            let teamInvSum = 0;
            for(let i=0; i<teamPurcList.length; i++){
                const teamPurcMap = teamPurcList[i];
                teamInvSum += Number(teamPurcMap.EST_TOT_AMT);
            }
            let delvAmt = 0;
            delvAmt = pjtAmt - team.TM_AMT;

            hwpDocCtrl.putFieldText('AMT2', String(comma(pjtAmt)));
            /** 수부부서 매출*/
            hwpDocCtrl.putFieldText('AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
            let delvPer = (delvAmt / pjtAmt * 100);
            hwpDocCtrl.putFieldText('INV_PER', pjtPer(delvPer, 1));

            /** 수주부서 비용*/
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            invPer = (invSum / delvAmt * 100);
            hwpDocCtrl.putFieldText('INV_PER2', pjtPer(invPer, 1));

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
            hwpDocCtrl.putFieldText('INV_PER3', pjtPer(100-invPer, 1));


            /** 협업부서 매출*/
            hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TEAM_PER', pjtPer(100-delvPer, 1));

            /** 협업부서 비용*/
            hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
            let teamPer = (teamInvSum / team.TM_AMT * 100);
            hwpDocCtrl.putFieldText('TEAM_PER2', pjtPer(teamPer, 1));

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_PER3', pjtPer(100-teamPer, 1));

            /** 합계 */
            hwpDocCtrl.putFieldText('SUM_AMT', fn_numberWithCommas(pjtAmt));
            hwpDocCtrl.putFieldText('TEAM_INV_AMT_SUM', fn_numberWithCommas(invSum + teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT_SUM', fn_numberWithCommas(pjtAmt - invSum - teamInvSum));
        }

        /** 2. 사업 예산 **/
        const customG20List = customG20Result.list;

        const htmlCustomG20 = rndInit.htmlCustomG20(customG20List);
        hwpDocCtrl.putFieldText("G20_HTML", " ");
        hwpDocCtrl.moveToField("G20_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlCustomG20, "html","insertfile");

        /** 3. 참여인력 및 일정 */
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);

        setTimeout(function() {
            hwpDocCtrl.putFieldText("DEV_HTML", " ");
            hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");
        }, 1000);

        /** 4. 투자내역 */
        const htmlData = engnInit.htmlInv(purcList, map);
        setTimeout(function() {
            hwpDocCtrl.putFieldText("PURC_HTML", " ");
            hwpDocCtrl.moveToField('PURC_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 2000);

        /** 6. 특이사항 */
        const dev = getDevelopPlan.rs;
        setTimeout(function() {
            hwpDocCtrl.putFieldText("ETC", " ");
            hwpDocCtrl.moveToField("ETC", true, true, false);
            hwpDocCtrl.setTextFile(dev.ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 3000);
    },

    resInit: function(pjtSn){
        rndInit.globalDataSet(pjtSn, "res");
        const pjtInfo = rndInit.global.pjtInfo;
        const rndInfo = rndInit.global.rndInfo;
        const devInfo = rndInit.global.devInfo;

        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;
        const devMap = devInfo.rs;

        /** 참여인력 및 일정 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList2", {devSn: devMap.DEV_SN});
        /** 투자내역 */
        const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});
        /** 구매/비용내역 */
        const resPurcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList.do", {pjtSn: pjtSn});
        /** 출장/비용내역 */
        const tripResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {pjtSn: map.PJT_SN});

        /** 사업예산 */
        const customG20Result = customKendo.fn_customAjax("/project/getProjectBudgetList.do", {pjtSn: pjtSn});
        const getResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});

        /** 결과보고 데이터 */
        const resResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});
        const resMap = resResult.result.map;

        /** 1. 사업정보 */
        rndInit.delvSet("result");
        /** 결과보고는 결과보고 탭에 작성한 날짜 */
        hwpDocCtrl.putFieldText("PJT_DT_NOW", resMap.RS_STR_DT + " ~ " + resMap.RS_END_DT);

        /** 1-1. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);

            const tmPmInfo = getUser(team.TM_PM_SEQ);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', tmPmInfo.deptNm + " " + tmPmInfo.EMP_NAME_KR + " " + fn_getSpot(tmPmInfo.DUTY_NAME, tmPmInfo.POSITION_NAME));
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            let per;
            per = (team.TM_AMT/map.PJT_AMT) * 100;
            hwpDocCtrl.putFieldText('TM_PER', pjtPer(per, 2));
        }

        /** 3. 사업결과 */
        if(map.YEAR_CLASS == "M"){
            yearText = "다년";
            hwpDocCtrl.putFieldText("TEMP_END_DT", delvMap.NOW_STR_DE);
        }else{
            yearText = "단년";
            hwpDocCtrl.putFieldText("TEMP_END_DT", map.PJT_STR_DT);
        }
        hwpDocCtrl.putFieldText("REAL_END_DT", resMap.RS_END_DT);

        /** 4. 예상재무성과 */

        /** 수행계획서 마지막 버전 */
        if(1==1){
            const purcList = purcResult.list;
            let invSum = 0;
            for(let i=0; i<purcList.length; i++){
                const map = purcList[i];
                invSum += Number(map.EST_TOT_AMT);
            }
            hwpDocCtrl.putFieldText('AMT1', (map.PJT_AMT) == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            let invPer = (invSum / map.PJT_AMT * 100);
            hwpDocCtrl.putFieldText('INV_PER2', pjtPer(invPer, 1));
            hwpDocCtrl.putFieldText('INV_AMT2', (map.PJT_AMT-invSum) == 0 ? "0" : String(fn_numberWithCommas(map.PJT_AMT-invSum)));
            hwpDocCtrl.putFieldText('INV_PER3', pjtPer(100-invPer, 1));

            if(map.TM_YN == "Y"){
                const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: map.PJT_SN});
                const team = teamResult.map;
                const teamPurcResult = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: team.PNT_PJT_SN});
                const teamPurcList = teamPurcResult.list;
                let teamInvSum = 0;
                for(let i=0; i<teamPurcList.length; i++){
                    const teamPurcMap = teamPurcList[i];
                    teamInvSum += Number(teamPurcMap.EST_TOT_AMT);
                }
                let delvAmt = 0;
                delvAmt = map.PJT_AMT - team.TM_AMT;

                /** 수부부서 매출*/
                hwpDocCtrl.putFieldText('AMT2', (map.PJT_AMT) == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
                hwpDocCtrl.putFieldText('AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
                let delvPer = (delvAmt / map.PJT_AMT * 100);

                /** 수주부서 비용*/
                hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
                invPer = (invSum / delvAmt * 100);
                hwpDocCtrl.putFieldText('INV_PER2', pjtPer(invPer, 1));

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
                hwpDocCtrl.putFieldText('INV_PER3', pjtPer(100-invPer, 1));

                /** 협업부서 매출*/
                hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));

                /** 협업부서 비용*/
                hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
                let teamPer = (teamInvSum / team.TM_AMT * 100);
                hwpDocCtrl.putFieldText('TEAM_PER2', pjtPer(teamPer, 1));

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
                hwpDocCtrl.putFieldText('TEAM_PER3', pjtPer(100-teamPer, 1));

                /** 합계 */
                hwpDocCtrl.putFieldText('SUM_AMT', fn_numberWithCommas(map.PJT_AMT));
                hwpDocCtrl.putFieldText('TEAM_INV_AMT_SUM', fn_numberWithCommas(invSum + teamInvSum));
                hwpDocCtrl.putFieldText('TEAM_INV2_AMT_SUM', fn_numberWithCommas(map.PJT_AMT - invSum - teamInvSum));
            }
        }


        /** 결과보고 최종 */
        if(1 == 1){
            const resPurcList = resPurcResult.list;
            let resInvSum = 0;
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
            hwpDocCtrl.putFieldText('RES_AMT1', map.PJT_AMT == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
            hwpDocCtrl.putFieldText('RES_INV_AMT', resInvSum == 0 ? "0" : fn_numberWithCommas(resInvSum));
            let resInvPer = (resInvSum / map.PJT_AMT * 100);
            hwpDocCtrl.putFieldText('RES_INV_PER2', pjtPer(resInvPer, 1));
            hwpDocCtrl.putFieldText('RES_INV_AMT2', (map.PJT_AMT-resInvSum) == 0 ? "0" : String(fn_numberWithCommas(map.PJT_AMT-resInvSum)));
            hwpDocCtrl.putFieldText('RES_INV_PER3', pjtPer(100-resInvPer, 1));

            if(map.TM_YN == "Y"){
                const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: map.PJT_SN});
                const team = teamResult.map;
                const teamList = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: team.PNT_PJT_SN}).list;
                let teamInvSum = 0;
                for(let i=0; i<teamList.length; i++){
                    const info = teamList[i];
                    teamInvSum += info.ITEM_UNIT_AMT;
                }
                const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: team.PNT_PJT_SN});
                const teamTrip = tripResult.map;
                if(teamTrip.COUNT != 0){
                    teamInvSum += teamTrip.BUSTRIP_EXNP_SUM;
                }
                let delvAmt = 0;
                delvAmt = map.PJT_AMT - team.TM_AMT;

                /** 수부부서 매출*/
                hwpDocCtrl.putFieldText('RES_AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
                let delvPer = (delvAmt / map.PJT_AMT * 100);

                /** 수주부서 비용*/
                hwpDocCtrl.putFieldText('RES_INV_AMT', resInvSum == 0 ? "0" : fn_numberWithCommas(resInvSum));
                resInvPer = (resInvSum / delvAmt * 100);
                hwpDocCtrl.putFieldText('RES_INV_PER2', pjtPer(resInvPer, 1));

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('RES_INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - resInvSum));
                hwpDocCtrl.putFieldText('RES_INV_PER3', pjtPer(100-resInvPer, 1));


                /** 협업부서 매출*/
                hwpDocCtrl.putFieldText('RES_TEAM_AMT', fn_numberWithCommas(team.TM_AMT));

                /** 협업부서 비용*/
                hwpDocCtrl.putFieldText('RES_TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
                let teamPer = (teamInvSum / team.TM_AMT * 100);
                hwpDocCtrl.putFieldText('RES_TEAM_PER2', pjtPer(teamPer, 1));

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('RES_TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
                hwpDocCtrl.putFieldText('RES_TEAM_PER3', pjtPer(100-teamPer, 1));

                /** 합계 */
                hwpDocCtrl.putFieldText('RES_SUM_AMT', fn_numberWithCommas(map.PJT_AMT));
                hwpDocCtrl.putFieldText('RES_TEAM_INV_AMT_SUM', fn_numberWithCommas(resInvSum + teamInvSum));
                hwpDocCtrl.putFieldText('RES_TEAM_INV2_AMT_SUM', fn_numberWithCommas(map.PJT_AMT - resInvSum - teamInvSum));
            }
        }

        /** 2. 사업 예산 **/
        const customG20List = customG20Result.list;

        const htmlCustomG20 = rndInit.htmlCustomG20(customG20List);
        hwpDocCtrl.putFieldText("G20_HTML", " ");
        hwpDocCtrl.moveToField("G20_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlCustomG20, "html","insertfile");

        /** 4. 참여인력 및 일정 */
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);
        setTimeout(function() {
            hwpDocCtrl.putFieldText("DEV_HTML", " ");
            hwpDocCtrl.moveToField("DEV_HTML", true, true, false);
            hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");
        }, 1000);

        /** 5. 특이사항 */
        const res = getResult.result.map;
        setTimeout(function() {
            hwpDocCtrl.putFieldText("ETC", " ");
            hwpDocCtrl.moveToField("ETC", true, true, false);
            hwpDocCtrl.setTextFile(res.RS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 2000);
    },

    changeInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const map = pjtInfo.rs;

        /** 사업명 */
        hwpDocCtrl.putFieldText('BS_TITLE', map.BS_TITLE);
        /** 과제명 */
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        const date = new Date();
        const year = date.getFullYear().toString().substring(2,4);
        const g20 = customKendo.fn_customAjax("/g20/getSubjectList", {
            stat: "project",
            gisu: "23",
            fromDate: map.PJT_STR_DT.replace(/-/g, ""),
            toDate: map.PJT_END_DT.replace(/-/g, ""),
            mgtSeq: map.PJT_CD,
            opt01: "3",
            opt02: "1",
            opt03: "2",
            temp: "2",
            baseDate: map.PJT_STR_DT.split("-")[0] + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
            pjtSn: pjtSn
        });
        console.log("g20");
        console.log(g20);
        const htmlG20 = rndInit.htmlChangeG20(g20);
        hwpDocCtrl.moveToField('content', true, true, false);
        hwpDocCtrl.setTextFile(htmlG20, "HTML", "insertfile", {});

        setTimeout(function() {
        hwpDocCtrl.moveToField('content2', true, true, false);
        hwpDocCtrl.setTextFile(htmlG20, "HTML", "insertfile", {});
        }, 1000);
    },

    htmlCustomG20: function(g20){
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 70px;"><p style="font-size:12px;"><b>장</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 150px;"><p style="font-size:12px;"><b>관</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 220px;"><p style="font-size:12px;"><b>항</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 110px;"><p style="font-size:12px;"><b>사업비(예산)</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 85px;"><p style="font-size:12px;"><b>비중</b></p></td>';
        html += '               </tr>';
        let sum = 0;
        for(let i=0; i<g20.length; i++){
            const map = g20[i];
            sum += Number(map.CB_BUDGET);
        }

        for(let i=0; i<g20.length; i++){
            const map = g20[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CB_CODE_NAME_1 +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CB_CODE_NAME_2 +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CB_CODE_NAME_3 +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:12px;">'+ fn_numberWithCommas(map.CB_BUDGET) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ Math.round((map.CB_BUDGET / sum * 100)  * 10) / 10 +"%" +'</p></td>';
            html += '               </tr>';
        }
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center;"><p style="font-size:12px;">합계</p></td>';
        html += '                   <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:right; padding-right: 5px;"><p style="font-size:12px;">'+ fn_numberWithCommas(sum) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlG20: function(g20){
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 150px;"><p style="font-size:12px;"><b>장</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 185px;"><p style="font-size:12px;"><b>예산액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 150px;"><p style="font-size:12px;"><b>잔액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 150px;"><p style="font-size:12px;"><b>소진율</b></p></td>';
        html += '               </tr>';
        let sum = 0;
        let sum2 = 0;
        for(let i=0; i<g20.list.length; i++){
            const map = g20.list[i];
            if(map.DIV_FG_NM == "장"){
                html += '               <tr>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.BGT_NM +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ fn_numberWithCommas(map.CALC_AM) +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ fn_numberWithCommas(map.SUB_AM) +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.SUB_RATE.toString().substring(0, 4)+"%" +'</p></td>';
                html += '               </tr>';
                sum += map.CALC_AM;
                sum2 += map.SUB_AM;
            }
        }
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center;"><p style="font-size:12px;">합계</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ fn_numberWithCommas(sum) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ fn_numberWithCommas(sum2) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlChange: function(list, map){
        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>버전</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 424px;"><p style="font-size:13px;"><b>변경일</b></p></td>';
        html += '               </tr>';
        let verCount1 = 0;
        let verCount2 = 0;
        let ver = "";
        let verTxt = "";
        for(let i=0; i<list.length; i++){
            const map = list[i];
            if(map.TYPE == "1"){
                verCount1 += 1;
                ver = "세세목변경서";
                verTxt = "VER."+verCount1;
            }else{
                verCount2 += 1;
                ver = "반납신청서";
                verTxt = "VER."+verCount2;
            }
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ ver +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ verTxt +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.DRAFT_DATE +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlChangeG20: function(g20, amt){
        const budgetArr = draft.global.params.budgetList.split(",");
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#D8D8D8; text-align:center; width: 75px;"><p style="font-size:12px;"><b>세목</b></p></td>';
        html += '                   <td style="height:30px;background-color:#D8D8D8; text-align:center; width: 115px;"><p style="font-size:12px;"><b>세세목</b></p></td>';
        html += '                   <td style="height:30px;background-color:#D8D8D8; text-align:center; width: 75px;"><p style="font-size:12px;"><b>예산액(원)</b></p></td>';
        html += '               </tr>';
        let sum = 0;
        let largeText = "";
        for(let i=0; i<g20.list.length; i++){
            const map = g20.list[i];
            if(map.DIV_FG_NM == "장"){
                largeText = map.BGT_NM;
            }
            for(let j=0; j<budgetArr.length; j++){
                if(map.DIV_FG_NM == "항" && (map.BGT_CD == budgetArr[j])){
                    html += '               <tr>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ largeText +'</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.BGT_NM +'</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px;">'+ fn_numberWithCommas(map.CALC_AM) +'</p></td>';
                    html += '               </tr>';
                    sum += map.CALC_AM;
                }
            }
        }
        html += '               <tr>';
        html += '                   <td colspan="2" style="height:30px;background-color:#D8D8D8; text-align:center;"><p style="font-size:12px;">합계</p></td>';
        html += '                   <td style="height:30px;background-color:#D8D8D8; text-align:center;"><p style="font-size:12px;">'+ fn_numberWithCommas(sum) +'</p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}