<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationEmpListPop.js?v=${today}"></script>

<form name="evalForm2">
    <input type="hidden" id="evalSn" name="pk" value="${params.pk}"/>
    <input type="hidden" id="bsYear" name="bsYear" value="${params.bsYear}"/>
    <input type="hidden" id="key" name="key" value="${params.key}"/>
    <input type="hidden" id="evalEmpSeq" name="evalEmpSeq" value="${loginVO.uniqId}"/>
    <input type="hidden" id="empSeq" name="empSeq" value=""/>
    <input type="hidden" id="duty" name="duty" value="${loginVO.dutyCode}"/>
    <input type="hidden" id="deptSeq" name="deptSeq" value="${empData.DEPT_SEQ}"/>
    <input type="hidden" id="occupation" name="occupation" value="${empData.OCCUPATION_NM}"/>
    <input type="hidden" id="pDeptSeq" name="pDeptSeq" value="${empData.PARENT_DEPT_SEQ}"/>
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <c:if test="${params.key =='1'}">
                <h3 class="card-title title_NM">1차 역량평가</h3>
            </c:if>
            <c:if test="${params.key =='2'}">
                <h3 class="card-title title_NM">2차 역량평가</h3>
            </c:if>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="btnActive2" onclick="evaluationEmpListPop.saveDataAll(10)">일괄제출</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
    </div>
</div>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <div id="evalContent" style="display: flex; justify-content: center;">

                </div>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    evaluationEmpListPop.fn_defaultScript();
</script>
