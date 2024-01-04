<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<%--<style>
    table { background-color: #00000008; }
</style>--%>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">단기간 근무직원 인사정보 등록</h3>
            <div>
                <input type="hidden" id="chkType" value="${params.chkType}" />
                <button type="button" class="k-button k-button-solid-info" style="margin-top: 8px;" onclick="">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;margin-top: 8px;" onclick="">닫기</button>
            </div>
        </div>
    </div><!--table-responsive-->
</div><!--col-lg-12-->

</body>
</html>
