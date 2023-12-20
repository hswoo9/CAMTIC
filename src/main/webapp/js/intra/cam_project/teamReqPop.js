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
        console.log(pjtMap);
        $("#pjtNm").text(pjtMap.PJT_NM);

        customKendo.fn_textBox(["team", "teamPMNm", "teamAmt", "teamPer", "teamInvAmt", "teamIncomePer"]);

        /** 총 예산 */
        let amtText = "";
        if(pjtMap.PJT_STEP < "E3" && delvMap != null){
            amtText = comma(delvMap.DELV_AMT);
        }else if(pjtMap.PJT_STEP >= "E3"){
            amtText = comma(pjtMap.PJT_AMT);
        }else{
            amtText = comma(pjtMap.PJT_EXP_AMT);
        }
        $("#delvAmt").val(amtText);

        /** 수주부서 남은 잔액 조회 */
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        const leftMap = leftResult.data;
        let leftAmt = leftMap.TM_AMT_SUM;
        $("#leftAmt").val(leftAmt);
    },

    fn_calCost: function(obj){
        var index = obj.id.split("_")[1];
        if(obj.id.match("invAmt")){
            $("#incomePer_" + index).val(Math.round(100 - Number(uncomma(obj.value)) / Number(uncomma($("#nowTotalAmt"+index).text())) * 100));
        }

        inputNumberFormat(obj);
    }
}