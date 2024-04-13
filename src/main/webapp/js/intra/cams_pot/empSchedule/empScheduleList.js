var esl = {

    global : {
        now : new Date(),
        year : "",
        month : "",
        day : "",
        searchAjaxData : "",
        data : new Array(),
        minuteList : new Array(),
        hourList : new Array(),
        dropDownDataSource : "",
    },

    fn_defaultScript : function(){

        for(var i = 0 ; i < 60 ; i++){
            var minute = i;
            if(i < 10) minute = "0" + i;
            esl.global.minuteList.push({MINUTE_NM: minute, MINUTE_CD: minute});
        }

        for(var i = 6 ; i < 24 ; i++){
            var hour = i;
            if(i < 10) hour = "0" + i;
            esl.global.hourList.push({HOUR_NM: hour, HOUR_CD: hour});
        }

        esl.global.dropDownDataSource = [
            { text : "직원일정", value : "ES" },
            { text : "법인일정", value : "CS" },
        ]
        customKendo.fn_dropDownList("publicClass", esl.global.dropDownDataSource, "text", "value");
    },

    getScheduleData : function(){
        var scheduleData = new Array();

        esl.global.searchAjaxData = {
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            publicClass : $("#publicClass").val()
        }


        var ds = customKendo.fn_customAjax("/spot/getScheduleList.do", esl.global.searchAjaxData);
        if(ds.flag){
            esl.global.data = ds.list;
        }

        if(esl.global.data.length > 0){
            for(var i = 0 ; i < esl.global.data.length ; i++){
                var row = {};
                row.title = esl.global.data[i].title;
                row.start = new Date(esl.global.data[i].start);
                row.end = new Date(esl.global.data[i].end);
                row.scheduleBoardId = esl.global.data[i].SCHEDULE_BOARD_ID;
                row.hrBizReqId = esl.global.data[i].hrBizReqId;
                row.color = "#3a87ad94";

                if(esl.global.data[i].PUBLIC_CLASS == "CS"){
                    row.color = "#3a87ad";
                }
                scheduleData.push(row);
            }
        }

        return scheduleData;
    },

    fn_popScheduleReg : function(){
        var url = "/spot/pop/popScheduleReg.do";
        var name = "_blank";
        var option = "width = 1140, height = 740, top = 50, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_detailSchedule : function(key) {
        var url = "/spot/pop/popScheduleView.do?scheduleBoardId=" + key;
        var name = "_blank";
        var option = "width = 750, height = 440, top = 50, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}