<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/historyReqPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<body class="font-opensans" style="background-color:#fff;">
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
<div class="card-header pop-header">
    <h3 class="card-title title_NM">인사발령 등록</h3>
</div>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-body" style="padding: 20px 0px;">
            <div>
                <table class="searchTable table table-bordered mb-0" style="border: 0; margin-left: 20px;  margin-top : 5px; border: 1px solid #dedfdf; width: 1400px">
                    <colgroup>
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="23%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">성명</th>
                        <td>
                            <input type="text" id="searchVal" style="width: 200px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReq.gridReload()">조회</button>
                        </td>
                    </tr>
                </table>
                <div class="col-md-3 col-lg-3 dash-left">
                    <div class="col-md-10 col-lg-10 dash-left mt10">
                        <h4>· 직원목록</h4>
                        <div id="mainGrid" style="margin:34px 0;"></div>
                    </div>
                    <div class="col-md-2 col-lg-2 dash-left" style="position: absolute; right: -16px; top: 50%;">
                        →
                    </div>
                </div>
                <div class="col-md-9 col-lg-9 dash-left mt-10">
                    <div class="table-responsive mt20" style="margin-top:60px;">
                        <div id="popMainGrid"></div>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<div id="docEditor" style="width: 960px;display: none; margin-top: 300px;"></div>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script>
    let params = JSON.parse('${params}');
    historyReq.init();
</script>
</body>
