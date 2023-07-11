var assetManagePop = {
    global : {

    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["manageMainEmpName", "manageSubEmpName"])
    },

    setAstManage : function(){
        var data = {
            astManageSn : $("#astManageSn").val(),
            manageMainEmpSeq : $("#manageMainEmpSeq").val(),
            manageMainEmpName : $("#manageMainEmpName").val(),
            manageSubEmpSeq : $("#manageSubEmpSeq").val(),
            manageSubEmpName : $("#manageSubEmpName").val(),
            empSeq : $("#empSeq").val()
        }

        var result = customKendo.fn_customAjax("/inside/setAstManage.do", data);
        if(result.flag){
            alert("등록되었습니다.");
            window.close();
        }
    }
}


