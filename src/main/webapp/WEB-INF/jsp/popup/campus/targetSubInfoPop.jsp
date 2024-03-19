<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/targetSubInfoPop.js?v=${today}"></script>
<style>
  .pop-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginId" value="${loginVO.id}"/>
<input type="hidden" id="targetYear" value="${data.targetYear}"/>
<div class="card-header pop-header">
  <h3 class="card-title title_NM">학습 목표기술서 설정</h3>
  <div class="btn-st popButton">
    <input type="button" class="k-button k-button-solid k-button-solid-error" value="이전단계" onclick="targetSubInfoPop.prevStep();"/>
      <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="targetSubInfoPop.saveTarget();"/>
      <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick="window.close();"/>
  </div>
</div>
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <%--<div class="panel-heading">
      <h4 class="panel-title">학습 목표기술서 설정</h4>
      <div class="title-road">직무관리 &gt; 학습체계도설정</div>
    </div>--%>

      <div class="panel-body" style="margin-top: 40px;">
      <%--<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>--%>

      <div>
        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <colgroup>
            <col width="25%">
            <col width="80%">
          </colgroup>
          <tr>
            <td colspan="2">
              STEP2-1 : 연계업무 선택
              <br> 1. 아래의 목록에서 자신의 연계업무를 체크하여 선택합니다.
              <br> 2. 저장 후 다음단계인 "STEP 3-2 : 연계업무의 현황 및 레벨설정" 으로 이동합니다.
              <br> 3. 선택된 연계업무는 모두 현황으로 저장되오니 "STEP 3-2" 단계에서 목표를 지정하시기 바랍니다.
              <br> 4. 주업무의 등록/수정을 원하시면 "여기(STEP 2 : 주업무 선택)"를 클릭하시기 바랍니다.
            </td>
          </tr>
          <tr>
            <td style="border-bottom:0; background-color: white">
              <div style="display:flex;">
                <div>
                  <span>적용년도</span>
                  <span>${data.targetYear}년</span>
                </div>
              </div>
            </td>
            <td style="border-bottom:0; background-color: white">
              <div style="display:flex;">
                <div style="width: 100%">
                  <input type="text" id="detailSearch" style="width: 90%;">
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div style="margin:20px 0;">
          <div class="table-responsive">
            <table class="table table-bordered">
              <colgroup>
                <col width="20%" >
                <col width="20%" >
                <col width="20%" >
                <col width="20%" >
                <col width="20%" >
              </colgroup>
              <thead>
              <tr>
                <th>구분</th>
                <th>LEVEL 0</th>
                <th>LEVEL 1</th>
                <th>LEVEL 2</th>
                <th>LEVEL 3</th>
              </tr>
              </thead>
              <tbody id="tableData">
              </tbody>
            </table>
          </div><!-- table-responsive -->
        </div>
      </div>

    </div>
  </div>
</div><!-- col-md-9 -->
<script>
  targetSubInfoPop.init();
</script>
</body>
