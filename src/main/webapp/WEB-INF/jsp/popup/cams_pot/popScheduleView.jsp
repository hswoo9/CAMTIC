<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .dash-left .table > tbody > tr > td{
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
    }

    .percentInput {
        text-align: right;
    }

    label{
        margin-left: 3px;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="scheduleBoardId" name="scheduleBoardId" value="${rs.SCHEDULE_BOARD_ID}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">일정조회</span>
            </h3>
            <div class="btn-st popButton">
<%--                <button type="button" class="k-button k-button-solid-info" onclick="sr.setScheduleReg()">저장</button>--%>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 15%">
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            날짜
                        </th>
                        <td>
                            ${rs.START_DT} ~ ${rs.END_DT}
                            <input type="checkbox" id="holidayYn" style="margin-right:5px; margin-left: 10px" disabled <c:if test="${rs.HOLIDAY_YN eq 'Y'}">checked</c:if>>공휴일
                        </td>
                    </tr>
                    <tr>
                        <th>
                            시간
                        </th>
                        <td>
                            ${rs.START_TIME} ~ ${rs.END_TIME}
                            <input type="checkbox" id="allDayYn" style="margin-right:5px; margin-left: 10px" disabled <c:if test="${rs.ALL_DAY_YN eq 'Y'}">checked</c:if>>하루종일
                        </td>
                    </tr>
                    <tr>
                        <th>
                            일정종류
                        </th>
                        <td>
                            <c:choose>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'EV'}">행사</c:when>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'ME'}">회의</c:when>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'ED'}">교육</c:when>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'WR'}">업무관련</c:when>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'BD'}">생일</c:when>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'TR'}">출장</c:when>
                                <c:when test="${rs.SCHEDULE_TYPE eq 'HD'}">휴일</c:when>
                                <c:otherwise>기타</c:otherwise>
                            </c:choose>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            제목
                        </th>
                        <td>
                            ${rs.SCHEDULE_TITLE}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            내용
                        </th>
                        <td>
                            ${rs.SCHEDULE_CONTENT}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            장소
                        </th>
                        <td>
                            ${rs.SCHEDULE_PLACE}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            공개
                        </th>
                        <td>
                            <c:choose>
                                <c:when test="${rs.PUBLIC_CLASS eq 'ES'}">직원일정</c:when>
                                <c:otherwise>법인일정</c:otherwise>
                            </c:choose>
                            <input type="checkbox" id="camsPotPost" disabled <c:if test="${rs.CAMS_POT_POST eq 'Y'}">checked</c:if>>캠스팟 게시안함
                        </td>
                    </tr>
                </thead>
            </table>
            <c:if test="${params.pazing eq 'Y'}">
                <div style="text-align:right; margin-top:10px; ">
                    <button onclick=""><</button>
                    <button onclick="">></button>
                </div>
            </c:if>
        </div>
    </div>
</div>

<script type="text/javascript">
    sr.fn_defaultScript();
</script>
</body>
</html>