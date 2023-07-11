<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
    .k-grid-norecords{justify-content: space-around;}
</style>
<script type="text/javascript" src="/js/intra/inside/asset/assetList.js?v=${today}"/></script>
<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">자산리스트</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 자산관리 &gt; 자산리스트</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered" style="border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="8%">
                        <col width="12%">
                        <col width="8%">
                        <col width="">
                        <col width="9%">
                        <col width="7%">
                        <col width="8%">
                        <col width="">
                        <col width="8%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회기간</th>
                        <td colspan="3">
                            <input type="text" id="startDate" style="width: 110px;"> ~
                            <input type="text" id="endDate" style="width: 110px;">
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
                            <input type="text" id="categoryA" style="width: 120px;">
                            <input type="text" id="categoryB" style="width: 140px;">
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
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick="assetList.gridReload()"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9" style="text-align: right">
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="바코드 출력(대)" onclick=""/>
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="바코드 출력(소)" onclick=""/>
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="자산관리카드 인쇄" onclick=""/>
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