var laborList = {

    global: {

    },

    fn_defaultScript : function(){

        customKendo.fn_datePicker("baseYear", "decade", "yyyy", new Date());

        $("#baseYear").change(function (){
            laborList.fn_calcReset();
        });

        laborList.fn_calcReset();

    },

    fn_calcReset : function(){
        $("#statusTb span").not(".percentage").text(0)
        $("#statusTb span.percentage").text("0.00%")


        laborList.fn_calcPartRate();
    },

    fn_calcPartRate : function (){
        var data = {
            baseYear : $("#baseYear").val()
        }

        var result = customKendo.fn_customAjax("/inside/getCalcPartRate", data);
        var ls = result.list;

        var sum1 = 0;
        var sum2 = 0;
        var sum3 = 0;
        var sum4 = 0;
        var sum5 = 0;
        var sum6 = 0;
        var sum7 = 0;
        var sum8 = 0;
        var sum9 = 0;
        var sum10 = 0;
        var sum11 = 0;
        var sum12 = 0;

        for(var i = 0; i < ls.length; i++) {
            var item = ls[i];

            sum1 += item.SUM_MON_PAY_1;
            sum2 += item.SUM_MON_PAY_2;
            sum3 += item.SUM_MON_PAY_3;
            sum4 += item.SUM_MON_PAY_4;
            sum5 += item.SUM_MON_PAY_5;
            sum6 += item.SUM_MON_PAY_6;
            sum7 += item.SUM_MON_PAY_7;
            sum8 += item.SUM_MON_PAY_8;
            sum9 += item.SUM_MON_PAY_9;
            sum10 += item.SUM_MON_PAY_10;
            sum11 += item.SUM_MON_PAY_11;
            sum12 += item.SUM_MON_PAY_12;

            if (item.BUSN_CLASS == "R") {
                $("#R1").text(comma(item.SUM_MON_PAY_1));
                $("#R2").text(comma(item.SUM_MON_PAY_2));
                $("#R3").text(comma(item.SUM_MON_PAY_3));
                $("#R4").text(comma(item.SUM_MON_PAY_4));
                $("#R5").text(comma(item.SUM_MON_PAY_5));
                $("#R6").text(comma(item.SUM_MON_PAY_6));
                $("#R7").text(comma(item.SUM_MON_PAY_7));
                $("#R8").text(comma(item.SUM_MON_PAY_8));
                $("#R9").text(comma(item.SUM_MON_PAY_9));
                $("#R10").text(comma(item.SUM_MON_PAY_10));
                $("#R11").text(comma(item.SUM_MON_PAY_11));
                $("#R12").text(comma(item.SUM_MON_PAY_12));
                $("#RTotal").text(comma(item.SUM_MON_PAY_1 + item.SUM_MON_PAY_2 + item.SUM_MON_PAY_3 + item.SUM_MON_PAY_4 + item.SUM_MON_PAY_5 + item.SUM_MON_PAY_6 +
                    item.SUM_MON_PAY_7 + item.SUM_MON_PAY_8 + item.SUM_MON_PAY_9 + item.SUM_MON_PAY_10 + item.SUM_MON_PAY_11 + item.SUM_MON_PAY_12));
            } else if (item.BUSN_CLASS == "S") {
                $("#S1").text(comma(item.SUM_MON_PAY_1));
                $("#S2").text(comma(item.SUM_MON_PAY_2));
                $("#S3").text(comma(item.SUM_MON_PAY_3));
                $("#S4").text(comma(item.SUM_MON_PAY_4));
                $("#S5").text(comma(item.SUM_MON_PAY_5));
                $("#S6").text(comma(item.SUM_MON_PAY_6));
                $("#S7").text(comma(item.SUM_MON_PAY_7));
                $("#S8").text(comma(item.SUM_MON_PAY_8));
                $("#S9").text(comma(item.SUM_MON_PAY_9));
                $("#S10").text(comma(item.SUM_MON_PAY_10));
                $("#S11").text(comma(item.SUM_MON_PAY_11));
                $("#S12").text(comma(item.SUM_MON_PAY_12));
                $("#STotal").text(comma(item.SUM_MON_PAY_1 + item.SUM_MON_PAY_2 + item.SUM_MON_PAY_3 + item.SUM_MON_PAY_4 + item.SUM_MON_PAY_5 + item.SUM_MON_PAY_6 +
                    item.SUM_MON_PAY_7 + item.SUM_MON_PAY_8 + item.SUM_MON_PAY_9 + item.SUM_MON_PAY_10 + item.SUM_MON_PAY_11 + item.SUM_MON_PAY_12));
            } else if (item.BUSN_CLASS == "V") {
                $("#V1").text(comma(item.SUM_MON_PAY_1));
                $("#V2").text(comma(item.SUM_MON_PAY_2));
                $("#V3").text(comma(item.SUM_MON_PAY_3));
                $("#V4").text(comma(item.SUM_MON_PAY_4));
                $("#V5").text(comma(item.SUM_MON_PAY_5));
                $("#V6").text(comma(item.SUM_MON_PAY_6));
                $("#V7").text(comma(item.SUM_MON_PAY_7));
                $("#V8").text(comma(item.SUM_MON_PAY_8));
                $("#V9").text(comma(item.SUM_MON_PAY_9));
                $("#V10").text(comma(item.SUM_MON_PAY_10));
                $("#V11").text(comma(item.SUM_MON_PAY_11));
                $("#V12").text(comma(item.SUM_MON_PAY_12));
                $("#VTotal").text(comma(item.SUM_MON_PAY_1 + item.SUM_MON_PAY_2 + item.SUM_MON_PAY_3 + item.SUM_MON_PAY_4 + item.SUM_MON_PAY_5 + item.SUM_MON_PAY_6 +
                    item.SUM_MON_PAY_7 + item.SUM_MON_PAY_8 + item.SUM_MON_PAY_9 + item.SUM_MON_PAY_10 + item.SUM_MON_PAY_11 + item.SUM_MON_PAY_12));
            } else if (item.BUSN_CLASS == "D") {
                $("#D1").text(comma(item.SUM_MON_PAY_1));
                $("#D2").text(comma(item.SUM_MON_PAY_2));
                $("#D3").text(comma(item.SUM_MON_PAY_3));
                $("#D4").text(comma(item.SUM_MON_PAY_4));
                $("#D5").text(comma(item.SUM_MON_PAY_5));
                $("#D6").text(comma(item.SUM_MON_PAY_6));
                $("#D7").text(comma(item.SUM_MON_PAY_7));
                $("#D8").text(comma(item.SUM_MON_PAY_8));
                $("#D9").text(comma(item.SUM_MON_PAY_9));
                $("#D10").text(comma(item.SUM_MON_PAY_10));
                $("#D11").text(comma(item.SUM_MON_PAY_11));
                $("#D12").text(comma(item.SUM_MON_PAY_12));
                $("#DTotal").text(comma(item.SUM_MON_PAY_1 + item.SUM_MON_PAY_2 + item.SUM_MON_PAY_3 + item.SUM_MON_PAY_4 + item.SUM_MON_PAY_5 + item.SUM_MON_PAY_6 +
                    item.SUM_MON_PAY_7 + item.SUM_MON_PAY_8 + item.SUM_MON_PAY_9 + item.SUM_MON_PAY_10 + item.SUM_MON_PAY_11 + item.SUM_MON_PAY_12));
            }
        }

        $("#pSum1").text(comma(sum1));
        $("#pSum2").text(comma(sum2));
        $("#pSum3").text(comma(sum3));
        $("#pSum4").text(comma(sum4));
        $("#pSum5").text(comma(sum5));
        $("#pSum6").text(comma(sum6));
        $("#pSum7").text(comma(sum7));
        $("#pSum8").text(comma(sum8));
        $("#pSum9").text(comma(sum9));
        $("#pSum10").text(comma(sum10));
        $("#pSum11").text(comma(sum11));
        $("#pSum12").text(comma(sum12));
        $("#pTotal").text(comma(sum1 + sum2 + sum3 + sum4 + sum5 + sum6 + sum7 + sum8 + sum9 + sum10 + sum11 + sum12));


        var ls2 = result.list2;
        var cTotal = 0;
        var eTotal = 0;
        var iTotal = 0;
        var rtTotal = 0;
        var tTotal = 0;

        for(var i = 0; i < ls2.length; i++){
            var month = Number(ls2[i].MONTH);
            var totalPay = Number(ls2[i].TOTAL_PAY);
            var deduction = Number(ls2[i].DEDUCTION);
            var retirementPen = Number(ls2[i].RETIREMENT_PEN);
            var pSum = Number(uncomma($("#pSum" + month).text()))

            $("#c" + month).text(comma(totalPay - pSum));
            cTotal += (totalPay - pSum);

            $("#e" + month).text(comma(totalPay));
            eTotal += totalPay;

            $("#i" + month).text(comma(deduction));
            iTotal += deduction;

            $("#rt" + month).text(comma(retirementPen));
            rtTotal += retirementPen;

            $("#t" + month).text(comma(totalPay + deduction + retirementPen));
            tTotal += (totalPay + deduction + retirementPen);

            $("#p" + month).text(((((totalPay - pSum) + deduction + retirementPen)/(totalPay + deduction + retirementPen)) * 100).toFixed(2) + "%");
        }

        $("#cTotal").text(comma(cTotal))
        $("#eTotal").text(comma(eTotal))
        $("#iTotal").text(comma(iTotal))
        $("#rtTotal").text(comma(rtTotal))
        $("#tTotal").text(comma(tTotal))
        if(isNaN((((cTotal + iTotal + rtTotal)/tTotal) * 100).toFixed(2))){
            $("#peTotal").text("0.00%")
        }else{
            $("#peTotal").text((((cTotal + iTotal + rtTotal)/tTotal) * 100).toFixed(2) + "%")
        }
    },
}