<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="/js/intra/system/code/commonCodeManage.js?v=1"/></script>

<style>
	.k-grid-toolbar{
		justify-content: flex-end !important;
	}
	.k-grid-norecords{
		justify-content: space-around;
	}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<body class="font-opensans">

<div class="mainCard">
	<div class="panel">
		<div class="panel-heading">
		</div>
		<div style="padding-left : 20px; padding-right: 20px;">
			<h4 class="panel-title">공통코드관리</h4>
			<div class="title-road" style="text-align: right; margin-bottom: 5px;">시스템관리 &gt; 코드관리 > 공통코드관리</div>
			<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
		</div>

		<div class="panel-body">
			<div style="margin-bottom:10px;">
				<table class="searchTable table table-bordered mb-0">
					<colgroup>
						<col width="10%">
						<col width="40%">
						<col width="10%">
						<col width="40%">
					</colgroup>
					<tr>
						<th class="text-center th-color">그룹코드</th>
						<td>
							<input type="text" id="cmGroupCode" style="width:200px;">
						</td>
						<th class="text-center th-color">그룹코드명</th>
						<td>
							<input type="text" id="cmGroupCodeNm" onkeypress="if(window.event.keyCode==13){codeM.gridReload('mainGrid')}" style="width: 200px;">
						</td>
					</tr>
				</table>
			</div>
			<%--<div class="table-responsive" style="margin-bottom:10px;">
				<table class="table table-bordered mb-0" style="border: 0px;">
					<tbody>
					<tr>
						<td style="border:0;">
							<span class="pdr5">그룹코드</span>
							<input type="text" id="cmGroupCode" style="width: 15%;">
							<span class="pdr5">그룹코드명</span>
							<input type="text" id="cmGroupCodeNm" onkeypress="if(window.event.keyCode==13){codeM.gridReload('mainGrid')}" style="width: 15%;">
							<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="codeM.gridReload('mainGrid')">
								<span class="k-button-text">조회</span>
							</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>--%>
			<div id="mainGrid">

			</div>
			<div class="card-header">
				<h4 class="card-title" style="font-size:15px;">상세 내역</h4>
			</div>
			<input type="hidden" id="cmGroupCodeId" name="cmGroupCodeId">
			<div id="mainGrid2">

			</div>
		</div>
	</div>
</div>

<!-- 그룹코드 모달 -->
<jsp:include page="/WEB-INF/jsp/system/code/commonGroupCodeRegModal.jsp" flush="true"></jsp:include>
<!-- 코드 모달 -->
<jsp:include page="/WEB-INF/jsp/system/code/commonCodeRegModal.jsp" flush="true"></jsp:include>

<script>
	codeM.fn_defaultScript();
</script>
</body>
</html>