<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/commonEduReqPop.js?v=${toDate}"/></script>
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
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">공통학습 등록</h3>
            <div class="btn-st popButton">
                <button type="button" id="allBtn" style="display: none" class="k-button k-button-solid-info" onclick="commonEduReq.addUserAllBtn();">전직원 추가</button>
                <button type="button" id="userMngBtn" style="display: none" class="k-button k-button-solid-info" onclick="commonEduReq.commonEduUserListPop();">학습참여 관리</button>
                <button type="button" id="selBtn" style="display: none" class="k-button k-button-solid-info" onclick="commonEduReq.commonEduUserAddPop();">선택직원 추가</button>
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="commonEduReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습구분
                    </th>
                    <td>
                        <input id="commonClass" type="text" style="width: 200px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습기간
                    </th>
                    <td>
                        <input id="startDt" type="text" style="width: 40%"> ~ <input id="endDt" type="text" style="width: 40%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습명
                    </th>
                    <td colspan="3">
                        <input type="text" id="eduName" style="width: 726px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습시간
                    </th>
                    <td>
                        <input type="text" id="eduTime" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 200px;">시간
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습장소
                    </th>
                    <td>
                        <input id="eduLocation" type="text" style="width: 257px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습목적
                    </th>
                    <td colspan="3">
                        <textarea id="eduTitle" style="width: 726px; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>학습내용
                    </th>
                    <td colspan="3">
                        <textarea id="eduDetail" style="width: 726px; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        진행상태
                    </th>
                    <td colspan="3">
                        <input type="text" id="status" style="width: 200px;">
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>

<script>
    commonEduReq.init();
</script>
</body>
</html>