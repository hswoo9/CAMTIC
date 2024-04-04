<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/recruit/applicationReg.js?v=${today}"></script>
<input type="hidden" id="applicationId" value="${params.applicationId}"/>
<input type="hidden" id="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">인사정보 등록</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" style= "margin-right:5px;" onclick="applicationReg.userSave()"><span>인사정보 등록</span></button>
            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
        </div>
    </div>
    <div id="mainGrid" style="padding: 20px;">
        <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <colgroup>
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    성명
                </th>
                <td>
                    ${applicationInfo.USER_NAME}
                </td>
            </tr>
            <tr>
                <th>
                    부서
                </th>
                <td>
                    <input type="hidden" id="deptSeq" value="${recruitArea.DEPT_SEQ}">
                    <input type="hidden" id="teamSeq" value="${recruitArea.TEAM_SEQ}">
                    <input type="hidden" id="deptName" value="${recruitArea.DEPT_NAME}">
                    <input type="hidden" id="teamName" value="${recruitArea.TEAM_NAME}">
                    ${recruitArea.DEPT_NAME} ${recruitArea.TEAM_NAME}
                </td>
            </tr>
            </thead>
        </table>

        <table class="popTable table table-bordered mb-0 mt10" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <input type="hidden" id="graduateType" value="${applicationInfo.school[applicationInfo.school.size() - 1].GRADUATE_TYPE}">
            <input type="hidden" id="schoolType" value="${applicationInfo.school[applicationInfo.school.size() - 1].SCHOOL_TYPE}">
            <input type="hidden" id="job" value="${applicationInfo.JOB}">
            <colgroup>
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    아이디
                </th>
                <td>
                    <input type="text" id="loginId" name="loginId" style="width: 50%;">
                </td>
            </tr>
            <tr>
                <th>
                    주민등록번호
                </th>
                <td>
                    <input type="hidden" id="bDay" value="${applicationInfo.BDAY}">
                    <input type="hidden" id="gender" value="${applicationInfo.GENDER}">
                    <input type="text" id="resRegisNum1" name="resRegisNum1" style="width:100px" maxlength="6">
                    -
                    <input type="text" id="resRegisNum2" name="resRegisNum2" style="width:100px; margin-left: 5px">
                </td>
            </tr>
            <tr>
                <th>
                    직원구분
                </th>
                <td>
                    <input type="radio" class="divis" name="employeeType" division="0" id="dsA" checked>
                    <label for="dsA">정규직원</label>
                    <input type="radio" style="margin-left: 10px;" class="divis" name="employeeType" division="4" divisionSub="1" id="dsB">
                    <label for="dsB">계약직원</label>
                    <input type="radio"  style="margin-left: 10px;" class="divis" name="employeeType" division="4" divisionSub="2" id="dsC">
                    <label for="dsC">인턴사원</label>
                </td>
            </tr>
            <tr>
                <th>
                    직급/등급
                </th>
                <td>
                    <input type="text" id="position" style="width: 50%;">
                </td>
            </tr>
            <tr>
                <th>
                    직책
                </th>
                <td>
                    <input type="text" id="duty" style="width: 50%;">
                </td>
            </tr>
            <tr>
                <th>
                    직군
                </th>
                <td>
                    <input type="text" id="occupationCode" style="width: 50%;">
                </td>
            </tr>
            <tr>
                <th>
                    입사일자
                </th>
                <td>
                    <input type="text" id="joinDay" style="width: 50%;">
                </td>
            </tr>
            <tr>
                <th>
                    전직경력
                </th>
                <td>
                <c:choose>
                <c:when test="${not empty applicationInfo.career}">
                    <input type="text" id="beforCareer" name="beforCareer" style="width:80px"> 개월
                </c:when>
                <c:otherwise>
                    <input type="text" id="beforCareer" name="beforCareer" style="width:80px" value="0"> 개월
                </c:otherwise>
                </c:choose>
                </td>
            </tr>

            <tr>
                <th>
                    증명사진 이미지 다운로드
                </th>
                <td>
                    <c:choose>
                        <c:when test="${not empty applicationInfo.photoFile}">
                            <img src="/images/ico/file.gif" onclick="fileDown('${applicationInfo.photoFile.file_path}${applicationInfo.photoFile.file_uuid}', '${applicationInfo.photoFile.file_org_name}.${applicationInfo.photoFile.file_ext}', 'recruit')">
                        </c:when>
                        <c:otherwise>
                            이미지 파일 없음
                        </c:otherwise>
                    </c:choose>
                </td>
            </tr>
            </thead>
        </table>
    </div><!--mainGrid end-->
    </div> <!--col lg 12 end-->

<script>
    applicationReg.fn_defaultScript();

</script>
</body>

