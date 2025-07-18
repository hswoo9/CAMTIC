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
        <div class="popupTitleSt">학력추가</div>
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
              <th colspan="3">학력등록</th>
            </tr>
            <tr>
              <th>구분</th>
              <td colspan="2">
                <input type="text" id="gubun" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>기간</th>
              <td colspan="2">
                <input type="text" id="sDate" style="width: 45%;"> ~ <input type="text" id="eDate" style="width: 45%;">
              </td>
            </tr>
            <tr>
              <th>학교 및 학과</th>
              <td colspan="2">
                <input type="text" id="school" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>학위</th>
              <td colspan="2">
                <input type="text" id="gkrdnl" value="test" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>졸업</th>
              <td colspan="2">
                <input type="text" id="whfdjq" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>성적</th>
              <td colspan="2">
                <input type="text" id="score" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>학위증빙</th>
              <td colspan="2">
                <input type="file">
              </td>
            </tr>
            <tr>
              <th>성적증빙</th>
              <td colspan="2">
                <input type="file">
              </td>
            </tr>
            <tr>
              <th>비고</th>
              <td colspan="2">
                <textarea name="bmk" id="bmk" placeholder="비고" style="width: 100%;"></textarea>
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
  $(function(){
    fn_default();
  });
  function fn_default() {
    customKendo.fn_datePicker("sDate", '', "yyyy-MM-dd", '');
    customKendo.fn_datePicker("eDate", '', "yyyy-MM-dd", '');
    var dropDownDataSource = [
      { text: "대졸", value: "1" },
      { text: "고졸", value: "2" },
      { text: "중졸", value: "3" }
    ];
    customKendo.fn_dropDownList("gkrdnl",dropDownDataSource, "text","value");
    customKendo.fn_textBox("gubun");
    $("#bmk").kendoTextArea({
      rows : 5,
    });
  }
  function fu_addInfo() {
    var data = {
        gubun : $("#gubun").val(),
        sDate : $("#sDate").val(),
        eDate : $("#eDate").val(),
        school : $("#school").val(),
        gkrdnl : $("#gkrdnl").val(),
        whfdjq : $("#whfdjq").val(),
        score : $("#score").val(),
        bmk : $("#bmk").val(),
        type : "edu",
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
