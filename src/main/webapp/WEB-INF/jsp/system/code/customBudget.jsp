<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/system/code/customBudget.js?v=${today}"/></script>


<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">임시예산코드등록</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">시스템관리 &gt; 코드관리 > 임시예산코드등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
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