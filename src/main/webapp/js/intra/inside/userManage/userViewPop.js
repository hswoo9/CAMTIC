var userViewPop = {

    global : {

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
    }
}