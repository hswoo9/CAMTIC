const bustripReq = {
    init: function(){
        bustrip.fn_setPageName();
        bustripReq.pageSet();
        bustripReq.dataSet();
    },

    pageSet: function(){
        /** Kendo 위젯 세팅 */
        customKendo.fn_textBox(["busnName", "popEmpName", "visitCrm", "visitLoc", "visitLocSub", "userName", "moveDst", "empSeq", "empName", "deptName", "dutyName"]);
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
    },

    dataSet: function(){
        if(hrBizReqId == ""){return;}

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
        $("#tripCode").data("kendoDropDownList").value(busInfo.TRIP_CODE);

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
        bustripInit.settingTempFileDataInit(fileInfo, p);

        /** 상황에 따른 켄도 위젯 할성화/비활성화 */
        if((busInfo.STATUS != 0 && busInfo.STATUS != 30) || $("#mod").val() == "mng"){
            $("#tripCode").data("kendoDropDownList").enable(false);
            $("#busnLgClass").data("kendoDropDownList").enable(false);
            if(busInfo.PROJECT_CD != "" && busInfo.PROJECT_CD != null){
                $("#busnName").data("kendoTextBox").enable(false);
                $("#project").data("kendoDropDownList").enable(false);
            }
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

            $("#fileUpload").css("display", "none");

            $("#modBtn").css("display", "none");
            if($("#mod").val() == "mng"){
                $("#saveBtn").css("display", "none");
            }
        }
    },

    fn_saveBtn: function(){
        if($("#tripCode").val() == ""){ alert("출장 구분을 선택해주세요."); return;}
        if($("#busnLgClass").val() != "" && $("#project").val() == ""){ alert("관련사업을 선택해주세요."); return;}
        if($("#project").val() != 0 && $("#busnName").val() == ""){ alert("사업명을 입력해주세요."); return;}
        if($("#visitCrm").val() == ""){ alert("방문지를 입력해주세요."); return; }
        if($("#visitLoc").val() == ""){ alert("출장지역을 입력해주세요."); return; }
        if($("#visitLocCode").val() == "999" && $("#visitLocSub").val() == ""){ alert("경유지명을 입력해주세요."); return;}
        if($("#bustObj").val() == ""){ alert("출장목적을 입력해주세요."); return; }

        if($("#tripCode").val() != 4 && $("#tripCode").val() != ""){
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
        formData.append("tripCode", $("#tripCode").val());
        formData.append("projectCd", $("#project").val());
        if($("#busnLgClass").val() != ""){
            formData.append("project", $("#project").data("kendoDropDownList").text());
        }
        formData.append("busnName", $("#busnName").val());
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

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("bustripFile", fCommon.global.attFiles[i]);
            }
        }

        /** 차량신청 체크 */
        if($("#tripCode").val() != 4 && $("#carList").val() != "10" && $("#carList").val() != "0"){
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
                success : function(){
                    if(hrBizReqId == ""){
                        alert("출장 신청이 완료되었습니다.");
                    }else{
                        alert("출장 수정이 완료되었습니다.");
                    }
                    opener.parent.open_in_frame('/bustrip/bustripList.do');
                    window.close();
                }
            });
        }
    },

    test: function(){
        window.open('/indexB.do', '123123');
        opener.parent.open_in_frame('/Inside/carReq.do');
    },

    // 업체정보 조회
    fn_popCamCrmList : function (){
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
}