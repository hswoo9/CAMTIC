<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalReaderSelectPop.js?v=${today}'/>"></script>
<link rel="stylesheet" href="/css/intra/popup/approvalLineSettingPop.css">
<body>
	<div class="pop_head">
		<h1>
            열람자 선택
		</h1>
		<a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
	</div>

	<div style="padding: 20px">
		<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
		<table style="width: 100%">
			<colgroup>
				<col width="20%">
				<col width="31%">
				<col width="49%">
			</colgroup>
			<tr>
				<td rowspan="2">
					<div id="orgChartTabStrip" style="width: 285px;">
						<ul>
							<li class="k-state-active">
								조직도
							</li>
						</ul>
						<div id="gridForm" style="height:447px; width: 275px;overflow: auto;border: 0px solid #dedfdf;">
							<div id="treeViewDiv" style="background-color:#fff;width: 300px; height: 602px; border: 0px solid #dbdbde">

							</div>
						</div>
					</div>
				</td>
				<td>
					<div id="deptUserInfoTabStrip" style="width: 420px;">
						<ul>
							<li class="k-state-active">
								직원 정보
							</li>
							<div style="margin-left: 60px;">
								<span>성명</span>
								<input type="text" id="sEmpName" style="width: 180px;" class="k-input" onkeypress="if(window.event.keyCode==13){readerPop.treeViewReload();}">
								<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="readerPop.treeViewReload()">
									<span class="k-icon k-i-search k-button-icon"></span>
								</button>
							</div>
						</ul>
						<div style="height:447px;width: 410px;">
							<div id="userList">
							</div>
						</div>
					</div>
				</td>
				<td>
					<div id="readerTabStrip" style="width: 410px;">
						<ul>
							<li class="k-state-active">
                                열람자
							</li>
						</ul>
						<div>
							<div style="text-align: right">
								<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="readerPop.rowDblClick()" style="margin-bottom: 5px;">
									<span class="k-button-text">삭제</span>
								</button>
							</div>
							<div id="readerListDataDiv" style="max-height: 381px; height:381px; overflow-y: scroll;border: 1px solid #dedfdf;">
							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>
		<div style="text-align: right; margin-top : 15px">
			<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="readerPop.addReader()">
				<span class="k-button-text">확인</span>
			</button>
			<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="window.close()">
				<span class="k-button-text">닫기</span>
			</button>
		</div>
	</div>
</div>

<script>
	/**
	 *  조직도
	 */
	var datas = JSON.parse('${data}');
	var deptSeq = '${loginVO.orgnztId}';
	var deptName = '${loginVO.orgnztNm}';

	readerPop.fnDefaultScript();
</script>
</body>
</html>