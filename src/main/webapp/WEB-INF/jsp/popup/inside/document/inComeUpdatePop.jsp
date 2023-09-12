<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/document/inComePop.js?v=${today}"/></script>
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
<input type="hidden" id="documentSn" value="${params.documentSn}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">문서 접수 대장 수정</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="regisReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;"
                        onclick="window.close()">닫기
                </button>
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
                    <th colspan="4">문서 접수 대장</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>구분
                    </th>
                    <td colspan="3">
                        <input type="text" id="documentPart" style="width: 100%;" value="캠틱종합기술원">
                        <input type="hidden" id="documentPartName" style="width: 150px;" value="[CAMTIC]">
                        <input type="hidden" id="documentPartType" style="width: 150px;" value="1">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>접수 일자
                    </th>
                    <td>
                        <input type="text" id="shipmentDt" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>시행 일자
                    </th>
                    <td>
                        <input type="text" id="effectiveDt" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>발신기관
                    </th>
                    <td>
                        <input type="text" id="receiveName" value="${inComeList.RECEIVE_NAME}" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>접수자
                    </th>
                    <td>
                        <input type="text" id="empName" value="${inComeList.MANAGER_NAME}" style="width: 65%;">
                        <input type="hidden" id="empSeq" value="${inComeList.MANAGER_SN}">
                        <button type="button" id="staffSelect"
                                class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base"
                                style="width:30%; height:27px;" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>제목
                    </th>
                    <td colspan="3">
                        <input type="text" id="documentTitleName" value="${inComeList.DOCUMENT_TITLE_NAME}"
                               style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>담당 부서
                    </th>
                    <td class="colTd">
                        <input type="text" id="deptPart" value="${inComeList.DEPT_PART_TYPE}" style="width: 200px;">
                    </td>
                    <td colspan="2" class="colTd1">
                    </td>
                    <th style="display: none" scope="row" class="text-center th-color managerTd">
                        <span class="red-star"></span>담당자
                    </th>
                    <td style="display: none" class="managerTd">
                        <input type="text" id="userText" value="${inComeList.USER_TEXT}" style="width: 65%;">
                        <input type="hidden" id="userSn" style="width: 65%;">
                        <button type="button" id="userMultiSelect"
                                class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base"
                                style="width:30%; height:27px; line-height:0;" onclick="fn_userMultiSelectPop();">
                            직원선택
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>비고
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="remarkCn" style="width: 100%;">${inComeList.REMARK_CN}</textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수신 문서
                    </th>
                    <td colspan="3" style="padding:5px;">
                        <input type="file">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    regisReq.init();
    $("#effectiveDt").val("${inComeList.EFFECTIVE_DATE}");
    $("#shipmentDt").val("${inComeList.SHIPMENT_DATE}");
</script>

</body>
</html>