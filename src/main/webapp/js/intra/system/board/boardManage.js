var boardMa = {
	global : {
		dropDownDataSource : "",
		boardCategoryArr : new Array(),
		searchAjaxData : "",
		saveAjaxData : "",
		flag : false,
	},

	fnDefaultScript : function(){
		$("#boardListTabStrip").kendoTabStrip({
			animation:  {
				open: {
					effects: "fadeIn"
				}
			}
		});

		$("#boardEditorTabStrip").kendoTabStrip({
			animation:  {
				open: {
					effects: "fadeIn"
				}
			}
		});

		boardMa.global.dropDownDataSource = [
			{ text: "게시판명", value: "b" },
			{ text: "일반게시판", value: "n" },
			{ text: "익명게시판", value: "a" },
			{ text: "Q&A", value: "q" },
			{ text: "FAQ", value: "f" },
		]

		$("#searchColumn").kendoDropDownList({
			dataSource : boardMa.global.dropDownDataSource,
			dataTextField: "text",
			dataValueField: "value"
		});

		boardMa.global.dropDownDataSource = [
			{ text : "공개", value : "Y" },
			{ text : "비공개", value : "N" },
		]
		customKendo.fn_dropDownList("anonymousActive", boardMa.global.dropDownDataSource, "text", "value");

		boardMa.global.dropDownDataSource = [
			{ text: "사용", value: "Y" },
			{ text: "미사용", value: "N" }
		]
		customKendo.fn_dropDownList("attachFileActive", boardMa.global.dropDownDataSource, "text", "value");

		boardMa.global.dropDownDataSource = [
			{ text: "전체", value: "All" },
			{ text: "관리자", value: "admin" },
			// { text: "권한", value: "authority" }
		]
		customKendo.fn_dropDownList("writerType", boardMa.global.dropDownDataSource, "text", "value");

		boardMa.global.dropDownDataSource = [
			{ text: "사용", value: "Y" },
			{ text: "미사용", value: "N" }
		]
		customKendo.fn_dropDownList("replyActive", boardMa.global.dropDownDataSource, "text", "value");

		boardMa.global.dropDownDataSource = [
			{ text: "일반", value: "n" },
			{ text: "익명", value: "a" },
			{ text: "Q&A", value: "q" },
			{ text: "FAQ", value: "f" },
		]
		customKendo.fn_dropDownList("boardType", boardMa.global.dropDownDataSource, "text", "value");

		boardMa.global.dropDownDataSource = [
			{ text: "사용", value: "Y" },
			{ text: "미사용", value: "N" }
		]
		customKendo.fn_dropDownList("active", boardMa.global.dropDownDataSource, "text", "value");

		boardMa.global.dropDownDataSource = [
			{ text: "사용", value: "Y" },
			{ text: "미사용", value: "N" }
		]
		customKendo.fn_dropDownList("boardCategoryActive", boardMa.global.dropDownDataSource, "text", "value");
		$("#boardCategoryActive").data("kendoDropDownList").bind("change", boardMa.boardCategoryActiveChange);

		customKendo.fn_textBox(["boardName", "searchContent"]);

		boardMa.gridReload();
	},

	mainGrid : function(url, params){
		var mainGrid = $("#mainGrid").kendoGrid({
			dataSource: customKendo.fn_gridDataSource2(url, params, 10),
			width: 531,
			height: 590,
			sortable: true,
			scrollable: true,
			pageable : {
				refresh : true,
				pageSizes : [ 10, 20, 50, "ALL" ],
				buttonCount : 5
			},
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			columns: [
				{
					field : "BOARD_ID",
					title : "번호",
					width: 50
				}, {
					field: "BOARD_NAME",
					title: "게시판명",
					width: 200,
					attributes : {
						style : "text-align : left;"
					}
				}, {
					field : "BOARD_TYPE",
					title : "게시판 유형",
					width: 100,
					template : function(e){
						if(e.BOARD_TYPE == "n"){
							return "일반게시판";
						}else if(e.BOARD_TYPE == "a"){
							return "익명게시판";
						}else if(e.BOARD_TYPE == "q"){
							return "Q&A"
						}else if(e.BOARD_TYPE == "f"){
							return "FAQ"
						}
					}
				}, {
					title : "수정",
					template :function(e){
						var html = "";
						html += '<button type="button" class="k-button k-rounded k-button-solid-base" onclick="boardMa.boardDataMod(this)">';
						html += '   <span class="k-button-text">수정</span>';
						html += '</button>';
						return html;
					},
					width: 80
				}
			],
		}).data("kendoGrid");

		$("#checkAll").click(function(){
			if($(this).is(":checked")) {
				$("input[name=absPk]").not(".noCheck").prop("checked", true);
			}else{
				$("input[name=absPk]").not(".noCheck").prop("checked", false);
			}
		});
	},

	gridReload : function() {
		boardMa.global.searchAjaxData = {
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		boardMa.mainGrid("/system/getBoardList.do", boardMa.global.searchAjaxData);
	},

	boardCategoryActiveChange : function(){
		if(this.value() == "Y"){
			$("#boardCategoryDiv").show();
		}else{
			$("#boardCategoryDiv").hide();
		}
	},

	addRowBoardCategory : function(){
		var boardCategoryTr = "";

		boardCategoryTr += "<tr>";
		boardCategoryTr += "	<td>";
		boardCategoryTr += "		<input type='text' id='boardCategoryName' name='boardCategoryName' class='k-input k-textbox k-input-solid k-input-md k-rounded-md'>";
		boardCategoryTr += "	</td>";
		boardCategoryTr += "	<td class=\"text-center\"> - </td>";
		boardCategoryTr += "	<td class=\"text-center\"> - </td>";
		boardCategoryTr += "	<td class=\"text-center\">";
		boardCategoryTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"boardMa.setRowBoardCategoryDel(this)\">";
		boardCategoryTr += "			<span class=\"k-icon k-i-cancel k-button-icon\"></span>";
		boardCategoryTr += "			<span class=\"k-button-text\">삭제</span>";
		boardCategoryTr += "		</button>";
		boardCategoryTr += "	</td>"
		boardCategoryTr += "</tr>";

		$("#boardCategoryTbody").append(boardCategoryTr);
	},

	setRowBoardCategoryDel : function(e){
		$(e).closest("tr").remove();
	},

	boardDataMod : function(e){
		var grid = $("#mainGrid").data("kendoGrid");
		var dataItem = grid.dataItem($(e).closest("tr"));

		$("#boardId").val(dataItem.BOARD_ID);
		$("#boardName").val(dataItem.BOARD_NAME);
		$("#anonymousActive").data("kendoDropDownList").value(dataItem.ANONYMOUS_ACTIVE);
		$("#attachFileActive").data("kendoDropDownList").value(dataItem.ATTACH_FILE_ACTIVE);
		$("#writerType").data("kendoDropDownList").value(dataItem.WRITER_TYPE);
		$("#replyActive").data("kendoDropDownList").value(dataItem.REPLY_ACTIVE);
		$("#boardType").data("kendoDropDownList").value(dataItem.BOARD_TYPE);
		$("#active").data("kendoDropDownList").value(dataItem.ACTIVE);
		$("#boardCategoryActive").data("kendoDropDownList").value(dataItem.BOARD_CATEGORY_ACTIVE);
		$("#boardCategoryActive").data("kendoDropDownList").trigger("change");

		boardMa.global.searchAjaxData = {
			boardId : dataItem.BOARD_ID
		}

		var result = customKendo.fn_customAjax("/system/getBoardCategoryList.do", boardMa.global.searchAjaxData);
		if(result.flag){
			boardMa.setRowBoardCategory(result.rs);
		}
	},

	setRowBoardCategory : function(rs){
		var boardCategoryTr = "";

		for(var i = 0; i < rs.length; i++){
			boardCategoryTr += "<tr>";
			boardCategoryTr += "	<td class=\"text-center\">";
			boardCategoryTr += "		<input type='text' id='boardCategoryName' name='boardCategoryName' class='k-input k-textbox k-input-solid k-input-md k-rounded-md' value='" + rs[i].BOARD_CATEGORY_NAME + "'>";
			boardCategoryTr += "	</td>";
			boardCategoryTr += "	<td class=\"text-center\">" + rs[i].REG_DATE + "</td>";
			boardCategoryTr += "	<td class=\"text-center\">" + rs[i].EMP_NAME_KR + "</td>";
			boardCategoryTr += "	<td class=\"text-center\">";
			boardCategoryTr += "		<button type=\"button\" class=\"k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"boardMa.setRowBoardCategoryDel(this)\">";
			boardCategoryTr += "			<span class=\"k-icon k-i-cancel k-button-icon\"></span>";
			boardCategoryTr += "			<span class=\"k-button-text\">삭제</span>";
			boardCategoryTr += "		</button>";
			boardCategoryTr += "	</td>"
			boardCategoryTr += "</tr>";
		}
		$("#boardCategoryTbody tr:not(:eq(0))").remove();
		$("#boardCategoryTbody").append(boardCategoryTr);
	},

	setBoard : function(){
		boardMa.global.flag = true;

		if(!$("#boardName").val()){
			alert("게시판명을 입력해주세요.");
			boardMa.global.flag = false;
			return;
		}else if(!$("#anonymousActive").val()){
			alert("작성자 공개유무를 선택해주세요.");
			boardMa.global.flag = false;
			return;
		}else if(!$("#attachFileActive").val()){
			alert("첨부파일 사용유무를 선택해주세요.");
			boardMa.global.flag = false;
			return;
		}else if(!$("#writerType").val()){
			alert("작성자 권한을 선택해주세요.");
			boardMa.global.flag = false;
			return;
		}else if(!$("#replyActive").val()){
			alert("댓글 사용유무를 선택해주세요.");
			boardMa.global.flag = false;
			return;
		}else if(!$("#boardType").val()){
			alert("게시판타입을 선택해주세요.");
			boardMa.global.flag = false;
			return;
		}else if(!$("#active").val()){
			alert("게시판 사용유무를 선택해주세요.");
			boardMa.global.flag = false;
			return;
		}

		if(confirm("저장하시겠습니까?")){
			if(boardMa.global.flag){
				boardMa.global.saveAjaxData = {
					boardId : $("#boardId").val(),
					boardName : $("#boardName").val(),
					anonymousActive : $("#anonymousActive").val(),
					attachFileActive : $("#attachFileActive").val(),
					writerType : $("#writerType").val(),
					replyActive : $("#replyActive").val(),
					boardType : $("#boardType").val(),
					active : $("#active").val(),
					empSeq : $("#empSeq").val(),
					boardCategoryActive : $("#boardCategoryActive").val()
				}

				if(boardMa.global.saveAjaxData.boardCategoryActive == "Y"){
					$.each($("#boardCategoryTbody tr:not(:eq(0))"), function(){
						var data = {
							boardCategoryName : $(this).find("#boardCategoryName").val(),
							empSeq : $("#empSeq").val(),
						}

						boardMa.global.boardCategoryArr.push(data);
					})

					boardMa.global.saveAjaxData.boardCategoryArr = JSON.stringify(boardMa.global.boardCategoryArr);
				}

				var result = customKendo.fn_customAjax("/system/setBoard.do", boardMa.global.saveAjaxData);

				if(result.flag){
					alert("게시판 정보가 저장되었습니다.");
					boardMa.inputReset();
					boardMa.gridReload();
				}else{
					alert("게시판 등록 중 에러가 발생했습니다.");
				}
			}else{
				alert("입력값을 확인해주세요.");
			}
		}
	},

	setBoardDel : function(){

	},

	inputReset : function(){
		$("#boardId").val("");
		$("#boardName").val("");
		boardMa.global.boardCategoryArr = [];

		$("#boardCategoryTbody tr:not(:eq(0))").remove();
	}
}