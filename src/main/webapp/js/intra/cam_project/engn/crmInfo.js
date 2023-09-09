var crmInfo = {

    fn_defaultScript : function(){
        customKendo.fn_textBox(["bustripReq", "crmCd", "crmProd",
            "crmCeo", "crmPost", "crmAddr", "crmPhNum", "crmLoc", "crmFax",
            "crmCallNum", "crmHp", "crmMail", "crmNm", "crmReqMem"]);
    },

    fn_save : function (){
        var data = {
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val(),
            crmCd : $("#crmCd").val(),
            crmNm : $("#crmNm").val(),
            crmMemSn : $("#crmMemSn").val(),
            crmCeo : $("#crmCeo").val(),
            crmMail : $("#crmMail").val(),
            crmReqMem : $("#crmReqMem").val(),
            step : $("#step").val(),
            stepColumn : $("#stepColumn").val(),
            nextStepColumn : $("#nextStepColumn").val(),
            stepValue : $("#stepValue").val(),
            nextStepValue : $("#nextStepValue").val()
        }


        $.ajax({
            url : "/project/engn/setCrmInfo",
            data: data,
            type : "post",
            dataType : "json",
            success : function(rs){
                alert("저장되었습니다.");
            }
        });
    },

    // 업체정보 조회
    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popCamCrmMemList: function (){
        var key =  $("#crmSn").val();
        if(key == null || key == ""){
            alert("업체를 선택해주세요.");
            return;
        }
        var url = "/crm/pop/popCrmMemList.do?crmSn=" + key;
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }


}