<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyViewPop.js?v=${today}"></script>
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
<input type="hidden" id="studyInfoSn" value="${params.studyInfoSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="status" value="${data.STATUS}"/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">학습조 내용 조회</div>
        <table class="table table-bordered mt20" id="studyReqTable" style="width: 1000px;">
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
            <th>학습기간</th>
            <td>
              ${data.START_DT} ~ ${data.END_DT}
            </td>
          </tr>
          <tr>
            <th>학습장소</th>
            <td>
              ${data.END_DT}
            </td>
          </tr>
          <tr>
            <th>학습목표</th>
            <td>
              ${data.STUDY_OBJECT}
            </td>
          </tr>
          <tr>
            <th>학습내용</th>
            <td>
              ${data.STUDY_CONTENT}
            </td>
          </tr>
          <tr>
            <th>소요비용</th>
            <td>
              ${data.STUDY_MONEY} 원
            </td>
          </tr>
          <tr>
            <th>산출내역</th>
            <td>
              ${data.STUDY_MONEY_VAL}
            </td>
          </tr>
          <tr>
            <th>첨부서류</th>
            <td>
              ${data.ATTACH}
            </td>
          </tr>
          <tr>
            <th>신청날짜</th>
            <td>
              ${data.REG_DT}
            </td>
          </tr>
          <tr>
            <th>상태</th>
            <td>
              <c:choose>
                <c:when test="${data.STATUS eq '0'}">
                  신청서 작성중
                </c:when>
                <c:when test="${data.STATUS eq '10'}">
                  신청서 승인요청중
                </c:when>
                <c:when test="${data.STATUS eq '100'}">
                  신청서 제출
                </c:when>
                <c:when test="${data.STATUS eq '110'}">
                  이수완료
                </c:when>
              </c:choose>
            </td>
          </tr>
        </table>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" id="studyModBtn" style="display: none" class="k-button k-button-solid-primary" value="수정" onclick="studyView.studyUpdatePop();"/>
        <input type="button" id="studyReqBtn" style="display: none" class="k-button k-button-solid-info" value="승인요청" onclick="studyView.studyReq(10);"/>
        <input type="button" id="studyCancelBtn" style="display: none" class="k-button k-button-solid-info" value="승인요청취소" onclick="studyView.studyReq(0);"/>
        <input type="button" id="studyAppBtn" style="display: none" class="k-button k-button-solid-info" value="승인" onclick="studyView.studyReq(100);"/>
        <input type="button" id="studyComBtn" style="display: none" class="k-button k-button-solid-error" value="반려" onclick="studyView.studyReq(30);"/>
      </div>
    </div>
  </div>

  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">학습자</div>
        <form id="studyReqForm">
          <table class="table table-bordered mt20" id="studyUserTable" style="width: 1000px;">
          </table>
        </form>
      </div>
    </div>
  </div>

  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">학습일지</div>
        <div id="mainGrid"></div>
      </div>
    </div>
  </div>
</div>
<script>
  studyView.init();
</script>
</body>
