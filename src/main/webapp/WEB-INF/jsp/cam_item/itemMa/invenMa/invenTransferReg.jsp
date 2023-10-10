<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<script type="text/javascript" src="/js/intra/cam_item/itemMa/invenMa/invenTransferReg.js?v=${today}"/></script>
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
            <h4 class="panel-title">재고이동등록</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠아이템 > 아이템관리 > 재고관리 > 재고이동등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <input type="hidden" id="forwardingDate" name="forwardingDate" value="${nowHyphen}">
                <input type="file" id="file" name="file" onchange="invenTr.fileChange(this)" style="display: none">
            </div>
            <div class="btn-st popButton" style="text-align: right">
                <button type="button" class="k-button k-button-solid-info" onclick="invenTr.setInvenTransferReg()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="$('#listTb *').remove()">초기화</button>
<%--                <button type="button" class="k-button k-button-solid-base" onclick="invenTr.invenTransferExcelFormDown()">양식 다운로드</button>--%>
<%--                <button type="button" class="k-button k-button-solid-base" onclick="$('#file').click()">엑셀 업로드</button>--%>
                <button type="button" class="k-button k-button-solid-base" onclick="invenTr.addRow('new')">품목추가</button>
            </div>
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 10%">
                    <col>
                    <col>
                    <col style="width: 10%">
                    <col style="width: 10%;">
                    <col style="width: 12%;">
                    <col style="width: 12%">
                    <col style="width: 10%">
                    <col style="width: 5%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>이동구분</th>
                        <th>품번</th>
                        <th>품명</th>
                        <th>현재재고</th>
                        <th>이동수량</th>
                        <th>출고처</th>
                        <th>입고처</th>
                        <th>비고</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="listTb">

                </tbody>
            </table>

            <input type="hidden" id="invenSn" onchange="invenTr.itemInfoChange()">
            <input type="hidden" id="masterSn">
            <input type="hidden" id="itemNo">
            <input type="hidden" id="itemName">
            <input type="hidden" id="currentInven">
            <input type="hidden" id="whCd">
            <input type="hidden" id="whCdNm">
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    invenTr.fn_defaultScript();
</script>