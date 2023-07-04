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
          <form id="workPlanChangeFrm">
            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <table class="table table-bordered mb-0" id="workPlanApplyTb">
              <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
              </colgroup>
              <thead>
              <tr>
                <th>신청일</th>
                <td colspan="3">
                  <input type="text" id="apply_month" name="apply_month" class="defaultVal" style="width: 15%;">
                </td>
              </tr>
              <tr>
                <th>근무유형</th>
                <td colspan="3">
                  <input type="text" id="work_plan_type" name="work_plan_type" class="defaultVal" style="width: 15%;">
                </td>
              </tr>
              <tr>
                <th>적용기간</th>
                <td colspan="3">
                  <input type="text" id="start_date" name="start_date" class="defaultVal" onchange="workPlanRegPop.dateValidationCheck('start_date', this.value)" style="width: 15%;"> ~ <input type="text" id="end_date" name="end_date" class="defaultVal" onchange="workPlanRegPop.dateValidationCheck('end_date', this.value)" style="width: 15%;">
                </td>
              </tr>
              <tr>
                <th>주 근무시간</th>
                <td colspan="3">
                  <span id="work_week_time"></span>
                </td>
              </tr>
              <tr>
                <th>법정 근무시간</th>
                <td colspan="3">
                  <input type="text" name="work_month_time" id="work_month_time" class="inputline" readonly>
                  <span class="spanft">* 주 근무시간 x 4주</span>
                </td>
              </tr>
              <tr>
                <th>근무시간</th>
                <td colspan="3">
                    <span class="spanft">
                        * 일근무시간 : 퇴근시간이 13 : 00 이후 일 경우 점심시간 1시간 제외 합니다.<br>
                        * 저장하지 않을 요일은 체크박스를 선택하세요.
                    </span>
                  <table style="width:100%;" id="byDayWeekWTime">
                    <colgroup>
                      <col width="4%">
                      <col width="5%">
                      <col width="20%">
                      <col width="20%">
                      <col width="18%">
                      <col width="18%">
                      <col width="auto">
                    </colgroup>
                    <thead>
                    <tr>
                      <th>선택</th>
                      <th>요일</th>
                      <th>출근시간</th>
                      <th>퇴근시간</th>
                      <th>일 근무시간</th>
                      <th>분단위 환산</th>
                      <th>시차 출퇴근제<br>선택시 일괄적용</th>
                    </tr>
                    </thead>
                    <tr>
                      <td rowspan="2" class="text-center">
                        <input type="checkbox" id="monChk" name="dayChk" day="mon" dayNum="0" class="k-checkbox checkbox" onchange="workPlanRegPop.removeDayChk(this)">
                      </td>
                      <td rowspan="2" class="text-center" style="vertical-align: middle;">월</td>
                      <td rowspan="2">
                        <input type="text" name="w_s_time" id="w_s_time_mon" class="w_start_time startTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('mon')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td rowspan="2">
                        <input type="text" name="w_e_time" id="w_e_time_mon" class="w_end_time endTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('mon')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td rowspan="2">
                        <input type="text" name="w_time_mon_hour" id="w_time_mon_hour" class="day_w_hour" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly>
                      </td>
                      <td rowspan="2">
                        <input type="text" name="w_time_mon_min" id="w_time_mon_min" class="day_w_min" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly >
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="7" class="text-center timeDiffTd">
                        <div id="timeDiff" class="table-responsive" style="">
                          <span>근무유형 중<br>[시차출퇴근제]<br>선택시<br>표기됩니다.</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <input type="checkbox" id="tueChk" name="dayChk" day="tue" dayNum="1" class="k-checkbox checkbox" onchange="workPlanRegPop.removeDayChk(this)">
                      </td>
                      <td class="text-center" style="vertical-align: middle;">화</td>
                      <td>
                        <input type="text" name="w_s_time" id="w_s_time_tue" class="w_start_time startTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('tue')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_e_time" id="w_e_time_tue" class="w_end_time endTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('tue')"  style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_time_tue_hour" id="w_time_tue_hour" class="day_w_hour" style="width:100%; margin-top: 4px;border-width:0; color:gray" readonly>
                      </td>
                      </td>
                      <td>
                        <input type="text" name="w_time_tue_min" id="w_time_tue_min" class="day_w_min" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <input type="checkbox" id="wedChk" name="dayChk" day="wed" dayNum="2" class="k-checkbox checkbox" onchange="workPlanRegPop.removeDayChk(this)">
                      </td>
                      <td class="text-center" style="vertical-align: middle;">수</td>
                      <td>
                        <input type="text" name="w_s_time" id="w_s_time_wed" class="w_start_time startTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('wed')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_e_time" id="w_e_time_wed" class="w_end_time endTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('wed')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_time_wed_hour" id="w_time_wed_hour" class="day_w_hour" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly>
                      </td>
                      </td>
                      <td>
                        <input type="text" name="w_time_wed_min" id="w_time_wed_min" class="day_w_min" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly >
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <input type="checkbox" id="thuChk" name="dayChk" day="thu" dayNum="3" class="k-checkbox checkbox" onchange="workPlanRegPop.removeDayChk(this)">
                      </td>
                      <td class="text-center" style="vertical-align: middle;">목</td>
                      <td>
                        <input type="text" name="w_s_time" id="w_s_time_thu" class="w_start_time startTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('thu')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_e_time" id="w_e_time_thu" class="w_end_time endTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('thu')" style="width:100%;margin-top: 4px;" >
                      </td>
                      <td>
                        <input type="text" name="w_time_thu_hour" id="w_time_thu_hour" class="day_w_hour" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly>
                      </td>
                      </td>
                      <td>
                        <input type="text" name="w_time_thu_min" id="w_time_thu_min" class="day_w_min" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly >
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">
                        <input type="checkbox" id="friChk" name="dayChk" day="fri" dayNum="4" class="k-checkbox checkbox" onchange="workPlanRegPop.removeDayChk(this)">
                      </td>
                      <td class="text-center" style="vertical-align: middle;">금</td>
                      <td>
                        <input type="text" name="w_s_time" id="w_s_time_fri" class="w_start_time startTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('fri')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_e_time" id="w_e_time_fri" class="w_end_time endTimePicker timePicker" onchange="workPlanRegPop.singleWTSetting('fri')" style="width:100%;margin-top: 4px;">
                      </td>
                      <td>
                        <input type="text" name="w_time_fri_hour" id="w_time_fri_hour" class="day_w_hour" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly>
                      </td>
                      <td>
                        <input type="text" name="w_time_fri_min" id="w_time_fri_min" class="day_w_min" style="width:100%;margin-top: 4px; border-width:0; color:gray" readonly >
                      </td>
                    </tr>
                    <tr>
                      <th colspan="4" style="vertical-align:middle; text-align:center;">합계</th>
                      <td>
                        <input type="text" name="w_time_sum_hour" id="w_time_sum_hour" class="w_time_sum_hour" style="width:100%; border-width:0;color:gray" readonly>
                      </td>
                      <td>
                        <input type="text" name="w_time_sum_min" id="w_time_sum_min" class="w_time_sum_min" style="width:100%; border-width:0; color:gray" readonly="">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th scope="row" class="text-center th-color">신청사유</th>
                <td colspan="3">
                  <textarea name="apply_reason" id="apply_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>
                </td>
              </tr>
              </thead>
            </table>
          </form>
        </div>
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info" value="저장" onclick="workPlanRegPop.workPlanChangeSubSave()"/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="workPlanRegPop.fn_windowClose()"/>
        </div>
      </div>
    </div>
</div>
<script type="text/javascript" src="/js/intra/workPlan/workPlanRegPop.js?v=${today}"></script>
<script>
    workPlanRegPop.defaultScript();
</script>
</body>
</html>