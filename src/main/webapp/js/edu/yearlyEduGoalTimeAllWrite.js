var eduRes = {

    global : {
        resultData : [],
        dataCheck : false,
    },

    getDefaultScript : function(){
        $("#regBtn").on("click", function(){
            eduRes.saveGoalTimeAll();
        });

        if($("#eyttdId").val() != "") {
            $.ajax({
                url: getContextPath() + "/edu/getYearlyEduGoalTimeOne",
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    id: $("#eyttdId").val()
                },
                success: function (rs) {
                    var resultMap = rs.data;
                    console.log(resultMap);
                    if (resultMap != "" && resultMap != null) {
                        eduRes.global.resultData = resultMap;
                        eduRes.global.dataCheck = true;
                    }else{
                        alert("교육목표시간 정보가 없습니다.");
                    }

                }
            });
        }

        if(eduRes.global.dataCheck){
            $("#educationYear").data("kendoDatePicker").value(eduRes.global.resultData.EDUCATION_YEAR);
            $("#empDuty").data("kendoDropDownList").value(eduRes.global.resultData.DUTY_CODE);
            $("#commonTime").data("kendoTextBox").value(eduRes.global.resultData.COMMON_TIME);
            $("#leadershipTime").data("kendoTextBox").value(eduRes.global.resultData.LEADERSHIP_TIME);
            $("#dutyTime").data("kendoTextBox").value(eduRes.global.resultData.DUTY_TIME);
            $("#socialContributionTime").data("kendoTextBox").value(eduRes.global.resultData.SOCIAL_CONTRIBUTION_TIME);
            $("#totalTime").data("kendoTextBox").value(eduRes.global.resultData.TOTAL_TIME);
        }

    },

    saveGoalTimeAll : function(){
        if($("#empDuty").data("kendoDropDownList").value() == ""){
            alert("직위코드를 선택해주세요.");
            $("#empDuty").focus();
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
        var resultUrl = getContextPath();

        var data = {
            educationYear : $("#educationYear").val(),
            dutyCode : $("#empDuty").data("kendoDropDownList").value(),
            dutyName : $("#empDuty").data("kendoDropDownList").text(),
            commonTime : $("#commonTime").val(),
            leadershipTime : $("#leadershipTime").val(),
            dutyTime : $("#dutyTime").val(),
            socialContributionTime : $("#socialContributionTime").val(),
            totalTime : $("#totalTime").val(),
            useYn : "Y",
            regEmpSeq : "",
            dutyKey : $("#empDuty").data("kendoDropDownList").value(),
        }
        if(eduRes.global.dataCheck){
            data.eyttdId = $("#eyttdId").val();
            resultUrl = resultUrl + "/edu/updateGoalTimeOne";
        }else{
            resultUrl = resultUrl + "/edu/setGoalTimeAll";
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
    },
}