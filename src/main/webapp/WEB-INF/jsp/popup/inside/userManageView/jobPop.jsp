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
      <h3 class="card-title title_NM">직무 사항</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="fn_windowClose()">닫기</button>
      </div>
    </div>
    <form id="subHolidayReqPop" style="padding: 20px 30px;">
      <input type="hidden" id="type" name="type" value="${params.type}">
      <input type="hidden" id="key" name="key" value="${params.key}">
      <input type="hidden" id="id" name="id" value="${params.id}">
      <table class="popTable table table-bordered mb-0" id="userReqPop">
        <colgroup>
          <col width="30%">
          <col width="30%">
          <col width="30%">
        </colgroup>
        <thead>
        <%--<tr>
          <th colspan="3">직무사항</th>
        </tr>--%>
        <tr>
          <th>근무 기간</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled> ~ <input type="text" id="eDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>계약연봉</th>
          <td colspan="2">
            <input type="text" id="pay" style="width: 95%;">
          </td>
        </tr>
        <tr>
          <th>주요직무</th>
          <td colspan="2">
            <input type="text" id="work" value="" style="width: 95%;">
          </td>
        </tr>
        <tr>
          <th>직급</th>
          <td colspan="2">
            <input type="text" id="rank" style="width: 50%;">
          </td>
        </tr>
      </table>
    </form>
  </div>
</body>
<script>
  $(function(){
    fn_default();
    fn_dataSet();
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_datePicker("eDate", '', "yyyy-MM-dd", '');
    customKendo.fn_textBox("pay");
    customKendo.fn_textBox("work");
    customKendo.fn_textBox("rank");

    $("#pay").kendoTextBox();
    $("#work").kendoTextBox();
    $("#rank").kendoTextBox();
  }
  function fn_windowClose() {
    window.close();
  }
  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/userInfoModDetail', {
      key : $("#key").val(),
      type : $("#type").val(),
      id : $("#id").val()
    });

    if(result.flag) {
      var e = result.rs;

      $("#sDate").val(e.WORK_JOIN_DAY); //근무시작일
      $("#eDate").val(e.WORK_LEAVE_DAY); //근무종료일
      $("#pay").val(e.WORK_PAY); //계약연봉
      $("#work").val(e.DUTY_DETAIL); //주요직무
      $("#rank").val(e.POSITON_NAME); //직급이름
    }

    /*수정 안되게 disabled*/
    $("#pay").data("kendoTextBox").enable(false);
    $("#work").data("kendoTextBox").enable(false);
    $("#rank").data("kendoTextBox").enable(false);

  }
</script>
