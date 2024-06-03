var faxSendPop = {

    sendFax : function(){
        
        var data = {
            messages: []
        };

        $.ajax({
            url:"/message/sendMsg",
            data:JSON.stringify(data),
            dataType : 'json',
            async : false,
            type : 'POST',
            contentType:'application/json',
            success:function(result){
                if(result.code == "200"){
                    alert(result.message);
                    window.close();
                }else{
                    alert(result.message);
                }
            }
        });
    },

    fileChange: function(e){
        $(e).next().text($(e)[0].files[0].name);
    }
}