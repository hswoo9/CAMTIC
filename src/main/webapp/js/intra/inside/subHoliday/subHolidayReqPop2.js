const subHolidayReqPop2 = {
    global : {
        now : new Date(),
        type: "",

        holidayWorkData: new Object()
    },

    fn_defaultScript : function(){
        this.pageSet();
        this.dataSet();
        this.btnSet();
    },

    pageSet : function(){
        $("#erpEmpCd, #empName, #deptName, #dutyName, #edtHolidayKindText").kendoTextBox({
            enable: false
        });

        $("#holiday_reason").kendoTextBox();
        $("#other_reason").kendoTextBox();
        $("#other_emp").kendoTextBox();

        /** 근로일자 */
        $(".edtHolidayWorkDay").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            interval : 1,
            change : function(){
                var startDate = new Date(this.value());
                var endDate = new Date($("#edtHolidayEndDateTop_3").val());
                if(startDate > endDate){
                    $("#edtHolidayEndDateTop_3").data("kendoDatePicker").value($("#edtHolidayStartDateTop_3").val());
                }
            }
        });

        /** 근로 시작시간 */
        $(".edtHolidayStartHourTop").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00",
            change : function(e){
                var startTime = new Date(this.value());
                var endTime = new Date($("#edtHolidayEndHourTop_3").val());
                if(startTime > endTime){
                    $("#edtHolidayEndHourTop_3").data("kendoTimePicker").value($("#edtHolidayStartHourTop_3").val());
                }
            }
        });

        /** 근로 종료시간 */
        $(".edtHolidayEndHourTop").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "18:00",
            change : function(e){
                var startTime = new Date($("#edtHolidayStartTimeModal_3").val());
                var endTime = new Date(this.value());
                if(startTime > endTime){
                    $("#edtHolidayStartHourTop_3").data("kendoTimePicker").value($("#edtHolidayEndHourTop_3").val());
                }
            }
        });

        /** 대체휴가일자 */
        $(".edtHolidayAlternativeDate").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            interval : 1,
            change : function(){
                var startDate = new Date(this.value());
                var endDate = new Date($("#edtHolidayAlternativeDate_3").val());
                if(startDate > endDate){
                    $("#edtHolidayAlternativeDate_3").data("kendoDatePicker").value($("#edtHolidayAlternativeDate_3").val());
                }
            }
        });

        $("#holiday_reason").kendoTextBox();

        customKendo.fn_datePicker("now_date", "month", "yyyy-MM-dd", new Date());

        $(".edtHolidayWorkDay, .edtHolidayStartHourTop, .edtHolidayEndHourTop, .edtHolidayAlternativeDate, #now_date").attr("readonly", true);

        /** 캠도큐먼트 양식목록에서 기안시 처리작업 */
        subHolidayReqPop2.global.type = $("#type").val();
    },

    dataSet : function(){
        if($("#holidayWorkMasterSn").val() == ""){
            return;
        }

        var result = customKendo.fn_customAjax("/subHoliday/getHolidayWorkHistOne", {holidayWorkMasterSn : $("#holidayWorkMasterSn").val()});
        subHolidayReqPop2.global.holidayWorkData = result.data;

        const data = result.list[0];
        if(result.flag){
            if(data.DUTY_NAME != ""){
                $("#dutyName").val(data.DUTY_NAME);
            } else {
                $("#dutyName").val(data.POSITION_NAME);
            }

            console.log(data);
            $("#empSeq").val(data.APPLY_SEQ);
            $("#empName").val(data.EMP_NAME_KR);
            $("#deptName").val(data.DEPT_NAME2);

            for(let i=0; i<result.list.length; i++){
                const map = result.list[i];
                console.log("map"+i, map);
                $("#vacUseHistId_"+i).val(map.SUBHOLIDAY_USE_ID);
                $("#edtHolidayAlternativeDate_"+i).val(map.SUBHOLIDAY_ALTERNATIVE_DAY);
                $("#edtHolidayWorkDay_"+i).val(map.SUBHOLIDAY_WORK_DAY);
                $("#edtHolidayStartHourTop_"+i).val(map.SUBHOLIDAY_ST_TIME);
                $("#edtHolidayEndHourTop_"+i).val(map.SUBHOLIDAY_EN_TIME);
            }

            $("#holiday_reason").val(data.RMK);
            $("#now_date").val(data.SAVE_DT);
        }
    },

    btnSet : function(){
        console.log("holidayWorkData", subHolidayReqPop2.global.holidayWorkData);
        let html = makeApprBtnHtml(subHolidayReqPop2.global.holidayWorkData, "subHolidayReqPop2.holidayWorkDrafting()");
        $("#holidayWorkBtnBox").html(html);

        const status = subHolidayReqPop2.global.holidayWorkData.STATUS;
        if((status == "10" || status == "20" || status == "50" || status == "100" || status == "101") || $("#mode").val() == "mng"){
            subHolidayReqPop2.fn_kendoUIEnableSet();
        }

        if($("#mode").val() == "mng" && eduReq.global.eduInfo.STATUS != "100"){
            $("#holidayWorkBtnBox").hide();
        }
    },

    fn_kendoUIEnableSet : function(){
        $("#saveBtn").hide();

        for(let i=0; i<$(".addData").length; i++){
            $("#edtHolidayAlternativeDate_"+i).data("kendoDatePicker").enable(false);
            $("#edtHolidayWorkDay_"+i).data("kendoDatePicker").enable(false);
            $("#edtHolidayStartHourTop_"+i).data("kendoTimePicker").enable(false);
            $("#edtHolidayEndHourTop_"+i).data("kendoTimePicker").enable(false);
            $("#resetBtn_"+i).hide();
        }
        $("#other_reason").attr("disabled", "disabled");
        $("#holiday_reason").attr("disabled", "disabled");

        $("#now_date").data("kendoDatePicker").enable(false);
    },

    fn_save : function(){
        let flag = subHolidayReqPop2.fn_getApplyDateCheck();

        if(!$("#holiday_reason").val()){
            alert("사유를 입력해주세요.");
            $("#holiday_reason").focus();
            return;
        }

        if (flag) {
            if (confirm("저장하시겠습니까?")) {
                var monthStr = "00" + (subHolidayReqPop2.global.now.getMonth()+1);
                var dayStr = "00" + subHolidayReqPop2.global.now.getDate();
                var data = {
                    vacCodeId: $("#edtHolidayKindTop").val(),
                    applySeq: $("#empSeq").val(),
                    applyDate: subHolidayReqPop2.global.now.getFullYear() + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                    saveSeq: $("#empSeq").val(),
                    saveDate: subHolidayReqPop2.global.now.getFullYear() + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                    rmk: $("#holiday_reason").val(),
                    rmkOther : $("#other_reason").val(),
                    vacTargetSeq: $("#empSeq").val(),
                    regEmpSeq: $("#empSeq").val(),
                }

                if($("#holidayWorkMasterSn").val() != null && $("#holidayWorkMasterSn").val() != ""){
                    data.holidayWorkMasterSn = $("#holidayWorkMasterSn").val();
                }

                const workDateArr = [];
                for(let i=0; i<$(".addData").length; i++){
                    if($("#edtHolidayWorkDay_"+i).val() == ""){
                        continue;
                    }else{
                        workDateArr.push({
                            vacUseStDt : $("#edtHolidayStartDateTop_"+i).val(),
                            vacUseStTime : $("#edtHolidayStartHourTop_"+i).val(),
                            vacUseEnDt : $("#edtHolidayStartDateTop_"+i).val(),
                            vacUseEnTime : $("#edtHolidayEndHourTop_"+i).val(),
                            vacWorkDt : $("#edtHolidayWorkDay_"+i).val(),
                            vacUseAlDt : $("#edtHolidayAlternativeDate_"+i).val(),
                            vacUseHistId : $("#vacUseHistId_"+i).val()
                        })
                    }
                }

                data.workDateArr = JSON.stringify(workDateArr);
                data.useDay = 0;
            }

            $.ajax({
                url : "/subHoliday/setVacUseHist2.do",
                data : data,
                dataType : "json",
                type : "post",
                success: function (rs) {
                    alert("신청 데이터 저장이 완료되었습니다.");
                    if(subHolidayReqPop2.global.type != "drafting") {
                        opener.gridReload();
                    }
                    location.href = "/subHoliday/pop/subHolidayReqPop2.do?holidayWorkMasterSn=" + rs.holidayWorkMasterSn;
                },
                error: function () {
                    alert("신청 데이터 저장 중 에러가 발생했습니다.");
                }
            });
        }
    },

    fn_getApplyDateCheck : function(){
        let flag = true;
        let workDayCk = false;

        for(let i=0; i<$(".addData").length; i++){
            if($("#edtHolidayWorkDay_"+i).val() == ""){
                continue;
            }else{
                workDayCk = true;
            }

            if($("#edtHolidayAlternativeDate_"+i).val() == ""){
                alert($("#edtHolidayWorkDay_"+i).val()+" 해당 일자에 대채휴가일자가 작정되지 않았습니다");
                flag = false;
                break;
            }
        }

        if(!workDayCk){
            alert("근로일자가 선택되지 않았습니다.");
            flag = false;
        }

        return flag;
    },

    dataClear : function(row){
        const initialStartDate = "09:00";
        const initialEndDate = "18:00";
        $("#edtHolidayStartHourTop_"+row).data("kendoTimePicker").value(initialStartDate);
        $("#edtHolidayEndHourTop_"+row).data("kendoTimePicker").value(initialEndDate);
        $("#edtHolidayWorkDay_"+row).data("kendoDatePicker").value("");
        $("#edtHolidayAlternativeDate_"+row).data("kendoDatePicker").value("");
    },

    holidayWorkDrafting : function(){
        $("#subHolidayDraftFrm").one("submit", function() {
            var url = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    }
}

