<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<link href="/css/schedule/fullcalendar.min.css" rel="stylesheet" />
<link href="/css/schedule/styleA.css" rel="stylesheet" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/carReq.js?v=${today}"/></script>
<style>
    .fc-event{
        cursor: pointer !important;
    }

    .fc .fc-row .fc-content-skeleton table, .fc .fc-row .fc-content-skeleton td, .fc .fc-row .fc-helper-skeleton td {
        border-color: #eaeaea;
    }

    .fc-unthemed .fc-today {
        background: #fcf8e3 !important;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">차량사용신청</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 차량관리 > 차량사용신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <%--<th class="text-center th-color">조회 연월</th>
                        <td>
                            <input type="text" id="carReqDt" style="width: 110px;">
                        </td>--%>
                        <th class="text-center th-color">사용 차량</th>
                        <td>
                            <input type="text" id="carClass" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">운행 구분</th>
                        <td>
                            <input type="text" id="carType" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchWordType" style="width: 130px;">
                            <input type="text" id="enterSearch" onkeypress="if(event.keyCode==13){ carList.refresh(); }" style="width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="8" style="text-align: right">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="carList.refresh();">
                                <span>조회</span>
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                                검색 초기화
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="carList.carStatPop();">
                                통계 조회
                            </button>
                            <button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="carList.carPopup();">
                                차량 사용 신청
                            </button>
                        </td>
                    </tr>
                </table>
            </div>

            <div id="calendar" class="app-fullcalendar"></div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script src="/js/schedule/global.min.js"></script>
<script src="/js/schedule/custom.min.js"></script>
<script src="/js/schedule/jquery-ui.min.js"></script>
<script src="/js/schedule/moment.min.js"></script>
<script src="/js/schedule/fullcalendar.min.js"></script>
<script src="/js/schedule/fullcalendar-car-init.js?v=${today}"></script>
<script type="text/javascript">
    jQuery.noConflict();
    carList.fn_defaultScript();
    carList.refresh();
</script>