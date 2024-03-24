<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/meetingRoomPop.js?v=${today}"/></script>
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
<input type="hidden" id="roomReqSn" value="${params.roomReqSn}"/>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">회의실 사용 신청</h3>
            <div id="roomBtn" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="roomReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="25%">
                <col width="75%">
            </colgroup>
            <thead>
            <%--<tr>
                <th colspan="2">회의실 사용 신청</th>
            </tr>--%>
            <%--<tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>저장 후 이동 경로
                </th>
                <td>
                    <input type="text" id="saveRoute" style="width: 20%; margin-right:10px;">
                </td>
            </tr>--%>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사용 일시
                </th>
                <td>
                    <input type="text" id="saveType" style="width: 20%; margin-right:10px;">
                    <input id="startDt" style="width: 20%;" value="${params.startDt}"><input id="startTime" style="width: 15%;">~
                    <input id="endDt" style="width: 20%;"><input id="endTime" style="width: 15%;">
                    <button type="button" id="exSpecificDayButton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;margin-top: 10px;" onclick="meetingRoomPop.exSpecificDayPopup();" disabled>
                        특정일 제외
                    </button>
                    <input type="text" id="exSpecificDay" style="width: 50%; margin-right:10px; margin-top: 10px;" disabled>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사용 회의실
                </th>
                <td>
                    <input type="text" id="roomClass" style="width: 40%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사용 목적
                </th>
                <td>
                    <input type="text" id="usePurpose" style="width: 40%; margin-right:10px;">
                    <%--<input class="varUsePurpose" type="text" id="etc" style="display: none; width: 20%; margin-right:10px;">--%>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>대관료
                </th>
                <td>
                    <input type="text" id="rentalFee" style="width: 20%; margin-right:10px; float: left;">
                    <div class="varRentalFee" style="display: none; float: left;"><input type="text" id="pay" oninput="onlyNumber(this);" style="width: 20%; margin-right:10px; text-align: right"> 원
                    (VAT 포함 금액)</div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>등록자
                </th>
                <td>
                    <input type="text" id="name" style="width: 65%;" value="${LoginVO.name}">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사용 담당자
                </th>
                <td>
                    <input type="text" id="empName" style="width: 65%;">
                    <input type="hidden" id="empSeq">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px;" onclick="userSearch();">
                        검색
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">사용 내용 및 특이사항</th>
                <td colspan="3">
                    <textarea type="text" id="remarkCn" style="width: 100%;"></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>


<script>
    roomReq.init();
</script>
</body>
</html>