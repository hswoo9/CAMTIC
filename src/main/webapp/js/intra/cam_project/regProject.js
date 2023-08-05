var regPrj = {


    global : {

    },


    fn_defaultScript : function (setParameters) {
        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        var busnDDL = $("#busnClass").data("kendoDropDownList");
        busnDDL.bind("change", regPrj.fn_busnDDLChange);

        customKendo.fn_textBox(["pjtNm", "expAmt", "contLoc", "bustripReq", "H", "I", "J",
                                "K", "L", "M", "N", "O", "P", "Q", "R",
                                "S", "T", "V", "W", "X", "Y", "Z",
                                "deptName", "empName"]);

        customKendo.fn_datePicker("consultDt", "depth", "yyyy-MM-dd", new Date());

        $("#contEtc").kendoTextArea({
            rows:5
        });


        if(setParameters != null){
            regPrj.fn_setData(setParameters);
        }
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
            expAmt : $("#expAmt").val(),
            contLoc : $("#contLoc").val(),
            deptName : $("#deptName").val(),
            empName : $("#empName").val(),
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            consultDt : $("#consultDt").val(),
            busnClass : $("#busnClass").val(),
            busnNm : $("#busnClass").data("kendoDropDownList").text(),
            contEtc : $("#contEtc").val(),
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val()
        }
        var formData = new FormData();
        formData.append("pjtNm", data.pjtNm);
        formData.append("expAmt", data.expAmt);
        formData.append("contLoc", data.contLoc);
        formData.append("deptName", data.deptName);
        formData.append("empName", data.empName);
        formData.append("deptSeq", data.deptSeq);
        formData.append("empSeq", data.empSeq);
        formData.append("consultDt", data.consultDt);
        formData.append("busnClass", data.busnClass);
        formData.append("busnNm", data.busnNm);
        formData.append("contEtc", data.contEtc);
        formData.append("pjtStep", data.pjtStep);
        formData.append("pjtStepNm", data.pjtStepNm);

        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("projectFile", fCommon.global.attFiles[i]);
            }
        }


        $.ajax({
            url : "/project/setProject",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(){

                opener.parent.camPrj.gridReload();
                window.close();
            }
        });
    },

    fn_mod : function(){

    },

    fn_setData : function (p) {
        console.log(p);

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
        $("#pjtTitle").text("프로젝트 수정 - " + p.BUSN_NM + pjtCode);
        $("#pjtNm").val(p.PJT_NM);
        $("#expAmt").val(camPrj.comma(p.EXP_AMT));
        $("#contLoc").val(p.CONT_LOC);
        $("#deptName").val(p.DEPT_NAME);
        $("#empName").val(p.EMP_NAME);
        $("#deptSeq").val(p.DEPT_SEQ);
        $("#empSeq").val(p.EMP_SEQ);
        $("#consultDt").val(regPrj.fn_dateTimeToString(p.CONSULT_DT));
        $("#pjtStep").val(p.PJT_STEP);
        $("#pjtStepNm").val(p.PJT_STEP_NM);

        $("#modBtn").css("display", "");
        $("#saveBtn").css("display", "none");
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
    }


}