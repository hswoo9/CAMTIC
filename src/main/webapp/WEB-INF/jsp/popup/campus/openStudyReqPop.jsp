<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/openStudyReqPop.js?v=${toDate}"/></script>
<style>
    .barFixed {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
    }
</style>
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

        <div class="card-header pop-header barFixed">
            <h3 class="card-title title_NM">오픈스터디 등록</h3>
            <div class="btn-st popButton">
                <button type="button" id="stepDBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyReq.openStudyResultPop();">모임완료</button>
                <button type="button" id="stepCBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyReq.fn_openNextStep('C');">모임확정</button>
                <button type="button" id="stepNBtn" style="display: none" class="k-button k-button-solid-error" onclick="openStudyReq.fn_openNextStep('N');">모임취소</button>
                <button type="button" id="stepBBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyReq.fn_openNextStep('B');">참여자모집</button>
                <button type="button" id="stepBReqBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyReq.setOpenStudyUser();">참여신청</button>
                <button type="button" id="stepBCanBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyReq.fn_openNextStep('C');">신청취소</button>

                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="openStudyReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
    <div class="table-responsive" style="margin-top: 40px;">
        <form id="table-responsive" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>모임명
                    </th>
                    <td>
                        <input id="openStudyName" type="text" style="width: 700px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>일시
                    </th>
                    <td>
                        <input id="openStudyDt" type="text" style="width: 20%"> <input type="text" id="startTime" style="width: 15%"> ~ <input type="text" id="endTime" style="width: 15%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>진행내용
                    </th>
                    <td>
                        <textarea id="openStudyDetail" style="width: 700px; height: 300px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>장소
                    </th>
                    <td>
                        <input type="text" id="openStudyLocation" style="width: 700px;">
                    </td>
                </tr>
                <tr id="stepTr" style="display: none">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>진행현황
                    </th>
                    <td id="stepTd"></td>
                </tr>
                </thead>
            </table>
        </form>
        <div id="openStudyUserDiv" class="card-header" style="padding-top:45px; display: none">
            <div class="col-lg-11" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="popupTitleSt">참여 신청자</div>
                    <form id="studyReqForm">
                        <table class="table table-bordered mt20" id="openStudyUserTable" style="width: 973px;">
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    openStudyReq.init();
</script>
</body>
</html>