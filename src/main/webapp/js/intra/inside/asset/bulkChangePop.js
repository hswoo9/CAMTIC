var bulkChangePop = {

    global: {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["astName", "empName", "purcPrice", "reason"])

        bulkChangePop.global.searchAjaxData = {
            insideMdCode : "03"
        }
        bulkChangePop.global.dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", bulkChangePop.global.searchAjaxData);
        $("#astStsCode").kendoDropDownList({
            dataTextField: "INSIDE_DT_CODE_NM",
            dataValueField: "INSIDE_DT_CODE",
            dataSource: bulkChangePop.global.dropDownDataSource.rs,
        });
    },

    setAstInfoBatch : function(){
        bulkChangePop.global.saveAjaxData = {
            astInfoSn : $("#astInfoSn").val(),
            empSeq : $("#empSeq").val()
        }

        if(!$("#astNameChk").is(':checked') && !$("#empNameChk").is(':checked') && !$("#purcPriceChk").is(':checked') && !$("#astStsChk").is(':checked')){
            alert("변경할 항목을 체크해주세요.");
            return;
        }

        if($("#astNameChk").is(':checked')){
            bulkChangePop.global.saveAjaxData.astName = $("#astName").val()
        }

        if($("#empNameChk").is(':checked')){
            bulkChangePop.global.saveAjaxData.empName = $("#empName").val()
        }

        if($("#purcPriceChk").is(':checked')){
            bulkChangePop.global.saveAjaxData.purcPrice = $("#purcPrice").val()
        }

        if($("#astStsChk").is(':checked')){
            bulkChangePop.global.saveAjaxData.astStsCode = $("#astStsCode").val()
            bulkChangePop.global.saveAjaxData.reason = $("#reason").val()
        }

        var result = customKendo.fn_customAjax('/inside/setAstInfoBatch.do', bulkChangePop.global.saveAjaxData);
        if(result.flag){
            alert("변경되었습니다.");
            opener.parent.assetList.gridReload();
            window.close();
        }
    }
}


