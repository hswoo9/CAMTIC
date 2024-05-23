<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=4'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/watchBoard/watchBoardDetail.js?v=5'/>"></script>
<style>
	.k-drag-clue, .k-grid-header, .k-grouping-header, .k-header, .k-menu, .k-panelbar>.k-panelbar-header>.k-link, .k-progressbar, .k-state-highlight, .k-tabstrip, .k-tabstrip-items .k-item, .k-toolbar {
		background-color: #f0f0f0 !important;
	}
	.k-grid-norecords{
		justify-content: space-around;
		font-size: 12px;
		border-bottom: 1px solid #dee2e6;
		height: 26px !important
	}
	.replyTable td{
		border : none;
	}
	.replyTable td, .replyTable th{
		border : none;
		border-top: 1px solid #dee2e6;
	}
	.replyTable {
		border-right: none;
		border-left: none;
	}
	.reply_row {
		margin-left: 25px;
		padding-left: 5px !important;
		background: url(/images/ico/ico_reply01.png) no-repeat 8px 2px;
	}
	.replyPadding {
		padding-left: 25px !important;
	}
</style>
<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h3 class="panel-title">함께보아요</h3>
			<div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 함께보아요</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div style="margin: 0 auto; padding: 20px;">
			<div class="table-responsive">
				<input type="hidden" id="menuNm" name="menuNm" value="${menuNm}">
				<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
				<input type="hidden" id="empName" name="empName" value="${loginVO.name}">
				<input type="hidden" id="watchBoardId" name="watchBoardId" value="${params.watchBoardId}">
				<input type="hidden" id="page" name="page" value="${params.page}">

				<table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">  <%-- table mb-0 --%>
					<colgroup>
						<col width="8%">
						<col>
						<col width="8%">
						<col>
					</colgroup>
					<tbody>
					<tr>
						<th class="text-center th-color">제목</th>
						<td id="boardArticleTitle">
						</td>
						<th class="text-center th-color">조회수</th>
						<td id="boardArticleViewCount">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">작성자</th>
						<td id="boardArticleRegName">

						</td>
						<th class="text-center th-color">작성일</th>
						<td id="boardArticleRegDate">

						</td>
					</tr>
					<tr>
						<th class="text-center th-color">내용</th>
						<td colspan="3" id="boardArticleContent">
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div style="display: flex;flex-direction: column;">
				<div>
					<div style="text-align: right">
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbd.setArticleMod()" id="articleModBtn" style="display: none">
							<span class="k-button-text">수정</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbd.setArticleDel()" id="articleDelBtn" style="display: none">
							<span class="k-button-text">삭제</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbd.listPageMove()">
							<span class="k-button-text">목록</span>
						</button>
					</div>
				</div>
			</div>
			<hr/>
			<div id="replyDiv">
				<div style="margin-top:10px;">
					<div style="display:flex; justify-content: space-between; align-items: center;">
						<div class="spanft" style="font-weight: bold;">· 댓글</div>
					</div>
					<div style="margin-top:10px;">
						<table class="table table-bordered replyTable" id="replyTable">
							<colgroup>
								<col width="8%">
								<col width="65%">
								<col width="16%">
							</colgroup>
							<tbody id="articleReplyTbody">
							<tr>
								<td class="text-center">댓글입력</td>
								<td class="text-center" colspan="3">
									<input type='hidden' id='articleReplyId' name='articleReplyId'>
									<input type="text" id="articleReplyContent" name="articleReplyContent" style="width: 96%">
									<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbd.setArticleReply(this)">
										<span class="k-button-text">등록</span>
									</button>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div> <%-- col-lg-11 --%>
</div> <%-- col-lg-12 --%>
<script>
	var isAdmin = "${isAdmin}" == "true" ? true : false;

	wbd.fnDefaultScript();
</script>