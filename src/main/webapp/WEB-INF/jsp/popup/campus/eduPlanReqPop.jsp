<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/eduPlanReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginId" value="${loginVO.id}"/>
<input type="hidden" id="targetYear" value="${data.targetYear}"/>
<input type="hidden" id="eduCategoryId" value="${data.eduCategoryId}"/>
<input type="hidden" id="dutyClass" value="${data.dutyClass}"/>
<input type="hidden" id="eduPlanId" value=""/>
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">학습 목표기술서 설정</h4>
      <div class="title-road">직무관리 &gt; 학습체계도설정</div>
    </div>

    <div class="panel-body">
      <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

      <div>
        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <colgroup>
            <col width="25%">
            <col width="80%">
          </colgroup>
          <tr>
            <td colspan="2">
              STEP4-1 : 학습계획 설정
              <br> 1. 해당 적용구분에 대하여 학습계획을 작성해 주시기 바랍니다.
            </td>
          </tr>
          <tr>
            <td>
              적용년도
            </td>
            <td>
              ${data.targetYear}년
            </td>
          </tr>
          <tr>
            <td>
              적용구분
            </td>
            <td id="categoryRange">
            </td>
          </tr>
          <tr>
            <td>
              학습계획
            </td>
            <td>
              <textarea id="eduPlan" style="width: 100%; height: 200px" <c:if test="${data.status eq 100 || data.status eq 10}">readonly</c:if>></textarea>
            </td>
          </tr>
        </table>
      </div>
      <div class="btn-st mt10" style="text-align: center">
        <c:if test="${data.status ne 100 && data.status ne 10}">
          <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="eduPlanReq.savePlan();"/>
        </c:if>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick="window.close();"/>
      </div>
    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  eduPlanReq.init();
</script>
</body>
