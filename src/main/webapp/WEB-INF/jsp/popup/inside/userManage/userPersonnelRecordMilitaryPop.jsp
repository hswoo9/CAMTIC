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
        <button type="button" class="k-button k-button-solid-info" onclick="fu_addInfo()">등록</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="fn_windowClose()">닫기</button>
      </div>
    </div>
    <form id="subHolidayReqPop" style="padding: 20px 30px;">
      <input type="hidden" id="msiInfoId" name="msiInfoId" value="${params.msiInfoId}">
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
          <th>
            <span class="red-star"></span>전역 여부
          </th>
          <td colspan="2">
            <input type="text" id="mGubun" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>사유
          </th>
          <td colspan="2">
            <input type="text" id="reason" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>복무기간
          </th>
          <td colspan="2">
            <input type="text" id="sDate" style="width: 45%;"> ~ <input type="text" id="eDate" style="width: 45%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>최종계급
          </th>
          <td colspan="2">
            <input type="text" id="rank" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>군별
          </th>
          <td colspan="2">
            <input type="text" id="mType" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>병과
          </th>
          <td colspan="2">
            <input type="text" id="mDept" style="width: 50%;">
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
  var codeSet;
  var codeDropDown = [];
  $(function(){
    fn_default();

    if($("#msiInfoId").val()){
      dataInput()
    }
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
  function fu_addInfo() {
    var data = {
        msiInfoId : $("#msiInfoId").val(),
        mGubun : $("#mGubun").val(),
        sDate : $("#sDate").val(),
        eDate : $("#eDate").val(),
        reason : $("#reason").val(),
        rank : $("#rank").val(),
        mType : $("#mType").val(),
        mDept : $("#mDept").val(),
        type : "military",
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
          defaultCode = "선택하세요"
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

  function dataInput(){
    var result = customKendo.fn_customAjax("/useManage/getMilitaryInfo.do", {msiInfoId : $("#msiInfoId").val()})
    if(result.flag){
      $("#mGubun").data("kendoDropDownList").value(result.rs.MILITARY_SVC_TYPE);
      $("#reason").val(result.rs.M_UNFUL_REASON);
      $("#sDate").val(result.rs.M_ENLIST_DAY);
      $("#eDate").val(result.rs.M_DISCHARGE_DAY);
      $("#rank").val(result.rs.M_LAST_RANK);
      $("#mType").val(result.rs.M_DIVISION);
      $("#mDept").val(result.rs.MOS);
    }
  }
</script>
