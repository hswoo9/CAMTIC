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
      <h3 class="card-title title_NM">경력 등록</h3>
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
          <th colspan="3">경력 등록</th>
        </tr>--%>
        <tr>
          <th>
            <span class="red-star"></span>기간
          </th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;"> ~ <input type="text" id="eDate" style="width: 45%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>근무처
          </th>
          <td colspan="2">
            <input type="text" id="place" style="width: 95%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>직위(급)
          </th>
          <td colspan="2">
            <input type="text" id="position" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>담당업무
          </th>
          <td colspan="2">
            <input type="text" id="workType" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>근무년수
          </th>
          <td colspan="2">
            <input type="text" id="dateY" style="width: 10%;"> 년 <input type="text" id="dateM" style="width: 10%;"> 개월
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>증명서
          </th>
          <td colspan="2">
            <label for="addFile" class="k-button k-button-solid-base">파일첨부</label>
            <input type="file" id="addFile" name="addFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
            <span id="addFileName"></span>
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
  $(function(){
    fn_default();
    fn_dataSet();
  });

  function fileChange(e){
    $(e).next().text($(e)[0].files[0].name);
  }

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

  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/getCarinfoList.do', {
      pk : $("#pk").val()
    });

    if(result.flag) {
      var e = result.rs;

      $("#sDate").val(e.JOIN_DAY);
      $("#eDate").val(e.RESIGN_DAY);
      $("#place").val(e.EMPLOY_DEPT_NAME);
      $("#position").val(e.POSITION_OR_DUTY);
      $("#workType").val(e.MAIN_TASK);
      $("#dateY").val(e.CAREER_PERIOD);
      $("#dateM").val(e.CAREER_MONTH);
      $("#bmk").val(e.RMK);
    }
  }


  // 경력사항 등록
  function fu_addInfo() {
    var data = {
        place : $("#place").val(),
        sDate : $("#sDate").val(),
        eDate : $("#eDate").val(),
        position : $("#position").val(),
        workType : $("#workType").val(),
        dateY : $("#dateY").val(),
        dateM : $("#dateM").val(),
        bmk : $("#bmk").val(),
        workType : $("#workType").val(),
        type : "career",
        applicationactive : "등록",
    }

    var formData = new FormData();
    formData.append("place", data.place);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("position", data.position);
    formData.append("workType", data.workType);
    formData.append("dateY", data.dateY);
    formData.append("dateM", data.dateM);
    formData.append("bmk", data.bmk);
    formData.append("workType", data.workType);
    formData.append("menuCd", "career");
    formData.append("type", "career");
    formData.append("applicationactive", data.applicationactive);

    if($("#addFile")[0].files.length == 1){
      formData.append("addFile", $("#addFile")[0].files[0]);
    }

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

  // 경력사항 수정
  function fu_modiInfo() {
    var data = {
      place: $("#place").val(),
      sDate: $("#sDate").val(),
      eDate: $("#eDate").val(),
      position: $("#position").val(),
      workType: $("#workType").val(),
      dateY: $("#dateY").val(),
      dateM: $("#dateM").val(),
      bmk: $("#bmk").val(),
      workType: $("#workType").val(),
      type: "career",
      pk: $("#pk").val(),
      applicationactive : "수정",
    }

    var formData = new FormData();
    formData.append("place", data.place);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("position", data.position);
    formData.append("workType", data.workType);
    formData.append("dateY", data.dateY);
    formData.append("dateM", data.dateM);
    formData.append("bmk", data.bmk);
    formData.append("workType", data.workType);
    formData.append("menuCd", "career");
    formData.append("type", "career");
    formData.append("pk", data.pk);
    formData.append("applicationactive", data.applicationactive);

    if ($("#addFile")[0].files.length == 1) {
      formData.append("addFile", $("#addFile")[0].files[0]);
    }


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

  // 경력사항 삭제
  function fu_delInfo() {
    var data = {
      place: $("#place").val(),
      sDate: $("#sDate").val(),
      eDate: $("#eDate").val(),
      position: $("#position").val(),
      workType: $("#workType").val(),
      dateY: $("#dateY").val(),
      dateM: $("#dateM").val(),
      bmk: $("#bmk").val(),
      workType: $("#workType").val(),
      type: "career",
      pk: $("#pk").val(),
      applicationactive : "삭제",
    }

    var formData = new FormData();
    formData.append("place", data.place);
    formData.append("sDate", data.sDate);
    formData.append("eDate", data.eDate);
    formData.append("position", data.position);
    formData.append("workType", data.workType);
    formData.append("dateY", data.dateY);
    formData.append("dateM", data.dateM);
    formData.append("bmk", data.bmk);
    formData.append("workType", data.workType);
    formData.append("menuCd", "career");
    formData.append("type", "career");
    formData.append("pk", data.pk);
    formData.append("applicationactive", data.applicationactive);

    if ($("#addFile")[0].files.length == 1) {
      formData.append("addFile", $("#addFile")[0].files[0]);
    }

    var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);
    console.log(result.rs);
    if(result.flag){
      if(result.rs == "SUCCESS") {
        alert("삭제 요청이 등록되었습니다. 관리자 승인 대기 중입니다.");
        fn_windowClose();
      }else{
        alert("삭제요청에 실패하였습니다. 다시 확인부탁드립니다.");
      }
    }else{
      alert("삭제요청에 실패하였습니다. 다시 확인부탁드립니다.");
    }
  }


  function fn_windowClose() {
    window.close();
  }
</script>
