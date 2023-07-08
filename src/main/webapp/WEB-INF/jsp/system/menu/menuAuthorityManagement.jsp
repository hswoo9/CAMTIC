<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<link rel="stylesheet" href="/css/intra/kTreeView.css">
<script type="text/javascript" src="/js/intra/system/menuAuthManage.js?v=1"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>


<div class="col-md-10 col-lg-10 dash-left">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">메뉴권한관리</h4>
			<div class="title-road">시스템관리 &gt; 메뉴관리 &gt; 메뉴권한관리</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>

		<div class="panel-body">
			<table style="height:100%;">
				<colgroup>
					<col width="20%">
				</colgroup>
				<tbody>
					<tr style="height: 327px">
						<td rowspan="2" style="vertical-align: top;">
							<div id="menuTabStrip">
								<ul>
									<li class="k-state-active">
										메뉴 목록
									</li>
								</ul>
								<div>
									<input id="menuSearch" name="menuSearch" placeholder="메뉴명 입력"/>
									<div id="gridForm" style="height:609px; width: 315px;overflow: auto;border: 1px solid #dedfdf;">
										<div id="menuTreeView">

										</div>
									</div>
								</div>
							</div>
						</td>
						<td>
							<div id="authorityTabStrip">
								<ul>
									<li class="k-state-active">
										권한 그룹 목록
									</li>
								</ul>
								<div id="gridForm2" style="height:405px;overflow: auto;border: 1px solid #dedfdf;">
									<div id="mainGrid">
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div id="authorityEditorTabStrip">
								<ul>
									<li class="k-state-active">
										권한 등록/수정
									</li>
								</ul>
								<div id="gridForm3" style="height:220px;overflow: auto;border: 1px solid #dedfdf;">
									<table class="table table-bordered mb-0" id="authorityGroupInfoTb" style="border: none;">
										<tbody>
										<tr>
											<td colspan="4" style="text-align: right;border: none">
												<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="menuAM.inputReset()">
													<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
													<span class="k-button-text">신규 등록</span>
												</button>
												<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="menuAM.setMenuAuthorityGroup()">
													<span class="k-icon k-i-track-changes-enable k-button-icon"></span>
													<span class="k-button-text">저장</span>
												</button>
											</td>
										</tr>
										<tr>
											<th class="text-center th-color">
												<span class="red-star">*</span>메뉴 권한 그룹 번호
											</th>
											<td>
												<input type="hidden" id="loginEmpSeq" name="loginEmpSeq" value="${login.uniqId}">
												<input type="text" id="authorityGroupId" name="authorityGroupId" disabled>
											</td>
											<th class="text-center th-color">
												<span class="red-star">*</span>메뉴 권한 그룹 이름
											</th>
											<td>
												<input type="text" id="authorityGroupName" name="authorityGroupName">
											</td>
										</tr>
										<tr>
											<th class="text-center th-color">
												<span class="red-star">*</span>권한 구분
											</th>
											<td>
												<input type="text" id="authorityType" name="authorityType">
											</td>
											<th class="text-center th-color">
												<span class="red-star">*</span>사용유무
											</th>
											<td>
												<input type="text" id="active" name="active">
											</td>
										</tr>
										</tbody>
										<tfoot id="authorityGroupInfoTp">

										</tfoot>
									</table>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<script>
	menuAM.fn_defaultScript();
</script>