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
		}
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
				location.reload()
			}
		}
	},

	setArticleMod : function(){
		open_in_frame('/spot/requestBoardReg.do?requestBoardId=' + $("#requestBoardId").val() + '&requestType=' + $("#requestType").val());
	},

	listPageMove : function(){
		open_in_frame('/spot/requestBoardList.do?requestType=' + $("#requestType").val());
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