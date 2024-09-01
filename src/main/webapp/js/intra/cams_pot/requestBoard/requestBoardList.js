
var rbl = {
	global : {
		params : "",
		nowPage : "",
		articleList : "",
		articleSelIndex : 0,
		dropDownDataSource : "",
		searchAjaxData : "",
		saveAjaxData : "",
		pasChkModal : "",
		flag : false,
		now : new Date()
	},

	fnDefaultScript : function(queryParams){
		rbl.fn_pageSet(queryParams);
		rbl.gridReload(new URLSearchParams(queryParams).toString());
	},

	fn_pageSet : function(queryParams){
		rbl.global.dropDownDataSource = [
			{ text: "요청중", value: "1" },
			{ text: "접수완료", value: "2" },
			{ text: "처리완료", value: "3" },
			{ text: "취소", value: "-1" },
			{ text: "반려", value: "99" }
		]
		customKendo.fn_dropDownList("status", rbl.global.dropDownDataSource, "text", "value");
		$("#status").data("kendoDropDownList").bind("change", function(){rbl.gridReload()});

		rbl.global.dropDownDataSource = [
			{ text: "고도화", value: "1" },
			{ text: "수정사항", value: "2" },
		]
		customKendo.fn_dropDownList("afStatus", rbl.global.dropDownDataSource, "text", "value");
		$("#afStatus").data("kendoDropDownList").bind("change", function(){rbl.gridReload()});

		customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(rbl.global.now.setMonth(rbl.global.now.getMonth() - 1)));
		customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

		rbl.global.dropDownDataSource = [
			{ text: "제목", value: "REQUEST_TITLE" },
			{ text: "내용", value: "REQUEST_CONTENT" },
			{ text: "분류", value: "menuName" }
		]

		customKendo.fn_dropDownList("searchColumn", rbl.global.dropDownDataSource, "text", "value");
		customKendo.fn_textBox(["searchContent", "empName"]);

		$("#empName, #searchContent").on("keyup", function(key){
			if(key.keyCode == 13){
				rbl.gridReload();
			}
		});

		if(queryParams.status != null){
			$("#status").data("kendoDropDownList").value(queryParams.status)
			delete queryParams.status;
		}

		if(queryParams.startDt != null){
			$("#startDt").val(queryParams.startDt);
			delete queryParams.startDt;
		}

		if(queryParams.endDt != null){
			$("#endDt").val(queryParams.endDt);
			delete queryParams.endDt;
		}


		if(queryParams.empName != null){
			$("#empName").val(queryParams.empName);
			delete queryParams.empName;
		}

		if(queryParams.searchColumn != null){
			$("#searchColumn").val(queryParams.searchColumn);
			delete queryParams.searchColumn;
		}

		if(queryParams.searchContent != null){
			$("#searchContent").val(queryParams.searchContent);
			delete queryParams.searchContent;
		}

		if(queryParams.requestType != null){
			$("#requestType").val(queryParams.requestType);
			delete queryParams.requestType;
		}

		if(queryParams.page != null){
			rbl.global.nowPage = queryParams.page;
		}
	},

	gridReload : function(queryParams) {
		rbl.global.searchAjaxData = {
			requestType : $("#requestType").val(),
			status : $("#status").val(),
			afStatus : $("#afStatus").val(),
			startDt : $("#startDt").val(),
			endDt : $("#endDt").val(),
			empName : $("#empName").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		rbl.mainGrid("/spot/getRequestBoardList.do?" + queryParams, rbl.global.searchAjaxData);
		rbl.hiddenGrid("/spot/getRequestBoardList2.do", rbl.global.searchAjaxData, 99999);
	},

	mainGrid : function(url, params){
		var result = customKendo.fn_customAjax(url, params);

		if(result.flag){
			rbl.global.articleList = result.boardArticleList;
            rbl.global.params = result.params;

			var articleListStr = "";
			$("#articleListTb tbody *").remove()
			$(".pagination *").remove();
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

	hiddenGrid: function(url, params, pageSize){
		var dataSource = new kendo.data.DataSource({
			serverPaging: false,
			pageSize: pageSize == null ? 10 : pageSize,
			transport: {
				read : {
					url : url,
					dataType : "json",
					type : "post"
				},
				parameterMap: function(data) {
					for(var key in params){
						data[key] = params[key];
					}

					return data;
				}
			},
			schema : {
				data: function (data) {
					console.log("datadatadatadatadatadata", data);
					return data.list;
				},
				total: function (data) {
					return data.list.length;
				},
			},
		});

		$("#hiddenGrid").kendoGrid({
			dataSource: dataSource,
			sortable: true,
			selectable: "row",
			height : 525,
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			columns: [
				{
					title: "분류1",
					field: "largeMenu",
					width: 300,
				}, {
					title: "분류2",
					field: "smallMenu",
					width: 300,
				}, {
					title: "요청제목",
					field: "REQUEST_TITLE",
					width: 600
				}, {
					title: "요청자",
					field: "REG_EMP_NAME",
					width: 280
				}, {
					title: "요청일",
					field: "reg_date2",
					width: 200,
				}, {
					title: "고도화",
					field: "AF_STATUS",
					width: 280
				}, {
					title: "상태",
					field: "STATUS",
					width: 170,
				}
			]
		}).data("kendoGrid");
	},

	detailPageMove : function(requestBoardId){
		const queryParams = {
			page: rbl.global.nowPage == "" ? 1 : rbl.global.nowPage,
			requestBoardId : requestBoardId,
			requestType : $("#requestType").val(),
			status : $("#status").val(),
			startDt : $("#startDt").val(),
			endDt : $("#endDt").val(),
			empName : $("#empName").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		open_in_frame('/spot/requestBoardDetail.do?requestBoardId='+ requestBoardId + "&" + new URLSearchParams(queryParams).toString());
	},

	writePageMove : function(){
		const queryParams = {
			page: rbl.global.nowPage == "" ? 1 : rbl.global.nowPage,
			requestType : $("#requestType").val(),
			status : $("#status").val(),
			startDt : $("#startDt").val(),
			endDt : $("#endDt").val(),
			empName : $("#empName").val(),
			searchColumn : $("#searchColumn").val(),
			searchContent : $("#searchContent").val(),
		}

		open_in_frame('/spot/requestBoardReg.do?requestType=' + $("#requestType").val() + "&" + new URLSearchParams(queryParams).toString());
	},

	drawList : function (list, num) {
		let html = "";
		let i = num;

		list.forEach(row => {
			var replyCnt = "";

			if(row.reply_CNT != 0){
				replyCnt = ' <span style="font-weight: bold;">'+ '[' + row.reply_CNT + ']'+'</span>';
			}else {
				replyCnt = "";
			}

			var requestTitle = "";
			if(row.request_TITLE != null && row.request_TITLE != ""){
				requestTitle = row.request_TITLE + replyCnt;
			}else{
				requestTitle = "제목없음" + replyCnt;
			}

			var dt = (row.reg_DATE.year + "-" + ('00' + row.reg_DATE.monthValue).slice(-2) + "-" + ('00' + row.reg_DATE.dayOfMonth).slice(-2));
			html += "<tr>"
			html += "	<td class='ta-center'>" + i + "</td>";
			if(row.largeMenu != null && row.smallMenu != null){
				html += "<td class='ta-center'>" + row.largeMenu + ' - ' + row.smallMenu + "</td>";
			}else{
				html += "<td class='ta-center'>-</td>";
			}
			html += "	<td>";
			html += '		<a class="contentLink" href="javascript:rbl.detailPageMove(' + row.request_BOARD_ID + ')">' + requestTitle + "</a>";
			html += "	</td>";
			html += "	<td class='ta-center'>" + row.reg_EMP_NAME + "</td>";
			html += "	<td class='ta-center'>" + dt + "</td>";

			if(row.af_STATUS == '고도화'){
				html += "	<td class='ta-center' style='color: red;'>" + row.af_STATUS + "</td>";
			}else if(row.af_STATUS == '수정사항'){
				html += "	<td class='ta-center' style='color: blue;'>" + row.af_STATUS + "</td>";
			}else{
				html += "	<td class='ta-center'>-</td>";
			}
			if(row.status == '접수완료'){
				html += "	<td class='ta-center' style='color: green;'>" + row.status + "</td>";
			}else if(row.status == '요청중') {
				html += "	<td class='ta-center' style='color: red;'>" + row.status + "</td>";
			}else if(row.status == '처리완료'){
				html += "	<td class='ta-center' style='color: blue;'>" + row.status + "</td>";
			}else {
				html += "	<td class='ta-center'>" + row.status + "</td>";
			}
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
		rbl.global.nowPage = page;
        const queryParams = {
            page: (page) ? page : 1,
            recordSize: 10,
            pageSize: 10
        }

        rbl.mainGrid("/spot/getRequestBoardList.do?" + new URLSearchParams(queryParams).toString(), rbl.global.searchAjaxData);
    },

	fn_excelDownload : function(){
		var grid = $("#hiddenGrid").data("kendoGrid");
		grid.bind("excelExport", function(e) {
			e.workbook.fileName = "전산시스템 구축 수정사항.xlsx";
		});
		grid.saveAsExcel();
	}
}