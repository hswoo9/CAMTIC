var regIncpRe = {

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

    fn_defaultScript : function () {
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "accNm", "accNo", "bnkNm", "budgetNm", "exnpEmpNm", "exnpDeptNm"
            , "pjtNm2", "inDt", "totAmt"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        regIncpRe.global.radioGroupData = [
            {label: "없음", value: "N"},
            {label: "의무경비", value: "A"},
            {label: "고정경비", value: "B"},
            {label: "업무추진비", value: "C"}
        ]
        // customKendo.fn_radioGroup("payAppStat", regIncpRe.global.radioGroupData, "horizontal");

        $("#busnCd, #busnExCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "1000", value: "1000"},
                {text: "2000", value: "2000"},
                {text: "3000", value: "3000"},
                {text: "4000", value: "4000"},
                {text: "5000", value: "5000"},
                {text: "6000", value: "6000"},
                {text: "7000", value: "7000"},
            ]
        });

        $("#g20DeptCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "부서선택", value: ""},
                {text: "1000 - 임원 (임원)", value: "1000"},
                {text: "2000 - 목적사업 (목적사업)", value: "2000"},
                {text: "3000 - 연구개발 (연구개발)", value: "3000"},
                {text: "4000 - 개발사업 (개발사업)", value: "4000"},
                {text: "5000 - 운영사업 (운영사업)", value: "5000"},
                {text: "6000 - 경비실 (경비실)", value: "6000"},
                {text: "7000 - 특수사업 (특수사업)", value: "7000"},
            ]
        });

        // $("#payAppStat").data("kendoRadioGroup").value("N")

        if($("#payIncpReSn").val() != ""){
            regIncpRe.setData();

        }else if($("#payIncpSn").val() != ""){
            regIncpRe.setData2();

            regIncpRe.fn_viewStat();
        }else{
            regIncmDet.global.itemIndex += 1;
        }

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        })
    },

    payAppBtnSet: function (data){
        let buttonHtml = "";
        if($("#type").val() != "new"){
            if(data.RE_STAT == "N"){
                // buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncpRe.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncpRe.fn_reApprove()">반제결의서 승인</button>';
            } else {
                buttonHtml += '<button type="button" id="cancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regIncpRe.fn_regExnpCancel('+data.PAY_INCP_SN+')">반제결의서 승인 취소</button>';
            }
        } else {
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncpRe.fn_save()">저장</button>';
        }


        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);
    },

    fn_reApprove : function (){
        var parameters = {
            payIncpSn : $("#payIncpSn").val(),
            payIncpReSn : $("#payIncpReSn").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#regEmpSeq").val()
        }

        if(!confirm("승인하시겠습니까?")){
            return ;
        }

        const result = customKendo.fn_customAjax("/pay/resolutionIncpAppr", parameters);
        if(result.flag){
            if(result.code == 200){
                alert("승인이 완료되었습니다.");

                window.close();
            }else{
                alert("ERP 연동 중 오류가 발생하였습니다.");
            }
        }
    },

    fn_save : function(){
        var data = {
            payIncpSn : $("#payIncpSn").val(),
            reAppDe : $("#appDe").val(),
            inDt : $("#inDt").val(),
            totAmt : regIncpRe.uncomma($("#totAmt").val() == "" ? 0 : $("#totAmt").val()),
            supAmt : regIncpRe.uncomma($("#supAmt").val() == "" ? 0 : $("#supAmt").val()),
            vatAmt : regIncpRe.uncomma($("#vatAmt").val() == "" ? 0 : $("#vatAmt").val()),
        }

        if(data.totAmt > (Number($("#incpTotAmt").val()) - Number($("#redyAmt").val()))) {
            alert("입금 잔액을 초과하였습니다.");
            return;
        }

        if($("#payIncpReSn").val() != ""){
            data.payIncpReSn = $("#payIncpReSn").val();
        }

        $.ajax({
            url : "/pay/setIncpRe",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    location.href="/payApp/pop/regIncpRePop.do?payIncpSn=" + data.payIncpSn + "&payIncpReSn=" + rs.rs.payIncpReSn;
                }
            }
        })

    },

    setData : function (){
        console.log("setData");
        var data = {
            payIncpSn : $("#payIncpSn").val(),
            payIncpReSn : $("#payIncpReSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpReData", data);
        var tmpRs = result.map;
        var ls = result.list;
        var rs = result.data;

        $("#inDt").val(ls[0].TR_DE);

        var incpTotAmt = 0;
        for(var i = 0 ; i < ls.length ; i++){
            incpTotAmt += Number(ls[i].TOT_COST);
        }

        regIncpRe.payAppBtnSet(rs);
        console.log(tmpRs);

        $("#redyAmt").val(tmpRs.TOT_COST - rs.TOT_COST);
        $("#incpTotAmt").val(incpTotAmt);
        $("#appDe").val(rs.RE_APP_DE);
        $("#pjtNm").val(rs.PJT_NM ? rs.PJT_NM : tmpRs.PJT_NM);
        $("#pjtNm2").val(rs.PJT_NM ? rs.PJT_NM : tmpRs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN ? rs.PJT_SN : tmpRs.PJT_SN);
        $("#pjtCd").val(rs.PJT_CD ? rs.PJT_CD : tmpRs.PJT_CD);
        $("#budgetNm").val(rs.BUDGET_NM ? rs.BUDGET_NM : tmpRs.BUDGET_NM);
        $("#budgetSn").val(rs.BUDGET_SN ? rs.BUDGET_SN : tmpRs.BUDGET_SN);
        $("#appCont").val(rs.APP_CONT ? rs.APP_CONT : tmpRs.APP_CONT);
        $("#busnCd").data("kendoDropDownList").value(rs.BUSN_CD ? rs.BUSN_CD : tmpRs.BUSN_CD);
        $("#busnExCd").data("kendoDropDownList").value(rs.BUSN_EX_CD ? rs.BUSN_EX_CD : tmpRs.BUSN_EX_CD);

        $("#bnkSn").val(rs.BNK_SN ? rs.BNK_SN : tmpRs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM ? rs.BNK_NM : tmpRs.BNK_NM);
        $("#accNm").val(rs.ACC_NM ? rs.ACC_NM : tmpRs.ACC_NM);
        $("#accNo").val(rs.ACC_NO ? rs.ACC_NO : tmpRs.ACC_NO);

        $("#totAmt").val(rs.TOT_COST ? regIncpRe.comma(rs.TOT_COST) : 0);
        $("#supAmt").val(rs.SUP_COST ? regIncpRe.comma(rs.SUP_COST) : 0);
        $("#vatAmt").val(rs.VAT_COST ? regIncpRe.comma(rs.VAT_COST) : 0);

        $("#g20EmpCd").val(tmpRs.G20_EMP_CD);
        $("#g20DeptCd").val(tmpRs.G20_DEPT_CD);
        $("#exnpEmpNm").val(tmpRs.REG_EMP_NAME);
        $("#exnpEmpSeq").val(tmpRs.REG_EMP_SEQ);
        $("#exnpDeptNm").val(tmpRs.REG_DEPT_NAME);
        $("#exnpDeptSeq").val(tmpRs.REG_DEPT_SEQ);
    },

    setData2 : function (){
        console.log("setData2");
        var data = {
            payIncpSn : $("#payIncpSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", data);
        var rs = result.map;
        var ls = result.list;

        var incpTotAmt = 0;
        for(var i = 0 ; i < ls.length ; i++){
            incpTotAmt += Number(ls[i].TOT_COST);
        }

        $("#inDt").val(ls[0].TR_DE);

        console.log(result);

        regIncpRe.payAppBtnSet(rs);

        $("#redyAmt").val(rs.TOT_COST);
        $("#incpTotAmt").val(incpTotAmt);
        $("#pjtNm").val(rs.PJT_NM);
        $("#pjtNm2").val(rs.PJT_NM);
        $("#pjtSn").val(rs.PJT_SN);
        $("#pjtCd").val(rs.PJT_CD);
        $("#budgetNm").val(rs.BUDGET_NM);
        $("#budgetSn").val(rs.BUDGET_SN);
        $("#appCont").val(rs.APP_CONT);
        $("#busnCd").data("kendoDropDownList").value(rs.BUSN_CD);
        $("#busnExCd").data("kendoDropDownList").value(rs.BUSN_EX_CD);

        $("#bnkSn").val(rs.BNK_SN);
        $("#bnkNm").val(rs.BNK_NM);
        $("#accNm").val(rs.ACC_NM);
        $("#accNo").val(rs.ACC_NO);
        $("#totAmt").val(regIncpRe.comma(rs.TOT_DET_AMT - rs.TOT_COST));

        $("#g20EmpCd").val(rs.G20_EMP_CD);
        $("#g20DeptCd").val(rs.G20_DEPT_CD);
        $("#exnpEmpNm").val(rs.REG_EMP_NAME);
        $("#exnpEmpSeq").val(rs.REG_EMP_SEQ);
        $("#exnpDeptNm").val(rs.REG_DEPT_NAME);
        $("#exnpDeptSeq").val(rs.REG_DEPT_SEQ);
    },

    fn_viewStat: function (){
        var stat = $("#status").val();

        if(stat == "rev"){
            // $("#payAppStat").data("kendoRadioGroup").enable(false);
            $("#appDe").data("kendoDatePicker").enable(false);
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
            $("#titleStat").text("검토")
        }
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regIncpRe.global.crmSnId = crmSnId;
        regIncpRe.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regIncpRe.global.crmSnId).val($("#crmSn").val())
        $("#" + regIncpRe.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){

            $("#vatCost" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totCost" + index).val())) - Math.round(Number(regIncpRe.uncomma($("#totCost" + index).val())) * 100 / 110)));
            $("#supCost" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totCost" + index).val())) - Number(regIncpRe.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totCost" + index).val())) - Number(regIncpRe.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totCost" + index).val())) - Number(regIncpRe.uncomma($("#vatCost" + index).val()))));
        }

        regIncpRe.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regIncpRe.comma(regIncpRe.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (type){

        var url = "/project/pop/projectView.do?type=" + type;

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=N&status=incp";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_calCost: function(obj){
        if(obj.id.match("totAmt")){
            $("#vatAmt").val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt").val())) - Math.round(Number(regIncpRe.uncomma($("#totAmt").val())) * 100 / 110)));
            $("#supAmt").val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt").val())) - Number(regIncpRe.uncomma($("#vatAmt").val()))));
        } else if(obj.id.match("supAmt")){
            $("#vatAmt").val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt").val())) - Number(regIncpRe.uncomma($("#supAmt").val()))));
        } else if (obj.id.match("vatAmt")){
            $("#supAmt").val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt").val())) - Number(regIncpRe.uncomma($("#vatAmt").val()))));
        }

        regIncpRe.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regIncpRe.comma(regIncpRe.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_regExnpCancel : function (payIncpSn) {

        if(!confirm("수입 반제결의서 승인을 취소하시겠습니까?")){
            return;
        }

        var data = {
            payIncpSn : payIncpSn,
        }

        $.ajax({
            url : "/payApp/regIncpCancel",
            type : "POST",
            data: data,
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("승인이 취소되었습니다.");
                    location.reload()
                }
            }
        });
    },
}
