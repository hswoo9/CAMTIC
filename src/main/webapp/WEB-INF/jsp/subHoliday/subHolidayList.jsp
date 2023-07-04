<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayList.js?v=${toDate}"/></script>
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid tbody, .k-grid tfoot, .k-grid thead {
    text-align: center;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴가관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 휴가관리 &gt; 휴가관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>조회년도</span>
                                    <input id="datePicker" style="width:150px;">
                                </div>
                                <div>
                                    <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="subHolidayList.subHolidayReqPop();">신청</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="4%" >
                                <col width="7%" >
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
                                <col width="4%" >
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colspan="6">연가(사용기간)</th>
                                    <th rowspan="3">병가</th>
                                    <th rowspan="3">공가</th>
                                    <th rowspan="3">경조휴가</th>
                                    <th rowspan="3">출산휴가</th>
                                    <th colspan="3">대체휴가</th>
                                    <th rowspan="3">근속<br>포상휴가</th>
                                    <th rowspan="3">휴일근로</th>
                                </tr>
                                <tr>
                                    <th rowspan="2">발생</th>
                                    <th rowspan="2">전 전년 사용</th>
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
                            <tbody>
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
            <h4 class="panel-title">휴가사용내역</h4>
        </div>

        <div class="panel-body">
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <div style="display:flex; justify-content: space-between;">
                            <div style="display:flex;">
                                <div class="mr20">
                                    <span style=" margin-left: 900px">신청 구분</span>
                                    <input type="text" id="edtHolidayKindTop" name="edtHolidayKindTop" required="required" style="width:150px;">
                                </div>
                                <div>
                                    <span>상태</span>
                                    <input type="text" id="status" style="width: 150px;">
                                </div>
                                <%--<div style="margin-left:10px;">
                                    <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayList.gridReload()">검색</button>
                                    &lt;%&ndash;<input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick="subHolidayList.gridReload()"/>&ndash;%&gt;
                                </div>--%>
                            </div>
                        </div>
                    </tr>
                </table>
            </div>
            <div id="mainGrid" style="margin:20px 0;"></div>
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