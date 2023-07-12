<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/rewardGubunPop.js?v=${today}"></script>
<style>
/*  .dash-left .table > thead > tr > th, .dash-right .table > thead > tr > th, .dash-left .table > tbody > tr > th, .dash-right .table > tbody > tr > th, .dash-left .table > tfoot > tr > th, .dash-right .table > tfoot > tr > th, .dash-left .table > thead > tr > td, .dash-right .table > thead > tr > td, .dash-left .table > tbody > tr > td, .dash-right .table > tbody > tr > td, .dash-left .table > tfoot > tr > td, .dash-right .table > tfoot > tr > td {
    padding-left: 10px;
    padding-right: 10px;
  }*/
  td {
    text-align: center;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div style="background-color: #00397f;">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">포상 구분 관리</h3>
      <div class="btn-st popButton" >
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
      </div>
    </div>
  </div>
  <form id="rewardGubunPop" style="padding: 20px 30px;">
    <table class="popTable table table-bordered" style="margin-top: 10px;">
        <colgroup>
          <col width="20%">
          <col width="45%">
          <col width="33%">
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>포상구분</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              1
            </td>
            <td>
              <input type="text" id="text1" style="width: 100%">
            </td>
            <td>
              <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="">저장</button>
            </td>
          </tr>
          <tr>
            <td>
              추가
            </td>
            <td>
              <input type="text" id="text2" style="width: 100%">
            </td>
            <td>
              <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">추가</button>
            </td>
          </tr>
        </tbody>
      </table>
  </form>
</div><!-- col-md-9 -->
<script>
  rewardGubunPop.init();
</script>
</body>
