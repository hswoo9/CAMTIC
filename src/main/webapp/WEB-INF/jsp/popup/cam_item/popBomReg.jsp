<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/popup/popBomReg.js?v=${today}'/>"></script>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    BOM등록
                </span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="bomReg.setBomReq();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="bomSn" value="${params.bomSn}">

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
<%--                <tr>--%>
<%--                    <th scope="row" class="text-center th-color">--%>
<%--                        <span class="red-star">*</span>BOM명--%>
<%--                    </th>--%>
<%--                    <td colspan="3">--%>
<%--                        <input type="text" id="bomTitle" class="k-input k-text">--%>
<%--                    </td>--%>
<%--                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>품번
                    </th>
                    <td>
                        <input type="hidden" id="masterSn999" class="masterSn999">
                        <input type="hidden" id="itemType999" class="itemType999">
                        <input type="text" id="itemNo999" class="k-input k-text" readonly onClick="bomReg.fn_popItemNoList(999);" style="width: 83%">
                        <button type="button" id="itemSelBtn" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="bomReg.fn_popItemNoList(999);">선택</button>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>품명
                    </th>
                    <td>
                        <input type="text" id="itemName999" class="k-input k-text" readonly onClick="bomReg.fn_popItemNoList(999);">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">입고창고</th>
                    <td>
                        <input type="text" id="whCdNm999" class="k-input k-text" readonly onClick="bomReg.fn_popItemNoList(999);">
                    </td>
                    <th scope="row" class="text-center th-color">규격</th>
                    <td>
                        <input type="text" id="standard999" class="k-input k-text" readonly onClick="bomReg.fn_popItemNoList(999);">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">원가</th>
                    <td>
                        <input type="text" id="bomCostPrice" class="numberInput" style="text-align: right;" readonly>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>표준단가
                    </th>
                    <td>
                        <input type="text" id="bomUnitPrice" class="numberInput" style="text-align: right;">
                    </td>
                </tr>
                </thead>
            </table>

            <div class="mt-20">
                <div class="text-right">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bomReg.fn_popItemNoList('new')">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <div style="width: 100%; overflow-x: scroll !important; overflow-y: hidden;">
                    <table class="searchTable table table-bordered mb-0 mt-20" style="table-layout: fixed">
                        <colgroup>
<%--                            <col style="width: 180px;">--%>
                            <col style="width: 220px;">
                            <col style="width: 200px;">
                            <col style="width: 100px;">
                            <col style="width: 120px;">
                            <col style="width: 80px;">
                            <col style="width: 120px;">
                            <col style="width: 200px;">
                            <col style="width: 50px;">
                        </colgroup>
                        <thead>
                        <tr>
<%--                            <th>BOM</th>--%>
                            <th>품번</th>
                            <th>품명</th>
                            <th>품목구분</th>
                            <th>단가</th>
                            <th>필요수량</th>
                            <th>합계</th>
                            <th>비고</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody id="bomDetailTb">

                        </tbody>
                    </table>
                </div>
            </div>

            <input type="hidden" id="masterSn" onchange="bomReg.itemInfoChange()">
            <input type="hidden" id="itemNo">
            <input type="hidden" id="itemName">
            <input type="hidden" id="itemCdName">
            <input type="hidden" id="maxUnitPrice">
            <input type="hidden" id="whCdNm">
            <input type="hidden" id="standard">
            <input type="hidden" id="itemType">
        </div>
    </div>
</div>
<script type="text/javascript">
    bomReg.fn_defaultScript();
</script>
</body>
</html>