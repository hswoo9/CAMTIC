<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<%--<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>--%>
<body class="font-opensans" style="background-color:#fff;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">상벌 사항</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="fn_windowClose()">닫기</button>
      </div>
    </div>
    <form id="subHolidayReqPop" style="padding: 20px 30px;">
      <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
      <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
      <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
      <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
      <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
      <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
      <table class="popTable table table-bordered mb-0" id="userReqPop">
        <colgroup>
          <col width="30%">
          <col width="30%">
          <col width="30%">
        </colgroup>
        <thead>
        <%--<tr>
          <th colspan="3">상벌 사항</th>
        </tr>--%>
        <tr>
          <th>구분(표창/징계)</th>
          <td colspan="2">
            <input type="text" id="rGubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>포상/징계 일자</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 50%;" disabled>
          </td>
        </tr>
        <tr>
          <th>공적(징계) 사항</th>
          <td colspan="2">
            <input type="text" id="rIssue" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>시행처</th>
          <td colspan="2">
            <input type="text" id="agency" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>증명서</th>
          <td colspan="2">
            <input type="file" disabled>
          </td>
        </tr>
      </table>
    </form>
  </div>
</body>
<script>
  <%--  gubun  sDate eDate school gkrdnl whfdjq score bmk--%>
  /*fn_datePicker
  fn_textBox*/
  var jsonData = JSON.parse(opener.userInfoMod.global.jsonData);
  $(function(){
    fn_default();
    fn_dataSet(jsonData);
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_textBox("gubun");
    customKendo.fn_textBox("rIssue");
    customKendo.fn_textBox("agency");

    $("#rGubun").kendoTextBox();
    $("#rIssue").kendoTextBox();
    $("#agency").kendoTextBox();
  }

  function fn_dataSet(e) {
    $("#rGubun").val(e.REWORD_TYPE_NAME); //구분(표창/징계)
    $("#sDate").val(e.REWORD_DAY); //포상/징계 일자
    $("#rIssue").val(e.RWD_OFM); //공적(징계) 사항
    $("#agency").val(e.RWD_ST_COMP); //시행처

    /*수정 안되게 disabled*/
    $("#rGubun").data("kendoTextBox").enable(false);
    $("#rIssue").data("kendoTextBox").enable(false);
    $("#agency").data("kendoTextBox").enable(false);
  }

  function fn_windowClose() {
    window.close();
  }

</script>
