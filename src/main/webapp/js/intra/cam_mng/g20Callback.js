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