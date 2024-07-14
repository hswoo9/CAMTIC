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
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budgetChoicePop.js?v=${today}'/>"></script>

<style>

</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="budgetSn" value="${params.budgetSn}"/>

<div class="col-lg-12 pop_sign_wrap" style="width:1200px; padding:0;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">예산과목 선택</h3>
    </div>
    <div style="margin: 0 10px 0 10px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="25%">
                <col width="20%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th class="text-center th-color">회계연도</th>
                <td>
                    <input type="text" id="fromMonth" style="width: 200px;">
                </td>
                <th class="text-center th-color">보조비목세목명</th>
                <td style="display: flex;justify-content: space-between;">
                    <input type="text" id="bgNm" class="k-input" name="bgNm" style="width: 250px;">
                    <button type="button" id="reqBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base">
                        <span class="k-button-text">검색</span>
                    </button>
                </td>
            </tr>
            </thead>
        </table>
    </div>

    <div id="budgetChoice" style="margin: 10px;">

    </div>
</div>
<script>
    budgetChoicePop.fn_defaultScript();
</script>
</body>
