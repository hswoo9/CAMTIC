var bustripResultPop = {
    init: function(){
        bustrip.fn_setPageName();
        bustripResultPop.pageSet();
        bustripResultPop.fn_crmChk();

        /** 출장결과보고 미작성 시 출장신청 데이터 로드 */
        if(hrBizReqResultId == ""){
            bustripResultPop.reqDataSet();
        }else{
            bustripResultPop.resDataSet();
        }
    },

    pageSet: function(){
        /** Kendo 위젯 세팅 */
        customKendo.fn_textBox(["busnName", "popEmpName", "visitCrm", "visitLoc", "visitLocSub", "userName", "moveDst", "empSeq", "empName", "deptName", "dutyName"]);
        customKendo.fn_textArea(["bustObj", "result"]);
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
        /** 운행자리스트 세팅 */
        bustrip.fn_realDriverSet();

        $("input[name='project']").click(function (){
            if(this.value == "2"){
                $("#busnLine").css("display", "");
            } else {
                $("#busnLine").css("display", "none");
            }
        });
    },

    reqDataSet: function(){
        if(hrBizReqId == ""){ return; }

        const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: hrBizReqId
        });
        const busInfo = result.rs.rs;
        const list = result.rs.list;
        const fileInfo = result.rs.fileInfo;

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
        bustripResultPop.fn_crmChk();

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
            $("input[name='project'][value='2']").trigger("click");
        } else {
            $("#project").data("kendoRadioGroup").value("1");
            $("input[name='project'][value='1']").trigger("click");
        }

        $("#busnName").val(busInfo.BUSN_NAME);
        $("#pjtSn").val(busInfo.PJT_SN);

        $("#project").data("kendoRadioGroup").enable(false);

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

        /** 해외출장일시 폼 변경 */
        if(busInfo.TRIP_CODE == "4"){
            business.busiCk();
            $("#nationList").data("kendoDropDownList").value(busInfo.NATION_CODE);
            $("#nationList").data("kendoDropDownList").trigger("change");
        }

        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if($("#mod").val() == "mng"){
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

            $("#moveDst").data("kendoTextBox").enable(false);
            $("#moveBtn").css("display", "none");
            $("#highpassBtn").css("display", "none");

            $("#realDriver").data("kendoDropDownList").enable(false);

            $("#result").data("kendoTextArea").enable(false);

            $("#fileUpload").css("display", "none");

            if($("#mod").val() == "mng"){
                $("#saveBtn").css("display", "none");
            }
        }
    },

    resDataSet: function() {
        const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: hrBizReqId,
            hrBizReqResultId: hrBizReqResultId
        });

        const map = result.rs.map;
        const resInfo = result.rs.rsRes;
        const resList = result.rs.resList;
        const fileInfo = result.rs.fileInfo;

        console.log(resInfo);
        $("#apprBtnBox").html("");
        var apprBtnBoxHtml = "";
        if($("#mod").val() == "mng"){
            if(resInfo.EXP_STAT == 100){
                if(resInfo.STATUS == 100 || resInfo.STATUS == 101){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_APPRO_KEY+"\", \""+resInfo.DOC_MENU_CD+"\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>열람</span>" +
                        "</button>";
                } else{
                    apprBtnBoxHtml = "";
                }
            }
        }else{
            if(resInfo.EXP_STAT == 100){
                if(resInfo.STATUS == 0){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='bustripResList.bustripResDrafting(\""+resInfo.HR_BIZ_REQ_RESULT_ID+"\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                } else if(resInfo.STATUS == 10){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_APPRO_KEY+"\", 1, \"retrieve\");'>" +
                        "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                        "<span class='k-button-text'>회수</span>" +
                        "</button>";
                } else if(resInfo.STATUS == 30 || resInfo.STATUS == 40){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_MENU_CD+"\", \""+resInfo.DOC_APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>재상신</span>" +
                        "</button>";
                } else if(resInfo.STATUS == 100 || resInfo.STATUS == 101){
                    apprBtnBoxHtml = "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+resInfo.DOC_ID+"\", \""+resInfo.DOC_APPRO_KEY+"\", \""+resInfo.DOC_MENU_CD+"\");'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>열람</span>" +
                        "</button>";
                } else{
                    apprBtnBoxHtml = "";
                }
            } else {
                apprBtnBoxHtml = ""
            }
        }

        $("#apprBtnBox").html(apprBtnBoxHtml);

        $("#empSeq").val(resInfo.EMP_SEQ);
        $("#empName").val(resInfo.EMP_NAME);
        $("#deptName").val(resInfo.DEPT_NAME);
        $("#reqDate").val(resInfo.REPORT_DATE);

        $("#tripCode").data("kendoRadioGroup").value(resInfo.TRIP_CODE);

        /** 관련사업, 프로젝트명 */
        bustripInit.settingProjectDataInit(resInfo);

        if(resInfo.PJT_SN != null){
            $("#project").data("kendoRadioGroup").value("2");
            $("input[name='project'][value='2']").trigger("click");
        } else {
            $("#project").data("kendoRadioGroup").value("1");
            $("input[name='project'][value='1']").trigger("click");
        }

        /** 동반자 */
        bustripInit.settingCompanionDataInit(resList);

        /** 방문지 */
        $("#crmSn").val(resInfo.CRM_SN);
        $("#visitCrm").val(resInfo.VISIT_CRM);
        if($("#crmSn").val() == "99999999"){
            $("#crmYn").attr("checked", false);
        } else {
            $("#crmYn").attr("checked", true);
        }
        bustripResultPop.fn_crmChk();

        /** 출장지역 */
        $("#visitLoc").val(resInfo.VISIT_LOC);

        /** 경유지, km, 경유지명*/
        let visitLocCode = $("#visitLocCode").data("kendoDropDownList");
        visitLocCode.value(resInfo.VISIT_LOC_CODE);
        visitLocCode.trigger("change");
        if($("#visitLocCode").val() == "999"){
            $("#visitLocSub").val(resInfo.VISIT_LOC_SUB);
        }

        /** 출장일 */
        $("#date1").val(resInfo.TRIP_DAY_FR);
        $("#date2").val(resInfo.TRIP_DAY_TO);
        $("#time1").val(resInfo.TRIP_TIME_FR);
        $("#time2").val(resInfo.TRIP_TIME_TO);

        /** 차량 */
        $("#bustObj").val(resInfo.TITLE);
        $("#carList").data("kendoDropDownList").value(resInfo.USE_TRSPT);
        if(resInfo.USE_CAR == "Y"){
            $("#car2").prop("checked", true);
        } else {
            $("#car1").prop("checked", true);
        }

        /** 출장목적 */
        $("#bustObj").val(resInfo.TITLE);

        /** 해외출장일시 폼 변경 */
        if(resInfo.TRIP_CODE == "4"){
            business.busiCk();
            $("#nationList").data("kendoDropDownList").value(resInfo.NATION_CODE);
            $("#nationList").data("kendoDropDownList").trigger("change");
        }else{
            /** 운행거리 */
            $("#moveDst").val(resInfo.MOVE_DST);
            /** 운행자 */
            $("#realDriver").data("kendoDropDownList").value(resInfo.DRIVER_EMP_SEQ);
        }

        /** 출장 결과 */
        $("#result").val(resInfo.RESULT);

        /** 여비 표 */
        bustripInit.settingExnpDataInit(map);

        /** 첨부파일 */
        bustripInit.settingTempFileDataInit(fileInfo, 'result');

        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if(resInfo.STATUS == 100 || $("#mod").val() == "mng"){
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

            $("#moveDst").data("kendoTextBox").enable(false);
            $("#moveBtn").css("display", "none");
            $("#highpassBtn").css("display", "none");

            if(resInfo.TRIP_CODE != "4"){
                $("#realDriver").data("kendoDropDownList").enable(false);
            }

            $("#result").data("kendoTextArea").enable(false);

            $("#fileUpload").css("display", "none");

            if($("#mod").val() == "mng"){
                $("#saveBtn").css("display", "none");
            }
        }
    },

    fn_saveBtn: function(){
        if($("#tripCode").data("kendoRadioGroup").value() == ""){ alert("출장 구분을 선택해주세요."); return;}
        if($("#project").data("kendoRadioGroup").value() != "1" && $("#busnName").val() == ""){ alert("사업명을 입력해주세요."); return;}
        if($("#visitCrm").val() == ""){ alert("방문지를 입력해주세요."); return; }
        if($("#visitLoc").val() == ""){ alert("출장지역을 입력해주세요."); return; }
        if($("#visitLocCode").val() == "999" && $("#visitLocSub").val() == ""){ alert("경유지명을 입력해주세요."); return;}
        if($("#bustObj").val() == ""){ alert("출장목적을 입력해주세요."); return; }
        if($("#tripCode").data("kendoRadioGroup").value() != 4 && $("#tripCode").data("kendoRadioGroup").value() != "") {
            if($("#carList").val() == ""){ alert("차량을 선택해주세요."); return; }
        }
        if($("#tripCode").data("kendoRadioGroup").value() != 4){
            if($("#realDriver").val() == ""){ alert("운행자를 선택해주세요."); return; }
            if($("#moveDst").val() == ""){ alert("운행거리를 입력해주세요."); return; }
        }
        if($("#result").val() == ""){ alert("출장결과를 입력해주세요."); return; }

        var formData = new FormData();
        formData.append("menuCd", "bustripResReq");
        formData.append("hrBizReqId", hrBizReqId);
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
            formData.append("moveDst", $("#moveDst").val());
            formData.append("driverEmpSeq", $("#realDriver").val());
            formData.append("realDriver", $("#realDriver").val());
        }else{
            formData.append("visitLoc", $("#nationList").data("kendoDropDownList").text());
            formData.append("nationCode", $("#nationList").data("kendoDropDownList").value());
            formData.append("moveDst", "0");
        }
        formData.append("visitLoc", $("#visitLoc").val());
        formData.append("visitLocSub", $("#visitLocCode").val() == "999" || $("#visitLocCode").val() == "" ? $("#visitLocSub").val() : $("#visitLocCode").data("kendoDropDownList").text());
        formData.append("visitLocCode", $("#visitLocCode").val());
        formData.append("tripDayFr", $("#date1").val());
        formData.append("tripDayTo", $("#date2").val());
        formData.append("tripTimeFr", $("#time1").val());
        formData.append("tripTimeTo", $("#time2").val());
        formData.append("useCar", "Y");
        formData.append("useTrspt", $("#carList").val());
        formData.append("title", $("#bustObj").val());
        formData.append("result", $("#result").val());

        formData.append("companionChangeCheck", $("#companionChangeCheck").val());

        if(hrBizReqResultId == ""){
            if(!confirm("출장 결과보고를 저장하고 다음단계로 넘어가시겠습니까?")){ return; }
        }else{
            /*if(!confirm("결과보고 데이터를 수정할 시, 여비정산 승인을 다시 받아야합니다. 수정하시겠습니까?")){ return; }*/
            formData.append("hrBizReqResultId", hrBizReqResultId);
        }

        $.ajax({
            url : "/bustrip/saveBustripResult",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(result){
                console.log(result);
                if(hrBizReqResultId == ""){
                    alert("출장 결과보고 저장이 완료되었습니다.");
                    var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+result.params.hrBizReqResultId;
                }else{
                    alert("출장 결과보고 수정이 완료되었습니다.");
                    var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+hrBizReqResultId;
                }
                var name = "_self";
                var option = "width=1700, height=750, scrollbars=no, top=100, left=100, resizable=no, toolbars=no, menubar=no"
                var popup = window.open(url, name, option);
                opener.gridReload();
            }
        });
    },

    fn_setCertRep : function (p){
        let message = "승인하시겠습니까?";
        if(p == 30){ message = "반려하시겠습니까?"; }
        if(!confirm(message)){ return; }

        let data = {
            hrBizReqResultId : hrBizReqResultId,
            empSeq : $("#regEmpSeq").val(),
            status : p
        }

        const result = customKendo.fn_customAjax("/bustrip/setReqCert", data);

        if(result.flag){
            if(p == 30){
                alert("반려되었습니다.");
            }else{
                alert("승인되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    },

    fn_moveCheck: function(){
        /*alert("거리는 최단거리로 입력해야 합니다.");
        window.open('https://map.naver.com/');*/

        $.ajax({
            url : "/common/findMap",
            type : 'POST',
            data : {
                addr : $("#visitLoc").val()
            },
            dataType : "json",
            async : false,
            success : function(rs){
                var dist = rs.route[0].summary.distance;
                var moveDst = dist / 1000;
                var formattedNumber = Math.floor(moveDst * 10) / 10;

                formattedNumber = formattedNumber * 2;
                $("#moveDst").val(formattedNumber.toFixed(1));

            }
        });
    },

    fn_popCamCrmList: function(){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
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

    bustripExnpPop : function (){

        var url = "/bustrip/pop/bustripExnpPop.do?hrBizReqResultId="+hrBizReqResultId+"&mode=mng&type=upd";

        var name = "bustripExnpPop";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    boardViewPop: function(){
        let url = "/Inside/pop/boardViewPop.do";
        const name = "boardViewPop";
        const option = "width = 1420, height = 730, top = 100, left = 200, location = no";
        window.open(url, name, option);
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

    if(bustrip.global.pageName == "bustripResultPop"){
        userArr.unshift({
            empName : $("#regEmpName").val(),
            empSeq : $("#regEmpSeq").val()
        })
        customKendo.fn_dropDownList("realDriver", userArr, "empName", "empSeq", "3");
    }

    $("#companionChangeCheck").val("Y");
}