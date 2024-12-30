<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalAchieveResult.js?v=${today}"/></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="regJobDetailName" value="${loginVO.jobDetailNm}"/>
<input type="hidden" id="baseYear" value="${params.baseYear}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">업적평가 결과</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="evalAchieveResult.fn_excelDownload()">엑셀 다운로드</button>
<%--                <button type="button" class="k-button k-button-solid-info" onclick="evalAchieveResult.saveMngScore()">평가점수 조정</button>--%>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0">
                <tr>
                    <th class="text-center th-color">부서/팀</th>
                    <td>
                        <input type="text" id="dept" style="width:160px;" onchange="evalAchieveResult.getEvalAchieveResultList()">
                        <input type="text" id="team" style="width:165px;" onchange="evalAchieveResult.getEvalAchieveResultList()">
                    </td>
                    <th class="text-center th-color">직책/직급</th>
                    <td >
                        <input type="text" id="position" style="width: 160px;" onchange="evalAchieveResult.getEvalAchieveResultList()">
                        <input type="text" id="duty" style="width: 160px;" onchange="evalAchieveResult.getEvalAchieveResultList()">
                    </td>
                    <td >
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="evalAchieveResult.getEvalAchieveResultList();">	<span class="k-button-text">조회</span></button>
                    </td>

                </tr>
            </table>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="12%">
                    <col width="6%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color" rowspan="2">부서명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">팀명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">성명</th>
                    <th scope="row" class="text-center th-color" colspan="2">수주</th>
                    <th scope="row" class="text-center th-color" colspan="2">매출</th>
                    <th scope="row" class="text-center th-color" colspan="2">수익</th>
                    <th scope="row" class="text-center th-color" rowspan="2">합계</th>
                    <th scope="row" class="text-center th-color" rowspan="2">등급</th>
                    <th scope="row" class="text-center th-color" colspan="2">비용</th>
                    <th scope="row" class="text-center th-color" rowspan="2">손익</th>
                    <th scope="row" class="text-center th-color" colspan="2">사업화지수</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">환산</th>
<%--                    <th scope="row" class="text-center th-color">등급</th>--%>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">환산</th>
<%--                    <th scope="row" class="text-center th-color">등급</th>--%>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">환산</th>
<%--                    <th scope="row" class="text-center th-color">등급</th>--%>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">환산</th>
<%--                    <th scope="row" class="text-center th-color">등급</th>--%>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">환산</th>
<%--                    <th scope="row" class="text-center th-color">등급</th>--%>
                </tr>
                </thead>
                <tbody id="evalList">
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="hiddenGrid" style="display: none;"></div>

<script>
    evalAchieveResult.init();
</script>
</body>
</html>