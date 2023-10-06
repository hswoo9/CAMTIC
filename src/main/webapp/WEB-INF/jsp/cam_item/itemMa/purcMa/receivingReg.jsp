<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<script type="text/javascript" src="/js/intra/cam_item/itemMa/purcMa/receivingReg.js?v=${today}"/></script>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .percentInput {
        text-align: right;
    }
</style>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">입고등록</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠아이템 > 아이템관리 > 구매관리 > 입고등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <input type="hidden" id="whDt" name="whDt" value="${nowHyphen}">
                <input type="file" id="file" name="file" onchange="regRv.fileChange(this)" style="display: none">
            </div>
            <div class="btn-st popButton" style="text-align: right">
                <button type="button" class="k-button k-button-solid-info" onclick="regRv.setReceivingReg()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="$('#listTb *').remove()">초기화</button>
                <button type="button" class="k-button k-button-solid-base" onclick="regRv.receivingExcelFormDown()">양식 다운로드</button>
                <button type="button" class="k-button k-button-solid-base" onclick="$('#file').click()">엑셀 업로드</button>
                <button type="button" class="k-button k-button-solid-base" onclick="regRv.addRow('new')">품목추가</button>
            </div>
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 14%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%">
                    <col style="width: 7%;">
                    <col style="width: 7%;">
                    <col style="width: 7%">
                    <col style="width: 10%">
                    <col style="width: 11%;">
                    <col style="width: 9%;">
                    <col style="width: 5%">
                </colgroup>
                <thead>
                    <tr>
                        <th>업체</th>
                        <th>품번</th>
                        <th>품명</th>
                        <th>입고형태</th>
                        <th>입고량</th>
                        <th>입고중량</th>
                        <th>단가</th>
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
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    regRv.fn_defaultScript();
</script>