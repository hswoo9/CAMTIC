<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budget/budgetHistPop.js?v=${today}'/>"></script>
<style>

</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="pjtBudgetSn" value="${params.key}" />
<input type="hidden" id="pjtBudgetType" value="${params.type}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;" id="bgTitle">
                변경이력
            </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 13px">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="panel-body">
        <div id="mainGrid" style="margin: 20px 0;"></div>
    </div>

</div>

<script>
    budgetHist.fn_defaultScript();
</script>