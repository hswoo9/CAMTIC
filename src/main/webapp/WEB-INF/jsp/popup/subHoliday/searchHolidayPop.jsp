<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/subHoliday/searchHolidayReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<div class="table-responsive">
  <div class="card-header pop-header">
    <h3 class="card-title title_NM">휴일근로일자</h3>
    <div class="btn-st popButton">
      <button type="button" class="k-button k-button-solid-info" onclick="searchHolidayReqPop.fn_selectChkUse()">확인</button>
      <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="searchHolidayReqPop.fn_topTableClose()">닫기</button>
    </div>
  </div>
  <div style="padding: 20px 30px;">
    <table class="popTable table table-bordered mb-0">
      <colgroup>
        <col width="20%">
        <col width="80%">
      </colgroup>
      <thead>
      <tr>
        <th>조회년월</th>
        <td>
          <input id="start_date" style="width:150px; margin-right:5px;">
          ~
          <input id="end_date" style="width:150px; margin-right:5px;">
          <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="searchHolidayReqPop.gridReload()">
            조회
          </button>
        </td>
      </tr>
      </thead>
    </table>
    <div id="mainGrid" style="margin:20px 0;"></div>
  </div>
</div>
<script>
  searchHolidayReqPop.defaultScript();
</script>
</body>
