const bustripReq = {
    init: function(){
        bustrip.fn_setPageName();
        bustripReq.pageSet();
        bustripReq.dataSet();
        bustripReq.fn_crmChk();
    },

    pageSet: function(){
        /** Kendo 위젯 세팅 */
        customKendo.fn_textBox(["busnName", "popEmpName", "externalName", "visitCrm", "visitLoc", "visitLocSub", "userName", "moveDst", "empSeq", "empName", "deptName", "dutyName"]);
        customKendo.fn_textArea(["bustObj"]);
        customKendo.fn_datePicker("reqDate", 'month', "yyyy-MM-dd", new Date());
        $("#visitCrm").attr("readonly", true);

        /** 출장코드 세팅 */
        bustrip.fn_tripCodeSet();

        /** 출장신청기간 세팅 */
        bustrip.fn_reqDtSet();
        /** 관련사업 세팅 */
        bustrip.fn_busnLgSet();
        /** 차량코드 세팅 */
        bustrip.fn_carCodeSet();
        /** 경유지코드 세팅 */
        bustrip.fn_waypointCodeSet();

        $("input[name='project']").click(function (){
            if(this.value == "2"){
                $("#busnLine").css("display", "");
            } else {
                $("#busnLine").css("display", "none");
            }
        });

        if($("#paramsPjtSn").val() != ""){
            $("#project").data("kendoRadioGroup").value("2");
            $("input[name='project']").trigger("click");

            var data = {
                pjtSn: $("#paramsPjtSn").val()
            }
            var pjtMap = customKendo.fn_customAjax("/project/getProjectData", data);

            pjtMap = pjtMap.data;

            $("#pjtSn").val($("#paramsPjtSn").val());
            $("#busnName").val(pjtMap.PJT_NM);

        }

        /** 해외출장 메뉴에서 신청하면 자동으로 바인딩*/
        if($("#paramsTripCode").val() == "4"){
            this.busiCk();
        }
    },

    busiCk: function(){
        $("#tripCode").data("kendoRadioGroup").value(4);
        $("#tripCode").data("kendoRadioGroup").enable(false);
        $("#tripCode").data("kendoRadioGroup").trigger("change");

        business.fn_nationCodeSet();
        $(".bustripTh").hide();
        $(".businessTh").show();
    },

    dataSet: function(){
        if(hrBizReqId == ""){ return; }

        const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: hrBizReqId
        });
        const busInfo = result.rs.rs;
        const list = result.rs.list;
        const fileInfo = result.rs.fileInfo;

        console.log(busInfo);
        var apprBtnBoxHtml = "";
        if(busInfo.STATUS == 0){
            apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripList.bustripDrafting(\""+busInfo.HR_BIZ_REQ_ID+"\");'>" +
                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                "<span class='k-button-text'>상신</span>" +
                "</button>";
        } else if(busInfo.STATUS == 10 || busInfo.STATUS == 50){
            apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+busInfo.DOC_ID+"\", \""+busInfo.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                "<span class='k-button-text'>회수</span>" +
                "</button>";
        } else if(busInfo.STATUS == 30 || busInfo.STATUS == 40){
            apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+busInfo.DOC_ID+"\", \""+busInfo.DOC_MENU_CD+"\", \""+busInfo.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                "<span class='k-button-text'>재상신</span>" +
                "</button>";
        } else if(busInfo.STATUS == 100){
            apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+busInfo.DOC_ID+"\", \""+busInfo.APPRO_KEY+"\", \""+busInfo.DOC_MENU_CD+"\");'>" +
                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                "<span class='k-button-text'>열람</span>" +
                "</button>";
            if(busInfo.TRIP_CODE == "4"){
                apprBtnBoxHtml += "<input type='button' id='saveBtn' class='k-button k-button-solid-info' value='사전정산' onclick='bustPop.bustripExnpPop(\""+busInfo.HR_BIZ_REQ_ID+"\")' />";
            }
        } else{
            apprBtnBoxHtml = "";
        }

        $("#apprBtnBox").html(apprBtnBoxHtml);
        
        /** 사번, 성명, 부서명, 신청일 */
        $("#empSeq").val(busInfo.EMP_SEQ);
        $("#empName").val(busInfo.EMP_NAME);
        $("#deptName").val(busInfo.DEPT_NAME);
        $("#reqDate").val(busInfo.REG_DATE);

        /** 구분 */
        $("#tripCode").data("kendoRadioGroup").value(busInfo.TRIP_CODE);

        /** 관련사업, 프로젝트명 */
        bustripInit.settingProjectDataInit(busInfo);

        /** 동반자 */
        bustripInit.settingCompanionDataInit(list);

        /** 방문지 */
        $("#crmSn").val(busInfo.CRM_SN);
        $("#visitCrm").val(busInfo.VISIT_CRM);
        if($("#crmSn").val() == "99999999"){
            $("#crmYn").attr("checked", false);
        } else {
            $("#crmYn").attr("checked", true);
        }

        /** 출장지역 */
        $("#visitLoc").val(busInfo.VISIT_LOC);

        /** 경유지, km, 경유지명*/
        let visitLocCode = $("#visitLocCode").data("kendoDropDownList");
        visitLocCode.value(busInfo.VISIT_LOC_CODE);
        visitLocCode.trigger("change");
        if($("#visitLocCode").val() == "999"){
            $("#visitLocSub").val(busInfo.VISIT_LOC_SUB);
        }

        /** 출장일 */
        $("#date1").val(busInfo.TRIP_DAY_FR);
        $("#date2").val(busInfo.TRIP_DAY_TO);
        $("#time1").val(busInfo.TRIP_TIME_FR);
        $("#time2").val(busInfo.TRIP_TIME_TO);

        if(busInfo.PJT_SN != null){
            $("#project").data("kendoRadioGroup").value("2");
            $("input[name='project']").trigger("click");
        } else {
            $("#project").data("kendoRadioGroup").value("1");
        }


        $("#busnName").val(busInfo.BUSN_NAME);
        $("#pjtSn").val(busInfo.PJT_SN);

        /** 차량 */
        $("#carList").data("kendoDropDownList").value(busInfo.USE_TRSPT);
        if(busInfo.USE_CAR == "Y"){
            $("#car2").prop("checked", true);
        } else {
            $("#car1").prop("checked", true);
        }

        /** 출장목적 */
        $("#bustObj").val(busInfo.TITLE);

        /** 첨부파일 */
        bustripInit.settingTempFileDataInit(fileInfo);


        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if((busInfo.STATUS != 0 && busInfo.STATUS != 30) || $("#mod").val() == "mng"){
            $(':radio:not(:checked)').attr('disabled', true);

            $("#busnName").data("kendoTextBox").enable(false);
            $("#projectAddBtn").css("display", "none");

            $("#popEmpName").data("kendoTextBox").enable(false);
            $("#addMemberBtn").css("display", "none");

            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#visitLoc").data("kendoTextBox").enable(false);
            $("#crmBtn").css("display", "none");
            $("#crmYn").attr("disabled", "true");

            $("#visitLocCode").data("kendoDropDownList").enable(false);
            if($("#visitLocCode").val() == "999"){
                $("#visitLocSub").data("kendoTextBox").enable(false);
            }

            $("#date1").data("kendoDatePicker").enable(false);
            $("#date2").data("kendoDatePicker").enable(false);
            $("#time1").data("kendoTimePicker").enable(false);
            $("#time2").data("kendoTimePicker").enable(false);

            $("#carList").data("kendoDropDownList").enable(false);
            $("#carBtn").css("display", "none");

            $("#bustObj").data("kendoTextArea").enable(false);

            $("#fileUpload").css("display", "none");

            $("#modBtn").css("display", "none");
            if($("#mod").val() == "mng"){
                $("#saveBtn").css("display", "none");
            }
        }

        if(busInfo.TRIP_CODE == "4"){
            this.busiCk();
            $("#nationList").data("kendoDropDownList").value(busInfo.NATION_CODE);
            $("#nationList").data("kendoDropDownList").trigger("change");
        }
    },

    fn_saveBtn: function(){
        if($("#tripCode").data("kendoRadioGroup").value() == ""){ alert("출장 구분을 선택해주세요."); return;}
        if($("#project").data("kendoRadioGroup").value() != "1" && $("#busnName").val() == ""){ alert("사업명을 입력해주세요."); return;}
        if($("#visitCrm").val() == ""){ alert("방문지를 입력해주세요."); return; }
        if($("#tripCode").data("kendoRadioGroup").value() != "4" && $("#visitLoc").val() == ""){ alert("출장지역을 입력해주세요."); return; }
        if($("#tripCode").data("kendoRadioGroup").value() == "4" && $("#nationList").data("kendoDropDownList").value() == ""){ alert("출장국가를 선택해주세요."); return; }
        if($("#visitLocCode").val() == "999" && $("#visitLocSub").val() == ""){ alert("경유지명을 입력해주세요."); return;}
        if($("#bustObj").val() == ""){ alert("출장목적을 입력해주세요."); return; }

        if($("#tripCode").data("kendoRadioGroup").value() != 4 && $("#tripCode").data("kendoRadioGroup").value() != ""){
            if($("#carList").val() == ""){ alert("차량을 선택해주세요."); return; }
        }

        var formData = new FormData();
        formData.append("menuCd", "bustripReq");
        formData.append("empSeq", $("#regEmpSeq").val());
        formData.append("empName", $("#regEmpName").val());
        formData.append("deptSeq", $("#regDeptSeq").val());
        formData.append("deptName", $("#regDeptName").val());
        formData.append("positionCode", $("#regPositionCode").val());
        formData.append("dutyCode", $("#regDutyCode").val());
        formData.append("applyDate", $("#reqDate").val());
        formData.append("tripCode", $("#tripCode").data("kendoRadioGroup").value());
        formData.append("busnName", $("#busnName").val());
        if($("#pjtSn").val() != ""){
            formData.append("pjtSn", $("#pjtSn").val());
        }
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
        if($("#crmYn").is(':checked')){
            formData.append("crmSn", $("#crmSn").val());
        } else {
            formData.append("crmSn", "99999999");
        }
        formData.append("visitCrm", $("#visitCrm").val());

        if($("#tripCode").data("kendoRadioGroup").value() != "4"){
            formData.append("visitLoc", $("#visitLoc").val());
        }else{
            formData.append("visitLoc", $("#nationList").data("kendoDropDownList").text());
            formData.append("nationCode", $("#nationList").data("kendoDropDownList").value());
        }
        formData.append("visitLocSub", $("#visitLocCode").val() == "999" || $("#visitLocCode").val() == "" ? $("#visitLocSub").val() : $("#visitLocCode").data("kendoDropDownList").text());
        formData.append("visitLocCode", $("#visitLocCode").val());
        formData.append("tripDayFr", $("#date1").val());
        formData.append("tripDayTo", $("#date2").val());
        formData.append("tripTimeFr", $("#time1").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("useCar", "Y");
        formData.append("useTrspt", $("#carList").val());
        formData.append("title", $("#bustObj").val());

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("bustripFile", fCommon.global.attFiles[i]);
            }
        }

        /** 차량신청 체크 */
        if($("#tripCode").data("kendoRadioGroup").value() != 4 && $("#carList").val() != "10" && $("#carList").val() != "0"){
            let data = {
                startDt : $("#date1").val(),
                endDt : $("#date2").val(),
                startTime : $("#time1").val(),
                endTime : $("#time2").val(),
                useDeptSeq : $("#regDeptSeq").val(),
                useDeptName : $("#regDeptName").val(),
                carClassSn : $("#carList").val(),
                carClassText : $("#carList").data("kendoDropDownList").text(),
                carTypeSn : 1,
                carTypeText : "업무용",
                carTitleName : $("#bustObj").val(),
                visitName : $("#visitLoc").val(),
                waypointName : $("#visitLocSub").val(),
                empSeq : $("#regEmpSeq").val(),
                empName : $("#regEmpName").val(),
                regEmpSeq : $("#regEmpSeq").val(),
                regEmpName : $("#regEmpName").val(),
                type: "bustripReq"
            }
            carReq.searchDuplicateCar(data);

            if(flag) {
                carReq.setCarRequestInsert(data);
            }
        }else {
            flag = true;
        }

        if(flag || (!flag && carType == "B")){
            if(hrBizReqId == ""){
                if(!confirm("출장신청을 진행하시겠습니까?")){ return; }
            }else{
                if(!confirm("출장 데이터를 수정하시겠습니까?")){ return; }
                formData.append("hrBizReqId", hrBizReqId);
            }

            $.ajax({
                url : "/bustrip/setBustripReq",
                type : 'POST',
                data : formData,
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async : false,
                success : function(rs){
                    var loadType = "";
                    if(hrBizReqId == ""){
                        alert("출장 신청이 완료되었습니다.");
                        reloadType = "href"
                    }else{
                        alert("출장 수정이 완료되었습니다.");
                        reloadType = "reload";
                    }

                    if($("#paramsPjtSn").val() == "") {
                        opener.gridReload();
                    }else{
                        const busnClass = opener.commonProject.global.busnClass;
                        if(opener.commonProject.global.teamStat == "Y"){
                            if(busnClass == "D"){
                                opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
                            }else if(busnClass == "R"){
                                opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=3";
                            }else if(busnClass == "S"){
                                opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=3";
                            }else{
                                opener.window.location.reload();
                            }
                            /** 협업이 아닐때 */
                        }else{
                            if(busnClass == "D"){
                                opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=9";
                            }else if(busnClass == "R"){
                                opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=9";
                            }else if(busnClass == "S"){
                                opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=9";
                            }else{
                                opener.window.location.reload();
                            }
                        }
                    }

                    if(reloadType == "href"){
                        location.href = "/bustrip/pop/bustripReqPop.do?hrBizReqId=" + rs.rs.hrBizReqId;
                    }else{
                        location.reload();
                    }
                    //window.close();
                }
            });
        }
    },

    test: function(){
        window.open('/indexB.do', '123123');
        opener.parent.open_in_frame('/Inside/carReq.do');
    },

    carViewPop: function(){
        let url = "/Inside/pop/carViewPop.do";
        const name = "carViewPop";
        const option = "width = 1200, height = 730, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    // 업체정보 조회
    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_projectPop : function (){

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_crmChk : function(){
        if($("#crmYn").is(':checked')){
            $("#visitCrm").attr("readonly", true)
            $("#crmBtn").attr('disabled', false);
        } else {
            $("#visitCrm").attr('readonly', false);
            $("#crmBtn").attr('disabled', true);
        }
    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#visitLoc").val(roadAddr);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        //$("#subAddr").val(extraRoadAddr);
                    } else {
                        //$("#subAddr").val("");
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else if(guideTextBox != null){
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }

                    $("#visitLoc").focus();
                }
            }).open();
        });
    }
}

function userDataSet(userArr){
    let userText = "";
    let userSn = "";
    let userDeptText = "";
    let userDeptSn = "";
    for(let i=0; i<userArr.length; i++) {
        if(userText != "") {
            userText += ",";
            userSn += ",";
            userDeptText += ",";
            userDeptSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
        userDeptText += userArr[i].deptName;
        userDeptSn += userArr[i].deptSeq;
    }

    $("#popEmpSeq").val(userSn);
    $("#popEmpName").val(userText);
    $("#popDeptSeq").val(userDeptSn);
    $("#popDeptName").val(userDeptText);
}

function externalDataSet(externalArr){
    let belongText = "";
    let spotText = "";
    let nameText = "";
    let userDeptSn = "";
    for(let i=0; i<externalArr.length; i++) {
        if(nameText != "") {
            belongText += ",";
            spotText += ",";
            nameText += ",";
            userDeptSn += ",";
        }
        belongText += externalArr[i].belong;
        spotText += externalArr[i].spot;
        nameText += externalArr[i].name;
        userDeptSn += externalArr[i].etc;
    }

    $("#externalBelong").val(belongText);
    $("#externalSpot").val(spotText);
    $("#externalName").val(nameText);
    $("#externalEtc").val(userDeptSn);
}

function selectProject(key, name){
    $("#busnName").val(name);
    $("#pjtSn").val(key);
}