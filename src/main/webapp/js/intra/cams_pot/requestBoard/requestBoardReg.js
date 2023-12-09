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
				requestBoardId : rbr.global.params.requestBoardId
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
			}
		}
	},

	setRequestBoard : function(){
		var content = CKEDITOR.instances.requestContent.getData();
		if(!$("#requestTitle").val()){
			alert("제목을 입력해주세요.");
			return;
		}else if(content == null || content == ""){
			alert("내용을 입력해주세요");
			return;
		}

		if(confirm("등록하시겠습니까?")){
			rbr.global.saveAjaxData = {
				requestType : $("#requestType").val(),
				requestTitle : $("#requestTitle").val(),
				requestContent : content,
				deadlineDate : $("#deadlineDate").val(),
				empSeq : $("#regEmpSeq").val(),
				menuCd : "board"
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
				open_in_frame("/spot/requestBoardList.do?requestType=" + $("#requestType").val());
			}else{
				alert("게시글 등록 중 오류가 발생했습니다.");
			}
		}
	},

	listPageMove : function(){
		open_in_frame("/spot/requestBoardList.do?requestType=" + $("#requestType").val());
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
	}
}