/**
 * 예산과목 리턴
 * @param bgtNm
 * @param bgtCd
 */
function fn_selBudgetInfo(bgtNm, bgtCd, idx, subAm){
    if(idx == "N"){
        $("#budgetSn").val(bgtCd);
        $("#budgetNm").val(bgtNm);
    }else{
        $("#budgetSn" + idx).val(bgtCd);
        $("#budgetNm" + idx).val(bgtNm);
        $("#budgetAmt" + idx).val(subAm);
    }
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

    if(regNb == null || regNb == "" || regNb == "undefined"){
        regNb = "";
    }

    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#crmBnkNm" + idx).val(jiro);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);
    $("#regNo" + idx).val(regNb);
}

function fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }
    if(cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined"){
        cardBaNb = "";
    }
    if(baNb == null || baNb == "" || baNb == "undefined"){
        baNb = "";
    }
    if(jiro == null || jiro == "" || jiro == "undefined"){
        jiro = "";
    }
    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    $("#card" + idx).val(trNm);
    $("#cardNo" + idx).val(cardBaNb);
    $("#trCd" + idx).val(trCd);
    $("#crmBnkNm" + idx).val(jiro);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);

    if(idx == 0){
        $("#trNm").val(trNm);
        $("#cardBaNb").val(cardBaNb);
        $("#trCd").val(trCd);
        $("#jiroNm").val(jiro);
        $("#baNb").val(baNb);
        $("#depositor").val(depositor);
    }
}

function fn_selEmpInfo(trCd, bankName, accountNum, accountHolder, empNameKr, idx, regNo){
    if(accountHolder == null || accountHolder == "" || accountHolder == "undefined"){
        accountHolder = "";
    }
    if(accountNum == null || accountNum == "" || accountNum == "undefined"){
        accountNum = "";
    }
    if(empNameKr == null || empNameKr == "" || empNameKr == "undefined"){
        empNameKr = "";
    }
    if(bankName == null || bankName == "" || bankName == "undefined"){
        bankName = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    $("#trCd" + idx).val(trCd);
    $("#crmNm" + idx).val(empNameKr);
    $("#crmBnkNm" + idx).val(bankName);
    $("#crmAccNo" + idx).val(accountNum);
    $("#crmAccHolder" + idx).val(accountHolder);
    $("#regNo" + idx).val(regNo);
}

function fn_selOtherInfo(trCd, bankName,  accountHolder, accountNum, empNameKr, idx, type, regNo){
    if(accountHolder == null || accountHolder == "" || accountHolder == "undefined"){
        accountHolder = "";
    }
    if(accountNum == null || accountNum == "" || accountNum == "undefined"){
        accountNum = "";
    }
    if(empNameKr == null || empNameKr == "" || empNameKr == "undefined"){
        empNameKr = "";
    }
    if(bankName == null || bankName == "" || bankName == "undefined"){
        bankName = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    $("#trCd" + idx).val(trCd);
    $("#crmNm" + idx).val(empNameKr);
    $("#crmBnkNm" + idx).val(bankName);
    $("#crmAccNo" + idx).val(accountNum);
    $("#crmAccHolder" + idx).val(accountHolder);


    var url = "/payApp/pop/setPayRequest.do?idx=" + idx + "&type=" + type + "&trCd=" + trCd + "&empNameKr=" + empNameKr + "&bankName=" + bankName + "&accountNum=" + accountNum + "&accountHolder=" + accountHolder + "&regNo=" + regNo;

    var name = "_blank";
    var option = "width = 800, height = 500, top = 100, left = 400, location = no"
    var popup = window.open(url, name, option);
}

function fn_selEtaxInfo(trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm, issNo, coCd, taxTy, idx){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }
    if(isuDt == null || isuDt == "" || isuDt == "undefined"){
        isuDt = "";
    }
    if(trregNb == null || trregNb == "" || trregNb == "undefined"){
        trregNb = "";
    }
    if(trCd == null || trCd == "" || trCd == "undefined"){
        trCd = "";
    }

    $("#trDe" + idx).val(isuDt.substring(0, 4) + "-" + isuDt.substring(4, 6) + "-" + isuDt.substring(6, 8));
    $("#regNo" + idx).val(trregNb);
    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#totCost" + idx).val(comma(sumAm));
    $("#supCost" + idx).val(comma(supAm));
    $("#vatCost" + idx).val(comma(vatAm));
    $("#issNo" + idx).val(issNo);
    $("#coCd" + idx).val(coCd);
    $("#taxTy" + idx).val(taxTy);
}