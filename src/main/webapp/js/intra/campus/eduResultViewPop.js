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
    }
}