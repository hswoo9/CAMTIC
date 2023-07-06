<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-ocean-blue.min.css" />
<link rel="stylesheet" href="/css/style.css">

<style>
    .likeTab{display: flex; list-style: none; margin-top:30px; padding-left: 0;}
    .likeTab li{padding: 5px 18px; border-radius: 5px 5px 0 0; background-color: #6787b0; border: 1px solid #eee; font-weight: 600; cursor: pointer; font-size:13px; color: white; width: 104px; text-align: center;}
    .k-input-md{font-size:12px;}
    .subTitSt{font-weight: 600; text-align: left; font-size: 13px; padding: 10px;}
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #00397f96; color: white;}
    .table > thead > tr > td, .table > thead > tr > th{border: 1px solid #dee2e6;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">인사기록카드</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 인사기록카드</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div id="tabstrip">
                    <ul class="likeTab">
                        <li id="TabA">인적 사항</li>
                        <li id="TabM">기본 정보</li>
                        <li id="TabB">학력 사항</li>
                        <li id="TabC">경력 사항</li>
                        <li id="TabD">병력 사항</li>
                        <li id="TabE">가족 사항</li>
                        <li id="TabF">보유 면허</li>
                        <li id="TabG">직무 사항</li>
                        <li id="TabH">발령 사항</li>
                        <li id="TabI">상벌 사항</li>
                        <li id="TabK">근무 평가</li>
                        <li id="TabJ">교육 사항</li>
                        <li id="TabL">제안 제도</li>
                    </ul>
                    <div class="empInfo">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="subTitSt">· 직원 기본 정보</div>
                            <div id="empInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="저장" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                            <input type="hidden" id="msiInfoId" name="msiInfoId" value="${data.MSI_INFO_ID}">
                            <div>
                                <table class="searchTable table table-bordered">
                                    <colgroup>
                                        <col width="15%">
                                        <col width="35%">
                                        <col width="15%">
                                        <col width="35%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>사번</th>
                                        <td>
                                            <c:choose>
                                                <c:when test="${uprList.empSeq eq null or uprList.empSeq eq ''}">
                                                    <input type="hidden" id="empSeq" name="empSeq" value="${uprList.empSeq}">
                                                    <input type="text" id="erpEmpSeq" name="erpEmpSeq" value="">
                                                    <input id="erpEmpSeq" name="erpEmpSeq">
                                                </c:when>
                                                <c:otherwise>
                                                    <input type="hidden" id="empSeq" name="empSeq" value="${uprList.empSeq}">
                                                    <input type="text" id="erpEmpSeq" name="erpEmpSeq" value="${uprList.erpEmpSeq}">
                                                    <span>${data.ERP_EMP_SEQ}</span>
                                                </c:otherwise>
                                            </c:choose>
                                        </td>
                                        <th>아이디</th>
                                        <td>
                                            <input type="text" id="loginId" name="loginId" class="userInfoTextBox" placeholder="아이디 입력" value="${uprList.loginId}" style="width: 40%;" >
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>이름</th>
                                        <td>
                                            <input type="text" id="empNameKr" name="empNameKr" class="userInfoTextBox" placeholder="(한글)" style="width: 50%" value="${uprList.empName}">
                                        </td>
                                        <th>한자</th>
                                        <td>
                                            <input type="text" id="empNameCn" name="empNameCn" class="userInfoTextBox" placeholder="(한자)" style="width: 50%" value="${uprList.empNameCn}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>생년월일</th>
                                        <td>
                                            <input type="text" id="bDay" name="bDay" class="userInfoDatePicker" value="${uprList.bDay}" style="width: 40%;">
                                        </td>
                                        <th>주민등록번호</th>
                                        <td>
                                            <input type="text" id="" name="" class="userInfoTextBox" placeholder="숫자만 입력" value="" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>[우편번호] 현주소</th>
                                        <td colspan="3">
                                            <input type="text" id="zipCode" name="zipCode" class="k-input k-textbox k-input-solid k-input-md" value="${uprList.zipCode}" style="width: 20%" placeholder="우편번호" onclick="addrSearch()" readonly>
                                            <input type="button" class="k-button-solid-info k-button" value="우편번호 찾기" onclick="addrSearch()" /><br>
                                            <input type="text" id="addr" name="addr" class="k-input k-textbox k-input-solid k-input-md" style="width: 30%;margin-top: 3px;" value="${uprList.addr}" placeholder="도로명주소" onclick="addrSearch()" readonly>
                                            <input type="text" id="oldAddr" name="oldAddr" class="k-input k-textbox k-input-solid k-input-md" style="width: 30%;margin-top: 3px;" value="${uprList.oldAddr}" placeholder="지번주소" onclick="addrSearch()" readonly><br>
                                            <span id="guide" style="color:#999;display:none"></span>
                                            <%--<input type="text" id="addrDetail" name="addrDetail" style="width: 50%;margin-top: 3px;" value="${uprList.addrDetail}" placeholder="상세주소">
                                            <input type="text" id="addrReferences" name="addrReferences" style="width: 10%;margin-top: 3px;" value="${uprList.addrReferences}" placeholder="참고항목">--%>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>
                                            <input type="text" id="officeTelNum" name="officeTelNum" placeholder="숫자만 입력" value="${uprList.officeTelNum}" style="width: 50%;">
                                        </td>
                                        <th>긴급 연락처</th>
                                        <td>
                                            <input type="text" id="mobileTelNum" name="mobileTelNum" placeholder="숫자만 입력" value="${uprList.mobileTelNum}" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>차량 소유</th>
                                        <td>
                                            <input type="text" id="" name="" value="" style="width: 50%;">
                                        </td>
                                        <th>차량 번호</th>
                                        <td>
                                            <input type="text" id="" name="" value="" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>계좌정보</th>
                                        <td colspan="3">
                                            <input type="text" id="" name="" placeholder="" value="" style="width: 100%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>입사 일자</th>
                                        <td>
                                            <input type="text" id="joinDay" name="joinDay" class="userInfoDatePicker" style="width: 40%;" value="${uprList.joinDay}">
                                        </td>
                                        <th>퇴사 일자</th>
                                        <td>
                                            <input type="text" id="resignDay" name="resignDay" class="userInfoDatePicker" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>법인 근무 년수</th>
                                        <td colspan="3">
                                            <input type="text" id="" name="" placeholder="" value="" style="width: 100%;">
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="eduInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 학력 사항</div>
                            <div id="eduInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addDegreeBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="5%">
                                        <col width="10%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="5%">
                                        <col width="5%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='eduInfoChk"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>구분</th>
                                        <th>기간</th>
                                        <th>학교 및 학과</th>
                                        <th>학위</th>
                                        <th>증명서</th>
                                        <th>졸업</th>
                                        <th>성적</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${eList}" varStatus="status">
                                        <c:choose>
                                            <c:when test="${l.EDUCATIONAL_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox eduCheckBox' onclick=''></td>
                                                    <td></td>
                                                    <td>${l.SCHOOL_NAME}</td>
                                                    <td>${l.ADMISSION_DAY}~${l.GRADUATION_DAY}</td>
                                                    <td>${l.SCHOOL_NAME}</td>
                                                    <td>${l.DEGREE_CODE}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>${l.RMK}</td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="careerInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 경력 사항</div>
                            <div id="careerInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addCareerBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="20%">
                                        <col width="15%">
                                        <col width="10%">
                                        <col width="15%">
                                        <col width="10%">
                                        <col width="8%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='careerInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>기간</th>
                                        <th>근무처</th>
                                        <th>직위 (급)</th>
                                        <th>담당업무</th>
                                        <th>근무년수</th>
                                        <th>증명서</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${cList}" varStatus="status">
                                        <c:choose>
                                            <c:when test="${l.CAREER_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                    <td></td>
                                                    <td>${l.JOIN_DAY} ~ ${l.RESIGN_DAY}</td>
                                                    <td>${l.EMPLOY_DEPT_NAME}</td>
                                                    <td>${l.POSITION_OR_DUTY}</td>
                                                    <td>${l.MAIN_TASK}</td>
                                                    <td>${l.CAREER_PERIOD}</td>
                                                    <td></td>
                                                    <td>${l.RMK}</td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="armyInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 병력 사항</div>
                            <div id="armyInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addMilitaryBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table">
                                    <colgroup>
                                        <col width="15%">
                                        <col width="35%">
                                        <col width="15%">
                                        <col width="35%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>전역 여부</th>
                                        <td>${mList.MILITARY_SVC_TYPE}</td>
                                        <th>사유</th>
                                        <td>${mList.M_UNFUL_REASON}</td>
                                    </tr>
                                    <tr>
                                        <th>복무기간</th>
                                        <td>
                                            <c:choose>
                                                <c:when test="${mList.M_ENLIST_DAY eq null or mList.M_DISCHARGE_DAY eq null or l.ADMIN_APPROVAL eq 'N'}">
                                                </c:when>
                                                <c:otherwise>
                                                    <td>${mList.M_ENLIST_DAY}~${mList.M_DISCHARGE_DAY}</td>
                                                </c:otherwise>
                                            </c:choose>
                                        </td>
                                        <th>최종계급</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>군별</th>
                                        <td></td>
                                        <th>병과</th>
                                        <td></td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="familyInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 가족 사항</div>
                            <div id="familyInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addFamilyBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="13%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='familyInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>관계</th>
                                        <th>성명</th>
                                        <th>생년월일</th>
                                        <th>직업</th>
                                        <th>동거여부</th>
                                    </tr>
                                    <c:forEach var="l" items="${fList}">
                                        <c:choose>
                                            <c:when test="${l.FAMILY_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                    <tr>
                                                        <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                        <td></td>
                                                        <td>${l.FAMILY_CODE_NAME}</td>
                                                        <td>${l.FAMILY_NAME}</td>
                                                        <td>${l.FAMILY_BIRTH}</td>
                                                        <td>${l.FAMILY_JOB}</td>
                                                        <td>${l.INCLUDE_YN}</td>
                                                    </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="certificateInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 보유 면허</div>
                            <div id="certificateInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addLicenseBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="15%">
                                        <col width="18%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='certificateInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>종류</th>
                                        <th>취득일</th>
                                        <th>자격번호</th>
                                        <th>발급기관</th>
                                        <th>증명서</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${lList}">
                                        <c:choose>
                                            <c:when test="${l.CERTIFICATE_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                    <td></td>
                                                    <td>${l.CERTIFICATE_NAME}</td>
                                                    <td>${l.ACQUISITION_DAY}</td>
                                                    <td>${l.CERTIFICATE_NUM}</td>
                                                    <td>${l.ISSUER}</td>
                                                    <td></td>
                                                    <td>${l.RMK}</td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="dutiesInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 직무 사항</div>
                            <div id="dutiesInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addJobBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="35%">
                                        <col width="35%">
                                        <col width="23%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='dutiesInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>근무 기간</th>
                                        <th>주요 직무</th>
                                        <th>직급</th>
                                    </tr>
                                    <c:forEach var="l" items="${dList}">
                                        <c:choose>
                                            <c:when test="${l.DUTY_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                    <td></td>
                                                    <td>${l.WORK_JOIN_DAY}~${l.WORK_LEAVE_DAY}</td>
                                                    <td>${l.DUTY_DETAIL}</td>
                                                    <td>${l.POSITON_NAME}</td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 발령 사항</div>
                            <div id="orderInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addAppointingBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="45%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='orderInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>발령 구분</th>
                                        <th>발령 일자</th>
                                        <th>발령 사항</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${aList}">
                                        <c:choose>
                                            <c:when test="${l.APPOINT_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                    <td></td>
                                                    <td>${l.APPOINT_TITLE}</td>
                                                    <td>${l.APPOINT_DAY}</td>
                                                    <td>${l.APPOINT_TITLE}</td>
                                                    <td>${l.RMK}</td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="rewardpunishmentInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 상벌 사항</div>
                            <div id="rewardpunishmentInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addRewardBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="10%">
                                        <col width="15%">
                                        <col width="18%">
                                        <col width="25%">
                                        <col width="15%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='rewardpunishmentInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>내/외부</th>
                                        <th>포상 구분</th>
                                        <th>포상/징계 일자</th>
                                        <th>공적 (징계) 사항</th>
                                        <th>시행처</th>
                                        <th>증명서</th>
                                    </tr>
                                    <c:forEach var="l" items="${rList}">
                                        <c:choose>
                                            <c:when test="${l.REWORD_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>${l.REWORD_NAME}</td>
                                                    <td>${l.REWORD_DAY}</td>
                                                    <td>${l.REWORD_REASON}</td>
                                                    <td>${l.REWORD_AGENCY_NAME}</td>
                                                    <td></td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="lifelonglearningInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 평생 학습</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>직무교육</th>
                                        <th>공통학습</th>
                                        <th>학습조</th>
                                        <th>전파학습</th>
                                        <th>OJT</th>
                                    </tr>
                                    <tr>
                                        <td>0건</td>
                                        <td>0건</td>
                                        <td>0건</td>
                                        <td><span style="cursor:pointer;">1건</span></td>
                                        <td>0건</td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 올해의 학습이력</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="6%">
                                        <col width="15%">
                                        <col width="24%">
                                        <col width="35%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>구분</th>
                                        <th>학습기간</th>
                                        <th>학습명</th>
                                        <th>학습장소</th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>공통교육</td>
                                        <td>23/03/28~23/03/28</td>
                                        <td>2023년 3월 캠-퍼스 공통학습(캠.화.지)</td>
                                        <td>1층 첨단누리홀</td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="workevaluationInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 근무 평가</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="6%">
                                        <col width="10%">
                                        <col width="25%">
                                        <col width="29%">
                                        <col width="15%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>평가 기간</th>
                                        <th>평점 / 등급</th>
                                        <th>구분</th>
                                        <th>평가기간</th>
                                        <th>평점 / 등급</th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="6%">
                                        <col width="10%">
                                        <col width="25%">
                                        <col width="29%">
                                        <col width="15%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>순번</th>
                                        <th>년도</th>
                                        <th>구분</th>
                                        <th>평가기간</th>
                                        <th>평점</th>
                                        <th>등급</th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>2022</td>
                                        <td>역량평가 (1차)</td>
                                        <td>2022-01-01 ~ 2022-06-30</td>
                                        <td>81.2</td>
                                        <td>A</td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="proposalInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 제안 제도</div>
                            <div id="proposalInfoBtn" class="btn-st" style="margin-top:5px; display:none;">
                                <input type="button" class="k-button k-button-solid-info" value="추가" onclick="addProposalBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="6%">
                                        <col width="28%">
                                        <col width="20%">
                                        <col width="25%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='' id='proposalInfo"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick=''></th>
                                        <th>번호</th>
                                        <th>구분</th>
                                        <th>년월일</th>
                                        <th>주요 제안 내용</th>
                                        <th>현재 상태</th>
                                    </tr>
                                    <c:forEach var="l" items="${pList}">
                                        <c:choose>
                                            <c:when test="${l.PROPOSAL_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td><input type='checkbox' name='' id='' class='k-checkbox checkbox' onclick=''></td>
                                                    <td></td>
                                                    <td>${l.PROPOSAL_GUBUN}</td>
                                                    <td>${l.PROPOSAL_DATE}</td>
                                                    <td>${l.PROPOSAL_DETAIL}</td>
                                                    <td>${l.PROPOSAL_CHECK_CHOICE}</td>
                                                </tr>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->


<script>
    $(function(){
        $("#TabA").on("click",function(){
            $(".empInfo, .eduInfo .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "block");
            $("#empInfoBtn, #eduInfoBtn, #careerInfoBtn, #armyInfoBtn, #familyInfoBtn, #certificateInfoBtn, #dutiesInfoBtn, #orderInfoBtn, #rewardpunishmentInfoBtn, #lifelonglearningInfoBtn, #workevaluationInfoBtn, #proposalInfoBtn").css("display", "none");
        });
        $("#TabB").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".eduInfo, #eduInfoBtn").css("display", "block");
        });
        $("#TabC").on("click",function(){
            $(".empInfo, .eduInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".careerInfo, #careerInfoBtn").css("display", "block");
        });
        $("#TabD").on("click",function(){
            $(".empInfo, .careerInfo, .eduInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".armyInfo, #armyInfoBtn").css("display", "block");
        });
        $("#TabE").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .eduInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".familyInfo, #familyInfoBtn").css("display", "block");
        });
        $("#TabF").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .eduInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".certificateInfo, #certificateInfoBtn").css("display", "block");
        });
        $("#TabG").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .eduInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".dutiesInfo, #dutiesInfoBtn").css("display", "block");
        });
        $("#TabH").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .eduInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".orderInfo, #orderInfoBtn").css("display", "block");
        });
        $("#TabI").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .eduInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".rewardpunishmentInfo, #rewardpunishmentInfoBtn").css("display", "block");
        });
        $("#TabJ").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .eduInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".lifelonglearningInfo, #lifelonglearningInfoBtn").css("display", "block");
        });
        $("#TabK").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .eduInfo, .proposalInfo").css("display", "none");
            $(".workevaluationInfo, #workevaluationInfoBtn").css("display", "block");
        });
        $("#TabL").on("click",function(){
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .eduInfo").css("display", "none");
            $(".proposalInfo, #proposalInfoBtn").css("display", "block");
        });
        $("#TabM").on("click",function(){
            $(".eduInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .eduInfo, .proposalInfo").css("display", "none");
            $(".empInfo, #empInfoBtn").css("display", "block");
        });

        $(".userInfoTextBox").kendoTextBox();
        $("#addrDetail, #addrReferences, #mobileTelNum, #officeTelNum").kendoTextBox();

        $.each($(".userInfoTextBox input"), function(){
            $(this).data("kendoTextBox").enable(false);
        })

        userInfoDatePickerSetting();
    })

    function userInfoDatePickerSetting(){

        $("#joinDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : "${data.JOIN_DAY}"
        });

        $("#bDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : "${data.BDAY}"
        });

        $("#resignDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : "${data.RESIGN_DAY}"
        });

        $.each($(".userInfoDatePicker input"), function(){
            $(this).data("kendoDatePicker").enable(false);
        })
    }



    // 주소 검색
    function addrSearch(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#zipCode").val(data.zonecode);
                    $("#addr").val(roadAddr);
                    $("#oldAddr").val(data.jibunAddress);

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        $("#subAddr").val(extraRoadAddr);
                    } else {
                        $("#subAddr").val("");
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else {
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }

                    $("#addrDetail").focus();
                }
            }).open();
        });
    }

    function empInfoSave(){

        var formData = new FormData();
        formData.append("addr", $("#addr").val());
        formData.append("oldAddr", $("#oldAddr").val());
        formData.append("addrDetail", $("#addrDetail").val());
        formData.append("addrReferences", $("#addrReferences").val());
        formData.append("mobileTelNum", $("#mobileTelNum").val());
        formData.append("officeTelNum", $("#officeTelNum").val());
        formData.append("loginEmpSeq", $("#empSeq").val());
        formData.append("empSeq", $("#empSeq").val());

        $.ajax({
            url: "<c:url value=''/>",
            data: formData,
            type: "post",
            async : false,
            datatype: "json",
            contentType: false,
            processData: false,
            success: function () {
                alert("정보 등록이 완료되었습니다.");
                open_in_frame("/appointment/userInfoReq.do");
            },
            error : function(){
                alert("정보 등록 중 에러가 발생했습니다.");
            }
        });
    }
    //학력 degree
    //경력 careerInfo
    //병력 military
    //가족 family
    //면허 license
    //직무 job
    //발령 appointing
    //상벌 reward
    //교육 edu
    //근무평가 workEval
    //제안제도 proposal
    //학력추가
    function addDegreeBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=degree";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //경력추가
    function addCareerBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=career";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //병력추가
    function addMilitaryBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=military";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //가족추가
    function addFamilyBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=family";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //보유면허추가
    function addLicenseBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=license";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //직무사항추가
    function addJobBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=job";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //발령사항추가
    function addAppointingBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=appointing";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //상벌사항추가
    function addRewardBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=reward";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //교육사항추가
    function addEduBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=edu";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //근무평가추가
    function addWorkEvalBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=workEval";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //제안제도추가
    function addProposalBtn(e) {
        console.log(e);
        var url = "/useManage/userPersonnelRecordPop.do?popName=proposal";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }

</script>