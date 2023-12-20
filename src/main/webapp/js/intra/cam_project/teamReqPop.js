var teamReq = {

    fn_defaultScript : function(){
        teamReq.fn_pageSet();
    },

    fn_pageSet : function(){
        const data = {
            pjtSn: $("#pjtSn").val()
        }
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        const pjtMap = result.map;
        const delvMap = result.delvMap;
        const setParameters = customKendo.fn_customAjax("/project/getProjectStep", data).rs;
        console.log(pjtMap);
        $("#pjtNm").text(pjtMap.PJT_NM);

        customKendo.fn_textBox(["team", "teamPMNm", "teamAmt", "teamPer", "teamInvAmt", "teamIncomePer",
            "delvAmtTmp", "leftAmtTmp"]);

        /** 총 예산 */
        let amtText = "";
        if(pjtMap.PJT_STEP < "E3" && delvMap != null){
            amtText = delvMap.DELV_AMT;
        }else if(pjtMap.PJT_STEP >= "E3"){
            amtText = pjtMap.PJT_AMT;
        }else{
            amtText = setParameters.EXP_AMT;
        }
        $("#delvAmt").val(amtText);
        $("#delvAmtTmp").val(comma(amtText));

        /** 수주부서 남은 잔액 조회 */
        data.teamVersionSn = $("#teamVersionSn").val()
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        console.log(leftResult);
        const leftMap = leftResult.data;
        let leftAmt = leftMap.TM_AMT_SUM;
        $("#leftAmt").val(Number(amtText)-Number(leftAmt));
        $("#leftAmtTmp").val(comma(Number(amtText)-Number(leftAmt)));
    },

    fn_calCost: function(obj){
        if(obj.id.match("teamAmt") || obj.id.match("teamInvAmt")){
            /** 배분비율 */
            const teamAmt = uncomma($("#teamAmt").val());
            const leftAmt = uncomma($("#leftAmt").val());
            const teamPer = 100 - Math.round(100 - Number(teamAmt) / Number(leftAmt) * 100);
            $("#teamPer").val(teamPer);

            /** 수익비율 */
            const teamInvAmt = uncomma($("#teamInvAmt").val());
            const teamIncomePer = Math.round(100 - Number(teamInvAmt) / Number(teamAmt) * 100);
            $("#teamIncomePer").val(teamIncomePer);
        }

        inputNumberFormat(obj);
    },

    fn_save: function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            teamVersionSn : $("#teamVersionSn").val(),

            tmType : 1,

            tmTeamSeq : $("#teamSeq").val(),
            tmPMSeq : $("#teamPMSeq").val(),
            teamAmt : uncomma($("#teamAmt").val()),
            tmInvAmt : uncomma($("#teamInvAmt").val()),

            regEmpSeq : $("#regEmpSeq").val()
        }

        if(parameters.tmPMSeq == ""){
            alert("담당자를 선택해주세요."); return;
        }

        if(parameters.teamAmt == "" || parameters.teamAmt == 0 || parameters.teamAmt == null){
            alert("배분금액 입력되지 않았습니다."); return;
        }

        if(parameters.tmInvAmt == "" || parameters.tmInvAmt == 0 || parameters.tmInvAmt == null){
            alert("예상비용이 입력되지 않았습니다."); return;
        }

        if(!confirm("협업등록을 하시겠습니까?")){
            return;
        }

        if(parameters.pjtSn == "" || parameters.teamVersionSn == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 창을 닫고 재시도 바랍니다."); return;
        }

        const result = customKendo.fn_customAjax("/project/team/setTeam", parameters);
        if(result.code == "200"){
            alert("저장이 완료되었습니다.");
            const busnClass = opener.commonProject.global.busnClass;
            if(busnClass == "D"){
                opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
            }else if(busnClass == "R"){
                opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
            }else if(busnClass == "S"){
                opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
            }else{
                opener.window.location.reload();
            }
            window.close();
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    }
}