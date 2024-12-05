<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/bustInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/bustrip/bustripList.js?v=${today}'/>"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResult.js?v=${today}"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    .k-footer-template td:nth-child(11) {
        overflow: visible;
        white-space: nowrap;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6),
    .k-footer-template td:nth-child(7),
    .k-footer-template td:nth-child(8),
    .k-footer-template td:nth-child(9),
    .k-footer-template td:nth-child(10),
    .k-footer-template td:nth-child(11),
    .k-footer-template td:nth-child(12) {
        border-width: 0;
    }

    .fc-row.fc-week.fc-widget-content {
        height: 110px;
    }

    #calendar.fc .fc-toolbar .fc-today-button,
    #calendar.fc .fc-toolbar .fc-state-default {
        background: #f5f5f5;
        color: #808488;
        padding: 4px 10px;
        height: auto;
        border: 1px solid;
        border-color: #e6e6e6 #e6e6e6 #bfbfbf;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
        text-shadow: 0 1px 1px rgba(255,255,255,.75);
    }

    #calendar.fc .fc-toolbar .fc-center h2 {
        font-weight: bold;
    }

    .fc-event{
        cursor: pointer !important;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="teamType" value="${params.teamType}"/>

<div style="padding: 10px">
    <div id="btnDiv" style="background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="radioSelectType"></span>
    </div>

    <div id="selectType1">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="bustInfo.fn_save()">저장</button>
        <button type="button" id="bustReqBtn" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-info" onclick="bustInfo.bustripReqPop('${params.pjtSn}')">출장신청</button>

        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>상담내용
                </th>
                <td colspan="3">
                    <textarea id="contEtc" style="width: 100%;" disabled></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출장정보
                </th>
                <td colspan="3">
                    <input type="text" id="bustripReq" disabled style="width: 90%;">
                    <input type="hidden" id="hrBizReqResultId" />
                    <input type="hidden" id="hrBizReqId"/>
                    <button type="button" id="searchBustrip" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustInfo.fn_popBustrip();">
                        조회
                    </button>
                </td>
            </tr>
            </thead>
        </table>

        <br>
        <span style=""> ※ 출장 정보</span>
        <div id="bustripMainGrid"></div>
    </div>

    <div id="selectType2" style="display: none;">
        <div id="calendar" class="app-fullcalendar"></div>
    </div>

    <div id="selectType3" style="display: none;">
        <div>
            <div id="stateMainGrid" style="margin:20px 0;"></div>

            <div id="stateMainHistGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>

<link href="/css/schedule/fullcalendar.min.css" rel="stylesheet" />
<link href="/css/schedule/styleA.css" rel="stylesheet" />

<script src="/js/schedule/global.min.js"></script>
<script src="/js/schedule/custom.min.js"></script>
<script src="/js/schedule/jquery-ui.min.js"></script>
<script src="/js/schedule/moment.min.js"></script>
<script src="/js/schedule/fullcalendar.min.js"></script>
<script src="/js/schedule/fullcalendar-bustrip-init.js?v=${today}"></script>
<script>
    jQuery.noConflict();
    bustInfo.fn_defaultScript();
    bustInfo.refresh();
</script>