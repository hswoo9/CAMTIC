<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<%--<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>--%>
<body class="font-opensans" style="background-color:#fff;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">상벌 사항</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" onclick="fu_addInfo()" id="addBtn">추가</button>
        <button type="button" class="k-button k-button-solid-info" onclick="fu_modifyInfo()" id="modBtn" style="display: none">수정</button>
        <button type="button" class="k-button k-button-solid-info" onclick="fu_delInfo()" id="delBtn" style="display: none">삭제</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="fn_windowClose()">닫기</button>
      </div>
    </div>
    <form id="subHolidayReqPop" style="padding: 20px 30px;">
      <input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
      <input type="hidden" id="regEmpName" value="${loginVO.name}"/>
      <input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
      <input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
      <input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
      <input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
      <input type="hidden" id="regErpEmpCd" value="${loginVO.erpEmpCd}"/>
      <input type="hidden" id="pk" name="pk" value="${pk}">
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
          <th>
            <span class="red-star"></span>구분(내부/외부)
          </th>
          <td colspan="2">
            <input type="text" id="rGubunOutIn" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>구분(표창/징계)
          </th>
          <td colspan="2">
            <input type="text" id="rGubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>포상/징계 일자
          </th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>공적(징계) 사항
          </th>
          <td colspan="2">
            <input type="text" id="rIssue" style="width: 90%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>시행처
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
            <label for="rewardAddFile" class="k-button k-button-solid-base">파일첨부</label>
            <input type="file" id="rewardAddFile" name="rewardAddFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
            <span id="rewardAddFileName"></span>
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

    if($("#pk").val()){
      fn_dataSet();
    }
  });

  function fileChange(e){
    $(e).next().text($(e)[0].files[0].name);
  }

  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    /*customKendo.fn_textBox("rGubunOutIn");*/
    customKendo.fn_textBox("gubun");
    customKendo.fn_textBox("rIssue");
    customKendo.fn_textBox("agency");

    /*$("#rGubunOutIn").kendoTextBox();*/
    $("#rGubun").kendoTextBox();
    $("#rIssue").kendoTextBox();
    $("#agency").kendoTextBox();

    $("#rGubunOutIn").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
        { text: "선택하세요", value: "" },
        { text: "내부", value: "0" },
        { text: "외부", value: "1" }
      ],
      index: 0
    });
  }

  function fn_dataSet() {
    $("#addBtn").hide()
    $("#modBtn").show()
    $("#delBtn").show()

    var result = customKendo.fn_customAjax('/userManage/getRewinfoList.do', {
      pk : $("#pk").val()
    });
    if(result.flag){
      var e = result.rs;

      $("#rGubunOutIn").data("kendoDropDownList").value(e.REWORD_TYPE);
      $("#rGubun").val(e.REWORD_NAME);
      $("#sDate").val(e.REWORD_DAY);
      $("#rIssue").val(e.RWD_OFM);
      $("#agency").val(e.RWD_ST_COMP);
    }
  }

  function fu_addInfo() {
    var data = {
      rGubunOutInType : $("#rGubunOutIn").data("kendoDropDownList").value(),
      rGubunOutInTypeName : $("#rGubunOutIn").data("kendoDropDownList").text(),
      rGubun : $("#rGubun").val(),
      rGubunAll : ($("#rGubunOutIn").data("kendoDropDownList").text() + $("#rGubun").val()),
      sDate : $("#sDate").val(),
      rIssue : $("#rIssue").val(),
      agency : $("#agency").val(),
      type : "reward",
      applicationactive : "등록",
    }

    var formData = new FormData();
    formData.append("rGubunOutInType", data.rGubunOutInType);
    formData.append("rGubunOutInTypeName", data.rGubunOutInTypeName);
    formData.append("rGubun", data.rGubun);
    formData.append("rGubunAll", data.rGubunAll);
    formData.append("sDate", data.sDate);
    formData.append("rIssue", data.rIssue);
    formData.append("agency", data.agency);
    formData.append("menuCd", "reward");
    formData.append("type", "reward");
    formData.append("applicationactive", data.applicationactive);

    if($("#rewardAddFile")[0].files.length == 1){
      formData.append("rewardAddFile", $("#rewardAddFile")[0].files[0]);
    }

    if(data.rGubunOutInType == null || data.rGubunOutInType == ''){
      alert("구분(내부/외부)를 선택하세요.")
      return false;
    }else if(data.rGubun == null || data.rGubun == '') {
      alert("구분(표창/징계)를 입력하세요.")
      return false;
    }else if(data.sDate == null || data.sDate == '') {
      alert("포상/징계 일자를 입력하세요.")
      return false;
    }else if(data.rIssue == null || data.rIssue == '') {
      alert("공적(징계) 사항을 입력하세요.")
      return false;
    }else if(data.agency == null || data.agency == '') {
      alert("시행처를 입력하세요.")
      return false;
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

  function fu_modifyInfo() {
    var data = {
      rGubunOutInType : $("#rGubunOutIn").data("kendoDropDownList").value(),
      rGubunOutInTypeName : $("#rGubunOutIn").data("kendoDropDownList").text(),
      rGubun : $("#rGubun").val(),
      sDate : $("#sDate").val(),
      rIssue : $("#rIssue").val(),
      agency : $("#agency").val(),
      type : "reward",
      pk : $("#pk").val(),
      applicationactive : "수정",
    }

    var formData = new FormData();
    formData.append("rGubunOutInType", data.rGubunOutInType);
    formData.append("rGubunOutInTypeName", data.rGubunOutInTypeName);
    formData.append("rGubun", data.rGubun);
    formData.append("rGubunAll", data.rGubunAll);
    formData.append("sDate", data.sDate);
    formData.append("rIssue", data.rIssue);
    formData.append("agency", data.agency);
    formData.append("menuCd", "reward");
    formData.append("type", "reward");
    formData.append("pk", data.pk);
    formData.append("applicationactive", data.applicationactive);

    if($("#rewardAddFile")[0].files.length == 1){
      formData.append("rewardAddFile", $("#rewardAddFile")[0].files[0]);
    }

    if(data.rGubunOutInType == null || data.rGubunOutInType == ''){
      alert("구분(내부/외부)를 선택하세요.")
      return false;
    }else if(data.rGubun == null || data.rGubun == '') {
      alert("구분(표창/징계)를 입력하세요.")
      return false;
    }else if(data.sDate == null || data.sDate == '') {
      alert("포상/징계 일자를 입력하세요.")
      return false;
    }else if(data.rIssue == null || data.rIssue == '') {
      alert("공적(징계) 사항을 입력하세요.")
      return false;
    }else if(data.agency == null || data.agency == '') {
      alert("시행처를 입력하세요.")
      return false;
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
    /*opener.window.location.reload();*/
  }
</script>
