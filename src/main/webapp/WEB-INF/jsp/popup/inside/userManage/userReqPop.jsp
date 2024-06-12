<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<%--<style>
    table { background-color: #00000008; }
</style>--%>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">직원등록</h3>
            <div>
                <input type="hidden" id="targetEmpSeq" value="${params.empSeq}" />
                <c:if test="${params.empSeq != null && params.empSeq != ''}">
                    <button type="button" class="k-button k-button-solid-base" style="margin-top: 8px;" onclick="history.back();">뒤로가기</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-info" style="margin-top: 8px;" onclick="userReqPop.userReqSave();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;margin-top: 8px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="subHolidayReqPop" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0" id="userReqPop">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">기본정보</th>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>이름</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="empNameKr" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="empNameKr" style="width: 50%;" value="${uprinfList.EMP_NAME_KR}">
                        </c:if>
                    </td>
                    <th><span class="red-star">*</span>직원구분</th>
                    <td>
                        <input type="text" id="divis" style="width: 40%;">
                        <input type="text" id="divisDet" style="width: 35%; display: none">
                        <c:if test="${uprinfList.TEMP_DIVISION == null || uprinfList.TEMP_DIVISION == 'N'}">
                            <input type="checkbox" id="check1"> 임시직원
                        </c:if>
                        <c:if test="${uprinfList.TEMP_DIVISION != null && uprinfList.TEMP_DIVISION == 'Y'}">
                            <input type="checkbox" id="check1" checked> 임시직원
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>아이디</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="loginId" style="width: 50%;">
                            <button type="button" class="k-button k-button-solid-base" id="idCheck">중복확인</button>
                            *전담인력 필수
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="loginId" style="width: 50%;" value="${uprinfList.LOGIN_ID}" disabled="disabled">
                        </c:if>
                    </td>
                    <th>주민등록번호</th>
                    <td>
                        <input type="text" id="resRegisNum1" style="width: 30%;" value="${fn:split(uprinfList.RES_REGIS_NUM, "-")[0]}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="6"> - <input type="text" id="resRegisNum2" value="${fn:split(uprinfList.RES_REGIS_NUM, "-")[1]}" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="7" style="width: 30%;">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>비밀번호</th>
                    <td>
                        <input type="password" id="loginPasswd" style="width: 50%;"> 미입력시 변경 안됨
                    </td>
                    <th><span class="red-star">*</span>비밀번호 확인</th>
                    <td>
                        <input type="password" id="checkPasswd" style="width: 50%;">
                    </td>
                </tr>
                <tr>
                    <th>부서</th>
                    <td>
                        <input type="text" id="deptName" style="width: 50%;">
                    </td>
                    <th>팀</th>
                    <td>
                        <input type="text" id="deptTeamName" style="width: 50%;">
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>직급/등급</th>
                    <td>
                        <input type="text" id="position" style="width: 50%;">
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="capsNum" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="capsNum" style="width: 50%;" value="${uprinfList.CAPS_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr class="caseB" style="display: none">
                    <th>CAPS 번호</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="capsNumCaseB" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="capsNumCaseB" style="width: 50%;" value="${uprinfList.CAPS_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>직군</th>
                    <td>
                        <input type="text" id="occupationCode" style="width: 50%;">
                    </td>
                    <th>직책</th>
                    <td>
                        <input type="text" id="duty" style="width: 50%;">
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>직무사항</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="jobDetail" style="width: 95%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="jobDetail" style="width: 95%;" value="${uprinfList.JOB_DETAIL}">
                        </c:if>
                    </td>
                    <th>학위</th>
                    <td>
                        <input type="text" id="degreeCode" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseA caseB" style="display: none">
                    <th>직무사항</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="jobDetailCaseB" style="width: 95%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="jobDetailCaseB" style="width: 95%;" value="${uprinfList.JOB_DETAIL}">
                        </c:if>
                    </td>
                    <th>학위</th>
                    <td>
                        <input type="text" id="degreeCodeA" style="width: 50%;">
                    </td>
                </tr>
                <tr  class="caseD caseE" style="display: none">
                    <th>직무사항</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="jobDetailCaseA" style="width: 95%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="jobDetailCaseA" style="width: 95%;" value="${uprinfList.JOB_DETAIL}">
                        </c:if>
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="capsNumCaseC" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="capsNumCaseC" style="width: 50%;" value="${uprinfList.CAPS_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseC defaultCaseD">
                    <th>입사 일자</th>
                    <td <%--colspan="3"--%>>
                        <input type="text" id="regDate" style="width: 50%;">
                    </td>
                    <th id="homePageActiveTh"><%--홈페이지 게시--%></th>
                    <td>
                        <%--<span type="text" id="homePageActive" name="homePageActive" style="width: 100%;"></span>--%>
                    </td>
                </tr>
                <tr class="caseA" style="display: none">
                    <th>입사 일자</th>
                    <td>
                        <input type="text" id="regDateCaseA" style="width: 50%;">
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="capsNumCaseA" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="capsNumCaseA" style="width: 50%;" value="${uprinfList.CAPS_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr class="caseD" style="display: none">
                    <th>입사 일자</th>
                    <td>
                        <input type="text" id="regDateCaseB" style="width: 50%;">
                    </td>
                    <th>호칭</th>
                    <td>
                        <input type="text" id="nicknameCaseA" style="width: 50%;"/>
                    </td>
                </tr>
                <tr class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD">
                    <th>전직경력</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="beforCareer" maxlength="4" onKeyup="this.value=this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 15%;text-align: right" > 개월
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="beforCareer" maxlength="4" onKeyup="this.value=this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 15%;text-align: right" value="${uprinfList.BEFOR_CAREER}"> 개월
                        </c:if>
                    </td>
                    <th>경과년차</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="elapsedYear1" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right"> 년도기준
                            <input type="text" id="elapsedYear2" maxlength="3" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right"> 년차
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="elapsedYear1" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right" value="${uprinfList.BS_ELAPSED_YEAR}"> 년도기준
                            <input type="text" id="elapsedYear2" maxlength="3" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right" value="${uprinfList.ELAPSED_YEAR}"> 년차
                        </c:if>
                    </td>
                </tr>
                <tr class="caseC" style="display: none">
                    <th>호칭</th>
                    <td>
                        <input type="text" id="nickname" style="width: 50%;"/>
                    </td>
                    <th>생년월일</th>
                    <td>
                        <input type="text" id="birthDay" style="width: 50%;"/>
                        <input type="checkbox" id="lunarYn1" style="position : relative ; top: 3px; margin-left: 5px;"/>
                        <label for="lunarYn1" style="position : relative ; top: 1px;">음력</label>
                        <span id="lunarBirthDay"></span>
                    </td>
                </tr>
                <tr>
                <tr>
                    <th>계좌정보</th>
                    <td colspan="3">
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            예금주 <input type="text" id="accountHolder" style="width: 20%; margin-right:10px;"> 은행명 <input type="text" id="bankName" style="width: 20%; margin-right:10px;"> 계좌번호  <input type="text" id="accountNum" style="width: 30%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            예금주 <input type="text" id="accountHolder" style="width: 20%; margin-right:10px;" value="${uprinfList.ACCOUNT_HOLDER}"> 은행명 <input type="text" id="bankName" style="width: 20%; margin-right:10px;" value="${uprinfList.BANK_NAME}"> 계좌번호  <input type="text" id="accountNum" style="width: 30%;" value="${uprinfList.ACCOUNT_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr style="display:none;">
                    <th>증명사진</th>
                    <td colspan="3">
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="file">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="file" value="${uprinfList.PHOTO_FILE_ID}" <%--disabled="disabled"--%>>
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>거주지</th>
                    <td colspan="3">
                        <div style="display: flex">
                            <input type="text" id="zipCode" style="width: 15%; margin-right:10px;" value="${uprinfList.ZIP_CODE}">
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="userReqPop.addrSearch();"/>
                        </div>
                        <div style="display: flex" class="mt5">
                            <input id="addr" style="width: 95%;" value="${uprinfList.ADDR}">
                            <span id="guide" style="color:#999;display:none"></span>
                            <input type="hidden" id="addrDetail">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>
                        <input type="text" id="officeTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;" value="${uprinfList.OFFICE_TEL_NUM}">
                    </td>
                    <th>휴대폰</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="mobileTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="mobileTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;" value="${uprinfList.MOBILE_TEL_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="emailAddr" style="width: 30%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="emailAddr" style="width: 30%;" value="${uprinfList.EMAIL_ADDR}">
                        </c:if>
                    </td>
                    <th>과학기술인 번호</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="scienceNo" style="width: 30%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="scienceNo" style="width: 30%;" value="${uprinfList.SCIENCE_NO}">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>차량소유</th>
                    <td colspan="3">
                        <div style="float: left; margin-right: 5px; height: 29px; line-height: 29px"><input type="checkbox" <c:if test="${uprinfList.CAR_ACTIVE eq 'Y'}">checked</c:if> id="carActive""> 차량을 소유하고 있음</div>
                        <div id="carNumDiv" style="<c:if test="${uprinfList.CAR_ACTIVE ne 'Y'}">display: none</c:if>">
                            <input type="text" id="carNum1" style="width: 30%;" value="${uprinfList.CAR_NUM}">
                            ex) 22 가 1111
                        </div>
                    </td>
                </tr>
                </thead>
            </table>
            <table class="defaultCase defaultCaseA defaultCaseB defaultCaseC defaultCaseD popTable table table-bordered mb-0" id="userReqPopDetail" style="border-left:none;">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <%--tr>
                    <td colspan="4" style="height:20px; border-right:none; border-left:none;background-color: #f7f7f7;"></td>
                </tr>--%>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">직원 부가정보</th>
                </tr>
                <tr>
                    <th>한자 이름</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="empNameCn" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="empNameCn" style="width: 50%;" value="${uprinfList.EMP_NAME_CN}">
                        </c:if>
                    </td>
                    <th>영문 이름</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="empNameEn" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="empNameEn" style="width: 50%;" value="${uprinfList.EMP_NAME_EN}">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>생년월일</th>
                    <td>
                        <input type="text" id="bDay" style="width: 50%;" value="<c:if test="${params.empSeq != null && params.empSeq != ''}">${uprinfList.BDAY}</c:if>">
                        <input type="checkbox" id="lunarYn" style="position : relative ; top: 3px; margin-left: 5px;"/>
                        <label for="lunarYn" style="position : relative ; top: 1px;">음력</label>
                        <span id="lunarBday"></span>

                    </td>
                    <th>긴급 연락처</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="emgTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="emgTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;" value="${uprinfList.EMG_TEL_NUM}">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>본적</th>
                    <td colspan="3">
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="legalDomicile" style="width: 95%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="legalDomicile" style="width: 95%;" value="${uprinfList.LEGAL_DOMICILE}">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>결혼 관계</th>
                    <td>
                        <span type="text" id="weddingActive" name="weddingActive" style="width: 100%;"></span>
                    </td>
                    </td>
                    <th>결혼기념일</th>
                    <td>
                        <input type="text" id="weddingDay" style="width: 50%;">
                    </td>
                </tr>
                <tr>
                    <th>혈액형</th>
                    <td colspan="3">
                        <span type="text" id="bloodType" name="bloodType" style="width: 100%;"></span>
                    </td>
                </tr>
                <tr>
                    <th>취미</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="hobby" style="width: 95%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="hobby" style="width: 95%;" value="${uprinfList.HOBBY}">
                        </c:if>
                    </td>
                    <div style="display: none;" id="noneDiv">
                        <th>특기</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="specialty" style="width: 95%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="specialty" style="width: 95%;" value="${uprinfList.SPECIALITY}">
                            </c:if>
                        </td>
                    </div>
                </tr>
                <tr>
                    <th>종교</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="religion" style="width: 50%;">
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="religion" style="width: 50%;" value="${uprinfList.RELIGION}">
                        </c:if>
                    </td>
                    <th>신장</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="height" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right"> cm
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="height" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right" value="${uprinfList.HEIGHT}"> cm
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>체중</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            <input type="text" id="weight" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right"> kg
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            <input type="text" id="weight" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right" value="${uprinfList.WEIGHT}"> kg
                        </c:if>
                    </td>
                    <th>시력</th>
                    <td>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                            좌 <input type="text" id="vision1" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right">
                            우 <input type="text" id="vision2" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right"> (안경 착용 시력)
                        </c:if>
                        <c:if test="${params.empSeq != null && params.empSeq != ''}">
                            좌 <input type="text" id="vision1" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right" value="${uprinfList.VISIONL}">
                            우 <input type="text" id="vision2" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right" value="${uprinfList.VISIONR}"> (안경 착용 시력)
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <c:if test="${params.empSeq == null || params.empSeq == ''}">
                    <th>재직여부</th>
                    <td colspan="3">
                        <input type="checkbox" id="check3" onclick="onDisplay1();"> 퇴사직원임
                    </td>
                </tr>
                <tr style="display: none;" id="noneTr1">
                    <th>퇴사일자</th>
                    <td colspan="3">
                        <input type="text" id="resignDay" style="width: 20%;">
                    </td>
                </tr>
                </c:if>
                <c:if test="${uprinfList.WORK_STATUS_CODE == 'N'}">
                    <th>재직여부</th>
                    <td colspan="3">
                        <input type="checkbox" checked id="check4"> 퇴사직원임
                    </td>
                    </tr>
                    <tr>
                        <th>퇴사일자</th>
                        <td colspan="3">
                            <input type="text" id="resignDay" style="width: 20%;" value="${uprinfList.RESIGN_DAY}">
                        </td>
                    </tr>
                </c:if>
                </thead>
            </table>
            <table class="caseA caseB caseD caseE popTable table table-bordered mb-0" style="border-left:none; display: none;">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">직원 부가정보</th>
                </tr>
                <tr>
                    <th>계약/협약 기간</th>
                    <td>
                        <input type="text" id="sDate" style="width: 40%;"> ~
                        <input type="text" id="eDate" style="width: 40%;">
                    </td>
                    <th>근무시간 /일</th>
                    <td>
                        <input type="text" id="workTime" style="width: 15%;" value="${uprinfList.WEEK_WORK_TIME}">
                         시간
                    </td>
                </tr>
                <tr>
                    <th>근로계약/협약 조건</th>
                    <td colspan="3">
                       <textarea type="text" id="contract" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="caseD" style="display: none">
                    <th>학교</th>
                    <td>
                        <input type="text" id="school" style="width: 50%;">
                    </td>
                    <th>학위</th>
                    <td>
                        <input type="text" id="degree" style="width: 50%;">
                    </td>
                </tr>
                <tr class="caseD" style="display: none">
                    <th>학과</th>
                    <td>
                        <input type="text" id="department" style="width: 50%;">
                    </td>
                    <th>학년/학번</th>
                    <td>
                        <input type="text" id="grade" style="width: 10%;">학년 / <input type="text" id="studentId" style="width: 40%;">
                    </td>
                </tr>
                <tr>
                    <th>기능 및 자격</th>
                    <td colspan="3">
                        <textarea type="text" id="qualification" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="defaultCaseC defaultCaseD">
                    <th>최종학력</th>
                    <td colspan="3">
                        <textarea type="text" id="degreeT" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="defaultCaseC defaultCaseD">
                    <th>경력</th>
                    <td colspan="3">
                        <textarea type="text" id="career" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr class="defaultCase caseF defaultCaseB defaultCaseC defaultCaseD" style="display: none;">
                    <th>병역</th>
                    <td colspan="3">
                        <textarea type="text" id="military" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>특이사항</th>
                    <td colspan="3">
                        <textarea type="text" id="significant" style="width: 95%; height: 100px;"></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
<input type="hidden" id="gub_code" value="${uprinfList.DIVISION}" />
<input type="hidden" id="gub_sub_code" value="${uprinfList.DIVISION_SUB}" />
<script>
    userReqPop.defaultScript();
    var idFlag = false;
    var code = $("#gub_code").val();
    var subCode = $("#gub_sub_code").val();

    $(function(){
       var lunarCal = '${uprinfList.LUNAR_CAL}';
       var bday = $("#bday").val();
       if(lunarCal == "Y"){
           $("#lunarYn").prop("checked", true);
           var lunarDay = "";
           if(bday != null){
               lunarDay = solarToLunar(bday.split("-")[0], bday.split("-")[1], bday.split("-")[2]);
           }
           $("#lunarBday").text(lunarDay);
       } else {
           $("#lunarYn").val("N");
           $("#lunarBday").text("");
       }
    });

    $(function(){
        var lunarCal = '${uprinfList.LUNAR_CAL}';
        var birthDay = $("#birthDay").val();
        if(lunarCal == "Y"){
            $("#lunarYn1").prop("checked", true);
            var lunarDay = solarToLunar(birthDay.split("-")[0], birthDay.split("-")[1], birthDay.split("-")[2]);
            $("#lunarBirthDay").text(lunarDay);
        } else {
            $("#lunarYn1").val("N");
            $("#lunarBirthDay").text("");
        }


        if(code != "" || code != null){
            $("#divis").data("kendoDropDownList").value(code);
            $("#divis").data("kendoDropDownList").trigger("change");
        }
        if(subCode != "" && subCode != null){
            $("#divisDet").data("kendoDropDownList").value(subCode);
            $("#divisDet").data("kendoDropDownList").trigger("change");
        }
    });

    function onDisplay() {

        if($("#carActive").is(":checked")){
            $('#noneTr').show();
        } else {
            $('#noneTr').hide();

        }
    }

    function onDisplay1(){
        if($("#check3").is(":checked")){
            $('#noneTr1').show();
        } else {
            $('#noneTr1').hide();
        }
    }

    var empSeq = '${params.empSeq}';

    if(empSeq != '' && empSeq != undefined){
        //console.log(${uprinfList.DEPT_PARENT_SEQ});
        var deptParentSeq = '${uprinfList.DEPT_PARENT_SEQ}'
        //부서만 있는 경우 1000, 그외는 부서, 팀 있는 경우
        var deptDropDownList = $("#deptName").data("kendoDropDownList");

        if(deptParentSeq == "1000"){
            deptDropDownList.value("${uprinfList.DEPT_SEQ}");
            deptDropDownList.trigger("change");
            <%--$("#deptTeamName").data("kendoDropDownList").value("${uprinfList.DEPT_TEAM_NAME}");--%>
        }else{
            deptDropDownList.value(${uprinfList.DEPT_PARENT_SEQ});
            deptDropDownList.trigger("change");

            $("#deptTeamName").data("kendoDropDownList").value("${uprinfList.DEPT_SEQ}");
        }

        //직원구분
        /*$("#divis").data("kendoDropDownList").value("${uprinfList.DIVISION}");
        var divis = $("#divis").val();
        var detDs = "";
        if(divis == "4"){
            $("#divisDet").data("kendoDropDownList").wrapper.show()

            detDs = [
                {text: "계약직원", value: "1"},
                {text: "인턴사원", value : "2"},
                {text: "경비/환경", value : "3"},
            ];
            $("#divisDet").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: detDs,
                change: function(){
                    var divisDet = $("#divisDet").val();
                    if($("#divis").val() != '1'){
                        if(divisDet == '3' && $("#divis").val() == '4'){
                            $(".defaultCase").each(function(){
                                $(this).css("display", "none");
                            });

                            $(".caseA").each(function(){
                                $(this).css("display", "");
                            });
                        } else {
                            userReqPop.fn_caseARollBack();
                        }
                    }
                }
            });
        } else if(divis == "1") {
            $("#divisDet").data("kendoDropDownList").wrapper.show()

            detDs = [
                {text: "위촉직원", value: "6"},
                {text: "위촉연구원", value : "4"},
            ];
            $("#divisDet").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: detDs,
                change: function(){
                    var divisDet = $("#divisDet").val();
                    if($("#divis").val() != '1'){
                        if(divisDet == '3' && $("#divis").val() == '4'){
                            $(".defaultCase").each(function(){
                                $(this).css("display", "none");
                            });

                            $(".caseA").each(function(){
                                $(this).css("display", "");
                            });
                        } else {
                            userReqPop.fn_caseARollBack();
                        }
                    }

                }
            });
        } else {
            $("#divisDet").val("");
            $("#divisDet").data("kendoDropDownList").wrapper.hide()
        }

        $("#divisDet").data("kendoDropDownList").value("${uprinfList.DIVISION_SUB}");
        var divisDet = $("#divisDet").val();
        if(divisDet == "3"){
            $('#positionTr').hide();
        }else {
            $('#positionTr').show();
        }*/

        //직급/등급 ---insert
        $("#position").data("kendoDropDownList").value("${uprinfList.POSITION_CODE}");
        //직군 ---insert
        $("#occupationCode").data("kendoDropDownList").value("${uprinfList.OCCUPATION_CODE}");
        //직책
        $("#duty").data("kendoDropDownList").value("${uprinfList.DUTY_CODE}");
        //학위 ---insert
        $("#degreeCode").data("kendoDropDownList").value("${uprinfList.DEGREE_CODE}");
        $("#degreeCodeA").data("kendoDropDownList").value("${uprinfList.DEGREE_CODE}");

        //홈페이지 게시
        <%-- $("#homePageActive").data("kendoRadioGroup").value("${uprinfList.HOME_PAGE_ACTIVE}"); --%>
        //입사 일자
        $("#regDate").val("${uprinfList.JOIN_DAY}");
        $("#regDateCaseA").val("${uprinfList.JOIN_DAY}"); /*계약직원 - 경비/환경*/
        $("#regDateCaseB").val("${uprinfList.JOIN_DAY}");  /*연수생/학생연구원*/
        //생년월일
        $("#bday").val("${uprinfList.BDAY}");
        $("#birthDay").val("${uprinfList.BDAY}");

        //결혼 관계
        $("#weddingActive").data("kendoRadioGroup").value("${uprinfList.WEDDING_ACTIVE}");
        //결혼기념일
        $("#weddingDay").val("${uprinfList.WEDDING_DAY}");
        //혈액형
        $("#bloodType").data("kendoRadioGroup").value("${uprinfList.BLOOD_TYPE}");

        //호칭
        $("#nickname").data("kendoDropDownList").value("${uprinfList.NICK_NAME}");
        $("#nicknameCaseA").data("kendoDropDownList").value("${uprinfList.NICK_NAME}");

        //근로계약/협약 조건
        $("#contract").val("${uprinfList.CONTRACT}");
        //학교
        $("#school").val("${uprinfList.SCHOOL}");
        //학위
        $("#degree").data("kendoDropDownList").value("${uprinfList.DEGREE}");

        //계약/협약 기간
        $("#sDate").val("${uprinfList.CTR_ST_DAY}");
        $("#eDate").val("${uprinfList.CTR_EN_DAY}");

        //학과
        $("#department").val("${uprinfList.DEPARTMENT}");
        //학년
        $("#grade").val("${uprinfList.GRADE}");
        //학번
        $("#studentId").val("${uprinfList.STUDENT_ID}");
        //기능 및 자격
        $("#qualification").val("${uprinfList.QUALIFICATION}");
        //최종학력
        $("#degreeT").val("${uprinfList.LAST_DEGREE}");
        //경력
        $("#career").val("${uprinfList.CAREER}");
        //병역
        $("#military").val("${uprinfList.MILITARY}");
        //특이사항
        $("#significant").val("${uprinfList.SIGNIFICANT}");
        //직무사항
        $("#jobDetailCaseB").val("${uprinfList.JOB_DETAIL}");
    }

</script>
</body>
