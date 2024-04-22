<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationEmpListPop.js?v=${today}"></script>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">


<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>
<input type="hidden" id="bsYear" value="${params.bsYear}"/>
<input type="hidden" id="key" value="${params.key}"/>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="duty" value="${loginVO.dutyCode}"/>
<%--<input type="hidden" id="duty" value="${empData.DUTY_CODE}"/>--%>
<input type="hidden" id="deptSeq" value="${empData.DEPT_SEQ}"/>

<input type="hidden" id="occupation" value="${empData.OCCUPATION_NM}"/>
<input type="hidden" id="pDeptSeq" value="${empData.PARENT_DEPT_SEQ}"/>



<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <c:if test="${params.key =='1'}">
                <h3 class="card-title title_NM">1차 역량평가</h3>
            </c:if>
            <c:if test="${params.key =='2'}">
                <h3 class="card-title title_NM">2차 역량평가</h3>
            </c:if>
        </div>
      <%--  <div class="col-md-12 col-lg-12 dash-left">
            <div id="mainGrid"></div>
        </div>--%>
    </div>
</div>



<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel" id="mainCard">
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div>




<script>
    evaluationEmpListPop.fn_defaultScript();
</script>
</body>
</html>