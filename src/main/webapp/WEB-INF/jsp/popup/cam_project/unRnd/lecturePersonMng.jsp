<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePersonMng.js?v=${today}'/>"></script>

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
<input type="hidden" id="personSn" value="${params.personSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;">수강자 등록</span></h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-info" onclick="lecturePersonMng.fn_save()">저장</button>
        </div>

        <div class="col-md-12 col-sm-12" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th><span class="red-star">*</span>아이디</th>
                    <td><input id="id" style="width: 150px; margin-right: 5px"><button type="button"  class="k-button k-button-solid-base" disabled onclick=""><span>중복체크</span></button></td>
                    <th><span class="red-star">*</span>비밀번호</th>
                    <td><input type="password" id="pwd" style="width: 150px"></td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>이름</th>
                    <td><input id="name" style="width: 150px"></td>
                    <th>생년월일/성별</th>
                    <td style="display: flex">
                        <input id="birth" style="width: 150px; margin-right: 15px">
                        <span id="gender"></span>
                    </td>
                </tr>
                <tr>
                    <th>회사명</th>
                    <td>
                        <input id="coName" style="width: 150px">
                    </td>
                    <th>부서</th>
                    <td>
                        <input id="part" style="width: 150px">
                    </td>
                </tr>
                <tr>
                    <th>직책</th>
                    <td>
                        <input id="place" style="width: 150px">
                    </td>
                    <th>전화번호</th>
                    <td>
                        <input id="telNum" style="width: 150px">
                    </td>
                </tr>
                <tr>
                    <th>휴대폰번호</th>
                    <td>
                        <input id="hpNum" style="width: 150px">
                    </td>
                    <th>휴대폰번호</th>
                    <td>
                        <input id="faxNum" style="width: 150px">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    lecturePersonMng.fn_defaultScript();
</script>
</body>
</html>