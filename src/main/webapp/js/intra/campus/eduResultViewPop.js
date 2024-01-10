var now = new Date();

var eduResultViewPop = {
    global : {
        eduInfoId : "",
        eduFormType : ""
    },

    init : function(){
        eduResultViewPop.dataSet();
    },

    dataSet : function() {
        eduResultViewPop.global.eduInfoId = $("#eduInfoId").val();
        eduResultReqPop.global.eduFormType = $("#eduFormType").val();
    },

    campusResDrafting: function() {
        $("#campusResDraftFrm").one("submit", function() {
            var url = "/Campus/pop/campusResApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/campusResApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    approveDocView: function (docId, approKey, menuCd, deleteFlag){
        if(deleteFlag != null && deleteFlag == "Y"){
            alert("삭제된 문서는 열 수 없습니다.");
            return
        }

        var mod = "V";
        var pop = "" ;
        var url = '/approval/approvalDocView.do?docId='+docId+'&menuCd=' + menuCd + '&mod=' + mod + '&approKey='+approKey;
        var width = "1000";
        var height = "950";
        windowX = Math.ceil( (window.screen.width  - width) / 2 );
        windowY = Math.ceil( (window.screen.height - height) / 2 );
        pop = window.open(url, '결재 문서_' + approKey, "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
        //pop.focus();
    },

    resultUpdatePop: function (){
        let mode = "upd";
        var url = "/Campus/pop/eduResultReqPop.do?mode="+mode;
        url += "&eduInfoId="+$("#eduInfoId").val();
        var name = "_self";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}