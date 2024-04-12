var unRndInit = {

    global: {
        pjtInfo: new Object(),
        unRndInfo: new Object()
    },

    globalDataSet: function(pjtSn, menuCd){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        unRndInit.global.pjtInfo = pjtInfo;

        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        unRndInit.global.unRndInfo = unRndInfo;

        if(menuCd == "res"){
            const devInfo = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});
            unRndInit.global.devInfo = devInfo;
        }
    },

    delvSet: function(){
        const pjtInfo = unRndInit.global.pjtInfo;
        const unRndInfo = unRndInit.global.unRndInfo;

        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;

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

        /** 전담기관*/
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
        /** 사업명 */
        hwpDocCtrl.putFieldText('BS_TITLE', map.BS_TITLE);
        /** 과제명 */
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        /** 사업기간 */
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);

        /** 총사업비 */
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(map.ALL_BUSN_COST));
        /** 법인사업비(수주금액) */ /** 법인사업비 정의 5번째 바뀜 */
        if(map.TAX_GUBUN == "1"){
            hwpDocCtrl.putFieldText('PJT_AMT', comma((delvMap.TOT_RES_COST / 1.1).toString().split(".")[0]));
        }else{
            hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(delvMap.TOT_RES_COST));
        }

        /** 사업책임자 */
        const mngInfo = getUser(map.PM_EMP_SEQ);
        const mngText = mngInfo.deptNm + " " + map.PM + " " + fn_getSpot(mngInfo.DUTY_NAME, mngInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('MANAGE_NM', mngText);
        /** 사업담당자 */
        const pmInfo = getUser(map.EMP_SEQ);
        const pmText = pmInfo.deptNm + " " + map.EMP_NAME + " " + fn_getSpot(pmInfo.DUTY_NAME, pmInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('PM_EMP_NM', pmText);

        /** 3. 특이사항 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("map", " ");
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(delvMap.UN_RND_ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    delvInit: function(pjtSn){
        unRndInit.globalDataSet(pjtSn, "delv");

        const pjtInfo = unRndInit.global.pjtInfo;
        const unRndInfo = unRndInit.global.unRndInfo;

        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;

        const customG20 = customKendo.fn_customAjax("/project/getProjectBudgetListSum.do", {pjtSn: pjtSn});


        /** 1. 사업정보 */
        unRndInit.delvSet();

        /** 2. 사업 목적 및 내용 */
        hwpDocCtrl.putFieldText('OBJ', delvMap.UN_RND_OBJ);
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

        //const htmlG20 = rndInit.htmlCustomG20(customG20, delvMap.TOT_RES_COST);
        //hwpDocCtrl.moveToField('content', true, true, false);
        //hwpDocCtrl.setTextFile(htmlG20, "HTML", "insertfile", {});
    },

    devInit: function(devSn){
        const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;

        unRndInit.globalDataSet(pjtSn, "dev");
        const pjtInfo = unRndInit.global.pjtInfo;
        const unRndInfo = unRndInit.global.unRndInfo;
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;

        let pjtAmt = 0;

        if(map.PJT_AMT != null && map.PJT_AMT != "" && map.PJT_AMT != 0){
            pjtAmt = Number(map.PJT_AMT);
        }else{
            pjtAmt = Number(delvMap.TOT_RES_COST);
        }

        const customG20Result = customKendo.fn_customAjax("/project/getProjectBudgetList.do", {pjtSn: pjtSn});
        const processResult = customKendo.fn_customAjax("/project/getProcessList2", {devSn: devSn});
        const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devSn});
        const getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: devSn});
        const purcList = purcResult.list;

        /** 1. 사업정보 */
        unRndInit.delvSet();

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
            hwpDocCtrl.putFieldText('TM_PER', Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%"));
        }

        /** 5. 예상재무성과 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.EST_TOT_AMT);
        }
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', String(fn_numberWithCommas(invSum)));
        let invPer = (invSum / pjtAmt * 100).toFixed(1);
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_AMT2', String(fn_numberWithCommas(pjtAmt-invSum)));
        hwpDocCtrl.putFieldText('INV_PER3', Number(100-invPer).toFixed(1)+"%");

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

            /** 수부부서 매출*/
            hwpDocCtrl.putFieldText('AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
            let delvPer = (delvAmt / pjtAmt * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER', delvPer+"%");

            /** 수주부서 비용*/
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            invPer = (invSum / delvAmt * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
            hwpDocCtrl.putFieldText('INV_PER3', Number(100-invPer).toFixed(1)+"%");


            /** 협업부서 매출*/
            hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TEAM_PER', Number(100-delvPer).toFixed(1)+"%");

            /** 협업부서 비용*/
            hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
            let teamPer = (teamInvSum / team.TM_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('TEAM_PER2', teamPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_PER3', Number(100-teamPer).toFixed(1)+"%");

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
        unRndInit.globalDataSet(pjtSn, "res");
        const pjtInfo = unRndInit.global.pjtInfo;
        const unRndInfo = unRndInit.global.unRndInfo;
        const devInfo = unRndInit.global.devInfo;

        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;
        const devMap = devInfo.rs;

        /** 참여인력 및 일정 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList", {devSn: devMap.DEV_SN});
        /** 투자내역 */
        const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});
        /** 구매/비용내역 */
        const resPurcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: pjtSn});
        const customG20Result = customKendo.fn_customAjax("/project/getProjectBudgetList.do", {pjtSn: pjtSn});
        const getResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});

        const resResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});
        const resMap = resResult.result.map;

        /** 1. 사업정보 */
        unRndInit.delvSet();

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
            hwpDocCtrl.putFieldText('TM_PER', Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%"));
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

        let psAllText = "";
        const processList = processResult.list;
        for(let i=0; i<processList.length; i++){
            const psMap = processList[i];
            if(i != 0){
                psAllText += ", ";
            }
            psAllText += "("+psMap.PS_NM+") "+psMap.PS_EMP_NM;
        }
        hwpDocCtrl.putFieldText("PS_ALL", psAllText);
        hwpDocCtrl.putFieldText("RES_ETC", "");
        hwpDocCtrl.putFieldText("RES_ETC", "");

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
            let invPer = (invSum / map.PJT_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
            hwpDocCtrl.putFieldText('INV_AMT2', (map.PJT_AMT-invSum) == 0 ? "0" : String(fn_numberWithCommas(map.PJT_AMT-invSum)));
            hwpDocCtrl.putFieldText('INV_PER3', Number(100-invPer).toFixed(1)+"%");

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
                hwpDocCtrl.putFieldText('PJT_AMT', (map.PJT_AMT) == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
                hwpDocCtrl.putFieldText('AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
                let delvPer = (delvAmt / map.PJT_AMT * 100).toFixed(1);

                /** 수주부서 비용*/
                hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
                invPer = (invSum / delvAmt * 100).toFixed(1);
                hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
                hwpDocCtrl.putFieldText('INV_PER3', Number(100-invPer).toFixed(1)+"%");

                /** 협업부서 매출*/
                hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));

                /** 협업부서 비용*/
                hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
                let teamPer = (teamInvSum / team.TM_AMT * 100).toFixed(1);
                hwpDocCtrl.putFieldText('TEAM_PER2', teamPer+"%");

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
                hwpDocCtrl.putFieldText('TEAM_PER3', Number(100-teamPer).toFixed(1)+"%");

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
                resInvSum += Number(map.ITEM_AMT);
            }
            const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: map.PJT_SN});
            const trip = tripResult.map;
            if(trip.COUNT != 0){
                resInvSum += trip.BUSTRIP_EXNP_SUM;
            }
            if(map.BUSN_CLASS == "R" || map.BUSN_CLASS == "S"){
                const costList = customKendo.fn_customAjax("/payApp/getPjtExnpList", {pjtSn: map.PJT_SN}).list;
                for(let i=0; i<costList.length; i++){
                    const map = costList[i];
                    invSum += map.COST_SUM;
                }
            }
            hwpDocCtrl.putFieldText('RES_AMT1', map.PJT_AMT == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
            hwpDocCtrl.putFieldText('RES_INV_AMT', resInvSum == 0 ? "0" : fn_numberWithCommas(resInvSum));
            let resInvPer = (resInvSum / map.PJT_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('RES_INV_PER2', resInvPer+"%");
            hwpDocCtrl.putFieldText('RES_INV_AMT2', (map.PJT_AMT-resInvSum) == 0 ? "0" : String(fn_numberWithCommas(map.PJT_AMT-resInvSum)));
            hwpDocCtrl.putFieldText('RES_INV_PER3', Number(100-resInvPer).toFixed(1)+"%");

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
                let delvPer = (delvAmt / map.PJT_AMT * 100).toFixed(1);

                /** 수주부서 비용*/
                hwpDocCtrl.putFieldText('RES_INV_AMT', resInvSum == 0 ? "0" : fn_numberWithCommas(resInvSum));
                resInvPer = (resInvSum / delvAmt * 100).toFixed(1);
                hwpDocCtrl.putFieldText('RES_INV_PER2', resInvPer+"%");

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('RES_INV_AMT2', (delvAmt - resInvSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
                hwpDocCtrl.putFieldText('RES_INV_PER3', Number(100-resInvPer).toFixed(1)+"%");


                /** 협업부서 매출*/
                hwpDocCtrl.putFieldText('RES_TEAM_AMT', fn_numberWithCommas(team.TM_AMT));

                /** 협업부서 비용*/
                hwpDocCtrl.putFieldText('RES_TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
                let teamPer = (teamInvSum / team.TM_AMT * 100).toFixed(1);
                hwpDocCtrl.putFieldText('RES_TEAM_PER2', teamPer+"%");

                /** 수주부서 수익*/
                hwpDocCtrl.putFieldText('RES_TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
                hwpDocCtrl.putFieldText('RES_TEAM_PER3', Number(100-teamPer).toFixed(1)+"%");

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

        /** 8. 특이사항 */
        const res = getResult.result.map;
        setTimeout(function() {
            hwpDocCtrl.putFieldText("ETC", " ");
            hwpDocCtrl.moveToField("ETC", true, true, false);
            hwpDocCtrl.setTextFile(res.RS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    }
}