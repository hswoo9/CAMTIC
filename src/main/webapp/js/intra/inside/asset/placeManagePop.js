/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 - 위치관리 추가 팝업페이지
 */
var placeManagePop = {
    global : {
        saveAjaxData : ""
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["astPlaceName", "astManageDept"]);

        if($("#mod").val() == "Y"){
            placeManagePop.modDataInit()
        }
    },

    modDataInit : function(){
        var result = customKendo.fn_customAjax("/inside/getAssetPlace.do", {astPlaceSn : $("#astPlaceSn").val()})
        if(result.flag){
            $("#astPlaceSn").val(result.rs.AST_PLACE_SN);
            $("#astPlaceName").val(result.rs.AST_PLACE_NAME);
            $("#astManageDept").val(result.rs.AST_MANAGE_DEPT);
        }
    },

    fn_saveBtn : function() {
        placeManagePop.global.saveAjaxData = {
            astPlaceSn : $("#astPlaceSn").val(),
            astPlaceName : $("#astPlaceName").val(),
            astManageDept : $("#astManageDept").val(),
            empSeq : $("#empSeq").val()
        }
        var result = customKendo.fn_customAjax('/inside/setAssetPlace.do', placeManagePop.global.saveAjaxData);
        if(result.flag) {
            alert('등록이 완료 되었습니다.');
            opener.parent.classManage.placeGridReload();
            window.close();
        }
    },
}

