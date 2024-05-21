<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/cam_mng/invoicePage.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<%--
<script type="text/javascript" src='<c:url value="/js/ac/acUtil.js"></c:url>'></script>
<script type="text/javascript" src="<c:url value='/js/jquery.form.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/jszip.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/shieldui-all.min.js' />"></script>--%>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
	<div class="table-responsive">
		<div class="card-header pop-header">
			<h3 class="card-title title_NM">세금계산서</h3>
			<div class="btn-st popButton">
				<button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="">전송</button>
				<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="">전송취소</button>
				<button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
			</div>
		</div>
		<div id="kukgohInvoiceInsertGrid" style="margin-top: 30px;">

		</div>
	</div>
</div>

<script>
	invoicePage.fn_defaultScript();
	// 세금계산서 그리드

</script>
</body>
</html>