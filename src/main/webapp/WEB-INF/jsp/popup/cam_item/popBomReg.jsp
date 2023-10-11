<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

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

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">품번</th>
                    <td>
                        <input type="text" id="bomNo">
                    </td>
                    <th scope="row" class="text-center th-color">품명</th>
                    <td>
                        <input type="text" id="bomName">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">단가</th>
                    <td colspan="3" id="bomUnitPriceTd">
                        <input type="text" id="bomUnitPrice" class="numberInput">
                    </td>
                </tr>
                </thead>
            </table>

            <div class="mt-20">
                <div class="text-right">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bomReg.addRow('new')">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col>
                        <col>
                        <col style="width: 14%;">
                        <col style="width: 12%;">
                        <col style="width: 20%;">
                        <col style="width: 9%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>품번</th>
                        <th>품명</th>
                        <th>단가</th>
                        <th>필요수량</th>
                        <th>비고</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody id="bomDetailTb">

                    </tbody>
                </table>
            </div>

            <input type="hidden" id="invenSn" onchange="bomReg.itemInfoChange()">
            <input type="hidden" id="masterSn">
            <input type="hidden" id="itemNo">
            <input type="hidden" id="itemName">
            <input type="hidden" id="whCd">
            <input type="hidden" id="whCdNm">
            <input type="hidden" id="unitPrice">
        </div>
    </div>
</div>
<script type="text/javascript">
    bomReg.fn_defaultScript();
</script>
</body>
</html>