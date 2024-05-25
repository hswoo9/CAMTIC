<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripFuelCostReqPop.js?v=${toDate}"/></script>
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
<input type="hidden" id="hrFuelCostInfoSn" value="${params.key}"/>
<div class="col-lg-11" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">출장 기준유가 등록</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="fuelCostReq.saveBtn()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
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
                    <span class="red-star"></span>기준일
                </th>
                <td>
                    <input type="text" name="startDt" id="startDt" style="width: 120px;">
                    <span id="endDtWrap" style="display: none;"> ~
                        <input type="text" name="endDt" id="endDt" style="width: 120px;">
                        <input type="hidden" id="endDtChk" value="N">
                    </span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>기준거리
                </th>
                <td>
                    <input type="text" id="distance" oninput="inputNumberFormat(this)" style="width: 80px;"> Km
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>적용금액
                </th>
                <td>
                    <input type="text" id="costAmt" oninput="inputNumberFormat(this)" style="width: 120px;"> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>적용 프로젝트
                </th>
                <td>
                    <input id="project" style="width: 80%;" value="전체" readonly>
                    <input type="hidden" id="projectCd" value="0">
                    <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="fuelCostReq.fn_projectPop('bustripFuel')">검색</button>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>

<script>
    fuelCostReq.init();
</script>
</body>
</html>