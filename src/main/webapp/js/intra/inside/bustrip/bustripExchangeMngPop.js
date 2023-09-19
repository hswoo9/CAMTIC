const exchangeMng = {
    init: function(){
        exchangeMng.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["exchangeRate"]);
    },

    saveBtn: function(){
        let exchangeRate = $("#exchangeRate").val();

        let data = {
            exchangeRate: exchangeRate
        }

        if(exchangeRate == "") { alert("환율이 작성되지 않았습니다."); return; }

        if(!confirm("환율정보를 수정하시겠습니까?")){
            return;
        }
        exchangeMng.setExchangeRateUpdate(data);

    },

    setExchangeRateUpdate: function(data){
        $.ajax({
            url : "/bustrip/setExchangeRateUpdate",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("환율정보 수정이 완료됐습니다.");
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }
}