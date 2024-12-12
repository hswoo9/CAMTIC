<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/contentPop.js?v=${today}"/></script>
<style>
    .numberInput {
        text-align: right;
    }
</style>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="evalGoalSn" value="${evalGoal.EVAL_GOAL_SN}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">업적평가 목표 설정</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="contentPop.saveData()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
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
                        <span class="red-star"></span>수주
                    </th>
                    <td>
                        <input type="text" id="orderGoals" class="numberInput" style="width: 100%;" value="<fmt:formatNumber value="${evalGoal.ORDER_GOALS}" pattern="#,###" />">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>매출
                    </th>
                    <td>
                        <input type="text" id="salesGoals" class="numberInput" style="width: 100%;" value="<fmt:formatNumber value="${evalGoal.SALES_GOALS}" pattern="#,###" />">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수익
                    </th>
                    <td>
                        <input type="text" id="revenueGoals" class="numberInput" style="width: 100%;" value="<fmt:formatNumber value="${evalGoal.REVENUE_GOALS}" pattern="#,###" />">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>비용
                    </th>
                    <td>
                        <input type="text" id="costGoals" class="numberInput" style="width: 100%;" value="<fmt:formatNumber value="${evalGoal.COST_GOALS}" pattern="#,###" />">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사업화지수
                    </th>
                    <td>
                        <input type="text" id="commerIndexGoals" class="numberInput" style="width: 100%;" value="<fmt:formatNumber value="${evalGoal.COMMER_INDEX_GOALS}" pattern="#,###" />">
                    </td>
                    <td colspan="2"></td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    contentPop.init();
</script>
</body>
</html>