var workPlanRegPop = {

    global : {
        openerParams : [],
    },

    defaultScript : function(){

        workPlanRegPop.global.openerParams = opener.openerParams();
        console.log(workPlanRegPop.global.openerParams);
        customKendo.fn_datePicker("apply_month", "", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("start_date", "", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("end_date", "", "yyyy-MM-dd", new Date());
        workPlanRegPop.wptSearchCode(7);
        $(".startTimePicker").kendoTimePicker({
            format: "HH:mm",
            value : "09:00"
        });

        $(".endTimePicker").kendoTimePicker({
            format: "HH:mm",
            value : "18:00"
        });

        $("#work_week_time").kendoRadioGroup({
            items: [
                {label : "주 40시간" , value : "40"},
                {label : "주 30시간" , value : "30"},
                {label : "주 20시간" , value : "20"},
                {label : "기타" , value : "0"},
            ],
            layout : "horizontal",
            labelPosition : "after"
        }).data("kendoRadioGroup");

        $("#apply_reason").kendoTextArea({
            rows: 3,
            maxLength:200,
        });

        $("input[name='dayChk']").prop("checked", true);

        if(workPlanRegPop.global.openerParams != ""){
            var stDt = new Date(workPlanRegPop.global.openerParams.start);
            var eDt = new Date(workPlanRegPop.global.openerParams.end);
            console.log(workPlanRegPop.getDate(stDt));
            console.log(workPlanRegPop.getDate(eDt));
            stDt = stDt.toISOString().slice(0, 10);
            eDt = eDt.toISOString().slice(0, 10);
            $("#start_date").data("kendoDatePicker").value(stDt);
            $("#end_date").data("kendoDatePicker").value(eDt);
        }
    },


    monthDiff : function(){
        var sDt = new Date($("#start_date").val());
        var eDt = new Date($("#end_date").val());
        var dif = eDt - sDt;
        var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
        var cMonth = cDay * 30;// 월 만듬
        return parseInt(dif/cDay)+1;
    },

    timeDiff : function(type){
        $("#timeDiff").empty();
        var htmlStr = "";
        if(type == 101){
            $("#work_week_time input[type='radio']").prop("checked", false);
            $("#workPlanApplyTb input[type='text']").not(".defaultVal").val("");

            var wptList = workPlanRegPop.allApplyRadioGroupMake(1);

            htmlStr += "<table class='table table-bordered mb-0' style='height: 100%;'>" +
                "		<tr>" +
                "			<td>" +
                "				<div id='wptDiv'>";
            for(var i = 0; i < wptList.length; i++){
                htmlStr +=	"				<label for='"+wptList[i].WK_CODE_ID+"'>" +
                    "						<input type='radio' class='k-radio k-radio-md' id='"+wptList[i].WK_CODE+"' name='workPlanType' value='"+wptList[i].WK_CODE_NM+"' onchange='workPlanRegPop.allWprkTimeApply(this)' style='vertical-align: -webkit-baseline-middle;margin: 0 5px 10px 0'>"+wptList[i].WK_CODE_NM +
                    "					</label>";
            }
            htmlStr +=	"			</div>" +
                "			</td>" +
                "		</tr>" +
                "		<tr>" +
                "			<th>" +
                "				일 근무시간" +
                "				<input type='text' id='dayWorkTimeHour' name='dayWorkTimeHour' style='width: 50px; border-width:0;text-align: right' readonly>" +
                "			</th>" +
                "		</tr>" +
                "		<tr>" +
                "			<th>" +
                "				일 근무시간(분)" +
                "				<input type='text' id='dayWorkTimeMin' name='dayWorkTimeMin' style='width: 30px; border-width:0;text-align: right' readonly>" +
                "			</th>" +
                "		</tr>" +
                "	</table>";
        }else{
            $("#workPlanApplyTb input[type='text']").not(".defaultVal").val("");
            $("#work_week_time input[type='radio']").prop("checked", false);
            htmlStr += "근무유형 중<br>[시차출퇴근제] 선택시<br>표기됩니다.";
        }

        $.each($(".timePicker"), function(){
            if(this.tagName != "SPAN"){
                var timepicker = $(this).data("kendoTimePicker");
                if(type == 1){
                    $(".startTimePicker").val("00:00");
                    $(".endTimePicker").val("00:00");
                    workPlanRegPop.readWTSetting();
                    timepicker.readonly();
                }else{
                    $(".startTimePicker").val("09:00");
                    $(".endTimePicker").val("18:00");
                    workPlanRegPop.readWTSetting();
                    timepicker.readonly(false);
                    $(this).attr("readonly", true);
                }
            }
        })

        $("#timeDiff").append(htmlStr);
    },

    wptSearchCode : function(type){
        var itemType = workPlanRegPop.allApplyRadioGroupMake(type);
        var defaultType = {
            "WK_CODE": "",
            "WK_CODE_NM": "선택하세요"
        }
        itemType.unshift(defaultType);
        $("#work_plan_type").kendoDropDownList({
            dataSource: itemType,
            dataValueField: "WK_CODE",
            dataTextField: "WK_CODE_NM",
            index: 0,
            change:function(){
                workPlanRegPop.timeDiff(this.value());
            }
        });
    },

    allApplyRadioGroupMake : function(type){

        var radioList = new Array();
        $.ajax({
            url : getContextPath()+"/workPlan/getWkCommonCodeWpT.do",
            data : {
                wkGroupCodeId : type
            },
            dataType : "json",
            type : "POST",
            async : false,
            success : function(result){
                radioList = result.codeList;
            }
        })
        return radioList;
    },

    readWTSetting : function(){
        $.each($("input[name='dayChk']"), function(){
            singleWTSetting($(this).attr("day"));
        })
    },

    singleWTSetting : function(day){
        var wDayWorkTime;
        var wDayWorkHour;
        var wDayWorkMin;
        var startWorkTime;
        var endWorkTime;

        if(day != null){
            wDayWorkTime = ($("#w_s_time_"+day).val()+"~"+$("#w_e_time_"+day).val()).split("~");
            wDayWorkHour = workPlanRegPop.timeReturnToFixed(workPlanRegPop.makeDateForm(wDayWorkTime) / 60, "2");
            wDayWorkMin = workPlanRegPop.makeDateForm(wDayWorkTime);

            startWorkTime = Number(wDayWorkTime[0].split(":")[0]) + Number(wDayWorkTime[0].split(":")[1]/60);
            endWorkTime = Number(wDayWorkTime[1].split(":")[0]) + Number(wDayWorkTime[1].split(":")[1]/60);

            if(endWorkTime > 13){
                if(startWorkTime >= endWorkTime){
                    wDayWorkHour = 0;
                    wDayWorkMin = 0;
                }else{
                    wDayWorkHour -= 1;
                    wDayWorkMin -= 60;
                }
            }

            $("#w_time_"+day+"_hour").val(workPlanRegPop.timeReturnToFixed(wDayWorkHour, "2"));
            $("#w_time_"+day+"_min").val(wDayWorkMin);

            var wTimeSumHour = 0;
            $.each($(".day_w_hour"), function(){
                wTimeSumHour += Number(this.value);
            })

            $("#w_time_sum_hour").val(workPlanRegPop.timeReturnToFixed(wTimeSumHour, "2"));
            $("#w_time_sum_min").val(wTimeSumHour * 60);
            $("#work_month_time").val(workPlanRegPop.timeReturnToFixed(wTimeSumHour * 4, "1"))
        }else{
            wDayWorkTime = ($("#workingTime").val() + "~" + $("#workTime").val()).split("~");
            wDayWorkHour = workPlanRegPop.timeReturnToFixed(workPlanRegPop.makeDateForm(wDayWorkTime) / 60, "2");
            wDayWorkMin = workPlanRegPop.makeDateForm(wDayWorkTime);

            var startWorkTime = Number(wDayWorkTime[0].split(":")[0]) + Number(wDayWorkTime[0].split(":")[1]/60);
            var endWorkTime = Number(wDayWorkTime[1].split(":")[0]) + Number(wDayWorkTime[1].split(":")[1]/60);

            if(endWorkTime > 13){
                if(startWorkTime >= endWorkTime){
                    wDayWorkHour = 0;
                    wDayWorkMin = 0;
                }else{
                    wDayWorkHour -= 1;
                    wDayWorkMin -= 60;
                }
            }

            $("#dayWorkTimeHour").val(workPlanRegPop.timeReturnToFixed(wDayWorkHour, "2"));
            $("#dayWorkTimeMin").val(wDayWorkMin);
        }
    },

    timeReturnToFixed : function(workTime, pointLength){
        if(workTime > 0){
            return Number(workTime).toFixed(pointLength);
        }else{
            return 0;
        }
    },

    makeDateForm : function(workTime) {
        var startWorkTime;
        var endWorkTime;

        startWorkTime = (workTime[0].split(":")[0] * 60) + Number(workTime[0].split(":")[1]);
        endWorkTime = (workTime[1].split(":")[0] * 60) + Number(workTime[1].split(":")[1]);
        if(startWorkTime >= endWorkTime){
            return 0;
        }else{
            return endWorkTime - startWorkTime;
        }
    },

    readWTSetting : function(){
        $.each($("input[name='dayChk']"), function(){
            workPlanRegPop.singleWTSetting($(this).attr("day"));
        })
    },

    readWTSetting : function(){
        $.each($("input[name='dayChk']"), function(){
            workPlanRegPop.singleWTSetting($(this).attr("day"));
        })
    },

    allWprkTimeApply : function(e){
        var workTime = $(e).val().split("~");
        $("#workingTime, .w_start_time").val(workTime[0]);
        $("#workTime, .w_end_time").val(workTime[1]);

        var dayWHour = workPlanRegPop.timeReturnToFixed(workPlanRegPop.makeDateForm(workTime) / 60, "2");
        var dayWMin = workPlanRegPop.makeDateForm(workTime);
        var endWorkTime = workTime[1].split(":")[0];
        if(endWorkTime > 13){
            dayWHour -= 1;
            dayWMin -= 60;
        }
        //$("#work_week_time").getKendoRadioGroup().value(dayWHour * 5);
        $("#work_month_time").val(workPlanRegPop.timeReturnToFixed((dayWHour * 5) * 4, "1"));
        $("#dayWorkTimeHour, .day_w_hour").val(workPlanRegPop.timeReturnToFixed(dayWHour, "2"));
        $("#dayWorkTimeMin, .day_w_min").val(dayWMin);
        $("#w_time_sum_hour").val(workPlanRegPop.timeReturnToFixed(dayWHour * 5, "2"));
        $("#w_time_sum_min").val(dayWMin * 5);
    },

    workPlanChangeSubSave : function(){
        var flag = true;

        var wkGroupCode = $("#work_plan_type").data("kendoDropDownList");
        var wkGroupCodeData = wkGroupCode.dataSource.view()[wkGroupCode.selectedIndex];
        var workPlanType = wkGroupCodeData.WK_CODE == 101 ? $("input[name='workPlanType']:checked").attr("id") : wkGroupCodeData.WK_CODE;

        if(!$("#work_plan_type").val()){
            alert("근무 유형을 선택해주세요.");
            flag = false;
            return;
        }else if(workPlanRegPop.getDate(new Date($("#start_date").val())) == "토" || workPlanRegPop.getDate(new Date($("#start_date").val())) == "일"){
            alert("휴일엔 근무를 변경할 수 없습니다.");
            $("#start_date").val("");
            flag = false;
            return;
        }else if(workPlanRegPop.getDate(new Date($("#end_date").val())) == "토" || workPlanRegPop.getDate(new Date($("#end_date").val())) == "일"){
            alert("휴일엔 근무를 변경할 수 없습니다.");
            $("#end_date").val("");
            flag = false;
            return;
        }else if($("input[name='work_week_time']:checked").length == 0){
            alert("주 근무시간을 선택해주세요.");
            flag = false;
            return;
        }else if(!workPlanRegPop.workTimeValidationChk()){
            alert("출퇴근 시간을 올바르게 선택해주세요.");
            flag = false;
            return;
        }

        var timeFlag = true;
        if($("#work_plan_type").val() != "101"){
            var wptList = workPlanRegPop.allApplyRadioGroupMake(1);
            for(var i = 0; i < wptList.length; i++){
                var attendTime = wptList[i].WK_CODE_NM.split("~")[0];
                var leaveTime = wptList[i].WK_CODE_NM.split("~")[1];

                var timeFlagChk = 0;
                for(var j = 0; j < $("input[name='w_s_time']").length; j++){
                    if(attendTime == $($("input[name='w_s_time']")[j]).val()){
                        timeFlagChk++;
                    }

                    if(leaveTime == $($("input[name='w_e_time']")[j]).val()){
                        timeFlagChk++;
                    }
                }

                if(timeFlagChk == 10){
                    timeFlag = false;
                    break;
                }
            }
        }

        if(!timeFlag){
            alert("시차출퇴근제의 근무시간을 선택하셨습니다.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                var changeSMonth = new Date($("#start_date").val());
                var changeEMonth = new Date($("#end_date").val());

                var SYear = changeSMonth.getFullYear();
                var SMonth = changeSMonth.getMonth()+1;
                var EYear = changeEMonth.getFullYear();
                var EMonth = changeEMonth.getMonth()+1;
                var intervalMonth = (Number(EYear+""+("00"+(EMonth+1)).slice(-2)) - Number(SYear+""+("00"+(SMonth+1)).slice(-2))) + 1;

                var workPlanChangeArr = new Array();
                for(var i = 0; i < intervalMonth; i++){
                    var workPlanChangeDetailArr = new Array();
                    var ChangeData = {
                        request_emp_seq : $("#empSeq").val(),
                        request_date : $("#apply_month").val().replaceAll("-", ""),
                        apply_month : SYear+""+("00"+(SMonth+i)).slice(-2),
                        work_plan_type : $("#work_plan_type").val(),
                        work_week_time : "W" + $("#work_week_time").getKendoRadioGroup().value(),
                        work_month_time : $("#work_month_time").val(),
                        start_date : $("#start_date").val().replaceAll("-", ""),
                        end_date : $("#end_date").val().replaceAll("-", ""),
                        request_position : $("#positionCode").val(),
                        request_dept_seq : $("#deptSeq").val(),
                        request_dept_name : $("#deptName").val(),
                        request_duty : $("#dutyCode").val(),
                        apply_reason : $("#apply_reason").val(),
                        appr_stat : "N",
                    }

                    for(var j = 0; j < workPlanRegPop.monthDiff(); j++){
                        var sameCheckDate = new Date($("#start_date").val());
                        sameCheckDate.setDate(sameCheckDate.getDate() + j);

                        var detailYearMonth = sameCheckDate.getFullYear() + "" + ("00" + (sameCheckDate.getMonth() + 1)).slice(-2);
                        if((workPlanRegPop.getDate(sameCheckDate) != "토요일" || workPlanRegPop.getDate(sameCheckDate) != "일요일") && detailYearMonth == ChangeData.apply_month){
                            $.each($("#byDayWeekWTime tr"), function(){
                                if($(this).find("td:eq(1)").text() == workPlanRegPop.getDate(sameCheckDate) && !$(this).hasClass("removeDay")) {
                                    var ChangeDetailData = {
                                        emp_seq : $("#empSeq").val(),
                                        common_code_id : workPlanType,
                                        work_date : detailYearMonth + "" + ("00" + sameCheckDate.getDate()).slice(-2),
                                        weekday : workPlanRegPop.getDate(sameCheckDate),
                                        attend_time : $(this).find("input[name=w_s_time]").val(),
                                        leave_time : $(this).find("input[name=w_e_time]").val(),
                                        changer_dept_name : $("#deptName").val(),
                                        changer_position : $("#positionCode").val(),
                                        changer_duty : $("#dutyCode").val()
                                    }
                                    workPlanChangeDetailArr.push(ChangeDetailData);
                                }
                            })
                        }
                        sameCheckDate.setDate(sameCheckDate.getDate() - j);
                    }
                    ChangeData.detailData = workPlanChangeDetailArr;
                    workPlanChangeArr.push(ChangeData);
                }

                $.ajax({
                    url : getContextPath()+"/workPlan/setWorkPlanChangeOrDetail.do",
                    data : {
                        workPlanChange : JSON.stringify(workPlanChangeArr)
                    },
                    dataType : "json",
                    type : "POST",
                    success : function(rs){
                        var rs = rs.result;
                        alert(rs.message);
                        if(rs.code == "200"){
                            opener.openerParamsReset();
                            opener.gridReload();
                            window.close();
                        }
                    }
                })
            }else{
                alert("입력값을 다시 확인해주세요.");
                return
            }
        }
    },

    workTimeValidationChk : function(){
        var flag = true;
        $.each($(".timePicker"), function(){
            if(!$(this).closest("tr").hasClass("removeDay") && this.value == "00:00"){
                flag = false;
                return flag;
            }
        });

        return flag;
    },

    getDate : function(changeDate){
        var week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        var dayOfWeek = week[changeDate.getDay()];

        return dayOfWeek;
    },

    dateValidationCheck : function(id, val){
        var sDt;
        var nDt;

        if(id == "start_date" || id == "end_date"){
            sDt = new Date($("#start_date").val());
            nDt = new Date($("#end_date").val());

            if(workPlanRegPop.getDate(sDt) == "토" || workPlanRegPop.getDate(sDt) == "일"){
                alert("휴일엔 근무를 변경할 수 없습니다.");
                $("#start_date").val("");
                return;
            }else if(workPlanRegPop.getDate(nDt) == "토" || workPlanRegPop.getDate(nDt) == "일"){
                alert("휴일엔 근무를 변경할 수 없습니다.");
                $("#end_date").val("");
                return;
            }else if(id == "start_date"){
                if(sDt > nDt){
                    $("#end_date").val(val);
                }
            }else{
                if(sDt > nDt){
                    $("#start_date").val(val);
                }
            }
        }else{
            sDt = new Date($("#startDay").val());
            nDt = new Date($("#endDay").val());

            if(id == "startDay"){
                if(sDt > nDt){
                    $("#endDay").val(val);
                }
            }else{
                if(sDt > nDt){
                    $("#startDay").val(val);
                }
            }
        }

    },

    removeDayChk : function(e){
        if(!$(e).is(":checked")) {
            $(e).closest("tr").addClass("removeDay");
            $(e).closest("tr").find(".timePicker").val("00:00");
            workPlanRegPop.singleWTSetting($(e).attr("day"));
        }else {
            var checkWpT = $("input[name=workPlanType]:checked").val() == null ? "09:00~18:00" : $("input[name=workPlanType]:checked").val();
            $(e).closest("tr").removeClass("removeDay");
            $(e).closest("tr").find(".w_start_time").val(checkWpT.split("~")[0]);
            $(e).closest("tr").find(".w_end_time").val(checkWpT.split("~")[1]);
            workPlanRegPop.singleWTSetting($(e).attr("day"));
        }
    },

    fn_windowClose : function(){
        opener.openerParamsReset();
        opener.gridReload();
        window.close();
    }

}