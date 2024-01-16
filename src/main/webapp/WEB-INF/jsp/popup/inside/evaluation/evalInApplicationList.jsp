<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evalInApplicationList.js?v=${today}"></script>
<style>
  a:hover {
    text-decoration: underline !important;
    color: blue !important;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">
        채용 면접심사 평가
      </h3>
      <div class="btn-st popButton">
        <c:if test="${eval ne null}">
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="evalInApplicationList.setEvalEnd();">심사종료</button>
        </c:if>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
      <input type="hidden" id="stat" value="${params.stat}">
      <input type="hidden" id="evalEmpSeq" name="evalEmpSeq" value="${params.uniqId}">
      <input type="hidden" id="evalType" name="evalType" value="doc">

      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col style="width: 10%">
        </colgroup>
        <tr>
          <th>공고명</th>
          <td>
            <span id="recruitTitle" name="recruitTitle"></span>
          </td>
        </tr>
        <tr>
          <th>채용구분</th>
          <td>
            <input type="text" id="recruitAreaInfoSn" name="recruitAreaInfoSn"/>
          </td>
        </tr>
      </table>

      <div class="mt20">
        <div id="mainGrid"></div>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->

<script>
  evalInApplicationList.fn_defaultScript();
</script>
</body>
