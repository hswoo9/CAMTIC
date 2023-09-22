<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/equipStatPop.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">장비 증감률 통계</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <table class="searchTable table table-bordered mb-0" style="border: 0; margin-left: 20px;  margin-top : 5px; border: 1px solid #dedfdf; width: 1500px">
            <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="10%">
                <col width="50%">
            </colgroup>
            <tr>
                <th class="text-center th-color">조회년도</th>
                <td>
                    <input type="text" name="applyYear" id="applyYear" style="width: 200px;">
                </td>
                <th class="text-center th-color">구분</th>
                <td>
                    <input type="text" name="searchType" id="searchType" style="width: 600px;">
                </td>
            </tr>
            <tr>
                <th class="text-center th-color">장비</th>
                <td colspan="3" id="test">
                    <input type="text" name="searchEquip" id="searchEquip" style="width: 1200px;">
                </td>
            </tr>
        </table>
        <div id="mainChart"></div>
    </div>
</div>

<script>
    equipStat.init();
</script>
</body>
</html>