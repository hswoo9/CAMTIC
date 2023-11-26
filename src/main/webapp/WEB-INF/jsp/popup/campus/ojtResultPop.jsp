<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/campus/ojtResultPop.js?v=${toDate}"></script>
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
<input type="hidden" id="studyJournalSn" value="${params.studyJournalSn}"/>
<input type="hidden" id="mode" value=""/>
<input type="hidden" id="suerSelType" value="0">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">OJT 학습일지 작성</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="ojtResult.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div class="card-header" style="padding-top:15px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="popupTitleSt">OJT 학습일지</div>
                    <form id="studyJournalForm">
                        <table class="table table-bordered mt20" id="studyJournalTable" style="width: 1000px;">
                            <colgroup>
                                <col width="20%">
                                <col width="80%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>지도일시</th>
                                <td>
                                    <input type="text" id="ojtDt" style="width: 150px"> <input type="text" id="startTime" style="width: 100px"> ~ <input type="text" id="endTime" style="width: 100px">
                                </td>
                            </tr>
                            <tr>
                                <th>지 도 자</th>
                                <td>
                                    <input type="text" id="readerUserName" style="width: 600px">
                                    <input type="hidden" id="readerUserSeq">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="지도자 선택" onclick="$('#suerSelType').val('2'); fn_userMultiSelectPop()"/>
                                </td>
                            </tr>
                            <tr>
                                <th>학 습 자</th>
                                <td>
                                    <input type="text" id="studyUserName" style="width: 600px">
                                    <input type="hidden" id="studyUserSeq">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="학습자 선택" onclick="$('#suerSelType').val('1'); fn_userMultiSelectPop()"/>
                                </td>
                            </tr>
                            <tr>
                                <th>지도장소</th>
                                <td>
                                    <input type="text" id="location" style="width: 800px">
                                </td>
                            </tr>
                            <tr>
                                <th>내용저장 방법</th>
                                <td>
                                    <input type="text" id="saveType" style="width: 800px">
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    ojtResult.init();
</script>
</body>
