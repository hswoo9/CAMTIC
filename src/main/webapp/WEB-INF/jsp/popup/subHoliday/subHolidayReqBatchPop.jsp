<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayReqBatchPop.js?v=${today}"></script>
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
          <div class="popupTitleSt">연가일괄등록</div>
          <form id="subHolidayReqPop">
            <input type="hidden" id="saveSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
            <input type="hidden" id="approvalSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
            <table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">
              <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
              </colgroup>
              <thead>
              <tr>
                <th id="varianceTH">기간</th>
                <td id="varianceTD" colspan="3">
                  <input id="startDate" style="width:20%; margin-right:5px;">
                  ~
                  <input id="endDate" style="width:20%; margin-right:5px;">
                </td>
              </tr>
              <tr>
                <th id="varianceTH2" scope="row" class="text-center th-color">사유</th>
                <td id="varianceTD2" colspan="3">
                  <textarea name="apply_reason" id="approvalReason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>
                </td>
              </tr>
              </thead>
            </table>

            <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
              <colgroup>
                <col width="11%">
                <col>
                <col width="15%">
              </colgroup>
              <tr>

                  <div style="display:flex;">
                    <div class="mr20">
                      <th class="text-center th-color" style="background-color: #d8dce3">부서</th>
                      <td>
                        <input type="text" id="dept" style="width:160px;">
                        <input type="hidden" id="dept_seq">
                        <input type="text" id="team" style="width:165px;">
                        <input type="hidden" id="team_seq">
                      </td>
                      <th class="text-center th-color" style="background-color: #d8dce3">검색어</th>
                      <td>
                        <input type="text" id="searchType" style="width: 80px;">
                        <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayReqBatchPop.gridReload()}" style="width: 140px;">
                      </td>
                    </div>
                  </div>

              </tr>
            </table>
            <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
              <tr>
                <td style="border-bottom:0; background-color: white">
                  <style>
                    label {
                      position: relative;
                      top: -1px;
                    }
                  </style>
                  <div class="mt10">
                    <input type="checkbox" class="detailSearch" id="dsA" checked>
                    <label for="dsA">전담직원 [${countMap.dsA}]</label>
                    <input type="checkbox" class="detailSearch" division="1" divisionSub="6" style="margin-left: 10px;" id="dsC">
                    <label for="dsC">위촉직원 [${countMap.dsC}]</label>
                    <input type="checkbox" class="detailSearch" division="3" style="margin-left: 10px;" id="dsB">
                    <label for="dsB">단기직원 [${countMap.dsB}]</label>
                    <input type="checkbox" class="detailSearch" division="4" divisionSub="3" style="margin-left: 10px;" id="dsD">
                    <label for="dsD">시설/환경 [${countMap.dsD}]</label>
                    <input type="checkbox" class="detailSearch" division="2" style="margin-left: 10px;" id="dsG">
                    <label for="dsG">연수생/학생연구원 [${countMap.dsG}]</label>
                    <input type="checkbox" class="detailSearch" division="10" style="margin-left: 10px;" id="dsE">
                    <label for="dsE">기타 [${countMap.dsE}]</label>
                  </div>
                </td>
              </tr>
            </table>
            <div id="mainGrid" style="margin:20px 0;"></div>
          </form>
        </div>
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info" value="연가일괄등록" onclick="saveData()"/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick="window.close()"/>
        </div>
      </div>
    </div>
</div>
<script>

  function saveData() {
    var empArr = new Array();
    /** 사용일수 체크 */
    var startDateStr = $("#startDate").val().replace(/\//g, '-');
    var endDateStr = $("#endDate").val().replace(/\//g, '-');

    var startDate = new Date(startDateStr);
    var endDate = new Date(endDateStr);

    var totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

    $("input[name='checkUser']:checked").each(function() {
      var data = {
        subHolidayCodeId: '1',
        applySeq: $(this).val(),
        saveSeq : $(this).val(),
        startDate: $("#startDate").val(), //시작일
        endDate: $("#endDate").val(), //종료일
        useDay : totalDays ,
        approvalReason: $("#approvalReason").val(), //사유
        approvalEmpSeq: $("#approvalSeq").val(),
        subHolidayTargetSeq : $(this).val()
      }

      empArr.push(data);
      console.log("saveSeq:", data.saveSeq);
    });
    console.log("empArr:", empArr);


    $.ajax({
      type: "POST",
      url: "<c:url value='/subHoliday/setSubHolidayByEmpInfo.do'/>",
      data: {
        empArr : JSON.stringify(empArr)
      },
      success: function(response) {
        alert("데이터가 성공적으로 저장되었습니다!");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("데이터 저장 중 오류가 발생했습니다: " + textStatus);
      }
    });
  }

  subHolidayReqBatchPop.init();
</script>
</body>
