var crmMgScale = {

    global : {
        radioDataSource : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },
    
    fn_defaultScript : function (){
        customKendo.fn_textBox(["mgScaleYear", "asset", "liabilities", "liabilitiesRatio", "capitalTotal", "capital", "capitalRatio", "sales", "netIncome",
                                "operatProfit", "operatProfitRatio", "empCnt"])

        $("#capitalTotal, #capital, #sales, #netIncome, #operatProfit, #operatProfitRatio").on("keyup", function(){
            $(this).val(crmMgScale.comma(crmMgScale.uncomma(this.value)));
        });

        crmMgScale.mgScaleDataSet();
    },

    fn_save : function (){
        crmMgScale.global.saveAjaxData = {
            crmMgScaleSn : $("#crmMgScaleSn").val(),
            crmSn : $("#crmSn").val(),
            mgScaleYear : $("#mgScaleYear").val(),
            asset : crmMgScale.uncomma($("#asset").val()),
            liabilities : crmMgScale.uncomma($("#liabilities").val()),
            liabilitiesRatio : $("#liabilitiesRatio").val(),
            capitalTotal : crmMgScale.uncomma($("#capitalTotal").val()),
            capital : crmMgScale.uncomma($("#capital").val()),
            capitalRatio : $("#capitalRatio").val(),
            sales : crmMgScale.uncomma($("#sales").val()),
            netIncome : crmMgScale.uncomma($("#netIncome").val()),
            operatProfit : crmMgScale.uncomma($("#operatProfit").val()),
            operatProfitRatio : crmMgScale.uncomma($("#operatProfitRatio").val()),
            empCnt : $("#empCnt").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        var result = customKendo.fn_customAjax("/crm/setCrmMgScale.do", crmMgScale.global.saveAjaxData);
        if(result.flag){
            alert("저장되었습니다.");
            location.reload();
        }
    },

    mgScaleDataSet : function(){
        crmMgScale.global.saveAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmMgScale.do", crmMgScale.global.saveAjaxData);
        if(result.flag){
            if(result.data != null){
                $("#crmMgScaleSn").val(result.data.CRM_MG_SCALE_SN);
                $("#mgScaleYear").val(result.data.MG_SCALE_YEAR)
                $("#asset").val(crmMgScale.comma(result.data.ASSET))
                $("#liabilities").val(crmMgScale.comma(result.data.LIABILITIES))
                $("#liabilitiesRatio").val(result.data.LIABILITIES_RATIO)
                $("#capitalTotal").val(crmMgScale.comma(result.data.CAPITAL_TOTAL))
                $("#capital").val(crmMgScale.comma(result.data.CAPITAL))
                $("#capitalRatio").val(result.data.CAPITAL_RATIO)
                $("#sales").val(crmMgScale.comma(result.data.SALES))
                $("#netIncome").val(crmMgScale.comma(result.data.NET_INCOME))
                $("#operatProfit").val(crmMgScale.comma(result.data.OPERAT_PROFIT))
                $("#operatProfitRatio").val(crmMgScale.comma(result.data.OPERAT_PROFIT_RATIO))
                $("#empCnt").val(result.data.EMP_CNT)
            }
        }
    },

    inputNumberFormat : function (obj){
        obj.value = crmMgScale.comma(crmMgScale.uncomma(obj.value));
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