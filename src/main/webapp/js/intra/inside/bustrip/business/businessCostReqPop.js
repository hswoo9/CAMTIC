const costReq = {
    init: function(){
        costReq.dataSet();
    },

    dataSet: function(){
        bustrip.fn_nationCodeSet();
        bustrip.fn_exnpCodeSet();
        bustrip.fn_dutyCodeSet();
        customKendo.fn_textBox(["exchangeRate", "costAmt", "costWon"]);
    },

    saveBtn: function(){
        let tripCode = $("#nationCode").data("kendoDropDownList").value();
        let exnpCode = $("#exnpCode").val();
        let exnpText = $("#exnpCode").data("kendoDropDownList").text();
        let dutyCode = $("#dutyCode").val();
        let dutyText = $("#dutyCode").data("kendoDropDownList").text();
        let costAmt = uncomma($("#costAmt").val());
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let data = {
            tripCode: tripCode,
            exnpCode: exnpCode,
            exnpText: exnpText,
            dutyCode: dutyCode,
            dutyText: dutyText,
            costAmt: costAmt,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if(costAmt == "") { alert("금액을 작성하지 않았습니다."); return; }

        let confirmText = "";
        if($("#hrCostInfoSn").val() == "") {
            confirmText = "여비를 등록하시겠습니까?";
        }else {
            confirmText = "여비를 수정하시겠습니까?";
        }

        if(!confirm(confirmText)){
            return;
        }

        customKendo.fn_customAjax("/bustrip/setBusinessCostInsert", data);
        alert("저장되었습니다.");
        opener.costList.mainGrid();
        window.close();

    },

    calc : function(e){
        let exchangeRate = uncomma($("#exchangeRate").val());
        let costAmt = uncomma($("#costAmt").val());
        let costWon = Number(exchangeRate) * Number(costAmt);
        $("#costWon").val(comma(costWon));
        return fn_inputNumberFormat(e);
    }
}