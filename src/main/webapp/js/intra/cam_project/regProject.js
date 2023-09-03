var regPrj = {


    global : {

    },


    fn_defaultScript : function (setParameters) {
        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }

        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        var busnDDL = $("#busnClass").data("kendoDropDownList");
        busnDDL.bind("change", regPrj.fn_busnDDLChange);

        customKendo.fn_textBox(["pjtNm", "expAmt", "contLoc", "deptName", "empName"]);

        customKendo.fn_datePicker("consultDt", "depth", "yyyy-MM-dd", new Date());

        if(setParameters != null){
            regPrj.fn_setData(setParameters);
        }

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());

        // tabStrip.enable(tabStrip.tabGroup.children().eq(0));



    },

    fn_busnDDLChange: function(e){
        var value = this.value();

        if(value == "D"){
            $("#vEngi").css("display", "");
            $("#commFileHtml").css("display", "");
        } else {
            $("#vEngi").css("display", "none");
            $("#commFileHtml").css("display", "none");
        }
    },

    fn_save:function (){

        var data = {
            pjtNm : $("#pjtNm").val(),
            expAmt : regPrj.uncomma($("#expAmt").val()),
            contLoc : $("#contLoc").val(),
            deptName : $("#deptName").val(),
            empName : $("#empName").val(),
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            busnClass : $("#busnClass").val(),
            busnNm : $("#busnClass").data("kendoDropDownList").text(),
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            contDt : $("#consultDt").val()
        }

        if(data.busnNm == "D"){
            data.menuCd = "engn";
        }


        $.ajax({
            url : "/project/setProject",
            type : 'POST',
            data : data,
            dataType : "json",
            async : false,
            success : function(rs){
                opener.parent.camPrj.gridReload();
                window.close();
            }
        });
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    fn_mod : function(){
        alert("개발중");
    },

    fn_setData : function (p) {

        console.log(p)
        var busnClass = $("#busnClass").data("kendoDropDownList")
        busnClass.value(p.BUSN_CLASS);
        if(p.BUSN_CLASS == "D"){
            $("#vEngi").css("display", "");
            $("#commFileHtml").css("display", "");
        } else {
            $("#vEngi").css("display", "none");
            $("#commFileHtml").css("display", "none");
        }
        busnClass.wrapper.hide();
        var pjtCode = "";
        if(p.PJT_CD != null){
            pjtCode = " (" + p.PJT_CD + ")";
        }
        console.log(p);
        $("#pjtTitle").text("프로젝트 수정 - " + p.BUSN_NM + pjtCode);
        $("#pjtNm").val(p.PJT_NM);
        $("#expAmt").val(regPrj.comma(p.EXP_AMT));
        $("#contLoc").val(p.CONT_LOC);
        $("#deptName").val(p.DEPT_NAME);
        $("#empName").val(p.EMP_NAME);
        $("#deptSeq").val(p.DEPT_SEQ);
        $("#empSeq").val(p.EMP_SEQ);
        $("#consultDt").val(regPrj.fn_dateTimeToString(p.CONSULT_DT));
        $("#pjtStep").val(p.PJT_STEP);
        $("#pjtStepNm").val(p.PJT_STEP_NM);
        $("#crmCd").val(p.CRM_CD);
        $("#crmLoc").val(p.CRM_LOC);
        $("#crmNm").val(p.CRM_NM);
        $("#crmPost").val(p.POST);
        $("#crmAddr").val(p.ADDR);
        $("#crmProd").val(p.CRM_PROD);
        $("#crmCeo").val(p.CRM_CEO);
        $("#crmFax").val(p.CRM_FAX);
        $("#crmCallNum").val(p.TEL_NUM);
        $("#crmReqMem").val(p.CRM_CEO);
        $("#crmPhNum").val(p.PH_NUM);
        $("#crmMail").val(p.EMAIL);
        $("#contEtc").val(p.CONT_ETC);

        $("#modBtn").css("display", "");
        $("#saveBtn").css("display", "none");

        var busnName = "";
        var project = "";
        if(p.BUSN_NAME != "" && p.BUSN_NAME != null && p.BUSN_NAME != undefined){
            busnName = p.BUSN_NAME;
        }

        if(p.PROJECT_CD != "" && p.PROJECT_CD != null){
            project = "(" + p.PROJECT + ") ";
        }
        var title =  project + busnName + " 출장지 : " + p.VISIT_LOC_SUB;
        if(p.VISIT_LOC_SUB != null && p.VISIT_LOC_SUB != ''){
            $("#bustripReq").val(title);
            $("#hrBizReqResultId").val(p.HR_BIZ_REQ_RESULT_ID);
        }

    },


    fn_dateTimeToString : function (dateTime){
        var date = new Date(dateTime);
        var yyyy = date.getFullYear();
        var mm = date.getMonth()+1;
        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
        var dd = date.getDate();
        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
        return yyyy+'-'+mm+'-'+dd;
    },

    fn_popBustrip : function (){
        var url = "/bustrip/pop/viewBustripList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


}