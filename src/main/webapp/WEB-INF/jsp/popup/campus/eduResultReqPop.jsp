<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
  .k-radio-list-horizontal, .k-radio-list.k-list-horizontal {
    gap: 0px;
  }
</style>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/eduResultReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="eduInfoId" value="${data.eduInfoId}"/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">교육 결과보고서 작성</div>
        <form id="eduReqForm">
          <table class="table table-bordered" id="userInfoTable" style="width: 1000px;">
            <colgroup>
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
              <col width="16%">
            </colgroup>
            <thead>
            <tr>
              <th>소 속</th>
              <td id="userDept"></td>
              <th>직 위</th>
              <td id="userPosition"></td>
              <th>성 명</th>
              <td id="userName"></td>
            </tr>
          </table>
          <table class="table table-bordered mt20" id="eduReqTable" style="width: 1000px;">
            <colgroup>
              <col width="130px">
              <col width="370px">
              <col width="130px">
              <col width="370px">
            </colgroup>
            <thead>
            <tr id="eduNameTr">
              <th id="eduNameVar">과정명</th>
              <td colspan="3" id="eduNameTd"></td>
            </tr>
            <tr>
              <th>학습기간</th>
              <td id="eduDtTd">
                <span id="eduDt"></span> 총 <input type="text" id="termDay" style="width: 50px">일 <input type="text" id="termTime" style="width: 50px">시간
              </td>
              <th>강사</th>
              <td id="eduTeacherNameTd">
                <input type="text" id="eduTeacherName" style="width: 300px">
              </td>
            </tr>
            <tr>
              <th>교육기관</th>
              <td id="careNameTd"></td>
              <th>소재지</th>
              <td id="careLocationTd"></td>
            </tr>
            <tr>
              <th>학습목적</th>
              <td colspan="3" id="eduObjectTd"></td>
            </tr>
            <tr>
              <th>학습내용</th>
              <td colspan="3" id="eduContentTd">
                <textarea id="eduContent" style="width: 800px; height: 200px"></textarea>
              </td>
            </tr>
            <tr>
              <th>학습평가</th>
              <td colspan="3" id="eduEvalTd">
                <span id="eduEval"></span>
              </td>
            </tr>
            <tr>
              <th>직무연계 포인트</th>
              <td colspan="3" id="eduPointTd">
                <textarea id="eduPoint" style="width: 800px; height: 200px"></textarea>
              </td>
            </tr>
            <tr>
              <th>FeedBack List </th>
              <td colspan="3" d="FBListTd">
                <textarea id="FBList" style="width: 800px; height: 200px"></textarea>
              </td>
            </tr>
            <tr>
              <th>첨부서류</th>
              <td colspan="3" id="attachDocNameTd">
                <input type="text" id="attachDocName" style="width: 800px">
              </td>
            </tr>
          </table>
        </form>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" class="k-button k-button-solid-info k-rounded" value="저장" onclick="eduResultReqPop.saveEduResult();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소" onclick="window.close();"/>
      </div>
    </div>
  </div>
</div>
<script>
  eduResultReqPop.init();
</script>
</body>
