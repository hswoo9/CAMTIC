var fundsMn = {


    fn_defaultScript : function (){


        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        $("#year").change(function(){
            fundsMn.getCorpPay();
        });


        fundsMn.getCorpPay();

    },


    getCorpPay : function(){
        var data = {
            year : $("#year").val(),
            baNb : '529230312907'
        }

        data.pjtCd = "Mm1m1" + data.year.toString().substring(2,4) + "010"

        var pjtInfo = customKendo.fn_customAjax("/cam_achieve/getCorpProjectData", data);

        var rs = customKendo.fn_customAjax("/mng/getIncpExnpAmt", data);

        rs = rs.rs;

        $("#incpA").text(comma(rs.incpA || 0));
        $("#incpB").text(comma(rs.incpB || 0));
        $("#incpC").text(comma(rs.incpC || 0));

        $("#exnpA").text(comma(rs.exnpA || 0));
        $("#exnpB").text(comma(rs.exnpB || 0));
        $("#exnpC").text(comma(rs.exnpC || 0));

        $("#sumA").text(comma(Number(rs.incpA) + Number(rs.exnpA) || 0));
        $("#sumB").text(comma(Number(rs.incpB) + Number(rs.exnpB) || 0));
        $("#sumC").text(comma(Number(rs.incpC) + Number(rs.exnpC) || 0));


        var overPay = 0;
        if(pjtInfo.data != null && pjtInfo.data != undefined){
            overPay = Number(Number((pjtInfo.data.OVER_CASH || 0)) + Number((pjtInfo.data.OVER_POINT || 0)));
        }

        var totPay = overPay + Number(rs.incpA) - Number(rs.exnpA) + Number(rs.incpB) - Number(rs.exnpB);
        $("#currentAmt").text(comma(totPay));
    }
}