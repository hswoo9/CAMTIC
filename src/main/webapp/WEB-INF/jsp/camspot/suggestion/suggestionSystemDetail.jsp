<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=4'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/suggestion/suggestionSystemDetail.js?v=4'/>"></script>
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
			<h3 class="panel-title">제안제도</h3>
			<div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 제안제도</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div style="margin: 0 auto; padding: 20px;">
			<div class="table-responsive">
				<input type="hidden" id="menuNm" name="menuNm" value="${menuNm}">
				<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
				<input type="hidden" id="empName" name="empName" value="${loginVO.name}">
				<input type="hidden" id="suggestionBoardId" name="suggestionBoardId" value="${params.suggestionBoardId}">


				<table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">  <%-- table mb-0 --%>
					<colgroup>
						<col width="10%">
						<col width="40%">
						<col width="10%">
						<col width="40%">
					</colgroup>
					<tbody>
					<tr>
						<th class="text-center th-color">제안번호</th>
						<td id="suggestionNo" colspan="3">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">제안일자</th>
						<td id="suggestionDate">
						</td>
						<th class="text-center th-color">제안부문</th>
						<td id="suggestionType">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">제안자</th>
						<td id="regName">
						</td>
						<th class="text-center th-color">현재상태</th>
						<td id="status">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">제안제목</th>
						<td colspan="3" id="suggestionTitle">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">현상 및 문제점</th>
						<td colspan="3" id="suggestionContent1">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">개선방향</th>
						<td colspan="3" id="suggestionContent2">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">효 과</th>
						<td colspan="3" id="suggestionContent3">
						</td>
					</tr>

					</tbody>
				</table>
			</div>
			<div style="border-bottom: 1px solid #dedfdf;">
				<div style="padding: 30px;" id="articleContentDiv">
				</div>
			</div>
			<div style="margin-top:10px;display: flex;flex-direction: column;">
				<div style="display: flex; justify-content: space-between; margin: 0 0 10px;">
					<div class="spanft" style="font-weight: bold;">· 첨부파일</div>
					<div class="btn-st" style="margin:0;">
						<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssd.boardAttachmentDown()">
							<span class="k-icon k-i-download k-button-icon"></span>
						</button>
					</div>
				</div>

				<div>
					<div id="attachmentGrid" style="border-bottom: none;">

					</div>

					<div style="margin: 15px 0 15px 0;text-align: right;">
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssd.setArticleDel()" id="articleDelBtn" style="display: none">
							<span class="k-button-text">삭제</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssd.setArticleMod()" id="articleModBtn" style="display: none">
							<span class="k-button-text">수정</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssd.listPageMove()">
							<span class="k-button-text">목록</span>
						</button>
					</div>
				</div>
			</div>
			<hr/>
		</div>
	</div> <%-- col-lg-11 --%>
</div> <%-- col-lg-12 --%>
<script>
	var isAdmin = "${isAdmin}" == "true" ? true : false;

	ssd.fnDefaultScript();
</script>