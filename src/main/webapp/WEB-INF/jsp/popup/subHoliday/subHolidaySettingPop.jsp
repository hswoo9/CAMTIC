<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidaySettingPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">휴가 설정 이력</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <table class="searchTable table table-bordered mb-0" style="border: 0; margin-left: 20px;  margin-top : 5px; border: 1px solid #dedfdf; width: 1500px">
            <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="10%">
                <col width="30%">
                <col width="10%">
                <col width="10%">
            </colgroup>
            <tr>
                <th class="text-center th-color">조회기간</th>
                <td>
                    <input id="startDt" style="width: 120px;"> ~ <input id="endDt" style="width: 120px;">
                </td>
                <th class="text-center th-color">수정자</th>
                <td colspan="4">
                    <input id="searchVal" onkeypress="if(window.event.keyCode==13){holidayHist.gridReload()}" style="width: 140px;">
                </td>
            </tr>
        </table>
        <div id="mainGrid" style="margin:20px 0;"></div>
    </div>
</div>
<script>
    holidayHist.fn_defaultScript();
</script>
</body>
</html>
