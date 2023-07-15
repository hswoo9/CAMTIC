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
      <h3 class="card-title title_NM">병력 등록</h3>
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
          <th colspan="3">병력 등록</th>
        </tr>--%>
        <tr>
          <th>전역 여부</th>
          <td colspan="2">
            <input type="text" id="mGubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>사유</th>
          <td colspan="2">
            <input type="text" id="reason" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>복무기간</th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;" disabled> ~ <input type="text" id="eDate" style="width: 45%;" disabled>
          </td>
        </tr>
        <tr>
          <th>최종계급</th>
          <td colspan="2">
            <input type="text" id="rank" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>군별</th>
          <td colspan="2">
            <input type="text" id="mType" value="test" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>병과</th>
          <td colspan="2">
            <input type="text" id="mDept" style="width: 50%;">
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
    customKendo.fn_datePicker("eDate", '', "yyyy-MM-dd", '');
    fn_codeSet();
    $("#mGubun").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B04")
    });
    customKendo.fn_textBox("reason");
    customKendo.fn_textBox("rank");
    customKendo.fn_textBox("mType");
    customKendo.fn_textBox("mDept");

    $("#reason").kendoTextBox();
    $("#rank").kendoTextBox();
    $("#mType").kendoTextBox();
    $("#mDept").kendoTextBox();

  }
  function fn_dataSet(e) {
    $("#mGubun").data("kendoDropDownList").value(e.MILITARY_SVC_TYPE); //전역 여부
    $("#reason").val(e.M_UNFUL_REASON); //사유
    $("#sDate").val(e.M_ENLIST_DAY); //입대일
    $("#eDate").val(e.M_DISCHARGE_DAY); //제대일
    $("#rank").val(e.M_LAST_RANK); //최종계급
    $("#mType").val(e.M_DIVISION); //군별
    $("#mDept").val(e.MOS); //병과

    /*수정 안되게 disabled*/
    $("#mGubun").data("kendoDropDownList").enable(false);
    $("#reason").data("kendoTextBox").enable(false);
    $("#rank").data("kendoTextBox").enable(false);
    $("#mType").data("kendoTextBox").enable(false);
    $("#mDept").data("kendoTextBox").enable(false);

  }
  function fn_codeSet() {
    $.ajax({
      url : '/userManage/getCodeList',
      type : "post",
      async : false,
      dataType : "json",
      success : function(result) {
        codeSet = result.rs;
        codeDropDown = result.rs;
      }
    })
  }

  function edCodeDataSource(code) {
    var data = [];
    var defaultCode = "";
    if(code != ""){
      switch (code){
        case "B01" :
          defaultCode = "학력구분"
          break
        case "B02" :
          defaultCode = "학위"
          break
        case "B03" :
          defaultCode = "졸업"
          break
        case "B04" :
          defaultCode = "전역여부"
          break
        case "B05" :
          defaultCode = "가족관계"
          break
      }
      data.push({"HR_DT_CODE_NM": defaultCode, "value" : ""});
    }else {
      data.push({"HR_DT_CODE_NM": "선택하세요", "value" : ""});
    }

    for(var i = 0 ; i < codeDropDown.length ; i++){
      codeDropDown[i].value = codeDropDown[i].HR_MC_CODE + codeDropDown[i].HR_MD_CODE + codeDropDown[i].HR_DT_CODE;
      if(codeDropDown[i].HR_MC_CODE + codeDropDown[i].HR_MD_CODE == code){
        data.push(codeDropDown[i]);
      }
    }
    return data;
  }

  function fn_windowClose() {
    window.close();
  }
</script>
