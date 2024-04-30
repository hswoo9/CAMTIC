<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowComSpace" pattern="yyyy. MM. dd" />
<fmt:formatDate value="${now}" var="nowCom" pattern="yyyy.MM.dd" />
<fmt:formatDate value="${now}" var="nowHyphen" pattern="yyyy-MM-dd" />
<fmt:formatDate value="${now}" var="nowSlash" pattern="yyyy/MM/dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/employmentPop.js?v=1'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<style>
    .pop_head {height: 32px; position: relative; background: #1385db;}
    .pop_head h1 {font-size: 12px; color: #fff; line-height: 32px; padding-left: 16px; margin: 0;}
    #docControlBtnDiv{float: right; margin: 3px 5px 0 0;}
</style>
<body>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">연봉근로계약서 조회</h3>
        <div class="btn-st popButton" id="popBtnDiv">
            <button type="button" class="k-button k-button-solid-base" onclick="employmentPop.getPdfFileDown()">PDF 저장</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div style="padding: 20px;" id="test">
        <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>
    </div>

<script type="text/javascript">
    let params = JSON.parse('${params}');
    const serverName = '${pageContext.request.serverName}';
    employmentPop.init();
</script>
</body>
</html>