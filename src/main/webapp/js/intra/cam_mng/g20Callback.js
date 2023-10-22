/**
 * 예산과목 리턴
 * @param bgtNm
 * @param bgtCd
 */
function fn_selBudgetInfo(bgtNm, bgtCd){
    $("#budgetSn").val(bgtCd);
    $("#budgetNm").val(bgtNm);


}

/**
 * 계좌정보 리턴
 * @param trCd
 * @param trNm
 * @param baNb
 * @param depositor
 * @param jiroNm
 */
function fn_selBankInfo(trCd, trNm, baNb, depositor, jiroNm){
    $("#bnkSn").val(trCd);
    $("#accNm").val(trNm);
    $("#accNo").val(baNb);
    $("#bnkNm").val(jiroNm);
}

function fn_selClientInfo(trCd, trNm, baNb, depositor, jiro, ceoNm, regNb, idx){
    console.log(baNb);
    console.log(depositor)
    console.log(jiro)
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }
    if(baNb == null || baNb == "" || baNb == "undefined"){
        baNb = "";
    }
    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
    }
    if(jiro == null || jiro == "" || jiro == "undefined"){
        jiro = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#crmBnkNm" + idx).val(jiro);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);
}