var rndInit = {

    delvInit: function(pjtSn){
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;

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
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(delvMap.ALL_BUSN_COST));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(delvMap.TOT_RES_COST));
    },

    devInit: function(devSn){
        const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;

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
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_BUSN_COST));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(delvMap.TOT_RES_COST));

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
        let invPer = Math.round(invSum / map.PJT_AMT * 100);
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
            let delvPer = Math.round(delvAmt / map.PJT_AMT * 100);
            hwpDocCtrl.putFieldText('INV_PER', delvPer+"%");

            /** 수주부서 비용*/
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            invPer = Math.round(invSum / delvAmt * 100);
            hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
            hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");


            /** 협업부서 매출*/
            hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TEAM_PER', (100-delvPer)+"%");

            /** 협업부서 비용*/
            hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
            let teamPer = Math.round(teamInvSum / team.TM_AMT * 100);
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
        const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
        const resultD = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn});
        const map = pjtInfo.rs;
        const delvMap = rndInfo.map;
        const devMap = resultD.rs;
        const chResult = customKendo.fn_customAjax("/projectRnd/getChangeList", {pjtSn: pjtSn});
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
        hwpDocCtrl.putFieldText('ALL_BUSN_COST', fn_numberWithCommas(rndInfo.map.ALL_BUSN_COST));
        hwpDocCtrl.putFieldText('BUSN_COST', fn_numberWithCommas(delvMap.TOT_RES_COST));

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
            invSum += Number(map.ITEM_UNIT_AMT);
        }
        const tripResult = customKendo.fn_customAjax("/project/getBustResInfo", {pjtSn: map.PJT_SN});
        const trip = tripResult.map;
        if(trip.COUNT != 0){
            invSum += trip.BUSTRIP_EXNP_SUM;
        }
        hwpDocCtrl.putFieldText('AMT1', map.PJT_AMT == 0 ? "0" : fn_numberWithCommas(map.PJT_AMT));
        hwpDocCtrl.putFieldText('INV_PER', "100%");
        hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
        let invPer = Math.round(invSum / map.PJT_AMT * 100);
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
            let delvPer = Math.round(delvAmt / map.PJT_AMT * 100);
            hwpDocCtrl.putFieldText('INV_PER', delvPer+"%");

            /** 수주부서 비용*/
            hwpDocCtrl.putFieldText('INV_AMT', invSum == 0 ? "0" : fn_numberWithCommas(invSum));
            invPer = Math.round(invSum / delvAmt * 100);
            hwpDocCtrl.putFieldText('INV_PER2', invPer+"%");

            /** 수주부서 수익*/
            hwpDocCtrl.putFieldText('INV_AMT2', (delvAmt - invSum) == 0 ? "0" : fn_numberWithCommas(delvAmt - invSum));
            hwpDocCtrl.putFieldText('INV_PER3', (100-invPer)+"%");


            /** 협업부서 매출*/
            hwpDocCtrl.putFieldText('TEAM_AMT', fn_numberWithCommas(team.TM_AMT));
            hwpDocCtrl.putFieldText('TEAM_PER', (100-delvPer)+"%");

            /** 협업부서 비용*/
            hwpDocCtrl.putFieldText('TEAM_INV_AMT', teamInvSum == 0 ? "0" : fn_numberWithCommas(teamInvSum));
            let teamPer = Math.round(teamInvSum / team.TM_AMT * 100);
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
    },

    htmlG20: function(g20){
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

        return html.replaceAll("\n", "<br>");
    },

    htmlChange: function(list, map){
        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>구분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 105px;"><p style="font-size:13px;"><b>버전</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 424px;"><p style="font-size:13px;"><b>변경일</b></p></td>';
        html += '               </tr>';
        let verCount1 = 0;
        let verCount2 = 0;
        let ver = "";
        let verTxt = "";
        for(let i=0; i<list.length; i++){
            const map = list[i];
            if(map.TYPE == "1"){
                verCount1 += 1;
                ver = "세세목변경서";
                verTxt = "VER."+verCount1;
            }else{
                verCount2 += 1;
                ver = "반납신청서";
                verTxt = "VER."+verCount2;
            }
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ ver +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ verTxt +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ map.DRAFT_DATE +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}