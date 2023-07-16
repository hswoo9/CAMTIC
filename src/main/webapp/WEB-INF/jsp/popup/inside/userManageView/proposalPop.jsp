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
      <h3 class="card-title title_NM">제안 제도</h3>
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
          <th colspan="3">제안제도</th>
        </tr>--%>
        <tr>
          <th>구분</th>
          <td colspan="2">
            <input type="text" id="pGubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>년월일</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>주요제안내용</th>
          <td colspan="2">
            <input type="text" id="proposal" style="width: 100%;">
          </td>
        </tr>
        <tr>
          <th>채택여부</th>
          <td colspan="2">
            <input type="text" id="status" value="" style="width: 100%;">
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
    customKendo.fn_textBox("gubun");
    customKendo.fn_textBox("status");
    customKendo.fn_textBox("proposal");

    $("#pGubun").kendoTextBox();
    $("#proposal").kendoTextBox();
    $("#status").kendoTextBox();
  }

  function fn_dataSet(e) {
    var result = customKendo.fn_customAjax('/userManage/userInfoModDetail', {
      key : $("#key").val(),
      type : $("#type").val(),
      id : $("#id").val()
    });

    if(result.flag) {
      var e = result.rs;

      $("#pGubun").val(e.PROPOSAL_GUBUN); //구분
      $("#sDate").val(e.PROPOSAL_DATE); //년월일
      $("#proposal").val(e.PROPOSAL_DETAIL); //주요제안내용
      $("#status").val(e.PROPOSAL_CHECK_CHOICE); //채택여부
    }

    /*수정 안되게 disabled*/
    $("#pGubun").data("kendoTextBox").enable(false);
    $("#proposal").data("kendoTextBox").enable(false);
    $("#status").data("kendoTextBox").enable(false);
  }

  function fn_windowClose() {
    window.close();
  }

</script>
