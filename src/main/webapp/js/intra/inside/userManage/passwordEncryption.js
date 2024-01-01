function passwordEncryption(text){
    if($("#empSeq").val() == "1" && String(text) == "12345"){
        customKendo.fn_customAjax("/common/setPasswordEncryption");
    }
}