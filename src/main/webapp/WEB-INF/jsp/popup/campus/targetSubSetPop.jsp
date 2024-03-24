<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/targetSubSetPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginId" value="${loginVO.id}"/>
<input type="hidden" id="targetYear" value="${data.targetYear}"/>
<div class="card-header pop-header">
  <h3 class="card-title title_NM">학습 목표기술서 설정</h3>
  <div class="btn-st popButton">
      <input type="button" class="k-button k-button-solid-error" value="이전단계" onclick="targetSubSetPop.prevStep()"/>
      <input type="button" class="k-button k-button-solid k-button-solid-info" value="현황저장" onclick="targetSubSetPop.setEduTargetDetailUpdate('target', 1)"/>
      <input type="button" class="k-button k-button-solid k-button-solid-info" value="목표저장" onclick="targetSubSetPop.setEduTargetDetailUpdate('target', 2)"/>
      <input type="button" class="k-button k-button-solid k-button-solid-info" value="완료" onclick="targetSubSetPop.nextStep()"/>
  </div>
</div>
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <%--<div class="panel-heading">
      <h4 class="panel-title">학습 목표기술서 설정</h4>
      <div class="title-road">직무관리 &gt; 학습체계도설정</div>
    </div>--%>

    <div class="panel-body">
      <%--<div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>--%>

      <div>
        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <tr>
            <td>
              STEP2-2 : 연계업무 현황 및 목표 설정
              <br> 1. 앞서 STEP 2-1에서 설정한 연계업무의 직무는 모두 현황으로 저장되어 있습니다. 목표를 구분하시기 바랍니다.
              <br> 2. 각 직무의 체크박스에 체크선택 하여 하단의 "현황저장"과 "목표저장" 버튼을 이용하여 각각 설정합니다.
              <br> 3. 이 단계까지 완성하시면 연계업무의 학습현황 및 목표설정은 완료되며,
              <br> 4. 학습 목표기술서 메인화면에서 "학습목표"를 입력하시기 바랍니다.
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
          </tr>
        </table>
        <div class="mt20">
          <b>color : <font color="#9a4167">현황</font>, <font color="#418bd7">목표</font></b>
        </div>
        <div style="margin:20px 0;">
          <div class="table-responsive">
            <table class="table table-bordered">
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
  targetSubSetPop.init();
</script>
</body>
