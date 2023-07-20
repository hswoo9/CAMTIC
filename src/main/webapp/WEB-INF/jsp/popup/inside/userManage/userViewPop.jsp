<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userViewPop.js?v=1"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                <h3 class="card-title title_NM">직원 기본정보</h3>
                <div class="btn-st popButton">
                    <c:if test="${params.admin != null && params.admin == 'Y'}">
                        <button type="button" class="k-button k-button-solid-info" onclick="userViewPop.certificateReqPop('${params.empSeq}')">증명서 발급</button>
                        <button type="button" class="k-button k-button-solid-info" onclick="userViewPop.moveToUserReqPop('${params.empSeq}')">편집</button>
                        <button type="button" class="k-button k-button-solid-error" onclick="">퇴사처리</button>
                        <button type="button" class="k-button k-button-solid-error" onclick="">삭제</button>
                    </c:if>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                </div>
            </c:if>
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
                    <th><span class="red-star"></span>사번</th>
                    <td>
                        ${uprinfList.ERP_EMP_SEQ}
                    </td>
                    <th rowspan="5"><span class="red-star"></span>증명사진</th>
                    <td rowspan="5" style="text-align: center">
                        이미지
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star"></span>아이디</th>
                    <td>
                        ${uprinfList.LOGIN_ID}
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star"></span>이름</th>
                    <td>
                        ${uprinfList.EMP_NAME_KR}
                    </td>
                </tr>
                <tr>
                    <th>주민등록번호</th>
                    <td>
                        ${uprinfList.RES_REGIS_NUM}
                    </td>
                </tr>
                <tr>
                    <th>직원구분</th>
                    <td>
                        ${uprinfList.DIVISION}
                    </td>
                </tr>
                <tr>
                    <th>소속</th>
                    <td>
                        캠틱
                    </td>
                    <th>부서(실)</th>
                    <td>
                        ${uprinfList.PARENT_DEPT_NAME}
                    </td>
                </tr>
                <tr>
                    <th>부서(팀)</th>
                    <td>
                        ${uprinfList.DEPT_TEAM_NAME}
                    </td>
                    <th>직책</th>
                    <td>
                        ${uprinfList.DUTY_NAME}
                    </td>
                </tr>
                <tr>
                    <th>직급</th>
                    <td>
                        ${uprinfList.POSITION_NAME}
                    </td>
                    <th>등급</th>
                    <td>
                        ${uprinfList.GRADE_NAME}
                    </td>
                </tr>
                <tr>
                    <th>직군</th>
                    <td>
                        ??
                    </td>
                    <th>학위</th>
                    <td>
                        ${uprinfList.DEGREE_CODE}
                    </td>
                </tr>
                <tr>
                    <th>겸직</th>
                    <td colspan="3">
                        <input type="text" id="deptName" style="width: 200px;">
                        <input type="text" id="deptTeamName" style="width: 200px;">
                        <input type="text" id="duty" style="width: 200px;">
                        <button type="button" class="k-button k-button-solid-info" onclick="">추가</button>
                    </td>
                </tr>
                <tr>
                    <th>[우편번호] 거주지</th>
                    <td colspan="3">
                        [${uprinfList.ZIP_CODE}] ${uprinfList.ADDR}
                    </td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>
                        ${uprinfList.OFFICE_TEL_NUM}
                    </td>
                    <th>핸드폰</th>
                    <td>
                        ${uprinfList.MOBILE_TEL_NUM}
                    </td>
                </tr>
                <tr>
                    <th>메일주소</th>
                    <td>
                        ${uprinfList.EMAIL_ADDR}
                    </td>
                    <th>CAPS 번호</th>
                    <td>
                        ${uprinfList.CAPS_NUM}
                    </td>
                </tr>
                <tr>
                    <th>직무사항</th>
                    <td>
                        ${uprinfList.JOB_DETAIL}
                    </td>
                    <th>홈페이지 게시</th>
                    <td>
                        <c:if test="${uprinfList.HOME_PAGE_ACTIVE == 'Y'}">
                            게시
                        </c:if>
                        <c:if test="${uprinfList.HOME_PAGE_ACTIVE == 'N'}">
                            미게시
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>경력사항</th>
                    <td>
                        ??
                    </td>
                    <th></th>
                    <td></td>
                </tr>
                <tr>
                    <th>계좌정보</th>
                    <td colspan="3">
                        더존코드 : | [${uprinfList.BANK_NAME}] ${uprinfList.ACCOUNT_NUM} | 예금주 : ${uprinfList.ACCOUNT_HOLDER} | 개인카드 : <button type="button" class="k-button k-button-solid-info" onclick="">수정</button>
                    </td>
                </tr>
                </thead>
            </table>
            <table class="popTable table table-bordered mb-0" id="userReqPopDetail" style="border-left:none;">
                <colgroup>
                    <col width="13%">
                    <col width="37%">
                    <col width="13%">
                    <col width="37%">
                </colgroup>
                <thead>
                <%--<tr>
                    <td colspan="4" style="height:20px; border-right:none; border-left:none;background-color: #f7f7f7;"></td>
                </tr>--%>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">직원 부가정보</th>
                </tr>
                <tr>
                    <th>한자 이름</th>
                    <td>
                        ${uprinfList.EMP_NAME_CN}
                    </td>
                    <th>영문 이름</th>
                    <td>
                        ${uprinfList.EMP_NAME_EN}
                    </td>
                </tr>
                <tr>
                    <th>생년월일</th>
                    <td>
                        ${uprinfList.BDAY}
                    </td>
                    <th>재직여부</th>
                    <td>
                        <c:if test="${uprinfList.WORK_STATUS_CODE ==  'Y'}">
                            재직
                        </c:if>
                        <c:if test="${uprinfList.WORK_STATUS_CODE ==  'N'}">
                            퇴사
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>입사일자</th>
                    <td>
                        ${uprinfList.JOIN_DAY}
                    </td>
                    <th>퇴사일자</th>
                    <td>
                        ${uprinfList.RESIGN_DAY}
                    </td>
                </tr>
                <tr>
                    <th>본적</th>
                    <td colspan="3">
                        ${uprinfList.LEGAL_DOMICILE}
                    </td>
                </tr>
                    <c:if test="${uprinfList.CAR_ACTIVE == 1}">
                    <th>차량소유</th>
                    <td>
                        <%--<input type="checkbox" checked id="carActive2">--%>소유
                    </td>
                    <th>차량번호</th>
                    <td>
                        ${uprinfList.CAR_NUM}
                    </td>
                    </c:if>
                </tr>
                <tr>
                    <th>결혼관계</th>
                    <td>
                        <c:if test="${uprinfList.WEDDING_ACTIVE ==  'N'}">
                            기혼
                        </c:if>
                        <c:if test="${uprinfList.WEDDING_ACTIVE ==  'Y'}">
                            미혼
                        </c:if>
                    </td>
                    </td>
                    <th>결혼기념일</th>
                    <td>
                        ${uprinfList.WEDDING_DAY}
                    </td>
                </tr>
                <tr>
                    <th>혈액형</th>
                    <td>
                        ${uprinfList.BLOOD_TYPE}
                    </td>
                    <th>긴급 연락처</th>
                    <td>
                        ${uprinfList.EMG_TEL_NUM}
                    </td>
                </tr>
                <tr>
                    <th>취미</th>
                    <td>
                        ${uprinfList.HOBBY}
                    </td>
                    <th>특기</th>
                    <td>
                        ${uprinfList.SPECIALITY}
                    </td>
                </tr>
                <tr>
                    <th>종교</th>
                    <td>
                        ${uprinfList.RELIGION}
                    </td>
                    <th>신장</th>
                    <td>
                        ${uprinfList.HEIGHT}
                    </td>
                </tr>
                <tr>
                    <th>체중</th>
                    <td>
                        ${uprinfList.WEIGHT}
                    </td>
                    <th>시력</th>
                <c:if test="${uprinfList.VISIONL == null || uprinfList.VISIONR == ''}">
                    <td>
                        ${uprinfList.VISIONL}
                        ${uprinfList.VISIONR}
                    </td>
                </tr>
                </c:if>
                <c:if test="${uprinfList.VISIONL != null || uprinfList.VISIONR != null}">
                    <td>
                        좌 : ${uprinfList.VISIONL} /
                        우 : ${uprinfList.VISIONR}
                    </td>
                </c:if>
                <tr>
                    <th>최근수정일</th>
                    <td>
                        ${uprinfList.MOD_DATE}
                    </td>
                    <th>최근수정자</th>
                    <td>
                        ${uprinfList.MOD_EMP_SEQ}
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
</body>
