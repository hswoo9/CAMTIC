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
    },

    fn_calCost: function(obj){
        var index = obj.id.split("_")[1];
        if(obj.id.match("invAmt")){
            $("#incomePer_" + index).val(Math.round(100 - Number(uncomma(obj.value)) / Number(uncomma($("#nowTotalAmt"+index).text())) * 100));
        }

        inputNumberFormat(obj);
    }
}