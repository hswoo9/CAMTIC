
var normalArticleList = {
	global : {
		params : "",
		nowPage : "",
		boardInfo : "",
		boardCategoryList : "",
		articleList : "",
		articleSelIndex : 0,
		dropDownDataSource : "",
		searchAjaxData : "",
		saveAjaxData : "",
		pasChkModal : "",
		flag : false,
	},

	fnDefaultScript : function(queryParams){
		$(".panel-title").text($("a[onclick=\"open_in_frame('" + $("#menuNm").val() + "')\"]").attr("menuNameKr"));
		$(".title-road").text($("a[onclick=\"open_in_frame('" + $("#menuNm").val() + "')\"]").attr("menuNamePath"));

		normalArticleList.global.dropDownDataSource = [
			{ text: "제목", value: "2" },
			{ text: "내용", value: "3" },
		]

		customKendo.fn_dropDownList("searchColumn", normalArticleList.global.dropDownDataSource, "text", "value");
		customKendo.fn_textBox(["searchContent", "articlePublicPassWord"]);

		$("#searchContent").on("keyup", function(key){
			if(key.keyCode == 13){
				normalArticleList.gridReload();
			}
		});

		if(queryParams.boardId != null){
			$("#boardId").val(queryParams.boardId);
			delete queryParams.boardId;
		}

		if(queryParams.searchCategory != null){
			$("#searchCategory").val(queryParams.searchCategory);
			delete queryParams.searchCategory;
		}

		if(queryParams.searchColumn != null){
			$("#searchColumn").val(queryParams.searchColumn);
			delete queryParams.searchColumn;
		}

		if(queryParams.searchContent != null){
			$("#searchContent").val(queryParams.searchContent);
			delete queryParams.searchContent;
		}

		normalArticleList.gridReload(new URLSearchParams(queryParams).toString());
	},

	mainGrid : function(url, params){
		var result = customKendo.fn_customAjax(url, params);

		if(result.flag){
			normalArticleList.global.articleList = result.boardArticleList;
			normalArticleList.global.boardInfo = result.boardInfo.boardInfo;
			normalArticleList.global.boardCategoryList = result.boardInfo.boardCategoryList;
            normalArticleList.global.params = result.params;

			if(normalArticleList.global.boardInfo.WRITER_TYPE == "All"){
				$("#writeBtn").show()
			}else if(normalArticleList.global.boardInfo.WRITER_TYPE == "admin" && isAdmin){
				$("#writeBtn").show()
			}else{
				// normalArticleList.global.boardInfo.WRITER_TYPE == "authority"
			}

			if(normalArticleList.global.boardInfo.BOARD_CATEGORY_ACTIVE == "Y"){
				normalArticleList.global.dropDownDataSource = normalArticleList.global.boardCategoryList;
				customKendo.fn_dropDownList("searchCategory", normalArticleList.global.dropDownDataSource, "BOARD_CATEGORY_NAME", "BOARD_CATEGORY_ID");
			}else{
				normalArticleList.global.dropDownDataSource = []
				customKendo.fn_dropDownList("searchCategory", normalArticleList.global.dropDownDataSource, "text", "value");
				$("#searchCategory").data("kendoDropDownList").enable(false);
			}

			var articleListStr = "";
			$("#articleListTb tbody *").remove();
			$(".pagination *").remove();
			if(normalArticleList.global.articleList.list.length > 0){
                var list = normalArticleList.global.articleList.list;
                const pagination = normalArticleList.global.articleList.pagination;
                const params = normalArticleList.global.params;

                let num = pagination.totalRecordCount - ((params.page - 1) * params.recordSize);

                normalArticleList.drawList(list, num);

                normalArticleList.drawPage(pagination, params);

                // for(var i = 0; i < normalArticleList.global.articleList.list.length; i++){
				// 	articleListStr += "<tr>";
				// 	articleListStr += "	<td class='ta-center'>" + (i+1) + "</td>";
				// 	articleListStr += "	<td style='cursor:pointer'>";
				// 	if(normalArticleList.global.articleList.list[i].public_YN == "N"){
				// 		articleListStr += "		<span class='k-icon k-i-lock k-button-icon'></span>";
				// 	}
				// 	articleListStr += '		<a href="javascript:normalArticleList.detailPageMove(' + normalArticleList.global.articleList.list[i].board_ARTICLE_ID + ',\'' + normalArticleList.global.articleList.list[i].public_YN + '\',\'' + i + '\')">' + normalArticleList.global.articleList.list[i].board_ARTICLE_TITLE + "</a>";
				// 	articleListStr += "	</td>";
				// 	articleListStr += "	<td class='ta-center'>";
				// 	if(normalArticleList.global.articleList.list[i].file_YN == "Y"){
				// 		articleListStr += "		<span class='k-icon k-i-paperclip k-button-icon'></span>";
				// 	}
				// 	articleListStr += "	</td>";
				// 	articleListStr += "	<td class='ta-center'>" + normalArticleList.global.articleList.list[i].reg_EMP_NAME + "</td>";
				// 	articleListStr += "	<td class='ta-center'>" + normalArticleList.global.articleList.list[i].reg_DATE + "</td>";
				// 	articleListStr += "	<td class='ta-center'>" + normalArticleList.global.articleList.list[i].board_ARTICLE_VIEW_COUNT + "</td>";
				// 	articleListStr += "</tr>";
				// }

			}else{
				articleListStr += "<tr style='border:1px solid #dee2e6;'>";
				articleListStr += "	<td class='ta-center' colspan='6'>데이터가 존재하지 않습니다.</td>";
				articleListStr += "</tr>";
                $("#articleListTb tbody").append(articleListStr);
			}
		}
	},

	gridReload : function(queryParams) {
		normalArticleList.global.searchAjaxData = {
			boardId : $("#boardId").val(),
			searchCategory : $("#searchCategory").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		normalArticleList.mainGrid("/board/getCamsBoardArticleList.do?" + queryParams, normalArticleList.global.searchAjaxData);
	},

	detailPageMove : function(boardArticleId, publicYn, i){
		var boardId = $("#boardId").val();

		const queryParams = {
			page: normalArticleList.global.nowPage == "" ? 1 : normalArticleList.global.nowPage,
			boardArticleId : boardArticleId,
			searchCategory : $("#searchCategory").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		if(publicYn == "N" && isAdmin){
			open_in_frame('/board/normalBoardDetail.do?boardArticleId='+ boardArticleId + '&boardId=' + boardId + '&' + new URLSearchParams(queryParams).toString());
		}else if(publicYn == "N" && !isAdmin){
			normalArticleList.global.pasChkModal = $('<div id="articlePublicNArticlePass" class="pop_wrap_dir">' +
				'				<div style="padding: 10px 0 15px 0;font-size: 12px;">' +
				'					<strong>비밀글로 보호된 글입니다.</strong><br>' +
				'					작성자와 관리자만 열람하실 수 있습니다. 비밀번호를 입력하세요.' +
				' 				</div>' +
				'				<table class="table table-bordered mb-0">' +
				'					<colgroup>' +
				'						<col width="15%">' +
				'						<col width="35%">' +
				'					</colgroup>' +
				'					<tbody>' +
				'						<tr>' +
				'							<th class="text-center th-color">비밀번호</th>' +
				'							<td>' +
				'								<input type="password" id="articlePublicPassWord" name="articlePublicPassWord" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" style="width: 80%">' +
				'								<div style="float: right">' +
				'									<button type=\'button\' class=\'k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\' onclick="normalArticleList.articlePublicNPassWordChk()">' +
				'										<span class=\'k-icon k-i-check k-button-icon\'></span>' +
				'										<span class=\'k-button-text\'>확인</span>' +
				'									</button>' +
				'								</div>' +
				'							</td>' +
				'						</tr>' +
				'					</tbody>' +
				'				</table>' +
				'			</div>');

			normalArticleList.global.pasChkModal.kendoWindow({
				title: "게시글 상세보기",
				visible: false,
				modal: true,
				width : 530,
				close: function () {
					normalArticleList.global.pasChkModal.remove();
				}
			}).data("kendoWindow").center();

			normalArticleList.global.pasChkModal.data("kendoWindow").open();
			normalArticleList.global.articleSelIndex = i;
		}else{
			open_in_frame('/board/normalBoardDetail.do?boardArticleId='+ boardArticleId + '&boardId=' + boardId + '&' + new URLSearchParams(queryParams).toString());
		}
	},

	writePageMove : function(){
		const queryParams = {
			page: normalArticleList.global.nowPage == "" ? 1 : normalArticleList.global.nowPage,
			searchCategory : $("#searchCategory").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		open_in_frame('/board/normalBoardWrite.do?boardId=' + $("#boardId").val() + '&' + new URLSearchParams(queryParams).toString());
	},

	articlePublicNPassWordChk : function(){
		var boardId = $("#boardId").val();

		if($("#articlePublicPassWord").val() == normalArticleList.global.articleList[normalArticleList.global.articleSelIndex].PRIVATE_PASS_WORD){
			normalArticleList.global.pasChkModal.data("kendoWindow").close();

			open_in_frame('/board/normalBoardDetail.do?boardArticleId='+ normalArticleList.global.articleList[normalArticleList.global.articleSelIndex].BOARD_ARTICLE_ID + '&boardId=' + boardId);
		}else{
			alert("비밀번호가 일치하지 않습니다.");
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

            html += "<tr>";
            html += "	<td class='ta-center'>" + (i) + "</td>";
            html += "	<td style='cursor:pointer'>";
            if(row.public_YN == "N"){
                html += "		<span class='k-icon k-i-lock k-button-icon'></span>";
            }
            html += '		<a class="contentLink" href="javascript:normalArticleList.detailPageMove(' + row.board_ARTICLE_ID + ',\'' + row.public_YN + '\',\'' + i + '\')">' + articleTitle + "</a>";
            html += "	</td>";
            html += "	<td class='ta-center'>";
            if(row.file_YN == "Y"){
                html += "		<span class='k-icon k-i-paperclip k-button-icon'></span>";
            }
            html += "	</td>";
            html += "	<td class='ta-center'>" + row.reg_EMP_NAME + "</td>";
            html += "	<td class='ta-center'>" + dt + "</td>";
            html += "	<td class='ta-center'>" + row.board_ARTICLE_VIEW_COUNT + "</td>";
            html += "</tr>";

			i--;
        });

        $("#articleListTb tbody").append(html);

    },

    drawPage : function(pagination, params){
        if ( !pagination || !params ) {
            document.querySelector('.paging').innerHTML = '';
            throw new Error('Missing required parameters...');
        }

        let html = '';
		html += '<div style="display:flex;justify-content: center; ">';
        html += '<span><a href="javascript:void(0);" onclick="normalArticleList.movePage(' + (params.page - 1) + ')" class="page_bt prev">&laquo;</a></span>';

        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            html += (i !== params.page)
                ? '<span><a href="javascript:void(0);" onclick="normalArticleList.movePage('+i+');">'+ i +'</a></span>'
                : '<span><a href="#" class="active">' + i + '</a></span>'
        }

        html += '<span><a href="javascript:void(0);" onclick="normalArticleList.movePage(' + (params.page + 1) + ');" className="page_bt next">&raquo;</a></span>';
		html += '</div>';
        $(".pagination").html(html);
    },

    movePage : function (page){
		normalArticleList.global.nowPage = page;
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 10,
            pageSize: 10
        }

        normalArticleList.mainGrid("/board/getCamsBoardArticleList.do?" + new URLSearchParams(queryParams).toString(), normalArticleList.global.searchAjaxData);
    }
}