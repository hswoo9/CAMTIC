var attendAdjustment = {

    fn_defaultScript : function (){
        attendAdjustment.pageSet();
        attendAdjustment.dataSet();
    },

    pageSet : function(){
        customKendo.fn_textBox(["targetDate", "userInfo"]);
        customKendo.fn_timePicker("workTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("leaveTime", '10', "HH:mm", "18:00");

        $("#UseReason").kendoTextBox();
        $("#targetDate, #userInfo, #workTime, #leaveTime").attr("readonly", true);
    },

    dataSet : function(){
        let targetEmpSeq = $("#targetEmpSeq").val();

        if(targetEmpSeq == ""){
            alert("데이터 조회 중 오류가 발생하였습니다."); return;
        }
        const userInfo = getUser(targetEmpSeq);
        $("#userInfo").val(userInfo.EMP_NAME_KR+" / "+userInfo.DEPT_NAME+" / "+fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));

        console.log("userInfo", userInfo);
    },

    fn_save : function(){
        const workCk = $('input[name=workAllChk]:checked').val();
        const leaveCk = $('input[name=leaveAllChk]:checked').val();

        const params = {
            workCk: workCk,
            leaveCk: leaveCk,
            targetDate: $("#targetDate").val(),
            targetEmpSeq: $("#targetEmpSeq").val(),
            workTime: $("#workTime").val(),
            leaveTime: $("#leaveTime").val(),
            regEmpSeq: $("#regEmpSeq").val()
        }

        const flag = attendAdjustment.fn_validationCheck(params);

        if(!flag){
            return;
        }

        const result = customKendo.fn_customAjax("/attend/setAttendAdjustment", params);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
            window.close();
        }else{
            alert("저장되었습니다.");
            opener.personAttendStat.gridReload();
            window.close();
        }
    },

    fn_validationCheck : function(params){
        let flag = true;
        if(params.workCk != "Y" && params.leaveCk != "Y"){
            alert("출/퇴근 시간 중 하나 이상 조정을 선택 해야합니다.");
            flag = false;
        }
        return flag;
    }
}
