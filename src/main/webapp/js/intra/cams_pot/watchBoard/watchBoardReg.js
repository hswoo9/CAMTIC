var wbr = {
	global : {
		params : "",
		dropDownDataSource : "",
		searchAjaxData : "",
		saveAjaxData : "",
		fileUploaded : new Array(),
		fileInitData : "",
		fileUploadFlag : false,
	},

	fnDefaultScript : function(params){
		wbr.global.params = params;
		$("#page").val(wbr.global.params.page);

		customKendo.fn_textBox(["boardArticleTitle"]);
		CKEDITOR.replace('boardArticleContent', {

		});

		if(wbr.global.params.watchBoardId != null){
			$("#watchBoardId").val(wbr.global.params.watchBoardId);

			wbr.global.searchAjaxData = {
				watchBoardId : wbr.global.params.watchBoardId
			}

			var result = customKendo.fn_customAjax("/spot/getWatchBoard.do", wbr.global.searchAjaxData);
			if(result.flag){
				$("#boardArticleTitle").val(result.rs.BOARD_ARTICLE_TITLE);
				CKEDITOR.instances.boardArticleContent.setData(result.rs.BOARD_ARTICLE_CONTENT);

				if(result.rs.FILE_NO != null){
					$("#file1Sn").val(result.rs.FILE_NO);
					$("#file1Name").text(result.rs.FILE_ORG_NAME + "." + result.rs.FILE_EXT);
				}
			}
		}
	},

	setRequestBoard : function(){
		var content = CKEDITOR.instances.boardArticleContent.getData();
		if(!$("#boardArticleTitle").val()){
			alert("제목을 입력해주세요.");
			return;
		}else if(content == null || content == ""){
			alert("내용을 입력해주세요");
			return;
		}

		if(confirm("등록하시겠습니까?")){
			var formData = new FormData()
			formData.append("watchBoardId", $("#watchBoardId").val());
			formData.append("menuCd", "watchBoard");
			formData.append("boardArticleTitle", $("#boardArticleTitle").val());
			formData.append("boardArticleContent", content);
			formData.append("empSeq", $("#regEmpSeq").val());

			if($("#file1")[0].files.length == 1){
				formData.append("file1", $("#file1")[0].files[0]);
			}

			var result = customKendo.fn_customFormDataAjax("/spot/setWatchBoard.do", formData);

			if(result.flag){
				alert("게시글이 등록되었습니다.");
				wbr.listPageMove();
			}else{
				alert("게시글 등록 중 오류가 발생했습니다.");
			}
		}
	},

	listPageMove : function(){
		var url = "/spot/watchBoardList.do?page=" + $("#page").val();
		open_in_frame(url);
	},

	fileChange : function(e){
		var file = $(e)[0].files[0];
		var fileExt = file.name.split(".")[file.name.split(".").length - 1];

		if($.inArray(fileExt, ['png', 'jpg', 'PNG']) == -1){
			alert("png, jpg 확장자만 업로드할 수 있습니다.");
			$(e).val("");
			return;
		}

		if($("#file1Sn").val()){
			if(confirm("기존 파일은 삭제됩니다. 진행하시겠습니까?")){
				var result = customKendo.fn_customAjax("/common/commonFileDel", {fileNo : $("#file1Sn").val()})
				if(result.flag){
					$(e).next().text($(e)[0].files[0].name);
				}
			}
		}else{
			$(e).next().text($(e)[0].files[0].name);
		}
	},
}