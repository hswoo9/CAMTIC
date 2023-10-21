var ssd = {
	global : {
		params : "",
		searchAjaxData : "",
		saveAjaxData : "",
		fileUploaded : "",
		articleDetailInfo : "",
		articleReplyList : "",
	},

	fnDefaultScript : function(){
		ssd.global.searchAjaxData = {
			suggestionBoardId : $("#suggestionBoardId").val()
		}

		var result = customKendo.fn_customAjax("/spot/getSuggestionSystem.do", ssd.global.searchAjaxData);
		if(result.flag){
			ssd.global.articleDetailInfo = result.rs;

			if($("#empSeq").val() == ssd.global.articleDetailInfo.REG_EMP_SEQ){
				$("#articleDelBtn").show();
				$("#articleModBtn").show();
			}else if(isAdmin){
				$("#articleDelBtn").show();
			}

			var suggestionTitle = "";
			if(ssd.global.articleDetailInfo.SUGGESTION_TITLE != null && ssd.global.articleDetailInfo.SUGGESTION_TITLE != ""){
				suggestionTitle = ssd.global.articleDetailInfo.SUGGESTION_TITLE;
			}else{
				suggestionTitle = "제목없음";
			}

			$("#suggestionNo").html(ssd.global.articleDetailInfo.SUGGESTION_NO);
			$("#suggestionDate").html(ssd.global.articleDetailInfo.SUGGESTION_DATE);
			$("#suggestionType").html(ssd.global.articleDetailInfo.SUGGESTION_TYPE_TXT);
			$("#regName").html(ssd.global.articleDetailInfo.REG_EMP_NAME);
			$("#status").html(ssd.global.articleDetailInfo.STATUS);
			$("#suggestionTitle").html(suggestionTitle);

			$("#suggestionContent1").html(ssd.global.articleDetailInfo.SUGGESTION_CONTENT1);
			$("#suggestionContent2").html(ssd.global.articleDetailInfo.SUGGESTION_CONTENT2);
			$("#suggestionContent3").html(ssd.global.articleDetailInfo.SUGGESTION_CONTENT3);
		}

		$("#attachmentGrid").kendoGrid({
			dataSource : ssd.global.articleDetailInfo.fileList,
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
						return e.file_org_name + "." + e.file_ext + "(" + formatBytes(e.file_size, 3) + ")";
					}
				}]
		}).data("kendoGrid");
	},

	boardAttachmentDown : function(){
		kendo.saveAs({
			dataURI: "/common/multiFileDownload.do?type=board&boardArticleId=" + $("#boardArticleId").val()+ "&zipName=" + ssd.global.articleDetailInfo.SUGGESTION_TITLE
		});
	},

	setArticleDel : function(){
		if(confirm("게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구할 수 없습니다.")){
			ssd.global.saveAjaxData = {
				empSeq : $("#empSeq").val(),
				suggestionBoardId : $("#suggestionBoardId").val()
			}

			var result = customKendo.fn_customAjax("/spot/setSuggestionSystemDel.do", ssd.global.saveAjaxData);

			if(result.flag){
				alert("게시글이 삭제되었습니다.");

				open_in_frame('/spot/suggestionSystemList.do');
			}else{
				alert("게시글 삭제중 오류가 발생했습니다.");
			}

		}
	},

	setArticleMod : function(){
		open_in_frame('/spot/suggestionSystemReg.do?suggestionBoardId=' + $("#suggestionBoardId").val());
	},

	listPageMove : function(){
		open_in_frame('/spot/suggestionSystemList.do');
	},
}

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}