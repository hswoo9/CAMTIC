<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/paymentCardHistory.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>

<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="type" value="${params.type}" />
<input type="hidden" id="index" value="${params.index}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    카드사용내역
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="window.close()">반영</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <span style="margin-right: 10px">
            <b style="font-size: 12px">승인일시</b>
            <input id="startDt" style="width: 150px"> ~ <input id="endDt" style="width: 150px">
        </span>
        <span>
            <b style="font-size: 12px">카드정보</b>
            <input id="searchValue" style="width: 20%;">
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="cardSelBtn" onclick="payCardHist.gridReload()">선택</button>
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="bnkSelBtn" onkeypress="if(window.event.keyCode==13){payCardHist.gridReload()}">검색</button>
        </span>
        <div id="mainGrid" style="margin-top:12px"></div>


    </div>
</div>

<script>
    payCardHist.fn_defaultScript();
</script>