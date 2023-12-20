<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/project.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/setTeamProject.js?v=${today}'/>"></script>
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

<input type="hidden" id="pjtSn" value="${params.pjtSn}">
<input type="hidden" id="teamVersionSn" value="${params.teamVersionSn}">

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">프로젝트 협업승인</span></h3>

            <div class="btn-st popButton" style="font-size: 13px">
                <button type="button" id="appBtn" class="k-button k-button-solid-info" onclick="setTeamPjt.fn_approve(100)">협업승인</button>
                <button type="button" id="canBtn" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding : 10px">
            <table class="popTable table table-bordered mb-0" id="mainTable">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4">
                        코드정보
                    </th>
                </tr>
                <tr>
                    <th>프로젝트 코드</th>
                    <td id="pjtCd"></td>
                    <th>사업구분</th>
                    <td id="busnName"></td>
                </tr>
                <tr>
                    <th>지원부처</th>
                    <td id="supDepName"></td>
                    <th>전담기관</th>
                    <td id="supDepSubName"></td>
                </tr>
                <tr>
                    <th>사업성격</th>
                    <td id="pjtStatName"></td>
                    <th>사업성격2</th>
                    <td id="pjtStatSubName"></td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0" style="margin-top: 15px;" id="mainTable2">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4">
                        프로젝트 정보
                    </th>
                </tr>
                <tr>
                    <th>프로젝트 명</th>
                    <td colspan="3" id="pjtNm"></td>
                </tr>
                <tr>
                    <th>프로젝트 시작</th>
                    <td id="strDt"></td>
                    <th>프로젝트 종료</th>
                    <td id="endDt"></td>
                </tr>
                <tr>
                    <th>담당자</th>
                    <td colspan="3" id="pmNm"></td>
                </tr>
                <tr>
                    <th>시스템</th>
                    <td colspan="3" id="url"></td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0" style="margin-top: 15px;" id="mainTable2">
                <colgroup>
                    <col width="5%">
                    <col width="21%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="7%">
                    <col width="10%">
                    <col width="7%">
                    <col width="5%">
                    <col width="5%">
                </colgroup>
                <thead id="detailRow">
                <tr>
                    <th colspan="11">
                        협업 정보
                    </th>
                </tr>
                <tr>
                    <th>구분</th>
                    <th>팀</th>
                    <th>담당자(PM)</th>
                    <th>총예산</th>
                    <th>배분금액(매출)</th>
                    <th>배분비율</th>
                    <th>예상비용</th>
                    <th>예상수익</th>
                    <th>PM</th>
                    <th>팀장</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<div id="dialog"></div>

<script>
    setTeamPjt.fn_defaultScript();
</script>
</body>
</html>