var crmReg = {

    fn_defaultScript : function (){

        var data = {
            cmGroupCode : "CRM_ATTRACT_CD",
        }
        var crmAttCd = customKendo.fn_customAjax("/common/commonCodeList", data);
        crmAttCd = crmAttCd.rs;

        customKendo.fn_dropDownList("crmAtt", crmAttCd, "CM_CODE_NM", "CM_CODE", 2);

        $("#crmClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text : "기업", value : "기업" },
                {text : "기관", value : "기관" },
                {text : "기타", value : "기타" }
            ],
            valuePrimitive: true
        });

        customKendo.fn_textBox(["crmNm", "crmCeo", "crmNo", "email"]);

        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        crmReg.fn_setData()
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

        var crmSpecItem = "";
        $("input[name='crmSpecItem']").each(function(){
            if($(this).is(":checked")){
                crmSpecItem += $(this).val()+",";
            }
        });

        if(crmSpecItem == ""){
            alert("특화아이템 해당 분야를 선택해주세요.");
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
            crmAtt : $("#crmAtt").val(),
            crmAttNm : $("#crmAtt").data("kendoDropDownList").text(),
            crmClass : $("#crmClass").val(),
            crmClassNm : $("#crmClass").data("kendoDropDownList").text(),
            crmSpecItem : crmSpecItem,
            crmNm : $("#crmNm").val(),
            crmCeo : $("#crmCeo").val(),
            crmNm : $("#crmNm").val(),
            email : $("#email").val()
        }

        console.log(parameters);
    }
}