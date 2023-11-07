<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<script type="text/javascript" src="/js/intra/cams_pot/empSchedule/popup/popScheduleReg.js?v=${today}"/></script>
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
        <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
        <input type="hidden" id="scheduleBoardId" name="scheduleBoardId" value="${params.scheduleBoardId}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">일정등록</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="sr.setScheduleReg()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 10%">
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <span class="red-star">*</span>날짜
                        </th>
                        <td>
                            <input type="text" id="startDt" style="width: 15%"> ~ <input type="text" id="endDt" style="width: 15%">
                            <input type="checkbox" id="holidayYn" style="margin-left: 10px"><label for="holidayYn">공휴일</label>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>시간
                        </th>
                        <td>
                            <input type="text" id="startTime" style="width: 15%"> ~ <input type="text" id="endTime" style="width: 15%">
                            <input type="checkbox" id="allDayYn" style="margin-left: 10px"><label for="allDayYn">하루종일</label>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>일정종류
                        </th>
                        <td>
                            <input type="radio" id="ev" name="scheduleType" value="EV"><label for="ev">행사</label>
                            <input type="radio" id="me" name="scheduleType" value="ME"><label for="me">회의</label>
                            <input type="radio" id="ed" name="scheduleType" value="ED"><label for="ed">교육</label>
                            <input type="radio" id="wr" name="scheduleType" value="WR"><label for="wr">업무관련</label>
                            <input type="radio" id="bd" name="scheduleType" value="BD"><label for="bd">생일</label>
                            <input type="radio" id="tr" name="scheduleType" value="TR"><label for="tr">출장</label>
                            <input type="radio" id="hd" name="scheduleType" value="HD"><label for="hd">휴일</label>
                            <input type="radio" id="other" name="scheduleType" value="OT"><label for="other">기타</label>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>제목
                        </th>
                        <td>
                            <input type="text" id="scheduleTitle">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>내용
                        </th>
                        <td>
                            <input type="text" id="scheduleContent">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>장소
                        </th>
                        <td>
                            <input type="text" id="schedulePlace">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>공개
                        </th>
                        <td>
                            <input type="radio" id="es" name="publicClass" value="ES"><label for="es">직원일정</label>
                            <input type="radio" id="cs" name="publicClass" value="CS"><label for="cs">법인일정</label>
                            <input type="checkbox" id="camsPotPost"><label for="camsPotPost">캠스팟 게시안함</label>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    sr.fn_defaultScript();
</script>
</body>
</html>