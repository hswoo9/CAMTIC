<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/popCrmList.js?v=${today}"/></script>
<input type="hidden" id="status" value="${params.status}" />
<input type="hidden" id="mouKey" value="${params.key}" />

<input type="hidden" id="idx" value="${params.idx}" />

<input type="hidden" id="popType" value="${params.type}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">업체 선택</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" id="saveBtn" class="k-button k-button-solid-base" onclick="popCrmList.fn_crmRegPopup()">업체추가</button>
            </div>

        </div>
        <div>
            <div id="popMainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div>
<script type="text/javascript">
    popCrmList.fn_deafultScript();
</script>
</body>
</html>