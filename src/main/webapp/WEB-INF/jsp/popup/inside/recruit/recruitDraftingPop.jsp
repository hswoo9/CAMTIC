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
<script type="text/javascript" src="/js/intra/inside/recruit/recruitDraftingPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/recruit/fontJs.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">
<form id="recruitDraftFrm" method="post">
  <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${params.recruitInfoSn}" />
  <input type="hidden" id="menuCd" name="menuCd" value="recruitDraft">
  <input type="hidden" id="type" name="type" value="drafting">
  <input type="hidden" id="nowUrl" name="nowUrl" />
</form>
<div class="col-lg-12 pop_sign_wrap" style="width:1000px;padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">
        채용 전자결재 문서관리
      </h3>
      <div class="btn-st popButton">

        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="table-responsive">
      <div id="mainGrid" style="margin-top: 20px"></div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  recruitDrafting.fn_defaultScript();
</script>
</body>
