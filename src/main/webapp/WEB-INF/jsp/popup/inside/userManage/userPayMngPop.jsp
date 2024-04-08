<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userPayMngPop.js?v=${today}"></script>
<style>
    #userPayMngBody > tr > td { padding: 5px; }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">급여관리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}" />
        <input type="hidden" id="loginEmpSeq" name="loginEmpSeq" value="${loginVO.uniqId}" />
        <input type="hidden" id="empSeq" name="empSeq" value="${params.empSeq}" />
        <input type="hidden" id="empName" name="empName" value="${data.EMP_NAME_KR}" />
        <table class="popTable table table-bordered mb-0" id="userReqPopImageTable">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th colspan="4" style="font-weight: bold">직원 기본정보</th>
            </tr>
            <tr>
                <th>사번</th>
                <td>
                    ${data.ERP_EMP_SEQ}
                </td>
                <th>이름</th>
                <td>
                    ${data.EMP_NAME_KR}
                </td>
            </tr>
            <tr>
                <th>주민등록번호</th>
                <td>
                    ${data.RES_REGIS_NUM}
                </td>
                <th>직원구분</th>
                <td>
                    <c:choose>
                        <c:when test="${data.TEMP_DIVISION eq 'N'}">
                            <c:choose>
                                <c:when test="${data.DIVISION eq '0'}">
                                    정규직원
                                </c:when>
                                <c:when test="${data.DIVISION eq '1' and data.DIVISION_SUB eq '6'}">
                                    위촉직원
                                </c:when>
                                <c:when test="${data.DIVISION eq '3'}">
                                    단기직원
                                </c:when>
                                <c:when test="${data.DIVISION eq '2'}">
                                    연수생/학생연구원
                                </c:when>
                                <c:when test="${data.DIVISION eq '4'}">
                                    <c:choose>
                                        <c:when test="${data.DIVISION_SUB eq '1'}">
                                            계약직원
                                        </c:when>
                                        <c:when test="${data.DIVISION_SUB eq '2'}">
                                            인턴사원
                                        </c:when>
                                        <c:when test="${data.DIVISION_SUB eq '3'}">
                                            시설/환경
                                        </c:when>
                                    </c:choose>
                                </c:when>
                                <c:when test="${data.DIVISION eq '10'}">
                                    기타
                                </c:when>
                                <c:when test="${data.DIVISION eq '9999'}">
                                    퇴사직원
                                </c:when>
                            </c:choose>
                        </c:when>
                        <c:otherwise>
                            임시직원
                        </c:otherwise>
                    </c:choose>
                </td>
            </tr>
            <tr>
                <th>부서</th>
                <td>
                    ${data.PARENT_DEPT_NAME}
                </td>
                <th>팀</th>
                <td>
                    ${data.DEPT_NAME}
                </td>
            </tr>
            <tr>
                <th>직책</th>
                <td>
                    ${data.DUTY_NAME}
                </td>
                <th>직급</th>
                <td>
                    ${data.POSITION_NAME}
                </td>
            </tr>
            <tr>
                <th>등급</th>
                <td>
                    ${data.GRADE_NAME}
                </td>
                <th>입사일</th>
                <td>
                    ${data.JOIN_DAY}
                </td>
            </tr>
            </thead>
        </table>
    </div>
    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="6%">
                <col width="3%">
            </colgroup>
            <thead>
            <tr>
                <th colspan="2">기본급여 적용기간</th>
                <th colspan="4">기본급여</th>
                <th rowspan="2">적용요율</th>
                <th rowspan="2">국민연금</th>
                <th rowspan="2">건강보험</th>
                <th rowspan="2">장기요양보험</th>
                <th rowspan="2">고용보험</th>
                <th rowspan="2">산재보험</th>
                <th rowspan="2">사대보험<br>사업자부담분</th>
                <th rowspan="2">퇴직금<br>추계액</th>
                <th rowspan="2">기준급여</th>
                <th rowspan="2">기능</th>
            </tr>
            <tr>
                <th>시작일</th>
                <th>종료일</th>
                <th>기본급</th>
                <th>식대</th>
                <th>수당</th>
                <th>상여</th>
            </tr>
            </thead>
            <tbody id="userPayMngBody">
                <tr id="tr">
                    <td><input type="text" style="font-size: 11px;" id="startDt" name="startDt" /></td>
                    <td><input type="text" style="font-size: 11px" id="endDt" name="endDt" /></td>
                    <td><input type="text" style="text-align: right;font-size: 11px" id="basicSalary" name="basicSalary" value="0" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" style="text-align: right;font-size: 11px" id="foodPay" name="foodPay" value="0" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" style="text-align: right;font-size: 11px" id="extraPay" name="extraPay" value="0" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" style="text-align: right;font-size: 11px" id="bonus" name="bonus" value="0" onkeyup="popUserPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" style="font-size: 11px" id="socialRateSn" name="socialRateSn" /></td>
                    <td><input type="text" disabled style="text-align: right;font-size: 11px" id="nationalPay" name="nationalPay" /></td>
                    <td><input type="text" disabled style="text-align: right;font-size: 11px" id="healthPay" name="healthPay" /></td>
                    <td><input type="text" disabled style="text-align: right;font-size: 11px" id="longCarePay" name="longCarePay" /></td>
                    <td><input type="text" disabled style="text-align: right;font-size: 11px" id="employPay" name="employPay" /></td>
                    <td><input type="text" disabled style="text-align: right;font-size: 11px" id="accPay" name="accPay" /></td>
                    <td><input type="text" style="text-align: right;font-size: 11px" id="busnPay" name="busnPay" /></td>
                    <td><input type="text" style="text-align: right;font-size: 11px" id="retirePay" name="retirePay" /></td>
                    <td><input type="text" disabled style="text-align: right;font-size: 11px" id="bsPay" name="bsPay" /></td>
                    <td style="text-align: center;">
                        <button type="button" class="k-button k-button-solid-info" onclick="popUserPay.fn_save(this)">저장</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<script>
    popUserPay.fn_defaultScript();


</script>
</body>
