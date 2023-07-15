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
      <h3 class="card-title title_NM">가족 등록</h3>
      <div class="btn-st popButton">
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
          <th colspan="3">가족 등록</th>
        </tr>--%>
        <tr>
          <th>관계</th>
          <td colspan="2">
            <input type="text" id="relation" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>성명</th>
          <td colspan="2">
            <input type="text" id="fName" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>생년월일</th>
          <td colspan="2">
            <input type="text" id="bDay" style="width: 50%;" disabled>
          </td>
        </tr>
        <tr>
          <th>직업</th>
          <td colspan="2">
            <input type="text" id="job" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>동거여부</th>
          <td colspan="2">
            <span type="text" id="includeType" name="includeType" style="width: 100%;"></span>
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
    $("#includeType").kendoRadioGroup({
      items: [
        { label : "예", value : "Y" },
        { label : "아니오", value : "N" }
      ],
      layout : "horizontal",
      labelPosition : "after",
    });

    /*$("#checkY").kendoCheckBox({
      label: "예",
      change: function(e) {
        if(e.checked == true){
          $("#checkN").prop("checked", false);
        }
      }
    });
    $("#checkN").kendoCheckBox({
      label: "아니오",
      change: function(e) {
        if(e.checked == true){
          $("#checkY").prop("checked", false);
        }
      }
    });*/
    customKendo.fn_datePicker("bDay", '', "yyyy-MM-dd", '');
    fn_codeSet();
    $("#relation").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B05")
    });
    customKendo.fn_textBox("fName");
    customKendo.fn_textBox("job");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
    $("#fName").kendoTextBox();
    $("#job").kendoTextBox();
  }
  function fn_dataSet(e) {
    $("#relation").data("kendoDropDownList").value(e.FAMILY_CODE); //관계
    $("#fName").val(e.FAMILY_NAME); //성명
    $("#bDay").val(e.FAMILY_BIRTH); //생년월일
    $("#job").val(e.FAMILY_JOB); //직업
    $("#includeType").data("kendoRadioGroup").value(e.INCLUDE_YN); //동거여부

    /*수정 안되게 disabled*/
    $("#relation").data("kendoDropDownList").enable(false);
    $("#fName").data("kendoTextBox").enable(false);
    $("#job").data("kendoTextBox").enable(false);
    $("#includeType").data("kendoRadioGroup").enable(false);

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
        default :
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
