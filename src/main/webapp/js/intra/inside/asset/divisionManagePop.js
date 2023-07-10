/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 - 구분관리 추가 팝업페이지
 */
var divisionManagePop = {
    global : {
        saveAjaxData : ""
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["astTypeCodeNm", "astTypeCode"]);

        if($("#mod").val() == "Y"){
            divisionManagePop.modDataInit()
        }
    },

    modDataInit : function(){
        var result = customKendo.fn_customAjax("/inside/getClassDivision.do", {astCodeTypeId : $("#astCodeTypeId").val()})
        if(result.flag){
            $("#astCodeTypeId").val(result.rs.AST_CODE_TYPE_ID);
            $("#astTypeCode").val(result.rs.AST_TYPE_CODE);
            $("#astTypeCodeNm").val(result.rs.AST_TYPE_CODE_NM);
        }
    },

    fn_saveBtn : function() {
        divisionManagePop.global.saveAjaxData = {
            astCodeTypeId : $("#astCodeTypeId").val(),
            astTypeCode : $("#astTypeCode").val(),
            astTypeCodeNm : $("#astTypeCodeNm").val(),
            empSeq : $("#empSeq").val()
        }
        var result = customKendo.fn_customAjax('/asset/setClassDivision.do', divisionManagePop.global.saveAjaxData);
        if(result.flag) {
            alert('등록이 완료 되었습니다.');
            opener.parent.classManage.divisionGridReload();
            window.close();
        }
    },
}

