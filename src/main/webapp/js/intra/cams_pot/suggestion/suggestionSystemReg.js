var ssr = {
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
		ssr.global.params = params;

		ssr.global.dropDownDataSource = [
			{ text: "경영혁신", value: "CP04" },
			{ text: "업무/관리효율", value: "CP05" },
			{ text: "제품개선", value: "CP06" },
			{ text: "공정개선", value: "CP07" },
			{ text: "환경/청결", value: "CP08" },
			{ text: "직원단합", value: "CP09" },
			{ text: "사기진작", value: "CP10" },
			{ text: "사업아이템 제안", value: "CP11" },
			{ text: "단순건의", value: "CP99" },
		]
		customKendo.fn_dropDownList("suggestionType", ssr.global.dropDownDataSource, "text", "value", 2);

		customKendo.fn_textBox(["suggestionTitle", "fileName"]);
		$("#suggestionContent1, #suggestionContent2, #suggestionContent3").kendoTextArea({
			rows: 5,
		});

		if(ssr.global.params.suggestionBoardId != null){
			ssr.global.searchAjaxData = {
				suggestionBoardId : ssr.global.params.suggestionBoardId
			}

			var result = customKendo.fn_customAjax("/spot/getSuggestionSystem.do", ssr.global.searchAjaxData);
			if(result.flag){
				$("#suggestionBoardId").val(result.rs.SUGGESTION_BOARD_ID);
				$("#suggestionType").data("kendoDropDownList").value(result.rs.SUGGESTION_TYPE);
				$("#suggestionTitle").val(result.rs.SUGGESTION_TITLE);
				$("#suggestionContent1").val(result.rs.SUGGESTION_CONTENT1);
				$("#suggestionContent2").val(result.rs.SUGGESTION_CONTENT2);
				$("#suggestionContent3").val(result.rs.SUGGESTION_CONTENT3);
				$("#empSeq").val(result.rs.REG_EMP_SEQ);
				$("#empName").val(result.rs.REG_EMP_NAME);

				if(result.rs.fileList != null){
					ssr.getArticleFileSet(result.rs.fileList);
				}

			}
		}

		ssr.setKendoUpload();
	},

	getArticleFileSet : function (attachFile){
		console.log(attachFile)
		if(attachFile.length > 0){
			for(var i = 0; i < attachFile.length; i++){
				var data = {
					fileNo : attachFile[i].file_no,
					name: attachFile[i].file_org_name + "." + attachFile[i].file_ext,
					size: attachFile[i].file_size,
					extension: attachFile[i].file_ext
				}
				ssr.global.fileUploaded.push(data);
			}
		}
	},

	setKendoUpload : function(){
		$("#files").kendoUpload({
			async : {
				saveUrl : getContextPath() + "/spot/setCustomBoardFileInit.do",
				removeUrl : getContextPath() + "/common/commonFileDel.do",
				autoUpload : false
			},
			files : ssr.global.fileUploaded,
			localization : {
				select : "파일업로드",
				dropFilesHere : ""
			},
			upload: this.onUpload,
			remove : ssr.onRemove,
			success : this.onSuccess,
			complete : this.onComplete
		}).data("kendoUpload");
	},

	onUpload(e){
		e.data = ssr.global.fileInitData;
	},

	onRemove(e){
		if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
			e.data = {
				fileNo : e.files[0].fileNo
			};
			customKendo.fn_customAjax(getContextPath() + "/common/commonFileDel.do", e.data);
		}else{
			e.preventDefault();
		}
	},


	onSuccess : function(e){
		if(e.operation == "upload") {
			ssr.global.fileUploadFlag = true;
		}else if(e.operation == "remove"){
			alert(e.XMLHttpRequest.responseJSON.rs.message);
		}
	},

	onComplete : function(){
		if(!ssr.global.fileUploadFlag){
			alert("첨부파일 등록 중 에러가 발생했습니다.");
			return;
		}
	},

	setSuggestionSystem : function(){
		if(!$("#suggestionType").val()){
			alert("제안부문을 선택해주세요.");
			return;
		}else if(!$("#suggestionTitle").val()){
			alert("제안제목을 입력해주세요.");
			return;
		}else if(!$("#suggestionContent1").val()){
			alert("현상 및 문제점을 입력해주세요.");
			return;
		}else if(!$("#suggestionContent2").val()){
			alert("개선방향을 입력해주세요.");
			return;
		}else if(!$("#suggestionContent3").val()){
			alert("효과를 입력해주세요.");
			return;
		}

		if(confirm("등록하시겠습니까?")){
			ssr.global.saveAjaxData = {
				menuCd : "suggestion",
				suggestionBoardId : ssr.global.params.suggestionBoardId,
				suggestionType : $("#suggestionType").val(),
				suggestionTitle : $("#suggestionTitle").val(),
				suggestionContent1 : $("#suggestionContent1").val(),
				suggestionContent2 : $("#suggestionContent2").val(),
				suggestionContent3 : $("#suggestionContent3").val(),
				empSeq : $("#regEmpSeq").val(),
			}

			var result = customKendo.fn_customAjax("/spot/setSuggestionSystem.do", ssr.global.saveAjaxData);

			if(result.flag){
				ssr.global.fileInitData = result.params;

				if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
					$("#files").data("kendoUpload").upload();
				}

				alert("게시글이 등록되었습니다.");
				open_in_frame("/spot/suggestionSystemList.do");
			}else{
				alert("게시글 등록 중 오류가 발생했습니다.");
			}
		}
	},

	listPageMove : function(){
		open_in_frame("/spot/suggestionSystemList.do");
	},
}