<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/recruitReqPop.js?v=${today}"></script>
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
    <div class="table-responsive">
      <div class="card-header pop-header">
        <h3 class="card-title title_NM">채용 등록</h3>
        <div class="btn-st popButton">
          <button type="button" class="k-button k-button-solid-info" onclick="recruitReq.saveBtn()">등록</button>
          <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
        </div>
      </div>
      <form id="recruitReqForm" style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0" id="recruitReqPop">
          <colgroup>
            <col width="15%">
            <col width="28%">
            <col width="28%">
            <col width="28%">
          </colgroup>
          <thead>
          <tr>
            <th>구분</th>
            <th colspan="3">내용</th>
          </tr>
          <tr>
            <th style="text-align: center">공고번호</th>
            <td colspan="3">
              공고 <input type="text" id="recruitNum" style="width: 30%" value="${recruitNum}">
            </td>
          </tr>
          <tr>
            <th style="text-align: center">공고제목</th>
            <td colspan="3">
              <input type="text" id="recruitTitle" style="width: 70%">
            </td>
          </tr>
          <tr>
            <th style="text-align: center">공고내용</th>
            <td colspan="3">
              <input type="text" id="recruitDetail" style="width: 70%">
            </td>
          </tr>
          <tr>
            <th style="text-align: center">공고일자</th>
            <td colspan="3">
              <input type="text" id="uploadDt" style="width: 15%">
              <input type="text" id="uploadText" style="width: 50%">
            </td>
          </tr>
          <tr>
            <th style="text-align: center">모집일시</th>
            <td colspan="3">
              <input type="text" id="startDt" style="width: 15%">
              <input type="text" id="startTime" style="width: 10%"> ~ <input type="text" id="endDt" style="width: 15%">
              <input type="text" id="endTime" style="width: 10%">
            </td>
          </tr>
          <tr id="areaTr">
            <th style="text-align: center">
              모집분야<br>
              <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base mt10" value="추가" onclick="" disabled/>
            </th>
            <td colspan="3" id="areaTd">
            </td>
          </tr>
          <tr>
            <th>
              모집분야 기타
            </th>
            <td colspan="3">
              <input type="text" id="jobPositionEtc" style="width: 80%">
            </td>
          </tr>
          <tr>
            <th>
              응시자격 기타
            </th>
            <td colspan="3">
              <input type="text" id="eligibilityEtc" style="width: 80%">
            </td>
          </tr>
          <tr>
            <th>
              근무형태
            </th>
            <td colspan="3">
              <input type="text" id="workType" style="width: 80%">
            </td>
          </tr>
          <tr>
            <th>
              전형방법
            </th>
            <td colspan="3">
              <input type="text" id="admission" style="width: 80%">
            </td>
          </tr>
          <tr>
            <th>
              지원서류
            </th>
            <td colspan="3">
              <input type="file" disabled>
            </td>
          </tr>
          <tr>
            <th>
              공고자료
            </th>
            <td colspan="3">
              <input type="file" disabled>
            </td>
          </tr>
          <tr>
            <th>
              원서접수
            </th>
            <td colspan="3">
              <input type="text" id="receiptDocu" style="width: 80%">
            </td>
          </tr>
          <tr>
            <th>
              기타사항
            </th>
            <td colspan="3">
              <input type="text" id="remark" style="width: 80%">
            </td>
          </tr>
          <tr>
            <th>
              상태(값 자동변경)
            </th>
            <td colspan="3">
              <input type="text" id="recruitStatus">
            </td>
          </tr>
        </table>
      </form>
    </div>
</div>
<script>
  recruitReq.init();
</script>
</body>
