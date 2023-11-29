var now = new Date();

var eduInfoViewPop = {
    global : {
        eduInfoId : "",
        eduFormType : ""
    },

    init : function(){
        eduInfoViewPop.dataSet();

        if($("#isAdmin").val() == "Y"){
            $(".usrBtn").hide();
        } else {
            $(".usrBtn").show();
        }
    },

    dataSet : function() {
        eduInfoViewPop.global.eduInfoId = $("#eduInfoId").val();
        let eduInfoId = eduInfoViewPop.global.eduInfoId;

        const result = customKendo.fn_customAjax("/campus/getEduInfoOne", {
            eduInfoId: eduInfoId
        });
        const eduMap = result.data;

        if(eduMap.eduFileList != null){
            $("#eduFile").text(eduMap.eduFileList.file_org_name + "." +eduMap.eduFileList.file_ext);
        }

        const real = customKendo.fn_customAjax("/campus/getEduResultOne", {
            eduInfoId: eduInfoId
        }).data;

        console.log(real);

        if(real != null){
            if(real.MNG_CHECK == "Y"){
                $("#realTime").html("<span>&nbsp;/ 인정시간 : "+real.REAL_EDU_TIME+" 시간</span>");
            }
        }
    },

    targetEduSetPop: function() {
        var url = "/Campus/pop/targetEduSetPop.do?targetYear="+$("#regDate").val().substring(0,4);
        var name = "targetEduSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    campusDrafting: function() {
        $("#campusDraftFrm").one("submit", function() {
            var url = "/Campus/pop/campusApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/campusApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    eduResultReqPop: function() {
        var url = "/Campus/pop/eduResultReqPop.do?eduInfoId="+eduInfoViewPop.global.eduInfoId;
        var name = "_self";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    eduResultViewPop: function() {
        var url = "/Campus/pop/eduResultViewPop.do?eduInfoId="+eduInfoViewPop.global.eduInfoId;
        var name = "_self";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}
