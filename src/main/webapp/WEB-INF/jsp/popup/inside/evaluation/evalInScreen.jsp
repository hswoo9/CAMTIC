<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evalInScreen.js?v=${today}"></script>
<style>
  .searchTable > thead > tr > th, .searchTable > tfoot > tr > th {
    background-color: #00397f96;
    color: white;
    text-align: center;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1000px;padding: 0px">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">
        채용 면접심사 평가표
      </h3>
    </div>

    <div class="panel-body">
      <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruit.RECRUIT_INFO_SN}">
      <input type="hidden" id="evalItemMainId" name="evalItemMainId" value="${recruit.INTERVIEW_EVAL_SHEET}">
      <input type="hidden" id="evalLoginId" name="evalLoginId" value="${eval.EVAL_LOGIN_ID}">
      <input type="hidden" id="applicationId" name="applicationId" value="${application.APPLICATION_ID}">
      <input type="hidden" id="evalType" name="evalType" value="doc">


      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col style="width: 10%">
        </colgroup>
        <tr>
          <th>공고명</th>
          <td colspan="4">
            <span id="recruitTitle" name="recruitTitle">${recruit.RECRUIT_TITLE}</span>
          </td>
        </tr>
        <tr>
          <th>채용구분</th>
          <td colspan="4">
            <span id="recruitAreaInfoSn" name="recruitAreaInfoSn">${application.JOB}</span>
          </td>
        </tr>
        <tr>
          <th>지원자</th>
          <td>
            <span id="userName" name="userName">${application.USER_NAME}</span>
          </td>
        </tr>
      </table>

      <table class="searchTable table table-bordered mb-0 mt-20" style="text-align: center" id="listTb">
        <colgroup>
          <col style="width: 8%">
          <col style="width: 15%">
          <col>
          <col style="width: 10%">
          <col style="width: 10%">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>연번</th>
            <th>평가구분</th>
            <th>질문 및 평가에 대한 착안점</th>
            <th>평가</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody id="evalTb">

        </tbody>
        <tfoot id="evalTf">
          <tr>
            <th colspan="3">총점</th>
            <td>100</td>
            <td>
              <span id="sum_${application.APPLICATION_ID}">0</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <p>
        ※ 채점기준점수 : ▲80점이상 : 합격 ▲80점미만~70점이상 : 후보 ▲70점미만 : 불합격
      </p>

      <table class="searchTable table table-bordered mb-0 mt-20" style="text-align: center">
        <thead>
        <tr>
          <th>의견</th>
        </tr>
        <tr>
          <td>
            <textarea id="opinion">

            </textarea>
          </td>
        </tr>
        </thead>
      </table>
      <div class="btn-st popButton" style="text-align: right">
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="evalInScreen.setEvalScoreBoard();">저장</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->

<script>
  evalInScreen.fn_defaultScript();
</script>
</body>
