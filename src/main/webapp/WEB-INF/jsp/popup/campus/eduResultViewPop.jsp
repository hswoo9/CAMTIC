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
<script type="text/javascript" src="/js/intra/campus/eduResultViewPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header pop-header">
    <h3 class="card-title title_NM">교육 결과보고서 조회</h3>
    <div class="btn-st popButton">
        <c:choose>
          <c:when test="${data.RES_STATUS == 0}">
            <input type="button" class="k-button k-button-solid-info" value="결재요청" onclick="eduResultViewPop.campusResDrafting();"/>
          </c:when>
          <c:when test="${data.RES_STATUS == 10}">
            <input type="button" class="k-button k-button-solid-info" value="회수" onclick="docApprovalRetrieve('${data.RES_DOC_ID}', '${data.RES_APPRO_KEY}', 1, 'retrieve');"/>
          </c:when>
          <c:when test="${data.RES_STATUS == 100}">
            <input type="button" class="k-button k-button-solid-info" value="결과보고서 결재조회" onclick="approveDocView('${data.RES_DOC_ID}', '${data.RES_APPRO_KEY}', '${data.RES_DOC_MENU_CD}');"/>
          </c:when>
        </c:choose>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
    </div>
  </div>
  <div class="card-header" style="padding-top:25px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <%--<div class="popupTitleSt">교육 결과보고서 조회</div>--%>
          <table class="table table-bordered" id="userInfoTable" style="width: 888px;">
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
          <table class="table table-bordered" style="width: 888px;">
            <colgroup>
              <col width="222px">
              <col width="666px">
            </colgroup>
            <thead>
            <tr>
              <th>${data.DUTY_CLASS == 1 ? '주 업무' : '연계 업무'}</th>
              <td colspan="3">
                ${data.EDU_CATEGORY_NAME} > LEVEL ${data.LEVEL_ID} ${data.EDU_CATEGORY_DETAIL_NAME}
              </td>
            </tr>
            <tr>
              <th>학습 계획</th>
              <td colspan="3">
                ${data.EDU_PLAN}
              </td>
            </tr>
            </thead>
          </table>

          <div class="mt20">
            <b>학습방법 : <span>${data.EDU_FORM_NAME}</span></b>
          </div>
          <table class="table table-bordered" id="eduReqTable" style="width: 888px;">
            <colgroup>
              <col width="134px">
              <col width="314px">
              <col width="134px">
              <col width="314px">
            </colgroup>
            <thead>
            <tr>
              <th>과정명</th>
              <td colspan="3">
                ${data.EDU_NAME}
              </td>
            </tr>
            <c:choose>
              <c:when test="${eduFormType == 5}">
                <tr>
                  <th>페이지수</th>
                  <td>
                      ${data.BOOK_PAGE_VAL} Page
                  </td>
                  <th>출판사</th>
                  <td>
                      ${data.BOOK_PULISH_NAME}
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 6}">
                <tr>
                  <th>출처</th>
                  <td>
                      ${data.TREA_ORIGIN}
                  </td>
                  <th>편수</th>
                  <td>
                      ${data.TREA_UNIT} 편
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 7}">
                <tr>
                  <th>학술지 유형</th>
                  <td>
                      ${data.TREA_TYPE} 학술지
                  </td>
                  <th>저자 유형</th>
                  <td>
                      ${data.TREA_USER}
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <tr>
              <th>${eduDateVar}</th>
              <c:choose>
                <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3}">
                  <td>
                      ${data.START_DT} ~ ${data.END_DT} (총 ${data.TERM_DAY}일 ${data.TERM_TIME}시간)
                  </td>
                </c:when>
                <c:when test="${eduFormType == 7 || eduFormType == 8}">
                  <td colspan="3">
                      ${data.START_DT} ~ ${data.END_DT}
                  </td>
                </c:when>
                <c:when test="${eduFormType == 10}">
                  <td>
                      ${data.COMP_TYPE}
                  </td>
                </c:when>
                <c:otherwise>
                  <td colspan="3">
                      ${data.START_DT} ~ ${data.END_DT} (총 ${data.TERM_DAY}일 ${data.TERM_TIME}시간)
                  </td>
                </c:otherwise>
              </c:choose>
              <c:choose>
                <c:when test="${eduFormType == 1 || eduFormType == 2}">
                  <th>강사</th>
                  <td>
                      ${data.EDU_TEACHER_NAME}
                  </td>
                </c:when>
                <c:when test="${eduFormType == 3}">
                  <th>참석형태</th>
                  <td>
                      ${data.OBJECT_FORUM_TYPE}
                    <c:if test="${data.OBJECT_FORUM_TYPE eq '주제발표'}">
                      (발표제목 : ${data.OBJECT_FORUM_VAL})
                    </c:if>
                  </td>
                </c:when>
                <c:when test="${eduFormType == 10}">
                  <th>발급기관</th>
                  <td>
                      ${data.CARE_NAME}
                  </td>
                </c:when>
              </c:choose>
            </tr>
            <c:choose>
              <c:when test="${eduFormType != 5 && eduFormType != 6 && eduFormType != 7 && eduFormType != 8 && eduFormType != 9 && eduFormType != 10}">
                <tr>
                  <th>${careNameVar}</th>
                  <td>
                      ${data.CARE_NAME}
                  </td>
                  <th>${careLocationVar}</th>
                  <td>
                      ${data.CARE_LOCATION}
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <c:choose>
              <c:when test="${eduFormType == 8}">
                <tr>
                  <th>권 수</th>
                  <td colspan="3">
                      ${data.BOOK_UNIT}
                  </td>
                </tr>
              </c:when>
              <c:when test="${eduFormType == 9}">
                <tr>
                  <th>방문지</th>
                  <td colspan="3">
                      ${data.CARE_NAME}
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <c:choose>
              <c:when test="${eduFormType == 1 || eduFormType == 2}">
                <tr>
                  <th>${eduObjectVar}</th>
                  <td colspan="3">
                      ${data.EDU_OBJECT}
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <tr>
              <th>${eduContentVar}</th>
              <td colspan="3">
                ${data.EDU_CONTENT}
              </td>
            </tr>
            <c:choose>
              <c:when test="${eduFormType == 1 || eduFormType == 2}">
                <tr>
                  <th>학습평가</th>
                  <td colspan="3">
                    <span id="eduEval">
                      <c:choose>
                        <c:when test="${data.EDU_EVAL == 1}">
                          매우도움
                        </c:when>
                        <c:when test="${data.EDU_EVAL == 2}">
                          도움
                        </c:when>
                        <c:when test="${data.EDU_EVAL == 3}">
                          참고정도
                        </c:when>
                        <c:when test="${data.EDU_EVAL == 4}">
                          기대이하
                        </c:when>
                      </c:choose>
                    </span>
                  </td>
                </tr>
              </c:when>
            </c:choose>
            <tr>
              <th>첨부서류</th>
              <td colspan="3" id="attachDocNameTd">
                ${data.ATTACH_DOC_NAME}
              </td>
            </tr>
            <tr>
              <th>직무연계 포인트</th>
              <td colspan="3">
                ${data.EDU_POINT}
              </td>
            </tr>
            </thead>
          </table>

          <div class="mt20">
            <b>* Feedback List의 내용은 3개월 후에 본인, 파트장, 부서장의 검토시 기준이 됩니다.</b>
          </div>
          <table class="table table-bordered" id="FBTable" style="width: 888px;">
            <colgroup>
              <col width="134px">
              <col width="314px">
              <col width="134px">
              <col width="314px">
            </colgroup>
            <thead>
            <tr>
              <th>FeedBack List </th>
              <td colspan="3">
                ${data.FBLIST}
              </td>
            </tr>
            </thead>
          </table>
        </div>

    </div>
  </div>
</div>

  <form id="campusResDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="campus">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="eduInfoId" name="eduInfoId" value="${data.EDU_INFO_ID}"/>
    <input type="hidden" id="eduFormType" name="eduFormType" value="${data.EDU_FORM_TYPE}"/>
  </form>
</div>
<script>
  eduResultViewPop.init();
</script>
</body>
