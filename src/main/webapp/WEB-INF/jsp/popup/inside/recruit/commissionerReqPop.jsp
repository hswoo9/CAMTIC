<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/commissionerReqPop.js?v=${today}"></script>
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
      <h3 class="card-title title_NM">면접심사 평가위원 등록</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" onclick="commissionerReq.saveBtn()">저장</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
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
            <span class="red-star"></span>임시아이디
          </th>
          <td>
            <input type="text" id="id" style="width: 52%">
            <button type="button" class="k-button k-button-solid-base" id="idCheck">중복확인</button>
          </td>
          <th>
            <span class="red-star"></span>임시비밀번호
          </th>
          <td><input type="password" id="pwd" style="width: 80%"></td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>성명
          </th>
          <td><input type="text" id="name" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>주민등록번호
          </th>
          <td>
            <input type="text" maxlength="6" id="firstRrnName" oninput="onlyNumber(this);" style="width: 40%;" value="${data.FIRST_RRN_NAME}">
            -
            <input type="text" maxlength="1" id="secondRrnName" oninput="onlyNumber(this);" style="width: 10%;" value="${data.SECOND_RRN_NAME}"> ******
          </td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>휴대폰
          </th>
          <td><input type="text" id="telNum" style="width: 80%" onkeydown="return onlyNumber(event)" onkeyup="removeChar(event);telFilter(this)" maxlength="13"></td>
          <th>
            <span class="red-star"></span>이메일
          </th>
          <td><input type="text" id="email" style="width: 80%"></td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>소속
          </th>
          <td><input type="text" id="belong" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>성별
          </th>
          <td><span id="gender" style="width: 80%"></span></td>
        </tr>
        <tr>
          <th>
            <span class="red-star"></span>직급(직책)
          </th>
          <td><input type="text" id="dutyPosition" style="width: 80%"></td>
          <th>
            <span class="red-star"></span>비고
          </th>
          <td><input type="text" id="rmk" style="width: 80%"></td>

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
