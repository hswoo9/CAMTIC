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
        <button type="button" class="k-button k-button-solid-info" onclick="fu_addInfo()">추가</button>
        <button type="button" class="k-button k-button-solid-info" onclick="fu_modifyInfo()">수정</button>
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
          <th colspan="3">제안제도</th>
        </tr>--%>
        <tr>
          <th>
            <span class="red-star"></span>구분
          </th>
          <td colspan="2">
            <input type="text" id="pGubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>년월일
          </th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>주요제안내용
          </th>
          <td colspan="2">
            <input type="text" id="proposal" style="width: 100%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>채택여부
          </th>
          <td colspan="2">
            <input type="text" id="status" value="" style="width: 100%;">
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

  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/getProinfoList.do', {
      pk : $("#pk").val()
    });

    if(result.flag){
      var e = result.rs;

      $("#pGubun").val(e.PROPOSAL_GUBUN);
      $("#sDate").val(e.PROPOSAL_DATE);
      $("#proposal").val(e.PROPOSAL_DETAIL);
      $("#status").val(e.PROPOSAL_CHECK_CHOICE);
    }
  }


  function fu_addInfo() {
    var data = {
        pGubun : $("#pGubun").val(),
        sDate : $("#sDate").val(),
        PROPOSAL_DETAIL : $("#proposal").val(),
        PROPOSAL_CHECK_CHOICE : $("#status").val(),
        type : "proposal",
        applicationactive : "등록",
    }

    var formData = new FormData();
    formData.append("pGubun", data.pGubun);
    formData.append("sDate", data.sDate);
    formData.append("PROPOSAL_DETAIL", data.PROPOSAL_DETAIL);
    formData.append("PROPOSAL_CHECK_CHOICE", data.PROPOSAL_CHECK_CHOICE);
    formData.append("type", "proposal");
    formData.append("applicationactive", data.applicationactive);

    var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);
    console.log(result.rs);
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

  function fu_modifyInfo() {
    var data = {
      pGubun: $("#pGubun").val(),
      sDate: $("#sDate").val(),
      PROPOSAL_DETAIL: $("#proposal").val(),
      PROPOSAL_CHECK_CHOICE: $("#status").val(),
      type: "proposal",
      pk: $("#pk").val(),
      applicationactive: "수정",
    }

    var formData = new FormData();
    formData.append("pGubun", data.pGubun);
    formData.append("sDate", data.sDate);
    formData.append("PROPOSAL_DETAIL", data.PROPOSAL_DETAIL);
    formData.append("PROPOSAL_CHECK_CHOICE", data.PROPOSAL_CHECK_CHOICE);
    formData.append("type", "proposal");
    formData.append("pk", data.pk);
    formData.append("applicationactive", data.applicationactive);

    var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);
    console.log(result.rs);
    if(result.flag){
      if(result.rs == "SUCCESS") {
        alert("수정요청이 완료되었습니다. 관리자 승인 대기 중입니다.");
        fn_windowClose();
      }else{
        alert("수정요청에 실패하였습니다. 다시 확인부탁드립니다.");
      }
    }else{
      alert("수정요청에 실패하였습니다. 다시 확인부탁드립니다.");
    }
  }
    function fn_windowClose() {
    window.close();
  }
</script>
