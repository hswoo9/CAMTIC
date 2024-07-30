<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/inside/asset/popAssetList.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">불용자산 리스트</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="margin-top:10px;">
            <table class="popTable table table-bordered mb-0">
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
            </table>
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    popAssetList.fn_deafultScript();
</script>
</body>
</html>