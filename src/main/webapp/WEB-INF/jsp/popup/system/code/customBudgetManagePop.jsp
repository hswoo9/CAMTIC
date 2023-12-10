<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/system/code/customBudgetManagePop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="budgetType" name="budgetType" value="${params.budgetType}">
<input type="hidden" id="cbUpperCode" name="cbUpperCode" value="${params.cbUpperCode}">
<input type="hidden" id="cbCodeId" name="cbCodeId" value="${params.cbCodeId}">
<input type="hidden" id="mod" name="mod" value="${params.modify}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM" id="titleNM"> 추가</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="customBudgetManagePop.setCustomBudget()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead id="addCodeTbody">
                <%--<tr>
                    <th colspan="4" id="titleName">카테고리 추가</th>
                </tr>--%>
                </thead>
            </table>
        </div>
    </div>
</div>

<script>
    customBudgetManagePop.fn_defaultScript();
</script>
</body>