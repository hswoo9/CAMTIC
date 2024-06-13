<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayAdmin.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">
<input type="hidden" id="apprMngStat" value="M">

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴가 신청 내역(관리자)</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 휴가관리 &gt; 휴가신청내역(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="8%">
                        <col>
                        <col width="8%">
                        <col>
                        <col width="8%">
                        <col>
                        <col width="8%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="startDate" style="width: 110px;"> ~
                            <input type="text" id="endDate" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">휴가 구분</th>
                        <td>
                            <input type="text" id="edtHolidayKindTop" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="status" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width:80px;">
                            <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayAdmin.gridReload()}" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    subHolidayAdmin.init();
</script>