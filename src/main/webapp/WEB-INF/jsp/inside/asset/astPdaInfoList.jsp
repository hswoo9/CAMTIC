<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/astPdaInfoList.js?v=${today}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">재물조사 연동목록</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 자산관리 &gt; 재물조사 연동목록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="27%">
                        <col width="10%">
                        <col width="">
                        <col width="10%">
                        <col width="">
                        <col width="10%">
                        <col width="">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회기간</th>
                        <td>
                            <input type="text" id="startDate" style="width: 110px;"> ~
                            <input type="text" id="endDate" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">기존위치</th>
                        <td colspan="3">
                            <input type="text" id="originAssetPlace">
                        </td>
                        <th class="text-center th-color">신규위치</th>
                        <td colspan="3">
                            <input type="text" id="newAssetPlace">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">작업구분</th>
                        <td>
                            <input type="text" id="workType" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">자산상태</th>
                        <td>
                            <input type="text" id="astStsCode" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">재물조사</th>
                        <td>
                            <input type="text" id="inspectionType" style="width: 100px;">
                        </td>
                        <th class="text-center th-placeModType">위치변경</th>
                        <td>
                            <input type="text" id="placeModType" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">상태변경</th>
                        <td>
                            <input type="text" id="astStsCodeModType" style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">목록</th>
                        <td colspan="5">
                            <input type="text" id="searchType" style="width: 140px; margin-right: 6px;">
                            <input type="text" id="searchContent" style="width: 72.3%;" onkeypress="if(window.event.keyCode==13){astPdaInfoList.gridReload()}">
                        </td>
                        <td colspan="4" style="text-align: right">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.setAppApkDownLoad()">재물조사 앱</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.getAssetList()">가져오기</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.setAssetUploadAll()">재물조사 업로드</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="astPdaInfoList.setBarcodePrintA()">바코드 출력(대)</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">바코드 출력(소)</button>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    astPdaInfoList.fnDefaultScript();
</script>