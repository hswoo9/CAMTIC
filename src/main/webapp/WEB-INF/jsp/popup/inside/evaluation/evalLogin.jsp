<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evalLogin.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">
        <c:choose>
          <c:when test="${params.type eq 'doc'}">
            서류심사 로그인
          </c:when>
          <c:otherwise>
            면접심사 로그인
          </c:otherwise>
        </c:choose>
      </h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
      <input type="hidden" id="evalType" name="evalType" value="${params.type}">


      <table class="searchTable table table-bordered mb-0">
        <c:choose>
          <c:when test="${params.type eq 'doc'}">
            <colgroup>
              <col style="width: 20%">
            </colgroup>
          </c:when>
          <c:otherwise>
            <colgroup>
              <col style="width: 10%">
            </colgroup>
          </c:otherwise>
        </c:choose>
        <tr>
          <th>공고명</th>
          <td>
            <span id="recruitTitle"></span>
          </td>
        </tr>
      </table>

      <table class="searchTable table table-bordered mb-0 mt-20">
        <c:choose>
          <c:when test="${params.type eq 'doc'}">
            <colgroup>
              <col style="width: 20%">
            </colgroup>
          </c:when>
          <c:otherwise>
            <colgroup>
              <col style="width: 10%">
            </colgroup>
          </c:otherwise>
        </c:choose>
        <tr>
          <th>아이디</th>
          <td>
            <input type="text" id="userId" name="userId" onkeypress="if(window.event.keyCode==13){evalLogin.setEvalLogin()}">
          </td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td>
            <input type="password" id="userPassword" name="userPassword" onkeypress="if(window.event.keyCode==13){evalLogin.setEvalLogin()}">
          </td>
        </tr>
      </table>
      <div class="btn-st popButton" style="text-align: right">
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="evalLogin.setEvalLogin();">로그인</button>
      </div>
    </div>
  </div>

  <input type="hidden" id="userIdSub1" name="id_sub1" value="">
  <input type="hidden" id="userIdSub2" name="id_sub2" value="">
</div><!-- col-md-9 -->

<script src="/js/intra/common/securityEncUtil.js?v=1"></script>
<script src="/js/intra/common/aes.js?v=1"></script>
<script>
  evalLogin.init();
</script>
</body>
