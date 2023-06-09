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
                <input type="text" id="degree" value="test" style="width: 50%;">
              </td>
            </tr>
            <tr>
              <th>졸업</th>
              <td colspan="2">
                <input type="text" id="graduation" style="width: 50%;">
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
          <input type="button" class="k-button k-button-solid-info k-rounded" value="추가" onclick="fu_addInfo()"/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="닫기" onclick="fn_windowClose()"/>
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
      { text: "중학교", value: "1" },
      { text: "고등학교", value: "2" },
      { text: "전문대학", value: "3" },
      { text: "대학교", value: "4" },
      { text: "대학원", value: "5" },
    ];
    customKendo.fn_dropDownList("gubun",dropDownDataSource, "text","value");
    var dropDownDataSource = [
      { text: "전문학사", value: "1" },
      { text: "학사", value: "2" },
      { text: "석사", value: "3" },
      { text: "박사", value: "4" },
    ];
    customKendo.fn_dropDownList("degree",dropDownDataSource, "text","value");
    var dropDownDataSource = [
      { text: "졸업", value: "1" },
      { text: "졸업예정", value: "2" },
      { text: "수료", value: "3" },
      { text: "재학", value: "4" },
      { text: "휴학", value: "5" },
      { text: "중퇴", value: "6" },
    ];
    customKendo.fn_dropDownList("graduation",dropDownDataSource, "text","value");
    customKendo.fn_textBox("score");
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
      degree : $("#degree").val(),
      graduation : $("#graduation").val(),
      score : $("#score").val(),
      bmk : $("#bmk").val(),
      type : "degree",
    }
    customKendo.fn_customAjax('/useManage/setUserPersonnelRecordInfo',data);
  }
  function fn_windowClose() {
    window.close();
  }
</script>
