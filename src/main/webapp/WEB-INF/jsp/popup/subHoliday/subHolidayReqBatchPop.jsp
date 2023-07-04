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
                  <input id="start_date" style="width:20%; margin-right:5px;">
                  ~
                  <input id="end_date" style="width:20%; margin-right:5px;">
                </td>
              </tr>
              <tr>
                <th id="varianceTH2" scope="row" class="text-center th-color">사유</th>
                <td id="varianceTD2" colspan="3">
                  <textarea name="apply_reason" id="holiday_reason" rows="5" style="width:100%; border: 1px solid #eee;padding-left: 10px;"></textarea>
                </td>
              </tr>
              </thead>
            </table>

            <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
              <tr>
                <td style="border-bottom:0; background-color: white">
                  <div style="display:flex;">
                    <div class="mr20">
                      <input type="text" id="dept" style="width: 150px;">
                      <input type="text" id="searchType" style="width: 150px;">
                      <input type="text" id="searchVal" style="width: 150px;">
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div class="btn-st" style="margin-top:10px; text-align:center;">
          <input type="button" class="k-button k-button-solid-info" value="연가일괄등록" onclick=""/>
          <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick=""/>
        </div>
      </div>
    </div>
</div>
<script>
  subHolidayReqBatchPop.init();
</script>
</body>
