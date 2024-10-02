var rbd = {
	global : {
		params : "",
		searchAjaxData : "",
		saveAjaxData : "",
		fileUploaded : "",
		articleDetailInfo : "",
		articleReplyList : "",
	},

	fnDefaultScript : function(){
		rbd.global.searchAjaxData = {
			requestBoardId : $("#requestBoardId").val()
		}

		var result = customKendo.fn_customAjax("/spot/getRequestBoard.do", rbd.global.searchAjaxData);
		if(result.flag){
			console.log(result);
			rbd.global.articleDetailInfo = result.rs;
			if($("#empSeq").val() == rbd.global.articleDetailInfo.REG_EMP_SEQ){
				$("#articleDelBtn").show();
				$("#articleModBtn").show();
			}else if(isAdmin){
				$("#articleDelBtn").show();
				$("#returnBtn").show();

				if(rbd.global.articleDetailInfo.STATUS == "1"){
					$("#processAccBtn").show();
				}else if(rbd.global.articleDetailInfo.STATUS == "2"){
					$("#processComBtn").show();
					$("#cancelBtn").show();
				}else if(rbd.global.articleDetailInfo.STATUS == "-1" || rbd.global.articleDetailInfo.STATUS == "99"){
					$("#returnBtn").hide();
				}
			}

			let authorList = customKendo.fn_customAjax("/system/getAuthorityGroupUserList.do", {authorityGroupId : "1"}).rs;
			for(let i=0; i<authorList.length; i++){
				const map = authorList[i];
				if(map.EMP_SEQ == $("#empSeq").val()){
					$("#articleDelBtn").show();
					$("#returnBtn").show();
					$("#advancementBtn").show();
					$("#FixesBtn").show();
					if(rbd.global.articleDetailInfo.STATUS == "1"){
						$("#processAccBtn").show();
					}else if(rbd.global.articleDetailInfo.STATUS == "2"){
						$("#processComBtn").show();
						$("#cancelBtn").show();
					}else if(rbd.global.articleDetailInfo.STATUS == "-1" || rbd.global.articleDetailInfo.STATUS == "99"){
						$("#returnBtn").hide();
					}
				}
			}

			var requestTitle = "";
			if(rbd.global.articleDetailInfo.REQUEST_TITLE != null && rbd.global.articleDetailInfo.REQUEST_TITLE != ""){
				requestTitle = rbd.global.articleDetailInfo.REQUEST_TITLE;
			}else{
				requestTitle = "제목없음";
			}

			$("#requestTitle").html(requestTitle);
			$("#requestContent").html(rbd.global.articleDetailInfo.REQUEST_CONTENT);
			$("#status").html(rbd.global.articleDetailInfo.STATUS_TXT);
			$("#deadlineDate").html(rbd.global.articleDetailInfo.DEADLINE_DATE);

			$("#reqEmpName").html(rbd.global.articleDetailInfo.REG_EMP_NAME);
			$("#regOfficeTelNum").html(rbd.global.articleDetailInfo.REG_OFFICE_TEL_NUM);
			$("#afStatus").html(rbd.global.articleDetailInfo.AF_STATUS_TXT);
			if(rbd.global.articleDetailInfo.largeMenu != null && rbd.global.articleDetailInfo.smallMenu != ""){
				$("#menuName").html(rbd.global.articleDetailInfo.largeMenu + ' - ' + rbd.global.articleDetailInfo.smallMenu);
			}else{
				$("#menuName").html('');
			}


			let html = '';
			for(let i=0; i < result.fileInfo.length; i++){
				const info = result.fileInfo[i];
				console.log(info);
				html += '   <p style="cursor: pointer; margin-bottom: 0px" onclick="fileDown(\''+info.file_path + info.file_uuid+'\', \''+info.file_org_name+'.'+info.file_ext+'\')">'+info.file_org_name+"."+info.file_ext+'</p>';
			}
			$("#fileHtml").html(html);
		}

		rbd.getArticleReplyGrid()
	},

	setArticleDel : function(){
		if(confirm("게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구할 수 없습니다.")){
			rbd.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				requestBoardId : $("#requestBoardId").val()
			}

			var result = customKendo.fn_customAjax("/spot/setRequestBoardDel.do", rbd.global.saveAjaxData);

			if(result.flag){
				alert("게시글이 삭제되었습니다.");
				open_in_frame('/spot/requestBoardList.do?requestType=' + $("#requestType").val());
			}else{
				alert("게시글 삭제중 오류가 발생했습니다.");
			}

		}
	},

	setRequestBoardStatusUpd : function(e){
		if(confirm($(e).find("span").text() + "하시겠습니까?")){
			rbd.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				status : $(e).val(),
				requestBoardId : $("#requestBoardId").val()
			}

			var result = customKendo.fn_customAjax("/spot/setRequestBoardStatusUpd.do", rbd.global.saveAjaxData);

			if(result.flag) {
				alert("처리되었습니다.");
				rbd.fnDefaultScript();

				// 접수처리, 처리완료, 반려시 알람
				if($(e).val() == "2" || $(e).val() == "3" || $(e).val() == "99"){
					var sendData = {
						ntTitle : "[" + $(e).find("span").text() + "] 전산보완요청",
						ntContent : "[" + $(e).find("span").text() + "] " + rbd.global.articleDetailInfo.REQUEST_TITLE,
						recEmpSeq : rbd.global.articleDetailInfo.REG_EMP_SEQ,
						ntUrl : "/spot/requestBoardDetail.do?requestBoardId=" + rbd.global.articleDetailInfo.REQUEST_BOARD_ID + "&requestType=R&page=1" + "&startDt=" + $("#startDt").val() + "&endDt=" + $("#endDt").val()
					}

					var sendResult = customKendo.fn_customAjax("/common/setAlarm", sendData);
					if(sendResult.flag){
						socket.send(sendData.ntTitle + "," + sendData.recEmpSeq + "," + sendData.ntContent + "," + sendData.ntUrl + "," + sendResult.alId);
					}
				}
			}
		}
	},

	setRequestBoardAdvancementFixesUpd : function(e){
		if(confirm($(e).find("span").text() + "하시겠습니까?")){
			rbd.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				status : $(e).val(),
				requestBoardId : $("#requestBoardId").val()
			}

			var result = customKendo.fn_customAjax("/spot/setRequestBoardAdvancementFixesUpd", rbd.global.saveAjaxData);

			if(result.flag) {
				alert("처리되었습니다.");
				rbd.fnDefaultScript();
			}
		}
	},

	setArticleMod : function(){
		open_in_frame('/spot/requestBoardReg.do?requestBoardId=' + $("#requestBoardId").val() + '&requestType=' + $("#requestType").val() + "&page=" + $("#page").val() + "&status=" + $("#searchStatus").val() + "&startDt=" + $("#startDt").val()
			+ "&endDt=" + $("#endDt").val() + "&empName=" + $("#searchEmpName").val() + "&searchColumn=" + $("#searchColumn").val() + "&searchContent=" + $("#searchContent").val());
	},

	listPageMove : function(){
		var url = '/spot/requestBoardList.do?requestType=' + $("#requestType").val() + "&page=" + $("#page").val() + "&status=" + $("#searchStatus").val() + "&startDt=" + $("#startDt").val()
			+ "&endDt=" + $("#endDt").val() + "&empName=" + $("#searchEmpName").val() + "&searchColumn=" + $("#searchColumn").val() + "&searchContent=" + $("#searchContent").val();

		open_in_frame(url);
	},

	getArticleReplyGrid : function(){
		rbd.global.searchAjaxData = {
			requestBoardId : "request_" + $("#requestBoardId").val()
		}

		var result = customKendo.fn_customAjax("/board/getArticleReplyList.do", rbd.global.searchAjaxData);
		if(result.flag){
			rbd.addArticleReplyRow(result.rs);
		}
	},

	addArticleReplyRow : function(rs){
		rbd.global.articleReplyList = rs;

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
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModSaveBtn' onclick=\"rbd.setArticleReply(this)\" style='margin-left: 15px;display: none'>";
				articleReplyTr += "			<span class=\"k-button-text\">등록</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModBtn' onclick=\"rbd.setArticleReplyMod(this)\" style='margin-left: 15px'>";
				articleReplyTr += "			<span class=\"k-button-text\">수정</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyDelBtn' onclick=\"rbd.setArticleReplyDel(this)\">";
				articleReplyTr += "			<span class=\"k-button-text\">삭제</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "	</td>";
			}else{
				articleReplyTr += "	<td class=\"text-right\" colspan='2'>";
				articleReplyTr += 		rs[i].REG_DATE;
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"rbd.setArticleReReply(this)\" style='margin-left: 15px'>";
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
		var rs = rbd.global.articleReplyList.filter(element => element.ARTICLE_REPLY_ID == $(e).closest("tr").find("#articleReplyId").val())
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
		articleReReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModSaveBtn' onclick=\"rbd.setArticleReply(this)\" style='margin-left: 11.6px;'>";
		articleReReplyTr += "			<span class=\"k-button-text\">등록</span>";
		articleReReplyTr += "		</button>";
		articleReReplyTr += "	</td>"
		articleReReplyTr += "</tr>";

		$(e).closest("tr").after(articleReReplyTr);
	},

	setArticleReply : function(e){
		var articleReplyLevel = 0;
		var articleReplyStep = 0;

		rbd.global.saveAjaxData = {
			articleReplyId : $(e).closest("tr").find("#articleReplyId").val(),
			boardArticleId : "request_" + $("#requestBoardId").val(),
			articleReplyContent : $(e).closest("tr").find("#articleReplyContent").val(),
			articleReplyOriginId : $(e).closest("tr").find("#articleReplyOriginId").val(),
			articleReplyGroup : $(e).closest("tr").find("#articleReplyGroup").val(),
			articleReplyStep : articleReplyStep,
			articleReplyLevel : articleReplyLevel,
			articleReplyPublicYn : "Y",
			empSeq : $("#empSeq").val()
		}

		if(rbd.global.saveAjaxData.articleReplyPublicYn == "N"){
			rbd.global.saveAjaxData.privatePassWord = $("#privatePassWord").val();
		}

		var result = customKendo.fn_customAjax("/board/setArticleReply.do", rbd.global.saveAjaxData);

		if(result.flag){
			rbd.getArticleReplyGrid();
			$("#articleReplyContent").val("");
		}
	},

	setArticleReplyDel : function(e){
		if(confirm("댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구가 할 수 없습니다.")){
			rbd.global.saveAjaxData = {
				articleReplyId : $(e).closest("tr").find("#articleReplyId").val(),
				empSeq : $("#empSeq").val()
			}

			var result = customKendo.fn_customAjax("/board/setArticleReplyActiveUpd.do", rbd.global.saveAjaxData);
			if(result.flag){
				$(e).closest("tr").remove();
			}
		}
	}
}

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}