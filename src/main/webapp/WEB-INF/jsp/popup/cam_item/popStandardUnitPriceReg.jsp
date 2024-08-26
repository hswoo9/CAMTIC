<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/popup/popStandardUnitPriceReg.js?v=${today}"/></script>
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
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
        <input type="hidden" id="masterSn" name="masterSn" value="${item.MASTER_SN}">
        <input type="hidden" id="unitPrice" name="unitPrice" value="${item.UNIT_PRICE}">
        <input type="hidden" id="b2bPrice" name="b2bPrice" value="${item.B2B_PRICE}">
        <input type="hidden" id="costPrice" name="costPrice" value="${item.COST_PRICE}">
        <input type="hidden" id="b2bEtc" name="b2bEtc" value="${item.B2B_ETC}">
        <input type="hidden" id="b2bEtc2" name="b2bEtc2" value="${item.B2B_ETC2}">
        <input type="hidden" id="b2bEtc3" name="b2bEtc3" value="${item.B2B_ETC3}">
        <input type="hidden" id="b2bEtc4" name="b2bEtc4" value="${item.B2B_ETC4}">
        <input type="hidden" id="b2bEtc5" name="b2bEtc5" value="${item.B2B_ETC5}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="popTitle">표준단가관리</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="sdupR.setSdUnitPriceReg()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="sdupR.delRow()">삭제</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 10%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>품번</th>
                        <td>${item.ITEM_NO}</td>
                    </tr>
                    <tr>
                        <th>품명</th>
                        <td>${item.ITEM_NAME}</td>
                    </tr>
                </thead>
            </table>

            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 3%">
                    <col style="width: 5%">
                    <col style="width: 8%">
                    <col style="width: 8%">
                    <col style="width: 8%">
                    <col style="width: 8%">
                    <col style="width: 8%">
                    <col style="width: 8%">
                    <col style="width: 8%">
                    <col style="width: 10%">
                    <col style="width: 10%">
                    <col style="width: 8%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" id="checkAll">
                    </th>
                    <th>순번</th>
                    <th>원가</th>
                    <th>단가</th>
                    <th>B2B 단가
                        <c:if test="${not empty item.B2B_ETC}">
                            <br>(${item.B2B_ETC})
                        </c:if></th>
                    <th>B2B 단가2
                        <c:if test="${not empty item.B2B_ETC2}">
                            <br>(${item.B2B_ETC2})
                        </c:if></th>
                    <th>B2B 단가3
                        <c:if test="${not empty item.B2B_ETC3}">
                            <br>(${item.B2B_ETC3})
                        </c:if></th>
                    <th>B2B 단가4
                        <c:if test="${not empty item.B2B_ETC4}">
                            <br>(${item.B2B_ETC4})
                        </c:if></th>
                    <th>B2B 단가5
                        <c:if test="${not empty item.B2B_ETC5}">
                            <br>(${item.B2B_ETC5})
                        </c:if></th>
                    <th>적용시작일자</th>
                    <th>적용종료일자</th>
                    <th>비고</th>
                </tr>
                </thead>
                <tbody id="listTb">

                </tbody>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    sdupR.fn_defaultScript();
</script>
</body>
</html>