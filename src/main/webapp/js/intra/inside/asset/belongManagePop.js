/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 - 소속관리 추가 팝업페이지
 */
var now = new Date();
var belongManagePop = {
    fn_defaultScript: function () {
        $("#belong").kendoTextBox();
        $("#belongCode").kendoTextBox();
    },
    fn_saveBtn : function() {
        var data = {
            INSIDE_MD_CODE : '01',
            INSIDE_MD_CODE_NM : '자산소속',
            INSIDE_DT_CODE : $("#belongCode").val(),
            INSIDE_DT_CODE_NM : $("#belong").val(),
        }
        var result = customKendo.fn_customAjax('/asset/setAssetCode',data);
        if(result.flag) {
            if(result.rs == 'SUCCESS') {
                alert('등록이 완료 되었습니다.')
                window.close();
                opener.parent.classManage.gridReload();
            }else {
                alert('등록 오류.')
            }
        }
    },
}

