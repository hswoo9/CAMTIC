var addCV = {


    fn_defaultScript : function (){

        var kendoTextArr = [
            "crmNm", "crmNo", "ceoNm", "crmTelNum", "post", "addr",
            "crmEvn", "crmOcc", "bankNm", "accNo", "bankMngNm"
        ];
        customKendo.fn_textBox(kendoTextArr);
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_save : function(){
        var parameters = {
            crmNm : $("#crmNm").val(),
            crmNo : $("#crmNo").val().replaceAll("-", ""),
            ceoNm : $("#ceoNm").val(),
            crmTelNum : $("#crmTelNum").val(),
            post : $("#post").val().replaceAll("-", ""),
            addr : $("#addr").val(),
            crmEvn : $("#crmEvn").val(),
            crmOcc : $("#crmOcc").val(),
            bankNm : $("#bankNm").val(),
            accNo : $("#accNo").val(),
            bankMngNm : $("#bankMngNm").val(),
            erpEmpCd : $("#erpEmpCd").val()
        }
        parameters.ip = $("#ip").val();

        if(parameters.crmNm == ""){
            alert("거래처명을 입력해주세요.");
            return;
        }
        if(parameters.crmNo == ""){
            alert("사업자번호을 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/g20/getCrmInfo",
            data : parameters,
            async : false,
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.map != null){
                    alert("등록 요청한 사업자번호로 이미 등록된 거래처가 있습니다. \n 거래처명 : " + rs.map.TR_NM);
                    return;
                } else {
                    $.ajax({
                        url : "/g20/setCrmInfo",
                        data : parameters,
                        type : "post",
                        dataType : "json",
                        success : function(rs){
                            if(rs.code == 200){
                                alert("등록되었습니다.");
                                window.close();
                            } else {
                                alert("오류가 발생하였습니다. \n관리자에게 문의하세요.")
                            }
                        }
                    });
                }
            }
        });




    }
}


function fn_selCrmInfo(rs){
    console.log(rs);

    $("#ceoNm").val(rs.CRM_CEO);
    $("#crmTelNum").val(rs.TEL_NUM);
    $("#post").val(rs.POST);
    $("#addr").val(rs.ADDR);
    $("#crmEvn").val(rs.CRM_EVENT);
    $("#crmOcc").val(rs.CRM_OCC);
    $("#bankNm").val(rs.BANK_NAME);
    $("#accNo").val(rs.ACCOUNTING_NUM);
    $("#bankMngNm").val(rs.ACCOUNTING_HOLDER);
}