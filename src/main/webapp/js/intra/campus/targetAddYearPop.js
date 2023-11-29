var now = new Date();

var targetAddYearPop = {

    init : function(){
        targetAddYearPop.dataSet();
    },

    dataSet : function() {
        $("#targetYear").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: new Date().getFullYear()+"년", value: new Date().getFullYear() },
                { text: new Date().getFullYear()+1+"년", value: new Date().getFullYear()+1 },
            ],
            index: 0
        });
    },

    saveTarget : function() {
        var flag = false;
        $.ajax({
            url : "/campus/getTargetOne",
            data : {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val()
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                flag = result.flag;
            }
        });

        //해당년도 데이터 조회해서 없을경우(true) 데이터 입력
        if(flag) {
            $.ajax({
                url : "/campus/setTargetInsert",
                data : {
                    targetYear : $("#targetYear").val(),
                    targetCode : $("#loginId").val()+$("#targetYear").val(),
                    loginId : $("#loginId").val(),
                    empSeq : $("#empSeq").val()
                },
                type : "post",
                dataType : "json",
                async : false,
                success : function(result){
                    alert("년도 저장이 완료되었습니다.");
                    window.close();
                    opener.window.location.reload();
                },
                error : function() {
                    alert("데이터 저장 중 에러가 발생했습니다.");
                    window.close();
                }
            });
        }else {
            alert("해당 년도는 이미 등록되어 있습니다.");
        }
    }
}
