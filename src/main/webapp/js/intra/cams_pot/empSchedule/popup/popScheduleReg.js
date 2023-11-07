var sr = {
    
    global : {
        duplicateFlag : "N",
        saveAjaxData : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        now : new Date()
    },
    
    fn_defaultScript : function(){
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

        if($("#masterSn").val()){
            sr.getItemMaster();
        }
    },

    getItemNoDuplicate : function(){
        if(!$("#itemNo").val()){
            alert("품번을 입력해주세요.");
            return;
        }

        sr.global.saveAjaxData = {
            itemNo : $("#itemNo").val()
        }
        var result = customKendo.fn_customAjax("/item/getItemNoDuplicate.do", sr.global.saveAjaxData)
        if(result.flag){
            sr.global.duplicateFlag = result.rs;
            if(result.rs){
                alert("이미 등록된 품번입니다.");
            }else {
                alert("등록 가능한 품번입니다.");
            }
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
                window.close();
            }
        }
    },

    getItemMaster : function(){
        sr.global.searchAjaxData = {
            masterSn : $("#masterSn").val()
        }
        var result = customKendo.fn_customAjax("/item/getItemMaster.do", sr.global.searchAjaxData);
        if(result.flag){
            sr.global.duplicateFlag = false;
            $("#itemNo").val(result.rs.ITEM_NO);
            $("#itemName").val(result.rs.ITEM_NAME);
            $("#itemUnitCd").data("kendoDropDownList").value(result.rs.ITEM_UNIT_CD);
            $("#standard").val(result.rs.STANDARD)
            $("#itemType").data("kendoDropDownList").value(result.rs.ITEM_TYPE);
            $("#safetyInven").val(result.rs.SAFETY_INVEN)
            $("#whCd").data("kendoDropDownList").value(result.rs.WH_CD)
            $("#active").data("kendoDropDownList").value(result.rs.ACTIVE)
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
