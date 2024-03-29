<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<script type="text/javascript" src="/js/intra/cam_project/customBudgetPop.js?v=${today}"/></script>
<style>
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="ac" value="${params.ac}" />
<input type="hidden" id="path" value="${params.path}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />


<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">사업비 등록</span>
            </h3>
        </div>
        <div class="panel-body" style="padding-bottom: 0;">
                <div class="col-md-4 col-lg-4" style="padding-left: 0;">
                    장
                    <div id="customBudgetGridA" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    <div style="display: flex; justify-content: space-between">
                        관 <div style="position: relative; bottom: 2px;">
                            검색: <input id="mediumValue" style="width: 150px" onkeypress="if(event.keyCode==13){customBudgetPop.gridReload2('customBudgetGridA')}">
                        </div>
                    </div>
                    <div id="customBudgetGridB"></div>
                </div>
                <div class="col-md-4 col-lg-4" style="padding-right: 0;">
                    <div style="display: flex; justify-content: space-between">항 <div style="position: relative; bottom: 2px;">검색: <input id="smallValue" style="width: 150px" onkeypress="if(event.keyCode==13){ customBudgetPop.gridReload2('customBudgetGridB'); }"></div></div>
                    <div id="customBudgetGridC"></div>
                </div>
        </div>
        <div class="panel-body" style="padding-top: 0;">
            <div id="tempBudgetGrid"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    customBudgetPop.fnDefaultScript();
</script>
</body>
</html>