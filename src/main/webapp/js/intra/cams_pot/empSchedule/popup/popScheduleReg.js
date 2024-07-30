var sr = {
    
    global : {
        duplicateFlag : "N",
        saveAjaxData : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        now : new Date()
    },
    
    fn_defaultScript : function(){
        window.resizeTo(1140, 740);

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", sr.global.now);
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", sr.global.now);

        $("#startTime, #endTime").kendoTimePicker({
            format: "HH:mm",
        });

        customKendo.fn_textBox(["scheduleTitle", "schedulePlace"])

        $("#allDayYn").click(function(){
            if($(this).is(":checked")){
                $("#startTime").val("00:00")
                $("#startTime").data("kendoTimePicker").enable(false);
                $("#endTime").val("23:59")
                $("#endTime").data("kendoTimePicker").enable(false);
            }else{
                $("#startTime").val("")
                $("#startTime").data("kendoTimePicker").enable(true);
                $("#endTime").val("")
                $("#endTime").data("kendoTimePicker").enable(true);
            }
        });

        CKEDITOR.replace('scheduleContent', {

        });

        if($("#scheduleBoardId").val()){
            sr.getSchedule();
        }
    },

    setScheduleReg : function(){
        if(!$("#startDt").val()){
            alert("시작날짜를 선택해주세요.");
            return;
        }else if(!$("#endDt").val()){
            alert("종료날짜를 선택해주세요.");
            return;
        }if(!$("#startTime").val()){
            alert("시작시간을 선택해주세요.");
            return;
        }if(!$("#endTime").val()){
            alert("종료시간을 선택해주세요.");
            return;
        }if(!$("input[name='scheduleType']:checked").val()){
            alert("일정종류를 선택해주세요.");
            return;
        }if(!$("#scheduleTitle").val()){
            alert("제목을 입력해주세요.");
            return;
        }if(!CKEDITOR.instances.scheduleContent.getData()){
            alert("내용을 입력해주세요.");
            return;
        }if(!$("#schedulePlace").val()){
            alert("장소를 입력해주세요.");
            return;
        }if(!$("input[name='publicClass']:checked").val()){
            alert("공개분류를 선택해주세요.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            sr.global.saveAjaxData = {
                scheduleBoardId : $("#scheduleBoardId").val(),
                startDt : $("#startDt").val(),
                endDt : $("#endDt").val(),
                holidayYn : $("#holidayYn").is(":checked") ? "Y" : "N",
                startTime : $("#startTime").val(),
                endTime : $("#endTime").val(),
                allDayYn : $("#allDayYn").is(":checked") ? "Y" : "N",
                scheduleType : $("input[name='scheduleType']:checked").val(),
                scheduleTitle : $("#scheduleTitle").val(),
                scheduleContent : CKEDITOR.instances.scheduleContent.getData(),
                schedulePlace : $("#schedulePlace").val(),
                publicClass : $("input[name='publicClass']:checked").val(),
                camsPotPost : $("#camsPotPost").is(":checked") ? "Y" : "N",
                empSeq : $("#empSeq").val(),
                empName : $("#empName").val()
            }

            var result = customKendo.fn_customAjax("/spot/setScheduleReg.do", sr.global.saveAjaxData)
            if(result.flag){
                alert("등록되었습니다.");
                window.opener.parent.location.reload();
                window.close();
            }
        }
    },

    getSchedule : function(){
        sr.global.searchAjaxData = {
            scheduleBoardId : $("#scheduleBoardId").val()
        }

        var result = customKendo.fn_customAjax("/spot/getSchedule.do", sr.global.searchAjaxData);
        if(result.flag){
            var rs = result.rs;
            $("#startDt").val(rs.START_DT);
            $("#endDt").val(rs.END_DT);
            if(rs.HOLIDAY_YN == "Y"){
                $("#holidayYn").prop("checked", true);
            }
            $("#startTime").val(rs.START_TIME);
            $("#endTime").val(rs.END_TIME);
            if(rs.ALL_DAY_YN == "Y"){
                $("#allDayYn").prop("checked", true);
            }
            if(rs.SCHEDULE_TYPE != null){
                $("input[name='scheduleType'][value='" + rs.SCHEDULE_TYPE + "']").prop("checked", true);
            }

            $("#scheduleTitle").val(rs.SCHEDULE_TITLE);
            CKEDITOR.instances.scheduleContent.setData(rs.SCHEDULE_CONTENT);
            $("#schedulePlace").val(rs.SCHEDULE_PLACE);
            if(rs.PUBLIC_CLASS != null){
                $("input[name='publicClass'][value='" + rs.PUBLIC_CLASS + "']").prop("checked", true);
            }
            if(rs.CAMS_POT_POST == "Y"){
                $("#camsPotPost").prop("checked", true);
            }
        }
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}
