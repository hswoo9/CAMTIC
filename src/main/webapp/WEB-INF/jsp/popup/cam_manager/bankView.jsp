<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/bankView.js?v=${today}'/>"></script>
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

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="mgtCd" value="${data.PJT_CD}" />
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    금융거래처 선택
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <span>
            <input type="text" id="searchValue" style="width: 20%;">
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="bnkSelBtn" onclick="bnkView.fn_search()">검색</button>
            <span style="color : red; font-size: 12px"> * 계좌명으로 검색할 수 있습니다.</span>
        </span>
        <div id="bankMainGrid" style="margin-top:12px"></div>

    </div>
</div>

<script>


    bnkView.fn_defaultScript();
</script>