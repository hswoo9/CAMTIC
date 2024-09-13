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

    exnpInit: function(exnpSn){
        let data = {
            exnpSn : exnpSn
        }

        const result = customKendo.fn_customAjax("/payApp/pop/getExnpData", data);
        const rs = result.map;
        const ls = result.list;
        const ls2 = result.list2;
        console.log("result");
        console.log(result);

        /** 1. 지출결의서 데이터 */
        hwpDocCtrl.putFieldText('PJT_NM', rs.PJT_NM);
        hwpDocCtrl.putFieldText('EMP_NAME', rs.REG_EMP_NAME);

        const userInfo = getUser($("#empSeq").val());
        const deptName = userInfo.deptNm;
        hwpDocCtrl.putFieldText('DEPT_NAME', deptName);
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
        if(ls2.length > 1){
            hwpDocCtrl.putFieldText('CRM_NM', ls[0].CRM_NM + " 외 " + Number(ls2.length - 1) + "건");
        } else {
            hwpDocCtrl.putFieldText('CRM_NM', ls[0].CRM_NM);
        }
        hwpDocCtrl.putFieldText('REG_NO', ls[0].REG_NO.substring(0, 3)+"-"+ls[0].REG_NO.substring(3, 5)+"-"+ls[0].REG_NO.substring(5, 10));
        // hwpDocCtrl.putFieldText('ADDR', ls[0].CRM_NM);

        hwpDocCtrl.putFieldText('CRM_ACC_NO', ls[0].CRM_ACC_NO);
        hwpDocCtrl.putFieldText('ACC_NO', "("+ls[0].CRM_BNK_NM+") "+ls[0].CRM_ACC_NO);
        hwpDocCtrl.putFieldText('CRM_ACC_HOLDER', ls[0].CRM_ACC_HOLDER);

        if(rs.PAY_APP_TYPE == 1){
            hwpDocCtrl.putFieldText('DOC_TITLE', "지 출 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 지출하고자 합니다.");
            hwpDocCtrl.putFieldText('ACC_TYPE_TXT', "출금계좌");
            hwpDocCtrl.putFieldText('PAY_DEST_TXT', "지급처");
        }else if(rs.PAY_APP_TYPE == 2){
            hwpDocCtrl.putFieldText('DOC_TITLE', "여 입 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 입금처리 하고자 합니다.");
            hwpDocCtrl.putFieldText('ACC_TYPE_TXT', "입금계좌");
            hwpDocCtrl.putFieldText('PAY_DEST_TXT', "여입처");
        }else if(rs.PAY_APP_TYPE == 3){
            hwpDocCtrl.putFieldText('DOC_TITLE', "반 납 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 반납처리 하고자 합니다.");
            hwpDocCtrl.putFieldText('ACC_TYPE_TXT', "출금계좌");
            hwpDocCtrl.putFieldText('PAY_DEST_TXT', "지급처");
            hwpDocCtrl.putFieldText("budgetTitle", "세 입 과 목");
        }else if(rs.PAY_APP_TYPE == 4){
            hwpDocCtrl.putFieldText('DOC_TITLE', "대 체 결 의 서");
            hwpDocCtrl.putFieldText('DOC_DETAIL', "아래와 같이 지출하고자 합니다.");
            hwpDocCtrl.putFieldText('ACC_TYPE_TXT', "출금계좌");
            hwpDocCtrl.putFieldText('PAY_DEST_TXT', "지급처");
            hwpDocCtrl.putFieldText("budgetTitle", "세 입 과 목");
        }
    },

    payIncpInit: function(payIncpSn, stat){
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
        hwpDocCtrl.putFieldText('TO_DATE', ls[0].TR_DE.toString().split("-")[0] + "년 " + Number(ls[0].TR_DE.toString().split("-")[1]) + "월 " + ls[0].TR_DE.toString().split("-")[2] + "일");
        hwpDocCtrl.putFieldText('TR_DE', rs.PAY_EXNP_DE.toString().split("-")[0] + "년 " + Number(rs.PAY_EXNP_DE.toString().split("-")[1]) + "월 " + rs.PAY_EXNP_DE.toString().split("-")[2] + "일");

        hwpDocCtrl.putFieldText('APP_TITLE', rs.APP_CONT);
        hwpDocCtrl.putFieldText('ACC_NO', "("+rs.BNK_NM+") "+rs.ACC_NO+" "+rs.ACC_NM);

        if(stat == null){
            const htmlIncp = hwpInit.htmlIncp(ls, rs);
            hwpDocCtrl.putFieldText("PAY_HTML", " ");
            hwpDocCtrl.moveToField("PAY_HTML", true, true, false);
            hwpDocCtrl.setTextFile(htmlIncp, "html","insertfile");
        }else if((stat == "mod" || stat == "reDraft") && ![5185, 5186, 5188, 5189, 5190, 5196, 5268, 5272, 5292, 5353, 5354, 5372, 5403, 5404, 5405, 5406,
            5431, 5432, 5470, 5471, 5475, 5517, 5530, 5536, 5548, 5697, 5837, 5858, 5859, 5860].includes(payIncpSn)){
            const htmlIncp = hwpInit.htmlIncp(ls, rs);
            hwpDocCtrl.putFieldText("PAY_HTML", " ");
            hwpDocCtrl.moveToField("PAY_HTML", true, true, false);
            hwpDocCtrl.setTextFile(htmlIncp, "html","insertfile");
        }
    },

    htmlIncp: function(list){
        let html = '';
        html += hancomTemplate(1);
        html += '<tr>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 106px;"><p style="font-size:12px;"><b>상   호</b></p></td>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 97px;"><p style="font-size:12px;"><b>사업자번호</b></p></td>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 60px;"><p style="font-size:12px;"><b>대표자</b></p></td>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 125px;"><p style="font-size:12px;"><b>금   액</b></p></td>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 181px;"><p style="font-size:12px;"><b>품   명</b></p></td>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 71px;"><p style="font-size:12px;"><b>비 고</b></p></td>';
        html += '</tr>';
        let sum = 0;

        console.log("123", list)

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '<tr>';
            html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CRM_NM +'</p></td>';
            html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.REG_NO +'</p></td>';
            html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.CEO_NM +'</p></td>';
            html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.TOT_COST_COMMA +'</p></td>';
            html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.TITLE +'</p></td>';
            html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ map.ETC +'</p></td>';
            html += '</tr>';
            sum += Number(map.TOT_COST);
        }
        html += '<tr>';
        html += '    <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>합계</b></p></td>';
        html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>'+comma(sum)+'</b></p></td>';
        html += '    <td></td>';
        html += '    <td></td>';
        html += '</tr>';
        html += hancomTemplate(2);
        return html.replaceAll("\n", "<br>");
    },

    pjtRateInit: function(partRateVerSn){
        $("#docGbn").data("kendoRadioGroup").value("001");
        $("#docGbn").data("kendoRadioGroup").trigger("change");
        if($("#docGbn").data("kendoRadioGroup").value() == "001"){
            hwpDocCtrl.putFieldText("sender_name", "사단법인 캠틱종합기술원장");
            hwpDocCtrl.putFieldText("doc_receivelist_txt", "수신자");
            hwpDocCtrl.putFieldText("doc_receivelist", "");
            hwpDocCtrl.putFieldText("doc_receive", "");
        }else {
            hwpDocCtrl.putFieldText("sender_name", "");
            hwpDocCtrl.putFieldText("doc_receive", "내부결재");
            hwpDocCtrl.putFieldText("doc_receivelist_txt", "");
            hwpDocCtrl.putFieldText("doc_receivelist", "");
        }

        const result = customKendo.fn_customAjax("/project/getPartRateVerInfo", {partRateVerSn: partRateVerSn});
        const rs = result.map;
        const pjtSn = rs.PJT_SN;

        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        $("#receiverName").val(map.CRM_NM);
        if(map.CRM_NM != null){
            $('#receiverName').trigger('focusout');
        }

        hwpDocCtrl.putFieldText('CRM_NM', " "+map.CRM_NM);
        hwpDocCtrl.putFieldText('PJT_NM_TEXT', " "+map.PJT_NM+" 참여인력 변경의 건");

        hwpDocCtrl.putFieldText('PJT_NM', map.BS_TITLE);
        hwpDocCtrl.putFieldText('PJT_NM_EX', map.PJT_NM);

        console.log("rs", rs);
        console.log("map", map);
        if(rs.YEAR_CLASS == "M"){
            if(rs.busnClass == "R"){
                hwpDocCtrl.putFieldText("PJT_DT", rs.NOW_STR_DE_RND+" ~ "+rs.NOW_END_DE_RND);
            }else{
                hwpDocCtrl.putFieldText("PJT_DT", rs.NOW_STR_DE_UNRND+" ~ "+rs.NOW_END_DE_UNRND);
            }
        }else{
            hwpDocCtrl.putFieldText("PJT_DT", map.PJT_STR_DT + " ~ " + map.PJT_END_DT);
        }
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        const mem = result.result.projectMemberInfo;
        const befMem = result.result2.projectMemberInfo;

        console.log("변경전", befMem);
        console.log("변경후", mem);

        var fieldsToCheck = ['EMP_NAME','PJT_STR_DT', 'PJT_END_DT', 'MON_DIFF', 'TOT_RATE', 'TOT_PAY_BUDG', 'CHNG_SAL'];

        if (mem.length !== befMem.length) {
            console.log("두 리스트의 길이가 다릅니다.");
        }else {
            for (var x = 0; x < mem.length; x++) {
                var checkFlag = true;

                for (var y = 0; y < fieldsToCheck.length; y++) {
                    if (mem[x][fieldsToCheck[y]] !== befMem[x][fieldsToCheck[y]]) {
                        checkFlag = false;
                        break;
                    }
                }
                if(checkFlag){
                    mem.splice(x, 1);
                    befMem.splice(x, 1);
                    x--;
                }
            }
        }

        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td colspan="7" style="height:20px;background-color:#E6EEF7; text-align:center; width: 60px;"><p style="font-size:11px;"><b>변경 전</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 105px;"><p style="font-size:11px;">성명</p></td>';
        // html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 50px;"><p style="font-size:11px;">직급</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">급여총액(원)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 90px;"><p style="font-size:11px;">참여시작</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 90px;"><p style="font-size:11px;">참여종료</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-size:11px;">기간(월)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-size:11px;">참여율</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">인건비합계(원)</p></td>';
        html += '               </tr>';
        /** 변경 전 담당자 */
        for(let i=0; i<befMem.length; i++){
            const map = befMem[i];
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.EMP_NAME +'</p></td>';
            // html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_getSpot(map.DUTY_NAME, map.POSITION_NAME) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(Number(map.CHNG_SAL) * 12) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ (map.PART_DET_STR_DT == null ? map.PJT_STR_DT : map.PART_DET_STR_DT) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ (map.PART_DET_END_DT == null ? map.PJT_END_DT : map.PART_DET_END_DT) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ (map.PART_DET_STR_DT == null ? fn_monDiff(map.PJT_STR_DT, map.PJT_END_DT) : fn_monDiff(map.PART_DET_STR_DT, map.PART_DET_END_DT)) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.TOT_RATE +'%</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(map.TOT_PAY_BUDG) +'</p></td>';
            html += '               </tr>';
        }
        html += '               <tr>';
        html += '                   <td colspan="7" style="height:20px;background-color:#E6EEF7; text-align:center; width: 60px;"><p style="font-size:11px;"><b>변경 후</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 105px;"><p style="font-size:11px;">성명</p></td>';
        // html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 50px;"><p style="font-size:11px;">직급</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">급여총액(원)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 90px;"><p style="font-size:11px;">참여시작</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 90px;"><p style="font-size:11px;">참여종료</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-size:11px;">기간(월)</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-size:11px;">참여율</p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:11px;">인건비합계(원)</p></td>';
        html += '               </tr>';
        /** 변경 후 담당자 */
        for(let i=0; i<mem.length; i++){
            const map = mem[i];
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.EMP_NAME +'</p></td>';
            // html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_getSpot(map.DUTY_NAME, map.POSITION_NAME) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_numberWithCommas(Number(map.CHNG_SAL) * 12) +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PART_DET_STR_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ map.PART_DET_END_DT +'</p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:11px;">'+ fn_monDiff(map.PART_DET_STR_DT, map.PART_DET_END_DT) +'</p></td>';
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

    carInit: function(carReqSn){
        const carInfo = customKendo.fn_customAjax("/bustrip/getCarRequestInfo", {carReqSn: carReqSn});
        const map = carInfo.data;
        hwpDocCtrl.putFieldText('CAR_DT', map.START_DT+" "+map.START_TIME+" ~ "+map.END_DT+" "+map.END_TIME);
        // hwpDocCtrl.putFieldText('CAR_CLASS_TEXT', map.CAR_CLASS_TEXT);
        hwpDocCtrl.putFieldText('CAR_TITLE_NAME', map.CAR_TITLE_NAME);
        hwpDocCtrl.putFieldText('VISIT_NAME', map.VISIT_NAME);
        hwpDocCtrl.putFieldText('EMERGENCY_NAME', map.EMERGENCY_NAME+" "+map.EMERGENCY_TEL);
        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
        hwpDocCtrl.putFieldText('EMP_NAME', map.EMP_NAME);

        /** 차량 */
        let carClassTxt = "";
        if(map.CAR_CLASS_TEXT == "기타"){
            carClassTxt = map.CAR_CLASS_TEXT + "(" + map.CAR_CLASS_RMK + ")";
        } else {
            carClassTxt = map.CAR_CLASS_TEXT;
        }
        hwpDocCtrl.putFieldText('CAR_CLASS_TEXT', carClassTxt);
    }
}