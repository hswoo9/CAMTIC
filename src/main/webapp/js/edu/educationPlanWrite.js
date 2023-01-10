var edpwRes = {

    global : {
        resultData : [],
        dataCheck : false,
    },

    getDefaultScript : function(){
        if($("#epId").val() != "") {
            $.ajax({
                url: getContextPath() + "/edu/getEducationPlanOne",
                type: "post",
                async: false,
                dataType: "json",
                data: {
                    id: $("#epId").val()
                },
                success: function (rs) {
                    var resultMap = rs.data;

                    if (resultMap != "" && resultMap != null) {
                        edpwRes.global.resultData = resultMap;
                        edpwRes.global.dataCheck = true;
                    }else{
                        alert("교육계획 정보가 없습니다.");
                        open_in_frame("/edu/educationPlan.do");
                    }

                }
            });
        }
        console.log(edpwRes.global);
        //isNaNCheck
        $("#edTitle").kendoTextBox();
        $("#edOrgName").kendoTextBox();
        $("#edLocation").kendoTextBox();
        $("#edCourseTime").kendoTextBox({
            change: function(e){
                edpwRes.isNaNCheck("edCourseTime", e.value);
            }
        });
        $("#edMoney").kendoTextBox({
            change: function(e){
                edpwRes.isNaNCheck("edMoney", e.value);
            }
        });
        CKEDITOR.replace('bmk', {
        });

        $("#regBtn").on("click", function(){
            edpwRes.setEducationPlan();
        });

        if(edpwRes.global.dataCheck){
            $("#edTitle").data("kendoTextBox").value(edpwRes.global.resultData.ED_COURSE_NAME);
            $("#edOrgName").data("kendoTextBox").value(edpwRes.global.resultData.ED_ORG_NAME);
            $("#edLocation").data("kendoTextBox").value(edpwRes.global.resultData.ED_ORG_NAME);
            $("#edCourseTime").data("kendoTextBox").value(edpwRes.global.resultData.ED_TIME);
            $("#edMoney").data("kendoTextBox").value(edpwRes.global.resultData.ED_MONEY);
            CKEDITOR.instances['bmk'].setData(edpwRes.global.resultData.BMK);
            $("#strDateDay").data("kendoDatePicker").value(edpwRes.global.resultData.ED_START_DATE);
            $("#endDateDay").data("kendoDatePicker").value(edpwRes.global.resultData.ED_END_DATE);
            $("#edKindCode").data("kendoDropDownList").value(edpwRes.global.resultData.ED_KIND_CODE);
            $("#edSecCode").data("kendoDropDownList").value(edpwRes.global.resultData.ED_SEC_CODE);
            $("#edTypeCode").data("kendoDropDownList").value(edpwRes.global.resultData.ED_TYPE_CODE);
            $("#edJobTypeCode").data("kendoDropDownList").value(edpwRes.global.resultData.ED_JOB_TYPE_CODE)
        };
    },

    setEducationPlan : function(){
        var result = false;
        var resultUrl = getContextPath();
        if(edpwRes.global.dataCheck){
            result = confirm("수정하시겠습니까?");
            resultUrl = "/edu/updateEducationPlan";
        }else{
            result = confirm("저장하시겠습니까?");
            resultUrl = "/edu/setEducationPlan";
        }
        //$("#empDuty").data("kendoDropDownList").text()
        if(result){
            if($("#edKindCode").data("kendoDropDownList").value() == ""){
                alert("선택된 교육종류가 없습니다.");
                return;
            }
            if($("#edSecCode").data("kendoDropDownList").value() == ""){
                alert("선택된 교육구분이 없습니다.");
                return;
            }
            if($("#edTypeCode").data("kendoDropDownList").value() == ""){
                alert("선택된 교육유형이 없습니다.");
                return;
            }
            if($("#strDateDay").val() == "" || $("#endDateDay").val() == ""){
                alert("교육기간이 없습니다.");
                return;
            }
            if($("#edTitle").val() == ""){
                alert("수강과목명이 없습니다.");
                $("#edTitle").focus();
                return;
            }
            if($("#edOrgName").val() == ""){
                alert("교육기관명이 없습니다.");
                $("#edOrgName").focus();
                return;
            }
            if($("#edLocation").val() == ""){
                alert("교육장소가 없습니다.");
                $("#edLocation").focus();
                return;
            }
            if($("#edCourseTime").val() == ""){
                alert("교육수강시간이 없습니다.");
                $("#edCourseTime").focus();
                return;
            }
            if($("#edJobTypeCode").data("kendoDropDownList").value() == ""){
                alert("선택된 직무분야가 없습니다.");
                return;
            }
            if($("#edMoney").val() == ""){
                alert("교육비용이 없습니다.");
                $("#edMoney").focus();
                return;
            }

            var data = {
                educationYear : $("#strDateDay").val().split("-")[0],
                edKindCode : $("#edKindCode").data("kendoDropDownList").value(),
                edKindName : $("#edKindCode").data("kendoDropDownList").text(),
                edSecCode : $("#edSecCode").data("kendoDropDownList").value(),
                edSecName : $("#edSecCode").data("kendoDropDownList").text(),
                edTypeCode : $("#edTypeCode").data("kendoDropDownList").value(),
                edTypeName : $("#edTypeCode").data("kendoDropDownList").text(),
                edOrgName : $("#edOrgName").val(),
                edCourseName : $("#edTitle").val(),
                bmk : CKEDITOR.instances.bmk.getData(),
                edStartDate : $("#strDateDay").val(),
                edEndDate : $("#endDateDay").val(),
                edTime : $("#edCourseTime").val(),
                useYn : "Y",
                regEmpSeq : "",
                edLocation : $("#edLocation").val(),
                edMoney : $("#edMoney").val(),
                edJobTypeCode : $("#edJobTypeCode").data("kendoDropDownList").value(),
                edJobTypeName : $("#edJobTypeCode").data("kendoDropDownList").text(),
            };
            if(edpwRes.global.dataCheck){ data.epId = edpwRes.global.resultData.EP_ID};
            console.log(data);
            $.ajax({
                url : resultUrl,
                type : "post",
                data : data,
                dataType : "json",
                success : function(rs){
                    alert(rs.message);
                    if(rs.code == "200"){
                        open_in_frame("/edu/educationPlan.do");
                    }
                }
            });
        }
    },

    isNaNCheck : function(target, value){
        console.log(isNaN(value));
        if(isNaN(value)){
            alert("숫자만 입력이 가능합니다.");
            $("#" + target).val("");
            return;
        }
    },


}