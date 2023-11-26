var hwpInit = {
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
    },


    payAppInit: function(payAppSn){
        let data = {
            payAppSn: payAppSn
        }
        const result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        const rs = result.map;
        const ls = result.list;
        console.log(ls);

        /** 1. 지급신청서 데이터 */
        hwpDocCtrl.putFieldText('DOC_NO', rs.DOC_NO);
        hwpDocCtrl.putFieldText('REG_DATE', rs.REG_DATE);
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        hwpDocCtrl.putFieldText('APP_TITLE', ls[0].CRM_NM);
        hwpDocCtrl.putFieldText('APP_CONT', rs.APP_CONT);
        hwpDocCtrl.putFieldText('ACC_NO', "("+ls[0].CRM_BNK_NM+") "+ls[0].CRM_ACC_NO+" "+ls[0].CRM_ACC_HOLDER);
        let budgetArr = ls[0].BUDGET_NM.split(" / ");
        hwpDocCtrl.putFieldText('BUDGET_NM1', budgetArr[0]);
        hwpDocCtrl.putFieldText('BUDGET_NM2', budgetArr[1]);
        hwpDocCtrl.putFieldText('BUDGET_NM3', budgetArr[2]);

        if(rs.PAY_APP_TYPE == 1){
            hwpDocCtrl.putFieldText('DOC_TITLE', "지 급 신 청 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 지급신청 합니다.");
        }else if(rs.PAY_APP_TYPE == 2){
            hwpDocCtrl.putFieldText('DOC_TITLE', "여 입 신 청 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 여입신청 합니다.");
        }else if(rs.PAY_APP_TYPE == 3){
            hwpDocCtrl.putFieldText('DOC_TITLE', "반 납 신 청 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 반납신청 합니다.");
        }else if(rs.PAY_APP_TYPE == 4){
            hwpDocCtrl.putFieldText('DOC_TITLE', "대 체 신 청 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 대체신청 합니다.");
        }
    },

    exnpInit: function(exnpSn){
        let data = {
            exnpSn: exnpSn
        }

        const result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        const rs = result.map;
        const ls = result.list;
        console.log("result");
        console.log(result);

        /** 1. 지출결의서 데이터 */
        hwpDocCtrl.putFieldText('PJT_NM', rs.PJT_NM);
        hwpDocCtrl.putFieldText('EMP_NAME', rs.REG_EMP_NAME);
        hwpDocCtrl.putFieldText('DEPT_NAME', "경영지원실");
        hwpDocCtrl.putFieldText('REG_ACC_NO', "("+rs.BNK_NM+") "+rs.ACC_NO+" "+rs.ACC_NM);
        let budgetArr = ls[0].BUDGET_NM.split(" / ");
        hwpDocCtrl.putFieldText('BUDGET_NM1', budgetArr[0]);
        hwpDocCtrl.putFieldText('BUDGET_NM2', budgetArr[1]);
        hwpDocCtrl.putFieldText('BUDGET_NM3', budgetArr[2]);
        hwpDocCtrl.putFieldText('DATE1', rs.DATE1);
        hwpDocCtrl.putFieldText('DATE2', rs.DATE2);
        hwpDocCtrl.putFieldText('DATE3', rs.DATE3);
        let totCost1 = "금"+fn_numberWithCommas(rs.TOT_COST)+"원     ";
        let totCost2 = "금 "+fn_koreanNumber(rs.TOT_COST)+"정";
        hwpDocCtrl.putFieldText('TOT_COST', totCost1+""+totCost2);
        hwpDocCtrl.putFieldText('APP_TITLE', rs.EXNP_BRIEFS);
        hwpDocCtrl.putFieldText('CRM_NM', ls[0].CRM_NM);
        hwpDocCtrl.putFieldText('CRM_ACC_NO', ls[0].CRM_ACC_NO);
        hwpDocCtrl.putFieldText('ACC_NO', "("+ls[0].CRM_BNK_NM+") "+ls[0].CRM_ACC_NO);
        hwpDocCtrl.putFieldText('CRM_ACC_HOLDER', ls[0].CRM_ACC_HOLDER);

        if(rs.PAY_APP_TYPE == 1){
            hwpDocCtrl.putFieldText('DOC_TITLE', "지 출 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 지출하고자 합니다.");
        }else if(rs.PAY_APP_TYPE == 2){
            hwpDocCtrl.putFieldText('DOC_TITLE', "여 입 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 입금처리 하고자 합니다.");
        }else if(rs.PAY_APP_TYPE == 3){
            hwpDocCtrl.putFieldText('DOC_TITLE', "반 납 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 반납처리 하고자 합니다.");
        }else if(rs.PAY_APP_TYPE == 4){
            hwpDocCtrl.putFieldText('DOC_TITLE', "대 체 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 지출하고자 합니다.");
        }
    },

    payIncpInit: function(payIncpSn){
        let data = {
            payIncpSn: payIncpSn
        }

        const result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", data);
        const rs = result.map;
        const ls = result.list;
        console.log("result");
        console.log(result);

        /** 1. 수입결의서 데이터 */
        hwpDocCtrl.putFieldText('PJT_NM', rs.PJT_NM);
        hwpDocCtrl.putFieldText('DOC_NO', rs.DOC_NO);
        hwpDocCtrl.putFieldText('EMP_NAME', rs.REG_EMP_NAME);
        hwpDocCtrl.putFieldText('DEPT_NAME', "경영지원실");

        let budgetArr = rs.BUDGET_NM.split(" / ");
        hwpDocCtrl.putFieldText('BUDGET_NM1', budgetArr[0]);
        hwpDocCtrl.putFieldText('BUDGET_NM2', budgetArr[1]);
        hwpDocCtrl.putFieldText('BUDGET_NM3', budgetArr[2]);
        hwpDocCtrl.putFieldText('REG_DEPT_NAME', rs.REG_DEPT_NAME);
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        hwpDocCtrl.putFieldText('APP_TITLE', rs.APP_CONT);
        hwpDocCtrl.putFieldText('ACC_NO', "("+rs.BNK_NM+") "+rs.ACC_NO+" "+rs.ACC_NM);
    },

    rndDevInit: function(devSn){
        let pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;
        const invList = customKendo.fn_customAjax("/project/getInvList", {pjtSn: pjtSn}).list;

        /** 1. 프로젝트(수주보고) 정보 */
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

        /** 5. 예상 정산내역 */
        var totAmt = 0;
        var invPer = 0;
        for(let i=0; i<invList.length; i++){
            totAmt += invList[i].EST_TOT_AMT;
        }
        invPer = Math.round(totAmt / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_AMT', fn_numberWithCommas(totAmt));
        hwpDocCtrl.putFieldText('INV_AMT2', fn_numberWithCommas(map.PJT_AMT-totAmt));
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");
    },

    unRndDevInit: function(devSn){
        let pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;
        const invList = customKendo.fn_customAjax("/project/getInvList", {pjtSn: pjtSn}).list;

        /** 1. 프로젝트(수주보고) 정보 */
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

        /** 4. 예상 정산내역 */
        var totAmt = 0;
        var invPer = 0;
        for(let i=0; i<invList.length; i++){
            totAmt += invList[i].EST_TOT_AMT;
        }
        invPer = Math.round(totAmt / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_AMT', fn_numberWithCommas(totAmt));
        hwpDocCtrl.putFieldText('INV_AMT2', fn_numberWithCommas(map.PJT_AMT-totAmt));
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");
    },

    pjtRateInit: function(partRateVerSn){
        const result = customKendo.fn_customAjax("/project/getPartRateVerInfo", {partRateVerSn: partRateVerSn});
        const rs = result.map;
        const pjtSn = rs.PJT_SN;

        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const map = pjtInfo.rs;

        hwpDocCtrl.putFieldText('CRM_NM', " "+map.CRM_NM);
        hwpDocCtrl.putFieldText('PJT_NM_TEXT', " "+map.PJT_NM+" 참여인력 변경의 건");

        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_SUB_NM);
        hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        const mng = result.result.projectManagerInfo;
        const mem = result.result.projectMemberInfo;
        const befMng = result.result2.projectManagerInfo;
        const befMem = result.result2.projectMemberInfo;
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="8" style="height:20px;background-color:#E6EEF7; text-align:center; width: 60px;"><p style="font-size:11px;"><b>변경 전</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 95px;"><p style="font-size:11px;">성명</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 50px;"><p style="font-size:11px;">직급</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">급여총액(원)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 80px;"><p style="font-size:11px;">참여시작</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 80px;"><p style="font-size:11px;">참여종료</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 60px;"><p style="font-size:11px;">기간(월)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 60px;"><p style="font-size:11px;">참여율</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">인건비합계(원)</p></td>';
        html += '               </tr>';
        /** 변경 전 담당자 */
        if(befMng != null){
            const map = befMng;
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.MNG_EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.MNG_EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(Number(map.CHNG_SAL) * 12) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_STR_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_END_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.TOT_RATE +'%</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(map.TOT_RES_COST) +'</p></td>';
            html += '               </tr>';
        }
        for(let i=0; i<befMem.length; i++){
            const map = befMem[i];
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(Number(map.CHNG_SAL) * 12) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_STR_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_END_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.TOT_RATE +'%</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(map.TOT_PAY_BUDG) +'</p></td>';
            html += '               </tr>';
        }
        html += '               <tr>';
        html += '                   <td colspan="8" style="height:20px;background-color:#E6EEF7; text-align:center; width: 60px;"><p style="font-size:11px;"><b>변경 후</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 95px;"><p style="font-size:11px;">성명</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 50px;"><p style="font-size:11px;">직급</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">급여총액(원)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 80px;"><p style="font-size:11px;">참여시작</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 80px;"><p style="font-size:11px;">참여종료</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 60px;"><p style="font-size:11px;">기간(월)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 60px;"><p style="font-size:11px;">참여율</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">인건비합계(원)</p></td>';
        html += '               </tr>';
        /** 변경 후 담당자 */
        if(mng != null){
            const map = mng;
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.MNG_EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.MNG_EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(Number(map.CHNG_SAL) * 12) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_STR_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_END_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.TOT_RATE +'%</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(map.TOT_RES_COST) +'</p></td>';
            html += '               </tr>';
        }
        for(let i=0; i<mem.length; i++){
            const map = mem[i];
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.EMP_NAME +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(Number(map.CHNG_SAL) * 12) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_STR_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PJT_END_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_monDiff(mng.PJT_STR_DT, mng.PJT_END_DT) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.TOT_RATE +'%</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(map.TOT_PAY_BUDG) +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        hwpDocCtrl.moveToField('content', true, true, false);
        hwpDocCtrl.setTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
    },

    rndResInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        console.log("pjtInfo");
        console.log(pjtInfo);
        const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
        console.log("rndInfo");
        console.log(rndInfo);
        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;
        const invList = customKendo.fn_customAjax("/project/getInvList", {pjtSn: pjtSn}).list;

        /** 1. 프로젝트(수주보고) 정보 */
        hwpDocCtrl.putFieldText('PJT_CD', map.PJT_TMP_CD);
        hwpDocCtrl.putFieldText('PJT_NM', map.PJT_NM);;
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

        /** 2. g20 데이터 연계 */
        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);
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
        console.log("g20");
        console.log(g20);
        //const sumall =
        //    g20.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        //console.log(sumall);

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
        hwpDocCtrl.moveToField('content', true, true, false);
        hwpDocCtrl.setTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});

        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_SUB_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_BUSN_COST));

        /** 5. 예상 정산내역 */
        var totAmt = 0;
        var invPer = 0;
        for(let i=0; i<invList.length; i++){
            totAmt += invList[i].EST_TOT_AMT;
        }
        invPer = Math.round(totAmt / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_AMT', fn_numberWithCommas(totAmt));
        hwpDocCtrl.putFieldText('INV_AMT2', fn_numberWithCommas(map.PJT_AMT-totAmt));
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");
    },

    unRndResInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = unRndInfo.map;
        const invList = customKendo.fn_customAjax("/project/getInvList", {pjtSn: pjtSn}).list;

        /** 1. 프로젝트(수주보고) 정보 */
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

        /** 2. g20 데이터 연계 */
        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);
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
        console.log("g20");
        console.log(g20);
        //const sumall =
        //    g20.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
        //console.log(sumall);

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
        hwpDocCtrl.moveToField('content', true, true, false);
        hwpDocCtrl.setTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});

        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_SUB_NM);
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(unRndInfo.map.ALL_BUSN_COST));

        /** 4. 예상 정산내역 */
        var totAmt = 0;
        var invPer = 0;
        for(let i=0; i<invList.length; i++){
            totAmt += invList[i].EST_TOT_AMT;
        }
        invPer = Math.round(totAmt / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_AMT', fn_numberWithCommas(totAmt));
        hwpDocCtrl.putFieldText('INV_AMT2', fn_numberWithCommas(map.PJT_AMT-totAmt));
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");
    },

    carInit: function(carReqSn){
        const carInfo = customKendo.fn_customAjax("/bustrip/getCarRequestInfo", {carReqSn: carReqSn});
        const map = carInfo.data;
        hwpDocCtrl.putFieldText('CAR_DT', map.START_DT+" "+map.START_TIME+" ~ "+map.END_DT+" "+map.END_TIME);
        hwpDocCtrl.putFieldText('CAR_CLASS_TEXT', map.CAR_CLASS_TEXT);
        hwpDocCtrl.putFieldText('CAR_TITLE_NAME', map.CAR_TITLE_NAME);
        hwpDocCtrl.putFieldText('VISIT_NAME', map.VISIT_NAME);
        hwpDocCtrl.putFieldText('EMERGENCY_NAME', map.EMERGENCY_NAME+" "+map.EMERGENCY_TEL);
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
        hwpDocCtrl.putFieldText('EMP_NAME', map.REG_EMP_NAME);
    }
}