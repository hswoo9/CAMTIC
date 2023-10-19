<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    table { background-color: white;}
</style>

<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/workPlan/workPlan.js?v=${today}"/></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">유연근무신청</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 유연근무 > 유연근무신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div class="table-responsive" style="margin-bottom:10px;">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tbody>
                    <tr>
                        <td>
                            <div>
                                <span class="pdr5">조회기간</span>
                                <input type="text" id="startDay" onchange="dateValidationCheck('startDay', this.value)" style="width: 15%;">
                                ~
                                <input type="text" id="endDay" onchange="dateValidationCheck('endDay', this.value)" style="width: 15%; margin-right: 10px;">
                                <span class="pdr5 pdl3per">성명</span>
                                <input type="text" id="titleContent" style="width: 200px; margin-right: 10px;" value="">
                                <span class="pdr5 pdl3per">진행 상태</span>
                                <input type="text" id="status" style="width: 15%; margin-right:10px;">
                                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="workPlan.gridReload();">
                                    <span class="k-icon k-i-search k-button-icon"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>



            <div class="table-responsive">
                <div id="spclVacManageTabStrip">
                    <ul>
                        <li class="k-state-active">목록</li>
                        <li>캘린더</li>
                    </ul>
                    <div>
                        <div id="mainGrid" style="margin-top: 10px">
                        </div>
                    </div>
                    <div>
                        <div id="schedulerDiv" style="margin:10px auto;">
                            <div id="team-schedule" style="float: left">
                            </div>
                            <div id="scheduler"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvalService.jsp?v=${today}"></jsp:include>--%>
<script type="text/javascript">

</script>