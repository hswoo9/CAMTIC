var crmCert = {

    global : {
        radioDataSource : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },
    
    fn_defaultScript : function (){
        customKendo.fn_textBox(["ventureTxt", "innobizTxt", "mainbizTxt"])

        $("#otherCert").kendoTextArea({
            rows : 5,
        });

        crmCert.certDataSet();
    },

    fn_save : function (){
        crmCert.global.saveAjaxData = {
            crmCertSn : $("#crmCertSn").val(),
            crmSn : $("#crmSn").val(),
            venture : $("#venture").is(":checked") ? "Y" : "N",
            ventureTxt : $("#ventureTxt").val(),
            innobiz : $("#innobiz").is(":checked") ? "Y" : "N",
            innobizTxt : $("#innobizTxt").val(),
            mainbiz : $("#mainbiz").is(":checked") ? "Y" : "N",
            mainbizTxt : $("#mainbizTxt").val(),
            otherCert : $("#otherCert").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        var result = customKendo.fn_customAjax("/crm/setCrmCert.do", crmCert.global.saveAjaxData);
        if(result.flag){
            alert("저장되었습니다.");
            location.reload();
        }
    },

    certDataSet : function(){
        crmCert.global.saveAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmCert.do", crmCert.global.saveAjaxData);
        if(result.flag){
            console.log(result)
            if(result.data != null){
                $("#crmCertSn").val(result.data.CRM_CERT_SN);

                if(result.data.VENTURE == "Y"){
                    $("#venture").prop("checked", true);
                }
                $("#ventureTxt").val(result.data.VENTURE_TXT);

                if(result.data.INNOBIZ == "Y"){
                    $("#innobiz").prop("checked", true);
                }
                $("#innobizTxt").val(result.data.INNOBIZ_TXT);

                if(result.data.MAINBIZ == "Y"){
                    $("#mainbiz").prop("checked", true);
                }
                $("#mainbizTxt").val(result.data.MAINBIZ_TXT);
                $("#otherCert").val(result.data.OTHER_CERT);
            }
        }
    }
}