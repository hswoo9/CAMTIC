var overWkPop = {

    global : {
        overWorkPlanInfo : [],
    },

    defaultScript : function(){

        overWkPop.searchCode();

        $("#applyOverWorkType").kendoRadioGroup({
            items: [
                { label : "평일", value : "0101" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "0101",
        }).data("kendoRadioGroup");

        $("#applyDate").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(),
            change : function (e){
                overWkPop.findApplyDateWorkTime();
            }
        });

        $("#applyStartTime").kendoTimePicker({
            format: "HH:mm",
            value : "00:00",
            change : function(e){
                overWkPop.findTimeInterval([$("#applyStartTime").val(), $("#applyEndTime").val()]);
            },
        });

        $("#applyEndTime").kendoTimePicker({
            format: "HH:mm",
            value : "00:00",
            change : function(e){
                overWkPop.findTimeInterval([$("#applyStartTime").val(), $("#applyEndTime").val()]);
            },
        });

        $("#applyReason").kendoTextBox();

        /*$("#dinnerTimeUse").kendoRadioGroup({
            items: [
                { label : "사용", value : "Y" },
                { label : "미사용", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            change : function (e){
                if($("#applyStartTime").val()){
                    overWkPlanPop.findTimeInterval([$("#applyStartTime").val(), $("#applyEndTime").val()]);
                }
            }
        }).data("kendoRadioGroup");*/

        $("#remark").kendoTextArea({
            rows: 3,
            maxLength:200,
        });

        $("#empName, #workingTime, #applyStartHour").kendoTextBox({readonly : true});


    },

    searchCode : function(){
        $.ajax({
            url:getContextPath()+'/overWorkPlan/getWorkCodeList.do',
            data : "wkGroupCode=OW",
            dataType : "json",
            success : function(rs){
                var itemType = rs.rs;
                var defaultType = {
                    "WK_CODE" : "",
                    "WK_CODE_NM" : "선택"
                }
                itemType.unshift(defaultType);
                /*$("#applyOverWorkType").kendoDropDownList({
                    dataSource : itemType,
                    dataValueField : "WK_CODE",
                    dataTextField : "WK_CODE_NM",
                    index : 0,
                });*/
            }
        });

    },

    findApplyDateWorkTime : function(){
        var data = {
            empSeq : $("#empSeq").val(),
            applyDate : $("#applyDate").val()
        };
        console.log(data);
        $.ajax({
            url : '/overWk/getApplyDateWorkTime.do',
            data : data,
            dataType : "json",
            type : "POST",
            success : function (result){
                var rs = result.rs;
                if(rs == null){
                    alert("근무시간이 없습니다.");
                    overWorkTotalTime = 0;
                    $("#applyStartTime").data("kendoTimePicker").enable(false);
                    $("#applyEndTime").data("kendoTimePicker").enable(false);
                    $("#workingTime").val("");
                    $("#applyStartTime").val("00:00");
                    $("#applyEndTime").val("00:00");
                    $("#overWorkTotalHour").text("0");
                    $("#overWorkTotalMin").text("00");
                    return;
                }else if(rs.LEAVE_TIME == null || rs.LEAVE_TIME == "") {
                    alert("근무시간이 없습니다.");
                    overWorkTotalTime = 0;
                    $("#applyStartTime").data("kendoTimePicker").enable(false);
                    $("#applyEndTime").data("kendoTimePicker").enable(false);
                    $("#workingTime").val("");
                    $("#applyStartTime").val("00:00");
                    $("#applyEndTime").val("00:00");
                    $("#overWorkTotalHour").text("0");
                    $("#overWorkTotalMin").text("00");
                    return;
                }
                $("#workingTime").val(rs.WORKING_TIME);

                var applyStartHour = rs.LEAVE_TIME.split(":")[0];
                var applyStartMin = rs.LEAVE_TIME.split(":")[1];
                var applyStartTime = Number(applyStartHour) /*+ 1*/ + ":" + applyStartMin;
                //$("#applyStartTime").val(applyStartTime);
                $("#applyStartTime").data("kendoTimePicker").value(applyStartTime);
                $("#applyStartTime").data("kendoTimePicker").min(applyStartTime);
                $("#applyStartTime").data("kendoTimePicker").enable(true);
                $("#applyStartTime").attr("readOnly", true);
                if($("#dataUse").val() == "Y"){
                    $("#applyEndTime").data("kendoTimePicker").value($("#APPLY_EN_DT").val());
                    $("#applyEndTime").data("kendoTimePicker").min($("#APPLY_EN_DT").val());
                    $("#applyEndTime").data("kendoTimePicker").enable(true);
                    $("#applyEndTime").attr("readOnly", true);
                    var applyHour = parseInt($("#APPLY_HOUR").val());
                    applyHour = 210;
                    var totalHour = applyHour/60;
                    var totalMin = "00";
                    var totalHourCheck = String(totalHour);
                    if(totalHourCheck.split(".").length > 1){
                        totalHour = parseInt(totalHourCheck.split(".")[0]);
                        totalMin = parseInt("0." + totalHourCheck.split(".")[1] * 60);
                    }
                    $("#overWorkTotalHour").text(totalHour);
                    $("#overWorkTotalMin").text(totalMin);
                }else{
                    $("#applyEndTime").data("kendoTimePicker").value(applyStartTime);
                    $("#applyEndTime").data("kendoTimePicker").min(applyStartTime);
                    $("#applyEndTime").data("kendoTimePicker").enable(true);
                    $("#applyEndTime").attr("readOnly", true);
                    $("#overWorkTotalHour").text("0");
                    $("#overWorkTotalMin").text("00");
                }


            }
        })
    },

    findTimeInterval : function(workTime) {
        var startWorkTime;
        var endWorkTime;
        var chkVal = overWkPop.getApplyDateOwpCheck();

        if(chkVal != null){
            //해당 일자로 근무시간, 신청시간 초기화
            if(chkVal.result == "C"){
                alert("해당 일자에 결재 진행중인 초과근무 목록이 존재합니다.");
                overWkPop.findApplyDateWorkTime();
                return;
            }else if(chkVal.result == "Y"){
                alert("해당 일자에 중복되는 초과근무 목록이 존재합니다.");
                overWkPop.findApplyDateWorkTime();
                return;
            }
        }

        startWorkTime = (workTime[0].split(":")[0] * 60) + Number(workTime[0].split(":")[1]);
        endWorkTime = (workTime[1].split(":")[0] * 60) + Number(workTime[1].split(":")[1]);

        overWorkTotalTime = endWorkTime - startWorkTime;
        // if(overWorkTotalTime > 180){
        // 	alert("초과근무는 일 3시간을 초과할 수 없습니다.");
        // 	overWorkTotalTime = 180;
        // 	$("#applyEndTime").data("kendoTimePicker").value((startWorkTime + overWorkTotalTime)/60 + ":" + ("00"+(startWorkTime + overWorkTotalTime)%60).slice(-2));
        // }

        /* if($("#dinnerTimeUse").getKendoRadioGroup().value() == "Y"){
             overWorkTotalTime = overWorkTotalTime - 60 < 0 ? 0 : overWorkTotalTime - 60;
         }*/

        $("#overWorkTotalHour").text(parseInt(overWorkTotalTime/60));
        $("#overWorkTotalMin").text(("00"+overWorkTotalTime%60).slice(-2));

        if(startWorkTime > endWorkTime){
            alert("신청시간을 다시 확인해주세요.")
        }
    },

    getApplyDateOwpCheck : function(){
        var result;

        $.ajax({
            url : '/overWk/getApplyDateOwpCheck.do',
            data : {
                empSeq : $("#empSeq").val(),
                applyDate : $("#applyDate").val(),
                startTime : $("#applyStartTime").val(),
                endTime : $("#applyEndTime").val(),
            },
            dataType : "json",
            type : "POST",
            async : false,
            success : function (rs){
                result = rs.rs;
            }
        })

        return result;
    },

    overWorkApplySave : function(){
        var flag = true;
        var chkVal = overWkPop.getApplyDateOwpCheck();

        /*
        if(chkVal != null){
            if(chkVal.result == "C"){
                alert("해당 일자에 결재 진행중인 초과근무 목록이 존재합니다.");
                flag = false;
                return;
            }else if(chkVal.result == "Y"){
                alert("해당 일자에 중복되는 초과근무 목록이 존재합니다.");
                flag = false;
                return;
            }
        }
         */

        if(!$("#empSeq").val()){
            alert("신청자가 선택되지 않았습니다.");
            flag = false;
            return;
        }/*else if(!$("#workingTime").val()){
            alert("신청일에 근무시간이 없습니다.");
            flag = false;
            return;
        }*/else if(!$("#applyStartTime").val()){
            alert("신청시작 시간이 없습니다.");
            flag = false;
            return;
        }else if(!$("#applyEndTime").val()){
            alert("신청종료 시간이 없습니다.");
            flag = false;
            return;
        }else if(!$("#applyReason").val()){
            alert("업무내용을 입력해주세요.");
            flag = false;
            return;
        }

        if(confirm("신청내용을 저장하시겠습니까?")){
            if(flag){
                $.ajax({
                    url : '/overWk/setOverWorkPlan.do',
                    data : {
                        request_emp_seq : $("#empSeq").val(),
                        request_position : $("#positionCode").val(),
                        request_dept_seq : $("#deptSeq").val(),
                        request_dept_name : $("#deptName").val(),
                        request_duty : $("#dutyCode").val(),
                        apply_over_workType : $("#applyOverWorkType").data("kendoRadioGroup").value(),
                        apply_date : $("#applyDate").val(),
                        apply_start_hour : $("#applyStartTime").val().split(":")[0],
                        apply_start_min : $("#applyStartTime").val().split(":")[1],
                        apply_end_hour : $("#applyEndTime").val().split(":")[0],
                        apply_end_min : $("#applyEndTime").val().split(":")[1],
                        apply_hour : overWorkTotalTime,
                        apply_reason : $("#applyReason").val(),
                        // dinner_time_use : $("#dinnerTimeUse").getKendoRadioGroup().value(),
                        remark : $("#remark").val(),
                        apprStat : "N"
                    },
                    dataType : "json",
                    type : "POST",
                    async : false,
                    success : function (rs){
                        var data = rs.rs;
                        alert(data.message);
                        if(data.code == "200"){
                            overWkPop.fn_windowClose();
                        }
                    }
                })
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    },

    fn_windowClose : function(){
        opener.openerParamsReset();
        opener.gridReload();
        window.close();
    },

    fn_originDataSet : function(){
        $("#applyOverWorkType").data("kendoRadioGroup").value($("#APPLY_OVER_WORK_TYPE").val());
        $("#applyDate").val($("#APPLY_DATE").val());
        overWkPop.findApplyDateWorkTime();
        $("#applyReason").val($("#APPLY_REASON").val());
        $("#remark").val($("#REMARK").val());
        /*var dinnerTimeUse = $("#DINNER_TIME_USE").val();
        if(dinnerTimeUse == "X"){
            dinnerTimeUse = "N";
        }
        if(dinnerTimeUse == "O"){
            dinnerTimeUse = "Y";
        }
        $.each($("input[name=dinnerTimeUse]"), function(index, value){
            console.log(dinnerTimeUse);
           if(String(dinnerTimeUse) == $(this).val()){
               $(this).click();
           }
        });*/
    }
}