<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/certificate/certificateReqPop.js?v=${todate}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="positionName" value="${loginVO.positionNm}"/>

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">증명서신청</h3>
            <div class="btn-st popButton">
                <c:choose>
                    <c:when test="${data.STATUS == 0}">
                        <button type="button" class="k-button k-button-solid-info btn-A" onclick="certificateReqPop.fn_certReq();">신청</button>
                        <button type="button" class="k-button k-button-solid-info btn-A" onclick="certificateReqPop.uptBtn();">수정</button>
                        <button type="button" class="k-button k-button-solid-info btn-B" style="display: none" onclick="certificateReqPop.saveBtn();">승인요청</button>
                        <button type="button" class="k-button  k-button-solid-error btn-B" style="display: none" onclick="window.close();">취소</button>
                    </c:when>
                    <c:when test="${data.STATUS == null}">
                        <button type="button" class="k-button k-button-solid-info" onclick="certificateReqPop.saveBtn();">승인요청</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </c:when>
                </c:choose>
            </div>
        </div>
        <form id="subHolidayReqPop" style="padding: 20px 30px;">
            <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
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
                        <input type="text" id="proofType" style="width: 80%;" value="${data.PROOF_TYPE}">
                    </td>
                    <th><span class="red-star">*</span>신청일자</th>
                    <td>
                        <input type="text" id="regDe" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>사번</th>
                    <td>
                        <input type="text" id="regErpSn" value="${params.mode eq 'mng' ? data.ERP_EMP_SEQ : LoginVO.erpEmpCd}" style="width: 80%;">
                    </td>
                    <th>성명</th>
                    <td>
                        <input type="text" id="regtrName" value="${params.mode eq 'mng' ? data.EMP_NAME_KR : LoginVO.name}" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>부서명</th>
                    <td>
                        <input type="text" id="regDeptName" value="${params.mode eq 'mng' ? data.DEPT_NAME : LoginVO.orgnztNm}" style="width: 80%;">
                    </td>
                    <th>직위</th>
                    <c:choose>
                    <c:when test="${not empty LoginVO.positionNm}">
                        <td>
                        <input type="text" id="regPositionName" value="${params.mode eq 'mng' ? data.POSITION_NAME :LoginVO.positionNm}" style="width: 80%;">
                        </td>
                    </c:when>
                    <c:otherwise>
                        <td>
                        <input type="text" id="regDutyName" value="${params.mode eq 'mng' ? data.POSITION_NAME :LoginVO.dutyNm}" style="width: 80%;">
                        </td>
                    </c:otherwise>
                    </c:choose>
                </tr>
                <tr>
                    <th>제출처</th>
                    <td>
                        <input type="text" id="submissionName" style="width: 80%;" value="${data.SUBMISSION_NAME}">
                    </td>
                    <th><span class="red-star">*</span>제출 예정일</th>
                    <td>
                        <input type="text" id="submissionDe" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>출력매수</th>
                    <td>
                        <input type="text" id="printSn" style="width: 80%;" value="${data.PRINT_SN}">
                    </td>
                    <th><span class="red-star">*</span>용도</th>
                    <td>
                        <input type="text" id="usageName" style="width: 80%;" value="${data.USAGE_NAME}">
                    </td>
                    <%--<th><span class="red-star">*</span>주민등록번호</th>
                    <td>
                        <input type="text" maxlength="6" id="firstRrnName" oninput="onlyNumber(this);" style="width: 40%;" value="${data.FIRST_RRN_NAME}">
                        -
                        <input type="text" maxlength="1" id="secondRrnName" oninput="onlyNumber(this);" style="width: 10%;" value="${data.SECOND_RRN_NAME}"> ******
                    </td>--%>
                </tr>
                <tr>
                    <th>비고</th>
                    <td colspan="4">
                        <input type="text" id="remarkName" class="defaultVal" style="width: 100%;" value="${data.REMARK_NAME}">
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>

<form id="certifiDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="certifi">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="userProofSn" name="userProofSn" value="${data.USER_PROOF_SN}"/>
</form>
<script>
    var mode = '${params.mode}';
    var dtStatus = '${data.STATUS}';

    certificateReqPop.init();

    if(mode == "mng" || (dtStatus != null && dtStatus != '')){
        $("#submissionName").data("kendoTextBox").enable(false);
        /*$("#firstRrnName").data("kendoTextBox").enable(false);
        $("#secondRrnName").data("kendoTextBox").enable(false);*/
        $("#remarkName").data("kendoTextBox").enable(false);
        $("#regDe").data("kendoDatePicker").enable(false);
        $("#submissionDe").data("kendoDatePicker").enable(false);
        $("#proofType").data("kendoDropDownList").enable(false);
        $("#printSn").data("kendoDropDownList").enable(false);
        $("#usageName").data("kendoDropDownList").enable(false);

        $("#regDe").val("${data.REG_DE}");
        $("#submissionDe").val("${data.SUBMISSION_DE}");
    }




    console.log("${data}");
    console.log("${LoginVO}");
</script>
</body>
