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
      <h3 class="card-title title_NM">학력 등록</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" onclick="fu_addInfo()">추가</button>
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
          <th colspan="3">학력등록</th>
        </tr>--%>
        <tr>
          <th>
            <span class="red-star"></span>구분
          </th>
          <td colspan="2">
            <input type="text" id="gubun" style="width: 50%;">
          </td>
        </tr>
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
            <span class="red-star"></span>학교 및 학과
          </th>
          <td colspan="2">
            <input type="text" id="school" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>학위
          </th>
          <td colspan="2">
            <input type="text" id="degree" value="test" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>졸업
          </th>
          <td colspan="2">
            <input type="text" id="graduation" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>성적
          </th>
          <td colspan="2">
            <input type="text" id="score" style="width: 50%;">
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>학위증빙
          </th>
          <td colspan="2">
            <input type="file" disabled>
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>성적증빙
          </th>
          <td colspan="2">
            <input type="file" disabled>
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
  var codeSet;
  var codeDropDown=[];

  $(function(){
    fn_default();
    fn_dataSet();
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_datePicker("eDate", '', "yyyy-MM-dd", '');
    fn_codeSet();
    $("#gubun").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B01")
    });
    $("#degree").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B02")
    });
    $("#graduation").kendoDropDownList({
      dataTextField: "HR_DT_CODE_NM",
      dataValueField: "value",
      dataSource: edCodeDataSource("B03")
    });
    customKendo.fn_textBox("score");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
    $("#school").kendoTextBox();
    $("#score").kendoTextBox();

  }

  function fn_dataSet() {
    var result = customKendo.fn_customAjax('/userManage/getEduinfoList.do', {
      pk : $("#pk").val()
    });

    if(result.flag){
      var e = result.rs;

      $("#gubun").data("kendoDropDownList").value(e.GUBUN_CODE); //구분
      $("#sDate").val(e.ADMISSION_DAY); //입학일 '%Y-%m-%d'
      $("#eDate").val(e.GRADUATION_DAY); //졸업일
      $("#school").val(e.SCHOOL_NAME); //학교 및 학과
      $("#degree").data("kendoDropDownList").value(e.DEGREE_CODE); //학위
      $("#graduation").data("kendoDropDownList").value(e.GRADUATION_CODE); //졸업
      $("#bmk").val(e.RMK); //비고
      $("#score").val(e.SCORE); //성적
    }

  }

  function fu_addInfo() {
    var data = {
      gubun : $("#gubun").val(),
      sDate : $("#sDate").val(),
      eDate : $("#eDate").val(),
      school : $("#school").val(),
      degree : $("#degree").val(),
      graduation : $("#graduation").val(),
      score : $("#score").val(),
      bmk : $("#bmk").val(),
      type : "degree",
    }
    JSON.stringify(data);
    data: JSON.stringify(data)
    console.log(data);

    var insertData = {
      type : "degree",
      APPLI_TYPE : "I",
      ADMIN_APPROVAL : "N",
      JSON : JSON.stringify(data)
    }

    var data = {};

    var result = customKendo.fn_customAjax('/useManage/setUserPersonnelRecordInfo',data);
    console.log(result.rs);
    if(result.flag){
      if(result.rs == "SUCCESS") {
        alert("등록되었습니다.");
        alert(JSON.stringify(data));
        console.log(data);
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
          defaultCode = "선택하세요"
          break
        case "B02" :
          defaultCode = "선택하세요"
          break
        case "B03" :
          defaultCode = "선택하세요"
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
