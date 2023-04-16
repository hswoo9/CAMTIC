<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="true"></jsp:include>
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
<body>
<div class="card">
  <div class="card-header" style="padding:20px 0;">
    <div class="col-lg-11" style="margin:0 auto;">
      <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
        <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
        <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
        <table class="table table-bordered mb-0">
          <colgroup>
            <col width="10%">
            <col width="20%">
            <col width="10%">
            <col width="25%">
            <col width="10%">
            <col width="25%">
          </colgroup>
          <tbody>
          <tr>
            <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청구분</th>
            <td colspan="5">초과근무</td>
          </tr>
          <tr>
            <th class="text-center th-color"><span class="red-star">*</span>근무유형</th>
            <td colspan="5">
              <span id="applyOverWorkType" style="float: left"></span>
              <%--<span id="applyOverWorkType" name="applyOverWorkType" style="width: 20%"></span>--%>
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청자</th>
            <td colspan="4" style="border-right: none;">
              <input type="text" id="empName" name="empName" style="width: 27.9%;" value="${loginVO.name}">
            </td>
            <td style="border-left: none; text-align: left">
                            <span class="spanft" style="float:left;">
                              <%--<span class="red-star">*</span> 저녁시간 사용시 1시간이 제외 됩니다.--%>
                            </span>
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청일</th>
            <td><input type="text" id="applyDate" style="width: 96%;"></td>
            <th scope="row" class="text-center th-color">근무시간</th>
            <td><input type="text" id="workingTime" style="width: 50%;"></td>
            <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청시간</th>
            <td>
              <input type="text" id="applyStartTime" style="width: 45%;"> ~
              <input type="text" id="applyEndTime" style="width: 45%;">
              <div>
                (총 <span type="text" id="overWorkTotalHour" style="width: 30%;">0</span>시간
                <span type="text" id="overWorkTotalMin" style="width: 30%;">00</span>분)
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청사유</th>
            <td colspan="5"><input type="text" id="applyReason" style="width: 100%;"></td>
            <%--<th scope="row" class="text-center th-color"><span class="red-star">*</span>저녁시간 사용여부</th>
            <td>
                <span id="dinnerTimeUse" style="float:left;"></span>
            </td>--%>
          </tr>
          <tr>
            <th scope="row" class="text-center th-color">비고</th>
            <td colspan="5"><textarea type="text" id="remark" style="width: 100%;"></textarea></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-st">
        <input type="button" class="k-button k-rounded k-button-solid k-button-solid-info" value="저장" onclick="overWkPlanPop.overWorkApplySave()"/>
        <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소"  onclick="overWkPlanPop.fn_windowClose()"/>
      </div>
    </div>
  </div>
</div>
<c:choose>
  <c:when test="${overWorkPlanInfo ne NULL}">
    <input type="hidden" id="dataUse" value="Y" />
    <c:forEach var="entry" items="${overWorkPlanInfo}" varStatus="status">
      <input type="hidden" id="${entry.key}" value="${entry.value}">
    </c:forEach>
  </c:when>
  <c:otherwise>
    <input type="hidden" id="dataUse" value="N" />
  </c:otherwise>
</c:choose>

<script type="text/javascript" src="/js/intra/overWkPlan/overWkPlanPop.js?v=${today}"/>
<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvelService.jsp?v=${today}"></jsp:include>--%>
<script>
  overWkPop.defaultScript();
  overWkPop.findApplyDateWorkTime();
  $(function(){
    if($("#dataUse").val() == "Y"){
      overWkPop.fn_originDataSet();
    }
  })

</script>
</body>
</html>