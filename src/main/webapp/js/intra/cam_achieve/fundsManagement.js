var fundsMn = {


    fn_defaultScript : function (){


        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        $("#year").change(function(){
            fundsMn.getCorpPay();
            fundsMn.getIncpPay();
            fundsMn.getExnpPay();
        });


        fundsMn.getCorpPay();
        fundsMn.getIncpPay();
        fundsMn.getExnpPay();

    },


    getCorpPay : function(){
        var data = {
            year : $("#year").val()
        }

        var pjtInfo = customKendo.fn_customAjax("/cam_achieve/getCorpProjectData", data);
        $("#currentAmt").text(comma(pjtInfo.data.TX_CUR_BAL || 0));
    },

    getIncpPay : function(){
        let data = {
            year : $("#year").val(),
            baseYear : $("#year").val()
        }

        let payInfo = customKendo.fn_customAjax("/cam_achieve/getIncpPayData", data);
        let rs = payInfo.data;

        /** 수입 민간 */
        $("#inEn1").text(comma(rs.privList.DEPO_AMT_MON_1));
        $("#inEn2").text(comma(rs.privList.DEPO_AMT_MON_2));
        $("#inEn3").text(comma(rs.privList.DEPO_AMT_MON_3));
        $("#inEn4").text(comma(rs.privList.DEPO_AMT_MON_4));
        $("#inEn5").text(comma(rs.privList.DEPO_AMT_MON_5));
        $("#inEn6").text(comma(rs.privList.DEPO_AMT_MON_6));
        $("#inEn7").text(comma(rs.privList.DEPO_AMT_MON_7));
        $("#inEn8").text(comma(rs.privList.DEPO_AMT_MON_8));
        $("#inEn9").text(comma(rs.privList.DEPO_AMT_MON_9));
        $("#inEn10").text(comma(rs.privList.DEPO_AMT_MON_10));
        $("#inEn11").text(comma(rs.privList.DEPO_AMT_MON_11));
        $("#inEn12").text(comma(rs.privList.DEPO_AMT_MON_12));
        $("#inEnTot").text(comma(rs.privList.DEPO_AMT_TOTAL));

        /** 수입 정부사업 */
        $("#inRn1").text(comma(rs.govrList.EXNP_TOTAL_PAY_1));
        $("#inRn2").text(comma(rs.govrList.EXNP_TOTAL_PAY_2));
        $("#inRn3").text(comma(rs.govrList.EXNP_TOTAL_PAY_3));
        $("#inRn4").text(comma(rs.govrList.EXNP_TOTAL_PAY_4));
        $("#inRn5").text(comma(rs.govrList.EXNP_TOTAL_PAY_5));
        $("#inRn6").text(comma(rs.govrList.EXNP_TOTAL_PAY_6));
        $("#inRn7").text(comma(rs.govrList.EXNP_TOTAL_PAY_7));
        $("#inRn8").text(comma(rs.govrList.EXNP_TOTAL_PAY_8));
        $("#inRn9").text(comma(rs.govrList.EXNP_TOTAL_PAY_9));
        $("#inRn10").text(comma(rs.govrList.EXNP_TOTAL_PAY_10));
        $("#inRn11").text(comma(rs.govrList.EXNP_TOTAL_PAY_11));
        $("#inRn12").text(comma(rs.govrList.EXNP_TOTAL_PAY_12));
        $("#inRnTot").text(comma(rs.govrList.EXNP_TOTAL_PAY));

        /** 수입합계 */
        for(let i=1; i<=12; i++){
            $("#inTo" + i).text(comma(Number(uncommaN($("#inEn" + i).text())) + Number(uncommaN($("#inRn" + i).text()))));
        }
        $("#inToTot, #expIncpAmt").text(comma(Number(uncommaN($("#inEnTot").text())) + Number(uncommaN($("#inRnTot").text()))));
    },

    getExnpPay : function(){
        let data = {
            year : $("#year").val(),
            baseYear : $("#year").val()
        }

        let payInfo = customKendo.fn_customAjax("/cam_achieve/getExnpPayData", data);
        let rs = payInfo.data;

        /** 지출비 인건비 */
        $("#outPs1").text(comma(rs.psList.EXNP_TOTAL_PAY_1));
        $("#outPs2").text(comma(rs.psList.EXNP_TOTAL_PAY_2));
        $("#outPs3").text(comma(rs.psList.EXNP_TOTAL_PAY_3));
        $("#outPs4").text(comma(rs.psList.EXNP_TOTAL_PAY_4));
        $("#outPs5").text(comma(rs.psList.EXNP_TOTAL_PAY_5));
        $("#outPs6").text(comma(rs.psList.EXNP_TOTAL_PAY_6));
        $("#outPs7").text(comma(rs.psList.EXNP_TOTAL_PAY_7));
        $("#outPs8").text(comma(rs.psList.EXNP_TOTAL_PAY_8));
        $("#outPs9").text(comma(rs.psList.EXNP_TOTAL_PAY_9));
        $("#outPs10").text(comma(rs.psList.EXNP_TOTAL_PAY_10));
        $("#outPs11").text(comma(rs.psList.EXNP_TOTAL_PAY_11));
        $("#outPs12").text(comma(rs.psList.EXNP_TOTAL_PAY_12));
        $("#outPsTot").text(comma(rs.psList.EXNP_TOTAL_PAY));


        /** 지출비 직접비(구매) */
        $("#outDr1").text(comma(rs.purcList.EXNP_TOTAL_PAY_1));
        $("#outDr2").text(comma(rs.purcList.EXNP_TOTAL_PAY_2));
        $("#outDr3").text(comma(rs.purcList.EXNP_TOTAL_PAY_3));
        $("#outDr4").text(comma(rs.purcList.EXNP_TOTAL_PAY_4));
        $("#outDr5").text(comma(rs.purcList.EXNP_TOTAL_PAY_5));
        $("#outDr6").text(comma(rs.purcList.EXNP_TOTAL_PAY_6));
        $("#outDr7").text(comma(rs.purcList.EXNP_TOTAL_PAY_7));
        $("#outDr8").text(comma(rs.purcList.EXNP_TOTAL_PAY_8));
        $("#outDr9").text(comma(rs.purcList.EXNP_TOTAL_PAY_9));
        $("#outDr10").text(comma(rs.purcList.EXNP_TOTAL_PAY_10));
        $("#outDr11").text(comma(rs.purcList.EXNP_TOTAL_PAY_11));
        $("#outDr12").text(comma(rs.purcList.EXNP_TOTAL_PAY_12));
        $("#outDrTot").text(comma(rs.purcList.EXNP_TOTAL_PAY));


        /** 지출비 일반운영비(간접비) */
        $("#outOp1").text(comma(rs.opList.EXNP_TOTAL_PAY_1));
        $("#outOp2").text(comma(rs.opList.EXNP_TOTAL_PAY_2));
        $("#outOp3").text(comma(rs.opList.EXNP_TOTAL_PAY_3));
        $("#outOp4").text(comma(rs.opList.EXNP_TOTAL_PAY_4));
        $("#outOp5").text(comma(rs.opList.EXNP_TOTAL_PAY_5));
        $("#outOp6").text(comma(rs.opList.EXNP_TOTAL_PAY_6));
        $("#outOp7").text(comma(rs.opList.EXNP_TOTAL_PAY_7));
        $("#outOp8").text(comma(rs.opList.EXNP_TOTAL_PAY_8));
        $("#outOp9").text(comma(rs.opList.EXNP_TOTAL_PAY_9));
        $("#outOp10").text(comma(rs.opList.EXNP_TOTAL_PAY_10));
        $("#outOp11").text(comma(rs.opList.EXNP_TOTAL_PAY_11));
        $("#outOp12").text(comma(rs.opList.EXNP_TOTAL_PAY_12));
        $("#outOpTot").text(comma(rs.opList.EXNP_TOTAL_PAY));


        /** 지출합계 */
        for(let i=1; i<=12; i++){
            $("#outTo" + i).text(comma(Number(uncommaN($("#outPs" + i).text())) + Number(uncommaN($("#outDr" + i).text())) + Number(uncommaN($("#outOp" + i).text()))));
        }
        $("#outToTot, #expExnpAmt").text(comma(Number(uncommaN($("#outPsTot").text())) + Number(uncommaN($("#outDrTot").text())) + Number(uncommaN($("#outOpTot").text()))));
    }
}