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
        let rs = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        const ls = rs.list;

        hwpDocCtrl.putFieldText('INV_AMT', String(fn_numberWithCommas(invAmt)));
        for(let i=0; i<ls.length; i++){
            /** 인원(최대 3칸) */
            hwpDocCtrl.putFieldText('CELL'+(i+1), ls[i].PS_EMP_NM);

            /** 수익 */
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.DELV_PREP_A != null && rs.result.map.DELV_PREP_A != ""){
                        value = rs.result.map.DELV_PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_B != null && rs.result.map.DELV_PREP_B != "") {
                        value = rs.result.map.DELV_PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.DELV_PREP_C != null && rs.result.map.DELV_PREP_C != "") {
                        value = rs.result.map.DELV_PREP_C;
                    }
                }
            }
            calcAmt = Math.round(rs.pjtInfo.PJT_AMT * (value * 0.01));
            hwpDocCtrl.putFieldText('CELL_DELV_AMT'+(i+1), String(fn_numberWithCommas(calcAmt)));
            hwpDocCtrl.putFieldText('CELL_DELV_PER'+(i+1), value + "%");
        }

        for(let i=0; i<ls.length; i++){
            /** 매출 */
            var value = 0;
            var calcAmt = 0;
            var type = "";
            if(ls[i].PS_PREP == 1){
                type = "A";
                if(rs.result.map != undefined){
                    if(rs.result.map.INV_PREP_A != null && rs.result.map.INV_PREP_A != ""){
                        value = rs.result.map.INV_PREP_A;
                    }
                }
            } else if (ls[i].PS_PREP == 2){
                type = "B";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_B != null && rs.result.map.INV_PREP_B != "") {
                        value = rs.result.map.INV_PREP_B;
                    }
                }
            } else if (ls[i].PS_PREP == 3){
                type = "C";
                if(rs.result.map != undefined) {
                    if (rs.result.map.INV_PREP_C != null && rs.result.map.INV_PREP_C != "") {
                        value = rs.result.map.INV_PREP_C;
                    }
                }
            }
            calcAmt = Math.round(invAmt * (value * 0.01));
            hwpDocCtrl.putFieldText('CELL_INV_AMT'+(i+1), String(fn_numberWithCommas(calcAmt)));
            hwpDocCtrl.putFieldText('CELL_INV_PER'+(i+1), value + "%");
        }

        for(let i=0; i<ls.length; i++){
            /** 수익 */
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
            calcAmt = Math.round((rs.pjtInfo.PJT_AMT-invAmt) * (value * 0.01));
            hwpDocCtrl.putFieldText('CELL_AMT'+(i+1), String(fn_numberWithCommas(calcAmt)));
            hwpDocCtrl.putFieldText('CELL_PER'+(i+1), value + "%");
        }
        hwpDocCtrl.putFieldText('EXP_AMT', fn_numberWithCommas(rs.pjtInfo.PJT_AMT-invAmt));
    },

    pjtCostInit: function(pjtSn){

        let data = {
            pjtSn: pjtSn
        }

        let result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        let getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", data);
        let invList = customKendo.fn_customAjax("/project/getInvList", data).list;

        let delvMap = result.delvMap;
        let map = result.map;
        let dev = getDevelopPlan.rs;

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
            hwpDocCtrl.putFieldText('CELL_AMT'+(i+1), fn_numberWithCommas(calcAmt));
            hwpDocCtrl.putFieldText('CELL_PER'+(i+1), value + "%");
        }

        /** 5. 비용상세 내역 노임단가 */
        if(ls != null){
            let prepTime = 0;
            let sum = 0;
            for(let i=0; i<ls.length; i++){
                if(ls[i].PS_PREP_NM == "설계"){
                    prepTime = ls[i].PREP_A_TIME;
                    hwpDocCtrl.putFieldText('PREP_A_POSITION', ls[i].POSITION_NAME);
                    hwpDocCtrl.putFieldText('PREP_A_EMP_NAME', ls[i].PS_EMP_NM);
                    hwpDocCtrl.putFieldText('PREP_A_LABOR_UNIT', fn_numberWithCommas(ls[i].LABOR_AMT));
                    hwpDocCtrl.putFieldText('PREP_A_PREP_TIME', String(prepTime));
                    hwpDocCtrl.putFieldText('PREP_A_COST_TOT', fn_numberWithCommas((ls[i].LABOR_AMT == null ? "0" : ls[i].LABOR_AMT) * prepTime));
                }else if(ls[i].PS_PREP_NM == "제작"){
                    prepTime = ls[i].PREP_B_TIME;
                    hwpDocCtrl.putFieldText('PREP_B_POSITION', ls[i].POSITION_NAME);
                    hwpDocCtrl.putFieldText('PREP_B_EMP_NAME', ls[i].PS_EMP_NM);
                    hwpDocCtrl.putFieldText('PREP_B_LABOR_UNIT', fn_numberWithCommas(ls[i].LABOR_AMT));
                    hwpDocCtrl.putFieldText('PREP_B_PREP_TIME', String(prepTime));
                    hwpDocCtrl.putFieldText('PREP_B_COST_TOT', fn_numberWithCommas((ls[i].LABOR_AMT == null ? "0" : ls[i].LABOR_AMT) * prepTime));
                }else if(ls[i].PS_PREP_NM == "품질"){
                    prepTime = ls[i].PREP_C_TIME;
                    hwpDocCtrl.putFieldText('PREP_C_POSITION', ls[i].POSITION_NAME);
                    hwpDocCtrl.putFieldText('PREP_C_EMP_NAME', ls[i].PS_EMP_NM);
                    hwpDocCtrl.putFieldText('PREP_C_LABOR_UNIT', fn_numberWithCommas(ls[i].LABOR_AMT));
                    hwpDocCtrl.putFieldText('PREP_C_PREP_TIME', String(prepTime));
                    hwpDocCtrl.putFieldText('PREP_C_COST_TOT', fn_numberWithCommas((ls[i].LABOR_AMT == null ? "0" : ls[i].LABOR_AMT) * prepTime));
                }else{
                    prepTime = ls[i].PREP_D_TIME;
                    hwpDocCtrl.putFieldText('PREP_D_POSITION', ls[i].POSITION_NAME);
                    hwpDocCtrl.putFieldText('PREP_D_EMP_NAME', ls[i].PS_EMP_NM);
                    hwpDocCtrl.putFieldText('PREP_D_LABOR_UNIT', fn_numberWithCommas(ls[i].LABOR_AMT));
                    hwpDocCtrl.putFieldText('PREP_D_PREP_TIME', String(prepTime));
                    hwpDocCtrl.putFieldText('PREP_D_COST_TOT', fn_numberWithCommas((ls[i].LABOR_AMT == null ? "0" : ls[i].LABOR_AMT) * prepTime));
                }
                sum += (ls[i].LABOR_AMT == null ? "0" : ls[i].LABOR_AMT) * prepTime;
            }
            hwpDocCtrl.putFieldText('PREP_ALL_COST_TOT', fn_numberWithCommas(sum));
        }
    },

    purcInit: function(purcSn){
        let data = {
            purcSn: purcSn
        }

        const result = customKendo.fn_customAjax("/purc/getPurcReq.do", data).data;
        console.log(result);

        /** 1. 구매요청서 데이터 */
        hwpDocCtrl.putFieldText('DOC_NUM', "");
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
        hwpDocCtrl.putFieldText('DEPT_NAME', result.DEPT_NAME);
        hwpDocCtrl.putFieldText('EMP_NAME', result.EMP_NAME_KR);
        hwpDocCtrl.putFieldText('PURC_REQ_PURPOSE', result.PURC_REQ_PURPOSE);

        const purcType = result.PURC_TYPE;
        let purcTypeText = "";
        if(purcType == "1"){
            purcTypeText = "법인운영";
        }else if(purcType == "2"){
            purcTypeText = "교육사업";
        }else if(purcType == "3"){
            purcTypeText = "일자리사업";
        }else if(purcType == "4"){
            purcTypeText = "기능보간";
        }else if(purcType == "5"){
            purcTypeText = "지원사업";
        }else if(purcType == "6"){
            purcTypeText = "협의회";
        }
        hwpDocCtrl.putFieldText('PURC_TYPE', purcTypeText);
    },

    claimInit: function(claimSn){
        let data = {
            claimSn: claimSn
        }

        const result = customKendo.fn_customAjax("/purc/getPurcClaimData", data).data;

        /** 1. 구매요청서 데이터 */
        hwpDocCtrl.putFieldText('DOC_NUM', "");
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
        hwpDocCtrl.putFieldText('TO_DEPT_NAME', result.DEPT_NAME);
    }
}