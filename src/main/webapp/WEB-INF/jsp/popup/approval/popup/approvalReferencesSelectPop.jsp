<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src='<c:url value="/js/ac/acUtil.js"></c:url>'></script>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">
<style>
	.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
		padding: 5px 15px;
		line-height: 1.42857143;
		vertical-align: middle;
		border-top: 1px solid #ffffff;
	}
</style>
<body style="font-size: 12px;">
<div class="pop_head">
	<h1>참조기안문서 선택</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>

<div style="padding: 20px">
	<div class="top_box table-responsive">
		<table class="searchTable table table-bordered mb-0">
			<colgroup>
				<col width="11%">
				<col width="20%">
				<col width="7%">
				<col width="24%">
				<col width="8%">
				<col width="auto">
			</colgroup>
			<tr>
				<th scope="row" class="text-center th-color">기안부서/기안자</th>
				<td>
					<input type="hidden" name="empSeq" id="empSeq" value="${loginVO.uniqId}">
					<input type="hidden" name="loginEmpSeq" id="loginEmpSeq" value="${loginVO.uniqId}">
					<input type="hidden" name="deptSeq" id="deptSeq" value="${loginVO.orgnztId}">
					<input type="text" name="deptName" id="deptName" style="width: 120px;" disabled="disabled" value="${loginVO.orgnztNm}">
					<input type="text" name="empName" id="empName" style="width: 60px;" disabled="disabled" value="${loginVO.name}">
					<button type="button" class=" k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearchPopup();">
						<span class="k-icon k-i-search k-button-icon"></span>
					</button>
				</td>
				<th class="text-center th-color">조회기간</th>
				<td>
					<input type="text" id="startDay" style="width: 45%;"> ~ <input type="text" id="endDay" style="width: 45%">
				</td>
				<th class="text-center th-color">문서명</th>
				<td>
					<input type="text" id="docTitle" onkeypress="if(window.event.keyCode==13){gridReload()}"/>
				</td>
			</tr>
		</table>
		<div style="text-align: right; margin-top:10px">

		</div>
	</div>

	<div class="top_box table-responsive">
		<div class="right_div" style="float: right">
			<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">
				조회
			</button>
		</div>
	</div>

	<div class="com_ta2 mt-10">
		<div id="mainGrid"></div>
	</div>

	<div style="text-align: right; margin-top : 15px">
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="setReferencesAdd()">
			<span class="k-button-text">추가</span>
		</button>
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="window.close()">
			<span class="k-button-text">닫기</span>
		</button>
	</div>
</div>
</body>

<script type="text/javascript">
	var now = new Date();

	$("#endDay").kendoDatePicker({
		culture : "ko-KR",
		format : "yyyy-MM-dd",
		value : new Date()
	});

	$("#startDay").kendoDatePicker({
		culture : "ko-KR",
		format : "yyyy-MM-dd",
		value : new Date(now.setMonth(now.getMonth() - 1))
	});

	$("#startDay, #endDay").attr("readonly", true);

	$("#deptName, #empName, #docTitle").kendoTextBox();

	gridReload();

	function mainGrid(url, params){
		var mainGrid = $("#mainGrid").kendoGrid({
			dataSource : customKendo.fn_gridDataSource2(url, params),
			height : 359,
			sortable: true,
			scrollable: true,
			pageable: {
				refresh: true,
				pageSize : 5,
				pageSizes : [ 10, 20, 50, "ALL" ],
				buttonCount: 5
			},
			noRecords: {
				template: "데이터가 존재하지 않습니다."
			},
			persistSelection : true,
			columns : [
				{
					template : "<input type='checkbox' id='docPk#=DOC_ID#' name='docPk' value='#=DOC_ID#' class='k-checkbox checkbox'/>",
					width: 40
				}, {
					field : "DOC_NO",
					title : "문서번호",
					width : 150,
					template : function (e){
						if(e.DOC_NO != null){
							return e.DOC_NO
						}else{
							return "-"
						}
					}
				},{
					field : "DOC_TITLE",
					title : "제목",
					template : function(e){
						return '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255);">' + e.DOC_TITLE + '</a>';
					},
					attributes : {
						style : "text-align : left;"
					}
				},{
					field : "DRAFT_DEPT_NAME",
					title : "기안부서",
					width : 100
				}, {
					field : "DRAFT_EMP_NAME",
					title : "기안자",
					width : 100
				}, {
					field : "DRAFT_DT",
					title : "기안일",
					width : 100
				}, {
					field : "LAST_APPROVE_DT",
					title : "완료일",
					width : 100
				}]
		}).data("kendoGrid");
	}

	function gridReload(){
		var searchAjaxData = {
			empSeq : $("#empSeq").val(),
			deptSeq : $("#deptSeq").val(),
			startDay : $("#startDay").val(),
			endDay : $("#endDay").val(),
			docTitle : $("#docTitle").val(),
            approveStat : "result",
            docStatus : 100
		}

		// mainGrid('/approval/getFinalApprovalDocList.do', searchAjaxData);
        mainGrid('/approvalUser/getUserDocStorageBoxList', searchAjaxData);


	}

	function userSearchPopup(){
		window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
	}

	function userPopupClose(row){
		$('#empName').val(row.emp_name);
		$('#empSeq').val(row.emp_seq);
		$('#deptName').val(row.dept_name);
		$('#deptSeq').val(row.dept_seq);
	}

	var pop;
	var url;
	var width;
	var height;

	function setReferencesAdd(){
		var referencesArr = new Array();
		var mainGrid = $("#mainGrid").data("kendoGrid");

		$.each($("input[name=docPk]:checked"), function(){
			var dataItem = mainGrid.dataItem($(this).closest("tr"));
			var data = {
				referencesDocId : dataItem.DOC_ID,
				referencesDocNo : dataItem.DOC_NO,
				referencesDocApproKey : dataItem.APPRO_KEY,
				referencesDocTitle : dataItem.DOC_TITLE,
				REFERENCES_DOC_TITLE : dataItem.DOC_TITLE
			}
			referencesArr.push(data);
		});

		opener.parent.draft.referencesListViewSetData(referencesArr);
		window.close();
	}
</script>

