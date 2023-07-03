<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
  .removeDay{
    text-decoration:line-through;
    font-weight:700;
    color:red
  }
  .k-grid-toolbar{
    justify-content: flex-end !important;
  }
  .k-grid-norecords{
    justify-content: space-around;
  }
  .k-grid tbody tr{
    height: 38px;
  }
  #wptDiv{
    margin: 0 auto;
    width: 100px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
  }
  #wptDiv > label {
    margin : 0
  }
  #timeDiff{
    height: 255px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header" style="padding-top:45px;">
      <div class="col-lg-11" style="margin:0 auto;">
        <div class="table-responsive">
          <div class="popupTitleSt">휴가신청</div>
          <form id="subHolidayReqPop">
            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <input type="hidden" id="apprStat" value="N">
            <input type="hidden" id="vacUseHistId" value="">
            <table class="table table-bordered mb-0" id="holidayPlanReqPopTb">
              <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
              </colgroup>
              <thead>
              <tr>
                <th>사번</th>
                <td>
                  <input type="text" id="empSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
                </td>
                <th>성명</th>
                <td>
                  <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;">
                </td>
              </tr>
              <tr>
                <th>부서명</th>
                <td>
                  <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;">
                </td>
                <th>직급</th>
                <td>
                  <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.dutyNm}" style="width: 80%;">
                </td>
              </tr>
              <tr>
                <th>신청구분</th>
                <td colspan="3">
                  <input type="text" id="edtHolidayKindTop" name="edtHolidayKindTop" required="required" style="width:20%;">
                </td>
              </tr>
              </thead>
            </table>
            <table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">
              <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
              </colgroup>
              <thead>
              <tr>
                <th id="varianceTH">기간</th>
                <td id="varianceTD" colspan="3">
                  <input type="text" id="edtHolidayStartDateTop" name="edtHolidayStartDateTop" data-bind="value:start" style="width: 20%;">
                  <input type="text" id="edtHolidayStartHourTop" name="edtHolidayStartHourTop" class="timeInput" data-bind="value:start" style="width: 10%;">
                  <span style="width: 9%;"> ~ </span>
                  <input type="text" id="edtHolidayEndDateTop" name="edtHolidayEndDateTop" data-bind="value:end" style="width: 20%;">
                  <input type="text" id="edtHolidayEndHourTop" name="edtHolidayEndHourTop" class="timeInput" data-bind="value:end" style="width: 10%;">
                  <table style="width:100%; margin-top:5px; text-align:center;">
                    <tr style="background-color:#d8dce36b;">
                      <th rowspan="2">근무시간유형</th>
                      <th>시차출근A</th>
                      <th>기본</th>
                      <th>시차출근B</th>
                      <th>시차출근C</th>
                    </tr>
                    <tr style="background-color:#d8dce36b;">
                      <th>08:00 ~ 17:00</th>
                      <th>09:00 ~ 18:00</th>
                      <th>10:00 ~ 19:00</th>
                      <th>14:00 ~ 22:30</th>
                    </tr>
                    <tr style="background-color:#fff;">
                      <td>오전반차</td>
                      <td>08:00 ~ 13:00</td>
                      <td>09:00 ~ 14:00</td>
                      <td>10:00 ~ 15:00</td>
                      <td>-</td>
                    </tr>
                    <tr style="background-color:#fff;">
                      <td>오후반차</td>
                      <td>13:00 ~ 17:00</td>
                      <td>14:00 ~ 18:00</td>
                      <td>15:00 ~ 19:00</td>
                      <td>14:00 ~ 18:00</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th id="varianceTH2" scope="row" class="text-center th-color">사유</th>
                <td id="varianceTD2" colspan="3">
                  <textarea name="holiday_reason" id="holiday_reason" rows="5" style="width:100%; /*border: 1px solid #eee;padding-left: 10px;*/"></textarea>
                </td>
              </tr>
              <tr>
                <th scope="row" class="text-center th-color">기타사항<br>(인수인계 등)</th>
                <td colspan="3">
                  <textarea name="other_reason" id="other_reason" rows="5" style="width:100%; /*border: 1px solid #eee;padding-left: 10px;*/"></textarea>
                </td>
              </tr>
              <tr>
                <th scope="row" class="text-center th-color">업무인수자</th>
                <td colspan="3">
                  <input type="text" id="other_emp" name="other_emp" class="defaultVal" style="width: 20%;">
                  <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="검색" onclick="userSearch();"/>
                  <br>
                  <input type="button" class="mt10 k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="선택 초기화" onclick=""/>
                </td>
              </tr>
              <tr>
                <th scope="row" class="text-center th-color">신청일</th>
                <td colspan="3">
                  <input type="date" id="now_date" style="width: 20%;">
                </td>
              </tr>
              </thead>
            </table>
          </form>
        </div>
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info k-rounded" value="저장" onclick="subHolidayReqPop.fn_vacEdtHolidaySaveModal()"/>
          <%--<input type="button" class="k-button k-button-solid-info k-rounded" value="결재" onclick=""/>--%>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소" onclick="subHolidayReqPop.fn_topTableClose()"/>
        </div>
      </div>
    </div>
</div>
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayReqPop.js?v=${today}"></script>
<script>
  subHolidayReqPop.fn_defaultScript();

  function userSearch() {
    window.open("/subHoliday/subHolidayListPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
  }

</script>
</body>
