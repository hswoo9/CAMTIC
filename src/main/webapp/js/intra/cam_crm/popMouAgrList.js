var mouAgrListReg = {

    global : {

    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["crmNm"]);
    },

    fn_save : function (){
        if(!$("#crmNm").val()){
            alert("체결기관을 입력해주세요.");
            return false;
        }

        var mouData = {
            mouAgrSn : $("#mouAgrSn").val(),
            crmNm : $("#crmNm").val(),
            empSeq : $("#empSeq").val()
        }

        if(confirm('저장하시겠습니까?')){
            var result = customKendo.fn_customAjax("/crm/setMouAgrCrmInfo", mouData);
            if(result.flag){
                alert("저장되었습니다.");
                opener.mouAgr.fn_subGridReload($("#mouAgrSn").val());
                window.close();
            }
        }
    },

}