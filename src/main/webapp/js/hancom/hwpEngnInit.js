var engnInit = {

    delvInit: function(pjtSn){
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const delvMap = result.delvMap;
        const map = result.map;

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('DEPT_NAME', delvMap.DEPT_NAME);
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('PM_EMP_NM', delvMap.PM_EMP_NM);
        hwpDocCtrl.putFieldText("PJT_DT", delvMap.PJT_STR_DT + " ~ " + delvMap.PJT_END_DT);
        hwpDocCtrl.putFieldText('DELV_DEPT', delvMap.DELV_DEPT == "0" ? "부서내 진행" : "부서간 협업");
        hwpDocCtrl.putFieldText("DELV_PAY", delvMap.DELV_PAY);
        hwpDocCtrl.putFieldText('CRM_NM', map.CRM_NM);
        hwpDocCtrl.putFieldText('CRM_CEO', map.CRM_CEO);
        hwpDocCtrl.putFieldText('ADDR', map.ADDR);
        hwpDocCtrl.putFieldText('PH_NUM', map.PH_NUM);
        hwpDocCtrl.putFieldText('CRM_MEM_NM', map.CRM_MEM_NM);
        hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.CRM_MEM_PHN);

        /** 2. 납품정보 */
        hwpDocCtrl.putFieldText('DELV_ITEM', delvMap.DELV_ITEM);
        hwpDocCtrl.putFieldText('DELV_CNT', String(delvMap.DELV_CNT));
        hwpDocCtrl.putFieldText('DELV_UNIT', delvMap.DELV_UNIT);
        hwpDocCtrl.putFieldText('DELV_AMT', fn_numberWithCommas(delvMap.DELV_AMT));
        hwpDocCtrl.putFieldText('DELV_DE', delvMap.DELV_DE);
        hwpDocCtrl.putFieldText('DELV_LOC', delvMap.DELV_LOC);

        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/engn/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;
            console.log("team");
            console.log(team);

            /** 3. 협업사항 */
            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', team.EMP_NAME);
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TM_PER', ((team.TM_AMT/map.PJT_AMT) * 100).toString().substring(0,4)+"%");
        }

        /** 4. 특이사항 */
        hwpDocCtrl.moveToField('ETC', true, true, false);
        hwpDocCtrl.setTextFile(delvMap.DELV_ISSU.replaceAll("\n", "<br>"), "html","insertfile");
    }
}