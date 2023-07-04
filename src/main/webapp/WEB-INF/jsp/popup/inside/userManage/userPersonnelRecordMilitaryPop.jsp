<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<%--<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>--%>
<style>
  .removeDay{
    text-decoration:line-through;
    font-weight:700;
    color:red
  }
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }
  .k-grid-norecords{
    justify-content: space-around;
  }
  .k-grid tbody tr{
    height: 38px;
  }
  #wptDiv{
    margin: 0 auto;
    width: 100px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
  }
  #wptDiv > label {
    margin : 0
  }
  #timeDiff{
    height: 255px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">병력 사항</div>
        <form id="subHolidayReqPop">
          <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
          <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
          <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
          <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
          <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
          <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
          <table class="table table-bordered mb-0" id="userReqPop">
            <colgroup>
              <col width="30%">
              <col width="30%">
              <col width="30%">
            </colgroup>
            <thead>
            <tr>
              <th colspan="3">병력 등록</th>
            </tr>
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
                <input type="text" id="sDate" style="width: 45%;"> ~ <input type="text" id="eDate" style="width: 45%;">
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
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_addInfo()"/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="fn_windowClose()"/>
        </div>
      </div>
    </div>
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
  }
  function fu_addInfo() {
    var data = {
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
