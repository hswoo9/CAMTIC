var userResignRegPop = {

    global : {
        saveAjaxData : ""
    },

    defaultScript : function () {
        $("#resignDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#resignReason").kendoTextArea({
            rows : 5,
        });
    },

    setUserResignReg : function(e){
        if(confirm("해당 직원을 퇴사처리하시겠습니까?")){
            userResignRegPop.global.saveAjaxData = {
                empSeq : $("#empSeq").val(),
                resignDay : $("#resignDay").val(),
                resignReason : $("#resignReason").val(),
                regEmpSeq : $("#regEmpSeq").val()
            }

            var result = customKendo.fn_customAjax("/userManage/setUserResignReg.do", userResignRegPop.global.saveAjaxData)
            if(result.flag){
                alert("처리되었습니다.");
                opener.parent.location.reload();
                window.close();
            }
        }
    }
}