var crmInfo = {

    fn_defaultScript : function(){
        customKendo.fn_textBox(["bustripReq", "crmSn", "crmProd",
            "crmCeo", "crmPost", "crmAddr", "crmPhNum", "crmLoc", "crmFax",
            "crmCallNum", "crmHp", "crmMail", "crmNm", "crmReqMem"]);
        customKendo.fn_textArea(["crmEtc"]);

        crmInfo.fn_setData();

    },

    fn_setData : function (){

        var parameters = {
            pjtSn : $("#pjtSn").val(),
        }

        const result = customKendo.fn_customAjax("/project/engn/getCrmInfo", parameters);
        const rs = result.rs;
        console.log(rs);
        if(rs.PJT_STEP != "E"){
            $("#crmSn").val(rs.CRM_SN);
            $("#crmLoc").val(rs.ADDR);
            $("#crmNm").val(rs.CRM_NM);
            $("#crmProd").val(rs.CRM_PROD);
            $("#crmCeo").val(rs.CRM_CEO);
            $("#crmPost").val(rs.POST);
            $("#crmAddr").val(rs.ADDR);
            $("#crmCallNum").val(rs.TEL_NUM);
            $("#crmFax").val(rs.FAX);
            $("#crmMemSn").val(rs.CRM_MEM_SN);

            /** 의뢰인, 전화번호, 이메일은 프로젝트 한정으로 수정 가능함 */
            if(rs.CRM_MEM_TEMP_NM != null || rs.CRM_MEM_TEMP_NM != ""){
                $("#crmReqMem").val(rs.CRM_MEM_TEMP_NM);
            }else{
                $("#crmReqMem").val(rs.CRM_MEM_NM);
            }

            if(rs.CRM_MEM_TEMP_PH != null || rs.CRM_MEM_TEMP_PH != ""){
                $("#crmPhNum").val(rs.CRM_MEM_TEMP_PH);
            }else{
                $("#crmPhNum").val(rs.CRM_MEM_PHN);
            }

            if(rs.CRM_MEM_TEMP_MAIL != null || rs.CRM_MEM_TEMP_MAIL != ""){
                $("#crmMail").val(rs.CRM_MEM_TEMP_MAIL);
            }else{
                $("#crmMail").val(rs.CRM_MEM_EMAIL);
            }

            $("#crmHp").val(rs.HOMEPAGE);
            $("#crmEtc").val(rs.CRM_ETC);
        }else{
            const crmInfo = customKendo.fn_customAjax("/crm/getCrmInfo", {crmSn: rs.CONT_LOC_SN}).data;

            if(crmInfo == null){
                return;
            }

            $("#crmSn").val(crmInfo.CRM_SN);
            $("#crmLoc").val(crmInfo.CRM_LOC);
            $("#crmNm").val(crmInfo.CRM_NM);
            $("#crmProd").val(crmInfo.CRM_PROD);
            $("#crmCeo").val(crmInfo.CRM_CEO);
            $("#crmPost").val(crmInfo.POST);
            if(crmInfo.POST != null && crmInfo.POST != ""){
                $("#crmAddr").val("[" + crmInfo.POST + "] " + crmInfo.ADDR);
            } else {
                $("#crmAddr").val("");
            }
            $("#crmCallNum").val(crmInfo.TEL_NUM);
            $("#crmFax").val(crmInfo.FAX);
            $("#crmHp").val(crmInfo.HOMEPAGE);
        }
    },

    fn_save : function (){
        if($("#crmEtc").val() == ""){
            alert("상담내용을 작성하세요."); return;
        }

        var parameters = {
            pjtSn : $("#pjtSn").val(),
            engnSn : $("#engnSn").val(),
            crmSn : $("#crmSn").val(),
            crmNm : $("#crmNm").val(),
            crmMemSn : $("#crmMemSn").val(),
            crmCeo : $("#crmCeo").val(),

            crmReqMem : $("#crmReqMem").val(),
            crmPhNum : $("#crmPhNum").val(),
            crmMail : $("#crmMail").val(),

            crmEtc : $("#crmEtc").val(),
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
            success : function(){
                alert("저장되었습니다.");
                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + parameters.pjtSn + "&tab=0";
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