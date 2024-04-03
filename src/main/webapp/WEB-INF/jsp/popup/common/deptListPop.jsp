<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/deptListPop.js?v=${today}'/>"></script>
<%--<script type="text/javascript" src="<c:url value='/js/intra/common/popup/deptMultiPop.js?v="${toDate}"'/>"></script>--%>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">

<html>
<body>
<div class="pop_head">
	<h1>부서 검색</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>
<div style="padding: 20px">
	<input type="hidden" id="type" name="type" value="${params.type}">
	<input type="hidden" id="pk" name="pk" value="${params.pk}">
    <input type="hidden" id="status" name="status" value="${params.params}" />
	<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
	<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>

    <input type="hidden" id="idx" name="idx" value="${params.idx}" />

	<table style="padding: 20px;">
		<colgroup>
			<col width="272px">
			<col width="272px">
			<col width="500px">
		</colgroup>
		<tr>
			<td>
				<div id="apprLineTabStrip" style="width: 285px;">
					<ul>
						<li class="k-state-active">
							조직도
						</li>
					</ul>
					<div id="gridForm" style="height:447px; width: 275px;overflow: auto;border: 0px solid #dedfdf;">
						<div id="treeview" style="background-color:#fff;width: 300px; height: 602px; border: 0px solid #dbdbde">
						</div>
					</div>
				</div>
			</td>
			<td>
				<div id="apprLineUserInfoTabStrip" style="width: 420px;">
					<ul>
						<li class="k-state-active">
							직원 정보
						</li>
					</ul>
					<div style="height:447px;width: 410px;">
						<span>성명</span>
						<input type="text" id="sEmpName" style="width: 180px; margin-bottom: 5px;" class="k-input" onkeypress="if(window.event.keyCode==13){deptListPop.treeViewReload();}">
						<div id="userList">
						</div>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<div class="mt-10" style="text-align: right">
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="window.close()" style="vertical-align: middle;">
			<span class="k-button-text">닫기</span>
		</button>
	</div>
</div>
<script>
	/**
	 *  조직도
	 */
    var datas = JSON.parse('${data}');
    var deptSeq = '${loginVO.orgnztId}';
    var deptName = '${loginVO.orgnztNm}';

    deptListPop.fnDefaultScript(deptSeq);
	deptListPop.gridChoose();
</script>
</body>
</html>