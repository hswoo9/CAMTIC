<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userViewTraineePop.js?v=1"></script>
<script type="text/javascript" src="/js/intra/common/solarToLunar.js?v=${today}"></script>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
            <c:if test="${params.empSeq != null && params.empSeq != ''}">
                <h3 class="card-title title_NM">직원 기본정보</h3>
                <div class="btn-st popButton">
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
                <%--<tr>
                    <th><span class="red-star"></span>사번</th>
                    <td>
                        ${uprinfList.ERP_EMP_SEQ}
                    </td>
                    <th rowspan="5"><span class="red-star"></span>증명사진</th>
                    <td rowspan="5" style="text-align: center">
                        <c:choose>
                            <c:when test="${idPhoto.file_path ne null}">
                                <img id="preview" style="width: 150px; height: 180px;" src="${idPhoto.file_path}${idPhoto.file_uuid}"/>
                            </c:when>
                            <c:otherwise>
                                <span>등록된 증명사진이 없습니다.</span>
                            </c:otherwise>
                        </c:choose>
                    </td>
                </tr>--%>
                <tr>
                    <th><span class="red-star"></span>소속</th>
                    <td>
                        캠틱
                    </td>
                    <th><span class="red-star"></span>직원구분</th>
                    <td>
                        <c:if test="${uprinfList.DIVISION == '0'}">
                            정규직원
                        </c:if>
                        <c:if test="${uprinfList.DIVISION == '4'}">
                            계약직원
                        </c:if>
                        <c:if test="${uprinfList.DIVISION == '3'}">
                            단기직원
                        </c:if>
                        <c:if test="${uprinfList.DIVISION == '1'}">
                            위촉직원
                        </c:if>
                        <c:if test="${uprinfList.DIVISION == '2'}">
                            연수생/학생연구원
                        </c:if>
                        <c:if test="${uprinfList.DIVISION == '10'}">
                            기타
                        </c:if>
                        <c:if test="${uprinfList.DIVISION == '9'}">
                            퇴사직원
                        </c:if>
                        <c:if test="${uprinfList.DIVISION_SUB == '3'}">
                            - 경비/환경
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star"></span>이름</th>
                    <td>
                        ${uprinfList.EMP_NAME_KR}
                    </td>
                    <th><span class="red-star"></span>아이디</th>
                    <td>
                        ${uprinfList.LOGIN_ID}
                    </td>
                </tr>
                <tr>
                    <th>주민등록번호</th>
                    <td>
                        ${fn:split(uprinfList.RES_REGIS_NUM, "-")[0]}-*******<span id="resRegisNum"></span>
                    </td>
                    <th>학위</th>
                    <td>
                        ${uprinfList.DEGREE_CODE}
                    </td>
                </tr>
                <tr>
                    <th>부서(실)</th>
                    <td>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
                            ${uprinfList.DEPT_NAME}
                        </c:if>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
                            ${uprinfList.PARENT_DEPT_NAME}
                        </c:if>
                    </td>
                    <th>부서(팀)</th>
                    <td>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
                        없음
                        </c:if>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
                            ${uprinfList.DEPT_TEAM_NAME}
                        </c:if>
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
                    <th>직무사항</th>
                    <td>
                        ${uprinfList.JOB_DETAIL}
                    </td>
                </tr>
                <tr>
                    <th>입사일자</th>
                    <td>
                        ${uprinfList.JOIN_DAY}
                    </td>
                    <th></th>
                    <td></td>
                    <%--<th>홈페이지 게시</th>
                    <td>
                        <c:if test="${uprinfList.HOME_PAGE_ACTIVE == 'Y'}">
                            게시
                        </c:if>
                        <c:if test="${uprinfList.HOME_PAGE_ACTIVE == 'N'}">
                            미게시
                        </c:if>
                    </td>--%>
                </tr>
                <tr>
                    <th>차량소유</th>
                    <td>
                        <c:if test="${uprinfList.CAR_ACTIVE == 'Y'}">
                            있음
                        </c:if>
                        <c:if test="${uprinfList.CAR_ACTIVE == 'N'}">
                            없음
                        </c:if>
                    </td>
                    <th>차량번호</th>
                    <td>
                        ${uprinfList.CAR_NUM}
                    </td>
                </tr>
                <tr>
                    <th>CAPS 번호</th>
                    <td>
                        ${uprinfList.CAPS_NUM}
                    </td>
                    <th></th>
                    <td></td>
                </tr>
                <%--<tr>
                    <th>계좌정보</th>
                    <td colspan="3">
                        더존코드 : ${uprinfList.DUZON_CODE} | [${uprinfList.BANK_NAME}] ${uprinfList.ACCOUNT_NUM} | 예금주 : ${uprinfList.ACCOUNT_HOLDER} | 개인카드 : ${uprinfList.ATT_CARD_NUM}
                        <c:if test="${uprinfList.WORK_STATUS_CODE eq 'Y'}">
                            <button type="button" class="k-button k-button-solid-info" onclick="userViewTraineePop.userAccountPop('${params.empSeq}')">수정</button>
                        </c:if>
                    </td>
                </tr>--%>
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
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">이력사항</th>
                </tr>
                <tr>
                    <th>협약기간</th>
                    <td>
                        ${uprinfList.CTR_ST_DAY} ~ ${uprinfList.CTR_EN_DAY}
                    </td>
                    <th>근무시간 /일</th>
                    <td>
                        ${uprinfList.WEEK_WORK_TIME} 시간
                    </td>
                </tr>
                <tr>
                    <th>협약 조건</th>
                    <td colspan="3">
                        ${uprinfList.CONTRACT}
                    </td>
                </tr>
                <tr>
                    <th>학교</th>
                    <td>
                        ${uprinfList.SCHOOL}
                    </td>
                    <th>학위</th>
                    <td>
                        ${uprinfList.DEGREE}
                    </td>
                </tr>
                <tr>
                    <th>학과</th>
                    <td>
                        ${uprinfList.DEPARTMENT}
                    </td>
                    <th>학년/학번</th>
                    <td>
                        ${uprinfList.GRADE} / ${uprinfList.STUDENT_ID}
                    </td>
                </tr>
                <tr>
                    <th>기능 및 자격</th>
                    <td colspan="3">
                        ${uprinfList.QUALIFICATION}
                    </td>
                </tr>
                <tr>
                    <th>특이사항</th>
                    <td colspan="3">
                        ${uprinfList.SIGNIFICANT}
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
</body>
<script>
    userViewTraineePop.defaultScript();
    $("#resRegisNum").text(" (" + userViewTraineePop.fn_setCalcAge('${uprinfList.RES_REGIS_NUM}') + "세)");
    $("#hire").text(userViewTraineePop.fn_sethire('${uprinfList.prev_hire}','${uprinfList.prev_hire_mon}','${uprinfList.hire}','${uprinfList.hire_mon}'));

    $(function(){
        var birthday = '${uprinfList.BDAY}';

        if(birthday != null && birthday != ""){
            var lunarDay = solarToLunar(birthday.split("-")[0], birthday.split("-")[1], birthday.split("-")[2]);

            $("#lunarBday").text("음력 " + lunarDay);
        }
    })
</script>
