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
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
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
                <c:when test="${data.STATUS eq 'A'}">
                  신청서 작성중
                </c:when>
              </c:choose>
            </td>
          </tr>
        </table>
      </div>
      <div class="btn-st" style="margin-top:10px; text-align:center;">
        <input type="button" class="k-button k-button-solid-info" value="수정" onclick="studyView.studyUpdatePop();"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="결재요청" onclick="studyView.fn_studyCertReq();"/>
      </div>
    </div>
  </div>

  <div class="card-header" style="padding-top:45px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <div class="popupTitleSt">학습자</div>
        <form id="studyReqForm">
          <table class="table table-bordered mt20" id="studyUserTable" style="width: 1000px;">
            <colgroup>
              <col width="10%">
              <col width="30%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
            </colgroup>
            <thead>
            <tr>
              <th>구분</th>
              <th>부서명</th>
              <th>직위</th>
              <th>성명</th>
              <th>조장/간사</th>
            </tr>
            <c:forEach var="list" items="${list}" varStatus="status">
              <tr>
                <td style="text-align: center">${list.STUDY_CLASS_TEXT}</td>
                <td>${list.STUDY_DEPT_NAME} ${list.STUDY_TEAM_NAME}</td>
                <td>${list.STUDY_POSITION_NAME}</td>
                <td style="text-align: center">${list.STUDY_EMP_NAME}</td>
                <td style="text-align: center">
                  <input type="button" class="k-button k-button-solid-base" value="조장" onclick="studyView.updBtn('${list.STUDY_USER_SN}', '${list.STUDY_INFO_SN}', '1', '조장')"/>
                  <input type="button" class="k-button k-button-solid-base" value="간사" onclick="studyView.updBtn('${list.STUDY_USER_SN}', '${list.STUDY_INFO_SN}', '2', '간사')"/>
                </td>
              </tr>
            </c:forEach>
          </table>
        </form>
      </div>
    </div>
  </div>
</div>
<script>
  studyView.init();
</script>
</body>
