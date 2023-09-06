var crmReg = {

    fn_defaultScript : function (){
        customKendo.fn_textBox(["crmNm", "crmCeo", "crmNo", "email","telNum", "phNum"
                                ,"fax", "crmEstNo", "post", "addr"
                                ,"crmOcc", "crmEvent"]);

        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());

        if($("#crmSn").val() != null && $("#crmSn").val() != ""){
            tabStrip.enable(tabStrip.tabGroup.children().eq(0));
        }

        if($("#crmSn").val() != null && $("#crmSn").val() != ""){
            crmReg.fn_setData()
        }
    },

    fn_setData: function (){
        var data = {
            crmSn : $("#crmSn").val()
        }

        $.ajax({
            url : "/crm/getCrmInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                var file = rs.fileInfo;
                var rs = rs.data;

                $("#crmAtt").data("kendoDropDownList").value(rs.CRM_ATT);
                $("#crmCeo").val(rs.CRM_CEO);
                $("#crmClass").data("kendoDropDownList").value(rs.CRM_CLASS);
                $("#crmNm").val(rs.CRM_NM);
                $("#crmNo").val(rs.CRM_NO);
                $("#email").val(rs.CRM_EMAIL);
                $("#telNum").val(rs.TEL_NUM);
                $("#phNum").val(rs.PH_NUM);
                $("#fax").val(rs.FAX);
                $("#crmEstNo").val(rs.CRM_EST_NO);
                $("#post").val(rs.POST);
                $("#addr").val(rs.ADDR);
                $("#crmOcc").val(rs.CRM_OCC);
                $("#crmEvent").val(rs.CRM_EVENT);
                $("#homepage").val(rs.HOMEPAGE);
                $("#crmProd").val(rs.CRM_PROD);

                if(rs.STAT == null || rs.CRM_STAT == ""){
                    rs.CRM_STAT = 1;
                }
                $("#crmStat").data("kendoDropDownList").value(rs.CRM_STAT);
                // file 정보 조회해서 뿌려줘야함
                $("#crmFileText").text(file.crmFile[0].file_org_name + "." + file.crmFile[0].file_ext);
                $("#bnCpText").text(file.bnCp[0].file_org_name + "." + file.bnCp[0].file_ext);
                $("#crmLicsText").text(file.crmLics[0].file_org_name + "." + file.crmLics[0].file_ext);


                console.log(file);
            }
        });
    },

    fn_save : function (){

        if($("#crmAtt").val() == null || $("#crmAtt").val() == ""){
            alert("고객 유치경로를 선택해주세요.");
            return false;
        }

        if($("crmNo").val() == ""){
            alert("사업자 번호를 입력해주세요.");
            return false;
        }

        if($("email").val() == ""){
            alert("이메일을 입력해주세요.");
            return false;
        }

        var parameters = {
            crmNm : $("#crmNm").val(),
            crmCeo : $("#crmCeo").val(),
            crmNm : $("#crmNm").val(),
            email : $("#email").val(),
            telNum : $("#telNum").val(),
            phNum : $("#phNum").val(),
            fax : $("#fax").val(),
            crmEstNo : $("#crmEstNo").val(),
            post : $("#post").val(),
            addr : $("#addr").val(),
            crmOcc : $("#crmOcc").val(),
            crmEvent : $("#crmEvent").val()
        }

        $.ajax({
            url : "/crm/setCrmInfo",
            data : parameters,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                var rs = rs.params;


                alert("저장되었습니다.");

                window.location.href="/crm/pop/regCrmPop.do?crmSn=2";
            }
        });
    }
}