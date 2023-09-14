var regPrj = {


    global : {

    },


    fn_defaultScript : function (setParameters) {
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
        }
        var delvMap = customKendo.fn_customAjax("/project/engn/getDelvData", setParameters);

        var delvMap = delvMap.delvMap;


        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }

        var tab0Url = "/intra/cam_project/crmInfo.do";
        var tab1Url = "/intra/cam_project/bustInfo.do";
        var tab2Url = "/intra/cam_project/estInfo.do";
        var tab3Url = "/intra/cam_project/delvInfo.do";
        var tab4Url = "/intra/cam_project/devInfo.do";

        if (setParameters != null && setParameters.PJT_SN != null) {
            tab0Url += "?pjtSn=" + setParameters.PJT_SN;
            tab1Url += "?pjtSn=" + setParameters.PJT_SN;
            tab2Url += "?pjtSn=" + setParameters.PJT_SN;
            tab3Url += "?pjtSn=" + setParameters.PJT_SN;
            tab4Url += "?pjtSn=" + setParameters.PJT_SN;

        }
        if(setParameters != null && setParameters.ENGN_SN != null) {
            tab0Url += "&engnSn=" + setParameters.ENGN_SN;
            tab1Url += "&engnSn=" + setParameters.ENGN_SN;
            tab2Url += "&engnSn=" + setParameters.ENGN_SN;
            tab3Url += "&engnSn=" + setParameters.ENGN_SN;
            tab4Url += "&engnSn=" + setParameters.ENGN_SN;
        }



        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
            select : function (e){
                var tabName = $(e.item).find("> .k-link").text();
                let step = "";
                let stepColumn = "";
                let nextStepColumn = "";
                let stepValue = "";
                let nextStepValue = "";

                if(tabName == "업체정보"){
                    step = "E0";
                    stepColumn = "STEP1";
                    nextStepColumn = "STEP2";
                } else if (tabName == "견적관리"){
                    step = "E1";
                    stepColumn = "STEP2";
                    nextStepColumn = "STEP3";
                } else if (tabName == "수주보고"){
                    step = "E2";
                    stepColumn = "STEP3";
                    nextStepColumn = "STEP4";
                } else if (tabName == "개발계획"){
                    step = "E3";
                    stepColumn = "STEP4";
                    nextStepColumn = "STEP5";
                } else if (tabName == "공정"){
                    step = "E4";
                    stepColumn = "STEP5";
                    nextStepColumn = "STEP6";
                }

                $("#step").val(step);
                $("#stepColumn").val(stepColumn);
                $("#nextStepColumn").val(nextStepColumn);
            },
            dataTextField: "name",
            dataContentUrlField: "url",
            dataSource : [
                {name: "업체정보", url: tab0Url},
                {name: "출장정보", url: tab1Url},
                {name: "견적관리", url: tab2Url},
                {name: "수주보고", url: tab3Url},
                {name: "개발계획", url: tab4Url},
                {name: "공정", url: "#"},
                {name: "납품", url: "#"},
                {name: "결과보고", url: "#"},
                {name: "원가보고", url: "#"},
            ],
        });


        $("#busnLgClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "정부사업", value: "1" },
                { text: "민간사업", value: "2" }
            ],
            index: 0,
            change: function(){
                var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
                if(this.value() == "1"){
                    $("#busnClass").css("display", "");

                    customKendo.fn_dropDownList("busnClass", bcDs.rs.splice(0, 2), "CM_CODE_NM", "CM_CODE");
                }else if (this.value() == "2"){
                    $("#busnClass").css("display", "");

                    customKendo.fn_dropDownList("busnClass", bcDs.rs.splice(2, 3), "CM_CODE_NM", "CM_CODE");
                } else {
                    $("#busnClass").css("display", "none");
                }
                var busnDDL = $("#busnClass").data("kendoDropDownList");
                busnDDL.bind("change", regPrj.fn_busnDDLChange);

            }
        })




        customKendo.fn_textBox(["pjtNm", "expAmt", "contLoc", "deptName", "empName"]);

        customKendo.fn_datePicker("consultDt", "depth", "yyyy-MM-dd", new Date());

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());



        if(setParameters != null){

            if(setParameters.PJT_SN){
                tabStrip.enable(tabStrip.tabGroup.children().eq(0));
                tabStrip.enable(tabStrip.tabGroup.children().eq(1));
                tabStrip.activateTab(tabStrip.tabGroup.children().eq(0));
            }

            setParameters.ENGN_SN;
            regPrj.fn_setData(setParameters);

            if(setParameters.PJT_STEP == "E"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(0));
                tabStrip.enable(tabStrip.tabGroup.children().eq(1));
            }

            if(setParameters.PJT_STEP >= "E0"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(2));
            }

            if(setParameters.PJT_STEP >= "E1"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(3));
            }

            if(setParameters.PJT_STEP >= "E2" && delvMap.DELV_STATUS == "100"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(4));
            }

            if(setParameters.PJT_STEP >= "E3"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(5));
            }

            if(setParameters.PJT_STEP >= "E4"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(6));
            }

            if(setParameters.PJT_STEP >= "E5"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(7));
            }
            
            if(setParameters.PJT_STEP >= "E6"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(8));
            }
        }



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

                window.location.href="/project/pop/viewRegProject.do?pjtSn=" + rs.params.PJT_SN;
                // location.reload();
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
        var busnLgClass = $("#busnLgClass").data("kendoDropDownList");
        var busnClass;

        if(p.BUSN_CLASS == "D"){
            busnLgClass.value(2);
            busnLgClass.trigger("change");
            busnClass = $("#busnClass").data("kendoDropDownList");
            busnClass.value(p.BUSN_CLASS);
        }

        if(p.BUSN_CLASS == "D"){
            $("#vEngi").css("display", "");
            $("#commFileHtml").css("display", "");
        } else {
            $("#vEngi").css("display", "none");
            $("#commFileHtml").css("display", "none");
        }

        busnClass.wrapper.hide();
        busnLgClass.wrapper.hide();

        var pjtCode = "";
        if(p.PJT_CD != null){
            pjtCode = " (" + p.PJT_CD + ")";
        }
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
        $("#crmSn").val(p.CRM_CD);
        $("#crmLoc").val(p.CRM_LOC);
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







}