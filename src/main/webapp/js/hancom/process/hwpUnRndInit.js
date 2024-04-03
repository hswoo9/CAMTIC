var unRndInit = {

    delvInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;
        const customG20 = customKendo.fn_customAjax("/project/getProjectBudgetListSum.do", {pjtSn: pjtSn});

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

        /** 1. 사업정보 */
        let yearText = " ";
        if(map.YEAR_CLASS != null){
            if(map.YEAR_CLASS == "M"){
                yearText = "다년";
            }else{
                yearText = "단년";
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
        if(map.CODE_VAL == "1"){
            taxText = "수익사업";
        }else if(map.CODE_VAL == "2"){
            taxText = "고유목적사업";
        }else if(map.CODE_VAL == "3"){
            taxText = "공통사업";
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
        /** 법인사업비(수주금액) */ /** 법인사업비 정의 4번째 바뀜 */
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(delvMap.TOT_RES_COST));

        /** 사업책임자 */
        const mngInfo = getUser(map.PM_EMP_SEQ);
        const mngText = map.PM + " " + fn_getSpot(mngInfo.DUTY_NAME, mngInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('MANAGE_NM', mngText);
        /** 사업담당자 */
        const pmInfo = getUser(map.EMP_SEQ);
        const pmText = map.EMP_NAME + " " + fn_getSpot(pmInfo.DUTY_NAME, pmInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('PM_EMP_NM', pmText);

        /** 2. 사업 목적 및 내용 */
        hwpDocCtrl.putFieldText('OBJ', delvMap.UN_RND_OBJ);
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(delvMap.TOT_RES_COST));
        hwpDocCtrl.putFieldText('PEO_RES_ITEM', delvMap.PEO_RES_ITEM == 0 ? "0" : fn_numberWithCommas(delvMap.PEO_RES_ITEM));

        let g20Sum = 0;
        console.log("customG20", customG20);
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
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('BUSN_CLASS', map.BUSN_NM);
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('DEPT_NAME', delvMap.MNG_DEPT_NAME);
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(delvMap.TOT_RES_COST));
        hwpDocCtrl.putFieldText('PM_EMP_NM', map.PM);
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        hwpDocCtrl.putFieldText('CRM_CEO', map.CRM_CEO);
        hwpDocCtrl.putFieldText('ADDR', map.ADDR);
        hwpDocCtrl.putFieldText('PH_NUM', map.PH_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_NM', map.TEL_NUM == "" ? map.CRM_CEO : map.TEL_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.PH_NUM);

        /** 2. 과제정보 */
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(Number(delvMap.TOT_RES_COST) + Number(delvMap.PEO_RES_ITEM)));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(delvMap.TOT_RES_COST));
        hwpDocCtrl.putFieldText('PEO_RES_ITEM', delvMap.PEO_RES_ITEM == 0 ? "0" : fn_numberWithCommas(delvMap.PEO_RES_ITEM));

        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            /** 3. 협업사항 */
            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', team.EMP_NAME);
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TM_PER', ((team.TM_AMT/map.PJT_AMT) * 100).toString().substring(0,4)+"%");
        }

        /** 4. 수행계획 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList", {devSn: devSn});
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);
        hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
        hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");

        /** 5. 구매예정 */
        const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devSn});
        const purcList = purcResult.list;
        const htmlData = engnInit.htmlInv(purcList, map);
        setTimeout(function() {
            hwpDocCtrl.moveToField('PURC_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 1000);

        /** 6. 정산내역 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.EST_TOT_AMT);
        }
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', String(fn_numberWithCommas(invSum)));
        let invPer = (invSum / map.PJT_AMT * 100).toFixed(1);
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_AMT2', String(fn_numberWithCommas(map.PJT_AMT-invSum)));
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");

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
            hwpDocCtrl.putFieldText('AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
            let delvPer = (delvAmt / map.PJT_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER', delvPer+"%");

            /** 수주부서 비용*/
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            invPer = (invSum / delvAmt * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
            hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");


            /** 협업부서 매출*/
            hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TEAM_PER', (100-delvPer)+"%");

            /** 협업부서 비용*/
            hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
            let teamPer = (teamInvSum / team.TM_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('TEAM_PER2', teamPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_PER3', (100-teamPer)+"%");

            /** 합계 */
            hwpDocCtrl.putFieldText('SUM_AMT', fn_numberWithCommas(map.PJT_AMT));
            hwpDocCtrl.putFieldText('TEAM_INV_AMT_SUM', fn_numberWithCommas(invSum + teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT_SUM', fn_numberWithCommas(map.PJT_AMT - invSum - teamInvSum));
        }

        /** 7. 특이사항 */
        const getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: devSn});
        const dev = getDevelopPlan.rs;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(dev.ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 2000);
    },

    resInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const resultD = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;
        const devMap = resultD.rs;
        const chResult = customKendo.fn_customAjax("/projectRnd/getChangeList", {pjtSn: pjtSn, order: "ASC"});
        const chList = chResult.list;

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('BUSN_CLASS', map.BUSN_NM);
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('DEPT_NAME', delvMap.MNG_DEPT_NAME);
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(delvMap.TOT_RES_COST));
        hwpDocCtrl.putFieldText('PM_EMP_NM', map.PM);
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        hwpDocCtrl.putFieldText('CRM_CEO', map.CRM_CEO);
        hwpDocCtrl.putFieldText('ADDR', map.ADDR);
        hwpDocCtrl.putFieldText('PH_NUM', map.PH_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_NM', map.TEL_NUM == "" ? map.CRM_CEO : map.TEL_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.PH_NUM);

        /** 2. 과제정보 */
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(Number(delvMap.TOT_RES_COST) + Number(delvMap.PEO_RES_ITEM)));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(delvMap.TOT_RES_COST));
        hwpDocCtrl.putFieldText('PEO_RES_ITEM', delvMap.PEO_RES_ITEM == 0 ? "0" : fn_numberWithCommas(delvMap.PEO_RES_ITEM));

        const date = new Date();
        const year = date.getFullYear().toString().substring(2,4);
        const g20 = customKendo.fn_customAjax("/g20/getSubjectList", {
            stat: "project",
            gisu: year,
            fromDate: date.getFullYear().toString() + "0101",
            toDate: date.getFullYear().toString() + "1231",
            mgtSeq: map.PJT_CD,
            opt01: "3",
            opt02: "1",
            opt03: "2",
            baseDate: date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
            pjtSn: pjtSn
        });
        const htmlG20 = rndInit.htmlG20(g20);
        hwpDocCtrl.moveToField('content', true, true, false);
        hwpDocCtrl.setTextFile(htmlG20, "HTML", "insertfile", {});

        /** 3. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', team.EMP_NAME);
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TM_PER', ((team.TM_AMT/map.PJT_AMT) * 100).toString().substring(0,4)+"%");
        }

        /** 4. 수행계획 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList", {devSn : devMap.DEV_SN});
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);
        setTimeout(function() {
            hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");
        }, 5000);

        /** 5. 구매/비용내역 */
        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: pjtSn});
        const purcList = purcResult.list;
        const htmlData = engnInit.htmlPurc(purcList, map);
        setTimeout(function() {
            hwpDocCtrl.moveToField('PURC_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 7000);

        /** 6. 정산내역 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.ITEM_AMT);
        }
        const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: map.PJT_SN});
        const trip = tripResult.map;
        if(trip.COUNT != 0){
            invSum += trip.BUSTRIP_EXNP_SUM;
        }
        if(map.BUSN_CLASS == "R" || map.BUSN_CLASS == "S"){
            const costList = customKendo.fn_customAjax("/payApp/getPjtExnpList", {pjtSn: map.PJT_SN}).list;
            for(let i=0; i<costList.length; i++){
                const map = costList[i];
                invSum += map.COST_SUM;
            }
        }
        hwpDocCtrl.putFieldText('AMT1', map.PJT_AMT == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
        let invPer = (invSum / map.PJT_AMT * 100).toFixed(1);
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_AMT2', (map.PJT_AMT-invSum) == 0 ? "0" : String(fn_numberWithCommas(map.PJT_AMT-invSum)));
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");

        if(map.TM_YN == "Y") {
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
            hwpDocCtrl.putFieldText('AMT1', delvAmt == 0 ? "0" : fn_numberWithCommas(delvAmt));
            let delvPer = (delvAmt / map.PJT_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER', delvPer+"%");

            /** 수주부서 비용*/
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            invPer = (invSum / delvAmt * 100).toFixed(1);
            hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
            hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");


            /** 협업부서 매출*/
            hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TEAM_PER', (100-delvPer)+"%");

            /** 협업부서 비용*/
            hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
            let teamPer = (teamInvSum / team.TM_AMT * 100).toFixed(1);
            hwpDocCtrl.putFieldText('TEAM_PER2', teamPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_PER3', (100-teamPer)+"%");

            /** 합계 */
            hwpDocCtrl.putFieldText('SUM_AMT', fn_numberWithCommas(map.PJT_AMT));
            hwpDocCtrl.putFieldText('TEAM_INV_AMT_SUM', fn_numberWithCommas(invSum + teamInvSum));
            hwpDocCtrl.putFieldText('TEAM_INV2_AMT_SUM', fn_numberWithCommas(map.PJT_AMT - invSum - teamInvSum));

        }

        /** 7. 구매/비용내역 */
        const changeData = rndInit.htmlChange(chList, map);
        setTimeout(function() {
            hwpDocCtrl.moveToField('CHANGE_HTML', true, true, false);
            hwpDocCtrl.setTextFile(changeData, "html","insertfile");
        }, 8000);

        /** 8. 특이사항 */
        const getResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});
        const res = getResult.result.map;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(res.RS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 11000);
    }
}