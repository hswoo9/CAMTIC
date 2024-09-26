var newResolutionSubmitPage = {

    global: {
        searchAjaxData : "",
        fileArray: [],
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
                    $("#EXCUT_TY_SE_CODE").val("22");
                    $("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").select(2);
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
        console.log(ds2);
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
            // change : function (e){
            //     if($("#BCNC_SE_CODE").data("kendoDropDownList").value() == "003"){
            //         $("#etcValue").css("display", "none");
            //         $("#etcValue2").css("display", "");
            //     } else {
            //         $("#etcValue").css("display", "");
            //         $("#etcValue2").css("display", "none");
            //     }
            // }
        })

        var ds3 = customKendo.fn_customAjax("/kukgoh/getCmmnCodeDetailList", {cmmnCode : '1220'});
        $("#FNRSC_SE_CODE").kendoDropDownList({
            dataTextField: "CMMN_DETAIL_CODE_NM",
            dataValueField: "CMMN_DETAIL_CODE",
            dataSource: ds3.list,
            index: 0
        });


        newResolutionSubmitPage.fn_setData();

    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#post").val(data.zonecode);
                    $("#POST_CD").val(data.zonecode);
                    $("#BCNC_ADRES").val(roadAddr);
                    $("#ADDR_D").val(roadAddr);

                    $("#addrDetail").focus();
                }
            }).open();
        });
    },

    fn_backClick : function() {
        var url = "/mng/bankCodeViewPop.do?bankNm=" + $("#tmpBankNm").val();
        var name = "bankCodeViewPop";
        var option = "width=520, height=620, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },


    fn_setData: function(){
        var data = {
            payAppDetSn : $("#payAppDetSn").val()
        };

        $.ajax({
            url : "/kukgoh/getExecutionInfo",
            data : data,
            type : "post",
            dataType : "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success : function(rs){
                var rs = rs.rs;
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
                if(esd != null && esd != undefined){
                    $("#reqStatSn").val(esd.REQ_STAT_SN);
                }

                console.log(rs);

                if(fl.length > 0) {
                    newResolutionSubmitPage.global.fileArray = fl;
                    let text = fl[0].file_org_name + "." + fl[0].file_ext;

                    if(fl.length > 1) {
                        text += "외 " + (fl.length - 1) + "개"
                    }
                    $("#fileList").text(text);
                }

                $("#EXCUT_PRPOS_CN").val(ered != null ? ered.EXCUT_PRPOS_CN : pad.APP_TITLE)
                $("#PRDLST_NM").val(eeied != null ? eeied.PRDLST_NM : pad.APP_TITLE);
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
                    if(pad.CARD_TYPE == "1") {
                        $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
                    } else {
                        $("#PRUF_SE_CODE").data("kendoDropDownList").select(3);
                        $("#PRUF_SE_NO_TXT").val(pad.PUCHAS_TKBAK_NO != null ? pad.PUCHAS_TKBAK_NO : "");
                        $("#PRUF_SE_NO").val(pad.PUCHAS_TKBAK_NO != null ? pad.PUCHAS_TKBAK_NO : "");
                    }
                } else if(pad.EVID_TYPE == "4"){
                    $("#setFgNm").val("직원지급");
                    $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
                    $("#BCNC_SE_CODE").data("kendoDropDownList").select(2);
                } else if(pad.EVID_TYPE == "5"){
                    $("#setFgNm").val("사업소득자");
                    $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
                    $("#BCNC_SE_CODE").data("kendoDropDownList").select(2);
                } else if(pad.EVID_TYPE == "6"){
                    $("#setFgNm").val("기타");
                    $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
                } else if(pad.EVID_TYPE == "9"){
                    $("#setFgNm").val("기타소득자");
                    $("#PRUF_SE_CODE").data("kendoDropDownList").select(4);
                    $("#BCNC_SE_CODE").data("kendoDropDownList").select(2);
                }

                if(ered != null){
                    $("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value(ered.TRANSFR_ACNUT_SE_CODE);
                    $("#PRUF_SE_CODE").data("kendoDropDownList").value(ered.PRUF_SE_CODE);
                    $("#PRUF_SE_NO").val(ered.PRUF_SE_NO);
                    $("#PRUF_SE_NO_TXT").val(ered.PRUF_SE_NO);
                    $("#BCNC_SE_CODE").data("kendoDropDownList").value(ered.BCNC_SE_CODE);
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

                $("#EXCUT_REQUST_DE").val(ered != null ? (ered.EXCUT_REQUST_DE.toString().substring(0, 4) + "-" + ered.EXCUT_REQUST_DE.toString().substring(4, 6) + "-" + ered.EXCUT_REQUST_DE.toString().substring(6)) : pad.TR_DE);

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
                    $("#BCNC_ACNUT_NO").val(ered != null ? ered.BCNC_ACNUT_NO.replaceAll("-","") : cd.BA_NB.replaceAll("-",""));
                } else {
                    $("#BCNC_CMPNY_NM").val(pad.CRM_NM);
                    $("#BCNC_LSFT_NO").val(ered != null ? ered.BCNC_LSFT_NO : pad.REG_NO.replaceAll("-",""));
                    $("#tmpBankNm").val(pad.CRM_BNK_NM);
                    $("#BCNC_BANK_CODE_NM").val(ered != null ? ered.BCNC_BANK_CODE_NM : (ebi != null ? ebi.CMMN_DETAIL_CODE_NM : pad.CRM_BNK_NM));
                    $("#BCNC_ACNUT_NO").val(ered != null ? ered.BCNC_ACNUT_NO.replaceAll("-","") : pad.CRM_ACC_NO.replaceAll("-",""));
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

                if(pad.ENARA_MNG_STAT == "Y") {
                    $("#sendBtn").hide();
                }

                // $("#SBSIDY_BNKB_INDICT_CN").val(eeied != null ? eeied.SBSIDY_BNKB_INDICT_CN : "캠틱종합기술원");
                // $("#BCNC_BNKB_INDICT_CN").val(eeied != null ? eeied.BCNC_BNKB_INDICT_CN : pad.CRM_NM);

                $("#PRUF_SE_CODE").data("kendoDropDownList").trigger("change");
                $("#my-spinner").hide();
            }
        });
    },

    fn_send: function(){

        if($("#kukgoPjtNm").val() == ""){
            alert("E나라도움 사업명이 입력되지 않았습니다.");
            return;
        }

        if($("#ASSTN_TAXITM_CODE_NM").val() == ""){
            alert("보조세목이 입력되지 않았습니다.");
            return;
        }

        if($("#PRUF_SE_CODE").data("kendoDropDownList").value() == "0") {
            alert("증빙유형이 선택되지 않았습니다.");
            return;
        }

        if($("#BCNC_BANK_CODE").val() == ""){
            alert("은행을 선택해주세요.");
            return;
        }

        if($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "002" && $("#SBSACNT_TRFRSN_CODE").data("kendoDropDownList").value() == "099" && $("#SBSACNT_TRFRSN_CN").val() == ""){
            alert("이체 사유를 입력해주세요.");
            return;
        }

        if(($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "003" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() != "004")
        || ($("#TRANSFR_ACNUT_SE_CODE").data("kendoDropDownList").value() == "001" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() == "004" )) {
            alert("증빙유형과 이체구분을 다시 확인해주세요.");
            return;
        }

        if(($("#BCNC_SE_CODE").data("kendoDropDownList").value() == "001" || $("#BCNC_SE_CODE").data("kendoDropDownList").value() == "002") && $("#BCNC_LSFT_NO").val().length != "10") {
            alert("사업자(주민)등록번호를 다시 확인해주세요.(10자리)");
            return;
        } else if($("#BCNC_SE_CODE").data("kendoDropDownList").value() == "003" && $("#BCNC_LSFT_NO").val().length != "13") {
            alert("사업자(주민)등록번호를 다시 확인해주세요.(13자리)");
            return;
        }

        if($("#BCNC_CMPNY_NM").val() == "") {
            alert("거래처명이 입력되지 않았습니다.");
            return;
        }

        if($("#BCNC_ACNUT_NO").val() == "") {
            alert("계좌번호가 입력되지 않았습니다.");
            return;
        }

        if($("#SBSIDY_BNKB_INDICT_CN").val().length > 5) {
            alert("내통장표시 항목은 5자리까지 입력 가능합니다.");
            return;
        }

        if($("#BCNC_BNKB_INDICT_CN").val().length > 5) {
            alert("내통장표시 항목은 5자리까지 입력 가능합니다.");
            return;
        }

        if($("#PRUF_SE_CODE").data("kendoDropDownList").value() != "999" && $("#PRUF_SE_CODE").data("kendoDropDownList").value() != "0") {
            if($("#PRUF_SE_NO").val() == ""){
                alert("증빙구분번호가 입력되지 않았습니다.");
                return;
            }
        }

        var formData = new FormData(document.querySelector('#sendForm'));

        $.ajax({
            url: '/kukgoh/sendEnara',
            type: 'POST',
            data: formData,
            // async: false,
            processData: false,  // important
            contentType: false,  // important
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success: function(result){
                console.log(result);
                if(result.code == 200){
                    alert("전송이 완료되었습니다.");
                    $("#my-spinner").hide();
                    window.location.reload();

                    // $.ajax({
                    //     url: '/kukgoh/test',
                    //     type: 'POST',
                    //     data: result.rs,
                    //     dataType : "json",
                    //     success: function(result){
                    //         console.log(result);
                    //         $("#my-spinner").hide();
                    //     },
                    //     error: function(jqXHR, textStatus, errorThrown) {
                    //         console.error(textStatus, errorThrown);
                    //     }
                    // });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
            }
        });
    },

    fn_cardPuchasRecptnPop : function(){
        var url = "/mng/cardPurchaseReceptionPop.do";
        var name = "_blank";
        var option = "width=1200, height=640, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    fn_test : function(){
        var data = {

        }

    },

    fn_regPayAttPop : function (){
        var url = "/payApp/pop/regPayAttPop.do?type=enara";
        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    }


}