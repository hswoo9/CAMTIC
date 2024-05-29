var normalArticleDetail = {
	global : {
		params : "",
		searchAjaxData : "",
		saveAjaxData : "",
		fileUploaded : "",
		articleDetailInfo : "",
		articleReplyList : "",
	},

	fnDefaultScript : function(){
		normalArticleDetail.global.searchAjaxData = {
			boardId : $("#boardId").val(),
			boardArticleId : $("#boardArticleId").val()
		}

		var result = customKendo.fn_customAjax("/board/getArticleInfo.do", normalArticleDetail.global.searchAjaxData);
		if(result.flag){
			normalArticleDetail.global.articleDetailInfo = result.rs;

			$(".card-title").text($("a[onclick=\"open_in_frame('/board/normalBoardList.do?boardId=" + normalArticleDetail.global.articleDetailInfo.BOARD_ID + "')\"]").attr("menuNameKr"));
			$(".title-road").text($("a[onclick=\"open_in_frame('/board/normalBoardList.do?boardId=" + normalArticleDetail.global.articleDetailInfo.BOARD_ID + "')\"]").attr("menuNamePath"));

			if(normalArticleDetail.global.articleDetailInfo.REPLY_ACTIVE == "Y"){
				$("#replyDiv").show();
			}

			if($("#empSeq").val() == normalArticleDetail.global.articleDetailInfo.REG_EMP_SEQ){
				$("#articleDelBtn").show();
				$("#articleModBtn").show();
			}else if(isAdmin){
				$("#articleDelBtn").show();
				$("#articleModBtn").show();
			}

			var boardTitle = "";
			if(normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_CONCAT_TITLE != null && normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_CONCAT_TITLE != ""){
				boardTitle = normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_CONCAT_TITLE;
			}else{
				boardTitle = "제목없음";
			}

			$("#articleTitleTd").html(boardTitle);
			$("#articleRegEmpNameTd").text(normalArticleDetail.global.articleDetailInfo.REG_EMP_NAME);
			$("#articleRegDateTd").text(normalArticleDetail.global.articleDetailInfo.REG_DATE);

            var contents = "";
			if(normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_CONTENT != null){
            	contents = normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_CONTENT.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&apos;", "'");
			}
			$("#articleContentDiv").html(contents);
		}

		$("#attachmentGrid").kendoGrid({
			dataSource : customKendo.fn_gridDataSource2("/board/getArticleFileList.do", normalArticleDetail.global.searchAjaxData),
			sortable: true,
			scrollable: true,
			noRecords: {
				template: "첨부파일이 존재하지 않습니다."
			},
			columns: [
				{
					field : "FILE_ORG_NAME",
					title: "첨부파일명",
					attributes: { style: "text-align: left" },
					template : function(e){
						var fileName = e.FILE_ORG_NAME;
						var filePath = e.FILE_PATH;

						var fileNameText = "";
						if(filePath.indexOf('camticOldFile') !== 1){
							fileNameText = fileName + '.' + e.FILE_EXT;
						}else{
							fileNameText = fileName;
						}

						return '<a style="cursor: pointer;" onclick="normalArticleDetail.fileDownOne(\'' + e.FILE_PATH + e.FILE_UUID + '\', \'' + fileNameText + '\')">'+ fileNameText + '(' + formatBytes(e.FILE_SIZE, 3) + ')</a>';


					}
				}]
		}).data("kendoGrid");

		$("#checkAll").click(function(){
			if($(this).is(":checked")) $("input[name=filePk]").prop("checked", true);
			else $("input[name=filePk]").prop("checked", false);
		});

		customKendo.fn_textBox(["articleReplyContent"]);

		normalArticleDetail.getArticleReplyGrid();

		var tables = document.querySelectorAll("#articleContentDiv table tr table[bgcolor='#afafaf']");
		tables.forEach(function(table) {
			var rows = table.querySelectorAll("td");
			rows.forEach(function(row) {
				row.style.border = "1px solid #afafaf";
			});
		});
	},

	boardAttachmentDown : function(){
		kendo.saveAs({
			dataURI: "/common/multiFileDownload.do?type=board&boardArticleId=" + $("#boardArticleId").val()+ "&zipName=" + normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_TITLE
		});
	},

	fileDownOne : function(filePath, fileName) {
		kendo.saveAs({
			dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + fileName,
		});
	},

	setArticleDel : function(){
		if(confirm("게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구할 수 없습니다.")){
			normalArticleDetail.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				boardArticleId : $("#boardArticleId").val()
			}
			var result = customKendo.fn_customAjax("/board/setArticleDel.do", normalArticleDetail.global.saveAjaxData);

			if(result.flag){
				alert("게시글이 삭제되었습니다.");

				open_in_frame('/board/normalBoardList.do?boardId=' + normalArticleDetail.global.articleDetailInfo.BOARD_ID);
			}else{
				alert("게시글 삭제중 오류가 발생했습니다.");
			}

		}
	},

	setArticleMod : function(){
		open_in_frame('/board/normalBoardWrite.do?boardId=' + normalArticleDetail.global.articleDetailInfo.BOARD_ID + "&boardArticleId="+ normalArticleDetail.global.articleDetailInfo.BOARD_ARTICLE_ID);
	},

	listPageMove : function(){
		var url = '/board/normalBoardList.do?boardId='+ normalArticleDetail.global.articleDetailInfo.BOARD_ID;

		if($("#page").val() != ""){
			url += "&page=" + $("#page").val() + "&searchColumn=" + $("#searchColumn").val() + "&searchContent=" + $("#searchContent").val() + "&searchCategory=" + $("#searchCategory").val();
		}

		open_in_frame(url);
	},

	getArticleReplyGrid : function(){
		normalArticleDetail.global.searchAjaxData = {
			boardArticleId : $("#boardArticleId").val()
		}

		var result = customKendo.fn_customAjax("/board/getArticleReplyList.do", normalArticleDetail.global.searchAjaxData);
		if(result.flag){
			normalArticleDetail.addArticleReplyRow(result.rs);
		}
	},

	addArticleReplyRow : function(rs){
		normalArticleDetail.global.articleReplyList = rs;

		var articleReplyTr = "";

		for(var i = 0; i < rs.length; i++){
			/** 화면 깨짐 문제로 주석 */
			// var replyStyle = "";
			// var replyMarginPixel = 25;
			// var replyPaddingPixel = 5;
			//
			// var contentPaddingStyle = "";
			// var contentPaddingPixel = 25;

			// if(rs[i].ARTICLE_REPLY_ORIGIN_ID != null){
			// 	if(rs[i].ARTICLE_REPLY_GROUP == rs[i-1].ARTICLE_REPLY_GROUP && rs[i].ARTICLE_REPLY_ORIGIN_ID == rs[i-1].ARTICLE_REPLY_ID){
			// 		replyMarginPixel += (10 * rs[i].ARTICLE_REPLY_LEVEL);
			// 		replyPaddingPixel += (10 * rs[i].ARTICLE_REPLY_LEVEL);
			// 		contentPaddingPixel += (10 * rs[i].ARTICLE_REPLY_LEVEL);
			// 	}
			// }

			var replyDivClass = "";
			var replyContentClass= "";

			if(rs[i].ARTICLE_REPLY_LEVEL > 0){
				replyDivClass = "class='reply_row'";
				replyContentClass = "class='replyPadding'";

				/** 화면 깨짐 문제로 주석 */
				// replyStyle = "style='margin-left: " + replyMarginPixel +"px;padding-left: " + replyPaddingPixel + "px !important;background: url(/images/ico/ico_reply01.png) no-repeat 8px 2px;'";
				// contentPaddingStyle = "style='padding-left:" + contentPaddingPixel + "px !important'";
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
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModSaveBtn' onclick=\"normalArticleDetail.setArticleReply(this)\" style='margin-left: 15px;display: none'>";
				articleReplyTr += "			<span class=\"k-button-text\">등록</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModBtn' onclick=\"normalArticleDetail.setArticleReplyMod(this)\" style='margin-left: 15px'>";
				articleReplyTr += "			<span class=\"k-button-text\">수정</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyDelBtn' onclick=\"normalArticleDetail.setArticleReplyDel(this)\">";
				articleReplyTr += "			<span class=\"k-button-text\">삭제</span>";
				articleReplyTr += "		</button>";
				articleReplyTr += "	</td>";
			}else{
				articleReplyTr += "	<td class=\"text-right\" colspan='2'>";
				articleReplyTr += 		rs[i].REG_DATE;
				articleReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"normalArticleDetail.setArticleReReply(this)\" style='margin-left: 15px'>";
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
		var rs = normalArticleDetail.global.articleReplyList.filter(element => element.ARTICLE_REPLY_ID == $(e).closest("tr").find("#articleReplyId").val())
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
		articleReReplyTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id='replyModSaveBtn' onclick=\"normalArticleDetail.setArticleReply(this)\" style='margin-left: 11.6px;'>";
		articleReReplyTr += "			<span class=\"k-button-text\">등록</span>";
		articleReReplyTr += "		</button>";
		articleReReplyTr += "	</td>"
		articleReReplyTr += "</tr>";

		$(e).closest("tr").after(articleReReplyTr);
	},

	setArticleReply : function(e){
		var articleReplyLevel = 0;
		var articleReplyStep = 0;

		normalArticleDetail.global.saveAjaxData = {
			articleReplyId : $(e).closest("tr").find("#articleReplyId").val(),
			boardArticleId : $("#boardArticleId").val(),
			articleReplyContent : $(e).closest("tr").find("#articleReplyContent").val(),
			articleReplyOriginId : $(e).closest("tr").find("#articleReplyOriginId").val(),
			articleReplyGroup : $(e).closest("tr").find("#articleReplyGroup").val(),
			articleReplyStep : articleReplyStep,
			articleReplyLevel : articleReplyLevel,
			articleReplyPublicYn : "Y",
			empSeq : $("#empSeq").val()
		}

		if(normalArticleDetail.global.saveAjaxData.articleReplyPublicYn == "N"){
			normalArticleDetail.global.saveAjaxData.privatePassWord = $("#privatePassWord").val();
		}

		var result = customKendo.fn_customAjax("/board/setArticleReply.do", normalArticleDetail.global.saveAjaxData);

		if(result.flag){
			normalArticleDetail.getArticleReplyGrid();
		}
	},

	setArticleReplyDel : function(e){
		if(confirm("댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구가 할 수 없습니다.")){
			normalArticleDetail.global.saveAjaxData = {
				articleReplyId : $(e).closest("tr").find("#articleReplyId").val(),
				empSeq : $("#empSeq").val()
			}

			var result = customKendo.fn_customAjax("/board/setArticleReplyActiveUpd.do", normalArticleDetail.global.saveAjaxData);
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