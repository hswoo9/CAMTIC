<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
  .k-radio-list-horizontal, .k-radio-list.k-list-horizontal {
    gap: 0px;
  }

   .pop-header {
     position: fixed;
     top: 0;
     width: 100%;
     z-index: 1000;
   }

  table > thead > tr > th { background-color: #8fa1c04a !important; }
  table > thead > tr > td { background-color: #fff; }

</style>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/eduResultReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<div class="card-header pop-header">
  <h3 class="card-title title_NM">교육 결과보고서 작성</h3>
  <div class="btn-st popButton">
      <span id="campusBtnBox">

      </span>
      <input type="button" class="k-button k-button-solid-info" id="saveBtn" value="저장" onclick="eduResultReqPop.saveEduResult();"/>
      <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close();"/>
  </div>
</div>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header" style="padding-top:60px;">
    <div class="col-lg-12" style="margin:0 auto;">
      <div class="table-responsive">
       <%-- <div class="popupTitleSt">교육 결과보고서 작성</div>--%>
        <form id="eduReqForm">
          <table class="table table-bordered" id="userInfoTable">
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
              <td id="userDept">${loginVO.deptNm} ${loginVO.orgnztNm}</td>
              <th>직 위</th>
              <td id="userPosition">${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}</td>
              <th>성 명</th>
              <td id="userName">${loginVO.name}</td>
            </tr>
          </table>

          <div class="mt20">
            <b>학습계획</b>
          </div>
          <table class="table table-bordered">
            <colgroup>
              <col width="170px">
              <col width="">
            </colgroup>
            <thead>
              <tr>
                <th>
                  <span id="dutyClass"></span>
                </th>
                <td>
                  <span id="categoryName"></span>
                </td>
              </tr>
              <tr>
                <th>학습 계획</th>
                <td>
                  <span id="eduPlan"></span>
                </td>
              </tr>
            </thead>
          </table>

          <div class="mt20">
            <b>학습방법 : <span id="eduFormName"></span></b>
          </div>
          <table class="table table-bordered" id="eduReqTable">
            <colgroup>
              <col width="170px">
              <col width="391px">
              <col width="170px">
              <col width="391px">
            </colgroup>
            <thead>
              <tr>
                <th>과정명</th>
                <td colspan="3">
                  <span id="eduName"></span>
                </td>
              </tr>
              <c:choose>
                <c:when test="${eduFormType == 5}">
                  <tr>
                    <th>페이지수</th>
                    <td>
                      <span id="bookPageVal"></span> Page
                    </td>
                    <th>출판사</th>
                    <td>
                      <span id="bookPulishName"></span>
                    </td>
                  </tr>
                </c:when>
                <c:when test="${eduFormType == 6}">
                  <tr>
                    <th>출처</th>
                    <td>
                      <span id="treaOrigin"></span>
                    </td>
                    <th>편수</th>
                    <td>
                      <span id="treaUnit"></span> 편
                    </td>
                  </tr>
                </c:when>
                <c:when test="${eduFormType == 7}">
                  <tr>
                    <th>학술지 유형</th>
                    <td>
                      <span id="treaType"></span> 학술지
                    </td>
                    <th>저자 유형</th>
                    <td>
                      <span id="treaUser"></span>
                    </td>
                  </tr>
                </c:when>
              </c:choose>
              <tr>
                <th>${eduDateVar}</th>
                  <c:choose>
                    <c:when test="${eduFormType == 1}">
                      <td>
                        <span class="startDt"></span> ~ <span class="endDt"></span> (총 <input type="text" id="termDay" style="width: 50px">일 <input type="text" id="termTime" style="width: 50px">시간)
                      </td>
                    </c:when>
                    <c:when test="${eduFormType == 2 || eduFormType == 3}">
                      <td>
                        <span class="startDt"></span> ~ <span class="endDt"></span> (총 <span class="termDay"></span>일 <span class="termTime"></span>시간)
                      </td>
                    </c:when>
                    <c:when test="${eduFormType == 7 || eduFormType == 8}">
                      <td colspan="3">
                        <span class="startDt"></span> ~ <span class="endDt"></span>
                      </td>
                    </c:when>
                    <c:when test="${eduFormType == 10}">
                      <td>
                        <span id="compType"></span>
                      </td>
                    </c:when>
                    <c:otherwise>
                      <td colspan="3">
                        <span class="startDt"></span> ~ <span class="endDt"></span> (총 <span class="termDay"></span>일 <span class="termTime"></span>시간)
                      </td>
                    </c:otherwise>
                  </c:choose>
                  <c:choose>
                    <c:when test="${eduFormType == 1 || eduFormType == 2}">
                      <th><span class="red-star">*</span>강사</th>
                      <td>
                        <input type="text" id="eduTeacherName" style="width: 200px">
                      </td>
                    </c:when>
                    <c:when test="${eduFormType == 3}">
                      <th>참석형태</th>
                      <td>
                        <span id="objectForumType"></span>
                          <span id="forumValWrap" style="display: none;">
                            (발표제목 : <span id="objectForumVal"></span>)
                          </span>
                      </td>
                    </c:when>
                    <c:when test="${eduFormType == 10}">
                      <th>발급기관</th>
                      <td>
                        <span class="careName"></span>
                      </td>
                    </c:when>
                  </c:choose>
              </tr>
              <c:choose>
                <c:when test="${eduFormType != 5 && eduFormType != 6 && eduFormType != 7 && eduFormType != 8 && eduFormType != 9 && eduFormType != 10}">
                  <tr>
                    <th>
                        ${careNameVar}</th>
                    <td>
                      <span class="careName"></span>
                    </td>
                    <th>${careLocationVar}</th>
                    <td>
                      <span id="careLocation"></span>
                    </td>
                  </tr>
                </c:when>
              </c:choose>
              <c:choose>
                <c:when test="${eduFormType == 8}">
                  <tr>
                    <th>권 수</th>
                    <td colspan="3">
                      <span id="bookUnit"></span>
                    </td>
                  </tr>
                </c:when>
                <c:when test="${eduFormType == 9}">
                  <tr>
                    <th>방문지</th>
                    <td colspan="3">
                      <span class="careName"></span>
                    </td>
                  </tr>
                </c:when>
              </c:choose>
              <c:choose>
                <c:when test="${eduFormType == 1 || eduFormType == 2}">
                  <tr>
                    <th>${eduObjectVar}</th>
                    <td colspan="3">
                      <span id="eduObject"></span>
                    </td>
                  </tr>
                </c:when>
              </c:choose>
              <tr>
                <th>${eduContentVar}</th>
                <td colspan="3">
                  <textarea id="eduContent" style="height: 130px"></textarea>
                </td>
              </tr>
              <c:choose>
                <c:when test="${eduFormType == 1 || eduFormType == 2}">
                  <tr>
                    <th>학습평가</th>
                    <td colspan="3">
                      <span id="eduEval"></span>
                    </td>
                  </tr>
                </c:when>
              </c:choose>
              <tr>
                <th>첨부파일</th>
                <td colspan="3">
                  <label for="fileList" class="k-button k-button-solid-base">파일첨부</label>
                  <input type="file" id="fileList" name="fileList" onchange="eduResultReqPop.fileChange()" style="display: none" multiple>
                  <ul id="ulSetFileName" style="padding-left: 20px;"></ul>
                  <ul id="ulFileName" style="padding-left: 20px;"></ul>
                </td>
              </tr>
              <tr>
                <th><span class="red-star">*</span>직무연계 포인트</th>
                <td colspan="3">
                  <textarea id="eduPoint" style="height: 100px"></textarea>
                </td>
              </tr>
            </thead>
          </table>

          <div class="mt20">
            <b>* Feedback List의 내용은 3개월 후에 본인, 파트장, 부서장의 검토시 기준이 됩니다.</b>
          </div>
          <table class="table table-bordered" id="FBTable">
            <colgroup>
              <col width="170px">
              <col width="">
              <col width="170px">
              <col width="">
            </colgroup>
            <thead>
              <tr>
                <th>FeedBack List </th>
                <td colspan="3">
                  <textarea id="FBList" style="height: 100px"></textarea>
                </td>
              </tr>
            </thead>
          </table>
        </form>
      </div>

    </div>
  </div>
</div>
<form id="campusResDraftFrm" method="post">
  <input type="hidden" id="menuCd" name="menuCd" value="campus">
  <input type="hidden" id="type" name="type" value="drafting">
  <input type="hidden" id="nowUrl" name="nowUrl" />
  <input type="hidden" id="eduInfoId" name="eduInfoId" value="${params.eduInfoId}"/>
  <input type="hidden" id="eduFormType" name="eduFormType" value="${eduFormType}"/>
</form>
<script>
  eduResultReqPop.init();
</script>
</body>
