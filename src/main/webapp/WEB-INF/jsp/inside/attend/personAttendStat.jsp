<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/attend/personAttendStat.js?v=${today}"/></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직원근태내역</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 근태관리 &gt; 직원근태내역</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div style="margin-bottom:10px;">
                    <table class="searchTable table table-bordered mb-0" style="margin-bottom: 0">
                        <colgroup>
                            <col style="width: 8%">
                            <col style="width: 20%;">
                            <col style="width: 8%">
                            <col style="width: 16.4%;">
                            <col style="width: 8%">
                            <col>
                        </colgroup>
                        <tr>
                            <th class="text-center th-color">조회 기간</th>
                            <td>
                                <input type="text" id="startDt" style="width: 130px;"> ~
                                <input type="text" id="endDt" style="width: 130px;">
                            </td>
                            <th class="text-center th-color">부서</th>
                            <td>
                                <input type="text" id="dept" style="width: 150px;">
                            </td>
                            <th class="text-center th-color">팀</th>
                            <td>
                                <input type="text" id="team" style="width: 200px;">
                            </td>
                        </tr>
                    </table>

                    <table class="searchTable table table-bordered mb-0" id="noneDiv">
                        <colgroup>
                            <col style="width: 8%">
                            <col style="width: 20%">
                            <col style="width: 8%">
                            <col style="width: 16.4%">
                            <col style="width: 8%">
                            <col>
                        </colgroup>
                        <tr>
                            <th class="text-center th-color">근태 항목</th>
                            <td>
                                <input type="text" id="attendanceItems" style="width: 150px">
                            </td>
                            <th class="text-center th-color">성명</th>
                            <td>
                                <input type="text" id="name" style="width: 200px;">
                            </td>
                            <th class="text-center th-color">직원 구분</th>
                            <td>
                                <input type="text" id="staffDivision" style="width: 200px;">
                            </td>
                        </tr>
                    </table>
                </div>
                <h4 class="panel-title">* 부서</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="9%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                            </colgroup>
                            <thead>
                            <tr>
                                <th>부서</th>
                                <th>정상출근</th>
                                <th>지각</th>
                                <th>연가</th>
                                <th>오전반차</th>
                                <th>오후반차</th>
                                <th>병가</th>
                                <th>공가</th>
                                <th>경조휴가</th>
                                <th>출산휴가</th>
                                <th>선택근로</th>
                                <th>출장</th>
                                <th>대체휴가</th>
                                <th>휴일근로</th>
                            </tr>
                            </thead>
                            <tbody class="addRow">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                    <h4 class="panel-title">* 근태 현황</h4>
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    personAttendStat.fn_defaultScript();
</script>