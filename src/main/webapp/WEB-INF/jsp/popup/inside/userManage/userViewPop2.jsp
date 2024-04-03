<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userViewPop2.js?v=${today}"></script>
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
                <tr>
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
                        ${fn:split(uprinfList.RES_REGIS_NUM, "-")[0]}-*******<span id="resRegisNum"></span>
                    </td>
                </tr>
                <tr>
                    <th>직원구분</th>
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
                    </td>
                </tr>
                <tr>
                    <th>소속</th>
                    <td>
                        캠틱
                    </td>
                    <th>부서(실)</th>
                    <td>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
                            ${uprinfList.DEPT_NAME}
                        </c:if>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
                            ${uprinfList.PARENT_DEPT_NAME}
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>부서(팀)</th>
                    <td>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ == '1000'}">
                            없음
                        </c:if>
                        <c:if test="${uprinfList.DEPT_PARENT_SEQ != '1000'}">
                            ${uprinfList.DEPT_TEAM_NAME}
                        </c:if>
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
                        <c:if test="${uprinfList.OCCUPATION_CODE == '1'}">
                            R&D
                        </c:if>
                        <c:if test="${uprinfList.OCCUPATION_CODE == '2'}">
                            A&C
                        </c:if>
                        <c:if test="${uprinfList.OCCUPATION_CODE == '3'}">
                            P&M
                        </c:if>
                    </td>
                    <th>학위</th>
                    <td>
                        ${uprinfList.DEGREE_CODE}
                    </td>
                </tr>
                <tr>
                    <th>겸직</th>
                    <td colspan="3">
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
                    <th>과학기술인 번호</th>
                    <td>
                        ${uprinfList.SCIENCE_NO}
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
                        <c:if test="${uprinfList.LUNAR_CAL eq 'N'}">양력 ${uprinfList.BDAY}</c:if>
                        <c:if test="${uprinfList.LUNAR_CAL eq 'Y'}">음력 ${uprinfList.BDAY}</c:if>
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
                    <c:if test="${uprinfList.CAR_ACTIVE == Y}">
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
                <c:if test="${uprinfList.CAR_ACTIVE == 'Y'}">
                <tr>
                    <th>차량소유</th>
                    <td>
                        소유
                    </td>
                    <th>차량번호</th>
                    <td>
                        ${uprinfList.CAR_NUM}
                    </td>
                </tr>
                </c:if>
                <tr>
                    <th>결혼관계</th>
                    <td>
                        <c:if test="${uprinfList.WEDDING_ACTIVE ==  'Y'}">
                            기혼
                        </c:if>
                        <c:if test="${uprinfList.WEDDING_ACTIVE ==  'N'}">
                            미혼
                        </c:if>
                    </td>
                    <th>결혼기념일</th>
                    <td>
                        ${uprinfList.WEDDING_DAY}
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>
</body>
<script>
    userViewPop2.defaultScript();
    $("#resRegisNum").text(" (" + userViewPop2.fn_setCalcAge('${uprinfList.RES_REGIS_NUM}') + "세)");

    $(function(){
        var birthday = '${uprinfList.BDAY}';

        if(birthday != null && birthday != ""){
            var lunarDay = solarToLunar(birthday.split("-")[0], birthday.split("-")[1], birthday.split("-")[2]);

            $("#lunarBday").text("음력 " + lunarDay);
        }
    })
</script>
