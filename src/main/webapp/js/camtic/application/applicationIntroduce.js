var applicationIntroduce = {
    global : {
        createHtmlStr : "",
        certIndex : 0,
        langIndex : 0,
    },

    fn_defaultScript : function() {
        applicationIntroduce.fnResizeForm();

        applicationIntroduce.getSelectBoxSetting();

        if($("#applicationId").val() != ""){
            applicationIntroduce.applicationDataSet($("#applicationId").val());
        }
    },

    setApplicationTempSave : function(type){
        if(type == "prev"){
            location.href = "/application/applicationForm3.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
        }else{
            if(type == "next"){
                if(!$("#introduce2").val()){
                    alert("입사 후 포부 및 업무추진계획은 필수 입력 항목입니다.");
                    return;
                }
            }

            var confirmText = "";
            confirmText = "수정 하시겠습니까?";

            if(confirm(confirmText)){
                var formData = new FormData();
                formData.append("introduceId", $("#introduceId").val());
                formData.append("applicationId", $("#applicationId").val());
                formData.append("introduce1", $("#introduce1").val());
                formData.append("introduce2", $("#introduce2").val());
                formData.append("introduce3", $("#introduce3").val());
                formData.append("userEmail", $("#userEmail").val());
                if(type == "final"){
                    formData.append("saveType", "S");
                }

                var result = customKendo.fn_customFormDataAjax("/application/setApplicationIntroduce.do", formData);
                if(result.flag){
                    alert("수정되었습니다.");
                    location.reload();
                }
            }
        }
    },

    setApplicationPrev : function(){
        location.href = "/application/applicationForm3.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
    },

    applicationDataSet : function(e){
        var result = customKendo.fn_customAjax("/application/getApplicationIntroduce.do", {applicationId : $("#applicationId").val()});
        if(result.flag){
            $("#introduceId").val(result.data.INTRODUCE_ID);
            $("#introduce1").val(result.data.INTRODUCE1);
            $("#introduce2").val(result.data.INTRODUCE2);
            $("#introduce3").val(result.data.INTRODUCE3);
        }
    },

    getSelectBoxSetting : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruitArea.do", {recruitAreaInfoSn : $("#recruitAreaInfoSn").val()});
        if(result.flag){
            $("#recruitAreaInfoSnTxt").text(result.recruitArea.JOB)
        }
    },

    fnResizeForm : function() {
        var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth);
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 30;
        try{
            var childWindow = window.parent;
            childWindow.resizeTo(( strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },
}