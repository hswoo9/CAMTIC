var rbr = {
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
		rbr.global.params = params;
		$("#requestType").val(rbr.global.params.requestType);
		$("#page").val(rbr.global.params.page);
		$("#searchStatus").val(rbr.global.params.status);
		$("#startDt").val(rbr.global.params.startDt);
		$("#endDt").val(rbr.global.params.endDt);
		$("#searchEmpName").val(rbr.global.params.empName);
		$("#searchColumn").val(rbr.global.params.searchColumn);
		$("#searchContent").val(rbr.global.params.searchContent);

		if(rbr.global.params.requestType == "R"){
			$(".panel-title").text("전산시스템 구축 수정사항");
			$(".title-road").text("캠스팟 > 캠스팟 > 전산시스템 구축 수정사항");
			$("#deadlineDateTh").text("하자보수 마감 요청일");
		}else{
			$(".panel-title").text("홍보협조요청");
			$(".title-road").text("캠스팟 > 캠스팟 > 홍보협조요청");
			$("#deadlineDateTh").text("제작기한");
		}

		customKendo.fn_datePicker("deadlineDate", '', "yyyy-MM-dd");
		customKendo.fn_textBox(["requestTitle"]);
		CKEDITOR.replace('requestContent', {

		});

		if(rbr.global.params.requestBoardId != null){
			rbr.global.searchAjaxData = {
				requestBoardId : rbr.global.params.requestBoardId,
				empSeq : $("#regEmpSeq").val()
			}

			var result = customKendo.fn_customAjax("/spot/getRequestBoard.do", rbr.global.searchAjaxData);
			console.log(result);
			rbr.settingTempFileDataInit(result.fileInfo);
			if(result.flag){
				$("#requestBoardId").val(result.rs.REQUEST_BOARD_ID);
				$("#requestType").val(result.rs.REQUEST_TYPE);
				$("#requestTitle").val(result.rs.REQUEST_TITLE);
				CKEDITOR.instances.requestContent.setData(result.rs.REQUEST_CONTENT);
				$("#deadlineDate").val(result.rs.DEADLINE_DATE);

				$("#largeMenu").val(result.rs.LARGE_MENU);
				$("#middleMenu").val(result.rs.MIDDLE_MENU);
				$("#smallMenu").val(result.rs.SMALL_MENU);
			}
		}

		rbr.fn_largeMenuSet();

	},

	setRequestBoard : function(){
		var content = CKEDITOR.instances.requestContent.getData();
		if(!$("#requestTitle").val()) {
			alert("제목을 입력해주세요.");
			return;
		} else if (!$("#largeMenu").val()) {
			alert("대분류를 선택해주세요.");
			return;
		} else if (!$("#middleMenu").val()) {
			alert("중분류를 선택해주세요.");
			return;
		} else if (!$("#smallMenu").val()) {
			alert("소분류를 선택해주세요.");
			return;
		}else if(content == null || content == ""){
			alert("내용을 입력해주세요");
			return;
		}

		if(confirm("등록하시겠습니까?")){
			rbr.global.saveAjaxData = {
				requestType : $("#requestType").val(),
				requestTitle : $("#requestTitle").val(),
				largeMenu : $("#largeMenu").val(),
				middleMenu : $("#middleMenu").val(),
				smallMenu : $("#smallMenu").val(),
				requestContent : content,
				deadlineDate : $("#deadlineDate").val(),
				empSeq : $("#regEmpSeq").val(),
				menuCd : "board",
				requestEmpName : $("#empName").val(),
				requestOfficeTelNum : $("#officeTelNum").val()
			}

			var fd = new FormData();
			let data = rbr.global.saveAjaxData;
			for (var key in data) {
				fd.append(key, data[key]);
			}

			if($("#requestBoardId").val() != ""){
				fd.append("requestBoardId", $("#requestBoardId").val());
			}

			if(fCommon.global.attFiles != null){
				for(var i = 0; i < fCommon.global.attFiles.length; i++){
					fd.append("boardFile", fCommon.global.attFiles[i]);
				}
			}

			var result = customKendo.fn_customFormDataAjax("/spot/setRequestBoard.do", fd);

			if(result.flag){
				alert("게시글이 등록되었습니다.");
				rbr.listPageMove();
			}else{
				alert("게시글 등록 중 오류가 발생했습니다.");
			}
		}
	},

	listPageMove : function(){
		var url = '/spot/requestBoardList.do?requestType=' + $("#requestType").val() + "&page=" + $("#page").val() + "&status=" + $("#searchStatus").val() + "&startDt=" + $("#startDt").val()
			+ "&endDt=" + $("#endDt").val() + "&empName=" + $("#searchEmpName").val() + "&searchColumn=" + $("#searchColumn").val() + "&searchContent=" + $("#searchContent").val();

		open_in_frame(url);
	},

	settingTempFileDataInit: function(e){
		var html = '';

		if(e.length > 0){
			for(var i = 0; i < e.length; i++){
				html += '<tr style="text-align: center">';
				html += '   <td>'+ e[i].file_org_name +'</td>';
				html += '   <td>'+ e[i].file_ext +'</td>';
				html += '   <td>'+ e[i].file_size +'</td>';
				html += '   <td>';
				html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
					'			<span class="k-button-text">삭제</span>' +
					'		</button>';
				html += '   </td>';
				html += '</tr>';
			}
			$("#fileGrid").html(html);
		}else{
			$("#fileGrid").html('<tr>' +
				'	<td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>' +
				'</tr>');
		}
	},

	fn_largeMenuSet: function(){
		const result = customKendo.fn_customAjax("/system/getRequestBoardMenuList", {
			menuDepth: 0
		});
		customKendo.fn_dropDownList("largeMenu", result.rs, "MENU_NAME", "MENU_ID", 2);

		$("#largeMenu").change(function() {
			rbr.fn_middleMenuSet($(this).val());
		});

		rbr.fn_middleMenuSet(result.rs.MENU_ID);
	},

	fn_middleMenuSet: function(menuId){
		const result = customKendo.fn_customAjax("/system/getRequestBoardMenuList", {
			upperMenuId: menuId
		});
		customKendo.fn_dropDownList("middleMenu", result.rs, "MENU_NAME", "MENU_ID", 2);

		$("#middleMenu").change(function() {
			rbr.fn_smallMenuSet($(this).val());
		});

		rbr.fn_smallMenuSet(result.rs.MENU_ID);
	},

	fn_smallMenuSet: function(menuId){
		const result = customKendo.fn_customAjax("/system/getRequestBoardMenuList", {
			upperMenuId: menuId
		});
		customKendo.fn_dropDownList("smallMenu", result.rs, "MENU_NAME", "MENU_ID", 2);
	}
}