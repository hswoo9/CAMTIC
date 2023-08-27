<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/studyReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="suerSelType" value="0">
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">내부학습 신청서 작성</div>
        <form id="studyReqForm">
          <table class="table table-bordered mt20" id="studyReqTable" style="width: 1000px;">
            <colgroup>
              <col width="260px">
              <col width="740px">
            </colgroup>
            <thead>
            <tr>
              <th>구분</th>
              <td>
                <input type="text" id="studyClass" style="width: 800px">
              </td>
            </tr>
            <tr>
              <th>내부학습명</th>
              <td>
                <input type="text" id="studyName" style="width: 800px">
              </td>
            </tr>
            <tr class="propag" style="display: none">
              <th>지 도 자</th>
              <td>
                <input type="text" id="readerUserName" style="width: 600px">
                <input type="hidden" id="readerUserSeq">
                <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="지도자 선택" onclick="$('#suerSelType').val('2'); fn_userMultiSelectPop()"/>
              </td>
            </tr>
            <tr>
              <th>학 습 자</th>
              <td>
                <input type="text" id="studyUserName" style="width: 600px">
                <input type="hidden" id="studyUserSeq">
                <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="학습자 선택" onclick="$('#suerSelType').val('1'); fn_userMultiSelectPop()"/>
              </td>
            </tr>
            <tr>
              <th>학습기간</th>
              <td>
                <div style="float: left"><input type="text" id="startDt" style="width: 150px"> ~ <input type="text" id="endDt" style="width: 150px"></div>

                <div class="study" style="float: left; display: none">
                  &nbsp<input type="text" id="dateVal" style="width: 200px"> ex)매주 목요일 오후5시
                </div>

                <div class="propag" style="float: left; display: none">
                  &nbsp매회 학습시간 <input type="text" id="startTime" style="width: 100px"> ~ <input type="text" id="endTime" style="width: 100px"> (총 <input type="text" id="eduTerm" style="width: 50px" oninput="onlyNumber(this)">회 <input type="text" id="eduTime" style="width: 50px" oninput="onlyNumber()">시간)
                </div>
              </td>
            </tr>
            <tr>
              <th>학습장소</th>
              <td>
                <input type="text" id="studyLocation" style="width: 800px">
              </td>
            </tr>
            <tr>
              <th>학습목표</th>
              <td>
                <textarea type="text" id="studyObject" style="width: 800px; height: 100px"></textarea>
              </td>
            </tr>
            <tr>
              <th>학습내용</th>
              <td>
                <textarea type="text" id="studyContent" style="width: 800px; height: 100px"></textarea>
              </td>
            </tr>
            <tr>
              <th>소요비용</th>
              <td>
                <input type="text" id="studyMoney" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 150px" value="0"> 원
              </td>
            </tr>
            <tr>
              <th>산출내역</th>
              <td>
                <textarea id="studyMoneyVal" style="width: 800px; height: 100px"></textarea>
              </td>
            </tr>
            <tr class="study" style="display: none">
              <th>첨부서류</th>
              <td>
                <input type="text" id="attach" style="width: 800px">
              </td>
            </tr>
            <tr>
              <th>신청날짜</th>
              <td>
                <input type="text" id="regDate"style="width: 150px">
              </td>
            </tr>
          </table>
        </form>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" class="k-button k-button-solid-info" value="저장" onclick="studyReq.saveBtn();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
      </div>
    </div>
  </div>
</div>
<script>
  studyReq.init();
</script>
</body>
