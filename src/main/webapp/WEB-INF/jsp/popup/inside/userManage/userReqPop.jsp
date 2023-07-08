<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userReqPop.js?v=${today}"></script>
<style>
    .card-header {padding: 0px 0px 40px 0px;}
    table { background-color: #00000008; }
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <c:if test="${params.empSeq == null || params.empSeq == ''}">
                        <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">직원추가</h3>
                        <div style="margin-top:10px;">
                            <%--<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userReqPop.userReqPopImage();">이미지 관리</button>--%>
                            <button type="button" class="k-button k-button-solid-info" onclick="userReqPop.userReqSave();">저장</button>
                            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                        </div>
                    </c:if>
                    <c:if test="${params.empSeq != null && params.empSeq != ''}">
                        <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">직원정보</h3>
                    </c:if>
                </div>
            </div>
            <%--<div class="popupTitleSt">직원추가</div>--%>
            <form id="subHolidayReqPop" style="padding: 20px 30px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">--%>
                <table class="table table-bordered mb-0" id="userReqPop" style="margin-top: 10px;">
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
                                <input type="text" id="empNameKr" style="width: 50%;" value="${uprinfList.EMP_NAME_KR}" disabled="disabled">
                            </c:if>
                        </td>
                        <th><span class="red-star">*</span>직원구분</th>
                        <td>
                            <input type="text" id="divis" style="width: 40%;">
                            <input type="text" id="divisDet" style="width: 35%; display: none">
                            <input type="checkbox" id="check1"> 임시직원
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
                        <th><span class="red-star">*</span>주민등록번호</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="resRegisNum1" style="width: 30%;" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="6"> - <input type="text" id="resRegisNum2" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="7" style="width: 30%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="resRegisNum1" style="width: 30%;" value="${uprinfList.RES_REGIS_NUM}" disabled="disabled">
                            </c:if>
                        </td>
                    </tr>
                    <c:if test="${params.empSeq == null || params.empSeq == ''}">
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
                    </c:if>
                    <c:if test="${params.empSeq != null && params.empSeq != ''}">
                        <tr>
                            <th><span class="red-star">*</span>비밀번호</th>
                            <td>
                                <input type="text" id="loginPasswd" style="width: 50%;" value="${uprinfList.LOGIN_PASSWD}" disabled="disabled">
                            </td>
                            <th><span class="red-star">*</span>비밀번호 확인</th>
                            <td>
                                <input type="password" id="checkPasswd" style="width: 50%;" disabled>
                            </td>
                        </tr>
                    </c:if>
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
                    <tr>
                        <th>직급/등급</th>
                        <td>
                            <input type="text" id="positionOrNum" style="width: 50%;">
                        </td>
                        <th>CAPS 번호</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="capsNum" style="width: 50%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="capsNum" style="width: 50%;" value="${uprinfList.CAPS_NUM}" disabled="disabled">
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <th>직군</th>
                        <td>
                            <input type="text" id="jobCode" style="width: 50%;">
                        </td>
                        <th>직책</th>
                        <td>
                            <input type="text" id="positionName" style="width: 50%;">
                        </td>
                    </tr>
                    <tr>
                        <th>직무사항</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="jobDetail" style="width: 95%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="jobDetail" style="width: 95%;" value="${uprinfList.JOB_DETAIL}" disabled="disabled">
                            </c:if>
                        </td>
                        <th>학위</th>
                        <td>
                            <input type="text" id="degreeCode" style="width: 50%;">
                        </td>
                    </tr>
                    <tr>
                        <th>입사 일자</th>
                        <td>
                            <input type="text" id="regDate" style="width: 50%;">
                        </td>
                        <th>홈페이지 게시</th>
                        <td>
                            <span type="text" id="homePageActive" name="homePageActive" style="width: 100%;"></span>
                        </td>
                    </tr>
                    <tr>
                        <th>전직경력</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="beforCareer" maxlength="3" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right" > 개월
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="beforCareer" maxlength="3" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right" value="${uprinfList.BEFOR_CAREER}" disabled="disabled"> 개월
                            </c:if>
                        </td>
                        <th>경과년차</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="elapsedYear1" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right"> 년도기준
                                <input type="text" id="elapsedYear2" maxlength="3" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right"> 년차
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="elapsedYear1" maxlength="4" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right" value="${uprinfList.BS_ELAPSED_YEAR}" disabled="disabled"> 년도기준
                                <input type="text" id="elapsedYear2" maxlength="3" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 15%;text-align: right" value="${uprinfList.ELAPSED_YEAR}" disabled="disabled"> 년차
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <th>계좌정보</th>
                        <td colspan="3">
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                예금주 <input type="text" id="accountHolder" style="width: 20%; margin-right:10px;"> 은행명 <input type="text" id="bankName" style="width: 20%; margin-right:10px;"> 계좌번호  <input type="text" id="accountNum" style="width: 30%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                예금주 <input type="text" id="accountHolder" style="width: 20%; margin-right:10px;" value="${uprinfList.ACCOUNT_HOLDER}" disabled="disabled"> 은행명 <input type="text" id="bankName" style="width: 20%; margin-right:10px;" value="${uprinfList.BANK_NAME}" disabled="disabled"> 계좌번호  <input type="text" id="accountNum" style="width: 30%;" value="${uprinfList.ACCOUNT_NUM}" disabled="disabled">
                            </c:if>
                        </td>
                    </tr>
                    <tr>
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
                                <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                    <input type="text" id="addr" style="width: 15%; margin-right:10px;">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick=""/>
                                </c:if>
                                <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                    <input type="text" id="addr" style="width: 15%; margin-right:10px;" value="${uprinfList.ZIP_CODE}" disabled="disabled">
                                </c:if>
                            </div>
                            <div style="display: flex" class="mt5">
                                <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                    <input type="text" id="addrDetail" style="width: 95%;">
                                </c:if>
                                <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                    <input type="text" id="addrDetail" style="width: 95%;" value="${uprinfList.ADDR}" disabled="disabled">
                                </c:if>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="officeTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="officeTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;" value="${uprinfList.OFFICE_TEL_NUM}" disabled="disabled">
                            </c:if>
                        </td>
                        <th>휴대폰</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="mobileTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="mobileTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;" value="${uprinfList.MOBILE_TEL_NUM}" disabled="disabled">
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td colspan="3">
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="emailAddr" style="width: 30%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="emailAddr" style="width: 30%;" value="${uprinfList.EMAIL_ADDR}" disabled="disabled">
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <c:if test="${params.empSeq == null || params.empSeq == ''}">
                        <th>차량소유</th>
                        <td colspan="3">
                            <input type="checkbox" id="carActive" onclick="onDisplay();"> 차량을 소유하고 있음
                        </td>
                    </tr>
                    <tr style="display: none;" id="noneTr">
                        <th>차량번호</th>
                        <td colspan="3">
                            <input type="text" id="carNum1" style="width: 10%;"><input type="text" id="carNum2" style="margin-left:5px;width: 10%;"><input type="text" id="carNum3" style="margin-left:5px;width: 10%;">
                            ex) 22 가 1111
                        </c:if>
                        <c:if test="${uprinfList.CAR_ACTIVE == 1}">
                        <th>차량소유</th>
                        <td colspan="3">
                            <input type="checkbox" checked id="carActive2"> 차량을 소유하고 있음
                        </td>
                    </tr>
                    <tr>
                        <th>차량번호</th>
                        <td colspan="3">
                                <input type="text" id="carNum1" style="width: 30%;" value="${uprinfList.CAR_NUM}" disabled="disabled">
                                ex) 22 가 1111
                        </c:if>
                        </td>
                    </tr>
                    </thead>
                </table>
                <table class="table table-bordered mb-0" id="userReqPopDetail" style="border-left:none;">
                    <colgroup>
                        <col width="13%">
                        <col width="37%">
                        <col width="13%">
                        <col width="37%">
                    </colgroup>
                    <thead>
                    <tr>
                        <td colspan="4" style="height:20px; border-right:none; border-left:none;background-color: #f7f7f7;"></td>
                    </tr>
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
                                <input type="text" id="empNameCn" style="width: 50%;" value="${uprinfList.EMP_NAME_CN}" disabled="disabled">
                            </c:if>
                        </td>
                        <th>영문 이름</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="empNameEn" style="width: 50%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="empNameEn" style="width: 50%;" value="${uprinfList.EMP_NAME_EN}" disabled="disabled">
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td>
                            <input type="text" id="bday" style="width: 50%;">
                        </td>
                        <th>긴급 연락처</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="emgTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;">
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="emgTelNum" maxlength="13" onKeyup="this.value=this.value.replace(/[^0-9]/g,'');" style="width: 50%;" value="${uprinfList.EMG_TEL_NUM}" disabled="disabled">
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
                                <input type="text" id="legalDomicile" style="width: 95%;" value="${uprinfList.LEGAL_DOMICILE}" disabled="disabled">
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
                                <input type="text" id="hobby" style="width: 95%;" value="${uprinfList.HOBBY}" disabled="disabled">
                            </c:if>
                        </td>
                        <div style="display: none;" id="noneDiv">
                            <th>특기</th>
                            <td>
                                <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                    <input type="text" id="specialty" style="width: 95%;">
                                </c:if>
                                <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                    <input type="text" id="specialty" style="width: 95%;" value="${uprinfList.SPECIALITY}" disabled="disabled">
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
                                <input type="text" id="religion" style="width: 50%;" value="${uprinfList.RELIGION}" disabled="disabled">
                            </c:if>
                        </td>
                        <th>신장</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                <input type="text" id="height" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right"> cm
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                <input type="text" id="height" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right" value="${uprinfList.HEIGHT}" disabled="disabled"> cm
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
                                <input type="text" id="weight" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%;text-align: right" value="${uprinfList.WEIGHT}" disabled="disabled"> kg
                            </c:if>
                        </td>
                        <th>시력</th>
                        <td>
                            <c:if test="${params.empSeq == null || params.empSeq == ''}">
                                좌 <input type="text" id="vision1" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right">
                                우 <input type="text" id="vision2" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right"> (안경 착용 시력)
                            </c:if>
                            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                                좌 <input type="text" id="vision1" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right" value="${uprinfList.VISIONL}" disabled="disabled">
                                우 <input type="text" id="vision2" onKeyup="this.value=this.value.replace(/[^-\.0-9]/g,'');" style="width: 20%; text-align: right" value="${uprinfList.VISIONR}" disabled="disabled"> (안경 착용 시력)
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
                </table>
            </form>
        </div>
    </div>
</div>
<script>
    userReqPop.defaultScript();
    var idFlag = false;
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

    if(empSeq != null && empSeq != ''){
        $("#positionOrNum").data("kendoDropDownList").enable(false);
        /*$("#divis").data("kendoDropDownList").enable(false);*/
/*        $("#deptName").data("kendoDropDownList").enable(false);
        $("#deptTeamName").data("kendoDropDownList").enable(false);
        $("#positionOrNum").data("kendoDropDownList").enable(false);
        $("#jobCode").data("kendoDropDownList").enable(false);
        $("#positionName").data("kendoDropDownList").enable(false);
        $("#degreeCode").data("kendoDropDownList").enable(false);
        $("#regDate").data("kendoDatePicker").enable(false);
        $("#homePageActive").data("kendoRadioGroup").enable(false);
        $("#bday").data("kendoDatePicker").enable(false);
        $("#weddingActive").data("kendoRadioGroup").enable(false);
        $("#weddingDay").data("kendoDatePicker").enable(false);
        $("#bloodType").data("kendoRadioGroup").enable(false);
        $("#resignDay").data("kendoDatePicker").enable(false);*/

        //직원구분
        $("#divis").data("kendoDropDownList").value("${uprinfList.DIVISION}");
        $("#divisDet").data("kendoDropDownList").wrapper.show();

        $("#divisDet").data("kendoDropDownList").value("${uprinfList.DIVISION_SUB}");
        //부서
        $("#deptName").data("kendoDropDownList").value("${uprinfList.DEPT_SEQ}");
        //팀 --- DEPT_TEAM_SEQ 없음
        $("#deptTeamName").data("kendoDropDownList").value("${uprinfList.DEPT_SEQ}");
        //직급/등급 ---insert
        $("#positionOrNum").data("kendoDropDownList").value();
        //직군 ---insert
        $("#jobCode").data("kendoDropDownList").value("${uprinfList.JOB_NAME}");
        //직책
        $("#positionName").data("kendoDropDownList").value("${uprinfList.DUTY_NAME}");
        //학위 ---insert
        $("#degreeCode").data("kendoDropDownList").value("${uprinfList.DEGREE_CODE}");


        //홈페이지 게시
        $("#homePageActive").data("kendoRadioGroup").value("${uprinfList.HOME_PAGE_ACTIVE}");
        //입사 일자
        $("#regDate").val("${uprinfList.JOIN_DAY}");
        //생년월일
        $("#bday").val("${uprinfList.BDAY}");
        //결혼 관계
        $("#weddingActive").data("kendoRadioGroup").value("${uprinfList.WEDDING_ACTIVE}");
        //결혼기념일
        $("#weddingDay").val("${uprinfList.WEDDING_DAY}");
        //혈액형
        $("#bloodType").data("kendoRadioGroup").value("${uprinfList.BLOOD_TYPE}");
    }

</script>
</body>
