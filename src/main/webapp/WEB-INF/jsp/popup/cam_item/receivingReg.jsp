<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/popup/receivingReg.js?v=${today}"/></script>
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

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">입고등록</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="regRv.setReceivingReg()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="regRv.resetRow()">초기화</button>
                <button type="button" class="k-button k-button-solid-base" onclick="regRv.receivingExcelFormDown()">양식 다운로드</button>
                <button type="button" class="k-button k-button-solid-base" onclick="$('#file').click()">엑셀 업로드</button>
                <button type="button" class="k-button k-button-solid-base" onclick="regRv.addRow('new')">품목추가</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <div>
                <input type="hidden" id="whDt" name="whDt" value="${nowHyphen}">
                <input type="file" id="file" name="file" onchange="regRv.fileChange(this)" style="display: none">
            </div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 17%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%">
                    <col style="width: 7%;">
                    <col style="width: 10%">
                    <col style="width: 8%">
                    <col style="width: 11%;">
                    <col style="width: 8%;">
                    <col style="width: 4%">
                </colgroup>
                <thead>
                <tr>
                    <th>업체</th>
                    <th>품번</th>
                    <th>품명</th>
                    <th>입고형태</th>
                    <th>입고량</th>
                    <th>원가</th>
                    <th>금액</th>
                    <th>입고창고</th>
                    <th>비고</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="listTb">

                </tbody>
            </table>

            <input type="hidden" id="crmSn" onchange="regRv.crmInfoChange()">
            <input type="hidden" id="crmNm">
            <input type="hidden" id="unitPrice" onchange="regRv.unitPriceChange()">

            <input type="hidden" id="masterSn" onchange="regRv.masterSnChange()">
            <input type="hidden" id="itemNo">
            <input type="hidden" id="itemName">
            <input type="hidden" id="baseWhCd">
        </div>
    </div>
</div>

<script type="text/javascript">
    regRv.fn_defaultScript();
</script>
</body>
</html>