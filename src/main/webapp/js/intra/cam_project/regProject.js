var regPrj = {


    fn_defaultScript : function () {
        let setParameters = null;

        if($("#mainPjtSn").val() != ""){
            setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#mainPjtSn").val()}).rs;
        }

        /** 외부공개 여부 비공개일시 비밀번호 입력하는 모달창 뜸*/
        if(setParameters != null && setParameters.SECURITY == "Y"){
            regPrj.fn_setPage(setParameters);
            regPrj.fn_setData(setParameters);
            openSecurityModal();
        }else{
            regPrj.fn_setPage(setParameters);
            regPrj.fn_setData(setParameters);
            regPrj.fn_setTab(setParameters);
        }
    },

    fn_setTab: function(setParameters){
        if(setParameters != null && setParameters.PJT_SN != null){
            setParameters.pjtSn = setParameters.PJT_SN;
            $("#stopBtn").show();
        } else {
            openModalSelect();
        }

        var delvResult = customKendo.fn_customAjax("/project/engn/getDelvData", setParameters);
        var devREsult = customKendo.fn_customAjax("/project/engn/getDevData", setParameters);
        var delvMap = delvResult.delvMap;
        var devMap = devREsult.rs;
        var tab0Url = "/intra/cam_project/crmInfo.do"; // 00상담정보
        var tab1Url = "/intra/cam_project/estInfo.do"; // 01견적관리
        var tab2Url = "/intra/cam_project/delvInfo.do"; // 02수주보고
        var tab3Url = "/intra/cam_project/devInfo.do"; // 03수행계획
        var tab4Url = "/intra/cam_project/processInfo.do"; // 04공정
        var tab5Url = "/intra/cam_project/teamInfoEngn.do"; // 05협업
        var tab6Url = "/intra/cam_project/goodsInfo.do"; // 06납품관리
        var tab7Url = "/intra/cam_project/resultInfo.do"; // 07결과보고
        var tab8Url = "/intra/cam_project/performanceInfo.do"; // 08실적관리
        var tab9Url = "/intra/cam_project/costPriceInfo.do"; // 09원가보고


        var tab10Url = "/intra/cam_project/bustInfo.do"; // 10출장
        var tab11Url = "/intra/cam_project/purcInfo.do"; // 11구매
        var tab12Url ="/intra/cam_project/depositInfo.do"; // 12입금관리
        var tab13Url = "/intra/cam_project/costPriceInfoAdmin.do"; // 13정산서
        var tab14Url = "/intra/cam_project/equipInfo.do";  // 14장비

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
            tab12Url += "?pjtSn=" + setParameters.PJT_SN;
            tab13Url += "?pjtSn=" + setParameters.PJT_SN;
            tab14Url += "?pjtSn=" + setParameters.PJT_SN;
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
            tab11Url += "&engnSn=" + setParameters.ENGN_SN;
            tab12Url += "&engnSn=" + setParameters.ENGN_SN;
            tab13Url += "&engnSn=" + setParameters.ENGN_SN;
            tab14Url += "&engnSn=" + setParameters.ENGN_SN;
        }

        let dataSource;
        if(setParameters != null && setParameters.TEAM_STAT == "Y"){
            dataSource = [
                {name: "견적관리", url: tab1Url},
                {name: "수행계획", url: tab3Url},
                {name: "공정", url: tab4Url},
                {name: "납품관리", url: tab6Url},
                {name: "실적관리", url: tab8Url},

                {name: "출장", url: tab10Url},
                {name: "구매", url: tab11Url},
                {name: "장비", url: tab14Url}
            ]
        } else {
            dataSource = [
                {name: "상담정보", url: tab0Url},
                {name: "견적관리", url: tab1Url},
                {name: "수주보고", url: tab2Url, imageUrl : "/images/ico/etc_01_1.png"},
                {name: "수행계획", url: tab3Url, imageUrl : "/images/ico/etc_01_1.png"},
                {name: "공정", url: tab4Url},
                {name: "협업", url: tab5Url},
                {name: "납품관리", url: tab6Url},
                {name: "결과보고", url: tab7Url, imageUrl : "/images/ico/etc_01_1.png"},
                {name: "실적관리", url: tab8Url},

                {name: "출장", url: tab10Url},
                {name: "구매", url: tab11Url},
                {name: "입금관리", url: tab12Url},
                {name: "정산서", url: tab13Url},
                {name: "장비", url: tab14Url}
            ]
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

        /** 협업일때 */
        if(setParameters.TEAM_STAT == "Y"){
            tabStrip.enable(tabStrip.tabGroup.children());

            /** 실적관리는 수주부서 결과보고 완료시 오픈 */
            tabStrip.disable(tabStrip.tabGroup.children().eq(4));
            var resultMap = customKendo.fn_customAjax("/project/engn/getResultInfo", {
                pjtSn: setParameters.PNT_PJT_SN,
            }).result.map;

            if(resultMap != null){
                console.log("resultMap")
                console.log(resultMap)
                if(setParameters.PM_EMP_SEQ == $("#regEmpSeq").val() && resultMap.STATUS == "100"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(4));
                }
            }

            /** 탭 두줄 */
            var parser = new DOMParser();
            var html = '<div style="width:100%;"></div>';
            var doc = parser.parseFromString(html, 'text/html');
            $("#tabstrip li")[4].after(doc.body.firstChild);

            /** 첫줄에 사업관리 문구 추가 */
            var html2 = '<div style="padding: 6px 12px"><b style="color: red">사업관리</b></div>';
            var doc2 = parser.parseFromString(html2, 'text/html');
            $("#tabstrip li")[0].before(doc2.body.firstChild);

            /** 둘째줄에 운영관리 문구 추가 */
            var html3 = '<div style="padding: 6px 12px"><b style="color: blue">운영관리</b></div>';
            var doc3 = parser.parseFromString(html3, 'text/html');
            $("#tabstrip li")[5].before(doc3.body.firstChild);

        /** 협업이 아닐 때 */
        } else {
            if(setParameters.PJT_SN){
                tabStrip.enable(tabStrip.tabGroup.children().eq(0));
            }

            if(setParameters.PJT_STEP == "E"){
                tabStrip.enable(tabStrip.tabGroup.children().eq(0));
            }

            if(setParameters.PJT_STOP != "Y"){
                if(setParameters.PJT_STEP >= "E0"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(1));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(9));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(10));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(11));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(13));
                }

                if(setParameters.PJT_STEP >= "E1"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(2));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(5));
                }

                if(setParameters.PJT_STEP > "E2" && delvMap.STATUS == "100"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(3));
                }

                if(setParameters.PJT_STEP > "E3"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(4));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(6));
                    tabStrip.enable(tabStrip.tabGroup.children().eq(7));
                }

                if(setParameters.PJT_STEP >= "E6"){
                    tabStrip.enable(tabStrip.tabGroup.children().eq(12));

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
            var parser = new DOMParser();
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
    },

    fn_setPage: function(){
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
                var bcDs = customKendo.fn_customAjax("/common/commonCodeList", {
                    cmGroupCode : "BUSN_CLASS",
                });
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
        });
        $("#busnLgClass").data("kendoDropDownList").wrapper.hide();
        customKendo.fn_textBox(["pjtNm", "expAmt", "contLoc", "deptName", "empName", "pjtStopRs", "pjtAmt2"]);
        customKendo.fn_datePicker("consultDt", "depth", "yyyy-MM-dd", new Date());

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

        $("#contLoc").data("kendoTextBox").enable(false);
    },

    fn_setData : function (p) {
        console.log(p);
        if(p == null){
            return;
        }

        var busnLgClass = $("#busnLgClass").data("kendoDropDownList");
        var busnClass;

        if(p.BUSN_CLASS == "D" || p.BUSN_CLASS == "V"){
            busnLgClass.value(2);
            busnLgClass.trigger("change");
            busnClass = $("#busnClass").data("kendoDropDownList");
            busnClass.value(p.BUSN_CLASS);
        }

        if(p.BUSN_CLASS == "D" || p.BUSN_CLASS == "V"){
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

        $("#pjtTitle").text("프로젝트 - " + p.BUSN_NM + pjtCode);
        $("#pjtNm").val(p.PJT_NM);

        $("#pjtAmt2").val(regPrj.comma(p.PJT_AMT));
        if(p.TEAM_STAT != "Y"){
            $("#expAmt").val(regPrj.comma(p.EXP_AMT));
        }else{
            $("#expAmt").val(regPrj.comma(p.PJT_AMT));
        }

        $("#contLoc").val(p.CONT_LOC);
        $("#contLocSn").val(p.CONT_LOC_SN);
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
        $("input[name='securityYn'][value='" + p.SECURITY + "']").prop("checked", true);
    },

    fn_busnDDLChange: function(e){
        var value = this.value();

        console.log(value);
        if(value == "D" || value == "V"){
            $("#vEngi").css("display", "");
            $("#commFileHtml").css("display", "");
        } else if (value == "R") {
            location.href="/projectRnd/pop/regProject.do";
        } else if (value == "S") {
            location.href="/projectUnRnd/pop/regProject.do";
        } else {
            $("#vEngi").css("display", "none");
            $("#commFileHtml").css("display", "none");
        }
    },

    fn_save: function (){
        if($("#pjtNm").val() == ""){
            alert("제목을 입력해주세요."); return;
        }
        if($("#expAmt").val() == ""){
            alert("견적가를 입력해주세요."); return;
        }
        if($("#contLocSn").val() == ""){
            alert("업체명을 선택해주세요."); return;
        }

        var data = {
            pjtNm : $("#pjtNm").val(),
            expAmt : regPrj.uncomma($("#expAmt").val()),
            contLoc : $("#contLoc").val(),
            contLocSn : $("#contLocSn").val(),
            deptName : $("#deptName").val(),
            empName : $("#empName").val(),
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            busnClass : $("#busnClass").val(),
            busnNm : $("#busnClass").data("kendoDropDownList").text(),
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            contDt : $("#consultDt").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        $("input[name='securityYn']").each(function(){
            if($(this).is(":checked")){
                data.security = this.value;
            }
        });

        if(data.busnNm == "D"){
            data.menuCd = "engn";
        }

        if($("#mainPjtSn").val() != ""){
            data.pjtSn = $("#mainPjtSn").val()
        }


        $.ajax({
            url : "/project/setProject",
            type : 'POST',
            data : data,
            dataType : "json",
            async : false,
            success : function(rs){
                if($("#mainPjtSn").val() == ""){
                    commonProject.global.pjtSn = rs.params.PJT_SN;
                    var result = commonProject.setDelvAlarmEvent();
                    if(result.flag){
                        if(result.rs != "SUCCESS") {
                            alert(result.message);
                        }
                    }
                }

                opener.parent.camPrj.gridReload();
                if($("#mainPjtSn").val() == ""){
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + rs.params.PJT_SN;
                }else{
                    window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#mainPjtSn").val();
                }
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


    fn_dateTimeToString : function (dateTime){
        var date = new Date(dateTime);
        var yyyy = date.getFullYear();
        var mm = date.getMonth()+1;
        mm = mm >= 10 ? mm : '0'+mm;	// 10 보다 작으면 0을 앞에 붙여주기 ex) 3 > 03
        var dd = date.getDate();
        dd = dd >= 10 ? dd : '0'+dd;	// 10 보다 작으면 9을 앞에 붙여주기 ex) 9 > 09
        return yyyy+'-'+mm+'-'+dd;
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

    fn_startProject : function (){
        if(!$("input[name='projectLg']").is(":checked")){
            alert("사업을 선택해주세요.");
            return;
        }

        if(!$("input[name='projectSm']").is(":checked")){
            alert("사업을 선택해주세요.");
            return;
        }

        var lgValue = $("input[name='projectLg']:checked").val();
        var busnLgClass = $("#busnLgClass").data("kendoDropDownList");
        if(lgValue == "1"){
            busnLgClass.select(1);
        } else {
            busnLgClass.select(2);
        }

        busnLgClass.trigger("change");


        var smValue =$("input[name='projectSm']:checked").val();
        console.log(smValue);
        if(smValue == "D"){
            var busnClass = $("#busnClass").data("kendoDropDownList");
            busnClass.select(1);
        } else if (smValue == "R") {
            var busnClass = $("#busnClass").data("kendoDropDownList");
            busnClass.select(1);
        } else if (smValue == "S"){
            var busnClass = $("#busnClass").data("kendoDropDownList");
            busnClass.select(2);
        } else if (smValue == "V"){
            var busnClass = $("#busnClass").data("kendoDropDownList");
            busnClass.select(2);
        }


        busnClass.trigger("change");

        busnLgClass.wrapper.hide();
        busnClass.wrapper.hide();

        $("#pjtSelectModal").data("kendoWindow").close();
    },

    fn_checkPass: function(){
        let pass = $("#pjtSecurity").val();
        if(pass != "12345"){
            alert("비밀번호가 다릅니다.");
            $("#pjtSecurity").val("");
            return;
        }else{
            const setParameters = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#mainPjtSn").val()}).rs;
            regPrj.fn_setTab(setParameters);
            $("#pjtSecurityModal").data("kendoWindow").close();
        }
    }
}