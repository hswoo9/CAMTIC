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
      <h3 class="card-title title_NM">경력 사항</h3>
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
          <th colspan="3">경력 등록</th>
        </tr>--%>
        <tr>
          <th>기간</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled> ~ <input type="text" id="eDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>근무처</th>
          <td colspan="2">
            <input type="text" id="place" style="width: 95%;">
          </td>
        </tr>
        <tr>
          <th>직위(급)</th>
          <td colspan="2">
            <input type="text" id="position" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>담당업무</th>
          <td colspan="2">
            <input type="text" id="workType" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>근무년수</th>
          <td colspan="2">
            <input type="text" id="dateY" style="width: 10%;"> 년 <input type="text" id="dateM" style="width: 10%;"> 개월
          </td>
        </tr>
        <tr>
          <th>증명서</th>
          <td colspan="2">
            <input type="file" disabled>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td colspan="2">
            <textarea name="bmk" id="bmk" placeholder="비고" style="width: 100%;"></textarea>
          </td>
        </tr>
      </table>
    </form>
  </div>
</body>
<script>
  <%--  gubun  sDate eDate school gkrdnl whfdjq score bmk--%>
  var jsonData = JSON.parse(opener.userInfoMod.global.jsonData);
  $(function(){
    fn_default();
    fn_dataSet(jsonData);
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_datePicker("eDate", '', "yyyy-MM-dd", '');
    customKendo.fn_textBox("gubun");
    customKendo.fn_textBox("place");
    customKendo.fn_textBox("position");
    customKendo.fn_textBox("workType");
    customKendo.fn_textBox("dateY");
    customKendo.fn_textBox("dateM");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
    $("#place").kendoTextBox();
    $("#position").kendoTextBox();
    $("#workType").kendoTextBox();
    $("#dateY").kendoTextBox();
    $("#dateM").kendoTextBox();

  }
  function fn_dataSet(e) {
    $("#sDate").val(e.JOIN_DAY);
    $("#eDate").val(e.RESIGN_DAY);
    $("#place").val(e.EMPLOY_DEPT_NAME);
    $("#position").val(e.POSITION_OR_DUTY);
    $("#workType").val(e.MAIN_TASK);
    $("#dateY").val(e.CAREER_PERIOD);
    $("#dateM").val(e.CAREER_MONTH);
    $("#bmk").val(e.RMK);

    /*수정 안되게 disabled*/
    $("#place").data("kendoTextBox").enable(false);
    $("#position").data("kendoTextBox").enable(false);
    $("#workType").data("kendoTextBox").enable(false);
    $("#dateY").data("kendoTextBox").enable(false);
    $("#dateM").data("kendoTextBox").enable(false);
    $("#bmk").data("kendoTextArea").enable(false);

  }

  function fn_windowClose() {
    window.close();
  }
</script>
