<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/deposit/depoBudgetViewPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>

<link rel="stylesheet" type="text/css" href='/css/pop/contents.css'>
<link rel="stylesheet" type="text/css" href='/css/pop/common.css'>

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
<input type="hidden" id="idx" value="${params.idx}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<%--<input type="hidden" id="mgtCd" value="${data.PJT_CD}" />--%>
<input type="hidden" id="pjtCd" value="${params.pjtCd}" />
<input type="hidden" id="status" value="${params.status}" />
<div>
	<div class="card-header pop-header">
		<h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    예산 선택
                </span>
		</h3>
		<div id="purcBtnDiv" class="btn-st popButton">
			<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
		</div>
	</div>

	<div class="" style="padding: 10px">


		<span>
            <input type="radio" id="budgetA" name="budgetType" value="1" checked="checked" onclick="depoBgtMng.budgetMainGrid();">
            <label for="budgetA">수입예산</label>
            <input type="radio" id="budgetB" name="budgetType" value="2" style="margin-left:10px;" onclick="depoBgtMng.budgetMainGrid();">
            <label for="budgetB">지출예산</label>
        </span>
		<%--        <button type="button" id="budgetAddBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="bgView.fn_popBudgetAdd()">등록</button>--%>
		<div id="budgetMainGrid"></div>
	</div>
</div>

<script>
	depoBgtMng.fn_defaultScript();
</script>