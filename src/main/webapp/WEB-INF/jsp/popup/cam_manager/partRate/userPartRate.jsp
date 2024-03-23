<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .table-responsive {
        overflow-x: hidden !important;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/partRate/userPartRate.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/partRate/partRateCommon.js?v=${today}'/>"></script>

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

<input type="hidden" id="pjtStrDt" value="${projectInfo.PJT_START_DT}"/>
<input type="hidden" id="pjtEndDt" value="${projectInfo.PJT_END_DT}"/>

<input type="hidden" id="bsStrDt" value="${params.year}-01-01"/>
<input type="hidden" id="bsEndDt" value="${params.year}-12-31"/>

<input type="hidden" id="rateFlag" value="A" />


<input type="hidden" id="userEmpSeq" value="${empInfo.EMP_SEQ}"/>

<input type="hidden" id="adminYn" value="${params.adminYn}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="title">직원 참여율 현황</span>

            </h3>

            <div class="btn-st popButton" style="font-size: 13px;">

            </div>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-weight: bold">직원정보</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        이름
                    </th>
                    <td>
                        ${empInfo.EMP_NAME_KR}
                    </td>
                    <th scope="row" class="text-center th-color">
                        주민번호
                    </th>
                    <td colspan="3">
                        <span id="resRegisNum">${empInfo.RES_REGIS_NUM}</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        부서명
                    </th>
                    <td>
                        ${empInfo.DEPT_NAME}
                    </td>
                    <th scope="row" class="text-center th-color">
                        팀명
                    </th>
                    <td>
                        ${empInfo.DEPT_TEAM_NAME}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        직위
                    </th>
                    <td>
                        ${empInfo.POSITION_NAME}
                    </td>
                    <th scope="row" class="text-center th-color">
                        입사일
                    </th>
                    <td>
                        ${empInfo.JOIN_DAY}
                    </td>
                </tr>
                <%--<tr>
                    <th scope="row" class="text-center th-color">
                        프로젝트 시작
                    </th>
                    <td>
                        ${projectInfo.PJT_START_DT}
                        <input type="hidden" id="startYear" value="${projectInfo.PJT_START_DT}" />
                    </td>
                    <th scope="row" class="text-center th-color">
                        프로젝트 종료
                    </th>
                    <td>
                        ${projectInfo.PJT_END_DT}
                    </td>
                </tr>--%>
                </thead>
            </table>
        </div>


        <div>
            <div id="divBtn" style="font-size: 12px; margin-top: 10px;">
                <input type="text" id="year" value=""  style="width: 5%; float: left; margin-left: 10px;"/>
                <c:choose>
                <c:when test="${params.adminYn == 'Y'}">
                    <button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin: 0 5px 5px 0;" onclick="userPartRate.fn_setDataAdmin('A')">참여율</button>
                    <button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin:0 5px 5px 0;" onclick="userPartRate.fn_setDataAdmin('B')">월지급액</button>
                    <div style="float: right; margin: 3px 5px 0 0;">
                        <input type="checkbox" id="payCheck" class="k-checkbox" name="gubun" value="pay" onchange="userPartRate.fn_changeCheck()" checked="checked"/>
                        <label for="payCheck">현금</label>
                        <input type="checkbox" id="itemCheck" class="k-checkbox" name="gubun" value="item" onchange="userPartRate.fn_changeCheck()"/>
                        <label for="itemCheck">현물</label>
                    </div>
                </c:when>
                <c:otherwise>
                    <button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin: 0 5px 5px 0;" onclick="userPartRate.fn_setData('A')">참여율</button>
                    <div style="float: right; margin: 3px 5px 0 0;">
                        <input type="checkbox" id="payCheck" class="k-checkbox" name="gubun" value="pay" onchange="userPartRate.fn_changeCheck()" checked="checked"/>
                        <label for="payCheck">현금</label>
                        <input type="checkbox" id="itemCheck" class="k-checkbox" name="gubun" value="item" onchange="userPartRate.fn_changeCheck()"/>
                        <label for="itemCheck">현물</label>
                    </div>
                </c:otherwise>
                </c:choose>
            </div>
            <table class="popTable table table-bordered mb-0">
                <c:choose>
                    <c:when test="${params.adminYn == 'Y'}">
                        <colgroup>
                            <col width="10%">
                            <col width="15%">
                            <col width="5%">
                            <col width="5%">
                            <col width="5%">
                        </colgroup>
                    </c:when>
                    <c:otherwise>
                        <colgroup>
                            <col width="7%">
                            <col width="7%">
                            <col width="15%">
                            <col width="5%">
                            <col width="5%">
                        </colgroup>
                    </c:otherwise>
                </c:choose>

                <thead>
                <tr>
                    <th colspan="20" style="font-weight: bold">참여율 정보</th>
                </tr>
                <tr id="userPartRateHeader">

                </tr>
                </thead>
                <tbody id="userPartRateBody">
                    <tr>
                        <td colspan="17" style="text-align: center">참여율 정보가 없습니다.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    userPartRate.fn_defaultScript();
</script>
</body>
</html>