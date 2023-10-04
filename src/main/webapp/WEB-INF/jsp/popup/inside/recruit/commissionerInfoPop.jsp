<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
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
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">면접심사 평가위원 상세보기</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
      </div>
    </div>
    <form id="recruitReqForm" style="padding: 20px 30px;">
      <table class="popTable table table-bordered mb-0" id="recruitReqPop">
        <colgroup>
          <col width="15%">
          <col width="35%">
          <col width="15%">
          <col width="35%">
        </colgroup>
        <thead>
        <tr>
          <th>
            <span class="red-star"></span>아이디
          </th>
          <td>
            ${data.LOGIN_ID}
          </td>
          <th>
            <span class="red-star"></span>비밀번호
          </th>
          <td>
            **********
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>성명
          </th>
          <td>
            ${data.EMP_NAME_KR}
          </td>
          <th>
            <span class="red-star"></span>주민등록번호
          </th>
          <td>
              <c:choose>
                <c:when test="${fn:length(fn:replace(data.RES_REGIS_NUM, '-', '')) > 6}">
                  ${fn:substring(data.RES_REGIS_NUM, 0, 6)}
                  <c:choose>
                    <c:when test="${fn:substring(data.RES_REGIS_NUM, 6, 7) eq '-'}">
                      ${fn:substring(data.RES_REGIS_NUM, 7, 8)}******
                    </c:when>
                    <c:otherwise>
                      ${fn:substring(data.RES_REGIS_NUM, 6, 7)}******
                    </c:otherwise>
                  </c:choose>
                </c:when>
                <c:otherwise>
                  ${data.RES_REGIS_NUM}
                </c:otherwise>
              </c:choose>
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>휴대폰
          </th>
          <td>
            ${data.MOBILE_TEL_NUM}
          </td>
          <th>
            <span class="red-star"></span>이메일
          </th>
          <td>
            ${data.MOBILE_TEL_NUM}
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>소속
          </th>
          <td>
            ${data.DEPT_NAME}
          </td>
          <th>
            <span class="red-star"></span>성별
          </th>
          <td>
            <c:choose>
              <c:when test="${data.GENDER_CODE eq 'F'}">
                여
              </c:when>
              <c:when test="${data.GENDER_CODE eq 'M'}">
                남
              </c:when>
              <c:otherwise>
                -
              </c:otherwise>
            </c:choose>
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>직급(직책)
          </th>
          <td>
            ${data.POSITION_NAME}
            <c:if test="${data.DUTY_NAME ne '' and data.DUTY_NAME ne null}">
              (${data.DUTY_NAME})
            </c:if>
          </td>
          <th>
            <span class="red-star"></span>비고
          </th>
          <td>
            ${data.SIGNIFICANT}
          </td>
        </tr>
      </table>
    </form>

    <input type="hidden" id="userIdSub1" name="id_sub1" value="">
    <input type="hidden" id="userIdSub2" name="id_sub2" value="">
</div>

<script src="/js/intra/common/securityEncUtil.js?v=1"></script>
<script src="/js/intra/common/aes.js?v=1"></script>
<script>
  commissionerReq.init();
</script>
</body>
