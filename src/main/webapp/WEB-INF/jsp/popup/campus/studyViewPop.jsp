<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/campus/study/studyViewPop.js?v=${today}"></script>
<style>
    .barFixed {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
    }

</style>
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
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="status" value="${data.STATUS}"/>
<input type="hidden" id="studyResultSn" value="${resultData.STUDY_RESULT_SN}" />
<input type="hidden" id="addStatus" value="${data.ADD_STATUS}"/>
<input type="hidden" id="typeView" value="${params.typeView}" />

<form id="studyDraftFrm" method="post">
    <input type="hidden" id="studyInfoSn" name="studyInfoSn" value="${params.pk}" />
    <input type="hidden" id="menuCd" name="menuCd" value="study">
    <input type="hidden" id="studyType" name="studyType" value="study">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div class="col-lg-12" style="padding:0;">
<div class="card-header pop-header barFixed">
    <h3 class="card-title title_NM">
                <span id="studyTitle">
                    학습조 신청서 조회
                </span>
    </h3>
    <div id="studyBtn" class="btn-st popButton">
    </div>
</div>
<div class="table-responsive" style="padding-top: 40px;">

    <table class="table table-bordered mt20" id="studyReqTable">
        <colgroup>
            <col width="260px">
            <col width="740px">
        </colgroup>
        <thead>
        <tr>
            <th>학습조명</th>
            <td>
                ${data.STUDY_NAME}
            </td>
        </tr>
        <tr>
            <th>학습기간</th>
            <td>
                ${data.START_DT} ~ ${data.END_DT}
            </td>
        </tr>
        <tr>
            <th>학습장소</th>
            <td>
                ${data.STUDY_LOCATION}
            </td>
        </tr>
        <tr>
            <th>학습목표</th>
            <td>
                ${data.STUDY_OBJECT}
            </td>
        </tr>
        <tr>
            <th>학습내용</th>
            <td>
                ${data.STUDY_CONTENT}
            </td>
        </tr>
        <tr>
            <th>소요비용</th>
            <td>
                <fmt:formatNumber value="${data.STUDY_MONEY }" pattern="#,###" /> 원
            </td>
        </tr>
        <tr>
            <th>산출내역</th>
            <td>
                ${data.STUDY_MONEY_VAL}
            </td>
        </tr>
        <tr>
            <th>첨부서류</th>
            <td id="attachTr">

            </td>
        </tr>
        <tr>
            <th>신청날짜</th>
            <td>
                ${data.REG_DT}
            </td>
        </tr>
        <tr style="display:none;">
            <th>결과보고서</th>
            <td id="resultDoc">

            </td>
        </tr>
        <tr>
            <th>상태</th>
            <td>
                <c:choose>
                    <c:when test="${data.STATUS eq '0'}">
                        신청서 작성중
                    </c:when>
                    <c:when test="${data.STATUS eq '10'}">
                        신청서 승인요청중
                    </c:when>
                    <c:when test="${data.STATUS eq '100'}">
                        <c:if test="${data.ADD_STATUS eq 'Y' or data.ADD_STATUS eq 'C'}">
                            학습 완료
                        </c:if>
                        <c:if test="${data.ADD_STATUS eq 'N' }">
                            학습 진행중
                        </c:if>
                        <c:if test="${data.ADD_STATUS eq 'S' }">
                            이수완료
                        </c:if>
                    </c:when>
                    <c:when test="${data.STATUS eq '110'}">
                        <c:if test="${data.ADD_STATUS eq 'Y' or data.ADD_STATUS eq 'C'}">
                            학습 완료
                        </c:if>
                        <c:if test="${data.ADD_STATUS eq 'N' }">
                            학습 진행중
                        </c:if>
                        <c:if test="${data.ADD_STATUS eq 'S' }">
                            이수완료
                        </c:if>
                    </c:when>
                </c:choose>
            </td>
        </tr>
    </table>
</div>

<%--<div class="btn-st" style="margin-top:10px; text-align:center;">
    <input type="button" id="studyModBtn" style="display: none" class="k-button k-button-solid-primary" value="수정" onclick="studyView.studyUpdatePop();"/>
    <input type="button" id="studyReqBtn" style="display: none" class="k-button k-button-solid-info" value="승인요청" onclick="studyView.studyReq(10);"/>
    <input type="button" id="studyCancelBtn" style="display: none" class="k-button k-button-solid-info" value="승인요청취소" onclick="studyView.studyReq(0);"/>
    <input type="button" id="studyAppBtn" style="display: none" class="k-button k-button-solid-info" value="승인" onclick="studyView.studyReq(100);"/>
    <input type="button" id="studyComBtn" style="display: none" class="k-button k-button-solid-error" value="반려" onclick="studyView.studyReq(30);"/>
</div>--%>

<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="">
                    학습자
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
    <form id="studyReqForm">
        <table class="table table-bordered mt20" id="studyUserTable">
        </table>
    </form>
</div>

<c:if test="${data.STATUS eq '100' || data.STATUS eq '101'}">
    <c:if test="${params.typeView ne 'A'}">
        <div class="table-responsive" style="margin-top: 15px;">
            <div class="card-header pop-header" style="margin-bottom: 15px;">
                <h3 class="card-title title_NM">
                        <span style="">
                            학습일지
                        </span>
                </h3>
                <div class="btn-st popButton">

                </div>
            </div>
            <div id="mainGrid" style=""></div>
        </div>
    </c:if>
</c:if>
</div>
<script>
    studyView.init();

    $(function (){
        if($("#mode").val() == "mng"){
            if($("#addStatus").val() == "C"){
                $("#resultBtn").css("display", "");
            }/*else{
                $("#resultBtn").css("display", "none");
            }*/
        }
    });
</script>
</body>
