var enaraSendList = {

    global: {
        dropDownDataSource: "",
        searchAjaxData : "",
        sendList : new Array(),
        formInput : "" +
            "<input name=\"C_DIKEYCODE\" id=\"C_DIKEYCODE\" value=\"\">" +
            "<input name=\"reqStatSn\" id=\"reqStatSn\" value=\"\">" +
            "<input name=\"payAppDetSn\" id=\"payAppDetSn\" value=\"\">" +
            "<input name=\"payAppSn\" id=\"payAppSn\" value=\"\">" +
            "<input name=\"BSNSYEAR\" id=\"BSNSYEAR\" value=\"\">" +
            "<input name=\"FILE_ID\" id=\"FILE_ID\" value=\"\">" +
            "<input name=\"DDTLBZ_ID\" id=\"DDTLBZ_ID\" value=\"\">" +
            "<input name=\"EXC_INSTT_ID\" id=\"EXC_INSTT_ID\" value=\"\">" +
            "<input name=\"PRUF_SE_NO\" id=\"PRUF_SE_NO\" value=\"\">" +
            "<input name=\"EXCUT_CNTC_ID\" id=\"EXCUT_CNTC_ID\" value=\"\">" +
            "<input name=\"BCNC_ACNUT_NO_ENARA\" id=\"BCNC_ACNUT_NO_ENARA\" value=\"\">" +
            "<input name=\"PJT_CD\" id=\"PJT_CD\" value=\"\">" +
            "<input name=\"APPLY_DIV\" id=\"APPLY_DIV\" value=\"\">" +
            "<input name=\"EXCUT_TY_SE_CODE\" id=\"EXCUT_TY_SE_CODE\" value=\"\">" +
            "<input name=\"BCNC_BANK_CODE\" id=\"BCNC_BANK_CODE\" value=\"\">" +
            "<input name=\"EXCUT_SPLPC\" id=\"EXCUT_SPLPC\" value=\"\">" +
            "<input name=\"EXCUT_VAT\" id=\"EXCUT_VAT\" value=\"\">" +
            "<input name=\"EXCUT_SUM_AMOUNT\" id=\"EXCUT_SUM_AMOUNT\" value=\"\">" +
            "<input name=\"PREPAR\" id=\"PREPAR\" value=\"\">" +
            "<input name=\"EXCUT_EXPITM_TAXITM_CNT\" id=\"EXCUT_EXPITM_TAXITM_CNT\" value=\"\">" +
            "<input name=\"ASSTN_TAXITM_CODE\" id=\"ASSTN_TAXITM_CODE\" value=\"\">" +
            "<input name=\"EXCUT_TAXITM_CNTC_ID\" id=\"EXCUT_TAXITM_CNTC_ID\" value=\"\">" +
            "<input name=\"ACNUT_OWNER_NM\" id=\"ACNUT_OWNER_NM\" value=\"\">" +
            "<input name=\"ETXBL_CONFM_NO\" id=\"ETXBL_CONFM_NO\" value=\"\">" +
            "<input name=\"LN_SQ\" id=\"LN_SQ\" value=\"\">" +
            "<input name=\"attachLnSeq\" id=\"attachLnSeq\" value=\"\">" +
            "<input name=\"CO_CD\" id=\"CO_CD\" value=\"\">" +
            "<input name=\"TRNSC_ID_TIME\" id=\"TRNSC_ID_TIME\" value=\"\">" +
            "<input name=\"TRNSC_ID\" id=\"TRNSC_ID\" value=\"\">" +
            "<input name=\"CNTC_CREAT_DT\" id=\"CNTC_CREAT_DT\" value=\"\">" +
            "<input name=\"TAXITM_FNRSC_CNT\" id=\"TAXITM_FNRSC_CNT\" value=\"\">" +
            "<input name=\"attachGisuSeq\" id=\"attachGisuSeq\" value=\"\">" +
            "<input name=\"MD_DT\" id=\"MD_DT\" value=\"\">" +
            "<input name=\"EXCUT_PRPOS_CN\" id=\"EXCUT_PRPOS_CN\" value=\"\">" +
            "<input name=\"PRDLST_NM\" id=\"PRDLST_NM\" value=\"\">" +
            "<input name=\"PRUF_SE_CODE\" id=\"PRUF_SE_CODE\" value=\"\">" +
            "<input name=\"EXCUT_REQUST_DE\" id=\"EXCUT_REQUST_DE\" value=\"\">" +
            "<input name=\"FNRSC_SE_CODE\" id=\"FNRSC_SE_CODE\" value=\"\">" +
            "<input name=\"BCNC_SE_CODE\" id=\"BCNC_SE_CODE\" value=\"\">" +
            "<input name=\"BCNC_CMPNY_NM\" id=\"BCNC_CMPNY_NM\" value=\"\">" +
            "<input name=\"BCNC_LSFT_NO\" id=\"BCNC_LSFT_NO\" value=\"\">" +
            "<input name=\"BCNC_RPRSNTV_NM\" id=\"BCNC_RPRSNTV_NM\" value=\"\">" +
            "<input name=\"BCNC_TELNO\" id=\"BCNC_TELNO\" value=\"\">" +
            "<input name=\"BCNC_BIZCND_NM\" id=\"BCNC_BIZCND_NM\" value=\"\">" +
            "<input name=\"BCNC_INDUTY_NM\" id=\"BCNC_INDUTY_NM\" value=\"\">" +
            "<input name=\"POST_CD\" id=\"POST_CD\" value=\"\">" +
            "<input name=\"BCNC_ADRES\" id=\"BCNC_ADRES\" value=\"\">" +
            "<input name=\"ADDR_D\" id=\"ADDR_D\" value=\"\">" +
            "<input name=\"BCNC_ACNUT_NO\" id=\"BCNC_ACNUT_NO\" value=\"\">" +
            "<input name=\"TRANSFR_ACNUT_SE_CODE\" id=\"TRANSFR_ACNUT_SE_CODE\" value=\"\">" +
            "<input name=\"SBSACNT_TRFRSN_CODE\" id=\"SBSACNT_TRFRSN_CODE\" value=\"\">" +
            "<input name=\"SBSACNT_TRFRSN_CN\" id=\"SBSACNT_TRFRSN_CN\" value=\"\">" +
            "<input name=\"SBSIDY_BNKB_INDICT_CN\" id=\"SBSIDY_BNKB_INDICT_CN\" value=\"\">" +
            "<input name=\"BCNC_BNKB_INDICT_CN\" id=\"BCNC_BNKB_INDICT_CN\" value=\"\">"
    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("EXCUT_REQUST_DE", "depth", "yyyy-MM-dd", new Date());
        $("#korNm, #gisuDt, #gisuSeq, #BG_SQ, #docNumber, #docTitle, #kukgoPjtNm, #divNm, #pjtNm, #abgtNm, #setFgNm, #vatFgNm, #unitAm, #ASSTN_TAXITM_CODE_NM, #EXCUT_PRPOS_CN, #PRDLST_NM, #SUM_AMOUNT, #SPLPC, #VAT, #BCNC_CMPNY_NM, #BCNC_LSFT_NO, #PIN_NO_1, #PIN_NO_2, #BCNC_RPRSNTV_NM, #BCNC_TELNO, #BCNC_BIZCND_NM, #BCNC_INDUTY_NM, #POST_CD, #BCNC_ADRES, #BCNC_BANK_CODE_NM, #BCNC_ACNUT_NO, #SBSACNT_TRFRSN_CN, #SBSIDY_BNKB_INDICT_CN, #BCNC_BNKB_INDICT_CN, #PROCESS_RESULT_MSSAGE, #PRUF_SE_NO_TXT").kendoTextBox();

        $("#EXCUT_TY_SE_CODE").val("20")

        $("#PRUF_SE_CODE").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: "0"},
                {text: "전자세금계산서", value: "001"},
                {text: "전자계산서", value: "002"},
                {text: "보조금전용카드", value: "004"},
                {text: "기타", value: "999"}
            ],
            index: 0,
            change : function(e){
                if(this.value() == "999" || this.value() == "0") {
                    $("#prufSeNoWrap").hide();
                    $("#cardBtn").hide();
                    $("#EXCUT_TY_SE_CODE").val("20");
                } else if(this.value() == "004"){
                    $("#prufSeNoWrap").show();
                    $("#cardBtn").show();
                    $("#EXCUT_TY_SE_CODE").val("22")
                } else {
                    $("#prufSeNoWrap").show();
                    $("#cardBtn").hide();
                    $("#EXCUT_TY_SE_CODE").val("20");
                }
            }
        });

        var ds = customKendo.fn_customAjax("/kukgoh/getCmmnCodeDetailList", {cmmnCode : '1089'});
        $("#TRANSFR_ACNUT_SE_CODE").kendoDropDownList({
            dataTextField: "CMMN_DETAIL_CODE_NM",
            dataValueField: "CMMN_DETAIL_CODE",
            dataSource: ds.list,
            index: 0,
            change: function(e){

                if($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "003" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() != "004") {
                    alert("증빙유형이 [보조금전용카드]인 경우 선택 가능합니다.");
                    $("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value("001");
                    return;
                }

                if($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "002"){
                    $("#SBSACNT_TRFRSN_CODE").data("kendoDropDownList").wrapper.show();
                    $("#SBSACNT_TRFRSN_CN").data("kendoTextBox").wrapper.show();
                } else {
                    $("#SBSACNT_TRFRSN_CODE").data("kendoDropDownList").wrapper.hide();
                    $("#SBSACNT_TRFRSN_CN").data("kendoTextBox").wrapper.hide();
                }
            }
        });

        var ds2 = customKendo.fn_customAjax("/kukgoh/getCmmnCodeDetailList", {cmmnCode : '0665'});
        $("#SBSACNT_TRFRSN_CODE").kendoDropDownList({
            dataTextField: "CMMN_DETAIL_CODE_NM",
            dataValueField: "CMMN_DETAIL_CODE",
            dataSource: ds2.list,
            index: 0
        });

        $("#SBSACNT_TRFRSN_CODE").data("kendoDropDownList").wrapper.hide();
        $("#SBSACNT_TRFRSN_CN").data("kendoTextBox").wrapper.hide();

        $("#BCNC_SE_CODE").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "법인사업자", value: "001"},
                {text: "개인사업자", value: "002"},
                {text: "개인", value: "003"},
                {text: "해외", value: "004"},
            ],
            index: 0,
        })

        var ds3 = customKendo.fn_customAjax("/kukgoh/getCmmnCodeDetailList", {cmmnCode : '1220'});
        $("#FNRSC_SE_CODE").kendoDropDownList({
            dataTextField: "CMMN_DETAIL_CODE_NM",
            dataValueField: "CMMN_DETAIL_CODE",
            dataSource: ds3.list,
            index: 0
        });
    },

    fn_enaraSendList : function(){
        if($("input[name='payAppDetChk']:checked").length == 0){
            alert("전송할 항목을 선택해주세요.");
            return;
        }

        if(!enaraSendList.validationChk()) return;

        if(confirm("전송하시겠습니까?")){
            $("#my-spinner").show();

            for(var i = 0; i < enaraSendList.global.sendList.length; i++){
                enaraSendList.setInputData(enaraSendList.global.sendList[i]);

                var formData = new FormData(document.querySelector('#sendForm'));
                $.ajax({
                    url: '/kukgoh/sendEnara',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend : function(request){
                        $("#doneCnt").text(i)
                        $("#totalCnt").text($("input[name='payAppDetChk']:checked").length);
                    },
                    success: function(result){
                        if(result.code == 200){
                            $("#doneCnt").text(Number($("#doneCnt").text()) + 1)
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error(textStatus, errorThrown);
                    }
                });
            }

            setInterval(function() {
                if(Number($("#doneCnt").text()) == enaraSendList.global.sendList.length){
                    alert("전송되었습니다.");
                    $("#my-spinner").hide();
                    $("#spinnerContent #doneCnt").text("");
                    $("#spinnerContent #totalCnt").text("");
                    enaralink.mainGrid()

                }
            }, 1000);
        }
    },

    validationChk : function(){
        var formData = new FormData();
        var payAppDetSnArr = "";
        var alertTxt = ""
        var flag = true;

        $.each($("input[name='payAppDetChk']:checked"), function(){
            var dataItem = $("#sendResolutionGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            if((dataItem.RSP_CD == "SUCC" && dataItem.PROCESS_RESULT_CODE == "000") || (dataItem.REQ_STAT_SN != null && dataItem.RSP_CD == null)){
                alertTxt = "전송완료된 항목은 전송할 수 없습니다.";
                flag = false;
            }else{
                payAppDetSnArr += "," + dataItem.PAY_APP_DET_SN
            }

            if(!flag){
                alert(alertTxt);
                return flag;
            }
        })

        if(!flag){
            return flag;
        }

        $.ajax({
            url: "/kukgoh/getExecutionInfoList",
            data: {
                payAppDetSnArr : payAppDetSnArr.substr(1)
            },
            type: "post",
            async : false,
            dataType: "json",
            success: function (rs) {
                enaralink.global.sendList = new Array();
                for(var i = 0; i < rs.rs.length; i++){
                    enaraSendList.setInputData(rs.rs[i]);

                    if($("#kukgoPjtNm").val() == ""){
                        alertTxt = "E나라도움 사업명이 입력되지 않았습니다.";
                        flag = false;
                    }

                    if($("#ASSTN_TAXITM_CODE_NM").val() == ""){
                        alertTxt = "보조세목이 입력되지 않았습니다.";
                        flag = false;
                    }

                    if($("#PRUF_SE_CODE").data("kendoDropDownList").value() == "0") {
                        alertTxt = "증빙유형이 선택되지 않았습니다.";
                        flag = false;
                    }

                    if($("#BCNC_BANK_CODE").val() == ""){
                        alertTxt = "은행을 선택해주세요.";
                        flag = false;
                    }

                    if($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "002" && $("#SBSACNT_TRFRSN_CODE").data("kendoDropDownList").value() == "099" && $("#SBSACNT_TRFRSN_CN").val() == ""){
                        alertTxt = "이체 사유를 입력해주세요.";
                        flag = false;
                    }

                    if(($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "003" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() != "004")
                        || ($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "001" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() == "004" )) {
                        alertTxt = "증빙유형과 이체구분을 다시 확인해주세요.";
                        flag = false;
                    }

                    if(($("#BCNC_SE_CODE").data("kendoDropDownList").value() == "001" || $("#BCNC_SE_CODE").data("kendoDropDownList").value() == "002") && $("#BCNC_LSFT_NO").val().length != "10") {
                        alertTxt = "사업자(주민)등록번호를 다시 확인해주세요.(10자리)";
                        flag = false;
                    } else if($("#BCNC_SE_CODE").data("kendoDropDownList").value() == "003" && $("#BCNC_LSFT_NO").val().length != "13") {
                        alertTxt = "사업자(주민)등록번호를 다시 확인해주세요.(13자리)";
                        flag = false;
                    }

                    if($("#BCNC_CMPNY_NM").val() == "") {
                        alertTxt = "거래처명이 입력되지 않았습니다.";
                        flag = false;
                    }

                    if($("#BCNC_ACNUT_NO").val() == "") {
                        alertTxt = "계좌번호가 입력되지 않았습니다.";
                        flag = false;
                    }

                    if($("#PRUF_SE_CODE").data("kendoDropDownList").value() != "999" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() != "0") {
                        if($("#PRUF_SE_NO").val() == ""){
                            alertTxt = "증빙구분번호가 입력되지 않았습니다."
                            flag = false;
                        }
                    }

                    if(!flag){
                        alert(alertTxt);
                        return flag;
                    }

                    enaraSendList.global.sendList.push(rs.rs[i]);
                }

                if(!flag){
                    return flag;
                }
            }
        })

        return flag;
    },

    setInputData : function(rs){
        $("#sendForm *").remove();
        $("#sendForm").append(enaraSendList.global.formInput);
        enaraSendList.fn_defaultScript();

        var pad = rs.payAppData;
        var pi = rs.projectInfo;
        var ebd = rs.enaraBgtData;
        var eed = rs.enaraExcData;
        var cd = rs.crmData;
        var ebi = rs.enaraBankInfo;
        var fl = rs.fileList;

        var esd = rs.enaraSendData;
        var ered = rs.excutReqErpData;
        var eeied = rs.excutExpItmErpData;
        var efed = rs.excutFnrscErpData;
        var erpSend = rs.erpSendData;
        var enaraTemp = rs.enaraTempData;

        $("#payAppDetSn").val(rs.payAppDetSn);
        if(esd != null && esd != undefined){
            $("#reqStatSn").val(esd.REQ_STAT_SN);
        }

        if(fl.length > 0) {
            let text = fl[0].file_org_name;

            if(fl.length > 1) {
                text += "외 " + (fl.length - 1) + "개"
            }
            $("#fileList").text(text);
        }

        $("#EXCUT_PRPOS_CN").val(ered != null ? ered.EXCUT_PRPOS_CN : pad.APP_TITLE)
        $("#PRDLST_NM").val(eeied != null ? eeied.PRDLST_NM : pad.CRM_NM);
        $("#payAppSn").val(pad.PAY_APP_SN);
        $("#korNm").val(pad.EMP_NAME);
        $("#empSeq").val(pad.REG_EMP_SEQ);

        $("#gisuDt").val(pad.APP_DE);
        $("#docNumber").val(pad.DOC_NO);
        $("#docTitle").val(pad.ACC_NM);

        $("#kukgoPjtNm").val(pi.DDTLBZ_NM);
        $("#pjtNm").val(pi.PJT_NM);

        $("#abgtNm").val(pad.BGT_NM);

        if(pad.EVID_TYPE == "1"){
            $("#setFgNm").val("세금계산서");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(1);
        } else if(pad.EVID_TYPE == "2"){
            $("#setFgNm").val("계산서");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(2);
        } else if(pad.EVID_TYPE == "3"){
            $("#setFgNm").val("신용카드");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
        } else if(pad.EVID_TYPE == "4"){
            $("#setFgNm").val("직원지급");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
        } else if(pad.EVID_TYPE == "5"){
            $("#setFgNm").val("사업소득자");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
        } else if(pad.EVID_TYPE == "6"){
            $("#setFgNm").val("기타");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
        } else if(pad.EVID_TYPE == "9"){
            $("#setFgNm").val("기타소득자");
            $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
        }

        if(ered != null){
            $("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value(ered.TRANSFR_ACNUT_SE_CODE);
            $("#PRUF_SE_CODE").data("kendoDropDownList").value(ered.PRUF_SE_CODE);
            $("#PRUF_SE_NO").val(ered.PRUF_SE_NO);
            $("#PRUF_SE_NO_TXT").val(ered.PRUF_SE_NO);
        }

        $("#vatFgNm").val();
        var taxGubun = (pi.TAX_GUBUN || "");

        if(taxGubun == 1){
            $("#vatFgNm").val("과세");
        } else if(taxGubun == 2){
            $("#vatFgNm").val("면세");
        } else if(taxGubun == 3){
            $("#vatFgNm").val("비과세");
        }

        if(ebd != null){
            $("#ASSTN_TAXITM_CODE_NM").val((ebd.ASSTN_TAXITM_NM || ""))
            $("#FILE_ID").val((ebd.FILE_ID || ""));
            $("#ASSTN_TAXITM_CODE").val(ebd.ASSTN_EXPITM_TAXITM_CODE) // IF-CMM-EFS-0062 인터페이스의 보조비목세목코드
        }

        $("#BCNC_BANK_CODE").val((ered != null ? ered.BCNC_BANK_CODE : (ebi != null ? ebi.CMMN_DETAIL_CODE : "")));
        $("#unitAm").val(comma(pad.TOT_COST));
        $("#BSNSYEAR").val((pi.BSNSYEAR || ""));
        $("#DDTLBZ_ID").val((pi.DDTLBZ_ID || ""));
        $("#EXC_INSTT_ID").val((eed.EXC_INSTT_ID || ""));
        $("#EXCUT_SPLPC").val(pad.SUP_COST);
        $("#EXCUT_VAT").val(pad.VAT_COST);
        $("#EXCUT_SUM_AMOUNT").val(pad.TOT_COST);
        $("#INTRFC_ID").val("IF-EXE-EFR-0074");
        $("#PJT_CD").val(pi.PJT_CD);
        $("#PREPAR").val("") // 예비
        $("#EXCUT_EXPITM_TAXITM_CNT").val(1) // 집행연계ID별 비목세목 건수
        $("#EXCUT_TAXITM_CNTC_ID").val("") //EXCUT_TAXITM_CNTC_ID 집행비목세목연계ID
        // $("#FNRSC_SE_CODE").val("001")// 재원구분코드
        $("#ACNUT_OWNER_NM").val("");
        $("#ETXBL_CONFM_NO").val("") // 전자세금계산서 승인번호
        $("#TAXITM_FNRSC_CNT").val("") // 집행연계ID별 비목세목별 재원건수

        $("#SUM_AMOUNT").val(comma(pad.TOT_COST));
        $("#SPLPC").val(comma(pad.SUP_COST));
        $("#VAT").val(comma(pad.VAT_COST));
        $("#CO_CD").val(1212);

        $("#EXCUT_REQUST_DE").val(ered != null ? (ered.EXCUT_REQUST_DE.toString().substring(0, 4) + "-" + ered.EXCUT_REQUST_DE.toString().substring(4, 6) + "-" + ered.EXCUT_REQUST_DE.toString().substring(6)) : pad.TR_DE)
        if(cd != null){
            $("#BCNC_CMPNY_NM").val(cd.TR_NM);
            $("#BCNC_LSFT_NO").val(ered != null ? ered.BCNC_LSFT_NO : cd.REG_NB);
            $("#BCNC_RPRSNTV_NM").val(ered != null ? ered.BCNC_RPRSNTV_NM : cd.CEO_NM);
            $("#BCNC_TELNO").val(ered != null ? ered.BCNC_TELNO : cd.TEL);
            $("#BCNC_BIZCND_NM").val(ered != null ? ered.BCNC_BIZCND_NM : cd.BUSINESS);
            $("#BCNC_INDUTY_NM").val(ered != null ? ered.BCNC_INDUTY_NM : cd.JONGMOK);
            $("#POST_CD").val(cd.ZIP);
            $("#BCNC_ADRES").val(ered != null ? ered.BCNC_ADRES : cd.DIV_ADDR1);
            $("#tmpBankNm").val(cd.JIRO_NM);
            $("#BCNC_BANK_CODE_NM").val(ered != null ? ered.BCNC_BANK_CODE_NM : (ebi != null ? ebi.CMMN_DETAIL_CODE_NM : cd.JIRO_NM));
            $("#BCNC_ACNUT_NO").val(ered != null ? ered.BCNC_ACNUT_NO : cd.BA_NB);
        } else {
            $("#BCNC_CMPNY_NM").val(pad.CRM_NM);
        }

        if(pad.EVID_TYPE == "1" || pad.EVID_TYPE == "2"){
            $("#PRUF_SE_NO").val(pad.ISS_NO || "");
        }

        if(efed != null && efed != undefined){
            $("#FNRSC_SE_CODE").data("kendoDropDownList").value(efed.FNRSC_SE_CODE);
        }

        if(erpSend != null && erpSend != undefined){
            if(erpSend.RSP_CD == "SUCC") {
                $("#PROCESS_RESULT_MSSAGE").val(erpSend.PROCESS_RESULT_MSSAGE);
            } else {
                $("#PROCESS_RESULT_MSSAGE").val(erpSend.RSP_MSG);
            }

            if(erpSend.RSP_CD == "SUCC" && (erpSend.PROCESS_RESULT_CODE == "000" || erpSend.PROCESS_RESULT_CODE == null)) {
                $("#sendBtn").hide();
            }
        }

        if(enaraTemp != null) {
            $("#sendBtn").hide();
        }

        $("#PRUF_SE_CODE").data("kendoDropDownList").trigger("change");
        // $("#my-spinner").hide();
    }
}