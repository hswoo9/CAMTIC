var regRnd = {


    fn_defaultScript : function (setParameters){
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
            $("#stopBtn").show();
        }

        customKendo.fn_textBox(["empName", "deptName", "pjtNm", "pjtSubNm", "rndCrmNm", "rndConCrmNm", "crmPartNm", "pjtExpAmt"]);

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


        /** 사업비 분리사용 유무 change 이벤트 */
        $("input[name='sbjSepYn']").change(function(){
            if($("input[name='sbjSepYn']:checked").val() == "Y"){
                $("#checkboxDiv").show();
            }else{
                $("#checkboxDiv").hide();
            }
        });

        /** 탭 상위 정보 숨김/보임 이벤트 */
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

        /** 탭 관련 */
        regRnd.fn_setTab(setParameters);

        regRnd.fn_setData(setParameters);
    },

    fn_setTab: function(setParameters){
        var tab0Url = "/projectRnd/detailInfo.do";               // 상세정보 (수주)
        var tab1Url = "/projectRnd/researcherInfo.do";           // 연구원관리
        // var tab2Url = "/projectRnd/reqPartRate.do";              // 참여율요청
        var tab3Url = "/projectRnd/partRate.do";                 // 참여율관리

        var tab4Url = "/projectRnd/rndDevPlan.do";               // 사업수행계획
        var tab5Url = "/projectRnd/rndDevSchedule.do";           // 개발일정
        // var tab6Url = "/projectRnd/rndDevJob.do";                    // 개발일지
        var tab6Url = "/intra/cam_project/teamInfo.do";          // 협업관리

        // var tab7Url = "/projectRnd/payMvInfo.do";                    // 입출금대장관리
        var tab7Url = "/projectRnd/budgetInfo.do";               // 예산관리
        var tab8Url = "/projectRnd/resultInfo.do";               // 결과보고

        // var tab9Url = "/projectRnd/rschPayRepInfo.do";               // 연구비정산 -- 제외

        var tab9Url = "/intra/cam_project/bustInfo.do";          // 출장관리
        // var tab10Url = "/intra/cam_project/teamInfo.do";             // 협업관리
        var tab11Url= "/intra/cam_project/purcInfo.do";          // 구매관리
        var tab12Url= "/intra/cam_project/purcInfo.do";          // 세세목 변경신청
        var tab13Url= "/intra/cam_project/purcInfo.do";          // 정산/원가

        if (setParameters != null && setParameters.PJT_SN != null) {
            tab0Url += "?pjtSn=" + setParameters.PJT_SN;
            tab1Url += "?pjtSn=" + setParameters.PJT_SN;
            // tab2Url += "?pjtSn=" + setParameters.PJT_SN;
            tab3Url += "?pjtSn=" + setParameters.PJT_SN;
            tab4Url += "?pjtSn=" + setParameters.PJT_SN;
            tab5Url += "?pjtSn=" + setParameters.PJT_SN;
            tab6Url += "?pjtSn=" + setParameters.PJT_SN;
            tab7Url += "?pjtSn=" + setParameters.PJT_SN;
            tab8Url += "?pjtSn=" + setParameters.PJT_SN;
            tab9Url += "?pjtSn=" + setParameters.PJT_SN;
            // tab10Url += "?pjtSn=" + setParameters.PJT_SN;
            tab11Url += "?pjtSn=" + setParameters.PJT_SN;
            tab12Url += "?pjtSn=" + setParameters.PJT_SN;
            tab13Url += "?pjtSn=" + setParameters.PJT_SN;
        }
        var dataSource = []

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
                {name: "사업정보", url: tab0Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "참여인력", url: tab1Url},
                // {name: "참여율요청", url: tab2Url},      // 지출내역조회와 같이 사용
                {name: "참여율관리", url: tab3Url},      // 지출내역조회와 같이 사용
                {name: "수행계획(공정)", url: tab4Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "개발관리", url: tab5Url},
                {name: "협업", url: tab6Url},
                // {name: "입출금대장관리", url: tab5Url},
                {name: "사업비관리(예산/지급)", url: tab7Url},        // 연구비 입금처리와 같이 사용
                {name: "결과보고", url: tab8Url, imageUrl: "/images/ico/etc_01_1.png"},        // 연구비 입금처리와 같이 사용

                // {name: "지급관리", url: tab9Url},
                {name: "출장", url: tab9Url},
                // {name: "협업", url: tab10Url},
                {name: "구매", url: tab11Url},
                {name: "예산변경신청", url: tab12Url},
                {name: "정산/원가", url: tab13Url, imageUrl: "/images/ico/etc_01_1.png"}
            ]
        }


        $("#tabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            },
            select: function (e){

            },
            dataTextField: "name",
            dataContentUrlField: "url",
            dataImageUrlField: "imageUrl",
            dataSource: dataSource,
        });

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());

        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;

            var tabStrip = $("#tabstrip").data("kendoTabStrip");
            tabStrip.disable(tabStrip.tabGroup.children());
            tabStrip.enable(tabStrip.tabGroup.children().eq(0));
            if($("#tab").val() != null && $("#tab").val() != ""){
                tabStrip.select($("#tab").val());
            } else {
                tabStrip.select(0);
            }

            if(setParameters.TEAM_STAT == "Y"){
                tabStrip.enable(tabStrip.tabGroup.children());
            } else {
                var rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", setParameters);

                if(rndInfo.map != null){
                    if(rndInfo.map.STATUS == "100"){
                        tabStrip.enable(tabStrip.tabGroup.children());
                    }
                }
            }
        }

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
        $("#pjtTitle").text("프로젝트 - R&D");

        if(e != null){

            $("#saveBtn").css("display", "none");
            $("#modBtn").css("display", "");

            $("#sbjClass").data("kendoDropDownList").value(e.SBJ_CLASS);
            //$("#sbjChar").data("kendoDropDownList").value(e.SBJ_CHAR);
            $("#supDep").data("kendoDropDownList").value(e.SBJ_DEP);
            $("#supDep").data("kendoDropDownList").trigger("change");
            $("#supDepSub").data("kendoDropDownList").value(e.SBJ_DEP_SUB);
            $("#sbjStrDe").data("kendoDatePicker").value(new Date(e.STR_DT));
            $("#sbjEndDe").data("kendoDatePicker").value(new Date(e.END_DT));

            $("#rndCrmNm").val(e.CRM_NM);
            $("#rndCrmSn").val(e.CRM_SN);
            $("#pjtExpAmt").val(comma(e.PJT_EXP_AMT));

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
                    var data = {
                        pjtSn: e.PJT_SN
                    }
                    let result = customKendo.fn_customAjax("/projectRnd/getAccountInfo", data);
                    $("#checkboxDiv").show();
                    for(let i=0; i<result.list.length; i++){
                        $("#at" + result.list[i].IS_TYPE).prop('checked',true);
                    }
                } else {
                    $("#sbjSepN").prop("checked", true);
                }
            }

            if(e.SBJ_STAT_YN != undefined){
                if(e.SBJ_STAT_YN == "Y"){
                    $("#rndStatYn").prop("checked", true);
                }
            }
        }
    },

    fn_save : function (){
        var parameters = {
            busnClass : "R",
            busnNm : "R&D",
            sbjClass : $("#sbjClass").val(),
            //sbjChar : $("#sbjChar").val(),
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
            crmPartSn : $("#crmPartSn").val(),
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),

            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),

            regEmpSeq : $("#regEmpSeq").val(),
        }

        $("input[name='sbjSepYn']").each(function(){
            if($(this).is(":checked")){
                parameters.sbjSep = this.value;
            }
        });

        if($("#rndStatYn").is(":checked")){
            parameters.sbjStatYn = "Y";
        } else {
            parameters.sbjStatYn = "N";
        }

        if($("input[name='sbjSepYn']:checked").val() == "Y"){
            const checkBox = 'input[name="accountType"]:checked';
            const selectedElements = document.querySelectorAll(checkBox);

            let arr = new Array();
            selectedElements.forEach((el) => {
                let row = {
                    value: el.value,
                }
                arr.push(row);
            });

            if(arr.length == 0) {
                alert("사업비 항목이 선택되지 않았습니다.");
                return;
            }

            parameters.accountList = JSON.stringify(arr);
        }



        if(parameters.sbjClass == ""){
            alert("과제구분을 선택해주세요.");
            return;
        }
        //if(parameters.sbjChar == ""){
        //    alert("과제성격을 선택해주세요.");
        //    return;
        //}
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
        if(parameters.pjtExpAmt == ""){
            alert("예상수주금액을 입력해주세요.")
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
            //sbjChar : $("#sbjChar").val(),
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
            crmPartSn : $("#crmPartSn").val(),
            crmSn : $("#rndCrmSn").val(),
            pjtExpAmt : uncomma($("#pjtExpAmt").val())
        }

        $("input[name='sbjSepYn']").each(function(){
            if($(this).is(":checked")){
                parameters.sbjSep = this.value;
            }
        });

        if($("#rndStatYn").is(":checked")){
            parameters.sbjStatYn = "Y";
        } else {
            parameters.sbjStatYn = "N";
        }

        if($("input[name='sbjSepYn']:checked").val() == "Y"){
            const checkBox = 'input[name="accountType"]:checked';
            const selectedElements = document.querySelectorAll(checkBox);

            let arr = new Array();
            selectedElements.forEach((el) => {
                let row = {
                    value: el.value,
                }
                arr.push(row);
            });

            if(arr.length == 0) {
                alert("사업비 항목이 선택되지 않았습니다.");
                return;
            }

            parameters.accountList = JSON.stringify(arr);
        }

        if(parameters.sbjClass == ""){
            alert("과제구분을 선택해주세요.");
            return;
        }
        //if(parameters.sbjChar == ""){
        //    alert("과제성격을 선택해주세요.");
        //    return;
        //}
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
                console.log(rs);
                if(rs.code == 200){
                    location.href="/projectRnd/pop/regProject.do?pjtSn=" + rs.params.pjtSn;
                }
            }
        });
    }
}