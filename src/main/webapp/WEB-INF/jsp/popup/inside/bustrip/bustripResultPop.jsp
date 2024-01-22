<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/business/business.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResult.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripInit.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResultPop.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<body class="font-opensans" style="background-color:#fff;">
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
<input type="hidden" id="pageName" value="bustripResultPop"/>
<input type="hidden" id="mod" value="${params.mode}"/>
<input type="hidden" id="hrBizReqId" value="${params.hrBizReqId}"/>
<input type="hidden" id="companionChangeCheck" value="N"/>

<form id="bustripResDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="bustrip">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="hrBizReqResultId" name="hrBizReqResultId" value="${params.hrBizReqResultId}"/>
</form>
<span></span>
<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">출장결과보고</h3>
        <div class="btn-st popButton">
            <span id="apprBtnBox">

            </span>
            <c:choose>
                <c:when test="${params.mode eq 'mng' && rs.EXP_STAT == 10}">
                    <input type="button" class="k-button k-button-solid-info" value="승인" onclick="bustripResultPop.fn_setCertRep('100');"/>
                    <input type="button" class="k-button k-button-solid-error" value="반려" onclick="bustripResultPop.fn_setCertRep('30');"/>
                </c:when>
                <c:when test="${rs.EXP_STAT != 10}">
                    <input type="button" id="saveBtn" class="k-button k-button-solid-info" value="다음단계" onclick="bustripResultPop.fn_saveBtn('${params.hrBizReqResultId}')" />
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:when>
                <c:otherwise>
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <form id="inBustripReqPop" style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0" id="">
            <colgroup>
                <col width="8%">
                <col width="25%">
                <col width="8%">
                <col width="24%">
                <col width="8%">
                <col width="24%">
            </colgroup>
            <thead>
            <tr>
                <th>성명</th>
                <td>
                    <input id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;" disabled>
                </td>
                <th>부서명</th>
                <td>
                    <input id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;" disabled>
                </td>
                <th>신청일</th>
                <td>
                    <input id="reqDate" name="reqDate" class="defaultVal" style="width: 80%;" disabled>
                </td>
            </tr>
            </thead>
        </table>
        <table class="popTable table table-bordered mb-0" id="bustripReqPopTb">
            <colgroup>
                <col width="10%">
                <col width="40%">
                <col width="10%">
                <col width="40%">
            </colgroup>
            <thead>
            <tr>
                <th><span class="red-star">*</span>구분</th>
                <td>
                    <span id="tripCode"></span>
                </td>
                <th><span class="red-star">*</span>관련사업</th>
                <td>
                    <span id="project"></span>
                </td>
            </tr>
            <tr id="busnLine">
                <th><span class="red-star">*</span>사업명</th>
                <td colspan="3">
                    <input id="busnName" name="busnName" disabled style="width: 80%;">
                    <input type="hidden" id="pjtSn" />
                    <button type="button" class="k-button k-button-solid-info" id="projectAddBtn" disabled>사업선택</button>
                </td>
            </tr>
            <tr>
                <th>출장자</th>
                <td colspan="3">
                    <input id="popEmpName" name="bustripAdd" readonly style="width: 80%;">
                    <button type="button" class="k-button k-button-solid-info" id="addMemberBtn" onclick="fn_userMultiSelectPop('bustrip');">출장자 추가</button>
                    <button type="button" class="k-button k-button-solid-base" id="test" disabled>외부인력 추가</button>
                    <div id="companionList">
                        <input type="hidden" id="popEmpSeq" name="companionEmpSeq" value="">
                        <input type="hidden" id="popDeptSeq" name="companionDeptSeq" value="">
                        <input type="hidden" id="popDeptName" name="companionDeptSeq" value="">
                    </div>
                </td>

            </tr>
            <tr>
                <th><span class="red-star">*</span>방문지</th>
                <td>
                    <input id="visitCrm" style="width: 60%;">
                    <input type="hidden" id="crmSn" />
                    <button id="crmBtn" type="button" class="k-button-solid-base k-button" onclick="bustripResultPop.fn_popCamCrmList()">업체선택</button>
                    <span style="margin-left: 10px;">
                        <input type="checkbox" id="crmYn" name="crmYn" checked onclick="bustripResultPop.fn_crmChk();"/>
                        <label for="crmYn">CRM 연계</label>
                    </span>
                </td>
                <th class="bustripTh"><span class="red-star">*</span>출장지역</th>
                <td class="bustripTh">
                    <input id="visitLoc" style="width: 75%;">
                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="bustripResultPop.addrSearch();"/>
                </td>

                <th class="businessTh" style="display: none"><span class="red-star">*</span>출장국가</th>
                <td class="businessTh" style="display: none">
                    <input id="nationList" style="width: 75%;" />
                    <span style="margin-left: 3px; color: red" id="nationText"></span>
                </td>
            </tr>
            <tr>
                <th>경유지</th>
                <td>
                    <div style="display: flex">
                        <input id="visitLocCode" style="width: 180px;">
                        <div class="visitMove" style="display: none; margin-left: 10px; margin-top: 5px"><span class="visitMoveSpan"></span></div>
                    </div>
                </td>
                <th class="visitLocSub" style="display: none"><span class="red-star">*</span>경유지명</th>
                <td class="visitLocSub" style="display: none;">
                    <input id="visitLocSub" style="width: 80%;"/>
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>출장일</th>
                <td colspan="3">
                    <input id="date1" style="width: 20%">
                    <input id="time1" style="width: 13%"> ~
                    <input id="date2" style="width: 20%">
                    <input id="time2" style="width: 13%">
                </td>
            </tr>
            <tr id="carLine">

                <th><span class="red-star">*</span>차량</th>
                <td colspan="3">
                    <input id="carList" style="width: 180px;">
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>출장목적</th>
                <td colspan="3">
                    <textarea id="bustObj" style="width: 100%; height: 60px"></textarea>
                </td>
            </tr>
            <tr class="bustripTr">
                <th><span class="red-star">*</span>운행거리</th>
                <td colspan="3">
                    <input type="text" id="moveDst" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 10%; text-align: right"> km
                    <button type="button" class="k-button k-button-solid-base" id="moveBtn" onclick="bustripResultPop.fn_moveCheck()">거리계산</button>
                    <button type="button" class="k-button k-button-solid-base" id="highpassBtn" disabled>하이패스</button>
                    ID : camtic0, PW : camtic43   하이패스 번호 : 4617-7550-0003-9145
                    [<a href="#" onclick="bustripResultPop.boardViewPop()" target="_blank">이용방법 보기</a>]
                </td>
            </tr>
            <tr class="bustripTr">
                <th><span class="red-star">*</span>운행자</th>
                <td>
                    <input type="text" id="realDriver" />
                </td>
            </tr>
            <tr>
                <th><span class="red-star">*</span>출장결과</th>
                <td colspan="3">
                    <textarea id="result" style="width: 100%; height: 60px"></textarea>
                </td>
            </tr>
            </thead>
        </table>

        <div id="bustExnpDiv" style="text-align: right; display: none; margin-top: 10px">
            <input type="button" class="k-button k-button-solid-info" value="여비 변경" onclick="bustripResultPop.bustripExnpPop();"/>
        </div>
        <table class="popTable table table-bordered mb-0" id="bustExnpTb" style="display: none">
            <colgroup>

            </colgroup>
            <thead>
            <tr>
                <th>이름</th>
                <th>유류비</th>
                <th>교통비</th>
                <th>교통일비</th>
                <th>통행료</th>
                <th>일비</th>
                <th>식비</th>
                <th>주차비</th>
                <th>기타</th>
                <th>합계</th>
            </tr>
            </thead>
            <tbody id="bustExnpBody">

            </tbody>
        </table>
    </form>

    <div>
        <form style="padding: 0px 30px;">
            <div class="table-responsive">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="50%">
                        <col width="10%">
                        <col width="30%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr class="text-center th-color">
                        <th>파일명</th>
                        <th>확장자</th>
                        <th>용량</th>
                        <th>기타</th>
                    </tr>
                    </thead>
                    <tbody id="fileGrid">
                    <tr class="defultTr">
                        <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>
<script>
    const hrBizReqId = $("#hrBizReqId").val();
    const hrBizReqResultId = $("#hrBizReqResultId").val();
    bustripResultPop.init();
</script>
</body>
