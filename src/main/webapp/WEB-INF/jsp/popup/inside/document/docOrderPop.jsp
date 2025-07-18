<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/docOrderPop.js?v=${today}"/></script>
<input type="hidden" id="documentSn" value="${data.documentSn}"/>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">개발사업 수주대장</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="docuOrderReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <form style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="4">개발사업 수주대장</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>구분
                    </th>
                    <td>
                        <input type="text" id="class" style="width: 150px; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 번호
                    </th>
                    <td>
                        <input type="text" id="orderNum" style="width: 100%; margin-right:10px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약명
                    </th>
                    <td colspan="3">
                        <input type="text" id="projectName" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 업체
                    </th>
                    <td colspan="3">
                        <input type="text" id="coName" style="width: 37%;" value=""><input type="hidden" id="coSn" style="width: 37%;" value="1">
                        <button type="button" id="contractorSearch" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" disabled>
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 일시
                    </th>
                    <td>
                        <input type="text" id="docuDe" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 기간
                    </th>
                    <td>
                        <input type="text" id="startDe" style="width: 45%;">
                        ~
                        <input type="text" id="endDe" style="width: 45%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 금액
                    </th>
                    <td>
                        <input type="text" id="contractAmount" style="width: 90%; text-align: right;"> 원
                    </td>
                    <th scope="row" class="text-center th-color">남품 금액</th>
                    <td>
                        <input type="text" id="deliveryAmount" style="width: 90%; text-align: right;"> 원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>지급 조건
                    </th>
                    <td>
                        <input type="text" id="conditionName" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약서 유무
                    </th>
                    <td>
                        <input type="text" id="docuCheck">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약서 (발주서)
                    </th>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품서
                    </th>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">비고</th>
                    <td colspan="3">
                        <textarea type="text" id="remarkCn" style="width: 100%;"></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
        <form style="padding: 0px 30px;">
            <div class="card-header" style="padding: 5px;">
            <h3 class="card-title">상품화지원 계약 프로젝트</h3>
            </div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="20%">
                    <col width="40%">
                    <col width="20%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>연번
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>상담코드
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 명
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수주금액(천원)
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>삭제
                    </th>
                </tr>
            </table>
        </form>
    </div>
</div>


<script>
    docuOrderReq.init();
</script>
</body>
</html>