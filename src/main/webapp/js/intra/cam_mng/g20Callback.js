/**
 * 예산과목 리턴
 * @param bgtNm
 * @param bgtCd
 */
function fn_selBudgetInfo(bgtNm, bgtCd, idx, subAm){
    if(idx == "all"){
        var parameters = {
            bgtNm : bgtNm,
            bgtCd : bgtCd,
            subAm : subAm
        }

        regPayDet.fn_budgetChange(parameters);
    } else {
        if(idx == "N"){
            $("#budgetSn").val(bgtCd);
            $("#budgetNm").val(bgtNm);
        }else{
            $("#budgetSn" + idx).val(bgtCd);
            $("#budgetNm" + idx).val(bgtNm);
            $("#budgetAmt" + idx).val(subAm);
        }
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
    if(ceoNm == null || ceoNm == "" || ceoNm == "undefined"){
        ceoNm = "";
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
    $("#ceoNm" + idx).val(ceoNm);
}

function fn_selClientInfoForRegPay(trCd, trNm, baNb, depositor, jiro, ceoNm, regNb, idx){
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
    if(ceoNm == null || ceoNm == "" || ceoNm == "undefined"){
        ceoNm = "";
    }
    if(regNb == null || regNb == "" || regNb == "undefined"){
        regNb = "";
    }

    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#regNo" + idx).val(regNb);

    if($("#eviType" + idx).val() != "3") {
        $("#crmBnkNm" + idx).val(jiro);
        $("#crmAccNo" + idx).val(baNb);
        $("#crmAccHolder" + idx).val(depositor);
        $("#ceoNm" + idx).val(ceoNm);
    }

    regPay.fn_g20ClientCheck();

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

function fn_selCardCompanyInfo(trCd, trNm, idx){
    if(trNm == null || trNm == "" || trNm == "undefined"){
        trNm = "";
    }

    $("#card" + idx).val(trNm);
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
    if(regNo == null || regNo == "" || regNo == "undefined"){
        regNo = "";
    }

    $("#trCd" + idx).val(trCd);
    $("#crmNm" + idx).val(empNameKr);
    $("#crmBnkNm" + idx).val(bankName);
    $("#crmAccNo" + idx).val(accountNum);
    $("#crmAccHolder" + idx).val(accountHolder);
    $("#regNo" + idx).val(regNo);

    if(type != null && type != "" && type != "undefined"){
        if(type == "5"){
            $("#etc" + idx).val("사업소득자");
        } else if(type == "9"){
            $("#etc" + idx).val("기타소득자");
        }
    }


    var url = "/payApp/pop/setPayRequest.do?idx=" + idx + "&type=" + type + "&trCd=" + trCd + "&empNameKr=" + empNameKr + "&bankName=" + bankName + "&accountNum=" + accountNum + "&accountHolder=" + accountHolder + "&regNo=" + regNo;

    var name = "_blank";
    var option = "width = 800, height = 500, top = 100, left = 400, location = no"
    var popup = window.open(url, name, option);
}

function fn_selEtaxInfo(trCd, trNm, isuDt, trregNb, supAm, vatAm, sumAm, issNo, coCd, taxTy, idx, fileNo, baNb, bankNm, depositor, tradeDe){
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
    if(baNb == null || baNb == "" || baNb == "undefined"){
        baNb = "";
        // $("#crmNm" + idx).css("border", "1px solid red");
        // $("#regNo" + idx).css("border", "1px solid red");
    // } else {
    //     $("#crmNm" + idx).css("border", 0);
    //     $("#regNo" + idx).css("border", 0);
    }

    if(bankNm == null || bankNm == "" || bankNm == "undefined"){
        bankNm = "";
        // $("#crmNm" + idx).css("border", "1px solid red");
        // $("#regNo" + idx).css("border", "1px solid red");
    // }else {
    //     $("#crmNm" + idx).css("border", 0);
    //     $("#regNo" + idx).css("border", 0);
    }

    if(depositor == null || depositor == "" || depositor == "undefined"){
        depositor = "";
        // $("#crmNm" + idx).css("border", "1px solid red");
        // $("#regNo" + idx).css("border", "1px solid red");
    // } else {
    //     $("#crmNm" + idx).css("border", 0);
    //     $("#regNo" + idx).css("border", 0);
    }

    if(tradeDe != null && tradeDe != "" && tradeDe != "undefined"){
        $("#trDe" + idx).val(tradeDe);
    } else {
        $("#trDe" + idx).val(isuDt.substring(0, 4) + "-" + isuDt.substring(4, 6) + "-" + isuDt.substring(6, 8));
    }

    $("#regNo" + idx).val(trregNb);
    $("#crmNm" + idx).val(trNm);
    $("#trCd" + idx).val(trCd);
    $("#totCost" + idx).val(comma(sumAm.toString().split(".")[0]));
    $("#supCost" + idx).val(comma(supAm.toString().split(".")[0]));
    $("#vatCost" + idx).val(comma(vatAm.toString().split(".")[0]));
    $("#issNo" + idx).val(issNo);
    $("#coCd" + idx).val(coCd);
    $("#taxTy" + idx).val(taxTy);
    $("#fileNo" + idx).val(fileNo);
    $("#crmBnkNm" + idx).val(bankNm);
    $("#crmAccNo" + idx).val(baNb);
    $("#crmAccHolder" + idx).val(depositor);

    regPay.fn_changeAllCost();
    regPay.fn_g20ClientCheck();
}