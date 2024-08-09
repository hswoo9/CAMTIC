<%--
  Created by IntelliJ IDEA.
  User: deer
  Date: 2023-08-30
  Time: 오후 3:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/camtic/application/applicationForm2.js?v=${today}"></script>
<style>
    .__inp {
        padding-left: 5px;
        display: inline-block;
        width: 100%;
        height: 40px;
        border: 1px solid #ddd;
        font-size: 14px;
    }
</style>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12 pop_sign_wrap" style="width:1600px; padding:0;">
    <input type="hidden" id="recruitInfoSn" name="recruitInfoSn" value="${recruitInfoSn}">
    <input type="hidden" id="applicationId" name="applicationId" value="${params.applicationId}">
    <input type="hidden" id="userEmail" name="userEmail" value="${userEmail}">
    <input type="hidden" id="recruitAreaInfoSn" name="recruitAreaInfoSn" value="${params.recruitAreaInfoSn}">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">입사지원 수정</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="applicationForm2.setApplicationPrev()"><span>이전단계</span></button>
            <button type="button" class="k-button k-button-solid-primary" onclick="applicationForm2.setApplicationTempSave()"><span>수정</span></button>
            <button type="button" class="k-button k-button-solid-info" onclick="applicationForm2.setApplicationNext()"><span>다음단계</span></button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()"><span>닫기</span></button>
        </div>
    </div>
    <div style="padding: 20px">
        <table class="popTable table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
            <colgroup>
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th>
                    지원분야
                </th>
                <td>
                    <span id="recruitAreaInfoSnTxt"></span>
                </td>
            </tr>
            </thead>
        </table>
        <div style="width:1545px;">
            <div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px;">
                <button type="button"  class="k-button k-button-solid-info" onclick="applicationForm2.addSchoolRow()"><span>추가</span></button>
            </div>
            <table class="popTable table table-bordered mb-0 mt10 text-center">
                <thead>
                <tr>
                    <th colspan="10" style="font-size: 14px; font-weight: 600; background-color: #00397f96; color: #fff;">
                        학력사항
                    </th>
                </tr>
                <tr>
                    <th>구분</th>
                    <th width="290px">기간</th>
                    <th>학교명</th>
                    <th>학과</th>
                    <th>전공</th>
                    <th>졸업</th>
                    <th>평점</th>
                    <th width="205px">학위 증빙</th>
                    <th width="205px">성적 증빙</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="schoolTb">
                <tr class="schoolInfo" id="school0">
                    <td>
                        <input type="hidden" id="schoolBaseId0" name="schoolBaseId0" class="schoolBaseId">
                        <select id="schoolType" class="__inp schoolType" onchange="applicationForm2.schoolTypeChange(this)">
                            <option value="">선택</option>
                            <option value="1">고등학교</option>
                            <option value="2">전문대학</option>
                            <option value="3">대학교1</option>
                            <option value="4">대학교2</option>
                            <option value="5">대학원(석사)</option>
                            <option value="6">대학원(박사)</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" id="admissionDt0" class="admissionDt" name="admissionDt" style="width: 45%"> ~
                        <input type="text" id="graduationDt0" class="graduationDt" name="graduationDt" style="width: 45%">
                    </td>
                    <td>
                        <input type="text" id="schoolName0" class="__inp schoolName" style="width: 100px;">
                    </td>
                    <td>
                        <input type="text" id="dept0" class="__inp dept" style="width: 100px;">
                    </td>
                    <td>
                        <input type="text" id="major0" class="__inp major" style="width: 110px;">
                    </td>
                    <td>
                        <select id="graduateType0" class="__inp graduateType">
                            <option value="">선택</option>
                            <option value="1">졸업</option>
                            <option value="2">졸업예정</option>
                            <option value="3">수료</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" id="grade0" class="__inp grade" style="width: 50px">
                    </td>
                    <td>
                        <input type="hidden" id="degreeFileNo0" class="degreeFileNo" name="degreeFileNo0">
                        <input type="text" id="degreeFileName0" class="degreeFileName" style="width: 100px;" disabled>
                        <label for="degreeFile0" class="degreeFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                        <input type="file" id="degreeFile0" name="degreeFile0" class="degreeFile" style="display: none" onchange="applicationForm2.getFileName(this)">
                    </td>
                    <td>
                        <input type="hidden" id="sexualFileNo0" class="sexualFileNo" name="sexualFileNo0">
                        <input type="text" id="sexualFileName0" class="sexualFileName" style="width: 100px;" disabled>
                        <label for="sexualFile0" class="sexualFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                        <input type="file" id="sexualFile0" class="sexualFile" name="sexualFile0" style="display: none" onchange="applicationForm2.getFileName(this)">
                    </td>
                    <td>
                        <button type="button" class="k-button k-button-solid-error" onClick="applicationForm2.delRow('schoolInfo', this)"><span>삭제</span></button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div id="careerDiv" style="width:1545px;">
            <div class="__btWrap rig __mt10" style="text-align: right; margin-right: 10px; margin-top: 10px;">
                <button type="button"  class="k-button k-button-solid-info" onclick="applicationForm2.addCareerRow()"><span>추가</span></button>
            </div>
            <table  class="popTable table table-bordered mb-0 mt10 text-center" id="careerInfo0">
                <thead>
                <tr>
                    <th colspan="8" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        경력사항
                    </th>
                </tr>
                <tr>
                    <th>근무처</th>
                    <th width="290px">근무기간</th>
                    <th>직위</th>
                    <th>담당업무</th>
                    <th>퇴직시연봉</th>
                    <th>퇴직사유</th>
                    <th width="205px">경력 증빙</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="careerTb">
                <tr class="careerInfo" id="career0">
                    <td>
                        <input type="hidden" id="careerBaseId0" name="careerBaseId0" class="careerBaseId">
                        <input type="text" id="careerOrgName0" class="__inp careerOrgName">
                    </td>
                    <td>
                        <input type="text" id="workStDt0" class="workStDt period" name="workStDt" style="width: 45%"> ~
                        <input type="text" id="workEnDt0" class="workEnDt period" name="workEnDt" style="width: 45%">
                    </td>
                    <td>
                        <input type="text" id="position0" class="__inp position">
                    </td>
                    <td>
                        <input type="text" id="chargeWork0" class="__inp chargeWork">
                    </td>
                    <td>
                        <input type="text" id="retireSalary0" class="__inp retireSalary">
                    </td>
                    <td>
                        <input type="text" id="retireReason0" class="__inp retireReason">
                    </td>
                    <td>
                        <input type="hidden" id="careerFileNo0" name="careerFileNo0" class="careerFileNo">
                        <input type="text" id="careerFileName0" class="careerFileName" style="width: 100px" disabled>
                        <label for="careerFile0" class="careerFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>
                        <input type="file" id="careerFile0" class="careerFile" name="careerFile0" style="display: none" onchange="applicationForm2.getFileName(this)">
                    </td>
                    <td>
                        <button type="button" class="k-button k-button-solid-error" onclick="applicationForm2.delRow('careerInfo', this)"><span>삭제</span></button>
                    </td>
                </tr>
                <tr id="career0_1" class="careerInfo_1">
                    <th>담당업무 세부사항</th>
                    <td colspan="7">
                        <textarea id="careerContent0" class="careerContent"  style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--
    <div style="text-align: right">
        <button class="__btn1 blue" onclick="applicationForm2.setApplicationTempSave('prev')"><span>이전단계</span></button>
        <button class="__btn1 black" onclick="applicationForm2.setApplicationTempSave('temp')"><span>임시저장</span></button>
        <button class="__btn1 blue" onclick="applicationForm2.setApplicationTempSave('next')"><span>다음단계</span></button>
        <button class="__btn1 gray" onclick="window.close()"><span>취소</span></button>
    </div>
    -->
    </div>
</div><!-- col-md-9 -->
<script>
    applicationForm2.fn_defaultScript();
</script>
</body>
