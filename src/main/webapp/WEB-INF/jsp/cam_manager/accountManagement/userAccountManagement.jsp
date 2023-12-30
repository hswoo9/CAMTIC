<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/accountManagement/account.js?v=${today}'/>"></script>
<style>

</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">직원별 법인계좌 관리</h4>
			<div class="title-road">캠매니저 > 법인계좌 관리 &gt; 직원별 법인계좌 관리</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>
		<div class="panel-body">
			<div>
				<table class="searchTable table table-bordered mb-0">
					<colgroup>
						<col width="8%">
						<col width="10%">
						<col width="8%">
						<col width="10%">
						<col width="8%">
						<col width="8%">
						<col width="8%">
						<col width="10%">
						<col width="8%">
						<col width="20%">
					</colgroup>
					<tr>
						<th class="text-center th-color">부서</th>
						<td>
							<input type="text" id="deptComp" style="width: 150px;">
						</td>
						<th class="text-center th-color">팀</th>
						<td>
							<input type="text" id="deptTeam" style="width: 180px;">
						</td>
						<th class="text-center th-color">성별</th>
						<td>
							<input type="text" id="userGender" style="width:70px;">
						</td>
						<th class="text-center th-color">검색어</th>
						<td colspan="3">
							<input type="text" id="userKind" style="width: 100px;">
							<input type="text" id="kindContent" style="width: 150px;" onkeypress="if(window.event.keyCode==13){account.fn_gridReload();}">
						</td>
					</tr>
				</table>
			</div>

			<div id="mainGrid" style="margin:20px 0;">

			</div>
		</div>
	</div>
</div><!-- col-md-9 -->

<script>
    account.fn_defaultScript();
</script>
