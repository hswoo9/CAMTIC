<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/inEvalRegPop.js?v=${today}"></script>
<style>
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }

  .k-grid-norecords{
    justify-content: space-around;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">면접평가표 등록</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="inEvalRegPop.setInEvalItem();">저장</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>

    <div class="panel-body">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

      <table class="searchTable table table-bordered mb-0">
        <colgroup>
          <col style="width:12em;">
          <col>
        </colgroup>
        <tr>
          <th>관리명</th>
          <td>
            <input type="hidden" id="evalItemMainId" name="evalItemMainId" value="${params.evalItemMainId}">
            <input type="text" id="evalManageTitle" name="evalManageTitle" autocomplete='off'>
          </td>
        </tr>
      </table>

        <div class="mt20" style="display: flex;justify-content: space-between;">
          <div>
            평가분야 수
            <input type="text" class="__inp" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" onkeypress="if(window.event.keyCode==13){inEvalRegPop.addRow()}" id="evalItemTypeCnt" name="evalItemTypeCnt" style="text-align:right;padding-right: 1rem;width: 10rem">
            개
          </div>
          <div>
            <button class="k-button k-button-solid-info" onclick="inEvalRegPop.addRow()">생성</button>
          </div>
        </div>

      <table class="searchTable table table-bordered mb-0 mt20" id="itemTb">
        <colgroup>
          <col style="width:7rem;">
          <col style="width:7rem;">
          <col style="width:18rem;">
          <col>
          <col style="width:8em;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">연번</th>
            <th scope="col">순번</th>
            <th scope="col">평가구분</th>
            <th scope="col">질문 및 평가에 대한 착안점</th>
            <th scope="col">점수</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  inEvalRegPop.fn_defaultScript();
</script>
</body>
