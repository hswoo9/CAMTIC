var eduRes = {

    global : {
        resultData : [],
        dataCheck : false,
    },

    getDefaultScript : function(){

        $("#regBtn").on("click", function(){
            eduRes.saveGoalTimeEmp();
        });

        if($("#eytteId").val() != "") {
            $.ajax({
                url: getContextPath() + "/edu/getYearlyPerEmployeeGoalTimeOne",
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    id: $("#eytteId").val()
                },
                success: function (rs) {
                    var resultMap = rs.data;
                    console.log(resultMap);
                    if (resultMap != "" && resultMap != null) {
                        eduRes.global.resultData = resultMap;
                        eduRes.global.dataCheck = true;
                    }else{
                        alert("직원별 목표시간 정보가 없습니다.");
                    }

                }
            });
        }

        if(eduRes.global.dataCheck){
            $("#empName").val(eduRes.global.resultData.EMP_NAME);
            $("#empSeq").val(eduRes.global.resultData.EMP_SEQ);
            $("#deptSeq").val(eduRes.global.resultData.DEPT_SEQ);
            $("#deptName").val(eduRes.global.resultData.DEPT_NAME);
            $("#positionAndDuty").val(eduRes.global.resultData.POSITION_NAME + " (" + eduRes.global.resultData.DUTY_NAME + ")");
            $("#duty").val(eduRes.global.resultData.DUTY_NAME);
            $("#dutyCode").val(eduRes.global.resultData.DUTY_CODE);
            $("#position").val(eduRes.global.resultData.POSITION_NAME);
            $("#positionCode").val(eduRes.global.resultData.POSITION_CODE);


            $("#educationYear").data("kendoDatePicker").value(eduRes.global.resultData.EDUCATION_YEAR);
            $("#commonTime").data("kendoTextBox").value(eduRes.global.resultData.COMMON_TIME);

            $("#leadershipTime").data("kendoTextBox").value(eduRes.global.resultData.LEADERSHIP_TIME);
            $("#dutyTime").data("kendoTextBox").value(eduRes.global.resultData.DUTY_TIME);
            $("#socialContributionTime").data("kendoTextBox").value(eduRes.global.resultData.SOCIAL_CONTRIBUTION_TIME);
            $("#totalTime").data("kendoTextBox").value(eduRes.global.resultData.TOTAL_TIME);

            $("#empSearchBtn").hide();
        }
    },

    saveGoalTimeEmp : function(){
        if($("#empSeq").val() == ""){
           alert("선택된 직원이 없습니다.");
           return;
        }
        if($("#commonTime").val() == ""){
            alert("공통시간을 작성해주세요.");
            $("#commonTime").focus();
            return;
        }
        if($("#leadershipTime").val() == ""){
            alert("리더십시간을 작성해주세요.");
            $("#leadershipTime").focus();
            return;
        }
        if($("#dutyTime").val() == ""){
            alert("직무시간을 작성해주세요.");
            $("#dutyTime").focus();
            return;
        }
        if($("#socialContributionTime").val() == ""){
            alert("사회공헌시간을 작성해주세요.");
            $("#socialContributionTime").focus();
            return;
        }

        var data = {
            empSeq : $("#empSeq").val(),
            empName : $("#empName").val(),
            deptSeq : $("#deptSeq").val(),
            deptName : $("#deptName").val(),
            positionCode : $("#positionCode").val(),
            positionName : $("#position").val(),
            educationYear : $("#educationYear").val(),
            dutyCode : $("#dutyCode").val(),
            dutyName : $("#duty").val(),
            commonTime : $("#commonTime").val(),
            leadershipTime : $("#leadershipTime").val(),
            dutyTime : $("#dutyTime").val(),
            socialContributionTime : $("#socialContributionTime").val(),
            totalTime : $("#totalTime").val(),
            useYn : "Y",
            targetYn : "Y",
            regEmpSeq : "",

        }

        var resultUrl = getContextPath();
        if(eduRes.global.dataCheck){
            resultUrl = resultUrl + "/edu/updateGoalTimeEmpOne";
            data.eytteId = $("#eytteId").val();
        }else{
            resultUrl = resultUrl + "/edu/saveGoalTimeEmp";
        }

        $.ajax({
            url : resultUrl,
            type : "post",
            data : data,
            dataType : "json",
            success : function(rs){
                alert(rs.message);
                if(rs.code == "200"){
                    var prevMenuNm = $("#prevMenuNm").val();
                    open_in_frame(prevMenuNm);
                }
            }
        });
    }


}