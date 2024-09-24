var normalArticleWrite = {
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
		normalArticleWrite.global.params = params;
		$("#page").val(normalArticleWrite.global.params.page);
		$("#searchCategory").val(normalArticleWrite.global.params.status);
		$("#searchColumn").val(normalArticleWrite.global.params.searchColumn);
		$("#searchContent").val(normalArticleWrite.global.params.searchContent);

		$(".panel-title").text($("a[onclick=\"open_in_frame('/board/normalBoardList.do?boardId=" + normalArticleWrite.global.params.boardId + "')\"]").attr("menuNameKr"));
		$(".title-road").text($("a[onclick=\"open_in_frame('/board/normalBoardList.do?boardId=" + normalArticleWrite.global.params.boardId + "')\"]").attr("menuNamePath"));

		normalArticleWrite.global.searchAjaxData = {
			boardId : normalArticleWrite.global.params.boardId
		}

		var result = customKendo.fn_customAjax("/system/getBoardActive.do", normalArticleWrite.global.searchAjaxData);
		if(result.flag){
			if(result.rs.ATTACH_FILE_ACTIVE == "Y"){
				$("#fileTr").show();
			}

			if(result.rs.BOARD_CATEGORY_ACTIVE == "Y"){
				var category = customKendo.fn_customAjax("/system/getBoardCategoryList.do", normalArticleWrite.global.searchAjaxData);
				if(category.flag){
					normalArticleWrite.global.dropDownDataSource = category.rs;
					customKendo.fn_dropDownList("boardCategoryId", normalArticleWrite.global.dropDownDataSource, "BOARD_CATEGORY_NAME", "BOARD_CATEGORY_ID");
					$("#categoryTr").show();
				}
			}
		}

		normalArticleWrite.global.dropDownDataSource = [
			{ text: "일반", value: "1" },
			{ text: "공지", value: "2" },
		]

		customKendo.fn_dropDownList("titleDivision", normalArticleWrite.global.dropDownDataSource, "text", "value");

		$("#publicYn").kendoRadioGroup({
			items: [
				{label : "공개" , value : "Y"},
				{label : "비공개" , value : "N"}
			],
			layout : "horizontal",
			labelPosition : "after",
			value : "",
			change : function(){
				if(this.value() == "Y"){
					$("#privatePassWordTr").hide();
				}else{
					$("#privatePassWordTr").show();
				}
			}
		}).data("kendoRadioGroup");

		customKendo.fn_textBox(["boardArticleTitle", "empName", "privatePassWord", "fileName"]);

		CKEDITOR.replace('boardArticleContent', {

		});

		if(normalArticleWrite.global.params.boardArticleId != null){
			normalArticleWrite.global.searchAjaxData = {
				boardId : normalArticleWrite.global.params.boardId,
				boardArticleId : normalArticleWrite.global.params.boardArticleId
			}

			var result = customKendo.fn_customAjax("/board/getArticleInfo.do", normalArticleWrite.global.searchAjaxData);
			if(result.flag){
				if(result.rs.BOARD_CATEGORY_ACTIVE == "Y"){
					$("#boardCategoryId").data("kendoDropDownList").value(result.rs.BOARD_CATEGORY_ID);
				}
				$("#boardArticleId").val(result.rs.BOARD_ARTICLE_ID);
				$("#boardArticleTitle").val(result.rs.BOARD_ARTICLE_TITLE);
				$("#empSeq").val(result.rs.REG_EMP_SEQ);
				$("#empName").val(result.rs.REG_EMP_NAME);
				$("#publicYn").data("kendoRadioGroup").value(result.rs.PUBLIC_YN);
				if(result.rs.PUBLIC_YN == "N"){
					$("#publicYn").data("kendoRadioGroup").trigger("change");
					$("#privatePassWord").val(result.rs.PRIVATE_PASS_WORD);
				}
				CKEDITOR.instances.boardArticleContent.setData(result.rs.BOARD_ARTICLE_CONTENT);
				var fileResult = customKendo.fn_customAjax("/board/getArticleFileList.do", normalArticleWrite.global.searchAjaxData);
				if(fileResult.flag){
					normalArticleWrite.getArticleFileSet(fileResult.list);
				}
			}
		}

		normalArticleWrite.setKendoUpload();

		if(normalArticleWrite.global.params.boardId == "45") {
			$("#infoTxtDiv").show();
		} else {
			$("#infoTxtDiv").hide();
		}
	},

	getArticleFileSet : function (attachFile){
		if(attachFile.length > 0){
			for(var i = 0; i < attachFile.length; i++){
				var data = {
					fileNo : attachFile[i].FILE_NO,
					name: attachFile[i].FILE_ORG_NAME + "." + attachFile[i].FILE_EXT,
					size: attachFile[i].FILE_SIZE,
					extension: attachFile[i].FILE_EXT
				}
				normalArticleWrite.global.fileUploaded.push(data);
			}
		}
	},

	setKendoUpload : function(){
		$("#files").kendoUpload({
			async : {
				saveUrl : getContextPath() + "/board/setBoardAttachFileInit.do",
				removeUrl : getContextPath() + "/board/commonBoardFileDel",
				autoUpload : false
			},
			files : normalArticleWrite.global.fileUploaded,
			localization : {
				select : "파일업로드",
				dropFilesHere : ""
			},
			upload: this.onUpload,
			remove : normalArticleWrite.onRemove,
			success : this.onSuccess,
			complete : this.onComplete
		}).data("kendoUpload");
	},

	onUpload(e){
		e.data = normalArticleWrite.global.fileInitData;
	},

	onRemove : function(e){
		if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
			e.data = {
				fileNo : e.files[0].fileNo
			};
			return;
			customKendo.fn_customAjax("/board/commonBoardFileDel", e.data);
		}else{
			e.preventDefault();
		}
	},

	onSuccess : function(e){
		if(e.operation == "upload") {
			normalArticleWrite.global.fileUploadFlag = true;
		}else if(e.operation == "remove"){
			alert(e.XMLHttpRequest.responseJSON.rs.message);
		}
	},

	onComplete : function(){
		if(!normalArticleWrite.global.fileUploadFlag){
			alert("첨부파일 등록 중 에러가 발생했습니다.");
			return;
		}
	},

	setBoardArticle : function(){
		normalArticleWrite.global.saveAjaxData = {
			boardId : normalArticleWrite.global.params.boardId,
			boardCategoryId : $("#boardCategoryId").val(),
			boardArticleId : $("#boardArticleId").val(),
			boardArticleTitle : $("#boardArticleTitle").val(),
			boardArticleContent : CKEDITOR.instances.boardArticleContent.getData(),
			/*publicYn : $("#publicYn").data("kendoRadioGroup").value(),*/
			publicYn : "Y",
			empName : $("#empName").val(),
			empSeq : $("#empSeq").val(),
		}

		if(normalArticleWrite.global.saveAjaxData.publicYn == "N"){
			normalArticleWrite.global.saveAjaxData.privatePassWord = $("#privatePassWord").val();
		}

		var result = customKendo.fn_customAjax("/board/setBoardArticle.do", normalArticleWrite.global.saveAjaxData);

		if(result.flag){
			normalArticleWrite.global.fileInitData = result.params;

			if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
				$("#files").data("kendoUpload").upload();
			}

			alert("게시글이 등록되었습니다.");
			normalArticleWrite.listPageMove();
		}else{
			alert("게시글 등록 중 오류가 발생했습니다.");
		}
	},

	listPageMove : function(){
		var url = "/board/normalBoardList.do?boardId=" + normalArticleWrite.global.params.boardId + "&page=" + $("#page").val() + "&searchColumn=" + $("#searchColumn").val() + "&searchContent=" + $("#searchContent").val() + "&searchCategory=" + $("#searchCategory").val();

		open_in_frame(url);
	},
}