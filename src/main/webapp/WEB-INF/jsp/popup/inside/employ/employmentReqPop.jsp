<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/employmentRegPop.js?v=1"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">연봉근로계약서 작성</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="employmentRegPop.setEmploymentContract();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="">
                    <col width="10%">
                    <col width="">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="7" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        직원정보
                    </th>
                </tr>
                <tr>
                    <th>성명</th>
                    <td>
                        <input type="hidden" id="empSeq" name="empSeq">
                        <input type="hidden" id="deptSeq" name="deptSeq" >
                        <input type="text" id="empName" value="" style="width: 74%;" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" onclick="userSearch();" readonly>
                        <button type="button" class="k-button k-button-solid-base" id="addMemberBtn" onclick="userSearch();">조회</button>
                    </td>
                    <th>근무부서</th>
                    <td>
                        <input type="text" id="deptName" name="deptName" value="" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" onclick="userSearch();" readonly>
                    </td>
                    <th>직위</th>
                    <td>
                        <input type="text" id="positionName" name="positionName" value="" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" onclick="userSearch();" readonly>
                    </td>
                </tr>
                </thead>
            </table>

            <div>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="25%">
                        <col width="">
                        <col width="">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                            연봉근로계약정보
                        </th>
                    </tr>
                    <tr>
                        <th>연봉근로계약서 작성일</th>
                        <td colspan="3">
                            <input type="text" id="regDt" name="regDt" style="width: 20%" >
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">구분</th>
                        <th class="text-center th-color">금액</th>
                        <th class="text-center th-color">비고</th>
                    </tr>
                    <tr>
                        <th class="text-center th-color">전년도 연봉월액①</th>
                        <td>
                            <input type="text" id="bySalary" name="bySalary" style="width: 95%; text-align: right;"> 원
                        </td>
                        <th rowspan="4" class="text-center">
                            12개월 기준
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center th-color">금년도 월 인상액②</th>
                        <td>
                            <input type="text" id="nyRaiseSalary" name="nyRaiseSalary" style="width: 95%; text-align: right;"> 원
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">금년도 연봉월액③=①+②</th>
                        <td>
                            <input type="text" id="nySalary" name="nySalary" style="width: 95%; text-align: right;" disabled> 원
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">금년도 결정 연봉액④=③×12</th>
                        <td>
                            <input type="text" id="nyDecisionSalary" name="nyDecisionSalary" style="width: 95%; text-align: right;" disabled> 원
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<script>
    employmentRegPop.init();

    function userSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }
</script>
</body>
