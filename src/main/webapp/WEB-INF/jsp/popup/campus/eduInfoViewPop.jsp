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
<script type="text/javascript" src="/js/intra/campus/eduInfoViewPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
  <div class="card-header pop-header">
    <h3 class="card-title title_NM">교육수강 신청서 조회</h3>
    <div class="btn-st popButton">
      <c:choose>
        <c:when test="${data.STATUS == 0 || data.STATUS == 30}">
          <input type="button" class="k-button k-button-solid-info usrBtn" value="수정" onclick="eduInfoViewPop.campusModify();"/>
          <input type="button" class="k-button k-button-solid-info usrBtn" value="결재요청" onclick="eduInfoViewPop.campusDrafting();"/>
        </c:when>
        <c:when test="${data.STATUS == 10}">
          <input type="button" class="k-button k-button-solid-info usrBtn" value="회수" onclick="docApprovalRetrieve('${data.DOC_ID}', '${data.APPRO_KEY}', 1, 'retrieve');"/>
        </c:when>
        <c:when test="${data.STATUS == 100}">
          <input type="button" class="k-button k-button-solid-info" value="학습신청서 열람" onclick="approveDocView('${data.DOC_ID}', '${data.APPRO_KEY}', '${data.DOC_MENU_CD}');"/>
          <c:choose>
            <c:when test="${data.RES_STATUS == 1}">
              <input type="button" class="k-button k-button-solid-info usrBtn" value="결과보고서 작성" onclick="eduInfoViewPop.eduResultReqPop();"/>
            </c:when>
            <c:otherwise>
              <input type="button" class="k-button k-button-solid-info" value="결과보고서 조회" onclick="eduInfoViewPop.eduResultViewPop();"/>
            </c:otherwise>
          </c:choose>
        </c:when>
      </c:choose>
      <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
    </div>
  </div>
  <div class="card-header" style="padding-top:25px;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <%--<div class="popupTitleSt">교육수강 신청서 조회</div>--%>
        <form id="eduViewForm">
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
              <td id="userDept">${loginVO.deptNm} ${loginVO.orgnztNm}</td>
              <th>직 위</th>
              <td id="userPosition">${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}</td>
              <th>성 명</th>
              <td id="userName">${loginVO.name}</td>
            </tr>
          </table>

          <div class="mt20">
            <b>학습방법 : <span id="">${data.EDU_FORM_NAME}</span></b>
          </div>
          <table class="table table-bordered" id="eduReqTable" style="width: 1000px;">
            <colgroup>
              <col width="134px">
              <col width="314px">
              <col width="134px">
              <col width="314px">
            </colgroup>
            <thead>
            <tr>
              <th>학습목표</th>
              <td>
                ${data.EDU_CATEGORY_DETAIL_NAME}
              </td>
              <th>목표레벨</th>
              <td>
                ${data.LEVEL_ID} 레벨
              </td>
            </tr>
            <tr>
              <c:choose>
                <c:when test="${eduFormType == 5}">
                  <th>${eduNameVar}</th>
                  <td>${data.EDU_NAME}</td>
                  <th>작가명</th>
                  <td>
                      ${data.BOOK_WRITER_NAME}
                  </td>
                </c:when>
                <c:otherwise>
                  <th>${eduNameVar}</th>
                  <td colspan="3">
                      ${data.EDU_NAME}
                  </td>
                </c:otherwise>
              </c:choose>
            </tr>
            <c:choose>
            <c:when test="${eduFormType == 3}">
            <tr>
              <th>참석형태</th>
              <td colspan="3">
                <div style="display: flex; align-items: center">
                  ${data.OBJECT_FORUM_TYPE}
                  <c:if test="${data.OBJECT_FORUM_TYPE eq '주제발표'}">
                    (발표제목 : ${data.OBJECT_FORUM_VAL})
                  </c:if>
                </div>
              </td>
            </tr>
            </c:when>
            <c:when test="${eduFormType == 5}">
            <tr>
              <th>페이지 수</th>
              <td>
                  ${data.BOOK_PAGE} Page
              </td>
              <th>출판사</th>
              <td>
                  ${data.BOOK_PULISH}
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
                  ${data.TREA_TYPE}
              </td>
              <th>저자유형</th>
              <td>
                  ${data.TREA_USER}
              </td>
            </tr>
            </c:when>
            <c:when test="${eduFormType == 8}">
            <tr>
              <th>권수</th>
              <td colspan="3">
                  ${data.BOOK_UNIT} 권
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
            <c:when test="${eduFormType == 10}">
            <tr>
              <th>취득종류</th>
              <td colspan="3">
                  ${data.COMP_TYPE}
              </td>
            </tr>
            <tr>
              <th>발급기관</th>
              <td colspan="3">
                  ${data.CARE_NAME}
              </td>
            </tr>
            </c:when>
            </c:choose>
            <c:if test="${eduFormType != 3}">
            <tr>
              <th><span>${eduObjectVar}</span></th>
              <td colspan="3">
                  ${data.EDU_OBJECT}
              </td>
            </tr>
            </c:if>
            <tr>
              <th>${eduContentVar}</th>
              <td colspan="3">
                ${data.EDU_CONTENT}
              </td>
            </tr>
            <tr>
              <th>${eduDateVar}</th>
              <td colspan="3">
                <div style="float: left">
                ${data.START_DT} ~ ${data.END_DT}
                <c:choose>
                  <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3 || eduFormType == 4 || eduFormType == 5 || eduFormType == 6 || eduFormType == 9}">
                    (총 ${data.TERM_DAY}  일 ${data.TERM_TIME} 시간)
                    <c:choose>
                      <c:when test="${eduFormType == 5}">
                        / 50페이지당 1시간
                      </c:when>
                      <c:when test="${eduFormType == 6}">
                        / 2편당 1시간
                      </c:when>
                      <c:when test="${eduFormType == 9 || eduFormType == 10 }">
                        / 1일 최대4시간
                      </c:when>
                    </c:choose>
                  </c:when>
                </c:choose>
                </div>
                <div id="realTime"></div>
              </td>
            </tr>
            <c:choose>
            <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3 || eduFormType == 4}">
            <tr>
              <th>${careVar}</th>
              <td colspan="3">
                <span>${careNameVar}</span> : ${data.CARE_NAME}<br><div class="mt5"></div>
                <span>${careLocationVar}</span> : ${data.CARE_LOCATION}
                    <c:if test="${eduFormType == 1}">
                      <span>(전화 : ${data.CARE_TEL_NUM})</span>
                    </c:if>
              </td>
            </tr>
            </c:when>
            </c:choose>
            <tr>
              <th>${eduMoneyVar}</th>
              <td>
                  ${data.EDU_MONEY} 원
              </td>
              <th>결제수단</th>
              <td>
                  ${data.EDU_MONEY_TYPE}
              </td>
            </tr>
            <c:choose>
            <c:when test="${eduFormType == 1 || eduFormType == 2 || eduFormType == 3 || eduFormType == 4}">
            <tr>
              <th>환급 예상액</th>
              <td>
                  ${data.RETURN_MONEY} 원
              </td>
              <th>환급 필요서류</th>
              <td>
                  ${data.RETURN_DOC}
              </td>
            </tr>
            </c:when>
            </c:choose>
            <tr>
              <th>관련사업</th>
              <td colspan="3">
                임시사업
              </td>
            </tr>
            <tr>
              <th>첨부서류</th>
              <td colspan="3">
                ${data.ATTACH_DOC_NAME}
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colspan="3" id="eduFile">
              </td>
            </tr>
            <tr>
              <th>신청날짜</th>
              <td colspan="3">
                ${data.REG_DT}
              </td>
            </tr>
          </table>
        </form>
      </div>
      <%--<div class="btn-st" style="margin-top:10px; text-align:center;">
        <c:choose>
          <c:when test="${data.STATUS == 0}">
            <input type="button" class="k-button k-button-solid-info usrBtn" value="결재요청" onclick="eduInfoViewPop.campusDrafting();"/>
          </c:when>
          <c:when test="${data.STATUS == 10}">
            <input type="button" class="k-button k-button-solid-info usrBtn" value="회수" onclick="docApprovalRetrieve('${data.DOC_ID}', '${data.APPRO_KEY}', 1, 'retrieve');"/>
          </c:when>
          <c:when test="${data.STATUS == 100}">
            <input type="button" class="k-button k-button-solid-info" value="학습신청서 결재조회" onclick="approveDocView('${data.DOC_ID}', '${data.APPRO_KEY}', '${data.DOC_MENU_CD}');"/>
            <c:choose>
              <c:when test="${data.RES_STATUS == 1}">
                <input type="button" class="k-button k-button-solid-info usrBtn" value="결과보고서 작성" onclick="eduInfoViewPop.eduResultReqPop();"/>
              </c:when>
              <c:otherwise>
                <input type="button" class="k-button k-button-solid-info" value="결과보고서 조회" onclick="eduInfoViewPop.eduResultViewPop();"/>
              </c:otherwise>
            </c:choose>
          </c:when>
        </c:choose>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
      </div>--%>
    </div>
  </div>
</div>

<form id="campusDraftFrm" method="post">
  <input type="hidden" id="menuCd" name="menuCd" value="campus">
  <input type="hidden" id="type" name="type" value="drafting">
  <input type="hidden" id="nowUrl" name="nowUrl" />
  <input type="hidden" id="eduInfoId" name="eduInfoId" value="${data.EDU_INFO_ID}"/>
  <input type="hidden" id="eduFormType" name="eduFormType" value="${data.EDU_FORM_TYPE}"/>
  <input type="hidden" id="isAdmin" name="isAdmin" value="${params.isAdmin}"/>
</form>

<script>
  eduInfoViewPop.init();
</script>
</body>
