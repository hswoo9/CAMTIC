var newResolutionSubmitPage = {

    global: {
        searchAjaxData : ""
    },

    fn_defaultScript: function () {
        customKendo.fn_datePicker("EXCUT_REQUST_DE", "depth", "yyyy-MM-dd", new Date());
        $("#korNm, #gisuDt, #gisuSeq, #BG_SQ, #docNumber, #docTitle, #kukgoPjtNm, #divNm, #pjtNm, #abgtNm, #setFgNm, #vatFgNm, #unitAm, #ASSTN_TAXITM_CODE_NM, #EXCUT_PRPOS_CN, #PRDLST_NM, #PRUF_SE_NO, #SUM_AMOUNT, #SPLPC, #VAT, #BCNC_SE_CODE, #BCNC_CMPNY_NM, #BCNC_LSFT_NO, #PIN_NO_1, #PIN_NO_2, #BCNC_RPRSNTV_NM, #BCNC_TELNO, #BCNC_BIZCND_NM, #BCNC_INDUTY_NM, #POST_CD, #BCNC_ADRES, #BCNC_BANK_CODE_NM, #BCNC_ACNUT_NO, #TRANSFR_ACNUT_SE_CODE, #SBSACNT_TRFRSN_CODE, #SBSACNT_TRFRSN_CN, #SBSIDY_BNKB_INDICT_CN, #BCNC_BNKB_INDICT_CN, #PROCESS_RESULT_MSSAGE").kendoTextBox();

        $("#PRUF_SE_CODE").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: "0"},
                {text: "전자세금계산서", value: "1"},
                {text: "전자계산서", value: "2"},
                {text: "보조금전용카드", value: "3"},
                {text: "기타", value: ""}
            ],
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
        var url = "/mng/bankCodeViewPop.do";
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
            success : function(rs){
                var rs = rs.rs;
                var pad = rs.payAppData;
                var pi = rs.projectInfo;
                console.log(rs);
                $("#korNm").val(pad.EMP_NAME);
                $("#empSeq").val(pad.REG_EMP_SEQ);

                $("#gisuDt").val(pad.APP_DE);
                $("#docNumber").val(pad.DOC_NO);
                $("#docTitle").val(pad.ACC_NM);

                $("#kukgoPjtNm").val(pi.DDTLBZ_NM);
                $("#pjtNm").val(pi.PJT_NM);

                $("#abgtNm").val(pad.BUDGET_NM);

                if(pad.EVID_TYPE == "1"){
                    $("#setFgNm").val("세금계산서");
                } else if(pad.EVID_TYPE == "2"){
                    $("#setFgNm").val("계산서");
                } else if(pad.EVID_TYPE == "3"){
                    $("#setFgNm").val("신용카드");
                } else if(pad.EVID_TYPE == "4"){
                    $("#setFgNm").val("직원지급");
                } else if(pad.EVID_TYPE == "5"){
                    $("#setFgNm").val("사업소득자");
                } else if(pad.EVID_TYPE == "6"){
                    $("#setFgNm").val("기타");
                } else if(pad.EVID_TYPE == "9"){
                    $("#setFgNm").val("기타소득자");
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

                $("#unitAm").val(comma(pad.BUDGET_AMT));

            }
        });
    }






}