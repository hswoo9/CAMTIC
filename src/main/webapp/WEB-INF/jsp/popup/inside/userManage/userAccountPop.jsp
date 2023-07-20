<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userAccountPop.js?v=${today}"/></script>
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
<input type="hidden" id="carReqSn" value="${carReqSn}"/>
<html>
<body class="font-opensans" style="background-color:#fff;">
<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">직원 계좌정보</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="userAccountPop.userAccountSave()">저장</button>
            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">취소</button>
        </div>
    </div>
    <div style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>직원명
                </th>
                <td>
                    ${uprinfList.EMP_NAME_KR} ${uprinfList.POSITION_NAME}
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>은행명
                </th>
                <td>
                    <input type="text" id="bankName" style="width: 100%;" value="${uprinfList.BANK_NAME}">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>계좌번호
                </th>
                <td>
                    <input type="text" id="accountNum" style="width: 100%;" value="${uprinfList.ACCOUNT_NUM}">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>예금주
                </th>
                <td>
                    <input type="text" id="accountHolder" style="width: 100%;" value="${uprinfList.ACCOUNT_HOLDER}">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>카드번호
                </th>
                <td>
                    <input type="text" id="cardNum" style="width: 100%;" disabled/>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>더존Code
                </th>
                <td>
                    <input type="text" id="dozonCode" style="width: 100%;" disabled/>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
</div>

<script>
    userAccountPop.defaultScript();
</script>
</body>
</html>