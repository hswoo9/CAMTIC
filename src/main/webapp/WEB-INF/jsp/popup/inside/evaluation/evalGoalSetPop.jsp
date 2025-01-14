
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowYear" pattern="yyyy" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalGoalSetPop.js?v=${today}"></script>
<style>
    .pink{background-color: #fce4d6 !important;font-weight: bold;text-align: center;}
    .yellow{background-color: #fff2cc !important;font-weight: bold;text-align: center;}
    .green{background-color: #e2efda !important;font-weight: bold;text-align: center;}
    .blue{background-color: #ddebf7 !important;font-weight: bold;text-align: center;}
    .orange{background-color: #ffcc99 !important;font-weight: bold;text-align: center;}
    .numberInput {
        text-align: right;
    }
</style>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">업적평가 - 개인별 목표설정</h3>
            <div class="btn-st popButton">
                <span id="holiApprBtnBox">

                </span>
                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="evalGoalSetPop.setEmpEvalGoalSet()">
                   <span class="k-icon k-i-track-changes-accept k-button-icon"></span>
                   <span class="k-button-text">상신</span>
                </button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="evalGoalSetPop.fn_topTableClose()">닫기</button>
            </div>
        </div>
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptComp" name="deptComp" value="${loginVO.deptId}">
        <input type="hidden" id="deptTeam" name="deptTeam" value="${loginVO.teamId}">
        <input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
        <input type="hidden" id="nowYear" value="${nowYear}"/>


        <input type="hidden" id="targetId" value="" />
        <table class="popTable table table-bordered mb-0" id="holidayPlanReqPopTb" style="margin-top: 10px;">
            <colgroup>
                <col width="15%">
                <col width="20%">
                <col width="15%">
                <col width="20%">
                <col width="15%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th>부서명</th>
                <td>
                    <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;">
                </td>
                <th>직위</th>
                <td>
                    <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}" style="width: 80%;">
                </td>
                <th>성명</th>
                <td>
                    <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;">
                </td>
            </tr>
            <tr>
                <th>실적기준</th>
                <td colspan="5">
                    <input type="text" id="baseYear" style="width: 8%;"> 년
                </td>
            </tr>
            <tr>
                <th>작성방법</th>
                <td colspan="5">
                    <span class="baseYear"></span>년 부서 수립 목표 내 개인별 목표 설정, 팀의 목표 총액과 개인별 목표 총액의 합이 일치해야 함.
                </td>
            </tr>
            </thead>
        </table>

        <div class="card-header" style="padding: 5px;">
            <h3 class="card-title">평가항목</h3>
        </div>
        <table class="popTable table table-bordered mb-0" style="margin-top: 10px;">
            <colgroup>
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th>평가항목</th>
                <th>수주금액</th>
                <th>매출</th>
                <th>이익</th>
            </tr>
            <tr>
                <td class="text-center" style="padding-top: 11px;padding-bottom: 11px;">
                    <b>구분</b>
                </td>
                <td class="text-center" style="padding-top: 11px;padding-bottom: 11px;">개별 OR 팀 공통</td>
                <td colspan="2" class="text-center" style="padding-top: 11px;padding-bottom: 11px;">개인성과지표</td>
            </tr>
            <tr>
                <th>평가 가중치</th>
                <td class="text-center" id="orderWeights">0%</td>
                <td class="text-center" id="salesWeights">0%</td>
                <td class="text-center" id="revenueWeights">0%</td>
            </tr>
            </thead>
        </table>

        <div class="card-header" style="padding: 5px;">
            <h3 class="card-title"><span class="baseYear"></span>년도 ${loginVO.teamNm} 재무 성과</h3>
        </div>
        <table class="popTable table table-bordered mb-0" style="margin-top: 0px;">
            <colgroup>
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
            </colgroup>
            <thead>
            <tr>
                <th class="text-center green" rowspan="2">부서/팀명</th>
                <th class="text-center green" colspan="2">수주</th>
                <th class="text-center yellow" colspan="2">매출</th>
                <th class="text-center blue" colspan="2">수익</th>
                <th class="text-center pink" colspan="2">비용</th>
                <th class="text-center orange" colspan="2">사업화지수</th>
            </tr>
            <tr>
                <th class="text-center green">목표</th>
                <th class="text-center green">달성</th>
                <th class="text-center yellow">목표</th>
                <th class="text-center yellow">달성</th>
                <th class="text-center blue">목표</th>
                <th class="text-center blue">달성</th>
                <th class="text-center pink">목표</th>
                <th class="text-center pink">달성</th>
                <th class="text-center orange">목표</th>
                <th class="text-center orange">달성</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-center">
                    <c:choose>
                        <c:when test="${loginVO.teamNm eq ''}">
                            ${loginVO.deptNm}
                        </c:when>
                        <c:otherwise>
                            ${loginVO.teamNm}
                        </c:otherwise>
                    </c:choose>

                </td>
                <td class="text-center">
                    <input type="text" id="teamOrderGoals" class="teamGoals numberInput" value="0">
                </td>
                <td class="text-center"></td>
                <td class="text-center">
                    <input type="text" id="teamSalesGoals" class="teamGoals numberInput" value="0">
                </td>
                <td class="text-center"></td>
                <td class="text-center">
                    <input type="text" id="teamRevenueGoals" class="teamGoals numberInput" value="0">
                </td>
                <td class="text-center"></td>
                <td class="text-center">
                    <input type="text" id="teamCostGoals" class="teamGoals numberInput" value="0">
                </td>
                <td class="text-center"></td>
                <td class="text-center">
                    <input type="text" id="teamCommerIndexGoals" class="teamGoals numberInput" value="0">
                </td>
                <td class="text-center"></td>
            </tr>
            </tbody>
        </table>
        <div class="card-header" style="padding: 5px;">
            <h3 class="card-title">* <span class="baseYear"></span>년도 ${loginVO.teamNm} 개인별 재무 성과</h3>
            <h5 style="margin-bottom: 0;margin-top: 20px;">(단위:원)</h5>
        </div>
        <table class="popTable table table-bordered mb-0" style="margin-top: 0px;">
            <colgroup>
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
                <col width="9%">
            </colgroup>
            <thead>
            <tr>
                <th class="text-center green" rowspan="2">구분</th>
                <th class="text-center green" colspan="2">수주</th>
                <th class="text-center yellow" colspan="2">매출</th>
                <th class="text-center blue" colspan="2">수익</th>
                <th class="text-center pink" colspan="2">비용</th>
                <th class="text-center orange" colspan="2">사업화지수</th>
            </tr>
            <tr>
                <th class="text-center green">목표</th>
                <th class="text-center green">달성</th>
                <th class="text-center yellow">목표</th>
                <th class="text-center yellow">달성</th>
                <th class="text-center blue">목표</th>
                <th class="text-center blue">달성</th>
                <th class="text-center pink">목표</th>
                <th class="text-center pink">달성</th>
                <th class="text-center orange">목표</th>
                <th class="text-center orange">달성</th>
            </tr>
            </thead>
            <tbody id="teamEmpListTb">

            </tbody>
        </table>
    </div>
</div>

<form id="evalGoalDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="evalGoal">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="evalGoalTempGroup" name="evalGoalTempGroup" />
    <input type="hidden" id="evalBaseYear" name="evalBaseYear" />
</form>

<script>
    evalGoalSetPop.fn_defaultScript();
</script>
</body>
