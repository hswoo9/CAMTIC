<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/user/outUserMultiSelectPop.js?v=${today}'/>"></script>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">
<body>
<div class="pop_head">
	<h1>외부 사용자 선택(다수)</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>
<input type="hidden" id="type" name="type" value="${params.type}">
<input type="hidden" id="idx" name="idx" value="${params.idx}" />
<div style="padding: 20px">
	<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
	<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
	<table style="padding: 20px;">
		<colgroup>
			<col width="272px">
			<col width="500px">
		</colgroup>
		<tr>
			<td>
				<div id="apprLineUserInfoTabStrip" style="width: 420px;">
					<ul>
						<li class="k-state-active">
							직원 정보
						</li>
					</ul>
					<div style="height:447px;width: 410px;">
						<span>성명</span>
						<input type="text" id="sEmpName" style="width: 180px; margin-bottom: 5px;" class="k-input" onkeypress="if(window.event.keyCode==13){outUserMultiSel.treeViewReload();}">
						<div id="userList">
						</div>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<div class="mt-10" style="text-align: right">
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="outUserMultiSel.apprLineSave()" style="vertical-align: middle;">
			<span class="k-button-text">확인</span>
		</button>
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="window.close()" style="vertical-align: middle;">
			<span class="k-button-text">닫기</span>
		</button>
	</div>
</div>
<script>
    let datas = JSON.parse('${data}');
	let deptSeq = '${loginVO.orgnztId}';

    outUserMultiSel.fnDefaultScript();
    outUserMultiSel.treeViewReload(deptSeq);
    // outUserMultiSel.gridChoose();
</script>
</body>
</html>