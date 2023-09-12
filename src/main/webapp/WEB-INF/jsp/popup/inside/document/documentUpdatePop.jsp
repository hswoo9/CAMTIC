<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/document/documentPop.js?v=${today}"/></script>
<%--<script type="text/javascript" src="/js/intra/inside/document/documentUpdatePop.js?v=${today}"/></script>--%>
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
<%--<input type="hidden" id="DOCUMENT_SN" name="DOCUMENT_SN" value="${DOCUMENT_SN}"/>--%>
<input type="hidden" id="documentSn" value="${params.documentSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">문서 등록 대장</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="docuReq.saveBtn();">저장</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                    <%--<tr>
                        <th colspan="4">문서 등록 대장</th>
                    </tr>--%>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>구분
                        </th>
                        <td colspan="3">
                            <input type="text" id="documentPart" value="${data.DOCUMENT_PART_NAME}" style="width: 170px;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>시행 일자
                        </th>
                        <td>
                            <input type="text" id="effectiveDt"  style="width: 100%;">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>발송 일자
                        </th>
                        <td>
                            <input type="text" id="shipmentDt" value="${data.reg_dt}" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>수신처
                        </th>
                        <td>
                            <input type="text" id="receiveName" value="${data.RECEIVE_NAME}" style="width: 100%;" value="내부 결재">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>담당자
                        </th>
                        <td>
                            <input type="text" id="empName" value="${data.MANAGER_NAME}" style="width: 70%;">
                            <input type="hidden" id="empSeq" value="${data.MANAGER_NAME}" style="width: 50%;">
                            <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>제목
                        </th>
                        <td colspan="3">
                            <input type="text" id="documentTitleName" value="${data.DOCUMENT_TITLE_NAME}" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>비고
                        </th>
                        <td colspan="3">
                            <textarea type="text" id="remarkCn" style="width: 100%;">${data.REMARK_CN}</textarea>
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
</div>

<script>
    docuReq.init();

    $("#documentPart").data("kendoDropDownList").text("${data.DOCUMENT_PART_NAME}");
</script>
</body>
</html>