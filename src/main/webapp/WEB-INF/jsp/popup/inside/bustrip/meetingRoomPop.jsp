<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/meetionRoomPop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
        <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
        <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">회의실 사용 신청</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
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
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>저장 후 이동 경로
                </th>
                <td>
                    <input type="text" id="saveRoute" style="width: 20%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사용 일시
                </th>
                <td>
                    <input type="text" id="timeReq" style="width: 20%; margin-right:10px;">
                    <input id="start_date" type="date" style="width: 20%;"><input id="start_time" type="time" style="width: 15%;">~
                    <input id="end_date" type="date" style="width: 20%;"><input id="end_time" type="time" style="width: 15%;">
                    <button type="button" id="exSpecificDayButton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;margin-top: 10px;" onclick="meetingRoomPop.exSpecificDayPopup();">
                        특정일 제외
                    </button>
                    토, 일 제외
                    <input type="text" id="exSpecificDay" style="width: 50%; margin-right:10px; margin-top: 10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사용 회의실
                </th>
                <td>
                    <input type="text" id="useMeeting" style="width: 40%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사용 목적
                </th>
                <td>
                    <input type="text" id="usePurpose" style="width: 40%; margin-right:10px;">
                    <input type="text" id="etc" style="width: 20%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>대관료
                </th>
                <td>
                    <input type="text" id="rentalFee" style="width: 20%; margin-right:10px;">
                    <input type="text" id="pay" style="width: 20%; margin-right:10px; text-align: right"> 원
                    (VAT 포함 금액)
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>등록자
                </th>
                <td colspan>
                    <input type="text" id="registrant" style="width: 20%;">
                    <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;" onclick="">
                        직원 선택
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사용 담당자
                </th>
                <td colspan>
                    <input type="text" id="useManager" style="width: 20%;">
                    <button type="button" id="staffSlect2" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;" onclick="">
                        직원 선택
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">사용 내용 및 특이사항</th>
                <td colspan="3">
                    <textarea type="text" id="UseReason" style="width: 100%;"></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>


<script>
    meetingRoomPop.fn_defaultScript();
</script>
</body>
</html>