const openStudyReq = {
    global: {
        openStudyInfo: {},
        openStudyUser: []
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

        let mode = $("#mode").val();
        if(mode == "upd" || mode == "mng"){
            window.resizeTo(990, 900);
        }
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
            $("#stepTr").show();
            let stepText = "";
            if(openStudyInfo.STEP == "A"){
                stepText = "작성중";
            }else if(openStudyInfo.STEP == "B"){
                stepText = "참여자 모집";
            }else if(openStudyInfo.STEP == "C"){
                stepText = "모임확정";
            }else if(openStudyInfo.STEP == "D"){
                stepText = "모임완료";
            }else if(openStudyInfo.STEP == "N"){
                stepText = "모임취소";
            }else{
                stepText = "데이터오류";
            }
            $("#stepTd").text(stepText);

            openStudyReq.openStudyUserSetting();
        }

        let step = openStudyReq.global.openStudyInfo.STEP;
        if(mode == "upd" && step != "A"){
            $("#openStudyDt").data("kendoDatePicker").enable(false);
            $("#startTime").data("kendoTimePicker").enable(false);
            $("#endTime").data("kendoTimePicker").enable(false);
            $("#openStudyName").data("kendoTextBox").enable(false);
            $("#openStudyDetail").data("kendoTextArea").enable(false);
            $("#openStudyLocation").data("kendoTextBox").enable(false);
        }
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let studyInfo = openStudyReq.global.openStudyInfo;
        let step = openStudyReq.global.openStudyInfo.STEP;
        let regEmpSeq = $("#regEmpSeq").val();
        if(mode == "upd"){
            /** 작성단계 */
            if(step == "A"){
                if(studyInfo.REG_EMP_SEQ == regEmpSeq){
                    $("#stepBBtn").show();
                }
            }else{
                $("#saveBtn").hide();
            }

            /** 참여자모집중 */
            if(step == "B"){
                if(studyInfo.REG_EMP_SEQ == regEmpSeq){
                    $("#stepCBtn").show();
                    $("#stepBReqBtn").show();
                }else{
                    $("#stepBReqBtn").show();
                }
            }

            /** 모임확정 */
            if(step == "C"){
                if(studyInfo.REG_EMP_SEQ == regEmpSeq){
                    $("#stepDBtn").show();
                    $("#stepNBtn").show();
                }else{
                    $("#stepBReqBtn").show();
                }
            }
        }
    },

    openStudyUserSetting: function(){
        let data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/campus/getOpenStudyUserList2", data);
        openStudyReq.global.openStudyUser = result.list;
        let list = openStudyReq.global.openStudyUser;

        let html = '';
        html += '<colgroup>';
        html += '<col width="10%"><col width="18%"><col width="18%"><col width="18%"><col width="18%"><col width="18%">';
        html += '</colgroup>';

        html += '<thead>';
        html += '<tr>';
        html += '<th>순번</th>';
        html += '<th>성명</th>';
        html += '<th>직위</th>';
        html += '<th>부서/팀</th>';
        html += '<th>신청일시</th>';
        html += '<th>신청상태</th>';
        html += '</tr>';

        for(let i=0; i<list.length; i++){
            html += '<tr class="addData">';
            html += '<td style="text-align: center">'+(i+1)+'</td>';
            html += '<td style="text-align: center">'+list[i].REG_EMP_NAME+'</td>';
            let position = list[i].REG_DUTY_NAME == "" ? list[i].REG_POSITION_NAME : list[i].REG_DUTY_NAME;
            html += '<td style="text-align: center">'+position+'</td>';
            html += '<td style="text-align: center">'+list[i].DEPT_NAME + ' ' + list[i].TEAM_NAME+'</td>';
            html += '<td style="text-align: center">'+list[i].REG_DATE+'</td>';
            html += '<td style="text-align: center">신청완료</td>';
            html += '</tr>';
        }
        $("#openStudyUserTable").html(html);
        $("#openStudyUserDiv").show();
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
        let regDeptName = $("#regDeptName").val();
        let regTeamSeq = $("#regTeamSeq").val();
        let regPositionName = $("#regPositionName").val();
        let regDutyName = $("#regDutyName").val();

        let mode = $("#mode").val();

        if(openStudyName == ""){ alert("모임명이 작성되지 않았습니다."); return;}
        if(openStudyDetail == ""){ alert("진행내용이 작성되지 않았습니다."); return;}
        if(openStudyLocation == ""){ alert("장소가 작성되지 않았습니다."); return;}

        //let eduTime = 0;
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour1 = startTime.split(":")[0];
        var hour2 = endTime.split(":")[0];
        var min1 = startTime.split(":")[1];
        var min2 = endTime.split(":")[1];
        var bfDate = new Date(year, month, day, hour1, min1);
        var afDate = new Date(year, month, day, hour2, min2);
        var diffSec = afDate.getTime() - bfDate.getTime();
        var diffMin = diffSec / 1000 / 60 / 60;
        //var eduTime = diffMin.toFixed(1);

        var eduTime = diffMin;
        if (eduTime % 1 !== 0) {
            eduTime = eduTime.toFixed(1);
        }

        console.log(diffMin);

        let data = {
            openStudyName: openStudyName,
            openStudyDt: openStudyDt,
            startTime: startTime,
            endTime: endTime,
            openStudyDetail: openStudyDetail,
            openStudyLocation: openStudyLocation,
            eduTime: eduTime,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            regDeptName: regDeptName,
            regTeamSeq: regTeamSeq,
            regPositionName: regPositionName,
            regDutyName: regDutyName,
        }

        let url = "/campus/setOpenStudyInfoIns";
        if(mode == "upd"){
            data.pk = $("#pk").val();
            url = "/campus/setOpenStudyInfoUpd";
        }
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert("오픈스터디 저장이 완료되었습니다.");
            try {
                opener.gridReload();
            }catch{

            }
            try {
                location.reload();
            }catch{

            }
            //window.close();
            if(mode == "upd"){
                openStudyReq.openStudyReqPop("upd", data.pk);
            }else{
                openStudyReq.openStudyReqPop("upd", result.pk);
            }
        }
    },

    openStudyReqPop : function(mode, pk) {
        let url = "/Campus/pop/openStudyReqPop.do?mode="+mode;
        if(mode == "upd" || mode == "mng"){
            url += "&pk="+pk;
        }
        const name = "openStudyReqPop";
        const option = "width = 990, height = 548, top = 100, left = 400, location = no";
        window.open(url, name, option);
    },

    fn_openNextStep: function(step){
        if(step == "B"){
            if(!confirm("참여자를 모집하시겠습니까? \n모집중에는 내용을 변경할 수 없습니다.")){
                return;
            }
        }else if(step == "C"){
            if(!confirm("모임을 확정 하시겠습니까?")){
                return;
            }
            if($("#openStudyUserTable .addData").length < 5){
                alert("오픈스터디는 최소 5인 이상되어야 모임을 확정할 수 있습니다.");
                return;
            }
        }else if(step == "N"){
            if(!confirm("모임을 취소하시겠습니까?")){
                return;
            }
        }

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
                // if(openStudyReq.doubleChk()){
                //     alert("중복된 참여는 불가능합니다.")
                //     return;
                // }
                //
                // const result = customKendo.fn_customAjax("/campus/setOpenStudyUser", data);
            }
            if(step == "C"){
                alert("모임이 확정되었습니다.");
            }
            if(step == "N"){
                alert("모임이 취소되었습니다.");
            }
            try {
                opener.gridReload();
            }catch{

            }
            try {
                location.reload();
            }catch{

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
        if(openStudyReq.doubleChk()){
            alert("중복된 참여는 불가능합니다.")
            return;
        }

        const result = customKendo.fn_customAjax("/campus/setOpenStudyUser", data);
        if(result.flag){
            alert("참여신청이 완료되었습니다.");
            try {
                opener.gridReload();
            }catch{

            }
            try{
                location.reload();
            }catch{

            }
            try{
                window.opener.getOpenStudy();
            }catch{

            }
            //openStudyReq.openStudyUserSetting();
        }
    },

    doubleChk : function(){
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

        const result = customKendo.fn_customAjax("/campus/getOpenStudyUserDoubleChk", data);
        return result.rs;
    },

    openStudyResultPop: function(){
        let url = "/Campus/pop/openStudyResultPop.do?pk="+$("#pk").val();
        const name = "_self";
        window.open(url, name);
    },
}