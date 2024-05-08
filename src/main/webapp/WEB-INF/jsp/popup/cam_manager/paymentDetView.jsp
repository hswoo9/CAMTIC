<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/paymentDetView.js?v=${today}'/>"></script>
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
<input type="hidden" id="cardVal" value="${params.cardVal}" />
<input type="hidden" id="index" value="${params.index}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <c:choose>
                        <c:when test="${params.type eq '1' }">
                            거래처 선택
                        </c:when>
                        <c:when test="${params.type eq '2' }">
                            거래처 선택
                        </c:when>
                        <c:when test="${params.type eq '3' || params.type eq '8'}">
                            신용카드 선택
                        </c:when>
                        <c:when test="${params.type eq '4' }">
                            직원 선택
                        </c:when>
                        <c:when test="${params.type eq '5' }">
                            사업소득자 선택
                        </c:when>
                        <c:when test="${params.type eq '9' }">
                            기타소득자 선택
                        </c:when>
                        <c:otherwise>
                            <script>
                                alert("시스템 오류가 발생하였습니다.");
                                window.close();
                            </script>
                        </c:otherwise>
                    </c:choose>
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <span>
            <input type="text" id="searchValue" style="width: 20%;" onkeypress="if(window.event.keyCode==13){payDetView.fn_search('${params.type}')}" >
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="bnkSelBtn" onclick="payDetView.fn_search('${params.type}')">검색</button>
            <span style="color : red; font-size: 12px">
                <c:choose>
                    <c:when test="${params.type eq '1' }">
                        * 명칭, 사업(주민)자번호, 계좌(카드)번호 검색 가능</span>
                        <button type="button" style="font-size: 12px; float: right" class="k-button k-button-sm k-button-solid-info" id="addBtn" onclick="payDetView.fn_popAddData('${params.type}')">거래처 등록</button>
                    </c:when>
                    <c:when test="${params.type eq '2' }">
                        * 명칭, 사업(주민)자번호, 계좌(카드)번호 검색 가능</span>
                        <button type="button" style="font-size: 12px; float: right" class="k-button k-button-sm k-button-solid-info" id="addBtn" onclick="payDetView.fn_popAddData('${params.type}')">거래처 등록</button>
                    </c:when>
                    <c:when test="${params.type eq '3' || params.type eq '8' }">
                        * 명칭, 카드번호(ex. 끝4자리) 검색가능</span>
                    </c:when>
                    <c:when test="${params.type eq '4' }">
                        * 명칭, 주민번호, 계좌번호 검색 가능</span>
                    </c:when>
                    <c:when test="${params.type eq '5' }">
                        * 명칭, 사업(주민)자번호, 계좌(카드)번호 검색 가능 <br>사업소득자가 조회되지 않는 경우, 재무회계팀에 문의해 주세요.(소득자명, 주민등록번호 확인) </span>
                        <button type="button" style="font-size: 12px; float: right; display: none" class="k-button k-button-sm k-button-solid-info" id="addBtn" onclick="payDetView.fn_popAddData('${params.type}')">기타소득자 등록</button>
                    </c:when>
                    <c:when test="${params.type eq '9' }">
                        * 명칭, 사업(주민)자번호, 계좌(카드)번호 검색 가능</span>
                        <button type="button" style="font-size: 12px; float: right;" class="k-button k-button-sm k-button-solid-info" id="addBtn" onclick="payDetView.fn_popAddData('${params.type}')">기타소득자 등록</button>
                    </c:when>
                    <c:otherwise></span></c:otherwise>
                </c:choose>

        </span>
        <c:choose>
            <c:when test="${params.type eq '1' }">
                <div id="clientMainGrid" style="margin-top:12px"></div>
            </c:when>
            <c:when test="${params.type eq '2' }">
                <div id="clientMainGrid" style="margin-top:12px"></div>
            </c:when>
            <c:when test="${params.type eq '3' || params.type eq '8' }">
                <div id="cardMainGrid" style="margin-top:12px"></div>
            </c:when>
            <c:when test="${params.type eq '4' }">
                <div id="empMainGrid" style="margin-top:12px"></div>
            </c:when>
            <c:when test="${params.type eq '5' }">
                <div id="otherMainGrid" style="margin-top:12px"></div>
            </c:when>
            <c:when test="${params.type eq '9' }">
                <div id="otherMainGrid" style="margin-top:12px"></div>
            </c:when>
            <c:otherwise></c:otherwise>
        </c:choose>
    </div>
</div>

<script>
    payDetView.fn_defaultScript();
</script>