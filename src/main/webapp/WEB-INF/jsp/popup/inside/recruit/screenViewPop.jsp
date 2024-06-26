<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowH" pattern="yyyy년MM월dd일" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/screenViewPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/recruit/fontJs.js?v=${today}"></script>

<script type="text/javascript" src="/js/jspdf.min.js"></script>
<script type="text/javascript" src="/js/html2canvas.min.js"></script>
<style>
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }

  .k-grid-norecords{
    justify-content: space-around;
    height: 50px !important;
  }

  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 4px 15px;
  }


</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1000px;padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">
        <c:choose>
          <c:when test="${params.type eq 'doc'}">
            채용 서류심사 평가결과
          </c:when>
          <c:otherwise>
            채용 면접심사 평가결과
          </c:otherwise>
        </c:choose>
      </h3>
      <div class="btn-st popButton">
        <c:choose>
          <c:when test="${params.type eq 'doc'}">
            <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="pdfMake()">평가표 다운로드 PDF</button>
            <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="screenViewPop.screenPrintPop()">평가표 다운로드 HWP</button>
          </c:when>
          <c:otherwise>
            <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="pdfMake2()">평가표 다운로드 PDF</button>
            <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="screenViewPop.screenPrintPop2()">평가표 다운로드 HWP</button>
          </c:otherwise>
        </c:choose>

        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruit.RECRUIT_INFO_SN}">
      <input type="hidden" id="recruitEvalSheetId" name="recruitEvalSheetId" value="${recruit.RECRUIT_EVAL_SHEET_ID}">
      <input type="hidden" id="stat" value="${params.stat}">
      <input type="hidden" id="type" name="type" value="${params.type}">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col style="width: 10%">
        </colgroup>
        <tr>
          <th>공고명</th>
          <td>
            <span id="recruitTitle">${recruit.RECRUIT_TITLE}</span>
          </td>
        </tr>
        <tr>
          <th>채용분야</th>
          <td>
            <input type="text" id="recruitAreaInfoSn">
          </td>
        </tr>
      </table>

      <div id="tbDiv">
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  screenViewPop.init('${nowH}');
</script>
</body>
