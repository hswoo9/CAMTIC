var wbd = {
	global : {
		params : "",
		searchAjaxData : "",
		saveAjaxData : "",
		fileUploaded : "",
		articleDetailInfo : "",
		articleReplyList : "",
	},

	fnDefaultScript : function(){
		wbd.global.searchAjaxData = {
			watchBoardId : $("#watchBoardId").val()
		}

		var result = customKendo.fn_customAjax("/spot/getWatchBoard.do", wbd.global.searchAjaxData);
		if(result.flag){
			wbd.global.articleDetailInfo = result.rs;
			if($("#empSeq").val() == wbd.global.articleDetailInfo.REG_EMP_SEQ){
				$("#articleDelBtn").show();
				$("#articleModBtn").show();
			}else if(isAdmin){
				$("#articleDelBtn").show();
			}

			var boardArticleTitle = "";
			if(wbd.global.articleDetailInfo.BOARD_ARTICLE_TITLE != null && wbd.global.articleDetailInfo.BOARD_ARTICLE_TITLE != ""){
				boardArticleTitle = wbd.global.articleDetailInfo.BOARD_ARTICLE_TITLE;
			}else{
				boardArticleTitle = "제목없음";
			}

			$("#boardArticleTitle").html(boardArticleTitle);
			$("#boardArticleContent").html(wbd.global.articleDetailInfo.BOARD_ARTICLE_CONTENT);
			$("#boardArticleRegName").html(wbd.global.articleDetailInfo.REG_EMP_NAME);
			$("#boardArticleRegDate").html(wbd.global.articleDetailInfo.REG_DATE);
			$("#boardArticleViewCount").html(wbd.global.articleDetailInfo.BOARD_ARTICLE_VIEW_COUNT);
		}

		wbd.getArticleReplyGrid()
	},

	getArticleReplyGrid : function(){
		wbd.global.searchAjaxData = {
			boardArticleId : "wb_"+ $("#watchBoardId").val()
		}

		var result = customKendo.fn_customAjax("/board/getArticleReplyList.do", wbd.global.searchAjaxData);
		if(result.flag){
			wbd.addArticleReplyRow(result.rs);
		}
	},

	addArticleReplyRow : function(rs){
		wbd.global.articleReplyList = rs;

		var articleReplyTr = "";

		for(var i = 0; i < rs.length; i++){
			var replyDivClass = "";
			var replyContentClass= "";

			if(rs[i].ARTICLE_REPLY_LEVEL > 0){
				replyDivClass = "class='reply_row'";
				replyContentClass = "class='replyPadding'";
			}

			articleReplyTr += "<tr>";
			articleReplyTr += "	<td class=\"text-center\">";
			articleReplyTr += "		<div " + replyDivClass + ">";
			articleReplyTr += "			<input type='hidden' id='articleReplyId' name='articleReplyId' value='" + rs[i].ARTICLE_REPLY_ID + "'>";
			articleReplyTr += "			<input type='hidden' id='articleReplyGroup' name='articleReplyGroup' value='" + rs[i].ARTICLE_REPLY_GROUP + "'>";
			articleReplyTr += 			rs[i].EMP_NAME_KR;
			articleReplyTr += "		</div>";
			articleReplyTr += "	</td>"
			articleReplyTr += "	<td id='articleReplyContentTd' " + replyContentClass + ">";
			articleReplyTr += 		rs[i].ARTICLE_REPLY_CONTENT;
			articleReplyTr += "	</td>"
			if($("#empSeq").val() == rs[i].REG_EMP_SEQ){
				articleReplyTr += "	<td class=\"text-right\" colspan='2'>";
				articleReplyTr += 		rs[i].REG_DATE;
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModSaveBtn' onclick=\"wbd.setArticleReply(this)\" style='margin-left: 15px;display: none'>";
				articleReplyTr += "			<span class=\"k-button-text\">등록</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModBtn' onclick=\"wbd.setArticleReplyMod(this)\" style='margin-left: 15px'>";
				articleReplyTr += "			<span class=\"k-button-text\">수정</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyDelBtn' onclick=\"wbd.setArticleReplyDel(this)\">";
				articleReplyTr += "			<span class=\"k-button-text\">삭제</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "	</td>";
			}else{
				articleReplyTr += "	<td class=\"text-right\" colspan='2'>";
				articleReplyTr += 		rs[i].REG_DATE;
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"wbd.setArticleReReply(this)\" style='margin-left: 15px'>";
				articleReplyTr += "			<span class=\"k-button-text\">답글</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "	</td>";
			}
			articleReplyTr += "</tr>";
		}
		$("#articleReplyTbody tr:not(:eq(0))").remove();
		$("#articleReplyTbody").append(articleReplyTr);
	},

	setArticleReplyMod : function(e){
		$(e).hide();
		$(e).closest("tr").find("#replyModSaveBtn").show();
		var rs = wbd.global.articleReplyList.filter(element => element.ARTICLE_REPLY_ID == $(e).closest("tr").find("#articleReplyId").val())
		var input = "<input type='text' id='articleReplyContent' name='articleReplyContent' class='k-input k-textbox k-input-solid k-input-md k-rounded-md' value='" + rs[0].ARTICLE_REPLY_CONTENT +"'>";
		$(e).closest("tr").find("#articleReplyContentTd").html(input);
	},

	setArticleReReply : function(e){
		var articleReReplyTr = "";
		var articleReplyOriginId = $(e).closest("tr").find("#articleReplyId").val();
		var articleReplyGroup = $(e).closest("tr").find("#articleReplyGroup").val();

		articleReReplyTr += "<tr id='reReplyTr' class='reReplyTr'>";
		articleReReplyTr += "	<td class=\"text-center\">";
		articleReReplyTr += "		<input type='hidden' id='articleReplyId' name='articleReplyId'>";
		articleReReplyTr += "		<input type=\"hidden\" id=\"articleReplyOriginId\" name=\"articleReplyOriginId\" value='" + articleReplyOriginId + "'>";
		articleReReplyTr += "		<input type=\"hidden\" id=\"articleReplyGroup\" name=\"articleReplyGroup\" value='" + articleReplyGroup + "'>";
		articleReReplyTr += "		<div class=\"reply_row\" style='margin-left: 25px;padding-left: 5px !important;background: url(/images/ico/ico_reply01.png) no-repeat 8px 2px;'>";
		articleReReplyTr += 			$("#empName").val();
		articleReReplyTr += "		</div>"
		articleReReplyTr += "	</td>";
		articleReReplyTr += "	<td id='articleReplyContentTd' colspan='3' class='replyPadding' style=''>";
		articleReReplyTr += "		<input type='text' id='articleReplyContent' name='articleReplyContent' class='k-input k-textbox k-input-solid k-input-md k-rounded-md' style='width: 95%'>";
		articleReReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModSaveBtn' onclick=\"wbd.setArticleReply(this)\" style='margin-left: 11.6px;'>";
		articleReReplyTr += "			<span class=\"k-button-text\">등록</span>";
		articleReReplyTr += "		</button>";
		articleReReplyTr += "	</td>"
		articleReReplyTr += "</tr>";

		$(e).closest("tr").after(articleReReplyTr);
	},

	setArticleReply : function(e){
		var articleReplyLevel = 0;
		var articleReplyStep = 0;

		wbd.global.saveAjaxData = {
			articleReplyId : $(e).closest("tr").find("#articleReplyId").val(),
			boardArticleId : "wb_" + $("#watchBoardId").val(),
			articleReplyContent : $(e).closest("tr").find("#articleReplyContent").val(),
			articleReplyOriginId : $(e).closest("tr").find("#articleReplyOriginId").val(),
			articleReplyGroup : $(e).closest("tr").find("#articleReplyGroup").val(),
			articleReplyStep : articleReplyStep,
			articleReplyLevel : articleReplyLevel,
			articleReplyPublicYn : "Y",
			empSeq : $("#empSeq").val()
		}

		if(wbd.global.saveAjaxData.articleReplyPublicYn == "N"){
			wbd.global.saveAjaxData.privatePassWord = $("#privatePassWord").val();
		}

		var result = customKendo.fn_customAjax("/board/setArticleReply.do", wbd.global.saveAjaxData);

		if(result.flag){
			wbd.getArticleReplyGrid();
		}
	},

	setArticleReplyDel : function(e){
		if(confirm("댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구가 할 수 없습니다.")){
			wbd.global.saveAjaxData = {
				articleReplyId : $(e).closest("tr").find("#articleReplyId").val(),
				empSeq : $("#empSeq").val()
			}

			var result = customKendo.fn_customAjax("/board/setArticleReplyActiveUpd.do", wbd.global.saveAjaxData);
			if(result.flag){
				$(e).closest("tr").remove();
			}
		}
	},
	
	setArticleDel : function(){
		if(confirm("게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구할 수 없습니다.")){
			wbd.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				watchBoardId : $("#watchBoardId").val()
			}

			var result = customKendo.fn_customAjax("/spot/setWatchBoardDel.do", wbd.global.saveAjaxData);

			if(result.flag){
				alert("게시글이 삭제되었습니다.");
				open_in_frame('/spot/watchBoardList.do');
			}else{
				alert("게시글 삭제중 오류가 발생했습니다.");
			}

		}
	},

	setArticleMod : function(){
		open_in_frame('/spot/watchBoardReg.do?watchBoardId=' + $("#watchBoardId").val() + '&requestType=' + $("#requestType").val());
	},

	listPageMove : function(){
		var url = "/spot/watchBoardList.do?page=" + $("#page").val();
		open_in_frame(url);
	},
}