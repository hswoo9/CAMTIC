<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/assetList.js?v=${today}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">자산리스트</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 자산관리 &gt; 자산리스트</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="8%">
                        <col width="15%">
                        <col width="8%">
                        <col width="15">
                        <col width="9%">
                        <col width="15%">
                        <col width="8%">
                        <col width="">
                        <col width="8%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회기간</th>
                        <td colspan="3">
                            <input type="text" id="startDate" style="width: 25%;"> ~
                            <input type="text" id="endDate" style="width: 25%;">
                        </td>
                        <th class="text-center th-color">자산소속</th>
                        <td>
                            <input type="text" id="assetPosition" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">자산분류</th>
                        <td colspan="2">
                            <input type="text" id="assetType" style="width: 120px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">카테고리</th>
                        <td colspan="3">
                            <input type="text" id="categoryA" style="width: 120px; margin-right: 5px;">
                            <input type="text" id="categoryB" style="width: 140px; margin-right: 5px;">
                            <input type="text" id="categoryC" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">자산상태</th>
                        <td>
                            <input type="text" id="assetStatus" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">설치장소</th>
                        <td colspan="2">
                            <input type="text" id="assetPlace" style="width: 240px">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">등록상태</th>
                        <td>
                            <input type="text" id="regStatus" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">바코드</th>
                        <td>
                            <input type="text" id="barcodeType" style="width: 130px; margin-left: 12px; margin-right: 40px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td colspan="5">
                            <input type="text" id="searchType" style="width: 140px; margin-right: 6px;" on>
                            <input type="text" id="searchContent" style="width: 66.1%" onkeypress="if(window.event.keyCode==13){assetList.gridReload()}">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9" style="text-align: right">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.setBarcodePrintA()">바코드 출력(대)</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="assetList.setBarcodePrintB()">바코드 출력(소)</button>

                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    assetList.fnDefaultScript();
</script>