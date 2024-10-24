<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lectureTeam.js?v=${today}'/>"></script>

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
<input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="pjtUnitSn" value="${params.pjtUnitSn}"/>
<input type="hidden" id="busnClass" value="${params.busnClass}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    단위사업
                    <c:if test="${params.stat != 'v'}">
                        작성
                    </c:if>
                </span>
            </h3>
            <div id="lectureTeamBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <button type="button" class="k-button k-button-solid-primary" id="modBtn" style="display: none" onclick="lectureTeam.fn_saveBtn();">수정</button>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="lectureTeam.fn_saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업구분</th>
                    <td colspan="3">
                        <input id="projectType" style="width: 370px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업명</th>
                    <td colspan="3">
                        <input id="lectureName" style="width: 95%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업기간</th>
                    <td colspan="3">
                        <input id="unitBusnStrDt" style="width: 20%;">
                        ~
                        <input id="unitBusnEndDt" style="width: 20%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">사업목적</th>
                    <td colspan="3">
                        <textarea id="unitObj" style="width: 95%; height: 100px"></textarea>
                    </td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="50%">
                    <col width="30%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>연번</th>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>업체명</th>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>금액</th>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>추가</th>
                </tr>
                </thead>
                <tbody id="unitBusnBody" style="text-align: center">

                </tbody>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    lectureTeam.fn_defaultScript();
</script>
</body>
</html>