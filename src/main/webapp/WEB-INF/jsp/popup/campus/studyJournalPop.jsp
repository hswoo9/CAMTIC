<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyJournalPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
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
              <td>
                ${data.STUDY_NAME}
              </td>
            </tr>
            <tr>
              <th>학습일시</th>
              <td>
                <input type="text" id="journalDt" style="width: 150px">
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
                <input type="text" id="studyMoney" style="width: 150px" value="0"> 원
              </td>
            </tr>
            <tr>
          </table>
        </form>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" class="k-button k-button-solid-info" value="저장" onclick="studyJournal.saveBtn();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
      </div>
    </div>
  </div>
</div>
<script>
  studyJournal.init();
</script>
</body>
