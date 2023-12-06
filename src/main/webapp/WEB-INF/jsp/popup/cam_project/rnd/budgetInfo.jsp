<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndBudget.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="mgtCd" value="${data.PJT_CD}" />
<div style="padding: 10px">
    <div class="table-responsive">
        <%--<button type="button" id="budgetAddBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="rndBg.fn_popBudgetAdd()">등록</button>--%>
        </br>
        <span id="budgetType"></span>
        </br>
        <span style=""> ※ 수입 예산</span>
        <div id="budgetMainGrid"></div>
            <div style="margin-top: 20px;"></div>
        <span style=""> ※ 지출 예산</span>
        <div id="budgetMainGrid2"></div>
    </div>
</div>

<script>
    var inParameters = JSON.parse('${map}');

    rndBg.fn_defaultScript(inParameters);
</script>