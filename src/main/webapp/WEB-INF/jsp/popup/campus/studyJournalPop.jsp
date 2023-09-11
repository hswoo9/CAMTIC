<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyJournalPop.js?v=${toDate}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="studyJournalSn" value="${params.studyJournalSn}"/>
<input type="hidden" id="mode" value=""/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">학습조 운영일지</div>
        <form id="studyJournalForm">
          <table class="table table-bordered mt20" id="studyJournalTable" style="width: 1000px;">
            <colgroup>
              <col width="260px">
              <col width="740px">
            </colgroup>
            <thead>
            <tr>
              <th>학습조명</th>
              <td id="studyNameTd">${data.STUDY_NAME}</td>
            </tr>
            <tr>
              <th>학습일시</th>
              <td>
                <input type="text" id="journalDt" style="width: 150px"> <input type="text" id="journalStartTime" style="width: 100px"> ~ <input type="text" id="journalEndTime" style="width: 100px">
              </td>
            </tr>
            <tr>
              <th>학습장소</th>
              <td>
                <input type="text" id="studyLocation" style="width: 400px">
              </td>
            </tr>
            <tr>
              <th>참 여 자</th>
              <td>
                <input type="text" id="studyUserName" style="width: 400px">
                <input type="hidden" id="studyUserSeq">
                <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="학습자 선택" onclick="fn_userMultiSelectPop()"/>
              </td>
            </tr>
            <tr>
              <th>중요내용</th>
              <td>
                <textarea type="text" id="studyContent" style="width: 400px; height: 100px"></textarea>
              </td>
            </tr>
            <tr>
              <th>소요비용</th>
              <td>
                <input type="text" id="studyMoney" oninput="onlyNumber(this)" style="width: 150px; text-align: right" value="0"> 원 <input type="text" id="journalAmtClass" style="width: 150px"> <input type="text" id="journalAmtEtc" style="width: 150px;">
              </td>
            </tr>
            <tr>
          </table>
        </form>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" id="appBtn" style="display:none; margin-right:5px;" class="k-button k-button-solid-info" value="검토완료" onclick="studyJournal.appBtn();"/>
        <input type="button" id="saveBtn" style="margin-right:5px;" class="k-button k-button-solid-info" value="저장" onclick="studyJournal.saveBtn();"/>
        <input type="button" id="cancelBtn" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
      </div>
    </div>
  </div>
</div>
<script>
  studyJournal.init();
</script>
</body>
