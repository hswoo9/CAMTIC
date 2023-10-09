<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/cam_project/management/productReqPop.js?v=${today}"></script>
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
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" value="${params.type}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="parentCodeId" value="${params.parentCodeId}"/>
<input type="hidden" id="parentCodeName" value="${params.parentCodeName}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
  <div class="table-responsive">
    <div class="card-header pop-header">
      <h3 class="card-title title_NM">자산연계-거래 분류 등록</h3>
      <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="productReq.fn_saveBtn();">등록</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
      </div>
    </div>
    <form id="table-responsive" style="padding: 20px 30px;" onsubmit="return false;">
    <table class="popTable table table-bordered mb-0">
      <colgroup>
        <col width="20%">
        <col width="80%">
      </colgroup>
      <thead>
      <tr>
        <th>분류명</th>
        <td>
          <input type="text" id="reqText" style="width:500px" value=""/>
        </td>
      </tr>
      </thead>
    </table>
    </form>
  </div>
</div><!-- col-md-9 -->

<script>
    productReq.fn_defaultScript();
</script>
</body>
</html>
