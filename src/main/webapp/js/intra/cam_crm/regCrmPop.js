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
            tabStrip.enable(tabStrip.tabGroup.children());
            if($("#type").val() == "set"){
                tabStrip.select(1);
            } else {
                tabStrip.select(0);
            }
        }

        if($("#crmSn").val() != null && $("#crmSn").val() != ""){
            crmReg.fn_setData()
        }

        crmSi.fn_defaultScript();
        crmMi.fn_defaultScript();
        crmIndustry.fn_defaultScript();
        crmCert.fn_defaultScript();
        crmA.fn_defaultScript();
        crmMgScale.fn_defaultScript();
        /** TODO. 관심분야 삭제 */
        // crmI.fn_defaultScript();


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
                var tabStrip = $("#tabstrip").data("kendoTabStrip");

                if(rs.SAVE_STAT == "Y"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(1));
                }

                $("#crmAtt").data("kendoDropDownList").value(rs.CRM_ATT);
                $("#crmCeo").val(rs.CRM_CEO);
                $("#crmClass").data("kendoDropDownList").value(rs.CRM_CLASS);

                if(rs.CRM_CLASS == "기타"){
                    $("#boxA").css("display", "none");
                    $("#boxB").css("display", "");
                    $("#crmSubClassText").val(rs.CRM_CLASS_SUB_TEXT);
                } else {
                    if(rs.CRM_CLASS == "기관"){
                        var dataSource2 = [
                            {text : "중앙부처", value : "중앙부처" },
                            {text : "지자체", value : "지자체" },
                            {text : "기술지원 및 진흥기관", value : "기술지원 및 진흥기관" },
                            {text : "교육기관", value : "교육기관" },
                            {text : "금융지원기관", value : "금융지원기관" },
                            {text : "경제진흥기관", value : "경제진흥기관" },
                            {text : "협회", value : "협회" },
                            {text : "대학", value : "대학" },
                            {text : "연구소(원)", value : "연구소(원)" },
                            {text : "기타", value : "기타" }
                        ]

                        $("#crmSubClass").data("kendoDropDownList").setDataSource(dataSource2);
                    } else if(rs.CRM_CLASS == "기업"){

                        var dataSource2= [
                            {text : "고객사", value : "고객사" },
                            {text : "협력사", value : "협력사" }
                        ]
                        $("#crmSubClass").data("kendoDropDownList").setDataSource(dataSource2);
                    }
                    $("#boxA").css("display", "");
                    $("#boxB").css("display", "none");
                    $("#crmSubClass").data("kendoDropDownList").value(rs.CRM_CLASS_SUB);
                }

                $("#crmNm").val(rs.CRM_NM);
                $("#crmNo").val(rs.CRM_NO);
                $("#email").val(rs.EMAIL);
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
                if(rs.BUY_CL == "Y"){
                    $("#buyCl").prop("checked", true);
                }
                if (rs.MI_CL == "Y"){
                    $("#miCl").prop("checked", true);
                }

                if(rs.CRM_STAT == null || rs.CRM_STAT == ""){
                    rs.CRM_STAT = 1;
                }
                $("#crmStat").data("kendoDropDownList").value(rs.CRM_STAT);

                $("#etc").val(rs.ETC);
                if(file.bnCp[0] != null && file.bnCp[0] != ""){
                    $("#bnCpText").text(file.bnCp[0].file_org_name + "." + file.bnCp[0].file_ext);
                }
                if(file.crmLics[0] != 0 && file.crmLics[0] != null){
                    $("#crmLicsText").text(file.crmLics[0].file_org_name + "." + file.crmLics[0].file_ext);

                }
                if (file.crmFile[0] != 0 && file.crmFile[0] != null){
                    $("#crmFileText").text(file.crmFile[0].file_org_name + "." + file.crmFile[0].file_ext);
                }
            }
        });
    },

    fn_save : function (){

        if($("crmNo").val() == ""){
            alert("사업자 번호를 입력해주세요.");
            return false;
        }

        if($("#crmNo").val().replace(/-/g, "").length != 10){
            alert("사업자 번호 길이가 맞지 않습니다.\n확인해주세요.");
            return;
        }

        // if($("email").val() == ""){
        //     alert("이메일을 입력해주세요.");
        //     return false;
        // }

        var parameters = {
            crmNm : $("#crmNm").val(),
            crmCeo : $("#crmCeo").val(),
            crmNo : $("#crmNo").val(),
            email : $("#email").val(),
            telNum : $("#telNum").val(),
            phNum : $("#phNum").val(),
            fax : $("#fax").val(),
            crmEstNo : $("#crmEstNo").val(),
            post : $("#post").val(),
            addr : $("#addr").val(),
            crmOcc : $("#crmOcc").val(),
            crmEvent : $("#crmEvent").val(),
            data : "main",
        }

        var formData = new FormData();
        if($("#crmSn").val() != null && $("#crmSn").val() != ""){
            formData.append("crmSn", $("#crmSn").val());
        }
        formData.append("crmNm", parameters.crmNm);
        formData.append("crmNo", parameters.crmNo);
        formData.append("crmCeo", parameters.crmCeo);
        formData.append("email", parameters.email);
        formData.append("telNum", parameters.telNum);
        formData.append("phNum", parameters.phNum);
        formData.append("fax", parameters.fax);
        formData.append("crmEstNo", parameters.crmEstNo);
        formData.append("post", parameters.post);
        formData.append("addr", parameters.addr);
        formData.append("crmOcc", parameters.crmOcc);
        formData.append("crmEvent", parameters.crmEvent);
        formData.append("data", "main");

        $.ajax({
            url : "/crm/crmReqCheck",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){
                if(result.chk > 0 && ($("#crmSn").val() == null || $("#crmSn").val() == "")){
                    alert("이미 등록된 업체입니다.");
                    return;
                } else {
                    $.ajax({
                        url : "/crm/setCrmInfo",
                        data : formData,
                        type : "post",
                        dataType : "json",
                        contentType: false,
                        processData: false,
                        enctype : 'multipart/form-data',
                        async : false,
                        success : function(rs){
                            var rs = rs.params;
                            alert("저장되었습니다.");
                            window.location.href="/crm/pop/regCrmPop.do?crmSn=" + rs.crmSn;
                        }
                    });
                }
            }
        });
    }
}