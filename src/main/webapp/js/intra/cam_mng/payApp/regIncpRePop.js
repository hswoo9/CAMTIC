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
        console.log(data);
        let buttonHtml = "";
        if($("#type").val() != "new"){
            if(data.RE_STAT == "N"){
                buttonHtml += '<button type="button" id="delBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regIncpRe.fn_del()">삭제</button>';
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncpRe.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="apprBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regIncpRe.fn_reApprove()">반제결의서 승인</button>';
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

        $.ajax({
            url : "/pay/resolutionIncpAppr",
            type : "POST",
            data: parameters,
            dataType : "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success : function(rs){
                $("#my-spinner").hide();
                if(rs.code == 200){
                    alert("승인이 완료되었습니다.");
                    try {
                        opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                    }catch{
                        // alert("새로 고침중 오류가 발생하였습니다.");
                    }
                    window.close();
                }else{
                    alert("ERP 연동 중 오류가 발생하였습니다.");
                }
            }
        });
    },

    fn_save : function(){
        var itemArr = [];
        var amtFlag = false;
        var amtFlag2 = false;

        if($("#type").val() == "new"){
            if($("input[name='incpDetSn']:checked").length == 0){
                alert("선택된 항목이 없습니다.");
                return;
            }

            $.each($("input[name='incpDetSn']:checked"), function(i, v){
                var index = $(this).attr("id").replace(/[^0-9]/g, '');

                var data = {
                    payIncpSn : $("#payIncpSn").val(),
                    payIncpDetSn : $(this).attr("id"),
                    reAppDe : $("#appDe").val(),
                    inDt : $("#inDt" + index).val(),
                    totAmt : regIncpRe.uncomma($("#totAmt" + index).val() == "" ? 0 : $("#totAmt" + index).val()),
                    supAmt : regIncpRe.uncomma($("#supAmt" + index).val() == "" ? 0 : $("#supAmt" + index).val()),
                    vatAmt : regIncpRe.uncomma($("#vatAmt" + index).val() == "" ? 0 : $("#vatAmt" + index).val()),
                }

                if(data.totAmt > (Number($("#redyAmt" + index).val()))) {
                    amtFlag = true;
                }

                if(data.totAmt == 0) {
                    amtFlag2 = true;
                }

                itemArr.push(data);
            });

        } else {

            $.each($(".incpDetTr"), function(i, v){
                var index = $(this).attr("id").replace(/[^0-9]/g, '');

                var data = {
                    payIncpSn : $("#payIncpSn").val(),
                    payIncpReSn : $(this).attr("id").replace(/[^0-9]/g, ''),
                    reAppDe : $("#appDe").val(),
                    inDt : $("#inDt" + index).val(),
                    totAmt : regIncpRe.uncomma($("#totAmt" + index).val() == "" ? 0 : $("#totAmt" + index).val()),
                    supAmt : regIncpRe.uncomma($("#supAmt" + index).val() == "" ? 0 : $("#supAmt" + index).val()),
                    vatAmt : regIncpRe.uncomma($("#vatAmt" + index).val() == "" ? 0 : $("#vatAmt" + index).val()),
                }

                // if(data.totAmt > (Number($("#redyAmt" + index).val()))) {
                //     amtFlag = true;
                // }

                if(data.totAmt == 0) {
                    amtFlag2 = true;
                }

                itemArr.push(data);
            });
        }

        if(amtFlag){
            alert("입금 잔액을 초과하였습니다.");
            return;
        }

        if(amtFlag2){
            alert("입금액을 입력해주세요.");
            return;
        }

        var data = {
            itemArr : JSON.stringify(itemArr)
        }

        $.ajax({
            url : "/pay/setIncpRe",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    location.href="/payApp/pop/regIncpRePop.do?payIncpSn=" + $("#payIncpSn").val() + "&payIncpReSn=" + rs.rs.payIncpReSn;
                }
            }
        })
    },

    fn_del : function (){
        if(!confirm("해당 반제결의서를 삭제하시겠습니까?")){
            return;
        }

        var data = {

        }
        if($("#payIncpReSn").val() != ""){
            data.payIncpReSn = $("#payIncpReSn").val();
        }

        if(data.payIncpReSn == ""){
            alert("오류가 발생하였습니다. 관리자에게 문의해주세요.");
            return
        }

        $.ajax({
            url : "/payApp/delIncpRe",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");

                    if(opener.parent.incomeReList != null){
                        opener.parent.incomeReList.gridReload();
                    }
                    window.close();
                }
            }
        })
    },

    setData : function (){
        console.log("setData");
        var data = {
            payIncpSn : $("#payIncpSn").val(),
            payIncpReSn : $("#payIncpReSn").val(),
            payIncpDetSn : $("#payIncpDetSn").val(),
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpReData", data);
        var tmpRs = result.map;
        var ls = result.list;
        var rs = result.data;

        console.log(rs);
        regIncpRe.payAppBtnSet(rs[0]);
        console.log(tmpRs);

        $("#redyAmt").val(tmpRs.TOT_COST - rs[0].TOT_COST);
        $("#appDe").val(rs[0].RE_APP_DE);
        $("#pjtNm").val(rs[0].PJT_NM ? rs[0].PJT_NM : tmpRs.PJT_NM);
        $("#pjtNm2").val(rs[0].PJT_NM ? rs[0].PJT_NM : tmpRs.PJT_NM);
        $("#pjtSn").val(rs[0].PJT_SN ? rs[0].PJT_SN : tmpRs.PJT_SN);
        $("#pjtCd").val(rs[0].PJT_CD ? rs[0].PJT_CD : tmpRs.PJT_CD);
        $("#budgetNm").val(rs[0].BUDGET_NM ? rs[0].BUDGET_NM : tmpRs.BUDGET_NM);
        $("#budgetSn").val(rs[0].BUDGET_SN ? rs[0].BUDGET_SN : tmpRs.BUDGET_SN);
        $("#appCont").val(rs[0].APP_CONT ? rs[0].APP_CONT : tmpRs.APP_CONT);
        $("#busnCd").data("kendoDropDownList").value(rs[0].BUSN_CD ? rs[0].BUSN_CD : tmpRs.BUSN_CD);
        $("#busnExCd").data("kendoDropDownList").value(rs[0].BUSN_EX_CD ? rs[0].BUSN_EX_CD : tmpRs.BUSN_EX_CD);

        $("#bnkSn").val(rs[0].BNK_SN ? rs[0].BNK_SN : tmpRs.BNK_SN);
        $("#bnkNm").val(rs[0].BNK_NM ? rs[0].BNK_NM : tmpRs.BNK_NM);
        $("#accNm").val(rs[0].ACC_NM ? rs[0].ACC_NM : tmpRs.ACC_NM);
        $("#accNo").val(rs[0].ACC_NO ? rs[0].ACC_NO : tmpRs.ACC_NO);

        $("#g20EmpCd").val(tmpRs.G20_EMP_CD);
        $("#g20DeptCd").val(tmpRs.G20_DEPT_CD);
        $("#exnpEmpNm").val(tmpRs.REG_EMP_NAME);
        $("#exnpEmpSeq").val(tmpRs.REG_EMP_SEQ);
        $("#exnpDeptNm").val(tmpRs.REG_DEPT_NAME);
        $("#exnpDeptSeq").val(tmpRs.REG_DEPT_SEQ);

        var html = "";
        console.log(rs.length);
        for(var i = 0; i < rs.length ; i++){
            var tRs = rs[i];

            html += "";
            html += '<tr class="incpDetTr" id="det'+ tRs.PAY_INCP_RE_SN +'">';
            html += '   <td>';
            html += '       <input type="text" id="crmNm'+ tRs.PAY_INCP_RE_SN +'" class="crmNm" disabled style="width: 100%;" value="'+ tRs.CRM_NM +'"/>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="inDt'+ tRs.PAY_INCP_RE_SN +'" class="inDt" disabled style="width: 100%;" value="'+ tRs.TR_DE +'">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="totAmt'+ tRs.PAY_INCP_RE_SN +'" class="totAmt" style="width: 100%; text-align: right" value="'+ regIncpRe.comma(Number(tRs.TOT_COST)) +'" onkeyup="regIncpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
            html += '       <input type="hidden" id="supAmt'+ tRs.PAY_INCP_RE_SN +'" style="width: 100%; text-align: right" value="'+ tRs.SUP_COST +'" onkeyup="regIncpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
            html += '       <input type="hidden" id="vatAmt'+ tRs.PAY_INCP_RE_SN +'" style="width: 100%; text-align: right" value="'+ tRs.VAT_COST +'" onkeyup="regIncpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
            html += '   </td>';
            html += '</tr>';
        }

        $("#reBody").html(html);

        $(".crmNm, .inDt, .totAmt").kendoTextBox();
    },

    setData2 : function (){
        console.log("setData2");
        var data = {
            payIncpSn : $("#payIncpSn").val()
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", data);
        var rs = result.map;
        var ls = result.list;

        console.log(result);

        regIncpRe.payAppBtnSet(rs);

        $("#pjtNm").val(rs.PJT_NM);
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

        $("#g20EmpCd").val(rs.G20_EMP_CD);
        $("#g20DeptCd").val(rs.G20_DEPT_CD);
        $("#exnpEmpNm").val(rs.REG_EMP_NAME);
        $("#exnpEmpSeq").val(rs.REG_EMP_SEQ);
        $("#exnpDeptNm").val(rs.REG_DEPT_NAME);
        $("#exnpDeptSeq").val(rs.REG_DEPT_SEQ);

        var html = "";
        var incpTotAmt = 0;
        for(var i = 0 ; i < ls.length ; i++){
            incpTotAmt += Number(ls[i].TOT_COST);

            html += "";
            html += '<tr class="incpDetTr" id="det'+ ls[i].PAY_INCP_DET_SN +'">';
            html += '   <td style="text-align: center; vertical-align: middle;">';
                    if(Number(ls[i].TOT_COST - ls[i].PAY_TOT_COST) > 0){
                        html += '<input type="checkbox" id="'+ ls[i].PAY_INCP_DET_SN +'" class="k-checkbox" name="incpDetSn" />';
                    }
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="crmNm'+ ls[i].PAY_INCP_DET_SN +'" class="crmNm" disabled style="width: 100%;" value="'+ ls[i].CRM_NM +'"/>';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="text" id="inDt'+ ls[i].PAY_INCP_DET_SN +'" class="inDt" disabled style="width: 100%;" value="'+ ls[i].TR_DE +'">';
            html += '   </td>';
            html += '   <td>';
            html += '       <input type="hidden" id="incpTotAmt'+ ls[i].PAY_INCP_DET_SN +'"  value="'+ ls[i].TOT_COST +'" />';
            html += '       <input type="hidden" id="redyAmt'+ ls[i].PAY_INCP_DET_SN +'"  value="'+ Number(ls[i].TOT_COST - ls[i].PAY_TOT_COST) +'" />';
            html += '       <input type="text" id="totAmt'+ ls[i].PAY_INCP_DET_SN +'" class="totAmt" style="width: 100%; text-align: right" value="'+ regIncpRe.comma(Number(ls[i].TOT_COST) - Number(ls[i].PAY_TOT_COST)) +'" onkeyup="regIncpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
            html += '       <input type="hidden" id="supAmt'+ ls[i].PAY_INCP_DET_SN +'" style="width: 100%; text-align: right" value="'+ ls[i].SUP_COST +'" onkeyup="regIncpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
            html += '       <input type="hidden" id="vatAmt'+ ls[i].PAY_INCP_DET_SN +'" style="width: 100%; text-align: right" value="'+ ls[i].VAT_COST +'" onkeyup="regIncpRe.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">';
            html += '   </td>';
            html += '</tr>';
        }

        $("#reBody").html(html);

        $(".crmNm, .inDt, .totAmt").kendoTextBox();
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
        var index = obj.id.replace(/[^0-9]/g, '');
        if(obj.id.match("totAmt")){

            $("#vatAmt" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt" + index).val())) - Math.round(Number(regIncpRe.uncomma($("#totAmt" + index).val())) * 100 / 110)));
            $("#supAmt" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt" + index).val())) - Number(regIncpRe.uncomma($("#vatAmt" + index).val()))));
        } else if(obj.id.match("supAmt")){
            $("#vatAmt" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt" + index).val())) - Number(regIncpRe.uncomma($("#supAmt" + index).val()))));
        } else if (obj.id.match("vatAmt")){
            $("#supAmt" + index).val(regIncpRe.comma(Number(regIncpRe.uncomma($("#totAmt" + index).val())) - Number(regIncpRe.uncomma($("#vatAmt" + index).val()))));
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

    fn_regExnpCancel : function (payIncpSn) {

        if(!confirm("수입 반제결의서 승인을 취소하시겠습니까?")){
            return;
        }

        var data = {
            payIncpSn : payIncpSn,
            payIncpReSn : $("#payIncpReSn").val()
        }

        $.ajax({
            url : "/payApp/regIncpCancel",
            type : "POST",
            data: data,
            dataType : "json",
            beforeSend : function(request){
                $("#my-spinner").show();
            },
            success : function(rs){
                $("#my-spinner").hide();
                if(rs.code == 200){
                    alert("승인이 취소되었습니다.");
                    location.reload();
                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                }
            }
        });
    },
}
