var crmReg = {

    fn_defaultScript : function (){

        var data = {
            cmGroupCode : "CRM_ATTRACT_CD",
        }
        var crmAttCd = customKendo.fn_customAjax("/common/commonCodeList", data);
        crmAttCd = crmAttCd.rs;

        customKendo.fn_dropDownList("crmAtt", crmAttCd, "CM_CODE_NM", "CM_CODE");

        $("#crmClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text : "기업", value : "기업" },
                {text : "기관", value : "기관" },
                {text : "기타", value : "기타" }
            ],
            valuePrimitive: true
        });

        data.cmGroupCode = "CRM_ITEM_VALUE";
        var crmClass = customKendo.fn_customAjax("/common/commonCodeList", data);

        var parameters = {
            crmAtt : $("#crmAtt").val(),
            crmAttNm : $("#crmAtt").data("kendoDropDownList").text(),
            crmClass : $("#crmClass").val(),
            crmClassNm : $("#crmClass").data("kendoDropDownList").text()

        }
    }
}