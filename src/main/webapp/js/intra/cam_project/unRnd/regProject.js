var regUnRnd = {


    fn_defaultScript : function (){
        const setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#mainPjtSn").val()}).rs;

        regUnRnd.fn_setPage(setParameters);
        regUnRnd.fn_setTab(setParameters);
        regUnRnd.fn_setData(setParameters);
    },

    fn_setTab : function(setParameters){
        var tab0Url = "/projectUnRnd/detailInfo.do";                 // 00사업정보
        var tab1Url = "/projectRnd/researcherInfo.do";             // 01참여인력
        var tab3Url = "/projectRnd/partRate.do";                   // 02참여율관리
        var tab4Url = "/projectUnRnd/unRndDevPlan.do";                 // 03수행계획(공정)
        var tab17Url= "/intra/cam_project/processInfo.do";         // 04공정
        var tab5Url = "/projectUnRnd/lectureList.do";                // 05단위사업
        var tab6Url = "/intra/cam_project/teamInfo.do";            // 06협업
        var tab7Url = "/projectRnd/budgetInfo.do";                 // 07사업비관리(예산/지급)
        var tab8Url = "/projectRnd/resultInfo.do";                 // 08결과보고
        var tab15Url= "/intra/cam_project/performanceInfo.do";     // 09실적관리
        var tab14Url= "/intra/cam_project/purcInfo.do";            // 10원가보고

        var tab9Url = "/intra/cam_project/bustInfo.do";            // 11출장
        var tab11Url= "/intra/cam_project/purcInfo.do";            // 12구매
        var tab12Url= "/intra/cam_project/budgetChangeInfo.do";    // 13예산변경 및 반납
        var tab13Url= "/intra/cam_project/depositInfo.do";         // 14입금관리
        var tab16Url= "/intra/cam_project/costPriceInfoAdmin.do";  // 15정산서

        if (setParameters != null && setParameters.PJT_SN != null) {
            tab0Url += "?pjtSn=" + setParameters.PJT_SN;
            tab1Url += "?pjtSn=" + setParameters.PJT_SN;
            tab3Url += "?pjtSn=" + setParameters.PJT_SN;
            tab4Url += "?pjtSn=" + setParameters.PJT_SN;
            tab5Url += "?pjtSn=" + setParameters.PJT_SN;
            tab6Url += "?pjtSn=" + setParameters.PJT_SN;
            tab7Url += "?pjtSn=" + setParameters.PJT_SN;
            tab8Url += "?pjtSn=" + setParameters.PJT_SN;
            tab9Url += "?pjtSn=" + setParameters.PJT_SN;
            tab11Url += "?pjtSn=" + setParameters.PJT_SN;
            tab12Url += "?pjtSn=" + setParameters.PJT_SN;
            tab13Url += "?pjtSn=" + setParameters.PJT_SN;
            tab14Url += "?pjtSn=" + setParameters.PJT_SN;
            tab15Url += "?pjtSn=" + setParameters.PJT_SN;
            tab16Url += "?pjtSn=" + setParameters.PJT_SN;
            tab17Url += "?pjtSn=" + setParameters.PJT_SN;
        }

        var dataSource ;
        if(setParameters != null && setParameters.TEAM_STAT == "Y"){
            dataSource = [
                {name: "수행계획(공정)", url: tab4Url},
                {name: "공정", url: tab17Url},
                {name: "실적관리", url: tab15Url},

                {name: "출장", url: tab9Url},
                {name: "구매", url: tab11Url}
            ]
        } else {
            dataSource = [
                {name: "사업정보", url: tab0Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "참여인력", url: tab1Url},
                {name: "참여율관리", url: tab3Url},
                {name: "수행계획(공정)", url: tab4Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "공정", url: tab17Url},
                {name: "단위사업", url: tab5Url},
                {name: "협업", url: tab6Url},
                {name: "사업비관리(예산/지급)", url: tab7Url},
                {name: "결과보고", url: tab8Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "실적관리", url: tab15Url},

                {name: "출장", url: tab9Url},
                {name: "구매", url: tab11Url},
                {name: "예산변경 및 반납", url: tab12Url},
                {name: "입금관리", url: tab13Url},
                {name: "정산서", url: tab16Url}
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

        /** 전부 비활성화 */
        tabStrip.disable(tabStrip.tabGroup.children());

        if(setParameters == null){
            return;
        }
        var tab = $("#tab").val();

        /** 파라미터로 TAB이 있을시에 해당 탭으로 이동 */
        if(tab != null && tab != ""){
            tabStrip.activateTab(tabStrip.tabGroup.children().eq(tab));
        } else {
            tabStrip.activateTab(tabStrip.tabGroup.children().eq(0));
        }

        var parser = new DOMParser();

        /** 협업일때 */
        if(setParameters.TEAM_STAT == "Y"){
            tabStrip.enable(tabStrip.tabGroup.children());

            /** 탭 두줄 */
            var html = '<div style="width:100%;"></div>';
            var doc = parser.parseFromString(html, 'text/html');
            $("#tabstrip li")[2].after(doc.body.firstChild);

            /** 첫줄에 사업관리 문구 추가 */
            var html2 = '<div style="padding: 6px 12px"><b style="color: red">사업관리</b></div>';
            var doc2 = parser.parseFromString(html2, 'text/html');
            $("#tabstrip li")[0].before(doc2.body.firstChild);

            /** 둘째줄에 운영관리 문구 추가 */
            var html3 = '<div style="padding: 6px 12px"><b style="color: blue">운영관리</b></div>';
            var doc3 = parser.parseFromString(html3, 'text/html');
            $("#tabstrip li")[3].before(doc3.body.firstChild);

            /** 협업이 아닐 때 */
        } else {
            tabStrip.enable(tabStrip.tabGroup.children().eq(0));
            tabStrip.enable(tabStrip.tabGroup.children().eq(1));
            tabStrip.enable(tabStrip.tabGroup.children().eq(2));
            /** 수주보고가 완료 되었을때 전부 활성화 */
            if(setParameters.PJT_STEP >= "S2"){
                tabStrip.enable(tabStrip.tabGroup.children());

                /** 실적관리 비활성화 및 PM만 활성화 */
                tabStrip.disable(tabStrip.tabGroup.children().eq(9));
                if(setParameters.PM_EMP_SEQ == $("#regEmpSeq").val()){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(9));
                }
            }

            /** 탭 두줄 */
            var html = '<div style="width:100%;"></div>';
            var doc = parser.parseFromString(html, 'text/html');
            $("#tabstrip li")[9].after(doc.body.firstChild);

            /** 첫줄에 사업관리 문구 추가 */
            var html2 = '<div style="padding: 6px 12px"><b style="color: red">사업관리</b></div>';
            var doc2 = parser.parseFromString(html2, 'text/html');
            $("#tabstrip li")[0].before(doc2.body.firstChild);

            /** 둘째줄에 운영관리 문구 추가 */
            var html3 = '<div style="padding: 6px 12px"><b style="color: blue">운영관리</b></div>';
            var doc3 = parser.parseFromString(html3, 'text/html');
            $("#tabstrip li")[10].before(doc3.body.firstChild);
        }
    },

    fn_setPage : function(setParameters){
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
            $("#stopBtn").show();
        }

        customKendo.fn_textBox(["empName", "deptName", "pjtNm", "rndCrmNm", "rndConCrmNm"
            ,"crmPartNm", "pjtExpAmt", "bsTitle", "pjtConYear"]);

        customKendo.fn_datePicker("sbjStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("sbjEndDe", "depth", "yyyy-MM-dd", new Date());

        var data = {}
        data.cmGroupCode = "RND_SUBJECT";
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
    },

    fn_setData : function(e){
        if(e == null){
            return;
        }
        $("#pjtTitle").text("프로젝트 - 비R&D");

        $("#saveBtn").css("display", "none");
        $("#modBtn").css("display", "");

        $("#bsTitle").val(e.BS_TITLE);
        $("#sbjClass").data("kendoDropDownList").value(e.SBJ_CLASS);
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
            sbjClass : $("#sbjClass").val(),
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
    },

    fn_mod : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            sbjClass : $("#sbjClass").val(),
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