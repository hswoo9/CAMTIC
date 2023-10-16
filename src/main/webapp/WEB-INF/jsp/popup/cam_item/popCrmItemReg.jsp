<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/popup/popCrmItemReg.js?v=${today}"/></script>
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
        <input type="hidden" id="crmSn" name="crmSn" value="${data.CRM_SN}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="popTitle">고객품번관리</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="cir.setReceivingReg()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="cir.delRow()">삭제</button>
                <button type="button" class="k-button k-button-solid-base" onclick="cir.addRow('new')">품목추가</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <div>
                <input type="hidden" id="whDt" name="whDt" value="${nowHyphen}">
                <input type="file" id="file" name="file" onchange="cir.fileChange(this)" style="display: none">
            </div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 10%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>업체명</th>
                        <td>${data.CRM_NM}</td>
                    </tr>
                </thead>
            </table>

            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 3%">
                    <col>
                    <col>
                    <col>
                    <col>
                    <col style="width: 10%">
                    <col style="width: 10%">
                </colgroup>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" id="checkAll">
                    </th>
                    <th>품번</th>
                    <th>품명</th>
                    <th>거래처품번</th>
                    <th>거래처품명</th>
                    <th>업무구분</th>
                    <th>사용구분</th>
                </tr>
                </thead>
                <tbody id="listTb">

                </tbody>
            </table>

            <input type="hidden" id="masterSn" onchange="cir.masterSnChange()">
            <input type="hidden" id="itemNo">
            <input type="hidden" id="itemName">
        </div>
    </div>
</div>

<script type="text/javascript">
    cir.fn_defaultScript();
</script>
</body>
</html>