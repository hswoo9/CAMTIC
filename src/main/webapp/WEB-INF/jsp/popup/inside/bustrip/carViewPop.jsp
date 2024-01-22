<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<link href="/css/schedule/fullcalendar.min.css" rel="stylesheet" />
<link href="/css/schedule/styleA.css" rel="stylesheet" />

<link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/carViewPop.js?v=${toDate}"/></script>
<style>
    .fc .fc-row .fc-content-skeleton table, .fc .fc-row .fc-content-skeleton td, .fc .fc-row .fc-helper-skeleton td {
        border-color: #eaeaea;
    }
</style>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<body class="font-opensans" style="background-color:#fff;">

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">차량 사용 조회</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div class="table-responsive" style="margin-top: 20px;">
            <div id="calendar" class="app-fullcalendar"></div>
        </div>
    </div>
</div>

<script src="/js/schedule/global.min.js"></script>
<script src="/js/schedule/custom.min.js"></script>
<script src="/js/schedule/jquery-ui.min.js"></script>
<script src="/js/schedule/moment.min.js"></script>
<script src="/js/schedule/fullcalendar.min.js"></script>
<script src="/js/schedule/fullcalendar-car-init.js?v=${today}"></script>
<script src="locales/ko.js"></script>

<script>
    jQuery.noConflict();
    carList.fn_defaultScript();
    carList.refresh();
</script>
</body>
</html>