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
          <th colspan="3">보유 면허</th>
        </tr>--%>
        <tr>
          <th>
            <span class="red-star"></span>종류
          </th>
          <td colspan="2">
            <input type="text" id="licenseName" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>취득일
          </th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>자격번호
          </th>
          <td colspan="2">
            <input type="text" id="licenseNum" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>발급기관
          </th>
          <td colspan="2">
            <input type="text" id="agency" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>증명서
          </th>
          <td colspan="2">
            <label for="certificateAddFile" class="k-button k-button-solid-base">파일첨부</label>
            <input type="file" id="certificateAddFile" name="certificateAddFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
            <span id="certificateAddFileName"></span>
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>비고
          </th>
          <td colspan="2">
            <textarea name="bmk" id="bmk" style="width: 100%;"></textarea>
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

  function fileChange(e){
    $(e).next().text($(e)[0].files[0].name);
  }

  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/getLininfoList.do', {
      pk : $("#pk").val()
    });

    if(result.flag) {
      var e = result.rs;

      $("#licenseName").val(e.CERTIFICATE_NAME);
      $("#sDate").val(e.ACQUISITION_DAY);
      $("#licenseNum").val(e.CERTIFICATE_NUM);
      $("#agency").val(e.ISSUER);
      $("#bmk").val(e.RMK);

    }
  }

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

  // 보유면허 등록
  function fu_addInfo() {
    var data = {
      licenseName : $("#licenseName").val(),
      sDate : $("#sDate").val(),
      eDate : $("#eDate").val(),
      licenseNum : $("#licenseNum").val(),
      agency : $("#agency").val(),
      bmk : $("#bmk").val(),
      type : "license",
      applicationactive : "등록",
    }

    var formData = new FormData();
    formData.append("licenseName", data.licenseName);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("licenseNum", data.licenseNum);
    formData.append("agency", data.agency);
    formData.append("bmk", data.bmk);
    formData.append("menuCd", "license");
    formData.append("type", "license");
    formData.append("applicationactive", data.applicationactive);

    if($("#certificateAddFile")[0].files.length == 1){
      formData.append("certificateAddFile", $("#certificateAddFile")[0].files[0]);
    }

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

  // 보유면허 수정
  function fu_modiInfo() {
    var data = {
      licenseName : $("#licenseName").val(),
      sDate : $("#sDate").val(),
      eDate : $("#eDate").val(),
      licenseNum : $("#licenseNum").val(),
      agency : $("#agency").val(),
      bmk : $("#bmk").val(),
      type : "license",
      pk : $("#pk").val(),
      applicationactive : "수정",
    }

    var formData = new FormData();
    formData.append("licenseName", data.licenseName);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("licenseNum", data.licenseNum);
    formData.append("agency", data.agency);
    formData.append("bmk", data.bmk);
    formData.append("menuCd", "license");
    formData.append("type", "license");
    formData.append("pk", data.pk);
    formData.append("applicationactive", data.applicationactive);

    if($("#certificateAddFile")[0].files.length == 1){
      formData.append("certificateAddFile", $("#certificateAddFile")[0].files[0]);
    }


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
