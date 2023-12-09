var customBudgetManagePop = {
    global : {
        saveAjaxData : "",
    },

    fn_defaultScript: function () {
        if($("#budgetType").val() == "cBudgetA"){
            $("#titleNM").text("예산항목(장) 추가");
        }else if($("#budgetType").val() == "cBudgetB"){
            $("#titleNM").text("예산항목(관) 추가");
        }else{
            $("#titleNM").text("예산항목(항) 추가");
        }

        customBudgetManagePop.makeTableInit();
        if($("#mod").val() == "Y"){
            customBudgetManagePop.modDataInit()
        }
    },

    makeTableInit : function(){
        var html = "";
        var codeName = ""
        if($("#budgetType").val() == "cBudgetA"){
            codeName = "예산항목(장)";
        }else if($("#budgetType").val() == "cBudgetB"){
            codeName = "예산항목(관)";
        }else{
            codeName = "예산항목(항)";
        }

        html += "<tr>" +
                    '<th scope="row" class="text-center th-color">' +
                        '<span class="red-star"></span>' + codeName +
                    '</th>' +
                    '<td>' +
                        '<input type="text" id="cbCodeNm" style="width: 100%;">' +
                    '</td>' +
                    '<th scope="row" class="text-center th-color">' +
                        '<span class="red-star"></span>코드' +
                    '</th>' +
                    '<td>' +
                        '<input type="text" id="cbCode" style="width: 100%;">' +
                    '</td>' +
                "</tr>";


        $("#addCodeTbody").append(html);

        customKendo.fn_textBox(["cbCodeNm", "cbCode"])
    },

    modDataInit : function(){
        var result = customKendo.fn_customAjax("/project/getCustomBudget.do", {cbCodeId : $("#cbCodeId").val()})
        if(result.flag){
            $("#cbCodeId").val(result.data.CB_CODE_ID);
            $("#cbUpperCode").val(result.data.CB_UPPER_CODE);
            $("#cbCode").val(result.data.CB_CODE);
            $("#cbCodeNm").val(result.data.CB_CODE_NM);
        }
    },

    setCustomBudget : function(){
        customBudgetManagePop.global.saveAjaxData = {
            cbUpperCode : $("#cbUpperCode").val(),
            cbCodeId : $("#cbCodeId").val(),
            cbCode : $("#cbCode").val(),
            cbCodeNm : $("#cbCodeNm").val(),
            empSeq : $("#empSeq").val(),
            budgetType : $("#budgetType").val()
        }

        var result = customKendo.fn_customAjax("/project/setCustomBudget.do", customBudgetManagePop.global.saveAjaxData);
        if(result.flag){
            alert("등록되었습니다.");
            if($("#budgetType").val() == "cBudgetA"){
                opener.parent.customBudget.gridReload();
            }else if($("#budgetType").val() == "cBudgetB") {
                opener.parent.customBudget.cbAddRow("customBudgetGridA", $("#cbUpperCode").val());
            }else{
                opener.parent.customBudget.cbAddRow("customBudgetGridB", $("#cbUpperCode").val());
            }
            window.close();
        }
    }
}

