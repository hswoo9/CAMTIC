var regUnRnd = {


    fn_defaultScript : function (){
        let setParameters = null;

        if($("#mainPjtSn").val() != ""){
            setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#mainPjtSn").val()}).rs;
        }

        /** 외부공개 여부 비공개일시 비밀번호 입력하는 모달창 뜸*/
        if(setParameters != null && setParameters.SECURITY == "Y"){
            regUnRnd.fn_setPage(setParameters);
            regUnRnd.fn_setData(setParameters);
            regUnRnd.fn_multiPjtSet(setParameters);
            openSecurityModal();
        }else{
            regUnRnd.fn_setPage(setParameters);
            regUnRnd.fn_setTab(setParameters);
            regUnRnd.fn_setData(setParameters);
            regUnRnd.fn_multiPjtSet(setParameters);
        }
    },

    fn_setTab : function(setParameters){
        var tab0Url = "/projectUnRnd/detailInfo.do";               // 00사업정보
        //var tab1Url = "/projectRnd/researcherInfo.do";           // 01참여인력
        var tab3Url = "/projectRnd/partRate.do";                   // 02참여율관리
        var tab4Url = "/projectUnRnd/unRndDevPlan.do";             // 03수행계획
        var tab18Url= "/intra/cam_project/processInfo.do";         // 04공정
        var tab5Url = "/projectUnRnd/lectureList.do";              // 05단위사업
        var tab6Url = "/intra/cam_project/teamInfoEngn.do";        // 06협업
        var tab7Url = "/projectRnd/budgetInfo.do";                 // 07사업비관리(예산/지급)
        var tab8Url = "/projectRnd/resultInfo.do";                 // 08결과보고
        var tab15Url= "/intra/cam_project/performanceInfo.do";     // 09실적관리
        var tab14Url= "/intra/cam_project/purcInfo.do";            // 10원가보고

        var tab9Url = "/intra/cam_project/bustInfo.do";            // 11출장
        var tab11Url= "/intra/cam_project/purcInfo.do";            // 12구매
        var tab12Url= "/intra/cam_project/budgetChangeInfo.do";    // 13예산변경 및 반납
        var tab13Url= "/intra/cam_project/depositInfo.do";         // 14입금관리
        var tab16Url= "/intra/cam_project/costInfoAdmin.do";  // 15정산서
        var tab17Url= "/intra/cam_project/equipInfo.do";  // 16장비

        if (setParameters != null && setParameters.PJT_SN != null) {
            tab0Url += "?pjtSn=" + setParameters.PJT_SN;
            //tab1Url += "?pjtSn=" + setParameters.PJT_SN;
            tab3Url += "?pjtSn=" + setParameters.PJT_SN;
            tab4Url += "?pjtSn=" + setParameters.PJT_SN;
            tab18Url += "?pjtSn=" + setParameters.PJT_SN;
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
                {name: "수행계획", url: tab4Url},
                {name: "공정", url: tab18Url},
                {name: "실적관리", url: tab15Url},

                {name: "출장", url: tab9Url},
                {name: "구매", url: tab11Url},
                {name: "정산서", url: tab13Url},
                {name: "장비", url: tab17Url}
            ]
        } else {
            dataSource = [
                {name: (setParameters == null || setParameters.PARENT_PJT_SN == null) ? "사업정보" : "연차보고", url: tab0Url, imageUrl: "/images/ico/etc_01_1.png"},
                //{name: "참여인력", url: tab1Url},
                {name: "참여율관리", url: tab3Url},
                {name: "수행계획", url: tab4Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "공정", url: tab18Url},
                {name: "단위사업", url: tab5Url},
                {name: "협업", url: tab6Url},
                {name: "사업비관리", url: tab7Url},
                {name: "결과보고", url: tab8Url, imageUrl: "/images/ico/etc_01_1.png"},
                {name: "실적관리", url: tab15Url},

                {name: "출장", url: tab9Url},
                {name: "구매", url: tab11Url},
                {name: "예산변경 및 반납", url: tab12Url},
                {name: "입금관리", url: tab13Url},
                {name: "정산서", url: tab16Url},
                {name: "장비", url: tab17Url}
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

            /** 실적관리는 수주부서 결과보고 완료시 오픈 */
            tabStrip.disable(tabStrip.tabGroup.children().eq(2));
            var resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", {
                pjtSn: setParameters.PNT_PJT_SN,
            }).result.map;

            if(resultMap != null){
                console.log("resultMap")
                console.log(resultMap)
                if(setParameters.PM_EMP_SEQ == $("#regEmpSeq").val() && resultMap.STATUS == "100"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(2));
                }
            }

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

            if(setParameters.PJT_STOP != "Y"){
                /** 수주보고가 완료 되었을때 전부 활성화 */
                if(setParameters.PJT_STEP >= "S2"){
                    tabStrip.enable(tabStrip.tabGroup.children());

                    /** 실적관리 비활성화 및 PM만 활성화 */
                    tabStrip.disable(tabStrip.tabGroup.children().eq(8));
                    var resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", {
                        pjtSn: setParameters.PJT_SN,
                    }).result.map;

                    if(resultMap != null){
                        console.log("resultMap")
                        console.log(resultMap)
                        if(setParameters.PM_EMP_SEQ == $("#regEmpSeq").val() && resultMap.STATUS == "100"){
                            tabStrip.enable(tabStrip.tabGroup.children().eq(8));
                        }
                    }
                }
            } else {
                $("#stopBtn").css("display", "none");
                alert("중단사유 : " + setParameters.PJT_STOP_RS);
            }

            /** 탭 두줄 */
            var html = '<div style="width:100%;"></div>';
            var doc = parser.parseFromString(html, 'text/html');
            $("#tabstrip li")[8].after(doc.body.firstChild);

            /** 첫줄에 사업관리 문구 추가 */
            var html2 = '<div style="padding: 6px 12px"><b style="color: red">사업관리</b></div>';
            var doc2 = parser.parseFromString(html2, 'text/html');
            $("#tabstrip li")[0].before(doc2.body.firstChild);

            /** 둘째줄에 운영관리 문구 추가 */
            var html3 = '<div style="padding: 6px 12px"><b style="color: blue">운영관리</b></div>';
            var doc3 = parser.parseFromString(html3, 'text/html');
            $("#tabstrip li")[9].before(doc3.body.firstChild);
        }

        var mem = customKendo.fn_customAjax("/project/projectEnterMemberList", { pjtSn: $("#pjtSn").val() });
        var uid = $("#regEmpSeq").val()
        var pral = mem.list.partRateAdminList;
        var flag = false;

        tabStrip.disable(tabStrip.tabGroup.children().eq(2));


        for(var i = 0; i < pral.length; i++){
            if(pral[i].EMP_SEQ == uid){
                flag = true
            }
        }

        if(setParameters.loginVO.uniqId == setParameters.PM_EMP_SEQ || setParameters.loginVO.uniqId == setParameters.EMP_SEQ){
            tabStrip.enable(tabStrip.tabGroup.children().eq(2));
        }

        if(flag){
            tabStrip.enable(tabStrip.tabGroup.children().eq(2));
        }
    },

    fn_setPage : function(setParameters){
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
            $("#stopBtn").show();
        }

        customKendo.fn_textBox(["empName", "deptName", "pjtNm", "rndCrmNm", "rndConCrmNm"
            ,"crmPartNm", "pjtExpAmt", "bsTitle", "pjtConYear", "allBusnCost", "pjtAmt2", "allPjtAmt", "mngDeptName", "mngEmpName", "parentPjtNm"]);

        customKendo.fn_datePicker("sbjStrDe", "depth", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("sbjEndDe", "depth", "yyyy-MM-dd", new Date());

        let yearDataSource = [
            { text: "단년", value: "S" }, //single
            { text: "다년", value: "M" }  //multi
        ]
        customKendo.fn_dropDownList("yearClass", yearDataSource, "text", "value", 2);
        $("#yearClass").data("kendoDropDownList").bind("change", function(){
            const yearClass = $("#yearClass").val();
            if(yearClass == "M" && $("#paramParentPjtSn").val() != ""){
                $("#mYearTr").show();
                $("#mYearTr2").show();
            }else if(yearClass == "M"){
                $("#mYearTr2").show();
            }else{
                $("#mYearTr").hide();
                $("#mYearTr2").hide();
            }
        });

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

        /** 프로젝트 관리자 일 경우 당해년도 사업비 수정 가능 */
        let mngCk = false;
        const authorList = customKendo.fn_customAjax("/system/getAuthorityGroupUserList.do", {authorityGroupId : "27"}).rs;
        for(let i=0; i<authorList.length; i++){
            const map = authorList[i];
            if(map.EMP_SEQ == $("#regEmpSeq").val()){
                mngCk = true;
                $("#mngCk").val("Y");
            }
        }

        if(!mngCk){
            $("#pjtAmt2").data("kendoTextBox").enable(false);
        }
    },

    fn_setData : function(e){
        $("#pjtTitle").text("프로젝트 - 비R&D");

        if(e != null){

            $("#saveBtn").css("display", "none");
            $("#modBtn").css("display", "");

            $("#bsTitle").val(e.BS_TITLE);
            $("#yearClass").data("kendoDropDownList").value(e.YEAR_CLASS);

            if(e.PARENT_PJT_SN != null){
                $("#mYearCk").val("Y");
                $("#mYearTr").show();
                $("#supDep").data("kendoDropDownList").trigger("change");
                $("#parentPjtSn").val(e.PARENT_PJT_SN);

                const parentPjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: e.PARENT_PJT_SN}).rs;
                $("#parentPjtNm").val(parentPjtInfo.PJT_NM);

            /** 다년이면서 1차년도 프로젝트()가 없을 때 다년 프로젝트 생성 버튼 보이게 */
            }else if(e.YEAR_CLASS == "M" && e.PJT_CD != null && e.PARENT_PJT_SN == null){
                $("#nextPjtBtn").show();
            }

            if(e.YEAR_CLASS == "M"){
                $("#mYearTr2").show();
            }

            $("#sbjClass").data("kendoDropDownList").value(e.SBJ_CLASS);
            $("#supDep").data("kendoDropDownList").value(e.SBJ_DEP);
            $("#supDep").data("kendoDropDownList").trigger("change");
            $("#supDepSub").data("kendoDropDownList").value(e.SBJ_DEP_SUB);
            $("#sbjStrDe").data("kendoDatePicker").value(new Date(e.STR_DT));
            $("#sbjEndDe").data("kendoDatePicker").value(new Date(e.END_DT));

            $("#rndCrmNm").val(e.CRM_NM);
            $("#rndCrmSn").val(e.CRM_SN);
            $("#allBusnCost").val(comma(e.ALL_BUSN_COST));
            $("#allPjtAmt").val(comma(e.ALL_PJT_AMT));

            const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: $("#pjtSn").val()});
            const delvMap = unRndInfo.map;
            if(delvMap != null){
                if(delvMap.STATUS == "100"){
                    $("#pjtAmt2").val(comma(e.PJT_AMT));
                }
            }

            if(e.CRM_CON_NM = null && e.CRM_CON_NM != ""){
                $("#rndConCrmNm").val(e.CRM_CON_SN);
                $("#rndConCrmSn").val(e.CRM_CON_NM);
            }

            $("#deptName").val(e.DEPT_NAME);
            $("#empName").val(e.EMP_NAME);
            $("#empSeq").val(e.EMP_SEQ);
            $("#deptSeq").val(e.DEPT_SEQ);

            const pmUserInfo = getUser(e.PM_EMP_SEQ);
            $("#mngDeptName").val(pmUserInfo.DEPT_NAME);
            $("#mngDeptSeq").val(pmUserInfo.DEPT_SEQ);
            $("#mngEmpName").val(e.PM);
            $("#mngEmpSeq").val(e.PM_EMP_SEQ);

            $("#pjtNm").val(e.PJT_NM);

            if(e.SBJ_STAT_YN != undefined){
                if(e.SBJ_STAT_YN == "Y"){
                    $("#unRndStatYn").prop("checked", true);
                }
            }

            $("#pjtExpAmt").val(comma(e.PJT_EXP_AMT));

            $("#pjtConYear").val(e.PJT_CON_YEAR);

            $("input[name='securityYn'][value='" + e.SECURITY + "']").prop("checked", true);

            if(e.TEAM_STAT == "Y"){
                $("#mngText").text("협업담당자");
                const mainPjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: e.PNT_PJT_SN}).rs;

                $("#mngText").text("협업담당자");

                $("#deptName").val(mainPjtInfo.DEPT_NAME);
                $("#empName").val(mainPjtInfo.EMP_NAME);
                $("#empSeq").val(mainPjtInfo.EMP_SEQ);
                $("#deptSeq").val(mainPjtInfo.DEPT_SEQ);
                $("#staffSelect").hide();
                $("#allBusnCost").val(comma(mainPjtInfo.ALL_BUSN_COST));

            }
            
        }else if($("#paramParentPjtSn").val() != ""){
            $("#yearClass").data("kendoDropDownList").value("M");
            $("#mYearCk").val("Y");
            $("#mYearTr").show();
            $("#supDep").data("kendoDropDownList").trigger("change");
            $("#parentPjtSn").val($("#paramParentPjtSn").val());

            const e = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#paramParentPjtSn").val()}).rs;
            $("#parentPjtNm").val(e.PJT_NM);

            $("#bsTitle").val(e.BS_TITLE);
            $("#sbjClass").data("kendoDropDownList").value(e.SBJ_CLASS);
            $("#supDep").data("kendoDropDownList").value(e.SBJ_DEP);
            $("#supDep").data("kendoDropDownList").trigger("change");
            $("#supDepSub").data("kendoDropDownList").value(e.SBJ_DEP_SUB);
            $("#sbjStrDe").data("kendoDatePicker").value(new Date(e.STR_DT));
            $("#sbjEndDe").data("kendoDatePicker").value(new Date(e.END_DT));
            $("#rndCrmNm").val(e.CRM_NM);
            $("#rndCrmSn").val(e.CRM_SN);
            $("#pjtExpAmt").val(comma(e.PJT_EXP_AMT));
            $("#allBusnCost").val(comma(e.ALL_BUSN_COST));
            $("#allPjtAmt").val(comma(e.ALL_PJT_AMT));

            if(e.CRM_CON_NM = null && e.CRM_CON_NM != ""){
                $("#rndConCrmNm").val(e.CRM_CON_SN);
                $("#rndConCrmSn").val(e.CRM_CON_NM);
            }

            $("#deptName").val(e.DEPT_NAME);
            $("#empName").val(e.EMP_NAME);
            $("#empSeq").val(e.EMP_SEQ);
            $("#deptSeq").val(e.DEPT_SEQ);

            const pmUserInfo = getUser(e.PM_EMP_SEQ);
            $("#mngDeptName").val(pmUserInfo.DEPT_NAME);
            $("#mngDeptSeq").val(pmUserInfo.DEPT_SEQ);
            $("#mngEmpName").val(e.PM);
            $("#mngEmpSeq").val(e.PM_EMP_SEQ);

            $("#pjtNm").val(e.PJT_NM);

            if(e.SBJ_STAT_YN != undefined){
                if(e.SBJ_STAT_YN == "Y"){
                    $("#unRndStatYn").prop("checked", true);
                }
            }
            $("input[name='securityYn'][value='" + e.SECURITY + "']").prop("checked", true);
        }
    },

    fn_multiPjtSet: function(e){
        if(e == null || e.YEAR_CLASS != "M"){
            return;
        }
        const params = {
            pjtSn: $("#mainPjtSn").val(),
            multiParentPjtSn: e.PARENT_PJT_SN == null ? $("#mainPjtSn").val() : e.PARENT_PJT_SN
        }
        const multiPjtResult = customKendo.fn_customAjax("/project/getMultiPjtList", params);
        const list = multiPjtResult.list;
        const len = list.length;

        /** 다년 사업이 존재 할 때 */
        if(list != null && len > 1){
            let html = "";

            html += '<ul style="font-size: 12px; padding-bottom: 2px" class="k-tabstrip-items k-reset" role="none">';
            html += '   <div style="padding: 6px 12px"><b>년차선택</b></div>';
            for(let i=0; i<len; i++){
                const map = list[i];
                console.log("map ["+i+"] : ", map);
                if(map.PJT_SN == $("#pjtSn").val()){
                    html += '   <li class="k-tabstrip-item k-item k-first k-tab-on-top k-state-active">';
                }else{
                    html += '   <li class="k-tabstrip-item k-item k-first k-tab-on-top">';
                }
                html += '       <span class="k-loading k-complete k-progress"></span>';
                if(map.PJT_SN == $("#pjtSn").val()){
                    html += '       <span class="k-link" style="cursor: default !important;">'+(i+1)+'차년도</span>';
                }else{
                    html += '       <span class="k-link" onclick="regUnRnd.fn_changePrj('+map.PJT_SN+', '+map.PARENT_PJT_SN+')">'+(i+1)+'차년도</span>';
                }
                html += '   </li>';
            }
            html += '   <li class="k-tabstrip-item k-item k-first k-tab-on-top">';
            html += '       <span class="k-loading k-complete k-progress"></span>';
            html += '   </li>';
            html += '</ul>';
            $("#multiPrjBar").html(html);
            $("#multiPrjBar").show();
        }
    },

    fn_changePrj: function(key, parentKey){
        location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + key;
    },

    fn_save : function(){
        var parameters = {
            busnClass : "S",
            busnNm : "비R&D",
            yearClass : $("#yearClass").val(),
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
            crmPartSn : $("#crmPartSn").val(),
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),
            allBusnCost : uncomma($("#allBusnCost").val()),

            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),

            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            pjtConYear : $("#pjtConYear").val()

        }

        if($("#unRndStatYn").is(":checked")){
            parameters.sbjStatYn = "Y";
        } else {
            parameters.sbjStatYn = "N";
        }

        $("input[name='securityYn']").each(function(){
            if($(this).is(":checked")){
                parameters.security = this.value;
            }
        });

        /** 다년이면서 2차년도 이상 프로젝트일때(프로젝트 선택했을때) */
        if($("#mYearCk").val() == "Y"){
            parameters.parentPjtSn = $("#parentPjtSn").val()
        }

        parameters.allPjtAmt = uncomma($("#allPjtAmt").val());
        if($("#yearClass").val() == "M"){
            if(parameters.allPjtAmt == "" || parameters.allPjtAmt == 0){
                alert("총 수주금액을 입력해주세요.");
                return;
            }
        }

        if(parameters.yearClass == ""){
            alert("사업구분을 선택해주세요.");
            return;
        }
        if(parameters.mngEmpSeq == ""){
            alert("사업책임자를 선택해주세요.");
            return;
        }
        if(parameters.sbjClass == ""){
            alert("과제구분을 선택해주세요.");
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
        if(parameters.crmSn == ""){
            alert("주관기관을 선택해주세요.");
            return;
        }
        if(parameters.pjtExpAmt == ""){
            alert("예상수주금액을 입력해주세요.");
            return;
        }
        if(parameters.allBusnCost == "" || parameters.allBusnCost == 0){
            alert("총 사업비를 입력해주세요.");
            return;
        }
        if(parameters.empSeq == ""){
            alert("과제담당자를 선택해주세요.");
            return;
        }
        if(parameters.bsTitle == ""){
            alert("사업명을 입력해주세요.")
            return;
        }
        if(parameters.pjtNm == ""){
            alert("과제명을 입력해주세요.");
            return;
        }

        $.ajax({
            url : "/projectUnRnd/setSubjectInfo",
            data : parameters,
            type: "post",
            dataType : "json",
            success : function (rs){
                commonProject.global.pjtSn = rs.params.pjtSn;
                var result = commonProject.setDelvAlarmEvent();
                if(result.flag){
                    if(result.rs != "SUCCESS") {
                        alert(result.message);
                    }
                }

                if(rs.code == 200){
                    location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + rs.params.pjtSn;
                }
            }
        });
    },

    fn_mod : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            yearClass : $("#yearClass").val(),
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
            crmPartSn : $("#crmPartSn").val(),
            pjtExpAmt : uncomma($("#pjtExpAmt").val()),
            allBusnCost : uncomma($("#allBusnCost").val()),

            mngDeptName : $("#mngDeptName").val(),
            mngEmpName : $("#mngEmpName").val(),
            mngDeptSeq : $("#mngDeptSeq").val(),
            mngEmpSeq : $("#mngEmpSeq").val(),

            pjtConYear : $("#pjtConYear").val()
        }

        if($("#unRndStatYn").is(":checked")){
            parameters.sbjStatYn = "Y";
        } else {
            parameters.sbjStatYn = "N";
        }

        $("input[name='securityYn']").each(function(){
            if($(this).is(":checked")){
                parameters.security = this.value;
            }
        });

        /** 다년이면서 2차년도 이상 프로젝트일때(프로젝트 선택했을때) */
        if($("#mYearCk").val() == "Y"){
            parameters.parentPjtSn = $("#parentPjtSn").val()
        }

        /** 관리자권한 이면서 당해년도사업비가 공백이 아니면 값 수정 */
        if($("#mngCk").val() == "Y" && $("#pjtAmt2").val() != ""){
            parameters.pjtAmt = uncomma($("#pjtAmt2").val());
        }

        parameters.allPjtAmt = uncomma($("#allPjtAmt").val());
        if($("#yearClass").val() == "M"){
            if(parameters.allPjtAmt == "" || parameters.allPjtAmt == 0){
                alert("총 수주금액을 입력해주세요.");
                return;
            }
        }

        if(parameters.yearClass == ""){
            alert("사업구분을 선택해주세요.");
            return;
        }
        if(parameters.mngEmpSeq == ""){
            alert("사업책임자를 선택해주세요.");
            return;
        }
        if(parameters.sbjClass == ""){
            alert("과제구분을 선택해주세요.");
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
        if(parameters.crmSn == ""){
            alert("주관기관을 선택해주세요.");
            return;
        }
        if(parameters.pjtExpAmt == ""){
            alert("예상수주금액을 입력해주세요.");
            return;
        }
        if(parameters.allBusnCost == "" || parameters.allBusnCost == 0){
            alert("총 사업비를 입력해주세요.");
            return;
        }
        if(parameters.empSeq == ""){
            alert("과제담당자를 선택해주세요.");
            return;
        }
        if(parameters.bsTitle == ""){
            alert("사업명을 입력해주세요.")
            return;
        }
        if(parameters.pjtNm == ""){
            alert("과제명을 입력해주세요.");
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

    fn_stopModal : function (){
        if(!confirm("진행중인 프로젝트를 중단하시겠습니까?")){
            return false;
        }

        $("#pjtStopModal").data("kendoWindow").open();

    },

    fn_stop : function(){
        var data = {
            pjtSn : $("#pjtSn").val(),
            pjtStopRs : $("#pjtStopRs").val()
        }

        $.ajax({
            url : "/project/stopProject",
            type : 'POST',
            data : data,
            dataType : "json",
            success : function (rs){
                window.location.reload();
            }
        })
    },

    fn_checkPass: function(){
        let pass = $("#pjtSecurity").val();
        if(pass != "12345"){
            alert("비밀번호가 다릅니다.");
            $("#pjtSecurity").val("");
            return;
        }else{
            const setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#mainPjtSn").val()}).rs;
            regUnRnd.fn_setTab(setParameters);
            $("#pjtSecurityModal").data("kendoWindow").close();
        }
    },

    fn_projectPop: function(type){
        var url = "/project/pop/projectView.do?openType=" + type+"&busnClass=S";
        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_nextPjt: function(i, key){
        var url = "/projectUnRnd/pop/regProject.do?paramParentPjtSn="+$("#pjtSn").val();
        var name = "_blank";
        var option = "width = 1680, height = 850, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}