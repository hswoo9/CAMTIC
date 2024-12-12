<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/ojtPlanPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
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
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="studyJournalSn" value="${params.studyJournalSn}"/>
<input type="hidden" id="mode" value=""/>
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">OJT 지도계획</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div class="card-header" style="padding-top:15px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="table-responsive" style="margin-bottom: 5px;">
                        <div class="card-header pop-header">
                            <h3 class="card-title title_NM">지도자</h3>
                        </div>
                    </div>
                    <form id="studyJournalForm">
                        <table class="table table-bordered" id="studyJournalTable">
                            <colgroup>
                                <col width="8%">
                                <col width="32%">
                                <col width="25%">
                                <col width="20%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>회차</th>
                                <th>기간</th>
                                <th>중점 지도항목</th>
                                <th>비고</th>
                                <th>처리명령</th>
                            </tr>
                            <c:forEach var="list" items="${list}" varStatus="status">
                            <tr class="listData">
                                <td style="text-align: center">${status.count}차</td>
                                <td style="text-align: center">${list.START_DT} ~ ${list.END_DT}</td>
                                <td style="text-align: center"><input type="text" id="title${list.OJT_PLAN_SN}" class="title" style="width: 220px;" value="${list.TITLE}"></td>
                                <td style="text-align: center"><input type="text" id="etc${list.OJT_PLAN_SN}" class="etc" style="width: 200px;" value="${list.ETC}"></td>
                                <td style="text-align: center">
                                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="ojtPlan.updBtn(${list.OJT_PLAN_SN})">저장</button>
                                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="ojtPlan.delBtn(${list.OJT_PLAN_SN})">삭제</button>
                                </td>
                            </tr>
                            </c:forEach>
                            <tr class="addData">
                                <td style="text-align: center">추가</td>
                                <td style="text-align: center"><input type="text" id="startDt" style="width: 45%"> ~ <input type="text" id="endDt" style="width: 45%;"></td>
                                <td style="text-align: center"><input type="text" id="title" style="width: 220px;"></td>
                                <td style="text-align: center"><input type="text" id="etc" style="width: 200px;"></td>
                                <td style="text-align: center"><button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="ojtPlan.saveBtn()">추가</button></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    ojtPlan.init();
</script>
</body>
