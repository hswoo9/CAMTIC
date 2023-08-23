const openStudyReq = {
    global: {
        openStudyInfo: {}
    },

    init: function(){
        openStudyReq.pageSet();
        openStudyReq.dataSet();
        openStudyReq.buttonSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["openStudyName", "appLine", "openStudyLocation"]);
        customKendo.fn_textArea(["openStudyDetail"]);
        customKendo.fn_datePicker("openStudyDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("startTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("endTime", '10', "HH:mm", "18:00");
        $("#openStudyDt, #startTime, #endTime").attr("readonly", true);
    },

    dataSet: function(){
        let mode = $("#mode").val();
        if(mode == "upd" || mode == "mng"){
            let openStudyInfo = customKendo.fn_customAjax("/campus/getOpenStudyInfoOne", {
                pk: $("#pk").val()
            }).data;
            openStudyReq.global.openStudyInfo = openStudyInfo;

            $("#openStudyName").val(openStudyInfo.OPEN_STUDY_NAME);
            $("#openStudyDt").val(openStudyInfo.OPEN_STUDY_DT);
            $("#startTime").val(openStudyInfo.START_TIME);
            $("#endTime").val(openStudyInfo.END_TIME);
            $("#openStudyDetail").val(openStudyInfo.OPEN_STUDY_DETAIL);
            $("#openStudyLocation").val(openStudyInfo.OPEN_STUDY_LOCATION);
        }

        let status = openStudyReq.global.openStudyInfo.STATUS;
        if((mode == "upd" && status == 10) || (mode == "upd" && status == 100) || mode == "mng"){
            $("#openStudyDt").data("kendoDatePicker").enable(false);
            $("#startTime").data("kendoTimePicker").enable(false);
            $("#endTime").data("kendoTimePicker").enable(false);
            $("#openStudyName, #openStudyDetail, #openStudyLocation").attr("readonly", true);
        }
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let studyInfo = openStudyReq.global.openStudyInfo;
        let status = openStudyReq.global.openStudyInfo.STATUS;
        let step = openStudyReq.global.openStudyInfo.STEP;
        let regEmpSeq = $("#regEmpSeq").val();
        if(mode == "upd"){
            if(step == "B"){
                $("#stepBBtn").show();
            }
            if(step == "C"){
                if(studyInfo.REG_EMP_SEQ == regEmpSeq){
                    $("#stepCBtn").show();
                }else{
                    $("#stepBReqBtn").show();
                }
            }
        }

        if(mode == "upd"){
            if(status == 0 || status == 30){
                $("#appBtn").show();
            }
        }
        if(mode == "mng"){
            $("#saveBtn").hide();
            if(status == 10){
                $("#recBtn").show();
                $("#comBtn").show();
            }
        }
    },

    setOpenStudyUser: function(){
        if(!confirm("참여신청을 하시겠습니까?")){
            return;
        }

        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let regDeptName = $("#regDeptName").val();
        let regTeamSeq = $("#regTeamSeq").val();
        let regPositionName = $("#regPositionName").val();
        let regDutyName = $("#regDutyName").val();

        let data = {
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            regDeptName: regDeptName,
            regTeamSeq: regTeamSeq,
            regPositionName: regPositionName,
            regDutyName: regDutyName,
            pk: $("#pk").val()
        }

        let url = "/campus/setOpenStudyUser";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("오픈스터디 저장이 완료되었습니다.");
        }
    },

    saveBtn: function(){
        if(!confirm("오픈스터디를 저장하시겠습니까?")){
            return;
        }

        let openStudyName = $("#openStudyName").val();
        let openStudyDt = $("#openStudyDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let openStudyDetail = $("#openStudyDetail").val();
        let openStudyLocation = $("#openStudyLocation").val();

        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        let mode = $("#mode").val();

        if(openStudyName == ""){ alert("모임명이 작성되지 않았습니다."); return;}
        if(openStudyDetail == ""){ alert("진행내용이 작성되지 않았습니다."); return;}
        if(openStudyLocation == ""){ alert("장소가 작성되지 않았습니다."); return;}

        let data = {
            openStudyName: openStudyName,
            openStudyDt: openStudyDt,
            startTime: startTime,
            endTime: endTime,
            openStudyDetail: openStudyDetail,
            openStudyLocation: openStudyLocation,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        let url = "/campus/setOpenStudyInfoIns";
        if(mode == "upd"){
            data.pk = $("#pk").val();
            url = "/campus/setOpenStudyInfoUpd";
        }
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("오픈스터디 저장이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }
    },

    fn_openNextStep: function(step){
        let data = {
            pk : $("#pk").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            step : step
        }

        let result = customKendo.fn_customAjax("/campus/setOpenNextStep", data);

        if(result.flag){
            if(step == "B"){
                alert("모집을 진행합니다.");
            }
            opener.gridReload();
            window.close();
        }
    },

    fn_dutyCertReq: function(status){
        let data = {
            pk : $("#pk").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/campus/setDutyCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    }
}