<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/carPop.js?v=${today}"/></script>
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
<input type="hidden" id="mode" name="mode" value="${params.mode}">
<form id="carDraftFrm" method="post">
    <input type="hidden" id="carReqSn" name="carReqSn" value="${params.carReqSn}"/>
    <input type="hidden" id="menuCd" name="menuCd" value="car">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>
<html>
<body class="font-opensans" style="background-color:#fff;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">차량 사용 신청</h3>
            <div id="carBtn" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="carReq.saveBtn();">저장</button>
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
                <%--<tr>
                    <th colspan="4">차량 사용 신청</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>운행 일시
                    </th>
                    <td>
                        <input id="startDt" style="width: 20%;" value="${params.startDt}">
                        <input id="startTime" style="width: 20%;">
                        ~<input id="endDt" style="width: 20%;">
                        <input id="endTime" style="width: 20%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사용 부서
                    </th>
                    <td>
                        <input type="text" id="dept" style="width: 40%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사용 차량
                    </th>
                    <td>
                        <input type="text" id="carClass" style="width: 40%;">
                        <span id="inputWrap" style="display: none;"><input type="text" id="carClassRmk" style="width: 40%;"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>운행 구분
                    </th>
                    <td>
                        <input type="text" id="carType" style="width: 40%;"/>
                        <span id="hrBizText" style="display: none;">(출장신청차량)</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>운행 목적
                    </th>
                    <td>
                        <input type="text" id="carTitle" style="width: 100%;"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>목적지
                    </th>
                    <td>
                        <input type="text" id="visit" style="width: 100%;"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>경유지
                    </th>
                    <td>
                        <input type="text" id="waypoint" style="width: 100%;"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>운행자
                    </th>
                    <td>
                        <input type="text" id="empName" style="width: 65%;">
                        <input type="hidden" id="empSeq">
                        <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px;" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                <tr class="varTR" style="display:none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>긴급 연락처
                    </th>
                    <td>성명 : <input type="text" id="emergencyName" style="width: 20%;"/>
                        연락처 : <input type="text" id="emergencyTel" style="width: 30%;"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>신청 일자
                    </th>
                    <td><input id="applyDt" style="width: 20%;"/></td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    carReq.init();
</script>
</body>
</html>