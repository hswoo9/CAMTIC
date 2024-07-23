<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/intra/cam_mng/newResolutionSubmitPage.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<style>

    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<div class="col-lg-12" style="padding:0;">
	<div class="table-responsive">
		<div class="card-header pop-header">
			<h3 class="card-title title_NM">전자(세금)계산서 승인번호 입력</h3>
			<div class="btn-st popButton">
				<button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="newResolutionSubmitPage.fn_send()">전송</button>
				<%--<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="">전송취소</button>--%>
				<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
			</div>
		</div>
		<form id="sendForm" style="padding: 20px 30px;">
			<input type="hidden" name="C_DIKEYCODE" id="C_DIKEYCODE" value="${data.C_DIKEYCODE}" />


		</form>
	</div>
</div>

<script>
	newResolutionSubmitPage.fn_defaultScript();

	$(document).on('dblclick', '#bankGrid .k-grid-content tr', function(){
		var subPopUpData = $("#bankGrid").data('kendoGrid').dataItem(this);
		//프로젝트
		$('#BCNC_BANK_CODE').val(subPopUpData.CMMN_DETAIL_CODE);
		$('#BCNC_BANK_CODE_NM').val(subPopUpData.CMMN_DETAIL_CODE_NM);

		$('#subPopUp').data("kendoWindow").close();
	});
</script>
</body>
</html>