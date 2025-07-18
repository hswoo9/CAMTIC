<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/joinLeaveViewPop.js'/>"></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script>
    var currentYear = '${param.currentYear}';
    var sectionTitle = '${param.sectionTitle}';

    $(document).ready(function() {
        $("#joinYear").val(currentYear);
        $("#sectionTitle").val(sectionTitle);
    });
</script>

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
<input type="hidden" id="documentSn" value="${data.documentSn}"/>

<input type="hidden" id="joinYear" value="${param.currentYear}">
<input type="hidden" id="sectionTitle" value="${param.sectionTitle}">
<input type="hidden" id="deptID" value="${param.deptID}">
<input type="hidden" id="teamID" value="${param.teamID}">
<input type="hidden" id="positionName" value="${param.positionName}">
<input type="hidden" id="genderName" value="${param.genderName}">
<input type="hidden" id="ageName" value="${param.ageName}">
<input type="hidden" id="degreeName" value="${param.degreeName}">
<input type="hidden" id="encodedArr" value="${param.encodedArr}">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">통계 세부현황</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div id="mainGrid" style="padding: 20px 30px;">

        </div>
    </div>
</div>


<script>
    joinLeaveViewPop.fn_defaultScript();
</script>
</body>
</html>