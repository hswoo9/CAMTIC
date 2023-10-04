var movJb = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript : function(){
        $("#searchYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        movJb.mfOverViewDataSet();
    },

    mfOverViewDataSet : function(){
        movJb.global.searchAjaxData = {
            mfNo : $("#mfNo").val(),
            searchYear : $("#searchYear").val()
        }

        var result = customKendo.fn_customAjax("/crm/getMfOverviewInfo", movJb.global.searchAjaxData);
        if(result.flag){
            console.log(result);
            var data = result.data;
            if(data != null){
                $("#area").text(data.MF_AREA);
                $("#active").text(data.ACTIVE);
                $("#mfName").text(data.MF_NAME);
                $("#mfNo2").text(data.MF_NO);
                $("#ceoName").text(data.CEO_NAME + "(" + data.CEO_GENDER + ")");
                $("#ceoTelNum").text(data.CEO_TEL_NUM);
                $("#addr").text(data.ADDR);
                $("#estDate").text(data.EST_DATE);
                $("#history").text(data.HISTORY);
                $("#location").text(data.LOCATION);
                $("#telNum").text(data.TEL_NUM);
                $("#faxNum").text(data.FAX_NUM);
                $("#homepage").text(data.HOME_PAGE);
                $("#email").text(data.EMAIL);
                $("#chargeName").text(data.CHARGE_NAME);
                $("#chargeTelNum").text(data.CHARGE_TEL_NUM);
                $("#industry").text(data.INDUSTRY);
                $("#mainProduct").text(data.MAIN_PRODUCT);
                $("#amPart").text(data.AM_PART);
                $("#amPartType").text(data.AM_PART_TYPE);

                if(!isNaN(data.CAPITAL)){
                    $("#capital").text(movJb.comma(Number(movJb.uncomma(data.CAPITAL)) * 1000000));
                }else{
                    $("#capital").text(data.CAPITAL)
                }

                if(!isNaN(data.SALES)){
                    $("#sales").text(movJb.comma(Number(movJb.uncomma(data.SALES)) * 1000000));
                }else{
                    $("#sales").text(data.SALES);
                }

                if(!isNaN(data.SALES_AMT) && data.SALES_AMT != ""){
                    $("#salesAmt").text((data.SALES_AMT.replaceAll("%", '') * 100) + "%");
                } else if(data.SALES_AMT != "미응답"){
                    $("#salesAmt").text(data.SALES_AMT);
                } else{
                    $("#salesAmt").text("0%");
                }

                if(!isNaN(data.SALES_RATIO_PROV) && data.SALES_RATIO_PROV != ""){
                    $("#salesRatioProv").text((data.SALES_RATIO_PROV.replaceAll("%", '') * 100) + "%");
                } else if(data.SALES_RATIO_PROV != "미응답"){
                    $("#salesRatioProv").text(data.SALES_RATIO_PROV);
                } else{
                    $("#salesRatioProv").text("0%");
                }

                if(!isNaN(data.SALES_RATIO_OT_PROV) && data.SALES_RATIO_OT_PROV != ""){
                    $("#salesRatioOtProv").text((data.SALES_RATIO_OT_PROV.replaceAll("%", '') * 100) + "%");
                } else if(data.SALES_RATIO_OT_PROV != "미응답"){
                    $("#salesRatioOtProv").text(data.SALES_RATIO_OT_PROV);
                } else{
                    $("#salesRatioOtProv").text("0%");
                }

                if(data.EMP_CNT != null && data.EMP_CNT != ""){
                    $("#empCnt").text(data.EMP_CNT + "명");
                }else{
                    $("#empCnt").text("0명");
                }

                $("#empForeign").text(data.EMP_FOREIGN);

                if(data.FOREIGN_CNT != null && data.FOREIGN_CNT != ""){
                    $("#foreignCnt").text(data.FOREIGN_CNT + "명");
                }else{
                    $("#foreignCnt").text("0명");
                }

                $("#exportYn").text(data.EXPORT_YN);

                $("#laboratoryYn").text(data.LABORATORY_YN);
                $("#carbonYn").text(data.CARBON_YN);
                $("#rprYn").text(data.RPR_YN);
                $("#newProductYn").text(data.NEW_PRODUCT_YN);
                $("#facilityInvestYn").text(data.FACILITY_INVEST_YN);
                $("#highlySatField").text(data.HIGHLY_SAT_FIELD);
                $("#needField").text(data.NEED_FIELD);
                $("#agreeYn").text(data.AGREE_YN);
                $("#agree2Yn").text(data.AGREE2_YN);
            }
        }
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}