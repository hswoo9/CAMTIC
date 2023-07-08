<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<link rel="stylesheet" href="/css/intra/kTreeView.css">
<script type="text/javascript" src="/js/intra/system/menuManage.js?v=1"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">메뉴정보관리</h4>
			<div class="title-road">시스템관리 &gt; 메뉴관리 &gt; 메뉴정보관리</div>
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
								<div id="menuTabStrip">
									<ul>
										<li class="k-state-active">
											메뉴 목록
										</li>
									</ul>
									<div>
										<input id="menuSearch" name="menuSearch" placeholder="메뉴명 입력" style="width: 85%" onkeypress="if(window.event.keyCode==13){menuM.menuTreeSearch(this.value)}"/>
										<button type="button" class=" k-button k-button-md k-button-solid k-button-solid-base" onclick="menuM.menuTreeSearch($('#menuSearch').val())">
											<span class="k-icon k-i-search k-button-icon"></span>
										</button>
										<div id="gridForm" style="height:609px; width: 315px;overflow: auto;border: 1px solid #dedfdf;">
											<div id="menuTreeView">

											</div>
										</div>
									</div>

								</div>
							</td>
							<td style="vertical-align: top;">
								<div id="menuEditorTabStrip">
									<ul>
										<li class="k-state-active">
											메뉴 등록/수정
										</li>
									</ul>
									<div id="gridForm2" style="height:670px;overflow: auto;border: 1px solid #dedfdf;">
										<form id="menuSaveFrm">
											<table class="table table-bordered mb-0" style="border: none;">
												<tbody>
												<tr>
													<td colspan="4" style="text-align: right;border: none">
														<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="menuM.inputReset()">
															<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
															<span class="k-button-text">신규 등록</span>
														</button>
														<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="menuM.setMenu()">
															<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
															<span class="k-button-text">저장</span>
														</button>
														<button type="button" id="delBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="menuM.setMenuDel()">
															<span class="k-icon k-i-cancel k-button-icon"></span>
															<span class="k-button-text">삭제</span>
														</button>
													</td>
												</tr>
												<tr>
													<th class="text-center th-color">
														<span class="red-star">*</span>상위메뉴
													</th>
													<td colspan="3">
														<input type="hidden" id="tmpUpperMenuId" value="" />
														<input type="text" id="upperMenuId" name="upperMenuId" style="width:30%;">
														<input type="text" id="upperMenuId2" name="upperMenuId" style="width:30%;">
														<input type="text" id="upperMenuId3" name="upperMenuId" style="width:30%;">
													</td>
												</tr>
												<tr>
													<th class="text-center th-color">
														<span class="red-star">*</span>메뉴번호
													</th>
													<td>
														<input type="hidden" id="loginEmpSeq" name="loginEmpSeq" value="${login.uniqId}">
														<input type="hidden" id="menuDepth" name="menuDepth">
														<input type="text" id="menuId" name="menuId" disabled>
													</td>
													<th class="text-center th-color">
														<span class="red-star">*</span>메뉴명
													</th>
													<td>
														<input type="text" id="menuName" name="menuName">
													</td>
												</tr>
												<tr>
													<th class="text-center th-color">
														<span class="red-star">*</span>메뉴유형
													</th>
													<td>
														<input type="text" id="menuType" name="menuType">
													</td>
												</tr>
												<tr>
													<th class="text-center th-color">
														<span class="red-star">*</span>메뉴경로
													</th>
													<td colspan="3">
<%--														TODO. 현재 게시판 유무 미정 --%>
<%--														<input type="text" id="boardId" name="boardId" style="width: 19%">--%>
														<input type="text" id="menuPath" name="menuPath" style="width: 79%">
													</td>
												</tr>
												<tr>
													<th class="text-center th-color">
														<span class="red-star">*</span>메뉴순서
													</th>
													<td>
														<input type="text" id="sort" name="sort">
													</td>
													<th class="text-center th-color">
														<span class="red-star">*</span>사용유무
													</th>
													<td colspan="3">
														<input type="text" id="active" name="active" >
													</td>
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
	menuM.fn_defaultScript();
</script>