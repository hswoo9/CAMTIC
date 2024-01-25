
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">유연근무신청</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info request" id="saveBtn" onclick="workPlanApprovalPop.fn_save();">저장</button>
                <button type='button' class='k-button k-button-md k-button-solid k-button-solid-info drafting' onclick='' style="display: none">
                    <span class='k-icon k-i-track-changes-accept k-button-icon'></span>
                    <span class='k-button-text'>상신</span>
                </button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="">닫기</button>
            </div>
        </div>
        <form id="subHolidayReqPop" style="padding: 20px 30px;">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <input type="hidden" id="apprStat" value="N">
            <input type="hidden" id="code" value="${code}">
            <table class="popTable table table-bordered mb-0" id="holidayPlanReqPopTb" style="margin-top: 10px;">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th>사번</th>
                    <td>
                        <input type="text" id="empSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
                    </td>
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>부서명</th>
                    <td>
                        <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;">
                    </td>
                    <th>직급</th>
                    <td>
                        <c:if test="${loginVO.dutyNm != null && loginVO.dutyNm != ''}">
                            <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.dutyNm}" style="width: 80%;">
                        </c:if>
                        <c:if test="${loginVO.dutyNm == null || loginVO.dutyNm == ''}">
                            <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.positionNm}" style="width: 80%;">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>신청구분</th>
                    <td colspan="3">
                        <span id="workTimeType"></span>
                    </td>
                </tr>
                </thead>
            </table>
            <table class="popTable table table-bordered mb-0" id="holidayPlanReqPopTbVal" style="margin-top: 0px;">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">사유</th>
                    <td colspan="3">
                        <textarea name="workReason" id="workReason" rows="5"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청기간</th>
                    <td colspan="3">
                        <input type="text" id="startDate" style="width: 20%;"> ~ <input type="text" id="endDate" style="width: 20%;">
                        <span style="color : red;margin-left: 10px;">* 선택근로제도 운영기준 최소 1주일 ~ 최대 1개월 단위로 신청</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청일</th>
                    <td colspan="3">
                        <input type="date" id="applyDate" style="width: 20%;"><span style="margin-left: 10px;">(선택근로 시작 3일전까지 부서장 승인)</span>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>

<form id="subHolidayDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="subHoliday">
    <input type="hidden" id="type" name="type" value="${type}">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="subHolidayId" name="subHolidayId" value=""/>
</form>

<script type="text/javascript" src="/js/intra/inside/workPlan/workPlanApprovalPop.js?v=${today}"></script>
<script>
    workPlanApprovalPop.init();
</script>
</body>
