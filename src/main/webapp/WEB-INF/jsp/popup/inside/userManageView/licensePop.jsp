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
      <h3 class="card-title title_NM">보유 면허</h3>
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
          <th colspan="3">보유 면허</th>
        </tr>--%>
        <tr>
          <th>종류</th>
          <td colspan="2">
            <input type="text" id="licenseName" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>취득일</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>자격번호</th>
          <td colspan="2">
            <input type="text" id="licenseNum" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>발급기관</th>
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
  /*fn_datePicker
  fn_textBox*/
  var jsonData = JSON.parse(opener.userInfoMod.global.jsonData);
  $(function(){
    fn_default();
    fn_dataSet(jsonData);
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_textBox("licenseName");
    customKendo.fn_textBox("licenseNum");
    customKendo.fn_textBox("agency");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
    $("#licenseName").kendoTextBox();
    $("#licenseNum").kendoTextBox();
    $("#agency").kendoTextBox();
  }
  function fn_dataSet(e) {
    $("#licenseName").val(e.CERTIFICATE_NAME); //자격/면허명
    $("#sDate").val(e.ACQUISITION_DAY); //취득일
    $("#licenseNum").val(e.CERTIFICATE_NUM); //자격/면허 번호
    $("#agency").val(e.ISSUER); //발급기관
    $("#bmk").val(e.RMK); //비고

    /*수정 안되게 disabled*/
    $("#licenseName").data("kendoTextBox").enable(false);
    $("#licenseNum").data("kendoTextBox").enable(false);
    $("#agency").data("kendoTextBox").enable(false);
    $("#bmk").data("kendoTextArea").enable(false);

  }

  function fn_windowClose() {
    window.close();
  }

</script>
