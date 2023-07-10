var assetCodePositionManagePop = {
    global : {
        saveAjaxData : ""
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["belong", "belongCode"]);

        if($("#mod").val() == "Y"){
            assetCodePositionManagePop.modDataInit()
        }
    },

    modDataInit : function(){
        var result = customKendo.fn_customAjax("/inside/getClassPosition.do", {astCodeCompanyId : $("#astCodeCompanyId").val()})
        if(result.flag){
            $("#astCodeCompanyId").val(result.rs.AST_CODE_COMPANY_ID);
            $("#astCpCode").val(result.rs.AST_CP_CODE);
            $("#astCpCodeNm").val(result.rs.AST_CP_CODE_NM);
        }
    },

    fn_saveBtn : function() {
        assetCodePositionManagePop.global.saveAjaxData = {
            astCodeCompanyId : $("#astCodeCompanyId").val(),
            astCpCode : $("#astCpCode").val(),
            astCpCodeNm : $("#astCpCodeNm").val(),
            empSeq : $("#empSeq").val()
        }
        var result = customKendo.fn_customAjax('/asset/setAssetCodePosition.do', assetCodePositionManagePop.global.saveAjaxData);
        if(result.flag) {
            alert('등록이 완료 되었습니다.');
            opener.parent.classManage.positionGridReload();
            window.close();
        }
    },
}

