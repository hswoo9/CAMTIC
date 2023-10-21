var regPay = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "budgetNm", "appTitle", "accNm", "accNo", "bnkNm"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        regPay.global.radioGroupData = [
            { label: "지급신청서", value: "1" },
            { label: "여입신청서", value: "2" },
            { label: "반납신청서", value: "3" },
            { label: "대체신청서", value: "4" }
        ]
        customKendo.fn_radioGroup("payAppType", regPay.global.radioGroupData, "horizontal");

        regPay.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]
        customKendo.fn_radioGroup("payAppStat", regPay.global.radioGroupData, "horizontal");

        $("#payAppType").data("kendoRadioGroup").value(1);
        $("#payAppStat").data("kendoRadioGroup").value("N")



        if($("#payAppSn").val() != ""){
            regPay.setData();
        }

    },

    setData : function (){
        var data = {
            payAppSn : $("#payAppSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;

        console.log(rs);

        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)
        $("#appDe").val(rs.APP_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        $("#budgetNm").val(rs.BUDGET_NM)
        $("#budgetSn").val(rs.BUDGET_SN)
        $("#appTitle").val(rs.APP_TITLE)
        $("#appCont").val(rs.APP_CONT)

        $("#bnkSn").val(rs.BNK_SN)
        $("#bnkNm").val(rs.BNK_NM)
        $("#accNm").val(rs.ACC_NM)
        $("#accNo").val(rs.ACC_NO)
        $("#payAppStat").data("kendoRadioGroup").value(rs.PAY_APP_STAT)


        $("#apprBtn").css("display", "");
    },

    fn_save : function (){
        var parameters = {
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            appDe : $("#appDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
            appTitle : $("#appTitle").val(),
            appCont : $("#appCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),
            payAppStat : $("#payAppStat").data("kendoRadioGroup").value(),

            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#payAppSn").val() != ""){
            parameters.payAppSn = $("#payAppSn").val();
        }

        console.log(parameters);

        $.ajax({
            url : "/payApp/payAppSetData",
            data :parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    location.href="/payApp/pop/regPayAppPop.do?payAppSn=" + rs.params.payAppSn;
                }
            }
        });
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regPay.global.crmSnId = crmSnId;
        regPay.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regPay.global.crmSnId).val($("#crmSn").val())
        $("#" + regPay.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    inputNumberFormat : function (obj){
        obj.value = regPay.comma(regPay.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (){

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }


        var url = "/mng/pop/budgetView.do?pjtSn=" + $("#pjtSn").val();

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
}


var regPayDet = {

    fn_defaultScript : function (){
        $("#eviType0").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "세금계산서", value: "1" },
                { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                { text: "직원지급", value: "4" },
                { text: "소득신고자", value: "5" },
                { text: "기타", value: "6" },
            ],
            index: 0
        });

        customKendo.fn_textBox(["crmNm0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
                                ,"card0", "etc0", "iss0"]);

        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

    }
}

function fn_selBudgetInfo(bgtNm, bgtCd){
    $("#budgetSn").val(bgtCd);
    $("#budgetNm").val(bgtNm);


}

function fn_selBankInfo(trCd, trNm, baNb, depositor, jiroNm){
    $("#bnkSn").val(trCd);
    $("#accNm").val(trNm);
    $("#accNo").val(baNb);
    $("#bnkNm").val(jiroNm);
}