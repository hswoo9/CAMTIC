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
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/kukgohCommCodeViewPop.js?v=${today}'/>"></script>

<style>

</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:500px; padding:0;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">공통코드 선택</h3>
    </div>
    <div style="margin: 0 10px 0 10px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <thead>
            <tr>
                <th class="text-center th-color">대분류명</th>
                <td style="display: flex;justify-content: space-between;">
                    <input type="text" id="budgetGroup" name="budgetGroup" style="width: 250px;">
                    <button type="button" id="reqBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="kukgohCommCodeViewPop.mainGrid()">
                        <span class="k-button-text">검색</span>
                    </button>
                </td>
            </tr>
            </thead>
        </table>
    </div>
    <div id="codeView" style="margin: 10px;">

    </div>
</div>
<script>
    kukgohCommCodeViewPop.fn_defaultScript();
</script>
</body>
