<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/certificate/certificateReqAdminPop.js?v=3"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${params.empSeq}"/>
<input type="hidden" id="empName" value=""/>
<input type="hidden" id="deptName" value=""/>
<input type="hidden" id="dutyName" value=""/>
<input type="hidden" id="regEmpSeq" value="${regEmpInfo.uniqId}"/>

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">증명서신청</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="certificateReqAdminPop.saveBtn()">발급</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="subHolidayReqPop" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0" id="holidayPlanReqPopTb">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th><span class="red-star">*</span>발급 구분</th>
                    <td>
                        <input type="text" id="proofType" style="width: 80%;" value="">
                    </td>
                    <th><span class="red-star">*</span>신청일자</th>
                    <td>
                        <input type="text" id="regDe" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>사번</th>
                    <td>
                        <input type="text" id="regErpSn" value="" style="width: 80%;">
                    </td>
                    <th>성명</th>
                    <td>
                        <input type="text" id="regtrName" value="" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>부서명</th>
                    <td>
                        <input type="text" id="regDeptName" value="" style="width: 80%;">
                    </td>
                    <th>직위</th>
                    <td>
                        <input type="text" id="regDutyName" value="" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>제출처</th>
                    <td>
                        <input type="text" id="submissionName" style="width: 80%;" value="">
                    </td>
                    <th><span class="red-star">*</span>제출 예정일</th>
                    <td>
                        <input type="text" id="submissionDe" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>출력매수</th>
                    <td>
                        <input type="text" id="printSn" style="width: 80%;" value="">
                    </td>
                    <th><span class="red-star">*</span>용도</th>
                    <td>
                        <input type="text" id="usageName" style="width: 80%;" value="">
                    </td>
                </tr>
                <tr>
                    <th>비고</th>
                    <td colspan="3">
                        <input type="text" id="remarkName" class="defaultVal" value="">
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<script>
    certificateReqAdminPop.init();
</script>
</body>
