<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/organizationHistoryPop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/userManage/historyInfo.js?v=${today}"/></script>

<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div>
        <div class="panel">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">직제이력관리</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="organizationHistory.fu_addInfo()">추가</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="organizationHistory.fn_windowClose()">닫기</button>
                </div>
            </div>
            <div style="padding: 20px 10px;">
                <div class="col-md-9 col-lg-9" style="max-width: 100%;">
                    <div id="mainGrid"></div>
                </div>
            <%--<table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="55%">
                    <col width="15%">
                    <col width="20%">
                </colgroup>
                <thead>
                <tr>
                    <th>순번</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                </tr>
                &lt;%&ndash;<c:forEach var="l" items="${eList}" varStatus="status">&ndash;%&gt;
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                &lt;%&ndash;</c:forEach>&ndash;%&gt;
            </table>--%>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    organizationHistory.fn_defaultScript();
</script>
</body>
</html>