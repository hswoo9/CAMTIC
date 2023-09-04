var bustInfo = {


    fn_defaultScript : function(){
        customKendo.fn_textBox(["bustripReq"]);

        $("#contEtc").kendoTextArea({
            rows: 5,
        });

    },

    fn_popBustrip : function (){
        var url = "/bustrip/pop/viewBustripList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_save : function (){
        var data ={
            contEtc : $("#contEtc").val(),
            hrBizReqResultId : $("#hrBizReqResultId").val(),
            bustripReq : $("#bustripReq").val(),
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val()
        }

        $.ajax({
            url : "/project/engn/setBustInfo",
            data : data,
            type : "post",
            dataType : "json",
            success: function(rs){
                alert("저장되었습니다.");
            }
        });


        console.log("출장 정보");
    }
}