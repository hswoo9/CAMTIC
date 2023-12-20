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
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        const leftMap = leftResult.data;
        let leftAmt = leftMap.TM_AMT_SUM;
        $("#leftAmt").val(Number(amtText)-Number(leftAmt));
        $("#leftAmtTmp").val(comma(Number(amtText)-Number(leftAmt)));
    },

    fn_calCost: function(obj){
        if(obj.id.match("teamAmt") || obj.id.match("teamInvAmt")){
            const teamAmt = uncomma($("#teamAmt").val());
            const leftAmt = uncomma($("#leftAmt").val());
            const teamPer = 100 - Math.round(100 - Number(teamAmt) / Number(leftAmt) * 100);
            $("#teamPer").val(teamPer);

            const teamInvAmt = uncomma(obj.value);
            const teamIncomePer = Math.round(100 - Number(teamInvAmt) / Number(teamAmt) * 100);
            $("#teamIncomePer").val(teamIncomePer);
        }

        inputNumberFormat(obj);
    }
}