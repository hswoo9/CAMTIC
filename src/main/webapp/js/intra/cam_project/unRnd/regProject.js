var regUnRnd = {


    fn_defaultScript : function (setParameters){
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
            $("#stopBtn").show();
        }

        customKendo.fn_textBox(["empName", "deptName", "pjtNm", "pjtSubNm", "rndCrmNm", "rndConCrmNm"
                                ,"crmPartNm", "pjtExpAmt", "bsTitle", "pjtConYear"]);

        customKendo.fn_datePicker("sbjStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("sbjEndDe", "depth", "yyyy-MM-dd", new Date());


        var data = {

        }

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

        var tab0Url = "/projectUnRnd/detailInfo.do";            // 사업정보
        var tab1Url = "/projectRnd/researcherInfo.do";           // 연구원관리
        var tab2Url = "/projectRnd/partRate.do";                 // 참여율관리

        var tab3Url = "/projectUnRnd/unRndDevPlan.do";          // 사업수행계획
        // var tab2Url = "/projectUnRnd/unRndUnitBusn.do";          //
        // var tab3Url = "/projectRnd/rndDevJob.do";               //

        var tab4Url = "/projectUnRnd/lectureList.do";               // 단위사업
        var tab5Url = "/projectRnd/budgetInfo.do";              //
        var tab6Url = "/projectRnd/rschPayReqInfo.do";          //
        var tab7Url = "/projectRnd/rschPayRepInfo.do";          //
        var tab8Url = "/projectRnd/resultInfo.do";            // 결과보고


        var tab9Url = "/intra/cam_project/bustInfo.do";         // 출장관리
        var tab10Url = "/intra/cam_project/teamInfo.do";        //
        var tab11Url= "/intra/cam_project/purcInfo.do";         //

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
            tab11Url += "?pjtSn=" + setParameters.PJT_SN;
        }

        var dataSource = [];
        if(setParameters != null && setParameters.TEAM_STAT == "Y"){
            dataSource = [
                {name: "견적관리", url: "/intra/cam_project/estInfo.do?pjtSn=" + setParameters.PJT_SN},
                {name: "공정", url: "/intra/cam_project/processInfo.do?pjtSn=" + setParameters.PJT_SN},
                // {name: "참여율요청", url: tab2Url},      // 지출내역조회와 같이 사용
                {name: "납품관리", url: "/intra/cam_project/goodsInfo.do?pjtSn=" + setParameters.PJT_SN},      // 지출내역조회와 같이 사용
                {name: "출장", url: "/intra/cam_project/bustInfo.do?pjtSn=" + setParameters.PJT_SN},
                {name: "구매", url: "/intra/cam_project/purcInfo.do?pjtSn=" + setParameters.PJT_SN},
            ]
        } else {
            dataSource = [
                {name: "사업정보", url: tab0Url, imageUrl : "/images/ico/etc_01_1.png"},
                {name: "참여인력", url: tab1Url},
                {name: "참여율관리", url: tab2Url},
                {name: "수행계획", url: tab3Url, imageUrl : "/images/ico/etc_01_1.png"},
                {name: "단위사업", url: tab4Url},
                {name: "사업비관리(예산/지급)", url: tab5Url},
                {name: "협업", url: tab10Url}, // 지출내역조회와 같이 사용
                {name: "결과보고", url: tab8Url, imageUrl : "/images/ico/etc_01_1.png"}, // 지출내역조회와 같이 사용
                {name: "출장", url: tab9Url},
                {name: "구매", url: tab11Url},
                {name: "정산/원가", url: tab10Url, imageUrl : "/images/ico/etc_01_1.png"}
            ]
        }

        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
            select : function (){

            },
            dataTextField: "name",
            dataContentUrlField: "url",
            dataImageUrlField: "imageUrl",
            dataSource : dataSource,
        });

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());

        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;

            var tabStrip = $("#tabstrip").data("kendoTabStrip");
            tabStrip.disable(tabStrip.tabGroup.children());
            tabStrip.enable(tabStrip.tabGroup.children().eq(0));
            tabStrip.select(0);

            if(setParameters.TEAM_STAT == "Y"){
                tabStrip.enable(tabStrip.tabGroup.children());
            } else {
                if(setParameters.PJT_STEP >= "S2"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(1));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(2));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(3));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(4));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(5));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(6));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(7));

                    tabStrip.enable(tabStrip.tabGroup.children().eq(8));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(9));

                }
            }

            regUnRnd.fn_setData(setParameters);

            var tab = $("#tab").val();

            if(tab != null && tab != ""){
                tabStrip.activateTab(tabStrip.tabGroup.children().eq(tab));
            } else {
                tabStrip.activateTab(tabStrip.tabGroup.children().eq(0));
            }
        }

        $("#viewBtn").on("click", function(){
            if($("#viewStat").val() == "Y"){
                $("#mainTable").css("display", "none");
                $("#viewStat").val("N");
                $("#viewText").html("&#9660;");
            }else{
                $("#mainTable").css("display", "");
                $("#viewStat").val("Y");
                $("#viewText").html("&#9650;");
            }
        });

        if(setParameters.TEAM_STAT == "Y"){
            var parser = new DOMParser();

            var html = '<div style="width:100%;"></div>';
            var doc = parser.parseFromString(html, 'text/html');
            $("#tabstrip li")[2].after(doc.body.firstChild);

            var html2 = '<div style="padding: 6px 12px"><b style="color: red">사업관리</b></div>';
            var doc2 = parser.parseFromString(html2, 'text/html');
            $("#tabstrip li")[0].before(doc2.body.firstChild);

            var html3 = '<div style="padding: 6px 12px"><b style="color: blue">운영관리</b></div>';
            var doc3 = parser.parseFromString(html3, 'text/html');
            $("#tabstrip li")[3].before(doc3.body.firstChild);
        } else {
            var parser = new DOMParser();

            var html = '<div style="width:100%;"></div>';
            var doc = parser.parseFromString(html, 'text/html');
            $("#tabstrip li")[7].after(doc.body.firstChild);

            var html2 = '<div style="padding: 6px 12px"><b style="color: red">사업관리</b></div>';
            var doc2 = parser.parseFromString(html2, 'text/html');
            $("#tabstrip li")[0].before(doc2.body.firstChild);

            var html3 = '<div style="padding: 6px 12px"><b style="color: blue">운영관리</b></div>';
            var doc3 = parser.parseFromString(html3, 'text/html');
            $("#tabstrip li")[8].before(doc3.body.firstChild);
        }
    },

    fn_setData: function (e){
        $("#pjtTitle").text("프로젝트 - 비R&D");

        $("#saveBtn").css("display", "none");
        $("#modBtn").css("display", "");

        $("#bsTitle").val(e.BS_TITLE);
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

        $("#pjtExpAmt").val(comma(e.PJT_EXP_AMT));
        if(e.SBJ_SEP != undefined){
            if(e.SBJ_SEP == "Y"){
                $("#sbjSepY").prop("checked", true);
            } else {
                $("#sbjSepN").prop("checked", true);
            }
        }

        $("#pjtConYear").val(e.PJT_CON_YEAR);



    },

    fn_save : function (){
        var parameters = {
            busnClass : "S",
            busnNm : "비R&D",
            bsTitle : $("#bsTitle").val(),
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
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),

            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            pjtConYear : $("#pjtConYear").val()

        }

        $("input[name='sbjSepYn']").each(function(){
            if($(this).is(":checked")){
                parameters.sbjSep = this.value;
            }
        });

        if(parameters.bsTitle == ""){
            alert("사업명을 입력해주세요.")
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
        if(parameters.pjtExpAmt == ""){
            alert("예상수주금액을 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/projectUnRnd/setSubjectInfo",
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
            bsTitle : $("#bsTitle").val(),
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
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),
            pjtConYear : $("#pjtConYear").val()
        }

        $("input[name='sbjSepYn']").each(function(){
            if($(this).is(":checked")){
                parameters.sbjSep = this.value;
            }
        });

        if(parameters.bsTitle == ""){
            alert("사업명을 입력해주세요.")
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

        if(parameters.pjtExpAmt == ""){
            alert("예상수주금액을 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/projectUnRnd/setSubjectInfo",
            data : parameters,
            type: "post",
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + rs.params.pjtSn;
                }
            }
        });
    }
}