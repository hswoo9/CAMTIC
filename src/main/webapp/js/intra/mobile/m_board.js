var mBl = {
    global : {

    },

    fn_defaultScript : function(queryParams) {
        if(queryParams.boardId != null){
            $("#boardId").val(queryParams.boardId);
            delete queryParams.boardId;
        }

        if(queryParams.SearchContent != null){
            $("#searchContent").val(queryParams.SearchContent);
            delete queryParams.SearchContent;
        }

        $(".boardTab[boardId='" + $("#boardId").val() + "']").addClass('active');

        mBl.mainGrid(new URLSearchParams(queryParams).toString());
    },

    mainGrid : function(queryParams) {
        var result = customKendo.fn_customAjax("/board/getCamsBoardArticleList.do?" + queryParams, {
            searchContent : $("#searchContent").val(),
            boardId : $("#boardId").val()
        });

        if(result.flag){
            mBl.global.articleList = result.boardArticleList;
            mBl.global.boardInfo = result.boardInfo.boardInfo;
            mBl.global.boardCategoryList = result.boardInfo.boardCategoryList;
            mBl.global.params = result.params;

            var articleListStr = "";
            $("#articleList a").remove();
            if(mBl.global.articleList.list.length > 0){
                var list = mBl.global.articleList.list;
                const pagination = mBl.global.articleList.pagination;
                const params = mBl.global.params;

                let num = pagination.totalRecordCount - ((params.page - 1) * params.recordSize);

                mBl.drawList(list, num);
                mBl.drawPage(pagination, params);
                $("#totalCnt").text(pagination.totalRecordCount);
            }else {
                articleListStr += "" +
                    '<a href="javascript:void(0)">' +
                        '<font class="txt type28 tit">데이터가 존재하지 않습니다.</font>' +
                    '</a>';

                $("#articleList").append(articleListStr);
                $("#totalCnt").text(0);
            }
        }
    },

    drawList : function (list, num){
        let html = "";
        let i = num;

        list.forEach(row => {
            var replyCnt = "";

            if(row.reply_CNT != 0){
                replyCnt = ' <span style="font-weight: bold;">'+ '[' + row.reply_CNT + ']'+'</span>';
            }else {
                replyCnt = "";
            }
            var articleTitle = "";
            if(row.board_ARTICLE_TITLE != null && row.board_ARTICLE_TITLE != ""){
                articleTitle = row.board_ARTICLE_TITLE + replyCnt;
            }else{
                articleTitle = "제목없음" + replyCnt;
            }

            var dt = (row.reg_DATE.year + "-" + ('00' + row.reg_DATE.monthValue).slice(-2) + "-" + ('00' + row.reg_DATE.dayOfMonth).slice(-2));

            if(row.public_YN != "N"){
                html += '<a href="#" onclick="mBl.moveToboardArticleView(' + row.board_ARTICLE_ID + ',' + row.board_ID + ')">' +
                            '<font class="txt type28 tit">' + articleTitle + '</font>' +
                            '<font class="txt type24">' +
                                '<i>' + row.reg_EMP_NAME + '</i>' +
                                '<i>' + dt + '</i>' +
                                '<i>' + row.board_ARTICLE_VIEW_COUNT + '</i>' +
                                '<i>';
                if(row.file_YN == "Y"){
                    html += '<img src="/images/camspot_m/ico-lfile.png" />';
                }
                html += '' +
                                '</i>' +
                            '</font>' +
                        '</a>';
            }
        });

        $("#articleList").append(html);
    },

    drawPage : function(pagination, params){
        if ( !pagination || !params ) {
            document.querySelector('.paging').innerHTML = '';
            throw new Error('Missing required parameters...');
        }

        let html = '';
        html += '<a href="javascript:void(0);" onclick="mBl.movePage(' + (params.page - 1) + ')" class="arr prev">prev</a>';

        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            html += (i !== params.page)
                ? ' <a href="javascript:void(0);" onclick="mBl.movePage('+i+');">' + i + '</a>'
                : '<b>' + i + '</b>'
        }

        html += '<a href="javascript:void(0);" onclick="mBl.movePage(' + (params.page + 1) + ');" class="arr next">next</a>';
        $(".pagination").html(html);
    },

    movePage : function (page){
        const queryParams = {
            page: (page) ? page : 1,
            pageSize: 10,
            searchContent : $("#searchContent").val(),
            boardId : $("#boardId").val()
        }

        location.href = "/m/board.do?" + new URLSearchParams(queryParams).toString();
    },

    moveToboardArticleView : function(e, b){
        location.href = '/m/board_view.do?boardArticleId=' + e + "&boardId=" + b;
    }
}