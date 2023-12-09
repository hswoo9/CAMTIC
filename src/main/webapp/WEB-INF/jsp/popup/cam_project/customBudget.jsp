<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_project/customBudget.js?v=${today}"/></script>
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="path" value="${params.path}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />



<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">예산 등록</span>
            </h3>
        </div>
        <div class="panel-body">
            <div>
                <div class="col-md-4 col-lg-4">
                    장
                    <div id="customBudgetGridA" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    관
                    <div id="customBudgetGridB" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    항
                    <div id="customBudgetGridC" style="margin:10px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    customBudget.fnDefaultScript();
</script>
</body>
</html>