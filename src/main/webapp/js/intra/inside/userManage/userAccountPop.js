var userAccountPop = {

    global : {
        saveAjaxData : "",
        targetEmpSeq : "",
    },

    defaultScript : function (empSeq) {
        userAccountPop.global.targetEmpSeq = empSeq;
        $("#bankName, #accountNum, #accountHolder, #cardNum, #duzonCode").kendoTextBox();
    },

    userAccountSave : function (){
        if(!confirm("계좌정보를 저장하시겠습니까?")){
            return ;
        }
        var data = {
            bankName : $("#bankName").val(), //은행명
            accountNum : $("#accountNum").val(), //계좌번호
            accountHolder : $("#accountHolder").val(), //예금주
            cardNum : $("#cardNum").val(), //카드번호
            duzonCode : $("#duzonCode").val(), //더존CODE
            targetEmpSeq : userAccountPop.global.targetEmpSeq,
            regEmpSeq : $("#regEmpSeq").val()
        }
        console.log(data);

        $.ajax({
            url : '/userManage/updateUserBankInfo',
            data : data,
            dataType: "json",
            type : "post",
            async : false,
            success : function(result){
                alert("저장이 완료되었습니다.");
                opener.location.reload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }

}

