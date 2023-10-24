
var rbl = {
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
		rbl.global.dropDownDataSource = [
			{ text: "요청중", value: "1" },
			{ text: "접수완료", value: "2" },
			{ text: "처리완료", value: "3" },
			{ text: "취소", value: "-1" },
		]
		customKendo.fn_dropDownList("status", rbl.global.dropDownDataSource, "text", "value");
		$("#status").data("kendoDropDownList").bind("change", rbl.gridReload);

		customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(rbl.global.now.setMonth(rbl.global.now.getMonth() - 1)));
		customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

		rbl.global.dropDownDataSource = [
			{ text: "제목", value: "REQUEST_TITLE" },
			{ text: "내용", value: "REQUEST_CONTENT" },
		]

		customKendo.fn_dropDownList("searchColumn", rbl.global.dropDownDataSource, "text", "value");
		customKendo.fn_textBox(["searchContent"]);

		rbl.gridReload();
	},

	mainGrid : function(url, params){
		var result = customKendo.fn_customAjax(url, params);

		if(result.flag){
			rbl.global.articleList = result.boardArticleList;
            rbl.global.params = result.params;

			if(isAdmin) {
				$("#writeBtn").show()
			}

			var articleListStr = "";
			$("#articleListTb tbody *").remove();
			if(rbl.global.articleList.list.length > 0){
                var list = rbl.global.articleList.list;
                const pagination = rbl.global.articleList.pagination;
                const params = rbl.global.params;

                let num = pagination.totalRecordCount - ((params.page - 1) * params.recordSize);

                rbl.drawList(list, num);

                rbl.drawPage(pagination, params);

			}else{
				articleListStr += "<tr style='border:1px solid #dee2e6;'>";
				articleListStr += "	<td class='ta-center' colspan='7'>데이터가 존재하지 않습니다.</td>";
				articleListStr += "</tr>";
                $("#articleListTb tbody").append(articleListStr);
			}
		}
	},

	gridReload : function() {
		rbl.global.searchAjaxData = {
			requestType : $("#requestType").val(),
			status : $("#status").val(),
			startDt : $("#startDt").val(),
			endDt : $("#endDt").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		rbl.mainGrid("/spot/getRequestBoardList.do", rbl.global.searchAjaxData);
	},

	detailPageMove : function(requestBoardId){
		open_in_frame('/spot/requestBoardDetail.do?requestBoardId='+ requestBoardId + "&requestType=" + $("#requestType").val());
	},

	writePageMove : function(){
		open_in_frame('/spot/requestBoardReg.do?requestType=' + $("#requestType").val());
	},

    drawList : function (list, num){
        let html;

        var i = 0;
		console.log(list);
		list.forEach(row => {
			var requestTitle = "";
			if(row.request_TITLE != null && row.request_TITLE != ""){
				requestTitle = row.request_TITLE;
			}else{
				requestTitle = "제목없음";
			}

			i++;
			var dt = (row.reg_DATE.year + "-" + ('00' + row.reg_DATE.monthValue).slice(-2) + "-" + ('00' + row.reg_DATE.dayOfMonth).slice(-2));
			html += "<tr>"
			html += "	<td class='ta-center'>" + (i) + "</td>";
			html += "	<td>";
			html += '		<a class="contentLink" href="javascript:rbl.detailPageMove(' + row.request_BOARD_ID + ')">' + requestTitle + "</a>";
			html += "	</td>";
			html += "	<td class='ta-center'>" + row.reg_EMP_NAME + "</td>";
			html += "	<td class='ta-center'>" + dt + "</td>";
			html += "	<td class='ta-center'>" + row.status + "</td>";
			html += "</tr>";
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
        html += '<span><a href="javascript:void(0);" onclick="rbl.movePage(' + (params.page - 1) + ')" class="page_bt prev">&laquo;</a></span>';

        for (let i = pagination.startPage; i <= pagination.endPage; i++) {
            html += (i !== params.page)
                ? '<span><a href="javascript:void(0);" onclick="rbl.movePage('+i+');">'+ i +'</a></span>'
                : '<span><a href="#" class="active">' + i + '</a></span>'
        }

        html += '<span><a href="javascript:void(0);" onclick="rbl.movePage(' + (params.page + 1) + ');" className="page_bt next">&raquo;</a></span>';
		html += '</div>';
        $(".pagination").html(html);
    },

    movePage : function (page){
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 20,
            pageSize: 10
        }

        rbl.mainGrid("/spot/getRequestBoardList.do?" + new URLSearchParams(queryParams).toString(), rbl.global.searchAjaxData);
    }
}