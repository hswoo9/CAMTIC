<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<link href="/css/schedule/fullcalendar.min.css" rel="stylesheet" />
<link href="/css/schedule/styleA.css" rel="stylesheet" />
<script type="text/javascript" src="/js/intra/inside/bustrip/meetingRoomReq.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<style>
    .fc-unthemed .fc-today {
        background: #fcf8e3 !important;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">회의실 사용 신청</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 회의실관리 > 회의실 사용 신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">--%>
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                    </colgroup>
                    <tr>
<%--                        <th class="text-center th-color">조회 연월</th>--%>
<%--                        <td>--%>
<%--                            <input type="text" id="datePicker" style="width: 110px;">--%>
<%--                        </td>--%>
                        <th class="text-center th-color">회의실 구분</th>
                        <td>
                            <input type="text" id="meetingRoomDivision" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">사용 목적</th>
                        <td>
                            <input type="text" id="usePurpose" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">대관료</th>
                        <td>
                            <input type="text" id="rentalFee" style="width: 70px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchDivision" style="width: 100px;">
                            <input type="text" id="name" onkeypress="if(event.keyCode==13){ gridReload(); }" style="width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="10" style="text-align: right">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">
                                조회
                            </button>
                            <button type="button" id="searchRebutton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                                검색 초기화
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="meetingRoomReq.roomStatPop();">
                                통계 조회
                            </button>
                            <button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="meetingRoomReq.meetingRoomPop();">
                                회의실 사용 신청
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="table-responsive">
                <div id="spclVacManageTabStrip">
                    <ul>
                        <li>목록</li>
                        <li class="k-state-active">캘린더</li>
                    </ul>
                    <div>
                        <div id="mainGrid" style="margin-top: 10px">
                        </div>
                    </div>
                    <div>
                        <div id="schedulerDiv" style="margin:10px auto;">
                            <div id="team-schedule" style="float: left">
                            </div>

                            <div id="calendar" class="app-fullcalendar"></div>


                            <div id="scheduler"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<%--        <div class="panel-body">
            <div class="table-responsive">
                <div id="scheduler"></div>
            </div>
        </div>--%>
    </div>
</div><!-- col-md-9 -->

<script src="/js/schedule/global.min.js"></script>
<script src="/js/schedule/custom.min.js"></script>
<script src="/js/schedule/jquery-ui.min.js"></script>
<script src="/js/schedule/moment.min.js"></script>
<script src="/js/schedule/fullcalendar.min.js"></script>
<script src="/js/schedule/fullcalendar-meetingRoom-init.js?v=${today}"></script>
<script type="text/javascript">
    jQuery.noConflict();
    meetingRoomReq.init();
    meetingRoomReq.refresh();
</script>