<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmMemSel.js?v=${today}'/>"></script>

<div style="padding:0;">
    <input type="hidden" id="crmSn" value="${params.crmSn}">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;">담당자 선택</span>
            </h3>

        </div>
        <div>
            <div id="memGrid" style="margin-top: 5px;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">
    cms.fn_defaultScript();
</script>
</body>
</html>