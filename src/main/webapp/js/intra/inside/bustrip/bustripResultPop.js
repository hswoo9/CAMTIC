var bustripResultPop = {
    init: function(){
        bustrip.fn_setPageName();
        bustripResultPop.pageSet();

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

        console.log(busInfo);
        if(busInfo.PJT_SN != null){
            $("#project").data("kendoRadioGroup").value("2");
            $("input[name='project']").trigger("click");
        } else {
            $("#project").data("kendoRadioGroup").value("1");
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

        $("#empSeq").val(resInfo.EMP_SEQ);
        $("#empName").val(resInfo.EMP_NAME);
        $("#deptName").val(resInfo.DEPT_NAME);
        $("#reqDate").val(resInfo.REPORT_DATE);

        $("#tripCode").data("kendoRadioGroup").value(resInfo.TRIP_CODE);

        /** 관련사업, 프로젝트명 */
        bustripInit.settingProjectDataInit(resInfo);

        /** 동반자 */
        bustripInit.settingCompanionDataInit(resList);

        /** 방문지 */
        $("#crmSn").val(resInfo.CRM_SN);
        $("#visitCrm").val(resInfo.VISIT_CRM);

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

        /** 운행거리 */
        $("#moveDst").val(resInfo.MOVE_DST);

        /** 운행자 */
        $("#realDriver").data("kendoDropDownList").value(resInfo.DRIVER_EMP_SEQ);

        /** 출장 결과 */
        $("#result").val(resInfo.RESULT);

        /** 여비 표 */
        bustripInit.settingExnpDataInit(map);

        /** 첨부파일 */
        bustripInit.settingTempFileDataInit(fileInfo, 'result');

        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if(resInfo.EXP_STAT == 10 || resInfo.EXP_STAT == 100 || resInfo.STATUS == 100 || $("#mod").val() == "mng"){
            $(':radio:not(:checked)').attr('disabled', true);

            $("#busnName").data("kendoTextBox").enable(false);
            $("#projectAddBtn").css("display", "none");

            $("#popEmpName").data("kendoTextBox").enable(false);
            $("#addMemberBtn").css("display", "none");

            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#visitLoc").data("kendoTextBox").enable(false);
            $("#crmBtn").css("display", "none");

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
        if($("#realDriver").val() == ""){ alert("운행자를 선택해주세요."); return; }
        if($("#result").val() == ""){ alert("출장결과를 입력해주세요."); return; }
        if($("#moveDst").val() == ""){ alert("운행거리를 입력해주세요."); return; }

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
        formData.append("pjtSn", $("#pjtSn").val());
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
        formData.append("crmSn", $("#crmSn").val());
        formData.append("visitCrm", $("#visitCrm").val());
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
        formData.append("moveDst", $("#moveDst").val());
        formData.append("driverEmpSeq", $("#realDriver").val());
        formData.append("realDriver", $("#realDriver").val());
        formData.append("result", $("#result").val());

        formData.append("companionChangeCheck", $("#companionChangeCheck").val());

        if(hrBizReqResultId == ""){
            if(!confirm("출장 결과보고를 저장하고 다음단계로 넘어가시겠습니까?")){ return; }
        }else{
            if(!confirm("결과보고 데이터를 수정할 시, 여비정산 승인을 다시 받아야합니다. 수정하시겠습니까?")){ return; }
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
        alert("거리는 최단거리로 입력해야 합니다.");
        window.open('https://map.naver.com/');
    },

    fn_popCamCrmList: function(){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
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