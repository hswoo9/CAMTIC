var hwpInit = {

    pjtResInit: function(pjtSn){

        let data = {
            pjtSn: pjtSn
        }

        let result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        let getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", data);
        let invList = customKendo.fn_customAjax("/project/getInvList", data).list;

        let delvMap = result.delvMap;
        let map = result.map;
        let dev = getDevelopPlan.rs;

        console.log(delvMap);
        console.log(map);
        console.log(dev);

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('DEPT_NAME', delvMap.DEPT_NAME);
        hwpDocCtrl.putFieldText('PJT_AMT', fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('PM_EMP_NM', delvMap.PM_EMP_NM);
        hwpDocCtrl.putFieldText("PJT_DT", delvMap.PJT_STR_DT + " ~ " + delvMap.PJT_END_DT);
        let DelvDeptText = Number(delvMap.DELV_DEPT) == 0 ? "부서내 진행" : "부서간 협업";
        hwpDocCtrl.putFieldText('DELV_DEPT', DelvDeptText);
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

        /** 4. 구매(계획/실적) */
        let invAmt = 0;
        for(let i=0; i<invList.length; i++){
            invAmt += invList[i].EST_TOT_AMT;
        }
        hwpDocCtrl.putFieldText('PLAN_AMT', fn_numberWithCommas(invAmt));
        hwpDocCtrl.putFieldText('PERFORMANCE_AMT', fn_numberWithCommas((map.PJT_AMT == null ? 0 : map.PJT_AMT) - invAmt));


        /** 5. 계획대비 실적표 */
        hwpDocCtrl.putFieldText('PLAN_DELV_AMT', fn_numberWithCommas(map.PJT_AMT));
        let planPer = Math.round(Number( invAmt / (map.PJT_AMT == null ? 0 : map.PJT_AMT) * 100));
        hwpDocCtrl.putFieldText('PLAN_PER', planPer + "%");

        hwpDocCtrl.putFieldText('REVENUE_AMT', fn_numberWithCommas((map.PJT_AMT == null ? 0 : map.PJT_AMT) - invAmt));
        hwpDocCtrl.putFieldText('REVENUE_PER', (100 - planPer) + "%");

        /** 5. 계획대비 실적률 */
        alert(fn_numberWithCommas(map.EXP_AMT));
        hwpDocCtrl.putFieldText('EXP_AMT', fn_numberWithCommas(map.EXP_AMT));
        let rs = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        const ls = rs.list;
        for(let i=0; i<ls.length; i++){
            hwpDocCtrl.putFieldText('CELL'+(i+1), ls[i].PS_EMP_NM);

            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.PREP_A != null && rs.result.map.PREP_A != ""){
                        value = rs.result.map.PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_B != null && rs.result.map.PREP_B != "") {
                        value = rs.result.map.PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.PREP_C != null && rs.result.map.PREP_C != "") {
                        value = rs.result.map.PREP_C;
                    }
                }
            }
            calcAmt = Math.round((map.EXP_AMT == null ? 0 : map.EXP_AMT) * (value * 0.01));
            console.log(calcAmt);
            hwpDocCtrl.putFieldText('CELL_AMT'+(i+1), fn_numberWithCommas(calcAmt));
            hwpDocCtrl.putFieldText('CELL_PER'+(i+1), value + "%");
        }
    }
}