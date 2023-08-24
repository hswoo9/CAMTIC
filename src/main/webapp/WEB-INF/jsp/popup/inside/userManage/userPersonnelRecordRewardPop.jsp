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
        <button type="button" class="k-button k-button-solid-info" onclick="fu_addInfo()">추가</button>
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
            <input type="file" disabled>
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
  });
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
        { text: "[내부표창] ", value: "22" },
        { text: "[외부표창] ", value: "33" }
      ],
      index: 0
    });
  }
  function fu_addInfo() {
    var data = {
      rGubunOutInType : $("#rGubunOutIn").data("kendoDropDownList").value(),
      rGubunOutInName : $("#rGubunOutIn").data("kendoDropDownList").text(),
      rGubun : $("#rGubun").val(),
      rGubunAll : ($("#rGubunOutIn").data("kendoDropDownList").text() + $("#rGubun").val()),
      sDate : $("#sDate").val(),
      rIssue : $("#rIssue").val(),
      agency : $("#agency").val(),
      type : "reward",
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
    /*opener.window.location.reload();*/
  }
</script>
