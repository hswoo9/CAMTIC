<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayStat.js?v=${today}"/></script>

<style>
    .highlight:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>

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
            <h4 class="panel-title">휴가 사용 현황</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 휴가관리 &gt; 휴가사용현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                        <col width="10%">
<%--                        <col width="10%">--%>
<%--                        <col width="10%">--%>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="holidayYear" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="sDeptSeq" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="sDeptTeamSeq" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width: 100px;">
                            <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayStat.gridReload()}" style="width: 120px;">
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <style>
                                label {
                                    position: relative;
                                    top: -1px;
                                }
                            </style>
                            <div class="mt10">
                                <input type="checkbox" class="detailSearch" id="dsA" checked>
                                <label for="dsA">전담직원</label>
                                <input type="checkbox" class="detailSearch" division="1" divisionSub="6" style="margin-left: 10px;" id="dsC">
                                <label for="dsC">위촉직원</label>
                                <input type="checkbox" class="detailSearch" division="3" style="margin-left: 10px;" id="dsB">
                                <label for="dsB">단기직원</label>
                                <input type="checkbox" class="detailSearch" division="4" divisionSub="3" style="margin-left: 10px;" id="dsD">
                                <label for="dsD">시설/환경</label>
                                <input type="checkbox" class="detailSearch" division="2" style="margin-left: 10px;" id="dsG">
                                <label for="dsG">연수생/학생연구원</label>
                                <input type="checkbox" class="detailSearch" division="10" style="margin-left: 10px;" id="dsE">
                                <label for="dsE">기타</label>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>

                <div id="detailGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    subHolidayStat.init();
</script>