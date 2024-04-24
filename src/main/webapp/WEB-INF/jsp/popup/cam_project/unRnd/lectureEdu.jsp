<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePerson.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lectureEdu.js?v=${today}'/>"></script>
<style>
    .k-grid td {
        line-height: 18px;
    }
</style>
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
<input type="hidden" id="year" value="${params.year}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <%--이수 관리--%>
                    수강생 관리
                </span>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-primary" onclick="lecturePop.personPrintPop()">수료증</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePop.lecturePersonReqPop(${params.pk})">수강자 추가</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePop.sendSmsPop()">SMS 발송</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_appBtn('Y')">신청완료</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_appBtn('N')">취소처리</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_appBtn('X')">불참처리</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_appBtn('O')">수료처리</button>
                <%--<button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_appBtn('F')">미수료처리</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lectureEdu.fn_auditBtn()">청강처리</button>--%>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_delBtn()">선택삭제</button>
                <%--<button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_particBtn('N')">불참사유서 접수</button>
                <button type="button" class="k-button k-button-solid-base" onclick="lecturePerson.fn_particBtn('Y')">불참사유서 미접수</button>--%>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div class="col-md-12 col-sm-12" style="padding: 20px 30px;">
            <div id="personGrid"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    lectureEdu.fn_defaultScript();
</script>
</body>
</html>