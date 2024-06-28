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
</style>


<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">인사기록카드</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 > 인사기록카드(수정)</div>
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
                    <div class="empInfo">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="subTitSt">· 직원 기본 정보</div>
                        </div>
                        <div class="table-responsive">
                            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                            <input type="hidden" id="msiInfoId" name="msiInfoId" value="${data.MSI_INFO_ID}">
                            <input type="hidden" id="empSeq1" name="empSeq" value="${uprList.empSeq}">
                            <input type="hidden" id="empName1" name="empName" value="${uprList.empName}">
                            <input type="hidden" id="erpEmpSeq1" name="empSeq" value="${uprList.erpEmpSeq}">
                            <input type="hidden" id="deptSeq1" name="empName" value="${uprList.deptSeq}">
                            <input type="hidden" id="deptName1" name="empName" value="${uprList.deptName}">
                            <input type="hidden" id="teamName1" name="empName" value="${uprList.teamName}">
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
                                            <input type="text" id="bDay" class="bDay" name="bDay" class="userInfoDatePicker userInfoTextBox" value="${uprList.bDay}" style="width: 40%;">
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
                                            <input type="text" id="emgTelNum" name="emgTelNum" class="userInfoTextBox " placeholder="숫자만 입력" value="${uprList.emgTelNum}" style="width: 50%;">
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
                                            <input type="text" class="userInfoTextBox" id="hire" name="" value="" style="width: 100%;">
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
                                        <col width="5%">
                                        <col width="12%">
                                        <col width="20%">
                                        <col width="11%">
                                        <col width="6%">
                                        <col width="8%">
                                        <col width="8%">
                                        <col width="8%">
                                        <col width="5%">
                                        <col width="10%">
                                        <col width="12%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>구분</th>
                                        <th>기간</th>
                                        <th>학교 및 학과</th>
                                        <th>학위</th>
                                        <th>학위 증명서</th>
                                        <th>성적 증명서</th>
                                        <th>졸업</th>
                                        <th>성적</th>
                                        <th>비고</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input type="text" id="gubun1" class="gubun" style="width: 100%;">
                                        </td>
                                        <td>
                                            <input type="text" id="sDate1" class="sDate" style="width: 45%;"> ~ <input type="text" id="eDate1" class="eDate" style="width: 45%;">
                                        </td>
                                        <td>
                                            <input type="text" id="school1" class ="textBox" style="width: 100%;">
                                        </td>
                                        <td>
                                            <input type="text" id="degree1" class="degree textBox" style="width: 100%;">
                                        </td>

                                        <td>
                                            <label for="gradeFile" class="k-button k-button-solid-base">파일첨부</label>
                                            <input type="file" id="gradeFile" name="gradeFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                            <span id="gradeFileName"></span>
                                        </td>

                                        <td>
                                            <label for="socreFile" class="k-button k-button-solid-base">파일첨부</label>
                                            <input type="file" id="socreFile" name="socreFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                            <span id="socreFileName"></span>
                                        </td>
                                        <td>
                                            <input type="text" <%--id="whfdjq"id--%>id="graduation1" class="graduation" style="width: 100%;">
                                        </td>
                                        <td>
                                            <input type="text" id="score1" class ="textBox" style="width: 100%;">
                                        </td>
                                        <td>
                                            <input type="text" id="bmk1" class ="textBox" style="width: 100%;">
                                        </td>
                                        <td>
                                            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_addInfo()"/>
                                        </td>
                                    </tr>
                                    <c:forEach var="l" items="${eList}" varStatus="status">
                                        <c:if test="${l.EDUCATIONAL_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>${fn:length (eList) - status.index}</td>
                                                <td>
                                                    <input type="text" id="gubun${l.EDUCATIONAL_ID}" class="gubun" value='${l.GUBUN_CODE}' style="width: 100%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="sDate${l.EDUCATIONAL_ID}" class="sDate" value='${l.ADMISSION_DAY}' style="width: 45%;"> ~ <input type="text" id="eDate${l.EDUCATIONAL_ID}" class="eDate" value='${l.GRADUATION_DAY}' style="width: 45%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="school${l.EDUCATIONAL_ID}" class ="textBox" value='${l.SCHOOL_NAME}' style="width: 100%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="degree${l.EDUCATIONAL_ID}" class="degree" value='${l.DEGREE_CODE}' style="width: 100%;">
                                                </td>

                                                <c:if test="${l.gradeFile == null}">
                                                    <td>
                                                        <label for="gradeFile${l.EDUCATIONAL_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="gradeFile${l.EDUCATIONAL_ID}" name="gradeFile${l.EDUCATIONAL_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="gradeFileName${l.EDUCATIONAL_ID}"></span>
                                                    </td>
                                                </c:if>
                                                <c:if test="${l.gradeFile ne null}">
                                                    <td style="cursor: pointer">
                                                        <label for="gradeFile${l.EDUCATIONAL_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="gradeFile${l.EDUCATIONAL_ID}" name="gradeFile${l.EDUCATIONAL_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="gradeFileName${l.EDUCATIONAL_ID}" style="cursor: pointer" onclick="fileDown('${l.gradeFile.file_path}${l.gradeFile.file_uuid}', '${l.gradeFile.file_org_name}.${l.gradeFile.file_ext}')">
                                                      ${l.gradeFile.file_org_name}.${l.gradeFile.file_ext}</span>
                                                    </td>
                                                </c:if>
                                                <c:if test="${l.socreFile == null}">
                                                    <td>
                                                        <label for="socreFile${l.EDUCATIONAL_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="socreFile${l.EDUCATIONAL_ID}" name="socreFile${l.EDUCATIONAL_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="socreFileName${l.EDUCATIONAL_ID}"></span>
                                                    </td>
                                                </c:if>
                                                <c:if test="${l.socreFile ne null}">
                                                    <td style="cursor: pointer">
                                                        <label for="socreFile${l.EDUCATIONAL_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="socreFile${l.EDUCATIONAL_ID}" name="socreFile${l.EDUCATIONAL_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="socreFileName${l.EDUCATIONAL_ID}" style="cursor: pointer" onclick="fileDown('${l.socreFile.file_path}${l.socreFile.file_uuid}', '${l.socreFile.file_org_name}.${l.socreFile.file_ext}')">
                                                      ${l.socreFile.file_org_name}.${l.socreFile.file_ext}</span>
                                                    </td>
                                                </c:if>
                                                <td>
                                                    <input type="text" id="graduation${l.EDUCATIONAL_ID}" class="graduation" value='${l.GRADUATION_CODE}' style="width: 100%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="score${l.EDUCATIONAL_ID}" class ="textBox" value='${l.SCORE}' style="width: 100%;">
                                                </td>
                                                <td>
                                                    <input type="text" id="bmk${l.EDUCATIONAL_ID}" class ="textBox" value='${l.RMK}' style="width: 100%;">
                                                </td>
                                                <td>
                                                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_EduModifyInfo(${l.EDUCATIONAL_ID})"/>
                                                    <input type="button" class="k-button k-button-solid-error" value="삭제" onclick="fu_delInfo(${l.EDUCATIONAL_ID})"/>
                                                </td>
                                            </tr>
                                        </c:if>
                                    </c:forEach>
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
                                        <col width="5%">
                                        <col width="20%">
                                        <col width="12%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="9%">
                                        <col width="12%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>기간</th>
                                        <th>근무처</th>
                                        <th>직위 (급)</th>
                                        <th>담당업무</th>
                                        <th>근무년수</th>
                                        <th>증명서</th>
                                        <th>비고</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input type="text" id="sDate3" class="sDate" style="width: 45%;"> ~ <input type="text" id="eDate3" class="eDate" style="width: 45%;"></td>
                                        <td><input type="text" id="place3" class ="textBox" style="width: 100%;"> </td>
                                        <td><input type="text" id="position3" class ="textBox" style="width: 100%;"> </td>
                                        <td><input type="text" id="workType3" class ="textBox" style="width: 100%;"> </td>
                                        <td><input type="text" id="dateY3" class ="textBox" style="width: 25%;">년 <input type="text" id="dateM3" class ="textBox" style="width: 25%;">개월
                                        </td>
                                        <td>
                                            <label for="addFile" class="k-button k-button-solid-base">파일첨부</label>
                                            <input type="file" id="addFile" name="addFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                            <span id="addFileName"></span>
                                        </td>
                                        <td><input type="text" id="bmk3" class ="textBox" style="width: 100%;"></td>
                                        <td>
                                            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_careerAddInfo()"/>
                                        </td>
                                    </tr>
                                    <c:forEach var="l" items="${cList}" varStatus="status">
                                        <c:if test="${l.CAREER_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>${fn:length (cList) - status.index}</td>
                                                <td><input type="text" id="sDate2${l.CAREER_ID}" class="sDate" value='${l.JOIN_DAY}' style="width: 45%;"> ~ <input type="text" id="eDate2${l.CAREER_ID}" class="eDate" value= '${l.RESIGN_DAY}' style="width: 45%;"></td>
                                                <td><input type="text" id="place2${l.CAREER_ID}" class ="textBox" value='${l.EMPLOY_DEPT_NAME}' style="width: 100%;"> </td>
                                                <td><input type="text" id="position2${l.CAREER_ID}" class ="textBox" value='${l.POSITION_OR_DUTY}' style="width: 100%;"> </td>
                                                <td><input type="text" id="workType2${l.CAREER_ID}" class ="textBox" value='${l.MAIN_TASK}' style="width: 100%;"> </td>
                                                <td>
                                                    <input type="text" id="dateY2${l.CAREER_ID}" class ="textBox"value='${l.CAREER_PERIOD}' style="width: 25%;">년
                                                    <input type="text" id="dateM2${l.CAREER_ID}" class ="textBox" value='${l.CAREER_MONTH}' style="width: 25%;">개월
                                                </td>

                                                <c:if test="${l.addFile == null}">
                                                    <td>
                                                        <label for="addFile${l.CAREER_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="addFile${l.CAREER_ID}" name="addFile${l.CAREER_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="addFileName${l.CAREER_ID}"></span>
                                                    </td>
                                                </c:if>
                                                <c:if test="${l.addFile ne null}">
                                                    <td>
                                                        <label for="addFile${l.CAREER_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="addFile${l.CAREER_ID}" name="addFile${l.CAREER_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="addFileName${l.CAREER_ID}" style="cursor: pointer" onclick="fileDown('${l.addFile.file_path}${l.addFile.file_uuid}', '${l.addFile.file_org_name}.${l.addFile.file_ext}')">
                                                          ${l.addFile.file_org_name}.${l.addFile.file_ext}
                                                      </span>
                                                    </td>
                                                </c:if>

                                                <td><input type="text" id="bmk2${l.CAREER_ID}" class ="textBox" value='${l.RMK}' style="width: 100%;"></td>
                                                <td>
                                                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_careerModifyInfo(${l.CAREER_ID})"/>
                                                    <input type="button" class="k-button k-button-solid-error" value="삭제" onclick="fu_careerDelInfo(${l.CAREER_ID})"/>
                                                </td>
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
                            <div class="subTitSt">· 병역 사항</div>
                            <div id="armyInfoBtn" class="btn-st" style="margin-top:5px; /*display:none;*/">
                                <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_milModifyInfo(${mInfo.MSI_INFO_ID})"/>
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
                                        <td><input type="text" id="mGubun" value="${mInfo.MILITARY_SVC_TYPE}" style="width: 50%;"></td>
                                        <th>사유</th>
                                        <td><input type="text" id="reason" class ="textBox" value="${mInfo.M_UNFUL_REASON}" style="width: 50%;"></td>
                                    </tr>
                                    <tr>
                                        <th>복무기간</th>
                                        <td>
                                            <input type="text" id="sDate4" class="sDate" value="${mInfo.M_ENLIST_DAY}" style="width: 45%;"> ~ <input type="text" id="eDate4" class="eDate" value="${mInfo.M_DISCHARGE_DAY}" style="width: 45%;">
                                        </td>
                                        <th>최종계급</th>
                                        <td>
                                            <input type="text" id="rank" class ="textBox" value="${mInfo.M_LAST_RANK}" style="width: 50%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>군별</th>
                                        <td>
                                            <input type="text" id="mType" class ="textBox" value="${mInfo.M_DIVISION}" style="width: 50%;">
                                        </td>
                                        <th>병과</th>
                                        <td>
                                            <input type="text" id="mDept" class ="textBox" value="${mInfo.MOS}" style="width: 50%;">
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
                                        <col width="6%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="15%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>관계</th>
                                        <th>성명</th>
                                        <th>생년월일</th>
                                        <th>직업</th>
                                        <th>동거여부</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input type="text" id="relation1" class="relation" style="width: 100%;"></td>
                                        <td><input type="text" id="fName1" class ="textBox"  style="width: 100%;"></td>
                                        <td><input type="text" id="bDay2" class="bDay" style="width: 100%;"></td>
                                        <td><input type="text" id="job1" class ="textBox" style="width: 100%;"></td>
                                        <td><span type="text" id="includeType" class="includeType" name="includeType" style="width: 100%;"></span></td>
                                        <td>
                                            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_familyAddInfo()"/>
                                        </td>
                                    </tr>
                                    <c:forEach var="l" items="${fList}" varStatus="status">
                                        <c:if test="${l.FAMILY_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>${fn:length (fList) - status.index}</td>
                                                <td><input type="text" id="relation${l.FAMILY_ID}" class="relation" value="${l.FAMILY_CODE}" style="width: 100%;"></td>
                                                <td><input type="text" id="fName${l.FAMILY_ID}" class ="textBox" value="${l.FAMILY_NAME}" style="width: 100%;"></td>
                                                <td><input type="text" id="bDay1${l.FAMILY_ID}" class="bDay" value="${l.FAMILY_BIRTH}" style="width: 100%;"></td>
                                                <td><input type="text" id="job${l.FAMILY_ID}" class ="textBox" value="${l.FAMILY_JOB}" style="width: 100%;"></td>
                                                <td><span type="text" id="includeType${l.FAMILY_ID}" class="includeType" name="includeType${l.FAMILY_ID}" inCludeYn="${l.INCLUDE_YN}" style="width: 100%;"></span></td>
                                                <td>
                                                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_familyModifyInfo(${l.FAMILY_ID})"/>
                                                    <input type="button" class="k-button k-button-solid-error" value="삭제" onclick="fu_familyDelInfo(${l.FAMILY_ID})"/>
                                                </td>
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
                                        <col width="6%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="18%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>종류</th>
                                        <th>취득일</th>
                                        <th>자격번호</th>
                                        <th>발급기관</th>
                                        <th>증명서</th>
                                        <th>비고</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input type="text" id="licenseName1" class ="textBox" style="width: 100%;"></td>
                                        <td><input type="text" id="sDate6" class="sDate" style="width: 100%;"></td>
                                        <td><input type="text" id="licenseNum1" class ="textBox" style="width: 100%;"></td>
                                        <td><input type="text" id="agency1" class ="textBox" style="width: 100%;"></td>
                                        <td>
                                            <label for="certificateAddFile" class="k-button k-button-solid-base">파일첨부</label>
                                            <input type="file" id="certificateAddFile" name="certificateAddFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                            <span id="certificateAddFileName"></span>
                                        </td>
                                        <td><input type="text" id="bmk5" class ="textBox" value='${l.RMK}' style="width: 100%;"></td>
                                        <td>
                                            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_LinAddInfo()"/>
                                        </td>
                                    </tr>
                                    <c:forEach var="l" items="${lList}" varStatus="status">
                                        <c:if test="${l.CERTIFICATE_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>${fn:length (lList) - status.index}</td>
                                                <td><input type="text" id="licenseName${l.CERTIFICATE_ID}" class ="textBox" value="${l.CERTIFICATE_NAME}" style="width: 100%;"></td>
                                                <td><input type="text" id="sDate5${l.CERTIFICATE_ID}" class="sDate" value="${l.ACQUISITION_DAY}" style="width: 100%;"></td>
                                                <td><input type="text" id="licenseNum${l.CERTIFICATE_ID}" class ="textBox" value="${l.CERTIFICATE_NUM}" style="width: 100%;"></td>
                                                <td><input type="text" id="agency${l.CERTIFICATE_ID}" class ="textBox" value="${l.ISSUER}" style="width: 100%;"></td>

                                                <c:if test="${l.certificateAddFile == null}">
                                                    <td>
                                                        <label for="certificateAddFile${l.CERTIFICATE_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="certificateAddFile${l.CERTIFICATE_ID}" name="certificateAddFile${l.CERTIFICATE_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="certificateAddFileName${l.CERTIFICATE_ID}"></span>
                                                    </td>
                                                </c:if>
                                                <c:if test="${l.certificateAddFile ne null}">
                                                    <td>
                                                        <label for="certificateAddFile${l.CERTIFICATE_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="certificateAddFile${l.CERTIFICATE_ID}" name="certificateAddFile${l.CERTIFICATE_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="certificateAddFileName${l.CERTIFICATE_ID}" style="cursor: pointer" onclick="fileDown('${l.certificateAddFile.file_path}${l.certificateAddFile.file_uuid}', '${l.certificateAddFile.file_org_name}.${l.certificateAddFile.file_ext}')">
                                                             ${l.certificateAddFile.file_org_name}.${l.certificateAddFile.file_ext}
                                                         </span>
                                                    </td>
                                                </c:if>
                                                <td><input type="text" id="bmk4${l.CERTIFICATE_ID}" class ="textBox" value='${l.RMK}' style="width: 100%;"></td>
                                                <td>
                                                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_LinModifyInfo(${l.CERTIFICATE_ID})"/>
                                                    <input type="button" class="k-button k-button-solid-error" value="삭제" onclick="fu_LinDelInfo(${l.CERTIFICATE_ID})"/>
                                                </td>
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
                                        <col width="6%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>근무 기간</th>
                                        <th>계약연봉</th>
                                        <th>주요 직무</th>
                                        <th>직급</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input type="text" id="sDate8" class="sDate" style="width: 45%;"> ~ <input type="text" id="eDate8" class="eDate"value="${l.WORK_LEAVE_DAY}" style="width: 45%;"></td>
                                        <td><input type="text" id="pay1" class ="textBox" style="width: 100%;"></td>
                                        <td><input type="text" id="work1" class ="textBox" style="width: 100%;"></td>
                                        <td><input type="text" id="rank2" class ="textBox" style="width: 100%;"></td>
                                        <td>
                                            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_JobAddInfo()"/>
                                        </td>
                                    </tr>
                                    <c:forEach var="l" items="${dList}" varStatus="status">
                                        <c:if test="${l.DUTY_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>${fn:length (dList) - status.index}</td>
                                                <td><input type="text" id="sDate7${l.DUTY_ID}" class="sDate" value="${l.WORK_JOIN_DAY}" style="width: 45%;"> ~ <input type="text" id="eDate7${l.DUTY_ID}" class="eDate" value="${l.WORK_LEAVE_DAY}" style="width: 45%;"></td>
                                                <td><input type="text" id="pay${l.DUTY_ID}" class ="textBox" value="${l.WORK_PAY}" style="width: 100%;"></td>
                                                <td><input type="text" id="work${l.DUTY_ID}" class ="textBox" value="${l.DUTY_DETAIL}" style="width: 100%;"></td>
                                                <td><input type="text" id="rank1${l.DUTY_ID}" class ="textBox" value="${l.POSITON_NAME}" style="width: 100%;"></td>
                                                <td>
                                                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_JobModifyInfo(${l.DUTY_ID})"/>
                                                    <input type="button" class="k-button k-button-solid-error" value="삭제" onclick="fu_JobDelInfo(${l.DUTY_ID})"/>
                                                </td>
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
                                <input type="button" class="k-button k-button-solid-info" value="저장" onclick=""/>
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
                                            <td>${fn:length (aList) - status.index}</td>
                                            <td>${l.APNT_NAME}</td>
                                            <td>${l.historyDt}</td>
                                            <td>${l.AF_DEPT_NAME} ${l.AF_DEPT_TEAM} ${l.AF_POSITION_NAME} ${l.AF_DUTY_NAME}</td>
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
                                        <col width="6%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>내/외부</th>
                                        <th>포상/징계 구분</th>
                                        <th>포상/징계 일자</th>
                                        <th>포상/징계 번호</th>
                                        <th>공적 (징계) 사항</th>
                                        <th>시행처</th>
                                        <th>증명서</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input type="text" id="rGubunOutIn1" class="rGubunOutIn" style="width: 100%;"></td>
                                        <td><input type="text" id="rGubun1" class ="textBox" style="width: 100%;"></td>
                                        <td><input type="text" id="sDate10" class="sDate" style="width: 100%;"></td>
                                        <td><input type="text" id="rwdSn1" class ="textBox" style="width: 100%;"></td>
                                        <td><input type="text" id="rIssue1" class ="textBox"  style="width: 100%;"></td>
                                        <td><input type="text" id="agency3" class ="textBox" style="width: 100%;"></td>
                                        <td>
                                            <label for="rewardAddFile" class="k-button k-button-solid-base">파일첨부</label>
                                            <input type="file" id="rewardAddFile" name="rewardAddFile" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                            <span id="rewardAddFileName"></span>
                                        </td>
                                        <td>
                                            <input type="button" class="k-button k-button-solid-info" value="추가" onclick="fu_RewAddInfo()"/>
                                        </td>
                                    </tr>
                                    <c:forEach var="l" items="${rList}" varStatus="status">
                                        <c:if test="${l.REWORD_ID ne null and l.ADMIN_APPROVAL eq 'Y'}">
                                            <tr>
                                                <td>${fn:length (rList) - status.index}</td>
                                                <td><input type="text" id="rGubunOutIn${l.REWORD_ID}" class="rGubunOutIn" value="${l.REWORD_TYPE}" style="width: 100%;"></td>
                                                <td><input type="text" id="rGubun${l.REWORD_ID}" class ="textBox" value="${l.REWORD_TYPE_NAME1}" style="width: 100%;"></td>
                                                <td><input type="text" id="sDate9${l.REWORD_ID}" class="sDate" value="${l.REWORD_DAY}" style="width: 100%;"></td>
                                                <td><input type="text" id="rwdSn${l.REWORD_ID}" class ="textBox" value="${l.RWD_SN}" style="width: 100%;"></td>
                                                <td><input type="text" id="rIssue${l.REWORD_ID}" class ="textBox" value="${l.RWD_OFM}" style="width: 100%;"></td>
                                                <td><input type="text" id="agency2${l.REWORD_ID}" class ="textBox" value="${l.RWD_ST_COMP}" style="width: 100%;"></td>

                                                <c:if test="${l.rewardAddFile == null}">
                                                    <td>
                                                        <label for="rewardAddFile${l.REWORD_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="rewardAddFile${l.REWORD_ID}" name="rewardAddFile${l.REWORD_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="rewardAddFileName${l.REWORD_ID}"></span>
                                                    </td>
                                                </c:if>
                                                <c:if test="${l.rewardAddFile ne null}">
                                                    <td>
                                                        <label for="rewardAddFile${l.REWORD_ID}" class="k-button k-button-solid-base">파일첨부</label>
                                                        <input type="file" id="rewardAddFile${l.REWORD_ID}" name="rewardAddFile${l.REWORD_ID}" onchange="fileChange(this)" style="display: none" multiple="multiple">
                                                        <span id="rewardAddFileName${l.REWORD_ID}" style="cursor: pointer" onclick="fileDown('${l.rewardAddFile.file_path}${l.rewardAddFile.file_uuid}', '${l.rewardAddFile.file_org_name}.${l.rewardAddFile.file_ext}')">
                                                            ${l.rewardAddFile.file_org_name}.${l.rewardAddFile.file_ext}
                                                         </span>
                                                    </td>
                                                </c:if>
                                                <td>
                                                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_RewModifyInfo(${l.REWORD_ID})"/>
                                                    <input type="button" class="k-button k-button-solid-error" value="삭제" onclick="fu_RewDelInfo(${l.REWORD_ID})"/>
                                                </td>
                                            </tr>
                                        </c:if>
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
                                    </colgroup>
                                    <thead class="getInterviewCardList ">
                                    <tr>
                                        <th>순번</th>
                                        <th>부서명</th>
                                        <th>팀명</th>
                                        <th>피면담자</th>
                                        <th>면담일시</th>
                                        <th>면담자</th>
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
                                        <col width="6%">
                                        <col width="28%">
                                        <col width="20%">
                                        <col width="25%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead>
                                    <tr>
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
                                                    <td>${fn:length (pList) - status.index}</td>
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
                            <div id="cardEtcInfoBtn" class="btn-st" style="margin-top:5px; /*display:none;*/">
                                <input type="button" class="k-button k-button-solid-info" value="저장" onclick="fu_etcModInfo()"/>
                            </div>
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
                                        <td>
                                            <textarea type="text" id="cardEtc" name="cardEtc">${uprList.cardEtc}</textarea>
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="button" id="listBak" value="목록" onclick="listBack();" style="float: right;width: 100px;">
        </div>
    </div>
</div><!-- col-md-9 -->


<script>
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

    var codeSet;
    var codeDropDown=[];
    function fn_codeSet() {
        $.ajax({
            url : '/userManage/getCodeList',
            type : "post",
            async : false,
            dataType : "json",
            success : function(result) {
                codeSet = result.rs;
                codeDropDown = result.rs;
            }
        })
    }
    fn_codeSet();
    function edCodeDataSource(code) {
        var data = [];
        var defaultCode = "";
        if(code != ""){
            switch (code){
                case "B01" :
                    defaultCode = "선택하세요"
                    break
                case "B02" :
                    defaultCode = "선택하세요"
                    break
                case "B03" :
                    defaultCode = "선택하세요"
                    break
                case "B04" :
                    defaultCode = "전역여부"
                    break
                case "B05" :
                    defaultCode = "가족관계"
                    break
            }
            data.push({"HR_DT_CODE_NM": defaultCode, "value" : ""});
        }else {
            data.push({"HR_DT_CODE_NM": "선택하세요", "value" : ""});
        }

        for(var i = 0 ; i < codeDropDown.length ; i++){
            codeDropDown[i].value = codeDropDown[i].HR_MC_CODE + codeDropDown[i].HR_MD_CODE + codeDropDown[i].HR_DT_CODE;
            if(codeDropDown[i].HR_MC_CODE + codeDropDown[i].HR_MD_CODE == code){
                data.push(codeDropDown[i]);
            }
        }
        return data;
    }

    $(".gubun").kendoDropDownList({
        dataTextField: "HR_DT_CODE_NM",
        dataValueField: "value",
        dataSource: edCodeDataSource("B01"),
        /*change: function(e) {
            var selectedValue = this.value();
            if(selectedValue === "B0102" || selectedValue === "B0101") {
                $("#degree1, #gradeFileName, #socreFileName").css("display", "none");
            } else {
                $("#degree1, #gradeFileName, #socreFileName").css("display", "");
            }
        }*/

    });

    $(".degree").kendoDropDownList({
        dataTextField: "HR_DT_CODE_NM",
        dataValueField: "value",
        dataSource: edCodeDataSource("B02")
    });

    $(".graduation").kendoDropDownList({
        dataTextField: "HR_DT_CODE_NM",
        dataValueField: "value",
        dataSource: edCodeDataSource("B03")
    });

    $("#mGubun").kendoDropDownList({
        dataTextField: "HR_DT_CODE_NM",
        dataValueField: "value",
        dataSource: edCodeDataSource("B04")
    });

    $(".relation").kendoDropDownList({
        dataTextField: "HR_DT_CODE_NM",
        dataValueField: "value",
        dataSource: edCodeDataSource("B05")
    });

    $(".rGubunOutIn").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "선택하세요", value: "" },
            { text: "내부", value: "0" },
            { text: "외부", value: "1" }
        ],
        index: 0
    });

    if("${uprList.carActive}" == "Y") {
        $("#carActive").text("예");
    }else{
        $("#carActive").text("아니오");
    }

    $("#joinDay").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd",
        value : "${data.JOIN_DAY}"
    });

    $(".bDay").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd",
        /*     value : "${data.BDAY}"*/
    });

    $("#resignDay").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd",
        value : "${data.RESIGN_DAY}"
    });

    $(".sDate").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd"
    });

    $(".eDate").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd"
    });

    $(".includeType").kendoRadioGroup({
        items: [
            {label: "예", value: "Y"},
            {label: "아니오", value: "N"}
        ],
        layout: "horizontal",
        labelPosition: "after",
    });

    // Y 이면 예 , N 이면 아니오
    var flag = "Y";

    if(false) {
        flag = "N"
    }

    $.each($(".includeType"), function(){
        $(this).data("kendoRadioGroup").value($(this).attr("inCludeYn"));
    })

    $(".textBox").kendoTextBox();

    $("#cardEtc").kendoTextArea({
        rows:5,
        cols:10,
        resizable: "vertical"
    });


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

        /* $("#carActive").kendoRadioGroup({
             items: [
                 { label : "예", value : "Y" },
                 { label : "아니오", value : "N" }
             ],
             layout : "horizontal",
             labelPosition : "after",
             value : '${uprList.carActive}'
        });*/

        $.each($(".userInfoTextBox input"), function(){
            if($("#regEmpSeq").val() != $("#empSeq").val() || !$(this).hasClass("notDisabled")){
                $(this).data("kendoTextBox").enable(false);
            }
        })

        userInfoDatePickerSetting();
    })

    function userInfoDatePickerSetting(){

        /*$("#joinDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : "${data.JOIN_DAY}"
        });*/

        /*$("#bDay").kendoDatePicker({
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
*/
        $.each($(".userInfoDatePicker input"), function(){
            if($("#regEmpSeq").val() != $("#empSeq").val() || !$(this).hasClass("notDisabled")){
                $(this).data("kendoDatePicker").enable(false);
            }
        });
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

    //직원 기본정보 저장
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
                        row.append($("<td class='card_interview_date'></td>").text(card.card_interview_date+' '+ card.stime + '~' + card.etime));
                        row.append($("<td class='card_interviewer'></td>").text(card.card_interviewer));

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

    // 학력사항 추가
    function fu_addInfo(){
        var data = {
            empSeq1 : $("#empSeq1").val(),
            empName1 : $("#empName1").val(),
            gubun : $("#gubun1").val(),
            sDate : $("#sDate1").val(),
            eDate : $("#eDate1").val(),
            school : $("#school1").val(),
            degree : $("#degree1").val(),
            graduation : $("#graduation1").val(),
            score : $("#score1").val(),
            bmk : $("#bmk1").val(),
        }

        var formData = new FormData();
        formData.append("empSeq1", data.empSeq1);
        formData.append("empName1", data.empName1);
        formData.append("gubun", data.gubun);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("school", data.school);
        formData.append("degree", data.degree);
        formData.append("graduation", data.graduation);
        formData.append("score", data.score);
        formData.append("bmk", data.bmk);
        formData.append("menuCd", "degree");

        if($("#gradeFile")[0].files.length == 1){
            formData.append("gradeFile", $("#gradeFile")[0].files[0]);
        }

        if($("#socreFile")[0].files.length == 1){
            formData.append("socreFile", $("#socreFile")[0].files[0]);
        }

        if($("#gubun1").val()==""){ alert("학력구분을 입력해주세요."); return;}
        /*if($("#sDate1").val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#eDate1").val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#school1").val()==""){ alert("학교 및 학과를 입력해주세요."); return;}
        if($("#degree1").val()==""){ alert("학위를 입력해주세요."); return;}
        if($("#gradeFile").val()==""){ alert("증명서를 첨부해주세요."); return;}
        if($("#socreFile").val()==""){ alert("증명서를 첨부해주세요."); return;}
        if($("#graduation1").val()==""){ alert("졸업여부를 입력해주세요."); return;}
        if($("#score1").val()==""){ alert("성적을 입력해주세요."); return;}*/


        var result = customKendo.fn_customFormDataAjax('/useManage/userDegreeInfoInsert',formData);
        /*var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);*/
        console.log(result.rs);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("등록이 완료 되었습니다.");
                location.reload();

            }else{
                alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 학력사항 수정
    function fu_EduModifyInfo(key) {
        var data = {
            gubun : $("#gubun"+ key).val(),
            sDate : $("#sDate"+ key).val(),
            eDate : $("#eDate"+ key).val(),
            school : $("#school"+ key).val(),
            degree : $("#degree"+ key).val(),
            graduation : $("#graduation"+ key).val(),
            score : $("#score"+ key).val(),
            bmk : $("#bmk"+ key).val(),
            pk : key
        }

        var formData = new FormData();
        formData.append("gubun", data.gubun);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("school", data.school);
        formData.append("degree", data.degree);
        formData.append("graduation", data.graduation);
        formData.append("score", data.score);
        formData.append("bmk", data.bmk);
        formData.append("menuCd", "degree");
        formData.append("pk", data.pk);
        formData.append("educationalId", data.pk);

        if($("#gradeFile"+ key)[0].files.length == 1){
            formData.append("gradeFile", $("#gradeFile"+ key)[0].files[0]);
        }

        if($("#socreFile"+ key)[0].files.length == 1){
            formData.append("socreFile", $("#socreFile"+ key)[0].files[0]);
        }

        if($("#gubun"+ key).val()==""){ alert("학력구분을 입력해주세요."); return;}
        /*if($("#sDate"+ key).val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#eDate"+ key).val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#school"+ key).val()==""){ alert("학교 및 학과를 입력해주세요."); return;}
        if($("#degree"+ key).val()==""){ alert("학위를 입력해주세요."); return;}
        if($("#graduation"+ key).val()==""){ alert("졸업여부를 입력해주세요."); return;}
        if($("#score"+ key).val()==""){ alert("성적을 입력해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userDegreeInfoModify',formData);
        /*var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);*/
        console.log(result.rs);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정이 완료 되었습니다.");
                /*location.reload();*/

            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 학력사항 삭제
    function fu_delInfo(key) {
        if(confirm("삭제하시겠습니까?")){
            var data = {
                key : key
            }
            var result = customKendo.fn_customAjax('/useManage/userDegreeInfoDelete',data);
            if(result.flag){
                alert("삭제되었습니다.");
                location.reload();

            }else {
                alert("오류가 발생하였습니다.");
            }
        }
    }


    // 경력사항 추가
    function fu_careerAddInfo(){
        var data = {
            empSeq1 : $("#empSeq1").val(),
            empName1 : $("#empName1").val(),
            place : $("#place3").val(),
            sDate : $("#sDate3").val(),
            eDate : $("#eDate3").val(),
            position : $("#position3").val(),
            workType : $("#workType3").val(),
            dateY : $("#dateY3").val(),
            dateM : $("#dateM3").val(),
            bmk : $("#bmk3").val(),
            workType : $("#workType3").val()
        }

        var formData = new FormData();
        formData.append("empSeq1", data.empSeq1);
        formData.append("empName1", data.empName1);
        formData.append("place", data.place);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("position", data.position);
        formData.append("workType", data.workType);
        formData.append("dateY", data.dateY);
        formData.append("dateM", data.dateM);
        formData.append("bmk", data.bmk);
        formData.append("workType", data.workType);
        formData.append("menuCd", "career");

        if($("#addFile")[0].files.length == 1){
            formData.append("addFile", $("#addFile")[0].files[0]);
        }


        /*if($("#sDate3").val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#eDate3").val()==""){ alert("기간을 입력해주세요."); return;}*/
        if($("#place3").val()==""){ alert("근무처를 입력해주세요."); return;}
        /*if($("#position3").val()==""){ alert("직위(급)을 입력해주세요."); return;}
        if($("#workType3").val()==""){ alert("담당업무를 입력해주세요."); return;}
        if($("#dateY3").val()=="" && $("#dateM3").val()==""){ alert("근무년수를 입력해주세요."); return;}
        if($("#addFile").val()==""){ alert("증명서를 첨부해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userCareerInfoInsert',formData);
        /*var result = customKendo.fn_customFormDataAjax('/useManage/setUserPersonnelRecordInfo',formData);*/
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("등록을 성공하였습니다.");
                location.reload();
            }else{
                alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 경력사항 수정
    function fu_careerModifyInfo(key) {
        var data = {
            place: $("#place2"+ key).val(),
            sDate: $("#sDate2"+ key).val(),
            eDate: $("#eDate2"+ key).val(),
            position: $("#position2"+ key).val(),
            workType: $("#workType2"+ key).val(),
            dateY: $("#dateY2"+ key).val(),
            dateM: $("#dateM2"+ key).val(),
            bmk: $("#bmk2"+ key).val(),
            workType: $("#workType2"+ key).val(),
            pk: key
        }

        var formData = new FormData();
        formData.append("place", data.place);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("position", data.position);
        formData.append("workType", data.workType);
        formData.append("dateY", data.dateY);
        formData.append("dateM", data.dateM);
        formData.append("bmk", data.bmk);
        formData.append("workType", data.workType);
        formData.append("pk", data.pk);
        formData.append("careerId", data.pk);
        formData.append("menuCd", "career");

        if($("#addFile"+ key)[0].files.length == 1){
            formData.append("addFile", $("#addFile" + key)[0].files[0]);
        }

        /*if($("#sDate2"+ key).val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#eDate2"+ key).val()==""){ alert("기간을 입력해주세요."); return;}*/
        if($("#place2"+ key).val()==""){ alert("근무처를 입력해주세요."); return;}
        /*if($("#position2"+ key).val()==""){ alert("직위(급)을 입력해주세요."); return;}
        if($("#workType2"+ key).val()==""){ alert("담당업무를 입력해주세요."); return;}
        if($("#dateY2"+ key).val()=="" && $("#dateM2"+ key).val()==""){ alert("근무년수를 입력해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userCareerInfoModify',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정이 완료 되었습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 경력사항 삭제
    function fu_careerDelInfo(key) {
        if(confirm("삭제하시겠습니까?")){
            var data = {
                key : key
            }
            var result = customKendo.fn_customAjax('/useManage/userCareerInfoDelete',data);
            if(result.flag){
                alert("삭제되었습니다.");
                location.reload();

            }else {
                alert("오류가 발생하였습니다.");
            }
        }
    }

    // 병역사항 수정
    function fu_milModifyInfo(key){
        var data = {
            msiInfoId : $("#msiInfoId").val(),
            mGubun : $("#mGubun").val(),
            sDate : $("#sDate4").val(),
            eDate : $("#eDate4").val(),
            reason : $("#reason").val(),
            rank : $("#rank").val(),
            mType : $("#mType").val(),
            mDept : $("#mDept").val(),
            pk : key
        }

        var formData = new FormData();
        formData.append("msiInfoId", data.msiInfoId);
        formData.append("mGubun", data.mGubun);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("reason", data.reason);
        formData.append("rank", data.rank);
        formData.append("score", data.score);
        formData.append("mType", data.mType);
        formData.append("mDept", data.mDept);
        formData.append("pk", data.pk);

        if($("#mGubun").val()==""){ alert("전역여부를 입력해주세요."); return;}
        /* if($("#reason").val()==""){ alert("사유를 입력해주세요."); return;}
         if($("#sDate4").val()==""){ alert("복무기간을 입력해주세요."); return;}
         if($("#eDate4").val()==""){ alert("복무기간을 입력해주세요."); return;}
         if($("#rank").val()==""){ alert("최종계급을 입력해주세요."); return;}
         if($("#mType").val()==""){ alert("군별을 입력해주세요."); return;}
         if($("#mDept").val()==""){ alert("병과를 입력해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userMilitaryInfoModify',formData);
        console.log(result.rs);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정을 성공하였습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }

    // 가족사항 추가
    function fu_familyAddInfo(){
        var data = {
            empSeq1 : $("#empSeq1").val(),
            empName1 : $("#empName1").val(),
            relation : $("#relation1").val(),
            bDay : $("#bDay2").val(),
            job : $("#job1").val(),
            fName : $("#fName1").val(),
            includeType : $("#includeType").getKendoRadioGroup().value()
        }

        if($("#relation1").val()==""){ alert("관계를 입력해주세요."); return;}
        if($("#fName1").val()==""){ alert("성명을 입력해주세요."); return;}
        if($("#bDay2").val()==""){ alert("생년월일을 입력해주세요."); return;}
        if($("#includeType").getKendoRadioGroup().value()== null ){ alert("동거여부를 선택해주세요."); return;}

        var formData = new FormData();
        formData.append("empSeq1", data.empSeq1);
        formData.append("empName1", data.empName1);
        formData.append("relation", data.relation);
        formData.append("bDay", data.bDay);
        formData.append("job", data.job);
        formData.append("fName", data.fName);
        formData.append("includeType", data.includeType);

        var result = customKendo.fn_customFormDataAjax('/useManage/userFamilyInfoInsert',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("등록을 성공하였습니다.");
                location.reload();
            }else{
                alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 가족사항 수정
    function fu_familyModifyInfo(key) {
        var data = {
            relation : $("#relation"+ key).val(),
            bDay : $("#bDay1"+ key).val(),
            job : $("#job"+ key).val(),
            fName : $("#fName"+ key).val(),
            includeType :  $("#includeType"+key).getKendoRadioGroup().value(),
            pk: key
        }

        var formData = new FormData();
        formData.append("relation", data.relation);
        formData.append("bDay", data.bDay);
        formData.append("job", data.job);
        formData.append("fName", data.fName);
        formData.append("includeType", data.includeType);
        formData.append("pk", data.pk);

        if($("#relation" + key).val()==""){ alert("관계를 입력해주세요."); return;}
        if($("#fName"+ key).val()==""){ alert("성명을 입력해주세요."); return;}
        if($("#bDay1"+ key).val()==""){ alert("생년월일을 입력해주세요."); return;}
        if($("#includeType"+ key).getKendoRadioGroup().value()== null ){ alert("동거여부를 선택해주세요."); return;}

        var result = customKendo.fn_customFormDataAjax('/useManage/userFamilyInfoModify',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정이 완료 되었습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 가족사항 삭제
    function fu_familyDelInfo(key) {
        if(confirm("삭제하시겠습니까?")){
            var data = {
                key : key
            }
            var result = customKendo.fn_customAjax('/useManage/userFamilyInfoDelete',data);
            if(result.flag){
                alert("삭제되었습니다.");
                location.reload();

            }else {
                alert("오류가 발생하였습니다.");
            }
        }
    }

    // 보유면허 추가
    function fu_LinAddInfo(){
        var data = {
            empSeq1 : $("#empSeq1").val(),
            empName1 : $("#empName1").val(),
            licenseName : $("#licenseName1").val(),
            sDate : $("#sDate6").val(),
            licenseNum : $("#licenseNum1").val(),
            agency : $("#agency1").val(),
            bmk : $("#bmk5").val()
        }

        var formData = new FormData();
        formData.append("empSeq1", data.empSeq1);
        formData.append("empName1", data.empName1);
        formData.append("licenseName", data.licenseName);
        formData.append("sDate", data.sDate);
        formData.append("licenseNum", data.licenseNum);
        formData.append("agency", data.agency);
        formData.append("bmk", data.bmk);
        formData.append("menuCd", "license");

        if($("#certificateAddFile")[0].files.length == 1){
            formData.append("certificateAddFile", $("#certificateAddFile")[0].files[0]);
        }

        if($("#licenseName1").val()==""){ alert("면허 종류를 입력해주세요."); return;}
        /*if($("#sDate6").val()==""){ alert("취득일을 입력해주세요."); return;}
        if($("#licenseNum1").val()==""){ alert("자격번호를 입력해주세요."); return;}
        if($("#agency1").val()==""){ alert("발급기관을 입력해주세요."); return;}
        if($("#certificateAddFile").val()==""){ alert("증명서를 첨부해주세요."); return;}*/


        var result = customKendo.fn_customFormDataAjax('/useManage/userLinInfoInsert',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("등록을 성공하였습니다.");
                location.reload();
            }else{
                alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 보유면허 수정
    function fu_LinModifyInfo(key) {
        var data = {
            licenseName : $("#licenseName"+key).val(),
            sDate : $("#sDate5"+key).val(),
            licenseNum : $("#licenseNum"+key).val(),
            agency : $("#agency"+key).val(),
            bmk : $("#bmk4"+key).val(),
            pk : key

        }
        var formData = new FormData();
        formData.append("licenseName", data.licenseName);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("licenseNum", data.licenseNum);
        formData.append("agency", data.agency);
        formData.append("bmk", data.bmk);
        formData.append("menuCd", "license");
        formData.append("pk", data.pk);
        formData.append("certificateId", data.pk);

        if($("#certificateAddFile"+key)[0].files.length == 1){
            formData.append("certificateAddFile", $("#certificateAddFile"+key)[0].files[0]);
        }

        if($("#licenseName"+key).val()==""){ alert("면허 종류를 입력해주세요."); return;}
        /*if($("#sDate5"+key).val()==""){ alert("취득일을 입력해주세요."); return;}
        if($("#licenseNum"+key).val()==""){ alert("자격번호를 입력해주세요."); return;}
        if($("#agency"+key).val()==""){ alert("발급기관을 입력해주세요."); return;}*/
       /* if($("#certificateAddFile"+key).val()==""){ alert("증명서를 첨부해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userLinInfoModify',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정이 완료 되었습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 보유면허 삭제
    function fu_LinDelInfo(key) {
        if(confirm("삭제하시겠습니까?")){
            var data = {
                key : key
            }
            var result = customKendo.fn_customAjax('/useManage/userLinInfoDelete',data);
            if(result.flag){
                alert("삭제되었습니다.");
                location.reload();

            }else {
                alert("오류가 발생하였습니다.");
            }
        }
    }

    // 직무사항 추가
    function fu_JobAddInfo(){
        var data = {
            empSeq1 : $("#empSeq1").val(),
            empName1 : $("#empName1").val(),
            WORK_PAY : $("#pay1").val(),
            sDate : $("#sDate8").val(),
            eDate : $("#eDate8").val(),
            DUTY_DETAIL : $("#work1").val(),
            POSITON_NAME : $("#rank2").val()
        }

        var formData = new FormData();
        formData.append("empSeq1", data.empSeq1);
        formData.append("empName1", data.empName1);
        formData.append("WORK_PAY", data.WORK_PAY);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("DUTY_DETAIL", data.DUTY_DETAIL);
        formData.append("POSITON_NAME", data.POSITON_NAME);

        if($("#sDate8").val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#eDate8").val()==""){ alert("기간를 입력해주세요."); return;}
        /*if($("#pay1").val()==""){ alert("계약연봉을 입력해주세요."); return;}
        if($("#work1").val()==""){ alert("주요직무를 입력해주세요."); return;}
        if($("#rank2").val()==""){ alert("직급을 입력해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userJobInfoInsert',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("등록을 성공하였습니다.");
                location.reload();
            }else{
                alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 직무사항 수정
    function fu_JobModifyInfo(key) {
        var data = {
            WORK_PAY : $("#pay"+ key).val(),
            sDate : $("#sDate7"+ key).val(),
            eDate : $("#eDate7"+ key).val(),
            DUTY_DETAIL : $("#work"+ key).val(),
            POSITON_NAME : $("#rank1"+ key).val(),
            pk : key
        }
        var formData = new FormData();
        formData.append("WORK_PAY", data.WORK_PAY);
        formData.append("sDate", data.sDate);
        formData.append("eDate", data.eDate);
        formData.append("DUTY_DETAIL", data.DUTY_DETAIL);
        formData.append("POSITON_NAME", data.POSITON_NAME);
        formData.append("pk", data.pk);

        if($("#sDate7"+ key).val()==""){ alert("기간을 입력해주세요."); return;}
        if($("#eDate7"+ key).val()==""){ alert("기간를 입력해주세요."); return;}
        /*if($("#pay"+ key).val()==""){ alert("계약연봉을 입력해주세요."); return;}
        if($("#work"+ key).val()==""){ alert("주요직무를 입력해주세요."); return;}
        if($("#rank1"+ key).val()==""){ alert("직급을 입력해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userJobInfoModify',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정이 완료 되었습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 직무 삭제
    function fu_JobDelInfo(key) {
        if (confirm("삭제하시겠습니까?")) {
            var data = {
                key: key
            }
            var result = customKendo.fn_customAjax('/useManage/userJobInfoDelete', data);
            if (result.flag) {
                alert("삭제되었습니다.");
                location.reload();
            } else {
                alert("오류가 발생하였습니다.");
            }
        }
    }

    // 상벌사항 추가
    function fu_RewAddInfo(){
        var data = {
            empSeq1 : $("#empSeq1").val(),
            empName1 : $("#empName1").val(),
            erpEmpSeq : $("#erpEmpSeq1").val(),
            deptSeq : $("#deptSeq1").val(),
            deptName : $("#deptName1").val(),
            teamName : $("#teamName1").val(),
            rGubunOutInType : $("#rGubunOutIn1").data("kendoDropDownList").value(),
            rGubunOutInName : $("#rGubunOutIn1").data("kendoDropDownList").text(),
            rGubun : $("#rGubun1").val(),
            rGubunAll : ($("#rGubunOutIn1").data("kendoDropDownList").text() + $("#rGubun").val()),
            sDate : $("#sDate10").val(),
            rwdSn : $("#rwdSn1").val(),
            rIssue : $("#rIssue1").val(),
            agency : $("#agency3").val()
        }

        var formData = new FormData();
        formData.append("empSeq1", data.empSeq1);
        formData.append("empName1", data.empName1);
        formData.append("erpEmpSeq", data.erpEmpSeq);
        formData.append("deptSeq", data.deptSeq);
        formData.append("deptName", data.deptName);
        formData.append("teamName", data.teamName);
        formData.append("rGubunOutInType", data.rGubunOutInType);
        formData.append("rGubunOutInName", data.rGubunOutInName);
        formData.append("rGubun", data.rGubun);
        formData.append("rGubunAll", data.rGubunAll);
        formData.append("sDate", data.sDate);
        formData.append("rwdSn", data.rwdSn);
        formData.append("rIssue", data.rIssue);
        formData.append("agency", data.agency);
        formData.append("menuCd", "reward");
        formData.append("applicationactive", data.applicationactive);

        if($("#rewardAddFile")[0].files.length == 1){
            formData.append("rewardAddFile", $("#rewardAddFile")[0].files[0]);
        }

        if($("#rGubunOutIn1").data("kendoDropDownList").value()==""){ alert("내/외부를 선택해주세요."); return;}
        /*if($("#rGubun1").val()==""){ alert("포상/징계 구분을 입력해주세요."); return;}
        if($("#sDate10").val()==""){ alert("포상/징계 일자를 입력해주세요."); return;}
        if($("#rwdSn1").val()==""){ alert("포상/징계 번호를 입력해주세요."); return;}
        if($("#rIssue1").val()==""){ alert("공적사항을 입력해주세요."); return;}
        if($("#agency3").val()==""){ alert("시행처을 입력해주세요."); return;}
        if($("#rewardAddFile").val()==""){ alert("증명서를 첨부해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userRewInfoInsert',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("등록을 성공하였습니다.");
                location.reload();
            }else{
                alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("등록에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 싱발사항 수정
    function fu_RewModifyInfo(key) {
        var data = {
            rGubunOutInType : $("#rGubunOutIn"+key).data("kendoDropDownList").value(),
            rGubunOutInName : $("#rGubunOutIn"+key).data("kendoDropDownList").text(),
            rGubun : $("#rGubun"+key).val(),
            sDate : $("#sDate9"+key).val(),
            rwdSn : $("#rwdSn"+key).val(),
            rIssue : $("#rIssue"+key).val(),
            agency : $("#agency2"+key).val(),
            pk : key
        }

        var formData = new FormData();
        formData.append("rGubunOutInType", data.rGubunOutInType);
        formData.append("rGubunOutInName", data.rGubunOutInName);
        formData.append("rGubun", data.rGubun);
        formData.append("rwdSn", data.rwdSn);
        formData.append("sDate", data.sDate);
        formData.append("rIssue", data.rIssue);
        formData.append("agency", data.agency);
        formData.append("menuCd", "reward");
        formData.append("pk", data.pk);
        formData.append("applicationactive", data.applicationactive);
        formData.append("rewordId", data.pk);

        if($("#rewardAddFile"+key)[0].files.length == 1){
            formData.append("rewardAddFile", $("#rewardAddFile"+key)[0].files[0]);
        }

        if($("#rGubunOutIn"+key).data("kendoDropDownList").value()==""){ alert("내/외부를 선택해주세요."); return;}
        /*if($("#rGubun"+key).val()==""){ alert("포상/징계 구분을 입력해주세요."); return;}
        if($("#sDate9"+key).val()==""){ alert("포상/징계 일자를 입력해주세요."); return;}
        if($("#rwdSn"+key).val()==""){ alert("포상/징계 번호를 입력해주세요."); return;}
        if($("#rIssue"+key).val()==""){ alert("공적사항을 입력해주세요."); return;}
        if($("#agency2"+key).val()==""){ alert("시행처을 입력해주세요."); return;}*/
     /*   if($("#rewardAddFile"+key).val()==""){ alert("증명서를 첨부해주세요."); return;}*/

        var result = customKendo.fn_customFormDataAjax('/useManage/userRewInfoModify',formData);
        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정이 완료 되었습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }
    // 상벌사항 삭제
    function fu_RewDelInfo(key) {
        if (confirm("삭제하시겠습니까?")) {
            var data = {
                key: key
            }
            var result = customKendo.fn_customAjax('/useManage/userRewInfoDelete', data);
            if (result.flag) {
                alert("삭제되었습니다.");
                location.reload();

            } else {
                alert("오류가 발생하였습니다.");
            }
        }
    }

    // 비고 수정
    function fu_etcModInfo(){
        var data = {
            empSeq : $("#empSeq").val(),
            cardEtc : $("#cardEtc").val()
        }

        if($("#cardEtc").val() == ""){ alert("내용을 입력해주세요."); return; }

        var result = customKendo.fn_customAjax("/userManage/setCardEtc", data);

        if(result.flag){
            if(result.rs == "SUCCESS") {
                alert("수정을 성공하였습니다.");
                /*location.reload();*/
            }else{
                alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
            }
        }else{
            alert("수정에 실패하였습니다. 다시 확인부탁드립니다.");
        }
    }

    function fileChange(e){
        $(e).next().text($(e)[0].files[0].name);
    }
    function listBack(){
        open_in_frame('/Inside/userPersonList.do');
    }

</script>