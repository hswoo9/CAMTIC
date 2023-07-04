<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/certificate/certificateReqPop.js?v=123${today}"></script>
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
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-lg-12" style="padding:0;">
    <div class="card-header" style="padding-top:45px;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <div class="popupTitleSt">증명서신청</div>
                <form id="subHolidayReqPop">
                    <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                    <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                    <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                    <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                    <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                    <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
                    <table class="table table-bordered mb-0" id="holidayPlanReqPopTb">
                        <colgroup>
                            <col width="20%">
                            <col width="30%">
                            <col width="20%">
                            <col width="30%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>발급 구분</th>
                            <td>
                                <input type="text" id="proofType" style="width: 80%;" value="${data.PROOF_TYPE}">
                            </td>
                            <th>신청일자</th>
                            <td>
                                <input type="text" id="regDe" style="width: 80%;" value="${data.REG_DE}">
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
                            <th>제출 예정일</th>
                            <td>
                                <input type="text" id="submissionDe" style="width: 80%;" value="${data.SUBMISSION_DE}">
                            </td>
                        </tr>
                        <tr>
                            <th>출력매수</th>
                            <td>
                                <input type="text" id="printSn" style="width: 80%;" value="${data.PRINT_SN}">
                            </td>
                            <th>주민등록번호</th>
                            <td>
                                <input type="text" id="firstRrnName" style="width: 40%;" value="${data.FIRST_RRN_NAME}">
                                -
                                <input type="text" id="secondRrnName" style="width: 10%;" value="${data.SECOND_RRN_NAME}"> ******
                            </td>
                        </tr>
                        <tr>
                            <th>용도</th>
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
            <div class="btn-st" style="margin-top:10px; text-align:center;">
                <c:choose>
                    <c:when test="${data.STATUS == 0}">
                        <input type="button" class="k-button k-button-solid-info" value="신청" onclick="certificateReqPop.fn_certReq();"/>
                    </c:when>
                    <c:when test="${data.STATUS == null}">
                        <input type="button" class="k-button k-button-solid-info" value="저장" onclick="certificateReqPop.saveBtn();"/>
                        <input type="button" class="k-button k-button-solid-error" value="취소" onclick="window.close();"/>
                    </c:when>
                </c:choose>

            </div>
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
    if(mode == "mng" || (dtStatus != null && dtStatus != '')){
        $("#proofType").attr("disabled", "disabled");
        $("#regDe").attr("disabled", "disabled");
        $("#submissionName").attr("disabled", "disabled");
        $("#submissionDe").attr("disabled", "disabled");
        $("#printSn").attr("disabled", "disabled");
        $("#firstRrnName").attr("disabled", "disabled");
        $("#secondRrnName").attr("disabled", "disabled");
        $("#usageName").attr("disabled", "disabled");
        $("#remarkName").attr("disabled", "disabled");
    }

    certificateReqPop.init();



    console.log("${LoginVO}");
</script>
</body>
