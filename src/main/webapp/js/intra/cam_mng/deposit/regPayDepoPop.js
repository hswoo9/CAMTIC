var regPayDepo = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
        setFlag : true,
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("payIncpDe", "month", "yyyy-MM-dd", new Date());


        $("#payIncpDe").change(function(){
            if($("#gubun").data("kendoDropDownList").value() == "b" && $("#depoStat").data("kendoDropDownList").value() == "2"){
                $("#appDe").val($("#payIncpDe").val());
            }
        });

        if($("#appDe").val() != null && $("#getDelvDe").val() != ""){
            $("#appDe").val($("#getDelvDe").val());
        }


        customKendo.fn_textBox(["pjtNm", "depoTitle", "accNm", "accNo", "bnkNm", "budgetNm", "depoAmt", "depoManager", "payDepoReqUser", "email", "crmNm"]);

        $("#eviType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "세금계산서", value: 1 },
                { text: "계산서", value: 2 },
                { text: "신용카드", value: 3 },
                { text: "현금영수증", value: 4 },
                { text: "미발행", value: 5 }
            ],
            index: 0
        });

        if($("#crmMemTempNm").val() != null && $("#crmMemTempNm").val() != ""){
            $("#depoManager").val($("#crmMemTempNm").val());
        }

        if($("#getPjtAmt").val() != null && $("#getPjtAmt").val() != ""){
            $("#depoAmt").val(comma((Number($("#getPjtAmt").val() * 1.1) - Number($("#totDepoAmt").val())).toString().split(".")[0]));
        }

        $("#depoCont").kendoTextArea({
            rows: 5,
        });

        $("#depoStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "미입금", value: 1 },
                { text: "입금완료", value: 2 },
            ],
            index: 0
        });

        $("#gubun").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "청구", value: "a" },
                { text: "영수", value: "b"},
            ],
            index: 0,
            change : function (e){
                if(this.value() == "b"){
                    $("#depoStat").data("kendoDropDownList").value(2);
                    $("#thPayIncpDeText").text("입금일자");
                    $("#appDe").val($("#payIncpDe").val());
                } else if(this.value() == "a"){
                    $("#depoStat").data("kendoDropDownList").value(1);
                    $("#thPayIncpDeText").text("입금예정일");
                }
            }
        })

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[type='checkbox']").prop("checked", true);
            }else{
                $("input[type='checkbox']").prop("checked", false);
            }
        });

        $("#taxChGubun").val(opener.parent.$("#taxGubun").val());

        if($("#taxChGubun").val() == "1"){
            $("#eviType").data("kendoDropDownList").value(1);
        } else if($("#taxChGubun").val() == "2"){
            $("#eviType").data("kendoDropDownList").value(2);
        } else if($("#taxChGubun").val() == "3"){
            $("#eviType").data("kendoDropDownList").value(5);
        }

        if($("#payDepoSn").val() != ""){
            regPayDepo.fn_setData();
            $("#payDepReqUserTh").css("display", "");
        }

        if($("#payDepoSn").val() == ""){
            regPayDepo.fn_manageSetData();
        }

        if($("#paramPjtSn").val() != "" && $("#payDepoSn").val() == ""){
            regPayDepo.fn_setProjectData();
        }

        if(opener.parent.$("#taxGubun").val() == "2"){
            $("#eviType").data("kendoDropDownList").value(2)
        } else if(opener.parent.$("#taxGubun").val() == "3"){
            $("#eviType").data("kendoDropDownList").value(5)
        }
    },

    fn_manageSetData : function (){
        var data = {
            frPjtSn : $("#paramPjtSn").val()
        }

        $.ajax({
            url : "/mng/getManageDepo",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                var rs = rs.rsult;
                if(rs == null){ regPayDepo.global.setFlag = false; return; }

                $("#pjtNm").val(rs.PJT_NM);
                $("#pjtCd").val(rs.PJT_CD);
                $("#budgetNm").val(rs.BUDGET_NM);
                $("#budgetSn").val(rs.BUDGET_SN);

                $("#depoTitle").val("입금신청 - " + rs.PJT_NM);

                var data = {
                    pjtCd : rs.PJT_CD
                };

                var result = customKendo.fn_customAjax("/project/getBankData", data);
                var rs2 = result.data;

                if(rs2 != null){
                    regPayDepo.fn_setBankInfo(rs2.TR_CD, rs2.TR_NM, rs2.BA_NB, rs2.DEPOSITOR, rs2.JIRO_NM);
                }
            }
        });
    },

    fn_setData: function (){
        var data = {
            payDepoSn : $("#payDepoSn").val()
        }

        $.ajax({
            url : "/pay/getPayDepoData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                var rs = rs.data;

                $("#appDe").val(new Date(rs.REG_DT + 3240 * 10000).toISOString().split("T")[0]);
                $("#payIncpDe").val(rs.PAY_INCP_DE);

                if(rs.AFT_PJT_NM != null && rs.AFT_PJT_NM != ""){
                    $("#pjtSn").val(rs.AFT_PJT_SN);
                    $("#pjtNm").val(rs.AFT_PJT_NM);
                }else{
                    $("#pjtNm").val(rs.PJT_NM);
                    $("#pjtSn").val(rs.PJT_SN);
                }
                $("#pjtCd").val(rs.PJT_CD);
                $("#budgetNm").val(rs.BUDGET_NM);
                $("#budgetSn").val(rs.BUDGET_SN);
                $("#depoTitle").val(rs.DEPO_TITLE);
                $("#gubun").data("kendoDropDownList").value(rs.GUBUN);
                $("#depoStat").data("kendoDropDownList").value(rs.DEPO_STAT);
                $("#depoAmt").val(regPayDepo.comma(rs.DEPO_AMT));
                $("#depoManager").val(rs.DEPO_MANAGER);
                $("#depoCont").val(rs.DEPO_CONT);
                $("#accNm").val(rs.ACC_NM);
                $("#bnkSn").val(rs.BNK_SN);
                $("#accNo").val(rs.ACC_NO);
                $("#bnkNm").val(rs.BNK_NM);
                $("#appDe").val(rs.APP_DE);
                $("#email").val(rs.EMAIL);
                $("#eviType").data("kendoDropDownList").value(rs.EVI_TYPE);
                $("#crmNm").val(rs.CRM_NM);
                $("#crmSn").val(rs.CRM_SN);
                $("#regNo").val(rs.REG_NO);
                $("#payDepoReqUser").val(rs.DEPO_EMP_NAME);

                $("#taxChGubun").val(rs.TAX_CH_GUBUN ? rs.TAX_CH_GUBUN : opener.parent.$("#taxGubun").val());

                if(rs != null && rs != '' && rs.file_org_name != null && rs.file_org_name != '' && rs.file_org_name != undefined){
                    $("#fileName").text(rs.file_org_name + "." +rs.file_ext);
                    $("#viewerBtn").css("display", "");
                    $("#viewerBtn").attr("onclick", "fileViewer(\""+rs.file_path+ "\", \""+rs.file_uuid+ "\");")
                }


                if(rs.APPR_STAT == 'N'){
                    $("#apprBtn").css("display", "");
                }else{
                    $("#saveBtn").css("display", "none");
                }

                if($("#auth").val() == "user"){
                    $("#incpBtn").css("display", "");
                }

                if(rs.PAY_INCP_SN != null){
                    if(rs.DOC_STATUS == "0" || rs.DOC_STATUS == "30" || rs.DOC_STATUS == "40"){
                        $("#incpBtn").removeAttr();
                        $("#incpBtn").attr("onclick", "incomeList.fn_incomePopup(\'\', \'" + rs.PAY_INCP_SN + "\')");
                    } else {
                        $("#incpBtn").css("display", "none");
                    }
                }
            }
        })
    },

    fn_setProjectData: function (){
        console.log("fn_setProjectData");
        var data = {
            pjtSn : $("#paramPjtSn").val()
        }

        $.ajax({
            url : "/project/getProjectData",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                var rs = rs.data;
                console.log(rs);

                if(rs.BUDGET_SN){
                    $("#pjtSn").val($("#pjtSn").val() != "" ? $("#pjtSn").val() : rs.PJT_SN);
                    $("#pjtNm").val($("#pjtNm").val() != "" ? $("#pjtNm").val() : rs.PJT_NM);
                    $("#pjtCd").val($("#pjtCd").val() != "" ? $("#pjtCd").val() : rs.PJT_CD);
                    $("#depoTitle").val("입금신청 - " + rs.PJT_NM);
                } else {
                    $("#depoTitle").val("입금신청 - ");
                }

                if(rs.PJT_STEP.substring(0, 1) == "E"){
                    $("#crmNm").val($("#crmNm").val() != "" ? $("#crmNm").val() : rs.CRM_NM);
                    $("#crmSn").val($("#crmSn").val() != "" ? $("#crmSn").val() : rs.CRM_SN);
                }

                if($("#crmSn").val() != null && $("#crmSn").val() != ""){
                    var data= {
                        crmSn : $("#crmSn").val()
                    }
                    var result = customKendo.fn_customAjax("/crm/getCrmData", data);

                    var rsFile = result.rsFile;
                    var result = result.rs;

                    if(rsFile != null && rsFile != "" && rsFile != "undefined" && rsFile != undefined) {
                        $("#fileSn").val(rsFile.FILE1_NO);
                        $("#fileName").text(rsFile.FILE1_NAME);

                        var fileExt = rsFile.FILE1_NAME.toString().split(".")[rsFile.FILE1_NAME.toString().split(".").length - 1];
                        console.log(rsFile)
                        if(fileExt == "pdf" || fileExt == "PDF" || fileExt == "jpg" || fileExt == "JPG" || fileExt == "png" || fileExt == "PNG"){
                            $("#viewerBtn").css("display", "");

                            $("#viewerBtn").attr("onclick", "regPayDepo.fileViewer(\""+ rsFile.FILE1_PATH + "\");")
                        }
                    }
                    $("#crmSn").val(result.CRM_SN);
                    $("#crmNm").val(result.CRM_NM);
                    $("#regNo").val(result.CRM_NO);
                }
            }
        });
    },

    fn_save : function (){
        var parameters = {
            appDe : $("#appDe").val(),
            payIncpDe : $("#payIncpDe").val(),
            pjtNm : $("#paramPjtNm").val(),
            pjtSn : $("#paramPjtSn").val(),
            pjtCd: $("#pjtCd").val(),
            aftPjtNm : $("#pjtNm").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
            depoManager : $("#depoManager").val(),
            depoTitle : $("#depoTitle").val(),
            depoCont : $("#depoCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),

            crmNm : $("#crmNm").val(),
            crmSn : $("#crmSn").val(),
            eviType : $("#eviType").val(),
            email : $("#email").val(),
            taxChGubun : $("#taxChGubun").val(),
            depoAmt : regPayDepo.uncomma($("#depoAmt").val()),
            gubun : $("#gubun").val(),
            depoStat : $("#depoStat").val(),
            regNo : $("#regNo").val(),

            regEmpSeq : $("#regEmpSeq").val()
        };

        if(!regPayDepo.global.setFlag){
            parameters.aftPjtSn = $("#pjtSn").val();
        }

        if($("#payDepoSn").val() != ""){
            parameters.payDepoSn = $("#payDepoSn").val();
        }

        if(parameters.pjtSn == ""){
            alert("사업을 선택해주세요.");
            return;
        }

        if(parameters.budgetSn == ""){
            alert("비목을 선택해주세요.");
            return;
        }

        if(parameters.depoAmt == ""){
            alert("입금액 선택해주세요.");
            return;
        }

        var fd = new FormData();
        for (var key in parameters) {
            fd.append(key, parameters[key]);
        }

        if($("#fileSn").val() != ""){
            fd.append("fileSn", $("#fileSn").val());
        } else {
            if($("#files")[0].files.length == 1){
                fd.append("files", $("#files")[0].files[0]);
            }
        }



        $.ajax({
            url : "/pay/setPayDepo",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                console.log(rs);
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    let status = "";

                    location.href="/pay/pop/regPayDepoPop.do?payDepoSn=" + rs.params.payDepoSn + "&pjtSn=" + parameters.pjtSn;

                    opener.parent.paymentList.gridReload();
                }
            }
        });
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regPayDepo.global.crmSnId = crmSnId;
        regPayDepo.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do?status=payDepo";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regPay.global.crmSnId).val($("#crmSn").val())
        $("#" + regPay.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_calCost: function(obj){

        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){

            $("#vatCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Math.round(Number(regPay.uncomma($("#totCost" + index).val())) * 100 / 110)));
            $("#supCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regPayDepo.comma(Number(regPayDepo.uncomma($("#totCost" + index).val())) - Number(regPay.uncomma($("#vatCost" + index).val()))));
        }

        regPayDepo.inputNumberFormat(obj);
    },

    inputNumberFormat : function (obj){
        obj.value = regPayDepo.comma(regPayDepo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_projectPop : function (type){

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }

        /** 추후 temp변수명 수정 예정 */
        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=N&status=incp";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_setBankInfo : function(trCd, trNm, baNb, depositor, jiroNm){
        $("#bnkSn").val(trCd);
        $("#accNm").val(trNm);
        $("#accNo").val(baNb);
        $("#bnkNm").val(jiroNm);
    },

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }
        var popup = window.open(hostUrl + path, name, option);
    },

}
