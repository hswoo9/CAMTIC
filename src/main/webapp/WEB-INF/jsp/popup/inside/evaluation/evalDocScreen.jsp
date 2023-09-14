<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evalDocScreen.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:950px;padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">
        채용 서류심사 평가표
      </h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
      <input type="hidden" id="evalLoginId" name="evalLoginId" value="${eval.EVAL_LOGIN_ID}">
      <input type="hidden" id="evalType" name="evalType" value="doc">


      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col style="width: 20%">
        </colgroup>
        <tr>
          <th>구분</th>
          <td>
            <input type="text" id="recruitAreaInfoSn" name="recruitAreaInfoSn"/>
          </td>
        </tr>
      </table>

      <table class="searchTable table table-bordered mb-0 mt-20" style="text-align: center">
        <colgroup>
          <col style="width: 8%">
          <col style="width: 8%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 15%">
          <col>
        </colgroup>
        <tr>
          <th rowspan="2">번호</th>
          <th rowspan="2">성명</th>
          <th colspan="3">학력/전공(40점)</th>
          <th colspan="3">서류충실도(60점)</th>
          <th rowspan="2">평가점수(100점)</th>
          <th rowspan="2">기타의견</th>
        </tr>
        <tr>
          <th>상(40)</th>
          <th>중(30)</th>
          <th>하(20)</th>
          <th>상(60)</th>
          <th>중(50)</th>
          <th>하(40)</th>
        </tr>
        <tbody id="applicationTb">

        </tbody>
      </table>
      <div class="btn-st popButton" style="text-align: right">
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="evalDocScreen.setEvalScoreBoard();">저장</button>
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="evalDocScreen.setEvalEnd();">평가종료</button>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->

<script>
  evalDocScreen.fn_defaultScript();
</script>
</body>
