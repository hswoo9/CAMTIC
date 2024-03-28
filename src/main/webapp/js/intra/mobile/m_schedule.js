var mSchedule = {
    global : {
        utc : new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000),
        kstGap : 9 * 60 * 60 * 1000,
        currentYear : "",
        currentMonth : "",
        currentDate : "",
        searchAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function() {
        mSchedule.makeCalendar();
    },

    makeCalendar : function(){
        var today = new Date(mSchedule.global.utc + mSchedule.global.kstGap);
        var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        // 달력에서 표기하는 날짜 객체

        mSchedule.global.currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
        mSchedule.global.currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
        mSchedule.global.currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

        // 캘린더 렌더링
        mSchedule.calender(thisMonth, today);

        // 이전달로 이동
        $('.prev').on('click', function() {
            thisMonth = new Date(mSchedule.global.currentYear, mSchedule.global.currentMonth - 1, 1);
            mSchedule.calender(thisMonth, today);
        });

        // 다음달로 이동
        $('.next').on('click', function() {
            thisMonth = new Date(mSchedule.global.currentYear, mSchedule.global.currentMonth + 1, 1);
            mSchedule.calender(thisMonth, today);
        });
    },

    calender : function(thisMonth, today) {
        // 렌더링을 위한 데이터 정리
        mSchedule.global.currentYear = thisMonth.getFullYear();
        mSchedule.global.currentMonth = thisMonth.getMonth();
        mSchedule.global.currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(mSchedule.global.currentYear, mSchedule.global.currentMonth, 0);
        var prevMonth = startDay.getMonth();
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(mSchedule.global.currentYear, mSchedule.global.currentMonth + 1, 0);
        var nextMonth = endDay.getMonth();
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // 현재 월 표기
        $('.year-month').text(mSchedule.global.currentYear + '년 ' + ('0' + (mSchedule.global.currentMonth + 1)).slice(-2) + "월");

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.date')
        calendar.innerHTML = '';

        var html = "";
        var tr = 0;
        // 지난달
        for (var i = prevDate - prevDay; i <= prevDate; i++) {
            html += '' +
                '<li class="off">' + i + '</li>';
            tr++;
        }

        //이번달
        for (var i = 1; i <= nextDate; i++) {
            var tdClass = "";
            if(tr%7 == 0){
                tdClass = "sun ";
            }else if(tr%7 == 6){
                tdClass = "sat ";
            }

            html += '' +
                '<li class="' + tdClass + 'current" date="' + mSchedule.global.currentYear + '-' + ("0" + (mSchedule.global.currentMonth+1)).slice(-2) + "-" + ("0" + i).slice(-2) + '">' + i + '</li>';
            tr++;

        }

        // 다음달
        for (var i = 1; i <= (6 - nextDay == 6 ? 6 : 6 - nextDay); i++) {
            html += '' +
                '<li class="off" class="">' + i + '</li>';
        }

        calendar.innerHTML = html;

        // 오늘 날짜 표기
        if (today.getMonth() == mSchedule.global.currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.date .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }

        $("#endDate").val(nextDate);

        mSchedule.getScheduleData();
    },

    getScheduleData : function(){
        mSchedule.global.searchAjaxData = {
            startDt : mSchedule.global.currentYear + '-' + ("0" + (mSchedule.global.currentMonth+1)).slice(-2) + "-01",
            endDt : mSchedule.global.currentYear + '-' + ("0" + (mSchedule.global.currentMonth+1)).slice(-2) + "-" + $("#endDate").val(),
            publicClass : "CS",
        }

        var ds = customKendo.fn_customAjax("/spot/getScheduleList.do", mSchedule.global.searchAjaxData);
        if(ds.flag){

            for(var i = 0 ; i < ds.list.length ; i++){
                const start = new Date(ds.list[i].START_DT);
                const end = new Date(ds.list[i].END_DT);

                if(ds.list[i].START_DT != ds.list[i].END_DT){
                    const result = [];

                    while (start <= end) {
                        result.push(start.toISOString().split('T')[0]);
                        start.setDate(start.getDate() + 1);
                    }

                    for(var d = 0; d < result.length; d++){

                        $("li.current[date='" + result[d] + "']").addClass("on");
                        $("li.current[date='" + result[d] + "']").addClass("link");
                        $("li.current[date='" + result[d] + "']").attr("onclick", 'mSchedule.getSchedule(\'' + result[d] + '\')');
                    }
                }else{
                    $("li.current[date='" + ds.list[i].START_DT + "']").addClass("on");
                    $("li.current[date='" + ds.list[i].START_DT + "']").addClass("link");
                    $("li.current[date='" + ds.list[i].START_DT + "']").attr("onclick", 'mSchedule.getSchedule(\'' + ds.list[i].START_DT + '\')');
                }
            }
        }
    },

    getSchedule : function(e){
        $("#date").text(e.split("-")[0] + "년 " + e.split("-")[1] + "월 " + e.split("-")[2] + "일")
        mSchedule.global.searchAjaxData = {
            date : e,
            publicClass : "CS",
            page : "mobile",
        }

        var ds = customKendo.fn_customAjax("/spot/getScheduleList.do", mSchedule.global.searchAjaxData);
        if(ds.flag){
            var html = "";
            for(var i = 0 ; i < ds.list.length ; i++) {
                html += '' +
                    '<span>' +
                    	'<font class="time">' +
                            ds.list[i].START_DT + "<br>" + ds.list[i].START_TIME + " ~ " + ds.list[i].END_TIME + "<br>" +
                            ds.list[i].END_DT + "<br>" + ds.list[i].START_TIME + " ~ " + ds.list[i].END_TIME +
                        '</font>' +
                        '<font class="sce">' + ds.list[i].SCHEDULE_TITLE + '</font>' +
                    '</span>';
            }
        }
        $("#scheduleDiv").html(html);
        showLayer(1);
    }
}