<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/cardToList.js?v=${today}'/>"></script>
<script type="text/javascript" src="/js/intra/inside/asset/popAssetList.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="pjtCd" name="pjtCd" value="${params.pjtCd}"/>
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">반출요청서 리스트(회의 사전승인)</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="margin-top:10px;">
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="30%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">반출일자</th>
                    <td>
                        <input type="text" id="startDt" class="searchInput" style="width: 40%;" onchange="dateValidationCheck('startDt', this.value)">
                        ~
                        <input type="text" id="endDt" class="searchInput" style="width: 40%;" onchange="dateValidationCheck('endDt', this.value)">
                    </td>
                    <th class="text-center th-color">사용내역등록여부</th>
                    <td>
                        <input type="text" id="regHistYn" style="width: 160px;" onchange="cardToList.gridReload();"/>
                    </td>
                    <th class="text-center th-color">검색어</th>
                    <td>
                        <input type="text" id="searchKeyword" style="width: 120px;">
                        <input type="text" id="searchValue" style="width: 240px;" onkeypress="if(window.event.keyCode==13){cardToList.gridReload();}"/>
                        <br>* 카드번호는 끝4자리 검색
                    </td>
                </tr>
            </table>
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
    cardToList.fn_defaultScript();
</script>
</body>
</html>