<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripInit.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/addExternalWorkforcePop.js?v=${toDate}"/></script>
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
<input type="hidden" id="pageName" value="externalWorkforcePop"/>
<div class="card-header pop-header">
    <h3 class="card-title title_NM">외부인력 관리</h3>
    <div class="btn-st popButton">
        <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="" disabled>저장</button>
        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
    </div>
</div>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="col-md-4 col-lg-4">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 class="mt20">· 외부인력 추가</h4>
            <button type="button" class="k-button k-button-solid-info" id="addBtn" onclick="externalReq.fn_saveBtn();">저장</button>
        </div>
        <table class="table table-bordered mb-0" id="externalWorkforceReqTb">
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <thead>
            <tr>
                <th>소속</th>
                <td>
                    <input id="belong" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th>직위</th>
                <td>
                    <input id="spot" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>성명</th>
                <td>
                    <input id="name" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th>비고</th>
                <td>
                    <input id="etc" style="width: 100%;">
                </td>
            </tr>
            </thead>
        </table>
    </div>
    <div class="col-md-8 col-lg-8">
        <h4 class="mt20">· 외부인력 관리</h4>
        <table class="table table-bordered mb-0" id="externalWorkforceViewTb">
            <colgroup>
                <col width="21%">
                <col width="21%">
                <col width="21%">
                <col width="21%">
                <col width="16%">
            </colgroup>
            <thead id="externalThead">
            <tr>
                <th>소속</th>
                <th>직위</th>
                <th>성명</th>
                <th>비고</th>
                <th>처리명령</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
<script>
    externalReq.init();
</script>
</body>
</html>