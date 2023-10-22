
var wbl = {
	global : {
		params : "",
		articleList : "",
		articleSelIndex : 0,
		dropDownDataSource : "",
		searchAjaxData : "",
		saveAjaxData : "",
		pasChkModal : "",
		flag : false,
		now : new Date()
	},

	fnDefaultScript : function(){
		wbl.gridReload();
	},

	mainGrid : function(url, params){
		var result = customKendo.fn_customAjax(url, params);

		if(result.flag){
			wbl.global.articleList = result.boardArticleList;
            wbl.global.params = result.params;

			if(isAdmin) {
				$("#writeBtn").show()
			}

			var articleListStr = "";
			$("#listUl li").remove();
			if(wbl.global.articleList.list.length > 0){
                var list = wbl.global.articleList.list;
                const pagination = wbl.global.articleList.pagination;
                const params = wbl.global.params;

                let num = pagination.totalRecordCount - ((params.page - 1) * params.recordSize);

                wbl.drawList(list, num);

                wbl.drawPage(pagination, params);

			}else{
				articleListStr += "" +
					"<li style='width: 100%;height: 200px;margin: 0;text-align: center;display: flex;justify-content: center;align-items: center;'>" +
						"<div>데이터가 존재하지 않습니다.</div>" +
					"</li>";
                $("#listUl").append(articleListStr);
			}
		}
	},

	gridReload : function() {
		wbl.mainGrid("/spot/getWatchBoardList.do", {});
	},

	detailPageMove : function(watchBoardId){
		open_in_frame('/spot/watchBoardDetail.do?watchBoardId='+ watchBoardId);
	},

	writePageMove : function(){
		open_in_frame('/spot/watchBoardReg.do');
	},

    drawList : function (list, num){
        let html = "";

        var i = 0;
		list.forEach(row => {
			var locationHost = "";
			if(location.host.indexOf("127.0.0.1") > -1 || location.host.indexOf("localhost") > -1){
				locationHost = "http://218.158.231.186";
			}else{
				locationHost = location.host;
			}

			var articleTitle = "";
			if(row.board_ARTICLE_TITLE != null && row.board_ARTICLE_TITLE != ""){
				articleTitle = row.board_ARTICLE_TITLE;
			}else{
				articleTitle = "제목없음";
			}
			html += "<li>" +
						'<a class="contentLink" href=\"javascript:wbl.detailPageMove(' + row.watch_BOARD_ID + ')\">' +
							'<div class="board_img">' +
								'<img src="' + locationHost + row.file_PATH + row.file_UUID + '" alt="' + row.file_ORG_NAME+ '">' +
							// '<img src="/images/photos/loggeduser3.png">' +
							'</div>' +
							'<h4 class="board_tit">' + articleTitle + '</h4>' +
						"</a>" +
					"</li>";
		});

        $("#listUl").append(html);
    },

    drawPage : function(pagination, params){
        if ( !pagination || !params ) {
            document.querySelector('.paging').innerHTML = '';
            throw new Error('Missing required parameters...');
        }

        let html = '';
		html += '<div style="display:flex;justify-content: center; ">';
        html += '<span><a href="javascript:void(0);" onclick="wbl.movePage(' + (params.page - 1) + ')" class="page_bt prev">&laquo;</a></span>';

        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            html += (i !== params.page)
                ? '<span><a href="javascript:void(0);" onclick="wbl.movePage('+i+');">'+ i +'</a></span>'
                : '<span><a href="#" class="active">' + i + '</a></span>'
        }

        html += '<span><a href="javascript:void(0);" onclick="wbl.movePage(' + (params.page + 1) + ');" className="page_bt next">&raquo;</a></span>';
		html += '</div>';
        $(".pagination").html(html);
    },

    movePage : function (page){
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 8,
            pageSize: 10
        }

        wbl.mainGrid("/spot/getWatchBoardList.do?" + new URLSearchParams(queryParams).toString(), wbl.global.searchAjaxData);
    }
}