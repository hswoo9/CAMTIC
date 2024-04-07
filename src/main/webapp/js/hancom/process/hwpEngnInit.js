var engnInit = {

    global: {
        pjtInfo: new Object(),
        pjtInfo2: new Object(),
        estInfo: new Object()
    },

    globalDataSet: function(pjtSn, menuCd){
        const pjtInfo = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        engnInit.global.pjtInfo = pjtInfo;

        const pjtInfo2 = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        engnInit.global.pjtInfo2 = pjtInfo2;

        const estInfo = customKendo.fn_customAjax("/project/getStep1Data", {pjtSn: pjtSn});
        engnInit.global.estInfo = estInfo;
    },

    crmTempData: function(map){
        if(map.CRM_MEM_TEMP_NM != null){
            hwpDocCtrl.putFieldText('CRM_MEM_NM', map.CRM_MEM_TEMP_NM);
        }else{
            hwpDocCtrl.putFieldText('CRM_MEM_NM', map.CRM_MEM_NM);
        }

        if(map.CRM_MEM_TEMP_PH != null){
            hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.CRM_MEM_TEMP_PH);
        }else{
            hwpDocCtrl.putFieldText('CRM_MEM_PHN', map.CRM_MEM_PHN);
        }

        if(map.CRM_MEM_TEMP_MAIL != null){
            hwpDocCtrl.putFieldText('CRM_MEM_EMAIL', map.CRM_MEM_TEMP_MAIL);
        }else{
            hwpDocCtrl.putFieldText('CRM_MEM_EMAIL', map.EMAIL);
        }
    },

    delvSet: function(){
        const pjtInfo = engnInit.global.pjtInfo;
        const delvMap = pjtInfo.delvMap;
        const map = pjtInfo.map;

        const pjtInfo2 = engnInit.global.pjtInfo2
        const map2 = pjtInfo2.rs;

        /** 사업분류 */
        hwpDocCtrl.putFieldText('BUSN_NAME', map.BUSN_NM);

        /** 세무정보 */
        let taxText = "";
        if(map2.TAX_GUBUN == "1"){
            taxText = "과세";
        }else if(map2.TAX_GUBUN == "2"){
            taxText = "면세";
        }else if(map2.TAX_GUBUN == "3"){
            taxText = "비과세";
        }
        hwpDocCtrl.putFieldText("TAX_GUBUN", taxText);

        /** 프로젝트명 */
        hwpDocCtrl.putFieldText("PJT_NM", map.PJT_NM);

        /** 업체명 */
        hwpDocCtrl.putFieldText("CRM_NM", map.CRM_NM);

        /** 지역구분
         * TODO. CRM 지역구분 작업후 추가작업 해야 함 */
        hwpDocCtrl.putFieldText("LOCAL_GUBUN", "");

        /** 의뢰인 연락처 이메일 */
        engnInit.crmTempData(map);

        /** 프로젝트 기간 */
        hwpDocCtrl.putFieldText("PJT_DT", delvMap.PJT_STR_DT + " ~ " + delvMap.PJT_END_DT);

        /** 사업담당자(PM)*/
        const pmInfo = getUser(map.EMP_SEQ);
        const pmText = pmInfo.deptNm + " " + map.EMP_NAME + " " + fn_getSpot(pmInfo.DUTY_NAME, pmInfo.POSITION_NAME);
        hwpDocCtrl.putFieldText('PM_EMP_NM', pmText);
    },

    delvInit: function(pjtSn){
        engnInit.globalDataSet(pjtSn, "delv");
        const pjtInfo = engnInit.global.pjtInfo;
        const delvMap = pjtInfo.delvMap;
        const map = pjtInfo.map;

        /** 1. 사업정보 */
        engnInit.delvSet();

        /** 2. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);

            const tmPmInfo = getUser(team.TM_PM_SEQ);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', tmPmInfo.deptNm + " " + tmPmInfo.EMP_NAME_KR + " " + fn_getSpot(tmPmInfo.DUTY_NAME, tmPmInfo.POSITION_NAME));
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            let per;
            per = (team.TM_AMT/delvMap.DELV_AMT) * 100;
            hwpDocCtrl.putFieldText('TM_PER', Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%"));
        }

        /** 3. 수주금액 */
        hwpDocCtrl.putFieldText("PJT_AMT", fn_numberWithCommas(delvMap.DELV_AMT));

        /** 마지막 견적 */
        const ests = engnInit.global.estInfo;
        var estSubList = ests.result.estSubList;
        const htmlEst = engnInit.htmlEst(estSubList);
        hwpDocCtrl.putFieldText("EST_TABLE", "");
        hwpDocCtrl.moveToField("EST_TABLE", true, true, false);
        hwpDocCtrl.setTextFile(htmlEst, "html","insertfile");

        /** 4. 특이사항 */
        setTimeout(function() {
            hwpDocCtrl.moveToField("ETC", true, true, false);
            hwpDocCtrl.setTextFile(delvMap.DELV_ISSU.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    devInit: function(devSn){
        const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
        engnInit.globalDataSet(pjtSn, "dev");
        const pjtInfo = engnInit.global.pjtInfo;
        const delvMap = pjtInfo.delvMap;
        const map = pjtInfo.map;

        /** 참여인력 및 일정 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList2", {devSn: devSn});
        /** 투자내역 */
        const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devSn});
        /** 특이사항 */
        const getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: devSn});

        /** 1. 사업정보 */
        engnInit.delvSet();

        /** 2. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            /** 3. 협업사항 */
            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);

            const tmPmInfo = getUser(team.TM_PM_SEQ);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', tmPmInfo.deptNm + " " + tmPmInfo.EMP_NAME_KR + " " + fn_getSpot(tmPmInfo.DUTY_NAME, tmPmInfo.POSITION_NAME));
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            let per;
            per = (team.TM_AMT/map.PJT_AMT) * 100;
            hwpDocCtrl.putFieldText('TM_PER', Number.isInteger(per) ? (per + "%") : (per.toFixed(2) + "%"));
        }

        /** 3. 사업예산 */
        const ests = engnInit.global.estInfo;
        var estSubList = ests.result.estSubList;
        const htmlEst = engnInit.htmlEst(estSubList);
        hwpDocCtrl.putFieldText("EST_TABLE", "");
        hwpDocCtrl.moveToField("EST_TABLE", true, true, false);
        hwpDocCtrl.setTextFile(htmlEst, "html","insertfile");

        /** 4. 참여인력 및 일정 */
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);
        setTimeout(function() {
        hwpDocCtrl.putFieldText("DEV_HTML", "");
        hwpDocCtrl.moveToField("DEV_HTML", true, true, false);
        hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");
        }, 1000);

        /** 5. 투자내역 */
        const purcList = purcResult.list;
        const htmlData = engnInit.htmlInv(purcList, map);
        setTimeout(function() {
            hwpDocCtrl.putFieldText("PURC_HTML", "");
            hwpDocCtrl.moveToField("PURC_HTML", true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 2000);

        /** 6. 예상재무성과 */
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
        const dev = getDevelopPlan.rs;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(dev.ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 3000);
    },

    resInit: function(pjtSn){
        const data = {pjtSn: pjtSn}
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        const resultD = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});
        const delvMap = result.delvMap;
        const map = result.map;
        const devMap = resultD.rs;

        /** 1. 사업정보 */
        hwpDocCtrl.putFieldText('BUSN_NAME', map.BUSN_NM);
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
        engnInit.crmTempData(map);

        /** 2. 납품정보 */
        hwpDocCtrl.putFieldText('DELV_ITEM', delvMap.DELV_ITEM);
        hwpDocCtrl.putFieldText('DELV_CNT', String(delvMap.DELV_CNT == undefined ? "" : delvMap.DELV_CNT));
        hwpDocCtrl.putFieldText('DELV_UNIT', delvMap.DELV_UNIT);
        hwpDocCtrl.putFieldText('DELV_AMT', fn_numberWithCommas(delvMap.DELV_AMT));

        /** 3. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", data);
            const team = teamResult.map;

            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', team.EMP_NAME);
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TM_PER', fn_per(team.TM_AMT, map.PJT_AMT, 2));
        }

        /** 4. 수행계획 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList2", {devSn : devMap.DEV_SN});
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);
        hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
        hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");

        /** 5. 구매/비용내역 */
        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", data);
        const purcList = purcResult.list;
        const htmlData = engnInit.htmlPurc(purcList, map);
        setTimeout(function() {
            hwpDocCtrl.moveToField('PURC_HTML', true, true, false);
            hwpDocCtrl.setTextFile(htmlData, "html","insertfile");
        }, 1000);

        /** 6. 정산내역 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.ITEM_AMT);
            console.log(map.ITEM_UNIT_AMT);
        }
        const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: map.PJT_SN});
        const trip = tripResult.map;
        if(trip.COUNT != 0){
            invSum += trip.BUSTRIP_EXNP_SUM;
            console.log(map.BUSTRIP_EXNP_SUM);
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

        /** 7. 특이사항 */
        const getResult = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        const res = getResult.result.map;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(res.RS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 2000);
    },

    htmlEst: function(estSubList){
        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>품명 및 규격</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>단가</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>합계(원)</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>비고</b></p></td>';
        html += '               </tr>';
        let sum = 0;
        for(let i=0; i<estSubList.length; i++){
            const info = estSubList[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.PROD_NM +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(info.UNIT_AMT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ info.PROD_CNT +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.UNIT +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(info.SUP_AMT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.ETC +'</p></td>';
            html += '               </tr>';
            sum += Number(info.SUP_AMT);
        }
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">합계</p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(sum) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlPs: function(list, map){
        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 212px;"><p style="font-size:13px;"><b>공 정</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 212px;"><p style="font-size:13px;"><b>일 정</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>담당자</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PS_PREP_NM +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PS_NM +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PS_STR_DE+" ~ "+map.PS_END_DE +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.GROUP_PS_EMP_NM +'</p></td>';
            html += '               </tr>';
        }
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: map.PJT_SN});
            const team = teamResult.map;
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">협업</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ team.TEAM_NAME +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ team.EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlInv: function(list, map){
        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 62px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 62px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>건명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>금액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>거래처</b></p></td>';
        html += '               </tr>';
        let sum = 0;
        for(let i=0; i<list.length; i++){
            const info = list[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">자가</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">구매</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.INV_NM +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.INV_CNT +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.INV_UNIT +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(info.EST_TOT_AMT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.EST_OFC +'</p></td>';
            html += '               </tr>';
            sum += info.EST_TOT_AMT;
        }

        console.log(map.TM_YN);
        if(map.TM_YN == "Y") {
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: map.PJT_SN});
            const team = teamResult.map;
            const teamList = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: team.PNT_PJT_SN}).list;
            console.log(teamList);
            for(let i=0; i<teamList.length; i++){
                const info = teamList[i];
                html += '               <tr>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">협업</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.DIV_NM +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.INV_NM +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.INV_CNT +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.INV_UNIT +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(info.EST_TOT_AMT) +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.EST_OFC +'</p></td>';
                html += '               </tr>';
                sum += info.EST_TOT_AMT;
            }
        }
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">합계</p></td>';
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(sum) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlPurc: function(list, map){
        const codeList1 = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 62px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 62px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 142px;"><p style="font-size:13px;"><b>건명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 82px;"><p style="font-size:13px;"><b>수량</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 82px;"><p style="font-size:13px;"><b>단위</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>금액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 102px;"><p style="font-size:13px;"><b>거래처</b></p></td>';
        html += '               </tr>';
        let sum = 0;
        for(let i=0; i<list.length; i++){
            const map = list[i];
            let purcItemText = "";
            for(let j=0; j<codeList1.length; j++){
                const subMap = codeList1[j];
                if(subMap.CM_CODE == map.PURC_ITEM_TYPE){
                    purcItemText = subMap.CM_CODE_NM;
                }
            }
            console.log(map);
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">자가</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ purcItemText +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.ITEM_NM +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.ITEM_EA +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.ITEM_STD +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(map.ITEM_AMT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.CRM_NM +'</p></td>';
            html += '               </tr>';
            sum += map.ITEM_AMT;
        }
        const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: map.PJT_SN});
        const trip = tripResult.map;
        if(trip.COUNT != 0){
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">자가</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">출장</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ trip.COUNT +'회</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(trip.BUSTRIP_EXNP_SUM) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '               </tr>';
            sum += trip.BUSTRIP_EXNP_SUM;
        }
        if(map.TM_YN == "Y") {
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: map.PJT_SN});
            const team = teamResult.map;
            const teamList = customKendo.fn_customAjax("/purc/getProjectPurcList", {pjtSn: team.PNT_PJT_SN}).list;
            console.log(teamList);
            for(let i=0; i<teamList.length; i++){
                const info = teamList[i];
                let purcItemText = "";
                for(let j=0; j<codeList1.length; j++){
                    const subMap = codeList1[j];
                    if(subMap.CM_CODE == info.PURC_ITEM_TYPE){
                        purcItemText = subMap.CM_CODE_NM;
                    }
                }
                html += '               <tr>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">협업</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ purcItemText +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.ITEM_NM +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.ITEM_EA +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.ITEM_STD +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(info.ITEM_AMT) +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.CRM_NM +'</p></td>';
                html += '               </tr>';
                sum += info.ITEM_UNIT_AMT;
            }
            const teamTripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: team.PNT_PJT_SN});
            const teamTrip = teamTripResult.map;
            if(teamTrip.COUNT != 0){
                html += '               <tr>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">협업</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">출장</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ teamTrip.COUNT +'회</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(teamTrip.BUSTRIP_EXNP_SUM) +'</p></td>';
                html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
                html += '               </tr>';
                sum += teamTrip.BUSTRIP_EXNP_SUM;
            }
        }
        if(map.BUSN_CLASS == "R" || map.BUSN_CLASS == "S"){
            const costList = customKendo.fn_customAjax("/payApp/getPjtExnpList", {pjtSn: map.PJT_SN}).list;
            for(let i=0; i<costList.length; i++){
                const map = costList[i];
                if(map.COST_YN == 'Y'){
                    html += '               <tr>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">자가</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">결의서</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.ACC_NM +'</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(map.COST_SUM) +'</p></td>';
                    html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
                    html += '               </tr>';
                }
                sum += map.COST_SUM;
            }
        }
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">합계</p></td>';
        html += '                   <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(sum) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}