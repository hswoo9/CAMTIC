var userViewPop = {

    global : {
        saveAjaxData : "",
    },

    defaultScript : function () {


    },

    /** 관리자 버튼*/
    certificateReqPop : function(e) {
        var url = "/inside/pop/certificateReqAdminPop.do?empSeq=" + e;
        var name = "certificateReqPop";
        var option = "width=965, height=380, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    moveToUserReqPop : function(e){
        location.href = "/Inside/pop/userReqPop.do?empSeq=" + e;
    },

    userResignation : function(e){
        var url = "/inside/pop/userResignRegPop.do?empSeq=" + e;
        var name = "userResignRegPop";
        var option = "width=660, height=310, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setUserDel : function(e){
        if(confirm("삭제된 직원은 복구가 불가능합니다.\n직원을 삭제처리하시겠습니까?")){
            userViewPop.global.saveAjaxData = {
                empSeq : e,
                regEmpSeq : $("#regEmpSeq").val()
            }

            var result = customKendo.fn_customAjax("/userManage/setUserDel.do", userViewPop.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                opener.userPersonList.gridReload();
                window.close();
            }else{
                alert("삭제 처리 중 오류가 발생하였습니다.");
            }
        }
    }
}