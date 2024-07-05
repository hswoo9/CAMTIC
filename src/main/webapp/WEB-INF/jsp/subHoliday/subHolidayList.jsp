<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />


<meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT" />
<!-- 캐시를 바로 만료시킴. -->
<meta http-equiv="Expires" content="-1" />
<!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.0) -->
<meta http-equiv="Pragma" content="no-cache" />
<!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.1) -->
<meta http-equiv="Cache-Control" content="no-cache" />

<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayList.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴가 신청</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 휴가관리 &gt; 휴가신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="80%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td style="border-right: none">
                            <input id="datePicker" style="width:110px;">
                        </td>
                        <td style="border: none; float: right">
                            <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="subHolidayList.subHolidayReqPop();">신청</button>
                        </td>
                    </tr>
                </table>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="popTable table table-bordered">
                            <colgroup>
                                <col width="4%" >
<%--                                <col width="7%" >--%>
                                <col width="7%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="4%" >
                                <col width="4%" >
                                <col width="4%" >
                                <col width="4%" >
                                <col width="4%" >
                                <col width="4%" >
                                <col width="4%" >
                                <col width="6%" >
<%--                                <col width="4%" >--%>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colspan="5">연가(사용기간)</th>
                                    <th rowspan="3">병가</th>
                                    <th rowspan="3">공가</th>
                                    <th rowspan="3">경조휴가</th>
                                    <th rowspan="3">출산휴가</th>
                                    <th colspan="3">대체휴가</th>
                                    <th rowspan="3">근속<br>포상휴가</th>
<%--                                    <th rowspan="3">휴일근로</th>--%>
                                </tr>
                                <tr>
                                    <th rowspan="2">발생</th>
<%--                                    <th rowspan="2">전 전년 사용</th>--%>
                                    <th rowspan="2">전년 사용</th>
                                    <th colspan="2">금년 사용</th>
                                    <th rowspan="2">잔여</th>
                                    <th rowspan="2">발생일수</th>
                                    <th rowspan="2">사용일수</th>
                                    <th rowspan="2">잔여일수</th>
                                </tr>
                                <tr>
                                    <th>연가</th>
                                    <th>반가</th>
                                </tr>
                            </thead>
                            <tbody id="holyBody">
                                <tr>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>

    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">휴가 사용 내역</h4>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">신청 구분</th>
                        <td>
                            <input type="text" id="edtHolidayKindTop" name="edtHolidayKindTop" required="required" style="width:200px;">
                        </td>
                        <th class="text-center th-color">연도</th>
                        <td>
<%--                            <input type="text" id="startDate" style="width: 110px;"> ~--%>
<%--                            <input type="text" id="endDate" style="width: 110px;">--%>
                            <input type="text" id="baseYear" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">처리상태</th>
                        <td>
                            <input type="text" id="status" style="width: 200px;">
                        </td>
                    </tr>
                </table>
            </div>
            <div id="vacUseHistMainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<form id="subHolidayDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="subHoliday">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="subHolidayId" name="subHolidayId" value=""/>
</form>

<script type="text/javascript">
    subHolidayList.init();
</script>