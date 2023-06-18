<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/targetEduSetPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginId" value="${loginVO.id}"/>
<input type="hidden" id="targetYear" value="${data.targetYear}"/>
<div class="col-md-12 col-lg-12 dash-left">
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">학습 목표기술서 선택</h4>
      <div class="title-road">학습관리 &gt; 개인학습신청</div>
    </div>

    <div class="panel-body">
      <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

      <div>
        <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
          <tr>
            <td>
              아래의 직무중 신청하고자 하시는 학습에 해당하는 직무레벨을 선택하여 주세요
            </td>
          </tr>
        </table>
        <div class="mt20">
          <b>color : <font color="#9a4167">현황</font>, <font color="#418bd7">목표</font></b>
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
  targetEduSetPop.init();
</script>
</body>
