
var ssl = {
	global : {
		params : "",
		articleList : "",
		articleSelIndex : 0,
		dropDownDataSource : "",
		searchAjaxData : "",
		saveAjaxData : "",
		pasChkModal : "",
		flag : false,
		now : new Date()
	},

	fnDefaultScript : function(){
		ssl.global.dropDownDataSource = [
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
		customKendo.fn_dropDownList("suggestionType", ssl.global.dropDownDataSource, "text", "value");
		$("#suggestionType").data("kendoDropDownList").bind("change", ssl.gridReload);


		ssl.global.dropDownDataSource = [
			{ text: "채택", value: "2" },
			{ text: "불채택", value: "3" },
			{ text: "실시계획서 검토", value: "4" },
			{ text: "개선활동 진행", value: "5" },
			{ text: "실시계획서 작성", value: "6" },
			{ text: "개선활동 완료", value: "7" },
			{ text: "결과보고서 검토", value: "8" },
			{ text: "제안완료", value: "9" },
			{ text: "제안취소 검토", value: "-1" },
			{ text: "제안취소", value: "-2" },
		]
		customKendo.fn_dropDownList("status", ssl.global.dropDownDataSource, "text", "value");
		$("#status").data("kendoDropDownList").bind("change", ssl.gridReload);

		customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(ssl.global.now.setMonth(ssl.global.now.getMonth() - 1)));
		customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

		ssl.global.dropDownDataSource = [
			{ text: "제안명", value: "2" },
			{ text: "제안내용", value: "3" },
			{ text: "제안자", value: "4" },
			{ text: "실시자", value: "5" },
		]

		customKendo.fn_dropDownList("searchColumn", ssl.global.dropDownDataSource, "text", "value");
		customKendo.fn_textBox(["searchContent", "articlePublicPassWord"]);

		ssl.gridReload();
	},

	mainGrid : function(url, params){
		var result = customKendo.fn_customAjax(url, params);

		if(result.flag){
			console.log(result);
			ssl.global.articleList = result.boardArticleList;
            ssl.global.params = result.params;

			/*if(isAdmin) {
				$("#writeBtn").show()
			}*/

			var articleListStr = "";
			$("#articleListTb tbody *").remove();
			if(ssl.global.articleList.list.length > 0){
                var list = ssl.global.articleList.list;
                const pagination = ssl.global.articleList.pagination;
                const params = ssl.global.params;

                let num = pagination.totalRecordCount - ((params.page - 1) * params.recordSize);

                ssl.drawList(list, num);

                ssl.drawPage(pagination, params);

			}else{
				articleListStr += "<tr style='border:1px solid #dee2e6;'>";
				articleListStr += "	<td class='ta-center' colspan='7'>데이터가 존재하지 않습니다.</td>";
				articleListStr += "</tr>";
                $("#articleListTb tbody").append(articleListStr);
			}
		}
	},

	gridReload : function() {
		ssl.global.searchAjaxData = {
			suggestionType : $("#suggestionType").val(),
			status : $("#status").val(),
			startDt : $("#startDt").val(),
			endDt : $("#endDt").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		ssl.mainGrid("/spot/getSuggestionSystemList.do", ssl.global.searchAjaxData);
	},

	detailPageMove : function(suggestionBoardId){
		open_in_frame('/spot/suggestionSystemDetail.do?suggestionBoardId='+ suggestionBoardId);
	},

	writePageMove : function(){
		open_in_frame('/spot/suggestionSystemReg.do');
	},

    drawList : function (list, num){
		let html = "";
		let i = num;

		list.forEach(row => {
			var suggestionTitle = "";
			if(row.suggestion_TITLE != null && row.suggestion_TITLE != ""){
				suggestionTitle = row.suggestion_TITLE;
			}else{
				suggestionTitle = "제목없음";
			}


			html += "<tr>"
			html += "	<td class='ta-center'>" + (i) + "</td>";
			html += "	<td class='ta-center'>" + row.suggestion_TYPE_TXT + "</td>";
			html += "	<td>";
			html += '		<a class="contentLink" href="javascript:ssl.detailPageMove(' + row.suggestion_BOARD_ID + ')">' + suggestionTitle + "</a>";
			html += "	</td>";
			html += "	<td class='ta-center'>" + row.suggestion_DATE + "</td>";
			html += "	<td class='ta-center'>" + row.reg_EMP_NAME + "</td>";
			html += "	<td class='ta-center'>";
			if(row.execute_EMP_NAME != null){
				html += row.execute_EMP_NAME;
			}
			html += "	</td>";
			html += "	<td class='ta-center'>" + row.status + "</td>";
			html += "</tr>";
			i--;
		});

        $("#articleListTb tbody").append(html);
    },

    drawPage : function(pagination, params){
        if ( !pagination || !params ) {
            document.querySelector('.paging').innerHTML = '';
            throw new Error('Missing required parameters...');
        }

        let html = '';
		html += '<div style="display:flex;justify-content: center; ">';
        html += '<span><a href="javascript:void(0);" onclick="ssl.movePage(' + (params.page - 1) + ')" class="page_bt prev">&laquo;</a></span>';

        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            html += (i !== params.page)
                ? '<span><a href="javascript:void(0);" onclick="ssl.movePage('+i+');">'+ i +'</a></span>'
                : '<span><a href="#" class="active">' + i + '</a></span>'
        }

        html += '<span><a href="javascript:void(0);" onclick="ssl.movePage(' + (params.page + 1) + ');" className="page_bt next">&raquo;</a></span>';
		html += '</div>';
        $(".pagination").html(html);
    },

    movePage : function (page){
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 10,
            pageSize: 10
        }

        ssl.mainGrid("/spot/getSuggestionSystemList.do?" + new URLSearchParams(queryParams).toString(), ssl.global.searchAjaxData);
    }
}