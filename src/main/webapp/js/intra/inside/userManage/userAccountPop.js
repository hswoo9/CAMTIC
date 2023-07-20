var userAccountPop = {

    global : {
        saveAjaxData : "",
    },

    defaultScript : function () {

        $("#bankName, #accountNum, #accountHolder, #cardNum, #dozonCode").kendoTextBox();
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
            dozonCode : $("#dozonCode").val() //더존CODE
        }
        console.log(data);

        $.ajax({
            url : '',
            data : data,
            dataType: "json",
            type : "get",
            async : false,
            success : function(result){
                console.log(result);
                alert("저장이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }

}

