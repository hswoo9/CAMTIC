<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<link rel="stylesheet" href="/css/intra/kTreeView.css">
<script type="text/javascript" src="/js/intra/system/board/boardManage.js?v=1"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">게시판정보관리</h4>
			<div class="title-road" style="text-align: right; margin-bottom: 5px;">시스템관리 &gt; 게시판관리 &gt; 게시판정보관리</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>

		<div class="panel-body">
			<div style="margin-bottom:10px;">
				<table>
					<colgroup>
						<col width="20%">
					</colgroup>
					<tbody>
					<tr>
						<td>
							<div id="boardListTabStrip">
								<ul>
									<li class="k-state-active">
										게시판 목록
									</li>
								</ul>
								<div id="gridForm2" style="height:560px;overflow: auto;border: 1px solid #dedfdf;">
									<input id="searchColumn" name="searchColumn" placeholder="게시판명 입력" style="width: 83%" onkeypress="if(window.event.keyCode==13){boardMa.gridReload()}"/>
									<button type="button" style="padding: 2px 8px;" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="boardMa.gridReload()">
										<span class="k-icon k-i-search k-button-icon">조회</span>
									</button>
									<div id="mainGrid" style="height:609px; width: 315px;overflow: auto;border: 1px solid #dedfdf;">
										<%--<div id="menuTreeView">

										</div>--%>
									</div>
								</div>
							</div>
						</td>
						<td style="vertical-align: top;">
							<div id="boardEditorTabStrip">
								<ul>
									<li class="k-state-active">
										게시판 등록/수정
									</li>
								</ul>
								<div id="gridForm3" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
									<form id="menuSaveFrm">
										<table class="table table-bordered mb-0" style="border: none;" id="boardInfo">
											<tbody>
											<tr>
												<td colspan="4" style="text-align: right;border: none">
													<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="boardMa.inputReset()">
														<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
														<span class="k-button-text">신규 등록</span>
													</button>
													<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="boardMa.setBoard()">
														<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
														<span class="k-button-text">저장</span>
													</button>
													<button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="boardMa.setBoardDel()">
														<span class="k-icon k-i-cancel k-button-icon"></span>
														<span class="k-button-text">삭제</span>
													</button>
												</td>
											</tr>
											<tr>
												<th class="text-center th-color">
													<span class="red-star">*</span>게시판명
												</th>
												<td colspan="3">
													<input type="hidden" id="boardId" name="boardId">
													<input type="text" id="boardName" name="boardName" style="width:100%;">
												</td>
											</tr>
											<tr>
												<th class="text-center th-color">
													<span class="red-star">*</span>게시판타입
												</th>
												<td>
													<input type="text" id="boardType" name="boardType" style="width:230px;">
												</td>
												<th class="text-center th-color">
													<span class="red-star">*</span>사용유무
												</th>
												<td>
													<input type="text" id="active" name="active" style="width:230px;">
												</td>
											</tr>
											<tr>
												<th class="text-center th-color">
													<span class="red-star">*</span>작성자
												</th>
												<td>
													<input type="text" id="writerType" name="writerType" style="width:230px;">
												</td>
												<th class="text-center th-color">
													<span class="red-star">*</span>작성자 공개유무
												</th>
												<td>
													<input type="text" id="anonymousActive" name="anonymousActive" style="width:230px;">
												</td>
											</tr>
											<tr>
												<th class="text-center th-color">
													<span class="red-star">*</span>첨부파일 사용유무
												</th>
												<td>
													<input type="text" id="attachFileActive" name="attachFileActive" style="width:230px;">
												</td>
												<th class="text-center th-color">
													<span class="red-star">*</span>댓글 사용유무
												</th>
												<td>
													<input type="text" id="replyActive" name="replyActive" style="width:230px;">
												</td>
											</tr>
											<tr>
												<th class="text-center th-color">
													<span class="red-star">*</span>게시글 카테고리
												</th>
												<td colspan="3">
													<input type="text" id="boardCategoryActive" name="boardCategoryActive" style="width:100%;">
												</td>
											</tr>
										</table>
										<div id="boardCategoryDiv" style="display: none">
											<div style="display:flex; justify-content: space-between; margin:10px 10px 10px;">
												<div class="spanft" style="font-weight: bold;margin-top: 7px;">· 게시글 카테고리</div>
												<div class="btn-st" style="margin:0">
													<button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="boardMa.addRowBoardCategory()">
														<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
														<span class="k-button-text">추가</span>
													</button>
												</div>
											</div>

											<table class="table table-bordered mb-0" style="border : none" id="boardCategoryTable">
												<tbody id="boardCategoryTbody">
												<tr>
													<th class="text-center th-color">카테고리명</th>
													<th class="text-center th-color">등록일</th>
													<th class="text-center th-color">등록자</th>
													<th class="text-center th-color"></th>
												</tr>
											</tbody>
										</table>
									</form>
								</div>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
</div><!-- col-md-9 -->
<script>
	boardMa.fnDefaultScript();
</script>