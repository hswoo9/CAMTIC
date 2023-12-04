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
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", {pjtSn: pjtSn});
            const team = teamResult.map;

            /** 3. 협업사항 */
            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', team.EMP_NAME);
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TM_PER', ((team.TM_AMT/map.PJT_AMT) * 100).toString().substring(0,4)+"%");
        }

        /** 4. 특이사항 */
        hwpDocCtrl.moveToField('ETC', true, true, false);
        hwpDocCtrl.setTextFile(delvMap.DELV_ISSU.replaceAll("\n", "<br>"), "html","insertfile");
    },

    devInit: function(devSn){
        const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const resultD = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});
        const delvMap = result.delvMap;
        const devMap = resultD.rs;
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

        console.log(map)
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
        }, 200);

        /** 6. 정산내역 */
        let invSum = 0;
        for(let i=0; i<purcList.length; i++){
            const map = purcList[i];
            invSum += Number(map.EST_TOT_AMT);
        }
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
        let invPer = Math.round(invSum / map.PJT_AMT * 100);
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
                hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
                hwpDocCtrl.putFieldText('TEAM_PER', "100%");
                hwpDocCtrl.putFieldText('TEAM_INV_AMT', fn_numberWithCommas(teamInvSum));
                let teamPer = Math.round(teamInvSum / team.TM_AMT * 100);
                hwpDocCtrl.putFieldText('TEAM_PER2', teamPer+"%");
                hwpDocCtrl.putFieldText('TEAM_INV2_AMT', fn_numberWithCommas(team.TM_AMT-teamInvSum));
                hwpDocCtrl.putFieldText('TEAM_PER3', (100-teamPer)+"%");

                hwpDocCtrl.putFieldText('SUM_AMT', fn_numberWithCommas(map.PJT_AMT + team.TM_AMT));
                hwpDocCtrl.putFieldText('TEAM_INV_AMT_SUM', fn_numberWithCommas(invSum + teamInvSum));
                hwpDocCtrl.putFieldText('TEAM_INV2_AMT_SUM', fn_numberWithCommas(map.PJT_AMT + team.TM_AMT - invSum - teamInvSum));
            }
        }

        /** 7. 특이사항 */
        const getDevelopPlan = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: devSn});
        const dev = getDevelopPlan.rs;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(dev.ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 400);
    },

    resInit: function(pjtSn){
        const data = {pjtSn: pjtSn}
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
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

        /** 3. 협업사항 */
        if(map.TM_YN == "Y"){
            const teamResult = customKendo.fn_customAjax("/project/getTeamInfo", data);
            const team = teamResult.map;

            hwpDocCtrl.putFieldText('TM_NAME', team.TEAM_NAME);
            hwpDocCtrl.putFieldText('TM_EMP_NAME', team.EMP_NAME);
            hwpDocCtrl.putFieldText('TM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TM_PER', ((team.TM_AMT/map.PJT_AMT) * 100).toString().substring(0,4)+"%");
        }

        /** 4. 수행계획 */
        const processResult = customKendo.fn_customAjax("/project/getProcessList", data);
        const processList = processResult.list;
        const htmlPs = engnInit.htmlPs(processList, map);
        hwpDocCtrl.moveToField('DEV_HTML', true, true, false);
        hwpDocCtrl.setTextFile(htmlPs, "html","insertfile");

        /** 5. 구매/비용내역 */
        const purcResult = customKendo.fn_customAjax("/purc/getProjectPurcList", data);
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
        hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
        let invPer = Math.round(invSum / map.PJT_AMT * 100);
        hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");
        hwpDocCtrl.putFieldText('INV_AMT2', (map.PJT_AMT-invSum) == 0 ? "0" : String(fn_numberWithCommas(map.PJT_AMT-invSum)));
        hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");

        /** 7. 특이사항 */
        const getResult = customKendo.fn_customAjax("/project/engn/getResultInfo", data);
        const res = getResult.result.map;
        setTimeout(function() {
            hwpDocCtrl.moveToField('ETC', true, true, false);
            hwpDocCtrl.setTextFile(res.RS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 400);
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
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PS_STR_DE +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PS_EMP_NM +'</p></td>';
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
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">단독</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ info.DIV_NM +'</p></td>';
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
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">합계</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(sum) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">-</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlPurc: function(list, pjtSn, tmYn){
        const codeList1 = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
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
        for(let i=0; i<list.length; i++){
            const map = list[i];
            let purcItemText = "";
            for(let j=0; j<codeList1.length; j++){
                const subMap = codeList1[j];
                if(subMap.CM_CODE == map.PURC_ITEM_TYPE){
                    purcItemText = subMap.CM_CODE_NM;
                }
            }
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">단독</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ purcItemText +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PURC_ITEM_QTY +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PURC_ITEM_NAME +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.PURC_ITEM_UNIT +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ fn_numberWithCommas(map.PURC_ITEM_AMT) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.CRM_NM +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}