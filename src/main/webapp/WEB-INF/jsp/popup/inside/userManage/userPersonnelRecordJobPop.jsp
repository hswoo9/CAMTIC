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
        <button type="button" class="k-button k-button-solid-info" onclick="fu_addInfo()">추가</button>
        <button type="button" class="k-button k-button-solid-info" onclick="fu_modiInfo()">수정</button>
        <button type="button" class="k-button k-button-solid-info" onclick="fu_delInfo()">삭제</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="fn_windowClose()">닫기</button>
      </div>
    </div>

    <form id="subHolidayReqPop" style="padding: 20px 30px;">
      <input type="hidden" id="pk" name="pk" value="${pk}">
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
          <th colspan="3">직무사항</th>
        </tr>--%>
        <tr>
          <th>
            <span class="red-star"></span>근무 기간
          </th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;"> ~ <input type="text" id="eDate" style="width: 45%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>계약연봉
          </th>
          <td colspan="2">
            <input type="text" id="pay" style="width: 95%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>주요직무
          </th>
          <td colspan="2">
            <input type="text" id="work" value="" style="width: 95%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>직급
          </th>
          <td colspan="2">
            <input type="text" id="rank" style="width: 50%;">
          </td>
        </tr>
      </table>
    </form>
  </div>
</div>
</body>
<script>
  <%--  gubun  sDate eDate school gkrdnl whfdjq score bmk--%>
  /*fn_datePicker
  fn_textBox*/
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

  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/getJobinfoList.do', {
      pk : $("#pk").val()
    });

    if(result.flag) {
      var e = result.rs;

      $("#sDate").val(e.WORK_JOIN_DAY);
      $("#eDate").val(e.WORK_LEAVE_DAY);
      $("#pay").val(e.WORK_PAY);
      $("#work").val(e.DUTY_DETAIL);
      $("#rank").val(e.POSITON_NAME);
    }
  }

  // 직무사항 등록
  function fu_addInfo() {
    var data = {
      WORK_PAY : $("#pay").val(),
      sDate : $("#sDate").val(),
      eDate : $("#eDate").val(),
      DUTY_DETAIL : $("#work").val(),
      POSITON_NAME : $("#rank").val(),
      type : "job",
      applicationactive : "등록",
    }

    var formData = new FormData();
    formData.append("WORK_PAY", data.WORK_PAY);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("DUTY_DETAIL", data.DUTY_DETAIL);
    formData.append("POSITON_NAME", data.POSITON_NAME);
    formData.append("type", "job");
    formData.append("applicationactive", data.applicationactive);

    var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);
    if(result.flag){
      if(result.rs == "SUCCESS") {
        alert("등록요청을 성공하였습니다. 관리자 승인 대기 중입니다.");
        fn_windowClose();
      }else{
        alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
      }
    }else{
      alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
    }
  }

  // 직무사항 수정
  function fu_modiInfo() {
    var data = {
      WORK_PAY : $("#pay").val(),
      sDate : $("#sDate").val(),
      eDate : $("#eDate").val(),
      DUTY_DETAIL : $("#work").val(),
      POSITON_NAME : $("#rank").val(),
      type : "job",
      pk : $("#pk").val(),
      applicationactive : "수정",
    }

    var formData = new FormData();
    formData.append("WORK_PAY", data.WORK_PAY);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("DUTY_DETAIL", data.DUTY_DETAIL);
    formData.append("POSITON_NAME", data.POSITON_NAME);
    formData.append("type", "job");
    formData.append("pk", data.pk);
    formData.append("applicationactive", data.applicationactive);

    var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);
    console.log(result.rs);
    if(result.flag){
      if(result.rs == "SUCCESS") {
        alert("수정요청이 완료되었습니다. 관리자 승인 대기 중입니다.");
        fn_windowClose();
      }else{
        alert("수정요청이 완료되었습니다. 관리자 승인 대기 중입니다.");
      }
    }else{
      alert("수정요청에 실패하였습니다. 다시 확인부탁드립니다.");
    }
  }

  function fn_windowClose() {
    window.close();
  }
</script>
