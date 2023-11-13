(function($) {
    "use strict"


    var data = {
        labels: ['facebook', 'twitter', 'youtube', 'google plus'],
        series: [{
                    value: 20,
                    className: "bg-facebook"
                },
                {
                    value: 10,
                    className: "bg-twitter"
                },
                {
                    value: 30,
                    className: "bg-youtube"
                },
                {
                    value: 40,
                    className: "bg-google-plus"
                }
            ]
            //        colors: ["#333", "#222", "#111"]
    };

    var options = {
        labelInterpolationFnc: function(value) {
            return value[0]
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function(value) {
                return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];

    new Chartist.Pie('.ct-pie-chart', data, options, responsiveOptions);


    /*----------------------------------*/

    var data = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
            [4, 6, 3, 9, 6, 5, 2, 8, 3, , 5, 4],
        ]
    };

    var options = {
        seriesBarDistance: 10
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

    new Chartist.Bar('.ct-bar-chart', data, options, responsiveOptions);
    var ds = customKendo.fn_customAjax("/spot/getScheduleList.do", publicClass);
    var calendarData = new Array();
    if (ds.flag) {
        var data = ds.list;
        for (var a = 0; a < data.length; a++) {
            var start = ds.list[a].startDate;
            var end = ds.list[a].endDate;
            //날짜비교
            if (end >= start) {
                for (var i = start; i <= end; i++) {

                    var pushData = {
                        name: "offer",
                        date: i
                    };

                    calendarData.push(pushData);
                }
            }
        }

    }
    $('.year-calendar').pignoseCalendar({
        scheduleOptions: {
            colors: {
                offer: '#2fabb7',
                ad: '#5c6270'
            },
            lang: 'ko',
        },

        theme: 'blue', // light, dark, blue
        schedules: calendarData,
        select: function (dates, context) {
            var selectedDate = dates[0].format('YYYY-MM-DD');

            var popupWindow = window.open(getContextPath() + '/spot/pop/popScheduleTodayView.do', 'Schedule Popup', 'width=1000, height=600, resizable=yes, scrollbars=yes');

            if (popupWindow) {
                popupWindow.focus();
            }
        }
    });

})(jQuery);

if($('.widget-todo2').length > 0){
    const wt2 = new PerfectScrollbar('.widget-todo2');
}
