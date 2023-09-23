var appView = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        // appView.getSelectBoxSetting();
    },

    getSelectBoxSetting : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruitArea.do", {recruitAreaInfoSn : $("#recruitAreaInfoSn").val()});
        if(result.flag){
            $("#recruitAreaInfoSnTxt").text(result.recruitArea.JOB)
        }
    },
}

