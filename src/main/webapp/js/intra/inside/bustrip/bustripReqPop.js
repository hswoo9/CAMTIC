const bustripReq = {
    global: {
        waypointArr: []
    },

    init: function(){
        bustripReq.pageSet();
        if(hrBizReqId != ""){
            bustripReq.dataSet(hrBizReqId);
        }
    },

    pageSet: function(){
        $("#busnName, #popEmpName, #visitCrm, #visitLoc, #visitLocSub, #userName, #moveDst").kendoTextBox();
        $("#bustObj").kendoTextArea();
        $("#empSeq, #empName, #deptName, #dutyName").kendoTextBox({enable: false});
        customKendo.fn_datePicker("date1", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("date2", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqDate", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("time1", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("time2", '10', "HH:mm", "18:00");
        let tripCodeDataSource = [
            { text: "도내(시내)", value: "1" },
            { text: "도내(시외)", value: "2" },
            { text: "도외", value: "3" },
            { text: "해외", value: "4" }
        ]
        customKendo.fn_dropDownList("tripCode", tripCodeDataSource, "text", "value", 2);
        $("#tripCode").data("kendoDropDownList").bind("change", function(){
            if($("#tripCode").val() == 4){
                $("#carLine").css("display", "none");
                $("#carList").data("kendoDropDownList").select(0);
                $("#car1").prop("checked", true);
            } else {
                $("#carLine").css("display", "");
            }
        })
        let projectDataSource = [
            { text: "해당없음", value: "0" },
            { text: "연구개발", value: "1" },
            { text: "개발사업", value: "2" },
            { text: "교육사업", value: "3" },
            { text: "일자리사업", value: "4" },
            { text: "지원사업", value: "5" },
            { text: "평생학습", value: "6" },
            { text: "캠스타트업", value: "7" }
        ]
        customKendo.fn_dropDownList("project", projectDataSource, "text", "value", 2);
        $("#project").data("kendoDropDownList").bind("change", function(){
            if($("#project").val() == 0 || $("#project").val() == ""){
                $("#busnLine").css("display", "none");
            } else {
                $("#busnLine").css("display", "");
            }
        })
        const carArr = customKendo.fn_customAjax('/inside/getCarCode').list;
        carArr.push({text: "자가", value: "10"});
        carArr.push({text: "대중교통", value: "0"});
        customKendo.fn_dropDownList("carList", carArr, "text", "value", 2);
        const waypointArr = customKendo.fn_customAjax('/bustrip/getWaypointCostList').list;
        bustripReq.global.waypointArr = waypointArr;
        waypointArr.unshift({WAYPOINT_NAME: "없음", HR_WAYPOINT_INFO_SN: ""});
        waypointArr.push({WAYPOINT_NAME: "직접입력", HR_WAYPOINT_INFO_SN: "999"});
        customKendo.fn_dropDownList("visitLocCode", waypointArr, "WAYPOINT_NAME", "HR_WAYPOINT_INFO_SN", 3);
        $("#visitLocCode").data("kendoDropDownList").bind("change", function(){
            if($("#visitLocCode").val() == "999"){
                $(".visitLocSub").show();
                $(".visitMove").hide();
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            }else if($("#visitLocCode").val() == ""){
                $(".visitLocSub").hide();
                $(".visitMove").show();
                $(".visitMoveSpan").hide();
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", false);
                    $("#moveBtn").attr("disabled", false);
                }
            }else{
                $(".visitLocSub").hide();
                $(".visitMove").show();
                let code = $("#visitLocCode").data("kendoDropDownList").value();
                let distance = 0;
                for(let i=0; i<waypointArr.length; i++){
                    let pk = waypointArr[i].HR_WAYPOINT_INFO_SN;
                    if(pk == code){
                        distance = waypointArr[i].DISTANCE;
                    }
                }
                $(".visitMoveSpan").text(distance+" km");
                if(pageName == "bustripResReq"){
                    $("#moveDst").attr("disabled", true);
                    $("#moveBtn").attr("disabled", true);
                }
            }
        });
    },

    dataSet: function (d, p){
        var result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
            hrBizReqId: d
        });
        var busInfo = result.rs.rs;
        var list = result.rs.list;
        var fileInfo = result.rs.fileInfo;

        $("#tripCode").data("kendoDropDownList").value(busInfo.TRIP_CODE);
        $("#project").data("kendoDropDownList").value(busInfo.PROJECT_CD);
        if($("#project").val() == 0 || $("#project").val() == ""){
            $("#busnLine").css("display", "none");
        } else {
            $("#busnLine").css("display", "");
        }

        $("#visitCrm").val(busInfo.VISIT_CRM);
        $("#visitLoc").val(busInfo.VISIT_LOC);
        $("#visitLocCode").data("kendoDropDownList").value(busInfo.VISIT_LOC_CODE);
        if($("#visitLocCode").val() == "999"){
            $(".visitMove").hide();
            $(".visitLocSub").show();
            if(pageName == "bustripResReq"){
                $("#moveDst").attr("disabled", false);
                $("#moveBtn").attr("disabled", false);
            }
        }else if($("#visitLocCode").val() == ""){
            $(".visitLocSub").hide();
            $(".visitMove").show();
            if(pageName == "bustripResReq"){
                $("#moveDst").attr("disabled", false);
                $("#moveBtn").attr("disabled", false);
            }
        }else{
            $(".visitLocSub").hide();
            $(".visitMove").show();
            let code = $("#visitLocCode").data("kendoDropDownList").value();
            let distance = 0;
            for(let i=0; i<bustripReq.global.waypointArr.length; i++){
                let pk = bustripReq.global.waypointArr[i].HR_WAYPOINT_INFO_SN;
                if(pk == code){
                    distance = bustripReq.global.waypointArr[i].DISTANCE;
                }
            }
            $(".visitMoveSpan").text(distance+" km");
            if(pageName == "bustripResReq"){
                $("#moveDst").attr("disabled", true);
                $("#moveBtn").attr("disabled", true);
            }
        }
        $("#visitLocSub").val(busInfo.VISIT_LOC_SUB);
        $("#date1").val(busInfo.TRIP_DAY_FR);
        $("#date2").val(busInfo.TRIP_DAY_TO);
        $("#time1").val(busInfo.TRIP_TIME_FR);
        $("#time2").val(busInfo.TRIP_TIME_TO);
        $("#bustObj").val(busInfo.TITLE);
        $("#carList").data("kendoDropDownList").value(busInfo.USE_TRSPT);
        if(busInfo.USE_CAR == "Y"){
            $("#car2").prop("checked", true);
        } else {
            $("#car1").prop("checked", true);
        }

        var popEmpSeq = "" ;
        var popEmpName = "";
        var popDeptSeq = "";
        var popDeptName = "";
        for(var i = 0; i < list.length; i++){
            if(i!=0){
                popEmpSeq += ",";
                popEmpName += ",";
                popDeptSeq += ",";
                popDeptName += ",";
            }
            popEmpSeq += list[i].EMP_SEQ;
            popEmpName += list[i].EMP_NAME;
            popDeptSeq += list[i].DEPT_SEQ;
            popDeptName += list[i].DEPT_NAME;
        }
        $("#popEmpSeq").val(popEmpSeq);
        $("#popEmpName").val(popEmpName);
        $("#popDeptSeq").val(popDeptSeq);
        $("#popDeptName").val(popDeptName);

        bustripReq.settingTempFileDataInit(fileInfo, p);

        $("#empSeq").val(busInfo.EMP_SEQ);
        $("#empName").val(busInfo.EMP_NAME);
        $("#deptName").val(busInfo.DEPT_NAME);
        $("#reqDate").val(busInfo.REG_DATE);
        $("#moveDst").val(busInfo.DISTANCE);

        if((busInfo.STATUS != 0 && busInfo.STATUS != 30 && pageName == 'bustripReq') || $("#mod").val() == "mng"){
            $("#popEmpName").data("kendoTextBox").enable(false);
            $("#tripCode").data("kendoDropDownList").enable(false);
            $("#project").data("kendoDropDownList").enable(false);
            $("#visitCrm").data("kendoTextBox").enable(false);
            $("#visitLoc").data("kendoTextBox").enable(false);
            $("#visitLocSub").data("kendoTextBox").enable(false);
            $("#visitLocCode").data("kendoDropDownList").enable(false);
            $("#bustObj").data("kendoTextArea").enable(false);
            $("#date1").data("kendoDatePicker").enable(false);
            $("#date2").data("kendoDatePicker").enable(false);
            $("#time1").data("kendoTimePicker").enable(false);
            $("#time2").data("kendoTimePicker").enable(false);
            $("#carList").data("kendoDropDownList").enable(false);
            $("input[name='useCar']").attr("disabled", true);
            $("#popEmpSeq").val(popEmpSeq.slice(0, -1));
            $("#modBtn").css("display", "none");
            $("#fileUpload").css("display", "none");
            $("#addMemberBtn").attr("disabled", true);
            $("#projectAddBtn").attr("disabled", true);
            $("#carBtn").css("display", "none");
            if($("#mod").val() == "mng"){
                $("#result").data("kendoTextBox").enable(false);
                $("#saveBtn").css("display", "none");
            }
        }
    },

    fn_saveBtn: function(){
        if($("#tripCode").val() == ""){ alert("출장 구분을 선택해주세요."); return;}
        if($("#project").val() == ""){ alert("관련사업을 선택해주세요."); return;}
        if($("#project").val() != 0 && $("#busnName").val() == ""){ alert("사업명을 입력해주세요."); return;}
        if($("#visitCrm").val() == ""){ alert("방문지를 입력해주세요."); return; }
        if($("#visitLoc").val() == ""){ alert("출장지역을 입력해주세요."); return; }
        if($("#visitLocCode").val() == "999" && $("#visitLocSub").val() == ""){ alert("경유지명을 입력해주세요."); return;}
        if($("#bustObj").val() == ""){ alert("출장목적을 입력해주세요."); return; }
        if($("#carList").val() == ""){ alert("차량을 선택해주세요."); return; }

        var formData = new FormData();
        formData.append("menuCd", "bustripReq");
        formData.append("empSeq", $("#regEmpSeq").val());
        formData.append("empName", $("#regEmpName").val());
        formData.append("deptSeq", $("#regDeptSeq").val());
        formData.append("deptName", $("#regDeptName").val());
        formData.append("tripCode", $("#tripCode").val());
        formData.append("projectCd", $("#project").val());
        formData.append("project", $("#project").data("kendoDropDownList").text());
        formData.append("compEmpSeq", $("#popEmpSeq").val());
        formData.append("compEmpName", $("#popEmpName").val());
        formData.append("compDeptSeq", $("#popDeptSeq").val());
        formData.append("compDeptName", $("#popDeptName").val());
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
        formData.append("busnName", $("#busnName").val());
        formData.append("title", $("#bustObj").val());
        formData.append("positionCode", $("#regPositionCode").val());
        formData.append("dutyCode", $("#regDutyCode").val());
        formData.append("applyDate", $("#reqDate").val());

        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("bustripFile", fCommon.global.attFiles[i]);
            }
        }

        //차량신청 체크
        if($("#carList").val() != "10" && $("#carList").val() != "0"){
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

    settingTempFileDataInit : function(e, p){
        var html = '';

        if(p == "result"){
            if(e.length > 0){
                for(var i = 0; i < e.length; i++){
                    html += '<tr style="text-align: center">';
                    html += '   <td>'+ e[i].file_org_name +'</td>';
                    html += '   <td>'+ e[i].file_ext +'</td>';
                    html += '   <td>'+ e[i].file_size +'</td>';
                    html += '</tr>';
                }
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="3" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        } else {
            if(e.length > 0){
                for(var i = 0; i < e.length; i++){
                    html += '<tr style="text-align: center">';
                    html += '   <td>'+ e[i].file_org_name +'</td>';
                    html += '   <td>'+ e[i].file_ext +'</td>';
                    html += '   <td>'+ e[i].file_size +'</td>';
                    html += '   <td>';
                    html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                        '			<span class="k-button-text">삭제</span>' +
                        '		</button>';
                    html += '   </td>';
                    html += '</tr>';
                }
                $("#fileGrid").html(html);
            }else{
                $("#fileGrid").html('<tr>' +
                    '	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }
    },

    test: function(){
        window.open('/indexB.do', '123123');
        opener.parent.open_in_frame('/Inside/carReq.do');
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

    if(pageName == "bustripResReq"){
        userArr.unshift({
            empName : $("#regEmpName").val(),
            empSeq : $("#regEmpSeq").val()
        })
        customKendo.fn_dropDownList("realDriver", userArr, "empName", "empSeq", "3");
    }
}