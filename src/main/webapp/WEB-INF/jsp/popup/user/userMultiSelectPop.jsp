<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />

<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/user/userMultiSelectPop.js?v=${today}'/>"></script>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">
<body>
<div class="pop_head">
	<h1>사용자 선택(다수)</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>
<input type="hidden" id="type" name="type" value="${params.type}">
<div style="padding: 20px">
	<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
	<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
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
						<input type="text" id="sEmpName" style="width: 180px; margin-bottom: 5px;" class="k-input" onkeypress="if(window.event.keyCode==13){userMultiSel.treeViewReload();}">
						<div id="userList">
						</div>
					</div>
				</div>
			</td>
			<td>
				<div id="apprLineTypeTabStrip" style="width: 600px; height: 490px;">
					<ul>
						<li class="k-state-active">
							선택 사용자
						</li>
					</ul>
					<div>
						<div style="margin-top: 10px;margin-bottom: 48px;">
							<div style="float:right;">
								<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userMultiSel.rowDblClick()" style="margin-bottom: 5px;">
									<span class="k-button-text">삭제</span>
								</button>
							</div>
						</div>
						<div id="addSubHLineGrid" style="width: 560px; margin-top:10px">

						</div>
						<div id="approvalLineDataDiv" style="max-height: 306px; width: 100%; height: 306px; overflow-y: scroll; border: 1px solid #dedfdf" >
							<table class="table table-bordered mb-0" id="approvalLineDataTb" style="border:none;text-align: center;">
								<colgroup>
									<col width="41px">
									<col width="106px">
									<col width="190px">
									<col width="106px">
									<col width="106px">
								</colgroup>
								<tbody>

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<div class="mt-10" style="text-align: right">
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userMultiSel.apprLineSave()" style="vertical-align: middle;">
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

	userMultiSel.fnDefaultScript();
	userMultiSel.treeViewReload(deptSeq);
	userMultiSel.treeClick();
	userMultiSel.gridChoose();
</script>
</body>
</html>