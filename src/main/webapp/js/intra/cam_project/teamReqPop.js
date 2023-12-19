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
    }
}