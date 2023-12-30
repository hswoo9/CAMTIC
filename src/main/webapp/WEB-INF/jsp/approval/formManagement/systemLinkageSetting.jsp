<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/js/intra/approval/formManage/systemLinkageSetting.js?v=5'/>"></script>
<style>
	.k-grid-norecords{
		justify-content: space-around;
	}
	.k-grid-toolbar{
		justify-content: flex-end !important;
	}
	.red-star {color: red; margin-right: 5px;}
</style>
<div class="col-md-12 col-lg-12 dash-left">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">시스템연동설정</h4>
			<div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 양식관리 > 시스템연동설정</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div class="panel-body">
			<div class="table-responsive" style="margin-bottom:10px;">
				<input type="hidden" id="searchCompSeq" name="searchCompSeq" value="1212" style="width: 20%">
				<input type="hidden" id="searchCompName" name="searchCompName" value="캠틱종합기술원" style="width: 20%">
				<table class="searchTable table table-bordered">
					<colgroup>
						<col width="10%">
						<col width="auto">
					</colgroup>
					<tbody>
						<tr>
							<th class="text-center th-color">
								<span class="pdr5 pdl3per">연동프로세스명</span>
							</th>
							<td>
								<input type="text" id="searchKeyWord" name="searchKeyWord" style="width: 30%" placeholder="연동프로세스명" onkeypress="if(window.event.keyCode==13){systemLingSet.gridReload()}">
								<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="systemLingSet.gridReload()">
									<span class="k-button-text">조회</span>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="display:flex;">
				<div class="table-responsive" style="width:50%;border:1px solid #d5d5d5;">
					<div style="display:flex; justify-content: space-between; margin:0 10px;">
						<div class="spanft" style="padding:16px 10px;font-weight: bold;">· 연동프로세스 목록</div>
					</div>
					<div id="mainGrid" style="width:97%; margin:0 auto;">

					</div>
				</div>
				<div class="table-responsive" style="width:50%;border:1px solid #d5d5d5;">
					<div style="display:flex; justify-content: space-between; margin:0 10px;">
						<div class="spanft" style="margin-top: 17px;font-weight: bold;">· 연동프로세스 정보</div>
						<div class="btn-st" style="margin-top: 15px">
							<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemLingSet.setLinkageProcess()">
								<span class="k-button-text">저장</span>
							</button>
						</div>
					</div>
					<div style="padding:8px">
						<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
						<input type="hidden" id="linkageProcessId" name="linkageProcessId">
						<input type="hidden" id="linkageProcessCompSeq" name="linkageProcessCompSeq" value="1212">
						<input type="hidden" id="linkageProcessCompName" name="linkageProcessCompName" value="캠틱종합기술원">
						<table class="searchTable table table-bordered" style="height: 100%;">
							<colgroup>
								<col width="20%">
							</colgroup>
							<tbody>
								<tr>
									<th class="text-left th-color">
										<span class="red-star">*</span>구분
									</th>
									<td colspan="3">
										<input type="text" id="linkageType" name="linkageType" value="시스템연동" disabled>
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>코드
									</th>
									<td colspan="3">
										<input type="hidden" id="dbChk" name="dbChk" value="0">
										<input type="text" id="linkageProcessCode" name="linkageProcessCode" style="width: 50%">
										<button type="button" id="dbChkBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="systemLingSet.getDbChk()">
											<span class="k-button-text">중복확인</span>
										</button>
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>연동 프로세스명
									</th>
									<td colspan="3">
										<input type="text" id="linkageProcessName" name="linkageProcessName" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>임시저장
									</th>
									<td colspan="3">
										<input type="text" id="tempProcessUrl" name="tempProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>삭제
									</th>
									<td colspan="3">
										<input type="text" id="deleteProcessUrl" name="deleteProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>상신
									</th>
									<td colspan="3">
										<input type="text" id="draftProcessUrl" name="draftProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>상신취소
									</th>
									<td colspan="3">
										<input type="text" id="draftCancelProcessUrl" name="draftCancelProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>회수
									</th>
									<td colspan="3">
										<input type="text" id="retrieveProcessUrl" name="retrieveProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>결재
									</th>
									<td colspan="3">
										<input type="text" id="approveProcessUrl" name="approveProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>반려
									</th>
									<td colspan="3">
										<input type="text" id="returnProcessUrl" name="returnProcessUrl" style="width: 100%;">
									</td>
								</tr>
								<tr>
									<th class="text-center th-color">
										<span class="red-star">*</span>최종결재
									</th>
									<td colspan="3">
										<input type="text" id="finalApprovalProcessUrl" name="finalApprovalProcessUrl" style="width: 100%;">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	systemLingSet.fnDefaultScript();
</script>