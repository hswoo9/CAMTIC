/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 - 위치관리 추가 팝업페이지
 */
var now = new Date();
var locationManagePop = {
    fn_defaultScript: function () {
        $("#location").kendoTextBox();
        $("#managementGroup").kendoTextBox();ㄴ
    },
    fn_saveBtn : function() {
        var data = {
            AST_PLACE_NAME : $("#location").val(),
            AST_MANAGE_DEPT : $("#managementGroup").val(),
        }
        var result = customKendo.fn_customAjax('/asset/setAssetPlace',data);
        if(result.flag) {
            if(result.rs == 'SUCCESS') {
                alert('등록이 완료 되었습니다.')
                window.close();
                opener.parent.classManage.gridReload3();
            }else {
                alert('등록 오류.')
            }
        }
    },
}

