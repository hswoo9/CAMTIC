var mScheduleStaff = {
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
        mScheduleStaff.getScheduleData();
    },

    getScheduleData : function(){
        var selDate = $("#day").datepicker("getDate");

        mScheduleStaff.global.searchAjaxData = {
            date : selDate.getFullYear() + "-" +  ("0" + (selDate.getMonth() + 1)).slice(-2) + "-" + selDate.getDate(),
            publicClass : "ES",
            page : "mobile",
        }

        var ds = customKendo.fn_customAjax("/spot/getScheduleList.do", mScheduleStaff.global.searchAjaxData);
        if(ds.flag){
            var html = "";
            for(var i = 0 ; i < ds.list.length ; i++) {
                var scheduleType = ds.list[i].title2.split("|")[0];
                var iClass = "";
                if(scheduleType == "출장"){
                    iClass = "ico-1";
                }else if(scheduleType == "생일"){
                    iClass = "ico-9";
                }else {
                    iClass = "ico-2";
                }

                html += '' +
                    '<span>' +
                        '<font class="txt type28 tit"><i class="' + iClass + '">' + ds.list[i].title2.split("|")[0] + '</i>' + ds.list[i].title2.split("|")[1] + '</font>' +
                        '<font class="txt type20 posi">' + ds.list[i].DEPT_POSITION + '</font>' +
                    '</span>';
            }

            $("#scheduleDiv").html(html);
        }
    },

    setDateSetting: function (e) {
        var selDate = $("#day").datepicker("getDate");
        if (e == "prev") {
            $('#day').datepicker('setDate', new Date(selDate.setDate(selDate.getDate() - 1)));
        }else{
            $('#day').datepicker('setDate', new Date(selDate.setDate(selDate.getDate() + 1)));
        }

        mScheduleStaff.getScheduleData();
    },
}