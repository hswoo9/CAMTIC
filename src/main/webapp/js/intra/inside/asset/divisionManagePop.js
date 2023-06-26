/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 - 구분관리 추가 팝업페이지
 */
var now = new Date();
var divisionManagePop = {
    fn_defaultScript: function () {
        $("#belong").kendoTextBox();
        $("#belongCode").kendoTextBox();ㄴ
    },
    fn_saveBtn : function() {
        var data = {
            INSIDE_MD_CODE : '02',
            INSIDE_MD_CODE_NM : '자산분류',
            INSIDE_DT_CODE : $("#belongCode").val(),
            INSIDE_DT_CODE_NM : $("#belong").val(),
        }
        var result = customKendo.fn_customAjax('/asset/setAssetCode',data);
        if(result.flag) {
            if(result.rs == 'SUCCESS') {
                alert('등록이 완료 되었습니다.')
                window.close();
                opener.parent.classManage.gridReload2();
            }else {
                alert('등록 오류.')
            }
        }
    },
}

