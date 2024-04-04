<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-ocean-blue.min.css" />
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<% pageContext.setAttribute("CRLF", "\r\n"); %>
<% pageContext.setAttribute("LF", "\n"); %>

<style>
    .likeTab{display: flex; list-style: none; margin-top:30px; padding-left: 0;}
    .likeTab li{padding: 5px 18px; border-radius: 5px 5px 0 0; background-color: #6787b0; border: 1px solid #eee; font-weight: 600; cursor: pointer; font-size:13px; color: white; width: 125px; text-align: center;}
    .likeTab li:hover {background-color: #262b36;}
    .likeTab li.activeY {background-color: #262b36;}
    .k-input-md{font-size:12px;}
    .subTitSt{font-weight: 600; text-align: left; font-size: 13px; padding: 10px;}
    .table > thead > tr > th, .table > tfoot > tr > th{ background-color: #00397f96; color: white;}
    .table > thead > tr > td, .table > thead > tr > th{border: 1px solid #dee2e6;}
    #filePrint{float: right; margin-right: 25px;}

    .jb-text {
        padding: 15px 20px;
        background-color: #444444;
        border-radius: 5px;
        color: #ffffff;
        position: absolute;
        display: none;
        right: 34px;
        width: 200px;
    }

    .jb-title:hover + .jb-text {
        display: block;
    }
</style>


<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">인사기록카드</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 > 인사기록카드(관리자)</div><%--인사관리 관리자에서 버튼눌러서 접근하는 페이지--%>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <input type="button" id="filePrint" value="인쇄" onclick="userPrintPop(${uprList.empSeq});">
        <div class="panel-body">
            <input type="hidden">
            <div>
                <div id="tabstrip">
                    <ul class="likeTab">
                        <li id="TabA">인적 사항</li>
                        <li id="TabM">기본 정보</li>
                        <li id="TabB">학력 사항</li>
                        <li id="TabC">경력 사항</li>
                        <li id="TabD">병역 사항</li>
                        <li id="TabE">가족 사항</li>
                        <li id="TabF">보유 면허</li>
                        <li id="TabG">직무 사항</li>
                        <li id="TabH">발령 사항</li>
                        <li id="TabI">상벌 사항</li>
                        <li id="TabK">근무 평가</li>
                        <li id="TabJ">교육 사항</li>
                        <li id="TabL">제안 제도</li>
                    </ul>
                    <div id="infoModifyBtn" class="btn-st" style="margin-top:5px; margin-left: 1520px;">
                        <input type="button" class="k-button k-button-solid-info" value="수정" onclick="setInfoModify(${uprList.empSeq})"/>
                    </div>
                    <div class="empInfo">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="subTitSt">· 직원 기본 정보</div>
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
                                                    <input type="text" id="erpEmpSeq" name="erpEmpSeq" value="" disabled="disabled">
                                                    <input id="erpEmpSeq" name="erpEmpSeq">
                                                </c:when>
                                                <c:otherwise>
                                                    <input type="hidden" id="empSeq" name="empSeq" value="${uprList.empSeq}">
                                                    <input type="text" id="erpEmpSeq" name="erpEmpSeq" value="${uprList.erpEmpSeq}" disabled="disabled">
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
                                            <input type="text" id="bDay" name="bDay" class="userInfoDatePicker userInfoTextBox" value="${uprList.bDay}" style="width: 40%;">
                                        </td>
                                        <th>주민등록번호</th>
                                        <td>
                                            <input type="text" id="resRegisNum" name="resRegisNum" class="userInfoTextBox" placeholder="숫자만 입력" value="${uprList.resRegisNum}" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>[우편번호] 현주소</th>
                                        <td colspan="3">
                                            <input type="text" id="zipCode" name="zipCode" class="k-input k-textbox k-input-solid k-input-md userInfoTextBox" value="${uprList.zipCode}" style="width: 20%" placeholder="우편번호">
                                            <input type="text" id="addr" name="addr" class="k-input k-textbox k-input-solid k-input-md userInfoTextBox" style="width: 30%;margin-top: 3px;" value="${uprList.addr}" placeholder="도로명주소">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>
                                            <input type="text" id="officeTelNum" name="officeTelNum" class="userInfoTextBox" placeholder="숫자만 입력" value="${uprList.officeTelNum}" style="width: 50%;">
                                        </td>
                                        <th>긴급 연락처</th>
                                        <td>
                                            <input type="text" id="emgTelNum" name="emgTelNum" class="userInfoTextBox" placeholder="숫자만 입력" value="${uprList.emgTelNum}" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>차량 소유</th>
                                        <td id="carActive">
                                        </td>
                                        <th>차량 번호</th>
                                        <td>
                                            <input type="text" id="carNum" name="carNum" value="${uprList.carNum}" class="userInfoTextBox" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>계좌정보</th>
                                        <td colspan="3">
                                            <input type="text" id="ACCOUNT_NUM" name="" placeholder="" class="userInfoTextBox" value="${uprList.BANK_NAME} ${uprList.ACCOUNT_NUM}"  style="width: 100%;">

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
                                            <input type="text" id="hire" class="userInfoTextBox" name="" value="" style="width: 100%;">
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
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="1%">
                                        <col width="5%">
                                        <col width="9%">
                                        <col width="15%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="5%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th><input type='checkbox' name='eduAllChk' id="eduAllChk" <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'eduChk')"></th>
                                        <th>번호</th>
                                        <th>구분</th>
                                        <th>기간</th>
                                        <th>학교 및 학과</th>
                                        <th>학위</th>
                                        <th>졸업</th>
                                        <th>성적</th>
                                        <th>학위 증명서</th>
                                        <th>성적 증명서</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${eList}" varStatus="status">
                                        <c:if test="${l.EDUCATIONAL_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>
                                                    <input type='checkbox' name='eduChk' id='edu${l.EDUCATIONAL_ID}' <%--class='k-checkbox checkbox eduCheckBox'--%>>
                                                </td>
                                                <td>${status.index + 1}</td>
                                                <td>${l.GUBUN_CODE_NM}</td>
                                                <td>${l.ADMISSION_DAY}~${l.GRADUATION_DAY}</td>
                                                <td>${l.SCHOOL_NAME}</td>
                                                <td>${l.DEGREE_CODE_NM}</td>
                                                <td>${l.GRADUATION_CODE_NM}</td>
                                                <td>${l.SCORE}</td>
                                                <c:if test="${l.gradeFile == null}">
                                                    <td></td>
                                                </c:if>
                                                <c:if test="${l.gradeFile ne null}">
                                                <td style="cursor: pointer">
                                                  <img src="/images/ico/file.gif" onclick="fileDown('${l.gradeFile.file_path}${l.gradeFile.file_uuid}', '${l.gradeFile.file_org_name}.${l.gradeFile.file_ext}')">
                                                </td>
                                                </c:if>
                                                <c:if test="${l.socreFile == null}">
                                                    <td></td>
                                                </c:if>
                                                <c:if test="${l.socreFile ne null}">
                                                <td style="cursor: pointer">
                                                    <img src="/images/ico/file.gif" onclick="fileDown('${l.socreFile.file_path}${l.socreFile.file_uuid}', '${l.socreFile.file_org_name}.${l.socreFile.file_ext}')">
                                                </td>
                                                </c:if>
                                                <td>${l.RMK}</td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
                                           <%-- <tr>
                                                <td>
                                                    &lt;%&ndash;<input type='checkbox' name='eduChk' id='edu${l.EDUCATIONAL_ID}' &lt;%&ndash;class='k-checkbox checkbox eduCheckBox'&ndash;%&gt;>&ndash;%&gt;
                                                </td>
                                                <td>${status.index + 1}</td>
                                                <td>
                                                    <input type="text" id="gubun" style="width: 50%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="sDate" style="width: 45%;"> ~ <input type="text" id="eDate" style="width: 45%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="school" style="width: 50%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="gkrdnl" value="test" style="width: 50%;">
                                                </td>

                                                <td style="cursor: pointer">
                                                    <input type="file">
                                                </td>
                                                <td style="cursor: pointer">
                                                    <input type="file">
                                                </td>
                                                <td>
                                                    <input type="text" id="whfdjq" style="width: 50%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="score" style="width: 50%;">
                                                </td>
                                                <td>
                                                    <textarea name="bmk" id="bmk" placeholder="비고" style="width: 100%;"></textarea>
                                                </td>
                                            </tr>--%>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="careerInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 경력 사항</div>
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
                                        <th>
                                            <input type='checkbox' name='employAllChk' id="employAllChk" <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'employChk')">
                                        </th>
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
                                        <c:if test="${l.CAREER_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td><input type='checkbox' name='employChk' id='employ${l.CAREER_ID}' <%--class='k-checkbox checkbox'--%>></td>
                                                <td>${status.index + 1}</td>
                                                <td>${l.JOIN_DAY} ~ ${l.RESIGN_DAY}</td>
                                                <td>${l.EMPLOY_DEPT_NAME}</td>
                                                <td>${l.POSITION_OR_DUTY}</td>
                                                <td>${l.MAIN_TASK}</td>
                                                <td>
                                                    <c:if test="${l.CAREER_PERIOD ne null and l.CAREER_PERIOD ne ''}">
                                                        ${l.CAREER_PERIOD}년
                                                    </c:if>
                                                    <c:if test="${l.CAREER_MONTH ne null and l.CAREER_MONTH ne ''}">
                                                        ${l.CAREER_MONTH}개월
                                                    </c:if>
                                                </td>
                                                    <c:if test="${l.addFile == null}">
                                                        <td></td>
                                                    </c:if>
                                                    <c:if test="${l.addFile ne null}">
                                                    <td style="cursor: pointer">
                                                        <img src="/images/ico/file.gif" onclick="fileDown('${l.addFile.file_path}${l.addFile.file_uuid}', '${l.addFile.file_org_name}.${l.addFile.file_ext}')">
                                                    </td>
                                                    </c:if>
                                                <td><p class="jb-title">보기</p><div class="jb-text">${l.RMK}</div></td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="armyInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt" id="mText">· 병역 사항</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" id="mTable">
                                    <colgroup>
                                        <col width="15%">
                                        <col width="35%">
                                        <col width="15%">
                                        <col width="35%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <input type="hidden" id="mCk" value="${mInfo.MILITARY_SVC_TYPE}">
                                        <th>전역 여부</th>
                                        <td>${mInfo.MILITARY_SVC_TYPE_NM}</td>
                                        <th>사유</th>
                                        <td>${mInfo.M_UNFUL_REASON}</td>
                                    </tr>
                                    <tr>
                                        <th>복무기간</th>
                                        <td>
                                            ${mInfo.M_ENLIST_DAY} ~ ${mInfo.M_DISCHARGE_DAY}
                                        </td>
                                        <th>최종계급</th>
                                        <td>
                                            ${mInfo.M_LAST_RANK}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>군별</th>
                                        <td>
                                            ${mInfo.M_DIVISION}
                                        </td>
                                        <th>병과</th>
                                        <td>
                                            ${mInfo.MOS}
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="familyInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 가족 사항</div>
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
                                        <th>
                                            <input type='checkbox' name='familyAllChk' id="familyAllChk" <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'familyChk')">
                                        </th>
                                        <th>번호</th>
                                        <th>관계</th>
                                        <th>성명</th>
                                        <th>생년월일</th>
                                        <th>직업</th>
                                        <th>동거여부</th>
                                    </tr>
                                    <c:forEach var="l" items="${fList}" varStatus="status">
                                        <c:if test="${l.FAMILY_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>
                                                    <input type='checkbox' name='familyChk' id='familyChk${l.FAMILY_ID}' <%--class='k-checkbox checkbox'--%>>
                                                </td>
                                                <td>${status.index + 1}</td>
                                                <td>${l.FAMILY_CODE_TYPE_NM}</td>
                                                <td>${l.FAMILY_NAME}</td>
                                                <td>${l.FAMILY_BIRTH}</td>
                                                <td>${l.FAMILY_JOB}</td>
                                                <td>${l.INCLUDE_TXT}</td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="certificateInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 보유 면허</div>
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
                                        <th>
                                            <input type='checkbox' name='certAllChk' id="certAllChk" <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'certChk')">
                                        </th>
                                        <th>번호</th>
                                        <th>종류</th>
                                        <th>취득일</th>
                                        <th>자격번호</th>
                                        <th>발급기관</th>
                                        <th>증명서</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${lList}" varStatus="status">
                                        <c:if test="${l.CERTIFICATE_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td><input type='checkbox' name='certChk' id='certChk${l.CERTIFICATE_ID}' <%--class='k-checkbox checkbox'--%>></td>
                                                <td>${status.index + 1}</td>
                                                <td>${l.CERTIFICATE_NAME}</td>
                                                <td>${l.ACQUISITION_DAY}</td>
                                                <td>${l.CERTIFICATE_NUM}</td>
                                                <td>${l.ISSUER}</td>
                                                <c:if test="${l.certificateAddFile == null}">
                                                    <td></td>
                                                </c:if>
                                                <c:if test="${l.certificateAddFile ne null}">
                                                <td style="cursor: pointer">
                                                    <img src="/images/ico/file.gif" onclick="fileDown('${l.certificateAddFile.file_path}${l.certificateAddFile.file_uuid}', '${l.certificateAddFile.file_org_name}.${l.certificateAddFile.file_ext}')">
                                                </td>
                                                </c:if>
                                                <td>${l.RMK}</td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="dutiesInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 직무 사항</div>
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
                                        <th><input type='checkbox' name='dutyInfoAllChk' id='dutyInfoAllChk' <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'dutyInfoChk')"></th>
                                        <th>번호</th>
                                        <th>근무 기간</th>
                                        <th>주요 직무</th>
                                        <th>직급</th>
                                    </tr>
                                    <c:forEach var="l" items="${dList}" varStatus="status">
                                        <c:if test="${l.DUTY_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td><input type='checkbox' name='dutyInfoChk' id='dutyInfoChk${l.DUTY_ID}' <%--class='k-checkbox checkbox'--%>></td>
                                                <td>${status.index + 1}</td>
                                                <td>${l.WORK_JOIN_DAY}~${l.WORK_LEAVE_DAY}</td>
                                                <td>${l.DUTY_DETAIL}</td>
                                                <td>${l.POSITON_NAME}</td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 발령 사항</div>
                            <div id="orderInfoBtn" class="btn-st" style="margin-top:5px; /*display:none;*/">
                                <%--<input type="button" class="k-button k-button-solid-info" value="추가" onclick="addAppointingBtn(empSeq.value)"/>
                                <input type="button" class="k-button k-button-solid-info" value="수정" onclick=""/>
                                <input type="button" class="k-button k-button-solid-info" value="삭제" onclick=""/>--%>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="6%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="45%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>발령 구분</th>
                                        <th>발령 일자</th>
                                        <th>발령 사항</th>
                                        <th>비고</th>
                                    </tr>
                                    <c:forEach var="l" items="${aList}" varStatus="status">
                                        <tr>
                                            <td>${status.index + 1}</td>
                                            <td>${l.APNT_NAME}</td>
                                            <td>${l.historyDt}</td>
                                            <td>${l.AF_DEPT_NAME} ${l.AF_TEAM_NAME} ${l.AF_POSITION_NAME} ${l.AF_DUTY_NAME}</td>
                                            <td>${l.ETC}</td>
                                        </tr>
                                    </c:forEach>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="rewardpunishmentInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 상벌 사항</div>
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
                                        <th>
                                            <input type='checkbox' name='rewordAllChk' id='rewordAllChk#=REWORD_ID#' name='rewordAllChk' value='#=REWORD_ID#' <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'rewordChk')">
                                        </th>
                                        <th>번호</th>
                                        <th>내/외부</th>
                                        <th>포상/징계 구분</th>
                                        <th>포상/징계 일자</th>
                                        <th>공적 (징계) 사항</th>
                                        <th>시행처</th>
                                        <th>증명서</th>
                                    </tr>
                                    <c:forEach var="l" items="${rList}" varStatus="status">
                                        <c:if test="${l.REWORD_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td><input type='checkbox' name='rewordChk' id='rewordChk${l.REWORD_ID}' <%--class='k-checkbox checkbox'--%>></td>
                                                <td>${status.index + 1}</td>
                                                <td>
                                                    <c:choose>
                                                        <c:when test="${l.REWORD_TYPE eq '0'}">
                                                            내부
                                                        </c:when>
                                                        <c:otherwise>
                                                            외부
                                                        </c:otherwise>
                                                    </c:choose>
                                                </td>
                                                <td>${l.REWORD_TYPE_NAME1}</td>
                                                <td>${l.REWORD_DAY}</td>
                                                <td>${l.RWD_OFM}</td>
                                                <td>${l.RWD_ST_COMP}</td>
                                                <c:if test="${l.rewardAddFile == null}">
                                                    <td></td>
                                                </c:if>
                                                <c:if test="${l.rewardAddFile ne null}">
                                                <td style="cursor: pointer">
                                                    <img src="/images/ico/file.gif" onclick="fileDown('${l.rewardAddFile.file_path}${l.rewardAddFile.file_uuid}', '${l.rewardAddFile.file_org_name}.${l.rewardAddFile.file_ext}')">
                                                </td>
                                                </c:if>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
                                    <%--<c:forEach var="l" items="${RewordList}" varStatus="status">
                                        <c:if test="${l.REWORD_ID ne null}">
                                            <tr>
                                                <td><input type='checkbox' name='rewordChk2' id='rewordChk2${l.REWORD_ID}' class='k-checkbox checkbox'></td>
                                                <td>${status.index + 1}</td>
                                                <td>${l.SIDE_NAME}</td>
                                                <td>${l.REWORD_TYPE_NAME1}</td>
                                                <td>${l.REWORD_DAY}</td>
                                                <td>${l.RWD_OFM}</td>
                                                <td>${l.RWD_ST_COMP}</td>
                                                <td></td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>--%>
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
                                        <td>${sInfo.PERSONAL_COUNT}건</td>
                                        <td>${sInfo.COMMON_EDU_COUNT}건</td>
                                        <td>${sInfo.STUDY_COUNT}건</td>
                                        <td>${sInfo.PROPAG_COUNT}건</td>
                                        <td>${sInfo.OJT_COUNT}건</td>
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
<%--                                    <tr>--%>
<%--                                        <td></td>--%>
<%--                                        <td>공통교육</td>--%>
<%--                                        <td>23/03/28~23/03/28</td>--%>
<%--                                        <td>2023년 3월 캠-퍼스 공통학습(캠.화.지)</td>--%>
<%--                                        <td>1층 첨단누리홀</td>--%>
<%--                                    </tr>--%>
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
<%--                                    <tr>--%>
<%--                                        <td></td>--%>
<%--                                        <td></td>--%>
<%--                                        <td></td>--%>
<%--                                        <td></td>--%>
<%--                                        <td></td>--%>
<%--                                        <td></td>--%>
<%--                                    </tr>--%>
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
<%--                                    <tr>--%>
<%--                                        <td></td>--%>
<%--                                        <td>2022</td>--%>
<%--                                        <td>역량평가 (1차)</td>--%>
<%--                                        <td>2022-01-01 ~ 2022-06-30</td>--%>
<%--                                        <td>81.2</td>--%>
<%--                                        <td>A</td>--%>
<%--                                    </tr>--%>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 직원 면담 카드</div>

                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="6%">
                                        <col width="13%">
                                        <col width="13%">
                                        <col width="11%">
                                        <col width="18%">
                                        <col width="13%">
                                      <%--  <col width="9%">
                                        <col width="9%">
                                        <col width="8%">--%>
                                    </colgroup>
                                    <thead class="getInterviewCardList ">
                                    <tr>
                                        <th>순번</th>
                                        <th>부서명</th>
                                        <th>팀명</th>
                                        <th>피면담자</th>
                                        <th>면담일시</th>
                                        <th>면담자</th>
                                       <%-- <th>차상급자</th>
                                        <th>차차상급자</th>
                                        <th>상태</th>--%>
                                    </tr>


                                    <tr class="tr">
<%--                                        <td class="card_number"></td>--%>
<%--                                        <td class="dept_name"></td>--%>
<%--                                        <td class="dept_team_name"></td>--%>
<%--                                        <td class="emp_name_kr"></td>--%>
<%--                                        <td class="card_interview_date"></td>--%>
<%--                                        <td class="card_interviewer"></td>--%>
<%--                                        <td class="card_superior_person"></td>--%>
<%--                                        <td class="card_superior_person2"></td>--%>
<%--                                        <td class="card_status"></td>--%>
                                    </tr>
                                    </thead>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="proposalInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 제안 제도</div>
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
                                        <th>
                                            <input type='checkbox' name='propAllChk' id='propAllChk' <%--class='k-checkbox checkbox'--%> onclick="chkBoxAllChk(this, 'propChk')">
                                        </th>
                                        <th>번호</th>
                                        <th>구분</th>
                                        <th>년월일</th>
                                        <th>주요 제안 내용</th>
                                        <th>현재 상태</th>
                                    </tr>
                                    <c:forEach var="l" items="${pList}" varStatus="status">
                                        <c:choose>
                                            <c:when test="${l.PROPOSAL_ID eq null or l.ADMIN_APPROVAL eq 'N'}">

                                            </c:when>
                                            <c:otherwise>
                                                <tr>
                                                    <td>
                                                        <input type='checkbox' name='propChk' id='propChk${l.PROPOSAL_ID}' <%--class='k-checkbox checkbox'--%> >
                                                    </td>
                                                    <td>${status.index + 1}</td>
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
                    <div class="cardEtcInfo">
                        <div style="display:flex;justify-content: space-between;">
                            <div class="subTitSt">· 비고</div>
                        </div>
                        <div class="table-responsive">
                            <div>
                                <table class="searchTable table" style="text-align:center;">
                                    <colgroup>
                                        <col width="100%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>내용</th>
                                    </tr>
                                    <tr>
                                        <td style="text-align: left">
                                            ${fn:replace(fn:replace(fn:escapeXml(uprList.cardEtc), CRLF, '<br/>'), LF, '<br/>')}
                                        </td>
                                    </tr>
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
    /** 군필 아닐시 병역사항 숨김및 해당없음 표기 */
    if($("#mCk").val() == ""){
        $("#mTable").hide();
        $("#mText").text("· 병역 사항(해당없음)");
    }

    $("#hire").val(fn_sethire('${uprList.prev_hire}','${uprList.prev_hire_mon}','${uprList.hire}','${uprList.hire_mon}'));
    function fn_sethire(prevHire, prevHireMon, hire, hireMon){
        var totalHire = parseInt(prevHire) + parseInt(hire);
        var totalHireMon = parseInt(prevHireMon) + parseInt(hireMon);
        if(totalHireMon > 12){
            totalHire = parseInt(totalHire) + parseInt(String(totalHireMon/12).split(".")[0]);
            totalHireMon = totalHireMon%12;
        }
        return totalHire + "년 " + totalHireMon + "개월 (전직경력 : " + prevHire + "년 " + prevHireMon + "개월 + 현직경력 : " + hire + "년 " + hireMon + "개월)" ;
    }

    $(function(){
        $("#TabA").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .eduInfo .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "block");
            $("#empInfoBtn, #eduInfoBtn, #careerInfoBtn, #armyInfoBtn, #familyInfoBtn, #certificateInfoBtn, #dutiesInfoBtn, #orderInfoBtn, #rewardpunishmentInfoBtn, #lifelonglearningInfoBtn, #workevaluationInfoBtn, #proposalInfoBtn").css("display", "none");
        });
        $("#TabB").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".eduInfo, #eduInfoBtn").css("display", "block");
        });
        $("#TabC").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .eduInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".careerInfo, #careerInfoBtn").css("display", "block");
        });
        $("#TabD").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .eduInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".armyInfo, #armyInfoBtn").css("display", "block");
        });
        $("#TabE").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .eduInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".familyInfo, #familyInfoBtn").css("display", "block");
        });
        $("#TabF").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .eduInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".certificateInfo, #certificateInfoBtn").css("display", "block");
        });
        $("#TabG").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .eduInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".dutiesInfo, #dutiesInfoBtn").css("display", "block");
        });
        $("#TabH").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .eduInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".orderInfo, #orderInfoBtn").css("display", "block");
        });
        $("#TabI").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .eduInfo, .lifelonglearningInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".rewardpunishmentInfo, #rewardpunishmentInfoBtn").css("display", "block");
        });
        $("#TabJ").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .eduInfo, .workevaluationInfo, .proposalInfo").css("display", "none");
            $(".lifelonglearningInfo, #lifelonglearningInfoBtn").css("display", "block");
        });
        $("#TabK").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .eduInfo, .proposalInfo").css("display", "none");
            $(".workevaluationInfo, #workevaluationInfoBtn").css("display", "block");
        });
        $("#TabL").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".empInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .eduInfo").css("display", "none");
            $(".proposalInfo, #proposalInfoBtn").css("display", "block");
        });
        $("#TabM").on("click",function(){
            $(".likeTab li.activeY").removeClass("activeY");
            $(this).addClass("activeY");
            $(".eduInfo, .careerInfo, .armyInfo, .familyInfo, .certificateInfo, .dutiesInfo, .orderInfo, .rewardpunishmentInfo, .lifelonglearningInfo, .workevaluationInfo, .eduInfo, .proposalInfo").css("display", "none");
            $(".empInfo, #empInfoBtn").css("display", "block");
        });

        $(".userInfoTextBox").kendoTextBox();
        // $("#addrDetail, #addrReferences, #mobileTelNum, #officeTelNum").kendoTextBox();

        if("${uprList.carActive}" == "Y") {
            $("#carActive").text("예");
        }else{
            $("#carActive").text("아니오");
        }

        $.each($(".userInfoTextBox input"), function(){
            if($("#regEmpSeq").val() != $("#empSeq").val() || !$(this).hasClass("notDisabled")){
                $(this).data("kendoTextBox").enable(false);
            }
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
            if($("#regEmpSeq").val() != $("#empSeq").val() || !$(this).hasClass("notDisabled")){
                $(this).data("kendoDatePicker").enable(false);
            }
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


    function setBasicInfo(){
        if(confirm("저장하시겠습니까?")){
            var data = {
                empNameCn : $("#empNameCn").val(),
                bDay : $("#bDay").val(),
                zipCode : $("#zipCode").val(),
                addr : $("#addr").val(),
                oldAddr : $("#oldAddr").val(),
                addrDetail : $("#addrDetail").val(),
                officeTelNum : $("#officeTelNum").val(),
                emgTelNum : $("#emgTelNum").val(),
                carActive : $("#carActive").data("kendoRadioGroup").value() != null ? $("#carActive").data("kendoRadioGroup").value() : "N",
                carNum : $("#carNum").val(),
                empSeq : $("#empSeq").val(),
                regEmpSeq : $("#regEmpSeq").val(),
            }

            var result = customKendo.fn_customAjax("/inside/setBasicInfo.do", data);
            if(result.flag){
                alert("저장되었습니다.");
                open_in_frame('/Inside/userPersonnelRecord.do');
            }

        }
    }

    function setInfoModify(empSeq){
        open_in_frame('/Inside/userPersonnelRecordModify.do?empSeq='+ empSeq + '&admin=Y');
    }
    //학력 degree
    //경력 careerInfo
    //병역 military
    //가족 family
    //면허 license
    //직무 job
    //발령 appointing
    //상벌 reward
    //교육 edu
    //근무평가 workEval
    //제안제도 proposal
    //학력추가

    function chkBoxAllChk(e, chkName){
        if($(e).is(":checked")) $("input[name=" + chkName + "]").prop("checked", true);
        else $("input[name=" + chkName + "]").prop("checked", false);
    }

    //학력추가
    function addDegreeBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=degree";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);

        // 페이지가 열린 후 버튼을 숨깁니다.
        popup.onload = function() {
            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info:nth-child(n+2)');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = 'none';
            }
        }
    }
    //경력추가
    function addCareerBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=career";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);

        // 페이지가 열린 후 버튼을 숨깁니다.
        popup.onload = function() {
            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info:nth-child(n+2)');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = 'none';
            }
        }
    }
    //병역추가
    function addMilitaryBtn(e) {
        var url = "/useManage/userPersonnelRecordPop.do?popName=military";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);

        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '병역 등록';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 0) ? 'inline-block' : 'none';
            }
        }
    }
    //가족추가
    function addFamilyBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=family";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);

        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '가족 등록';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 0) ? 'inline-block' : 'none';
            }
        }
    }
    //보유면허추가
    function addLicenseBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=license";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);

        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '보유면허 추가';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 0) ? 'inline-block' : 'none';
            }
        }
    }
    //직무사항추가
    function addJobBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=job";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '직무사항 추가';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 0) ? 'inline-block' : 'none';
            }
        }
    }
    /*//발령사항추가
    function addAppointingBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=appointing";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }*/
    //상벌사항추가
    function addRewardBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=reward";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '상벌 사항 추가';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 0) ? 'inline-block' : 'none';
            }
        }
    }
    //교육사항추가
    function addEduBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=edu";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //근무평가추가
    function addWorkEvalBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=workEval";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
    //제안제도추가
    function addProposalBtn() {
        var url = "/useManage/userPersonnelRecordPop.do?popName=proposal";
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '제안 제도 추가';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for(var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 0) ? 'inline-block' : 'none';
            }
        }
    }

    //인사기록카드 - 학력 사항 수정
    function updateDegreeBtn() {
        if ($('input[name=eduChk]:checked').length == 0) {
            alert("수정할 항목을 선택해주세요.");
        } else if ($('input[name=eduChk]:checked').length > 1) {
            alert("한개의 항목만 선택해주세요.");
        } else {
            var eduChk = new Array();
            $("input[name='eduChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("edu", "");
                    eduChk.push(id);
                }
            })

            var url = "/useManage/userPersonnelRecordPop.do?popName=degree" + "&pk=" + eduChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '학력 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }
                var tds = popup.document.querySelectorAll('tr');
                for(var i = 0; i < tds.length; i++) {
                    tds[i].setAttribute('disabled', 'true');
                }
                $("#gubun").data("kendoDropDownList").enable(false);
            }
        }
    }
    //인사기록카드 - 학력 사항 삭제
    /*
    function delDegreeBtn() {
        if ($('input[name=eduChk]:checked').length == 0) {
            alert("삭제할 항목을 선택해주세요.");
        } else if ($('input[name=eduChk]:checked').length > 1) {
            alert("한개의 항목만 선택해주세요.");
        } else {
            var eduChk = new Array();
            $("input[name='eduChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("edu", "");
                    eduChk.push(id);
                }
            })

            var url = "/useManage/userPersonnelRecordPop.do?popName=degree" + "&pk=" + eduChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function () {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '학력 삭제';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 2) ? 'inline-block' : 'none';
                }
            }
        }
    }
    */

    //인사기록카드 - 학력사항삭제 요청(_Tmp 테이블로 카피)
    function delDegreeBtn() {
        if($('input[name=eduChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var eduChk = new Array();
        $("input[name='eduChk']").each(function(){
            if(this.checked){
                var id = $(this).attr("id"); // id 속성 값
                var eduId = parseInt(id.replace("edu", ""), 10); // "edu"를 제거하고 정수로 변환
                eduChk.push(eduId);
            }
        })

          $.ajax({
            type: "POST",
            url: "/userManage/setEduDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { eduChk: eduChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                alert("삭제 요청이 완료되었습니다.")
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                alert("삭제 요청이 실패했습니다.")
            }
        });
    }

    //인사기록카드 - 경력 사항 수정
    function updateCareerBtn() {
        if($('input[name=employChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=employChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var employChk = new Array();
            $("input[name='employChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("employ", "");
                    employChk.push(id);
                }
            })

            var url = "/useManage/userPersonnelRecordPop.do?popName=career" + "&pk=" + employChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '경력 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }
                var tds = popup.document.querySelectorAll('tr');
                for(var i = 0; i < tds.length; i++) {
                    tds[i].setAttribute('disabled', 'true');
                }
            }
        }
    }

    //인사기록카드 - 경력 사항 삭제 요청(_Tmp 테이블로 카피)
    function delCareerBtn() {
        if($('input[name=employChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var employChk = new Array();
        $("input[name='employChk']").each(function(){
            if(this.checked){
                var id = $(this).attr("id").replace($(this).attr("name"), "");
                id = id.replace("employ", "");
                employChk.push(id);
                //employChk.push(parseInt($(this).attr("id").replace($(this).attr("name"), ""),10));
            }
        })

        $.ajax({
            type: "POST",
            url: "/userManage/setCareerDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { employChk:employChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                console.log(employChk);
                alert("삭제 요청이 완료되었습니다.");
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                console.log(employChk);
                alert("삭제 요청이 실패했습니다.");
            }
        });
    }

    /*
    //인사기록카드 - 경력 사항 삭제
    function delCareerBtn() {
        if($('input[name=employChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=employChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var employChk = new Array();
            $("input[name='employChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("employ", "");
                    employChk.push(id);
                }
            })

            var url = "/useManage/userPersonnelRecordPop.do?popName=career" + "&pk=" + employChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '경력 삭제';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 2) ? 'inline-block' : 'none';
                }


            }
        }
    }
     */

    //인사기록카드 - 병역 사항 수정
    function updateMilitaryBtn(e) {
        var url = "/useManage/userPersonnelRecordPop.do?popName=military&msiInfoId=" + e;
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);

        popup.onload = function() {
            var titleElement = popup.document.querySelector('.card-title.title_NM');
            titleElement.textContent = '병역 수정';

            var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
            }
        }
    }


    //인사기록카드 - 가족 사항 수정
    function updateFamilyBtn() {
        if($('input[name=familyChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=familyChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var familyChk = new Array();
            $("input[name='familyChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("family", "");
                    familyChk.push(id);
                }
            })

            var url = "/useManage/userPersonnelRecordPop.do?popName=family" + "&pk=" + familyChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '가족사항 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }

            }
        }
    }

    /*//인사기록카드 - 가족 사항 삭제
    function delFamilyBtn() {
        if($('input[name=familyChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var familyChk = new Array();
        $("input[name='familyChk']").each(function(){
            if(this.checked){
                familyChk.push($(this).attr("id").replace($(this).attr("name"), ""));
            }
        })

        $.ajax({
            url : '/userManage/setFamilyDelete',
            data : {
                familyChk : familyChk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
            }
        });
    }*/

    //인사기록카드 - 가족사항삭제 요청(_Tmp 테이블로 카피)
    function delFamilyBtn() {
        if($('input[name=familyChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var familyChk = new Array();
        $("input[name='familyChk']").each(function(){
            if(this.checked){
                //var id = $(this).attr("id"); // id 속성 값
                //var familyId = parseInt(id.replace("family", ""), 10); // "family"를 제거하고 정수로 변환
                //familyChk.push(familyId);
                familyChk.push(parseInt($(this).attr("id").replace($(this).attr("name"), ""),10));
            }
        })

        $.ajax({
            type: "POST",
            url: "/userManage/setFamilyDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { familyChk:familyChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                console.log(familyChk);
                alert("삭제 요청이 완료되었습니다.");
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                console.log(familyChk);
                alert("삭제 요청이 실패했습니다.");
            }
        });
    }

    //인사기록카드 - 보유 면허 수정
    function updateLicenseBtn() {
        if($('input[name=certChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=certChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var certChk = new Array();
            $("input[name='certChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("cert", "");
                    certChk.push(id);
                }
            })

            var url = "/useManage/userPersonnelRecordPop.do?popName=license" + "&pk=" + certChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '보유 면허 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }

            }
        }
    }

    //인사기록카드 - 보유면허 삭제 요청(_Tmp 테이블로 카피)
    function delLicenseBtn() {
        if($('input[name=certChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var certChk = new Array();
        $("input[name='certChk']").each(function(){
            if(this.checked){
                certChk.push(parseInt($(this).attr("id").replace($(this).attr("name"), ""),10));
            }
        })

        $.ajax({
            type: "POST",
            url: "/userManage/setLicenseDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { certChk:certChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                console.log(certChk);
                alert("삭제 요청이 완료되었습니다.");
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                console.log(certChk);
                alert("삭제 요청이 실패했습니다.");
            }
        });
    }

   /* //인사기록카드 - 보유 면허 삭제
    function delLicenseBtn() {
        if($('input[name=certChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var certChk = new Array();
        $("input[name='certChk']").each(function(){
            if(this.checked){
                certChk.push($(this).attr("id").replace($(this).attr("name"), ""));
            }
        })

        $.ajax({
            url : '/userManage/setLicenseDelete',
            data : {
                certChk : certChk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
            }
        });
    }
    */

    //인사기록카드 - 직무 사항 수정
    function updateJobBtn() {
        if($('input[name=dutyInfoChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=dutyInfoChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var dutyInfoChk = new Array();
            $("input[name='dutyInfoChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("dutyInfo", "");
                    dutyInfoChk.push(id);
                }
            })
            var url = "/useManage/userPersonnelRecordPop.do?popName=job" + "&pk=" + dutyInfoChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '직무 사항 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }
            }
        }
    }

    //인사기록카드 - 직무 사항 삭제 요청(_Tmp 테이블로 카피)
    function delJobBtn() {
        if($('input[name=dutyInfoChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var dutyInfoChk = new Array();
        $("input[name='dutyInfoChk']").each(function(){
            if(this.checked){
                dutyInfoChk.push(parseInt($(this).attr("id").replace($(this).attr("name"), ""),10));
            }
        })

        $.ajax({
            type: "POST",
            url: "/userManage/setJobDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { dutyInfoChk:dutyInfoChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                console.log(dutyInfoChk);
                alert("삭제 요청이 완료되었습니다.");
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                console.log(dutyInfoChk);
                alert("삭제 요청이 실패했습니다.");
            }
        });
    }


    /*
    //인사기록카드 - 직무 사항 삭제
    function delJobBtn() {
        if($('input[name=dutyInfoChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var dutyInfoChk = new Array();
        $("input[name='dutyInfoChk']").each(function(){
            if(this.checked){
                dutyInfoChk.push($(this).attr("id").replace($(this).attr("name"), ""));
            }
        })

        $.ajax({
            url : '/userManage/setJobDelete',
            data : {
                dutyInfoChk : dutyInfoChk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
            }
        });
    }
     */

    //인사기록카드 - 상벌 사항 수정
    function updateRewardBtn() {
        if($('input[name=rewordChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=rewordChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var rewordChk = new Array();
            $("input[name='rewordChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("reword", "");
                    rewordChk.push(id);
                }
            })
            var url = "/useManage/userPersonnelRecordPop.do?popName=reward" + "&pk=" + rewordChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);

            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '상벌 사항 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }
            }
        }
    }

    //인사기록카드 - 상벌 사항 삭제 요청(_Tmp 테이블로 카피)
    function delRewardBtn() {
        if($('input[name=rewordChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var rewordChk = new Array();
        $("input[name='rewordChk']").each(function(){
            if(this.checked){
                rewordChk.push(parseInt($(this).attr("id").replace($(this).attr("name"), ""),10));
            }
        })

        $.ajax({
            type: "POST",
            url: "/userManage/setRewordDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { rewordChk:rewordChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                console.log(rewordChk);
                alert("삭제 요청이 완료되었습니다.");
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                console.log(rewordChk);
                alert("삭제 요청이 실패했습니다.");
            }
        });
    }

    /*
    //인사기록카드 - 상벌 사항 삭제
    function delRewardBtn() {
        if($('input[name=rewordChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var rewordChk = new Array();
        $("input[name='rewordChk']").each(function(){
            if(this.checked){
                rewordChk.push($(this).attr("id").replace($(this).attr("name"), ""));
            }
        })

        $.ajax({
            url : '/userManage/setRewordDelete',
            data : {
                rewordChk : rewordChk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
            }
        });
    }
     */

    // 인사기록카드 - 직원 면담 카드 조회

    $(document).ready(function() {
        var empSeq = $("#empSeq").val();
        retrieveData3(empSeq);
    });

    function retrieveData3(empSeq) {
        // empSeq를 서버로 전송
        $.ajax({
            type: "POST",
            url: "/Inside/getInterviewCardByEmpSeq.do",
            data: { empSeq: empSeq }, // empSeq를 요청 데이터로 보내기
            success: function(response) {
                console.log(empSeq);
                // 응답 데이터 처리 로직
                console.log("response : " + response);

                // 정보를 템플릿에 표시
                // var tableRows = $(".getInterviewCardList tr");

                if (response.list && response.list.length > 0) {
                    for (var i = 0; i < response.list.length; i++) {
                        var card = response.list[i];
                        console.log("Card " + i + ": ", card);

                        var row = $("<tr></tr>"); // 새로운 행 생성

                        // 각 데이터를 해당 열에 추가
                        row.append($("<td class='card_number'></td>").text(card.card_number));
                        row.append($("<td class='dept_name'></td>").text(card.dept_name));
                        row.append($("<td class='dept_team_name'></td>").text(card.dept_team_name));
                        row.append($("<td class='emp_name_kr'></td>").text(card.emp_name_kr));
                        /*row.append($("<td class='card_interview_date'></td>").text(card.card_interview_date));*/
                        row.append($("<td class='card_interview_date' style='font-weight: 900; cursor: pointer;' onClick='cardDetailPop(" + card.card_number + ")'></td>").text(card.card_interview_date+' '+ card.stime + '~' + card.etime));
                        row.append($("<td class='card_interviewer'></td>").text(card.card_interviewer));
                     /*   row.append($("<td class='card_superior_person'></td>").text(card.card_superior_person));
                        row.append($("<td class='card_superior_person2'></td>").text(card.card_superior_person2));
                        row.append($("<td class='card_status'></td>").text(card.card_status));*/

                        $(".getInterviewCardList").append(row); // 생성한 행을 테이블에 추가
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error occurred while retrieving data:", errorThrown);
            }
        });
    }

    function cardDetailPop(cardNumber){
        var url = "/Inside/pop/contentDetailPop.do?cardNumber=" + cardNumber;
        var name = "contentDetailPop";
        var option = "width=850,height=800,top=100,left=200,location=no";
        var popup = window.open(url, name, option);
    }



    //인사기록카드 - 제안 제도 수정
    function updateProposalBtn() {
        if($('input[name=propChk]:checked').length == 0){
            alert("수정할 항목을 선택해주세요.");
        }else if($('input[name=propChk]:checked').length > 1){
            alert("한개의 항목만 선택해주세요.");
        }else{
            var propChk = new Array();
            $("input[name='propChk']").each(function () {
                if (this.checked) {
                    var id = $(this).attr("id").replace($(this).attr("name"), "");
                    id = id.replace("prop", "");
                    propChk.push(id);
                }
            })
            var url = "/useManage/userPersonnelRecordPop.do?popName=proposal" + "&pk=" + propChk;
            var name = "userPersonnelRecordEduAddPop";
            var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
            popup.onload = function() {
                var titleElement = popup.document.querySelector('.card-title.title_NM');
                titleElement.textContent = '제안 제도 수정';

                var buttons = popup.document.querySelectorAll('.k-button.k-button-solid-info');
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = (i == 1) ? 'inline-block' : 'none';
                }
            }
        }
    }

    //인사기록카드 - 제안 사항 삭제 요청(_Tmp 테이블로 카피)
    function delProposalBtn() {
        if($('input[name=propChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var propChk = new Array();
        $("input[name='propChk']").each(function(){
            if(this.checked){
                propChk.push(parseInt($(this).attr("id").replace($(this).attr("name"), ""),10));
            }
        })

        $.ajax({
            type: "POST",
            url: "/userManage/setProposalDeleteTmp", // 컨트롤러 엔드포인트 URL
            data: { propChk:propChk }, // 전송할 데이터
            success: function (response) {
                // AJAX 요청이 성공했을 때 실행되는 코드
                console.log("요청이 성공했습니다.");
                console.log(propChk);
                alert("삭제 요청이 완료되었습니다.");
            },
            error: function (error) {
                // AJAX 요청이 실패했을 때 실행되는 코드
                console.error("요청이 실패했습니다.");
                console.log(propChk);
                alert("삭제 요청이 실패했습니다.");
            }
        });
    }

    /*
    //인사기록카드 - 제안 제도 삭제
    function delProposalBtn() {
        if($('input[name=propChk]:checked').length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(!confirm("선택한 항목을 삭제하시겠습니까?")){
            return;
        }

        var propChk = new Array();
        $("input[name='propChk']").each(function(){
            if(this.checked){
                propChk.push($(this).attr("id").replace($(this).attr("name"), ""));
            }
        })

        $.ajax({
            url : '/userManage/setProposalDelete',
            data : {
                propChk : propChk
            },
            dataType: "json",
            type : "POST",
            success : function (rs){
                var rs = rs.rs;
                alert(rs.message);
            }
        });
    }
     */

    function userPrintPop(empSeq){
        /*let url = "/inside/pop/userPrintPop.do?empSeq="+$("#empSeq").val();*/
        let url = "/inside/pop/userPrintPop.do?empSeq="+ empSeq + "&admin=Y";
        const name = "userPrintPop";
        const option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open(url, name, option);
    }
</script>