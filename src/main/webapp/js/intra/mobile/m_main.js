var mMain = {
    global : {

    },

    fn_defaultScript : function() {
        mMain.getArticleList('tabMain-1', '40');
        mMain.getScheduleList();
    },

    getArticleList : function(v, e){
        $("#" + v + " .mBoard a").remove();
        var data = {
            recordSize : 8,
            boardId : e,
        }

        var result = customKendo.fn_customAjax("/board/getCamsBoardArticleList.do", data);

        if(result.flag){
            var html = "";
            if(result.boardArticleList.list.length > 0){
                for(var i = 0; i < result.boardArticleList.list.length; i++){
                    var article = result.boardArticleList.list[i];
                    var dt = (article.reg_DATE.year + "-" + ('00' + article.reg_DATE.monthValue).slice(-2) + "-" + ('00' + article.reg_DATE.dayOfMonth).slice(-2));

                    var title = "";
                    if(article.reply_CNT != 0){
                        title = article.board_ARTICLE_TITLE + '[' + article.reply_CNT + ']';
                    }else{
                        title = article.board_ARTICLE_TITLE
                    }

                    html += '' +
                        '<a href="#" onclick="mMain.moveToboardArticleView(' + article.board_ARTICLE_ID + ', ' + article.board_ID + ')">' +
                            '<font class="txt type24 tit">' + title +'</font>' +
                            '<font class="txt type24 date">' + dt + '</font>' +
                        '</a>';
                }
            }else{
                html += '' +
                    '<a href="#">' +
                        '<font class="txt type24 tit">등록된 게시글이 없습니다.</font>' +
                    '</a>';
            }

            $("#" + v + " .mBoard").append(html);
        }
    },

    getScheduleList : function(){
        var data = {
            publicClass: "CS",
            selectedDate : mMain.formatDate(new Date())
        }

        var result = customKendo.fn_customAjax("/spot/getScheduleList.do", data);

        if (result.flag) {
            var html = "";

            result.list.sort(function (a, b) {
                return new Date(b.start) - new Date(a.start);
            });

            if (result.list.length > 0) {
                var recentPosts = result.list.slice(0, 7);
                for (var i = 0; i < recentPosts.length; i++) {
                    var article = result.list[i];

                    html += '' +
                    '<li>' +
                        '<a href="#" class="item_cont">' +
                            '<font class="txt type18 date fP200">' + article.start + ' ~ <br>' + article.end + '</font>' +
                            '<font class="txt type24 tit fP700">' + article.SCHEDULE_TITLE + '</font>' +
                        '</a>' +
                    '</li>';
                }

                $("#scheduleUl").append(html);
            } else {
                html += '' +
                    '<li>' +
                        '<a href="#" class="item_cont">' +
                            '<font class="txt type24 tit fP700">등록된 일정이 없습니다.</font>' +
                        '</a>' +
                    '</li>';

                $("#scheduleDiv").append(html);
            }
        }
    },

    formatDate : function(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },

    moveToboardArticleView : function(e, b){
        location.href = '/m/board_view.do?boardArticleId=' + e + "&boardId=" + b;
    }
}