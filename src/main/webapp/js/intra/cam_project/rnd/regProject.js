var regRnd = {


    fn_defaultScript : function (setParameters){

        customKendo.fn_textBox(["empName", "deptName", "pjtNm", "pjtSubNm", "rndCrmNm", "rndConCrmNm"]);

        customKendo.fn_datePicker("sbjStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("sbjEndDe", "depth", "yyyy-MM-dd", new Date());


        var data = {
            cmGroupCode : "RND_SUBJECT",
        }
        var sbjDs = customKendo.fn_customAjax("/common/commonCodeList", data);
        customKendo.fn_dropDownList("sbjClass", sbjDs.rs, "CM_CODE_NM", "CM_CODE", 2);

        data.cmGroupCode = "RND_SUBJECT_CHARACTER";
        var sbjDs = customKendo.fn_customAjax("/common/commonCodeList", data);
        customKendo.fn_dropDownList("sbjChar", sbjDs.rs, "CM_CODE_NM", "CM_CODE", 2);


        data.grpSn = "SUP_DEP";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("supDep", lgCodeDs.rs, "LG_CD_NM", "LG_CD");

        $("#supDepSub").kendoDropDownList({
            dataSource : [{text : "선택", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });
        $("#supDep").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#supDep").val();
            data.grpSn = "SUP_DEP";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("supDepSub", smCodeDs.rs, "PJT_CD_NM", "PJT_CD");
        });

        var tab0Url = "/projectRnd/researcherInfo.do";          // 연구원관리
        var tab1Url = "/projectRnd/rndDevPlan.do";              // 개발계획
        var tab2Url = "/projectRnd/rndDevSchedule.do";          // 개발일정
        var tab3Url = "/projectRnd/rndDevJob.do";               // 개발일지

        var tab4Url = "/projectRnd/payMvInfo.do";          // 입출금대장관리
        var tab5Url = "/intra/cam_project/processInfo.do";
        var tab6Url = "/intra/cam_project/goodsInfo.do";
        var tab7Url = "/intra/cam_project/resultInfo.do";
        var tab8Url = "/intra/cam_project/costPriceInfo.do";

        var tab9Url = "/intra/cam_project/teamInfo.do";         // 협업관리
        var tab10Url = "/intra/cam_project/purcInfo.do";        // 구매관리

        if (setParameters != null && setParameters.PJT_SN != null) {
            tab0Url += "?pjtSn=" + setParameters.PJT_SN;
            tab1Url += "?pjtSn=" + setParameters.PJT_SN;
            tab2Url += "?pjtSn=" + setParameters.PJT_SN;
            tab3Url += "?pjtSn=" + setParameters.PJT_SN;
            tab4Url += "?pjtSn=" + setParameters.PJT_SN;
            tab5Url += "?pjtSn=" + setParameters.PJT_SN;
            tab6Url += "?pjtSn=" + setParameters.PJT_SN;
            tab7Url += "?pjtSn=" + setParameters.PJT_SN;
            tab8Url += "?pjtSn=" + setParameters.PJT_SN;
            tab9Url += "?pjtSn=" + setParameters.PJT_SN;
            tab10Url += "?pjtSn=" + setParameters.PJT_SN;
        }

        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
            select : function (e){
                console.log($(e.item).attr("id").split("-")[2] - 1);
                var tabName = $(e.item).find("> .k-link").text();
                let step = "";
                let stepColumn = "";
                let nextStepColumn = "";
                let stepValue = "";
                let nextStepValue = "";

                if(tabName == "연구원관리"){
                    step = "R0";
                } else if (tabName == "개발계획"){
                    step = "R1";
                } else if (tabName == "개발일정"){
                    step = "R2";
                } else if (tabName == "입출금대장관리"){
                    step = "R3";
                } else if (tabName == "예산관리"){
                    step = "R4";
                } else if (tabName == "연구비신청"){
                    step = "R5";
                } else if (tabName == "연구비정산"){
                    step = "R6";
                }

                $("#step").val(step);
            },
            dataTextField: "name",
            dataContentUrlField: "url",
            dataSource : [
                {name: "연구원관리", url: tab0Url},
                {name: "개발계획", url: tab1Url},
                {name: "개발일정", url: tab2Url},
                {name: "개발일지", url: tab3Url},
                {name: "입출금대장관리", url: tab4Url},
                {name: "예산관리", url: tab7Url}, // 연구비 입금처리와 같이 사용
                {name: "연구비신청", url: tab6Url},
                {name: "연구비정산", url: tab7Url},
                {name: "참여율관리", url: tab6Url}, // 지출내역조회와 같이 사용
                {name: "협업관리", url: tab9Url},
                {name: "구매관리", url: tab10Url}
            ],
        });

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.select(0);

        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
            regRnd.fn_setData(setParameters);
        }
    },

    fn_setData: function (e){
        $("#pjtTitle").text("프로젝트 - R&D");

        $("#saveBtn").css("display", "none");
        $("#modBtn").css("display", "");

        $("#sbjClass").data("kendoDropDownList").value(e.SBJ_CLASS);
        $("#sbjChar").data("kendoDropDownList").value(e.SBJ_CHAR);
        $("#supDep").data("kendoDropDownList").value(e.SBJ_DEP);
        $("#supDep").data("kendoDropDownList").trigger("change");
        $("#supDepSub").data("kendoDropDownList").value(e.SBJ_DEP_SUB);
        $("#sbjStrDe").data("kendoDatePicker").value(new Date(e.STR_DT));
        $("#sbjEndDe").data("kendoDatePicker").value(new Date(e.END_DT));

        $("#rndCrmNm").val(e.CRM_NM);
        $("#rndCrmSn").val(e.CRM_SN);

        if(e.CRM_CON_NM = null && e.CRM_CON_NM != ""){
            $("#rndConCrmNm").val(e.CRM_CON_SN);
            $("#rndConCrmSn").val(e.CRM_CON_NM);
        }

        $("#deptName").val(e.DEPT_NAME);
        $("#empName").val(e.EMP_NAME);
        $("#empSeq").val(e.EMP_SEQ);
        $("#deptSeq").val(e.DEPT_SEQ);

        $("#pjtNm").val(e.PJT_NM);
        $("#pjtSubNm").val(e.PJT_SUB_NM);


        if(e.SBJ_SEP != undefined){
            if(e.SBJ_SEP == "Y"){
                $("#sbjSepY").prop("checked", true);
            } else {
                $("#sbjSepN").prop("checked", true);
            }
        }

        if(e.SBJ_STAT_YN != undefined){
            if(e.SBJ_STAT_YN == "Y"){
                $("#rndStatYn").prop("checked", true);
            }
        }

    },

    fn_save : function (){
        var parameters = {
            busnClass : "R",
            busnNm : "R&D",
            sbjClass : $("#sbjClass").val(),
            sbjChar : $("#sbjChar").val(),
            sbjDep : $("#supDep").val(),
            sbjDepSub : $("#supDepSub").val(),
            strDt : $("#sbjStrDe").val(),
            endDt : $("#sbjEndDe").val(),
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val(),
            deptSeq : $("#deptSeq").val(),
            deptName : $("#deptName").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSubNm : $("#pjtSubNm").val(),
            crmConSn : $("#rndConCrmSn").val(),
            crmSn : $("#rndCrmSn").val(),

            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
        }

        $("input[name='sbjSepYn']").each(function(){
            if($(this).is(":checked")){
                parameters.sbjSep = this.value;
            }
        });

        if($("#rndStatYn").is("checked")){
            parameters.rndStatYn = "Y";
        } else {
            parameters.rndStatYn = "N";
        }



        if(parameters.sbjClass == ""){
            alert("과제구분을 선택해주세요.");
            return;
        }
        if(parameters.sbjChar == ""){
            alert("과제성격을 선택해주세요.");
            return;
        }
        if(parameters.supDep == ""){
            alert("지원부처를 선택해주세요.");
            return;
        }
        if(parameters.supDepSub == ""){
            alert("전담기관을 선택해주세요.");
            return;
        }
        if(parameters.pjtNm == ""){
            alert("과제명을 입력해주세요.");
            return;
        }
        if(parameters.pjtNmSub == ""){
            alert("과제명(약칭) 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/projectRnd/setSubjectInfo",
            data : parameters,
            type: "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    location.href="/projectRnd/pop/regProject.do?pjtSn=" + rs.params.pjtSn;
                }
            }
        });
    },

    fn_mod : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            sbjClass : $("#sbjClass").val(),
            sbjChar : $("#sbjChar").val(),
            sbjDep : $("#supDep").val(),
            sbjDepSub : $("#supDepSub").val(),
            strDt : $("#sbjStrDe").val(),
            endDt : $("#sbjEndDe").val(),
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val(),
            deptSeq : $("#deptSeq").val(),
            deptName : $("#deptName").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSubNm : $("#pjtSubNm").val(),
            crmConSn : $("#rndConCrmSn").val(),
            crmSn : $("#rndCrmSn").val(),
        }

        if(parameters.sbjClass == ""){
            alert("과제구분을 선택해주세요.");
            return;
        }
        if(parameters.sbjChar == ""){
            alert("과제성격을 선택해주세요.");
            return;
        }
        if(parameters.supDep == ""){
            alert("지원부처를 선택해주세요.");
            return;
        }
        if(parameters.supDepSub == ""){
            alert("전담기관을 선택해주세요.");
            return;
        }
        if(parameters.pjtNm == ""){
            alert("과제명을 입력해주세요.");
            return;
        }
        if(parameters.pjtNmSub == ""){
            alert("과제명(약칭) 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/projectRnd/setSubjectInfo",
            data : parameters,
            type: "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    location.href="/projectRnd/pop/regProject.do?pjtSn=" + rs.params.pjtSn;
                }
            }
        });
    }
}