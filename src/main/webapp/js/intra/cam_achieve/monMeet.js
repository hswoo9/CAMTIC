var monMeet = {


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        monMeet.fn_dataReset();

        $("#year").change(function (){
            monMeet.fn_dataReset();
        });
    },

    fn_dataReset : function() {

        $("td[name='delvObj']").text("0");
        $("td[name='delvAch']").text("0");
        $("td[name='delvExp']").text("0");
        $("td[name='delvSum']").text("0");
        $("td[name='delvPer']").text("0");

        $("td[name='saleObj']").text("0");
        $("td[name='saleAch']").text("0");
        $("td[name='saleExp']").text("0");
        $("td[name='saleSum']").text("0");
        $("td[name='salePer']").text("0");

        $("td[name='incpObj']").text("0");
        $("td[name='incpAch']").text("0");
        $("td[name='incpExp']").text("0");
        $("td[name='incpSum']").text("0");
        $("td[name='incpPer']").text("0");

        monMeet.fn_searchData();
    },

    fn_searchData : function(){

        var parameters = {
            year : $("#year").val(),
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/getEngnDeptData", parameters);

        console.log(rs);
        var ls = rs.ls;
        var engnSaleList = rs.saleLs.engnSaleList;          // 민간사업 매출
        var rndSaleList = rs.saleLs.rndSaleList;            // 정부사업 매출
        var objList = rs.objLs;                             // 목표

        var engnEstList = rs.incpLs.engnEstList;            // 민간사업 투자금액
        var engnPurcList = rs.incpLs.engnPurcList;          // 민간사업 구매
        var engnBustripList = rs.incpLs.engnBustripList;    // 민간사업 출장
        var rndIncpList = rs.incpLs.rndIncpList;            // 정부사업 수익


        /** 목표 */
        var delvObj = 0;
        var saleObj = 0;
        var incpObj = 0;

        for (var j = 0; j < objList.length; j++) {
            delvObj += (objList[j].DELV_OBJ || 0);
            saleObj += (objList[j].SALE_OBJ || 0);
            incpObj += (objList[j].INCP_OBJ || 0);
        }

        $("#delvObj").text(comma(Math.floor(delvObj / 1000000) || 0));      // 수주목표
        $("#saleObj").text(comma(Math.floor(saleObj / 1000000) || 0));      // 매출목표
        $("#incpObj").text(comma(Math.floor(incpObj / 1000000) || 0));      // 운영수익목표


        /** 달성, 예상, 합계 */
        var pjtAmt = 0;
        var expAmt = 0;
        var expAmt2 = 0;
        var engnPjtAmt = 0;
        var rndPjtAmt = 0;
        var purcEngnSum = 0;
        var bustripEngnSum = 0;
        var incpRndSum = 0;
        var estEngnSum = 0;

        for(var i = 0 ; i < ls.length ; i++){
            pjtAmt += (ls[i].PJT_AMT || 0);
            expAmt += (ls[i].EXP_AMT || 0);
            expAmt2 += (ls[i].EXP_AMT2 || 0);
        }

        for(var j = 0 ; j < engnSaleList.length ; j++){
            engnPjtAmt += (engnSaleList[j].PJT_AMT || 0);
        }

        for(var j = 0 ; j < rndSaleList.length ; j++){
            rndPjtAmt += (rndSaleList[j].PJT_AMT || 0);
        }

        for(var j = 0 ; j < engnPurcList.length ; j++){
            purcEngnSum += (engnPurcList[j].PURC_EXNP_AMT || 0);
        }

        for(var j = 0 ; j < engnBustripList.length ; j++){
            bustripEngnSum += (engnBustripList[j].BUSTRIP_EXNP_AMT || 0);
        }

        for(var j = 0 ; j < rndIncpList.length ; j++){
            incpRndSum += (rndIncpList[j].TOT_COST || 0);
        }

        for(var j = 0 ; j < engnEstList.length ; j++){
            estEngnSum += (engnEstList[j].EST_TOT_AMT || 0);
        }

        var engnSaleSum = pjtAmt + engnPjtAmt;
        var engnIncpSum = purcEngnSum + bustripEngnSum;

        $("#delvAch").text(comma((Math.floor(pjtAmt / 1000000) || 0)));                         // 수주 달성
        $("#delvExp").text(comma((Math.floor((expAmt + expAmt2) / 1000000) || 0)));             // 수주 예상
        $("#delvSum").text(comma((Math.floor((pjtAmt + (expAmt + expAmt2)) / 1000000) || 0)));  // 수주 합계

        $("#saleAch").text(comma((Math.floor((pjtAmt + (engnPjtAmt || 0) + (rndPjtAmt || 0)) / 1000000)) || 0));                // 매출 달성
        $("#saleExp").text(comma((Math.floor((pjtAmt + (engnPjtAmt || 0) + (pjtAmt - (rndPjtAmt || 0))) / 1000000)) || 0));     // 매출 예상
        $("#saleSum").text(comma(Number(uncomma($("#saleAch").text())) + Number(uncomma($("#saleExp").text()))));                  // 매출 합계

        $("#incpAch").text(comma((Math.floor((engnSaleSum - engnIncpSum + incpRndSum) / 1000000)) || 0));           // 운영수익 달성
        $("#incpExp").text(comma((Math.floor((engnSaleSum - estEngnSum + incpRndSum) / 1000000)) || 0));            // 운영수익 예상
        $("#incpSum").text(comma(Number(uncomma($("#incpAch").text())) + Number(uncomma($("#incpExp").text()))));      // 운영수익 합계

        monMeet.fn_calcPercent();
    },

    fn_calcPercent : function(){

        /** 수주  */
        var delvObj = Number(uncommaN($("#delvObj").text()));
        var delvSum = Number(uncommaN($("#delvSum").text()));

        if(delvObj == 0 || delvSum == 0){
            $("#delvPer").text("0 %");
        } else {
            $("#delvPer").text( Math.round((delvSum / delvObj * 100) * 10) / 10 + " %" );
        }

        /** 매출  */
        var saleObj = Number(uncommaN($("#saleObj").text()));
        var saleSum = Number(uncommaN($("#saleSum").text()));

        if(saleObj == 0 || saleSum == 0){
            $("#salePer").text("0 %");
        } else {
            $("#salePer").text( Math.round((saleSum / saleObj * 100) * 10) / 10 + " %" );
        }

        /** 운영수익  */
        var incpObj = Number(uncommaN($("#incpObj").text()));
        var incpSum = Number(uncommaN($("#incpSum").text()));

        if(incpObj == 0 || incpSum == 0){
            $("#incpPer").text("0 %");
        } else {
            $("#incpPer").text( Math.round((incpSum / incpObj * 100) * 10) / 10 + " %" );
        }
    },
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}