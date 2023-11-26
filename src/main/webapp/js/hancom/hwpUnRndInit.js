var unRndInit = {

    delvInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('DEPT_NAME', delvMap.MNG_DEPT_NAME);
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('PM_EMP_NM', map.PM);
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        hwpDocCtrl.putFieldText('CRM_CEO', map.CRM_CEO);
        hwpDocCtrl.putFieldText('ADDR', map.ADDR);
        hwpDocCtrl.putFieldText('PH_NUM', map.PH_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_NM', map.TEL_NUM == "" ? map.CRM_CEO : map.TEL_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.PH_NUM);

        /** 2. 과제정보 */
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_SUB_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(map.PJT_AMT));
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
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('PM_EMP_NM', map.PM);
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        hwpDocCtrl.putFieldText('CRM_CEO', map.CRM_CEO);
        hwpDocCtrl.putFieldText('ADDR', map.ADDR);
        hwpDocCtrl.putFieldText('PH_NUM', map.PH_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_NM', map.TEL_NUM == "" ? map.CRM_CEO : map.TEL_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.PH_NUM);

        /** 2. 과제정보 */
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_SUB_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_BUSN_COST));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_RES_COST));

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
        const processResult = customKendo.fn_customAjax("/project/getProcessList", {pjtSn: pjtSn});
        const processList = processResult.list;
        const htmlDev = engnInit.htmlDev(processList, pjtSn, map.TM_YN);
        hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
        hwpDocCtrl.setTextFile(htmlDev, "html","insertfile");

        /** 5. 구매예정 */
        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: pjtSn});
        const purcList = purcResult.list;
        const htmlData = engnInit.htmlPurc(purcList, pjtSn, map.TM_YN);
        setTimeout(function() {
            hwpDocCtrl.moveToField('PURC_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 200);

        /** 6. 정산내역 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.PURC_ITEM_AMT);
        }
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', fn_numberWithCommas(invSum));
        let invPer = Math.round(invSum / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_AMT2', fn_numberWithCommas(map.PJT_AMT-invSum));
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");
    },

    resInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('BUSN_CLASS', map.BUSN_NM);
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('DEPT_NAME', delvMap.MNG_DEPT_NAME);
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('PM_EMP_NM', map.PM);
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        hwpDocCtrl.putFieldText('CRM_CEO', map.CRM_CEO);
        hwpDocCtrl.putFieldText('ADDR', map.ADDR);
        hwpDocCtrl.putFieldText('PH_NUM', map.PH_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_NM', map.TEL_NUM == "" ? map.CRM_CEO : map.TEL_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.PH_NUM);

        /** 2. 과제정보 */
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_SUB_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_BUSN_COST));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_RES_COST));

        const date = new Date();
        const year = date.getFullYear().toString().substring(2,4);
        const g20 = customKendo.fn_customAjax("/g20/getSubjectList", {
            stat: "project",
            gisu: year,
            fromDate: date.getFullYear().toString() + "0101",
            toDate: date.getFullYear().toString() + "1231",
            mgtSeq: "Pk1a423012",
            opt01: "3",
            opt02: "1",
            opt03: "2",
            baseDate: date.getFullYear().toString() + date.getMonth().toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
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
        const processResult = customKendo.fn_customAjax("/project/getProcessList", {pjtSn: pjtSn});
        const processList = processResult.list;
        const htmlDev = engnInit.htmlDev(processList, pjtSn, map.TM_YN);
        setTimeout(function() {
            hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlDev, "html","insertfile");
        }, 3000);

        /** 5. 구매예정 */
        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: pjtSn});
        const purcList = purcResult.list;
        const htmlData = engnInit.htmlPurc(purcList, pjtSn, map.TM_YN);
        setTimeout(function() {
            hwpDocCtrl.moveToField('PURC_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 3200);

        /** 6. 정산내역 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.PURC_ITEM_AMT);
        }
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', fn_numberWithCommas(invSum));
        let invPer = Math.round(invSum / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_AMT2', fn_numberWithCommas(map.PJT_AMT-invSum));
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");

        /** 7. 특이사항 */
        const getResult = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        const res = getResult.result.map;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(res.RS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 3400);
    }
}