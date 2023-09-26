var regRnd = {


    fn_defaultScript : function (setParameters){
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;

            console.log(setParameters);
        }

        customKendo.fn_textBox(["empName", "deptName", "pjtNm", "pjtSubNm"]);

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

        var tab0Url = "/intra/cam_project/crmInfo.do";
        var tab1Url = "/intra/cam_project/bustInfo.do";
        var tab2Url = "/intra/cam_project/estInfo.do";
        var tab3Url = "/intra/cam_project/delvInfo.do";
        var tab4Url = "/intra/cam_project/devInfo.do";
        var tab5Url = "/intra/cam_project/processInfo.do";
        var tab6Url = "/intra/cam_project/goodsInfo.do";
        var tab7Url = "/intra/cam_project/resultInfo.do";
        var tab8Url = "/intra/cam_project/costPriceInfo.do";

        var tab9Url = "/intra/cam_project/teamInfo.do";         // 협업관리
        var tab10Url = "/intra/cam_project/buyInfo.do";         // 구매관리

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
        if(setParameters != null && setParameters.ENGN_SN != null) {
            tab0Url += "&engnSn=" + setParameters.ENGN_SN;
            tab1Url += "&engnSn=" + setParameters.ENGN_SN;
            tab2Url += "&engnSn=" + setParameters.ENGN_SN;
            tab3Url += "&engnSn=" + setParameters.ENGN_SN;
            tab4Url += "&engnSn=" + setParameters.ENGN_SN;
            tab5Url += "&engnSn=" + setParameters.ENGN_SN;
            tab6Url += "&engnSn=" + setParameters.ENGN_SN;
            tab7Url += "&engnSn=" + setParameters.ENGN_SN;
            tab8Url += "&engnSn=" + setParameters.ENGN_SN;
            tab9Url += "&engnSn=" + setParameters.ENGN_SN;
            tab10Url += "&engnSn=" + setParameters.ENGN_SN;
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
                } else if (tabName == "계획서"){
                    step = "E3";
                    stepColumn = "STEP4";
                    nextStepColumn = "STEP5";
                } else if (tabName == "공정"){
                    step = "E4";
                    stepColumn = "STEP5";
                    nextStepColumn = "STEP6";
                } else if (tabName == "납품"){
                    step = "E5";
                    stepColumn = "STEP6";
                    nextStepColumn = "STEP7";
                } else if (tabName == "결과보고"){
                    step = "E6";
                    stepColumn = "STEP7";
                    nextStepColumn = "STEP8";
                }

                $("#step").val(step);
                $("#stepColumn").val(stepColumn);
                $("#nextStepColumn").val(nextStepColumn);
            },
            dataTextField: "name",
            dataContentUrlField: "url",
            dataSource : [
                {name: "주관기관", url: tab0Url},
                {name: "연구원관리", url: tab1Url},
                {name: "개발계획", url: tab2Url},
                {name: "개발일정", url: tab3Url},
                {name: "개발일지", url: tab4Url},
                {name: "입출금대장관리", url: tab7Url}, // 연구비 입금처리와 같이 사용
                {name: "예산관리", url: tab6Url},
                {name: "연구비신청", url: tab7Url},
                {name: "연구비정산", url: tab6Url}, // 지출내역조회와 같이 사용
                {name: "참여율관리", url: tab8Url},
                {name: "협업관리", url: tab9Url},
                {name: "구매관리", url: tab10Url}
            ],
        });

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());


        if(setParameters != null){

            var tab = $("#tab").val();
            if(tab != null && tab != ""){
                tabStrip.activateTab(tabStrip.tabGroup.children().eq(tab));
            } else {
                tabStrip.activateTab(tabStrip.tabGroup.children().eq(0));
            }

            if(setParameters.PJT_SN){
                tabStrip.enable(tabStrip.tabGroup.children().eq(0));
                tabStrip.enable(tabStrip.tabGroup.children().eq(1));
            }

            setParameters.ENGN_SN;
            regRnd.fn_setData(setParameters);

            if(setParameters.PJT_STEP == "E"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(0));
                tabStrip.enable(tabStrip.tabGroup.children().eq(1));
            }

            if(setParameters.PJT_STOP != "Y"){
                if(setParameters.PJT_STEP >= "E0"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(2));
                }

                if(setParameters.PJT_STEP >= "E1"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(3));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(9));
                }

            } else {
                $("#modBtn").css("display", "none");
                alert("중단사유 : " + setParameters.PJT_STOP_RS);
            }

        }

        // tabStrip.enable(tabStrip.tabGroup.children().eq(0));



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
        })
    }
}