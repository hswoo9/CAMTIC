<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndPartRate.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndReqPartRate.js?v=${today}'/>"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="partRateVerSn" value="" />
<input type="hidden" id="partRateSn" value="" />

<input type="hidden" id="partRateMenuGubun" value="DETAIL" />
<div style="padding: 10px">

    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="7%">
                <col width="7%">
                <col width="10%">
                <col width="15%">
                <col width="12%">
                <col width="12%">
                <col width="12%">
                <col width="15%">
                <col width="10%">
            </colgroup>
            <thead>
            <tr>
                <th>구분</th>
                <th>버전</th>
                <th>요청자</th>
                <th>인건비 예산</th>
                <th>요청일</th>
                <th>참여율 작성일</th>
                <th>확정일</th>
                <th>담당자 코멘트</th>
                <th>상태</th>
            </tr>
            </thead>
            <tbody id="partRateVersion2">
            <tr>
                <td colspan="9" style="text-align: center">
                    <span class="red-star"></span>작성된 참여율이 없습니다.
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="table-responsive">
<%--        <button type="button" id="" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" disabled onclick=""></button>--%>
        <br><br>
        <table class="popTable table table-bordered mb-0">
            <thead>
            <tr>
                <th style="width: 5%">구분</th>
                <th style="width: 5%">성명</th>
                <th style="width: 5%">기준급여</th>
                <th style="width: 7%">기준급여<br>변경</th>
                <th style="width: 8%">참여시작</th>
                <th style="width: 8%">참여종료</th>
                <th style="width: 5%">참여개월</th>
                <th style="width: 4%">참여율<br>현금(%)</th>
                <th style="width: 7%">인건비<br>현금 총액</th>
                <th style="width: 4%">참여율<br>현물(%)</th>
                <th style="width: 7%">인건비<br>현물 총액</th>
                <th style="width: 5%">총 참여율(%)</th>
                <th style="width: 7%">인건비총액</th>
                <th style="width: 7%">월 인건비</th>
                <th style="width: 5%">참여율<br>조회</th>
                <th style="width: 5%">삭제</th>
            </tr>
            </thead>
            <tbody id="partRateMember">

            </tbody>
        </table>
    </div>
</div>

<script>
    rndPR.fn_defaultScript();
    rndRPR.fn_setVersion();
</script>