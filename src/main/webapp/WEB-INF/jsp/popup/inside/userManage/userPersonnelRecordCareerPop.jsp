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
            <input type="file">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>비고
          </th>
          <td colspan="2">
            <textarea name="bmk" id="bmk" placeholder="비고" style="width: 100%;"></textarea>
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
        type : "career",
    }
    var result = customKendo.fn_customAjax('/useManage/setUserPersonnelRecordInfo',data);
    if(result.flag){
      if(result.rs == "SUCCESS") {
        alert("등록되었습니다.");
        fn_windowClose();
      }else{
        alert("등록에 실패하였습니다.");
      }
    }else{
      alert("등록에 실패하였습니다.");
    }
  }
  function fn_windowClose() {
    window.close();
  }
</script>
