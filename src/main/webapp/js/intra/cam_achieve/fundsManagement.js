var fundsMn = {


    fn_defaultScript : function (){


        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        $("#year").change(function(){
            fundsMn.getCorpPay();
            fundsMn.getIncpPay();
        });


        fundsMn.getCorpPay();
        fundsMn.getIncpPay();

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
        $("#inToTot").text(comma(Number(uncommaN($("#inEnTot").text())) + Number(uncommaN($("#inRnTot").text()))));
    }
}