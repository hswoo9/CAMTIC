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
    <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-error" onclick="window.close();">닫기</button>
    </div>
</div>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel" style="margin: 0">
        <div class="panel-body" style="padding: 20px 0px;">
            <div>
                <div class="col-md-3 col-lg-3 dash-left">
                    <div class="col-md-12 col-lg-12 dash-left">
                        <div id="mainGrid"></div>
                    </div>
                </div>
                <div class="col-md-9 col-lg-9 dash-left">
                    <div class="table-responsive">
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
