var crmIndustry = {

    global : {
        radioDataSource : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },
    
    fn_defaultScript : function (){
        crmIndustry.global.radioDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "INDUSTRY"});
        crmIndustry.mainCdRadioSetting(crmIndustry.global.radioDataSource.rs, "mainCode");

        crmIndustry.global.dropDownDataSource = customKendo.fn_customAjax("/crm/selLgCode", {grpSn : "CT"});
        customKendo.fn_dropDownList("complexType", crmIndustry.global.dropDownDataSource.rs, "LG_CD_NM", "LG_CD", 2);
        $("#complexType").data("kendoDropDownList").bind("change", crmIndustry.getComplexName);
        customKendo.fn_dropDownList("complexName", [], "CRM_CD_NM", "CRM_CD", 2);

        $("#laboratory").kendoTextArea({
            rows : 5,
        });

        crmIndustry.industryDataSet();
    },

    fn_save : function (){
        crmIndustry.global.saveAjaxData = {
            crmIndustrySn : $("#crmIndustrySn").val(),
            crmSn : $("#crmSn").val(),
            mainCode : $("#mainCode").data("kendoRadioGroup").value(),
            subCode : $("#subCode").data("kendoRadioGroup").value(),
            complexType : $("#complexType").val(),
            complexName : $("#complexName").val(),
            laboratory : $("#laboratory").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        var result = customKendo.fn_customAjax("/crm/setCrmIndustry.do", crmIndustry.global.saveAjaxData);
        if(result.flag){
            alert("저장되었습니다.");
            location.reload();
        }
    },

    mainCdRadioSetting : function(e){
        var radioArr = new Array();
        for(var i = 0; i < e.length; i++){
            radioArr.push({label : e[i].LG_CD_NM, value : e[i].LG_CD, grpSn : e[i].GRP_SN});
        }

        $("#mainCode").kendoRadioGroup({
            items: radioArr,
            layout: "horizontal",
            labelPosition: "after",
            change : function(){
                var item = this._items.find(element => element.value === this.value());
                crmIndustry.subCdRadioSetting(item.grpSn, item.value);
            }
        });
    },

    subCdRadioSetting : function(grpSn, lgCd){
        $("#subCdTr *").remove();
        $("#subCdTr").append('<span id="subCode" style="gap: 0px;"></span>');

        var radioArr = new Array();
        var result = customKendo.fn_customAjax("/crm/smCodeList", {
            grpSn : grpSn,
            lgCd : lgCd
        });

        for(var i = 0; i < result.length; i++){
            radioArr.push({label : result[i].CRM_CD_NM, value : result[i].CRM_CD});
        }

        $("#subCode").kendoRadioGroup({
            items: radioArr,
            layout: "horizontal",
            labelPosition: "after"
        });
    },

    getComplexName : function(){
        $("#complexName").val("");

        var result = customKendo.fn_customAjax("/crm/smCodeList", {
            grpSn : "CT",
            lgCd : $("#complexType").val()
        });

        customKendo.fn_dropDownList("complexName", result, "CRM_CD_NM", "CRM_CD", 2);
    },

    industryDataSet : function(){
        crmIndustry.global.saveAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmIndustry.do", crmIndustry.global.saveAjaxData);
        if(result.flag){
            if(result.data != null){
                $("#crmIndustrySn").val(result.data.CRM_INDUSTRY_SN);
                $("#mainCode").data("kendoRadioGroup").value(result.data.MAIN_CODE);
                $("#mainCode").data("kendoRadioGroup").trigger("change");
                $("#subCode").data("kendoRadioGroup").value(result.data.SUB_CODE);
                $("#complexType").data("kendoDropDownList").value(result.data.COMPLEX_TYPE);
                $("#complexType").data("kendoDropDownList").trigger("change");
                $("#complexName").data("kendoDropDownList").value(result.data.COMPLEX_NAME);
                $("#laboratory").val(result.data.LABORATORY);
            }
        }
    }
}