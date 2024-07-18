<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/bankCodeViewPop.js?v=${today}'/>"></script>

<style>

</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="tmpBankNm" value="${params.bankNm}" />
<div class="col-lg-12 pop_sign_wrap" style="width:500px; padding:0;">
	<div class="card-header pop-header">
		<h3 class="card-title title_NM">금융기관 코드</h3>
	</div>
	<div id="bankCodeView" style="margin: 10px;">

	</div>
</div>
<script>
	bankCodeViewPop.fn_defaultScript();
</script>
</body>
