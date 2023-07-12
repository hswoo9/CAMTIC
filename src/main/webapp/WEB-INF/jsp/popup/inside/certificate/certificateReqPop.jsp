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
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">증명서신청</h3>
                    <div class="btn-st" style="margin-top:10px; text-align:center;">
                        <c:choose>
                            <c:when test="${data.STATUS == 0}">
                                <input type="button" class="k-button k-button-solid-info btn-A" value="신청" onclick="certificateReqPop.fn_certReq();"/>
                                <input type="button" class="k-button k-button-solid-info btn-A" value="수정" onclick="certificateReqPop.uptBtn();"/>
                                <input type="button" class="k-button k-button-solid-info btn-B" style="display: none" value="저장" onclick="certificateReqPop.saveBtn();"/>
                                <input type="button" class="k-button  k-button-solid-error btn-B" style="display: none" value="취소" onclick="window.close();"/>
                            </c:when>
                            <c:when test="${data.STATUS == null}">
                                <input type="button" class="k-button k-button-solid-info" value="저장" onclick="certificateReqPop.saveBtn();"/>
                                <input type="button" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
                            </c:when>
                        </c:choose>

                    </div>
                </div>
            </div>
            <form id="subHolidayReqPop" style="padding: 20px 30px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
                <table class="table table-bordered mb-0" id="holidayPlanReqPopTb" style="margin-top: 10px;">
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
                            <input type="text" id="regErpSn" value="C1234567" style="width: 80%;">
                        </td>
                        <th>성명</th>
                        <td>
                            <input type="text" id="regtrName" value="${LoginVO.name}" style="width: 80%;">
                        </td>
                    </tr>
                    <tr>
                        <th>부서명</th>
                        <td>
                            <input type="text" id="regDeptName" value="${LoginVO.orgnztNm}" style="width: 80%;">
                        </td>
                        <th>직급</th>
                        <td>
                            <input type="text" id="regDutyName" value="${LoginVO.dutyNm}" style="width: 80%;">
                        </td>
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
                        <th><span class="red-star">*</span>주민등록번호</th>
                        <td>
                            <input type="text" maxlength="6" id="firstRrnName" oninput="onlyNumber(this);" style="width: 40%;" value="${data.FIRST_RRN_NAME}">
                            -
                            <input type="text" maxlength="1" id="secondRrnName" oninput="onlyNumber(this);" style="width: 10%;" value="${data.SECOND_RRN_NAME}"> ******
                        </td>
                    </tr>
                    <tr>
                        <th><span class="red-star">*</span>용도</th>
                        <td>
                            <input type="text" id="usageName" style="width: 80%;" value="${data.USAGE_NAME}">
                        </td>
                        <th>비고</th>
                        <td>
                            <input type="text" id="remarkName" class="defaultVal" style="width: 80%;" value="${data.REMARK_NAME}">
                        </td>
                    </tr>
                    </thead>
                </table>
            </form>
        </div>
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
        $("#firstRrnName").data("kendoTextBox").enable(false);
        $("#secondRrnName").data("kendoTextBox").enable(false);
        $("#remarkName").data("kendoTextBox").enable(false);
        $("#regDe").data("kendoDatePicker").enable(false);
        $("#submissionDe").data("kendoDatePicker").enable(false);
        $("#proofType").data("kendoDropDownList").enable(false);
        $("#printSn").data("kendoDropDownList").enable(false);
        $("#usageName").data("kendoDropDownList").enable(false);

        $("#regDe").val("${data.REG_DE}");
        $("#submissionDe").val("${data.SUBMISSION_DE}");
    }





    console.log("${LoginVO}");
</script>
</body>
