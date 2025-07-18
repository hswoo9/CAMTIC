<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/subHoliday/subHolidayListPop.js?v="${toDate}"'/>"></script>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">

<body>
<div class="pop_head">
	<h1>업무인수자 지정</h1>
	<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
</div>
<div style="padding: 20px">
	<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
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
						<div id="userList">
						</div>
					</div>
				</div>
			</td>
			<td>
				<div id="apprLineTypeTabStrip" style="width: 600px; height: 490px;">
					<ul>
						<li class="k-state-active">
							업무인수자 지정
						</li>
					</ul>
					<div>
						<div style="margin-top: 10px;margin-bottom: 48px;">
							<div style="float:right;">
								<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayListPop.newFavApprove()">
									<span class="k-icon k-i-plus k-button-icon"></span>
									<span class="k-button-text">초기화</span>
								</button>
								<%--<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayListPop.rowDelClick()">
									<span class="k-button-text">삭제</span>
								</button>--%>
							</div>
						</div>
						<div id="addSubHLineGrid" style="margin-top:10px">

						</div>
						<div id="approvalLineDataDiv" style="max-height: 306px; height:306px; overflow-y: scroll;border: 1px solid #dedfdf;" >
							<table class="table table-bordered mb-0" id="approvalLineDataTb" style="border:none;text-align: center;">
								<colgroup>
									<col width="10%">
									<col width="15%">
									<col width="35%">
									<col width="15%">
									<col width="20%">
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
		<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayListPop.gridChoose()" style="vertical-align: middle;">
			<span class="k-button-text">확인</span>
		</button>
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

	subHolidayListPop.fnDefaultScript();
	subHolidayListPop.treeViewReload();
	subHolidayListPop.treeClick();
	subHolidayListPop.gridChoose();
</script>
</body>
</html>