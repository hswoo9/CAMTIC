<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=4'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/requestBoard/requestBoardDetail.js?v=${today}'/>"></script>
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

	#boardContentTable img {
		width: 100%;
	}
</style>
<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<c:choose>
				<c:when test="${params.requestType eq 'R'}">
					<h3 class="panel-title">전산시스템 구축 수정사항</h3>
					<div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 전산시스템 구축 수정사항</div>
				</c:when>
				<c:otherwise>
					<h3 class="panel-title">홍보협조요청</h3>
					<div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 홍보협조요청</div>
				</c:otherwise>
			</c:choose>


			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div style="margin: 0 auto; padding: 20px;">
			<div class="table-responsive">
				<input type="hidden" id="menuNm" name="menuNm" value="${menuNm}">
				<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
				<input type="hidden" id="empName" name="empName" value="${loginVO.name}">
				<input type="hidden" id="requestBoardId" name="requestBoardId" value="${params.requestBoardId}">
				<input type="hidden" id="requestType" name="requestType" value="${params.requestType}">

				<input type="hidden" id="page" name="page" value="${params.page}">
				<input type="hidden" id="searchStatus" name="searchStatus" value="${params.status}">
				<input type="hidden" id="startDt" name="startDt" value="${params.startDt}">
				<input type="hidden" id="endDt" name="endDt" value="${params.endDt}">
				<input type="hidden" id="searchEmpName" name="searchEmpName" value="${params.empName}">
				<input type="hidden" id="searchColumn" name="searchColumn" value="${params.searchColumn}">
				<input type="hidden" id="searchContent" name="searchContent" value="${params.searchContent}">

				<table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;" id="boardContentTable">  <%-- table mb-0 --%>
					<colgroup>
						<col width="10%">
						<col>
					</colgroup>
					<tbody>
					<tr>
						<th class="text-center th-color">제목</th>
						<td colspan="3" id="requestTitle">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">내용</th>
						<td colspan="3" id="requestContent">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">작성자</th>
						<td colspan="3" id="reqEmpName">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">내선번호</th>
						<td colspan="3" id="regOfficeTelNum">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">분류</th>
						<td colspan="3" id="menuName">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">
							<c:choose>
								<c:when test="${params.requestType eq 'R'}">
									하자보수 마감 요청일
								</c:when>
								<c:otherwise>
									제작기한
								</c:otherwise>
							</c:choose>
						</th>
						<td colspan="3" id="deadlineDate">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">첨부파일</th>
						<td colspan="3" id="fileHtml">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">진행상태</th>
						<td colspan="3" id="status">
						</td>
					</tr>
					<tr>
						<th class="text-center th-color">고도화</th>
						<td colspan="3" id="afStatus">
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<div style="display: flex;flex-direction: column;">
				<div>
					<div style="text-align: right">
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-error" value="1" onclick="rbd.setRequestBoardAdvancementFixesUpd(this)" id="advancementBtn" style="display: none">
							<span class="k-button-text">고도화</span>
						</button>

						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-info" value="2" onclick="rbd.setRequestBoardAdvancementFixesUpd(this)" id="FixesBtn" style="display: none">
							<span class="k-button-text">수정사항</span>
						</button>


						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="2" onclick="rbd.setRequestBoardStatusUpd(this)" id="processAccBtn" style="display: none">
							<span class="k-button-text">접수처리</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="3" onclick="rbd.setRequestBoardStatusUpd(this)" id="processComBtn" style="display: none">
							<span class="k-button-text">처리완료</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="-1" onclick="rbd.setRequestBoardStatusUpd(this)" id="cancelBtn" style="display: none">
							<span class="k-button-text">접수취소</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="99" onclick="rbd.setRequestBoardStatusUpd(this)" id="returnBtn" style="display: none">
							<span class="k-button-text">반려</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rbd.setArticleMod()" id="articleModBtn" style="display: none">
							<span class="k-button-text">수정</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rbd.setArticleDel()" id="articleDelBtn" style="display: none">
							<span class="k-button-text">삭제</span>
						</button>
						<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rbd.listPageMove()">
							<span class="k-button-text">목록</span>
						</button>
					</div>
				</div>
			</div>
			<hr/>
			<c:if test="${params.requestType eq 'R'}">
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
										<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rbd.setArticleReply(this)">
											<span class="k-button-text">등록</span>
										</button>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</c:if>
		</div>
	</div> <%-- col-lg-11 --%>
</div> <%-- col-lg-12 --%>
<script>
	var isAdmin = "${isAdmin}" == "true" ? true : false;

	rbd.fnDefaultScript();
</script>