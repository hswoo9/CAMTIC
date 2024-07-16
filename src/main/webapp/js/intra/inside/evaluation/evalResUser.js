var evalResUser = {
    fn_defaultScript: function (){
        const data = {
            evalSn: $("#evalSn").val(),
            evalMemSn: $("#evalMemSn").val()
        };
        const result = customKendo.fn_customAjax("/evaluation/getEvaluation", data);
        const evalMap = result.data;
        console.log("evalMap : ", evalMap);

        const yearText = evalMap.BS_YEAR+"년 역량평가표 ("+evalMap.EVAL_NUM+"차)";
        $("#yearTd").text(yearText);

        const result2 = customKendo.fn_customAjax("/evaluation/getEvalMemDet", data);
        const evalMem = result2.data;
        console.log("evalMem : ", evalMem);

        const evalResInfo = customKendo.fn_customAjax("/evaluation/getEvalResultEmpList", data);
        const evalResList = evalResInfo.list;
        console.log("evalResList : ", evalResList);

        const userInfo = getUser(evalMem.EVAL_EMP_SEQ);
        console.log("userInfo : ", userInfo);

        const dutyCode = userInfo.DUTY_CODE;
        const empName = userInfo.EMP_NAME_KR;

        $("#targetDept").text(userInfo.DEPT_NAME);
        $("#targetEmpName").text(empName);
        $("#targetSpot").text(fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));
        $("#targetJob").text(userInfo.JOB_DETAIL);

        let aDeptPer = evalMap.DEPT_MANAGER_A;
        let bDeptPer = evalMap.DEPT_MANAGER_B;
        let aTeamPer = evalMap.TEAM_MANAGER_A;
        let bTeamPer = evalMap.TEAM_MANAGER_B;
        let aMemPer = evalMap.TEAM_MEMBER_A;
        let bMemPer = evalMap.TEAM_MEMBER_B;

        if(evalMem.EVAL_EVAL_F_SEQ == "undefined" || evalMem.EVAL_EVAL_F_SEQ == ""){
            aDeptPer = 0;
            bDeptPer = 100;
            aTeamPer = 0;
            bTeamPer = 100;
            aMemPer = 0;
            bMemPer = 100;
        }else if(evalMem.EVAL_EVAL_S_SEQ == "undefined" || evalMem.EVAL_EVAL_S_SEQ == ""){
            aDeptPer = 100;
            bDeptPer = 0;
            aTeamPer = 100;
            bTeamPer = 0;
            aMemPer = 100;
            bMemPer = 0;
        }else if(evalMem.EVAL_EVAL_F_SEQ == evalMem.EVAL_EVAL_S_SEQ){
            aDeptPer = 0;
            bDeptPer = 100;
            aTeamPer = 0;
            bTeamPer = 100;
            aMemPer = 0;
            bMemPer = 100;
        }

        let scoreF = 0;
        let scoreS = 0;
        let scoreTot = 0;

        if(dutyCode == "2" || dutyCode == "3" || dutyCode == "7"){
            scoreF = calculateScore(aDeptPer, evalMem.EVAL_F_SCORE);
            $("#td1-6").text(aDeptPer+" %");
            $("#td1-7").text(scoreF);
        }else if(dutyCode == "4" || dutyCode == "5"){
            scoreF = calculateScore(aTeamPer, evalMem.EVAL_F_SCORE);
            $("#td1-6").text(aTeamPer+" %");
            $("#td1-7").text(scoreF);
        }else{
            scoreF = calculateScore(aMemPer, evalMem.EVAL_F_SCORE);
            $("#td1-6").text(aMemPer+" %");
            $("#td1-7").text(scoreF);
        }

        if(dutyCode == "2" || dutyCode == "3" || dutyCode == "7"){
            scoreS = calculateScore(bDeptPer, evalMem.EVAL_S_SCORE);
            $("#td2-6").text(bDeptPer+" %");
            $("#td2-7").text(scoreS);
        }else if(dutyCode == "4" || dutyCode == "5"){
            scoreS = calculateScore(bTeamPer, evalMem.EVAL_S_SCORE);
            $("#td2-6").text(bTeamPer+" %");
            $("#td2-7").text(scoreS);
        }else{
            scoreS = calculateScore(bMemPer, evalMem.EVAL_S_SCORE);
            $("#td2-6").text(bMemPer+" %");
            $("#td2-7").text(scoreS);
        }

        for(let i=0; i<evalResList.length; i++){
            const map = evalResList[i];
            if(map.EMP_SEQ == evalMem.EVAL_EMP_SEQ){
                if(dutyCode == "2" || dutyCode == "3" || dutyCode == "7"){
                    scoreTot = calculateFinalScore(aDeptPer, evalMem.EVAL_F_SCORE, bDeptPer, evalMem.EVAL_S_SCORE);
                }else if(dutyCode == "4" || dutyCode == "5"){
                    scoreTot = calculateFinalScore(aTeamPer, evalMem.EVAL_F_SCORE, bTeamPer, evalMem.EVAL_S_SCORE);
                }else{
                    scoreTot = calculateFinalScore(aMemPer, evalMem.EVAL_F_SCORE, bMemPer, evalMem.EVAL_S_SCORE);
                }
            }
        }



        if(evalMem.EVAL_EVAL_F_SEQ != null && evalMem.EVAL_EVAL_F_SEQ != "" && evalMem.EVAL_EVAL_F_SEQ != "undefined"){
            const subUser = getUser(evalMem.EVAL_EVAL_F_SEQ);
            $("#td1-1").text("1차");
            $("#td1-2").text(subUser.DEPT_NAME);
            $("#td1-3").text(fn_getSpot(subUser.DUTY_NAME, subUser.POSITION_NAME));
            $("#td1-4").text(subUser.EMP_NAME_KR);
            $("#td1-5").text(evalMem.EVAL_F_SCORE);
            $("#td1-8").text(scoreTot);
        }else{
            $("#tr1").hide();
        }

        if(evalMem.EVAL_EVAL_S_SEQ != null && evalMem.EVAL_EVAL_S_SEQ != "" && evalMem.EVAL_EVAL_S_SEQ != "undefined"){
            const subUser2 = getUser(evalMem.EVAL_EVAL_S_SEQ);
            $("#td2-1").text("2차");
            $("#td2-2").text(subUser2.DEPT_NAME);
            $("#td2-3").text(fn_getSpot(subUser2.DUTY_NAME, subUser2.POSITION_NAME));
            $("#td2-4").text(subUser2.EMP_NAME_KR);
            $("#td2-5").text(evalMem.EVAL_S_SCORE);
            $("#td2-8").text(scoreTot);
        }else{
            $("#tr2").hide();
        }

        if(evalMem.EVAL_VIEW != ""){
            $("#view1").html(evalMem.EVAL_VIEW.replaceAll("\n", "<br>"));
        }else{
            $("#view1").html("-");
        }
        if(evalMem.EVAL_F_VIEW != ""){
            $("#view2").html(evalMem.EVAL_F_VIEW.replaceAll("\n", "<br>"));
        }else{
            $("#view2").html("-");
        }
        if(evalMem.EVAL_S_VIEW != ""){
            $("#view3").html(evalMem.EVAL_S_VIEW.replaceAll("\n", "<br>"));
        }else{
            $("#view3").html("-");
        }

        let detailText = "";
        let evalPositionType = "";
        if(userInfo.DUTY_CODE == "2" || userInfo.DUTY_CODE == "3" || userInfo.DUTY_CODE == "7"){
            detailText += "부서장 역량 평가표(";
            evalPositionType = "deptHeader";
        }else if(userInfo.DUTY_CODE == "4" || userInfo.DUTY_CODE == "5"){
            detailText += "팀장 역량 평가표(";
            evalPositionType = "teamLeader";
        }else{
            detailText += "팀원 역량 평가표(";
            evalPositionType = "team";
        }
        detailText += userInfo.OCC_NM + ")";
        $("#detailTd").text(detailText);

        let evalType = "";
        if(userInfo.OCCUPATION_NM == "P&M"){
            evalType = "PM";
        }else if(userInfo.OCCUPATION_NM == "A&C"){
            evalType = "AC";
        }else if(userInfo.OCCUPATION_NM == "R&D"){
            evalType = "RD";
        }

        const result3 = customKendo.fn_customAjax("/evaluation/getEvaluationScoreList", {
            evalSn : $("#evalSn").val(),
            empSeq : evalMem.EVAL_EMP_SEQ,
            evalEmpSeq : evalMem.EVAL_EMP_SEQ,
            eType : evalType,
            pType : evalPositionType,
            rType : "eval"
        });
        const result4 = customKendo.fn_customAjax("/evaluation/getEvaluationScoreList", {
            evalSn : $("#evalSn").val(),
            empSeq : evalMem.EVAL_EMP_SEQ,
            evalEmpSeq : evalMem.EVAL_EVAL_F_SEQ,
            eType : evalType,
            pType : evalPositionType,
            rType : "evalF"
        });
        const result5 = customKendo.fn_customAjax("/evaluation/getEvaluationScoreList", {
            evalSn : $("#evalSn").val(),
            empSeq : evalMem.EVAL_EMP_SEQ,
            evalEmpSeq : evalMem.EVAL_EVAL_S_SEQ,
            eType : evalType,
            pType : evalPositionType,
            rType : "evalS"
        });
        console.log("result3", result3);
        console.log("result4", result4);
        console.log("result5", result5);

        evalResUser.setHtml(evalMem, result3, result4, result5);
    },

    setHtml(evalMem, result, result2, result3){
        const list = result == null ? null : result.list;
        const list2 = result2 == null ? null : result2.list;
        const list3 = result3 == null ? null : result3.list;
        for (let i = 0; i < list.length; i++) {
            const item = list == null ? null : list[i];
            const item2 = list2 == null ? null : list2[i];
            const item3 = list3 == null ? null : list3[i];
            evalResUser.fn_addRow(i, item, item2, item3);
        }

        let html = "";
        html += '<tr style="text-align: center;">';
        html += '   <td colspan="4" style="text-align: rigtt">합계</td>';
        html += '   <td>100</td>';
        html += '   <td>';
        html +=     evalMem.EVAL_SCORE;
        html += '   </td>';
        html += '   <td>';
        html +=     evalMem.EVAL_F_SCORE;
        html += '   </td>';
        html += '   <td>';
        html +=     evalMem.EVAL_S_SCORE;
        html += '   </td>';
        html += '</tr>';
        $('#evalList').append(html);
    },

    fn_addRow(evNum, item, item2, item3){
        let html = "";
        html += '<tr style="text-align: center;">';
        html += '   <td>' + (evNum + 1) + '</td>';
        html += '   <td>';
        html +=     item.EVAL_CAP;
        html += '   </td>';
        html += '   <td style="text-align: left; font-size: 11px">';
        html +=     (item.EVAL_TITLE).replaceAll("\n", "<br>") + '';
        html += '   </td>';
        html += '   <td style="text-align: left; font-size: 11px">';
        html +=     (item.EVAL_VAL).replaceAll("\n", "<br>") + '';
        html += '   </td>';
        html += '   <td>';
        let sText = item.EVAL_STR_S;
        if(sText != item.EVAL_END_S){
            sText += "~"+ item.EVAL_END_S;
        }
        html += '' + sText + '';
        html += '   </td>';
        html += '   <td>';
        html +=     item == null ? "-" : item.EVAL_SCORE;
        html += '   </td>';
        html += '   <td>';
        html +=     item2 == null ? "-" : item2.EVAL_SCORE;
        html += '   </td>';
        html += '   <td>';
        html +=     item3 == null ? "-" : item3.EVAL_SCORE;
        html += '   </td>';
        html += '</tr>';
        $('#evalList').append(html);
    }
}

