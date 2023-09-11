var crmInfo = {

    fn_defaultScript : function(){
        customKendo.fn_textBox(["bustripReq", "crmSn", "crmProd",
            "crmCeo", "crmPost", "crmAddr", "crmPhNum", "crmLoc", "crmFax",
            "crmCallNum", "crmHp", "crmMail", "crmNm", "crmReqMem"]);


        crmInfo.fn_setData();

    },

    fn_setData : function (){

        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        $.ajax({
            url : "/project/engn/getCrmInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.rs;

                if(rs != null){
                    $("#crmSn").val(rs.CRM_SN);
                    $("#crmLoc").val(rs.ADDR);
                    $("#crmNm").val(rs.CRM_NM);
                    $("#crmProd").val(rs.CRM_PROD);
                    $("#crmCeo").val(rs.CRM_CEO);
                    $("#crmPost").val(rs.POST);
                    $("#crmAddr").val(rs.ADDR);
                    $("#crmCallNum").val(rs.TEL_NUM);
                    $("#crmFax").val(rs.FAX);
                    $("#crmReqMem").val(rs.CRM_MEM_NM);
                    $("#crmMemSn").val(rs.CRM_MEM_SN);
                    $("#crmPhNum").val(rs.CRM_MEM_PHN);
                    $("#crmHp").val(rs.HOMEPAGE);
                    $("#crmMail").val(rs.CRM_MEM_EMAIL);
                }

            }
        })
    },

    fn_save : function (){

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val(),
            crmSn : $("#crmSn").val(),
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
            data: parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                alert("저장되었습니다.");

                location.reload();
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