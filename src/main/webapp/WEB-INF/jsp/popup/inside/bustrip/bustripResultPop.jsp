<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>
    .bustripExnpTable td {text-align: right;}

    .pdfDiv table th{
        background-color: #ffe0e0;
        font-weight: bold;
    }
</style>

<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/business/business.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResult.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripInit.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResultPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/carPop.js?v=${today}"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripPopup.js?v=${today}"></script>


<script type="text/javascript" src="/js/intra/inside/recruit/fontJs.js?v=${today}"></script>
<script type="text/javascript" src="/js/jspdf.min.js"></script>
<script type="text/javascript" src="/js/html2canvas.min.js"></script>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
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
<input type="hidden" id="carReqSn" value=""/>
<input type="hidden" id="companionChangeCheck" value="N"/>
<input type="hidden" id="tripType" value="${params.tripType}"/>

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
                <c:when test="${rs.STATUS != 10 && rs.STATUS != 100}">
                    <input type="button" id="saveBtn" class="k-button k-button-solid-info" value="다음단계" onclick="bustripResultPop.fn_saveBtn('${params.hrBizReqResultId}')" />
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close()" />
                </c:when>
                <c:otherwise>
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close()" />
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
                    <input id="regEmpName" name="regEmpName" class="defaultVal" value="${loginVO.name}" style="width: 80%;" disabled>
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
            <tr>
                <th>출장자</th>
                <td colspan="5">
                    <input type="text" id="empName" name="empName" value="" style="width: 20%;" disabled>
                    <input type="hidden" id="empSeq" name="empSeq" value="" style="width: 20%;" disabled>
                    <button type="button" class="k-button k-button-solid-info" onclick="fn_userMultiSelectPop('bustripT');" disabled>출장자 변경</button>
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
                    <button type="button" class="k-button k-button-solid-info" id="projectAddBtn" onclick="bustripResultPop.fn_projectPop()">사업선택</button>
                </td>
            </tr>
            <tr>
                <th>출장자</th>
                <td>
                    <input id="popEmpName" name="bustripAdd" readonly style="width: 70%;">
                    <button type="button" class="k-button k-button-solid-info" id="addMemberBtn" disabled onclick="fn_userMultiSelectPop('bustrip');">출장자 추가</button>
                    <div id="companionList">
                        <input type="hidden" id="popEmpSeq" name="companionEmpSeq" value="">
                        <input type="hidden" id="popDeptSeq" name="companionDeptSeq" value="">
                        <input type="hidden" id="popDeptName" name="companionDeptSeq" value="">
                    </div>
                </td>
                <th>외부인력</th>
                <td>
                    <input id="externalName" name="bustripAdd" readonly style="width: 290px;">
                    <button type="button" id="exAddBtn" class="k-button k-button-solid-info" onclick="bustripPop.addExternalWorkforcePop();">외부인력 추가</button>
                    <div id="externalList">
                        <input type="hidden" id="externalBelong" name="externalEmpSeq" value="">
                        <input type="hidden" id="externalSpot" name="companionDeptSeq" value="">
                        <input type="hidden" id="externalEtc" name="companionDeptSeq" value="">
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
                    <span id="inputWrap" style="display: none;"><input type="text" id="carRmk" style="width: 200px;"></span>
                    <span id="costText" style="margin-left: 5px">(10km당 기준유가 1,650원 반영)</span>
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
                    <button type="button" class="k-button k-button-solid-base" id="formDown" onclick="bustripResultPop.mapFormDown()">양식다운로드</button>
                    <button type="button" class="k-button k-button-solid-base" id="mapBtn" onclick="bustripResultPop.fn_mapOpen()">지도보기</button>
                    <button type="button" class="k-button k-button-solid-base" id="highpassBtn" onclick="window.open('https://www.hipass.co.kr/')">하이패스</button>
                    ID : camtic0, PW : camtic43   하이패스 번호 : 4617-7550-0003-9145
                    [<a href="#" onclick="bustripResultPop.boardViewPop()">이용방법 보기</a>]
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
    </form>

    <div>
        <form style="padding: 0px 30px;">
            <div class="card-header" style="padding: 5px;">
                <h3 class="card-title">첨부파일</h3>
                <div class="card-options">
                    <%--<button type="button" class="k-button k-button-solid-base" id="fileViewer" style="display: none;" onclick="bustripPdfMake()">뷰어</button>--%>
                    <div class="filebox">
                        <%--                        <button type="button" class="k-button k-button-solid-info" id="testBtn" onclick="bustripResultPop.makeHtmlToPdf()">테스트</button>--%>
                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                            <span class="k-button-text">파일첨부</span>
                        </button>
                        <input type="file" id="fileList" name="fileList" onchange="bustripResultPop.addFileInfoTable();" multiple style="display: none"/>
                        <button type="button" class="k-button k-button-solid-base" onclick="bustrip.fn_multiDownload();" style="margin-left: 5px;">일괄 다운로드</button>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="50%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr class="text-center th-color">
                        <th>파일명</th>
                        <th>확장자</th>
                        <th>용량</th>
                        <th>뷰어</th>
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

    <%--<div id="bustExnpDiv" style="text-align: right; display: none; margin-top: 10px">
        <input type="button" class="k-button k-button-solid-info" value="여비 변경" onclick="bustripResultPop.bustripExnpPop();"/>
    </div>--%>

    <%--  국내 경비내역  --%>
    <c:if test="${params.tripType ne '4'}">
        <form style="padding: 20px 30px;">
            <div class="card-header" style="padding: 5px;">
                <h3 class="card-title">경비 내역</h3>
            </div>
            <table class="popTable table table-bordered mb-0 bustripExnpTable">
                <colgroup>
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                </colgroup>
                <thead>
                <tr>
                    <th>이름</th>
                    <th>유류비</th>
                    <th>교통비</th>
                    <th>숙박비</th>
                    <th>통행료</th>
                    <th>일비</th>
                    <th>식비</th>
                    <th>주차비</th>
                    <th>기타</th>
                    <th>합계</th>
                </tr>
                <c:if test="${list ne null}">
                    <c:forEach var="list" items="${list}">
                        <c:if test="${list.DIVISION eq '1'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">${list.EMP_NAME}</div>
                                </td>
                                <td>
                                        ${list.OIL_COST}
                                </td>
                                <td>
                                        ${list.TRAF_COST}
                                </td>
                                <td>
                                        ${list.ROOM_COST}
                                </td>
                                <td>
                                        ${list.TOLL_COST}
                                </td>
                                <td>
                                        ${list.DAY_COST}
                                </td>
                                <td>
                                        ${list.EAT_COST}
                                </td>
                                <td>
                                        ${list.PARKING_COST}
                                </td>
                                <td>
                                        ${list.ETC_COST}
                                </td>
                                <td>
                                        ${list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '5'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">${list.EMP_NAME}</div>
                                </td>
                                <td>
                                        ${list.OIL_COST}
                                </td>
                                <td>
                                        ${list.TRAF_COST}
                                </td>
                                <td>
                                        ${list.ROOM_COST}
                                </td>
                                <td>
                                        ${list.TOLL_COST}
                                </td>
                                <td>
                                        ${list.DAY_COST}
                                </td>
                                <td>
                                        ${list.EAT_COST}
                                </td>
                                <td>
                                        ${list.PARKING_COST}
                                </td>
                                <td>
                                        ${list.ETC_COST}
                                </td>
                                <td>
                                        ${list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '2'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">법인카드</div>
                                </td>
                                <td>
                                        ${empty list.OIL_COST ? '0' : list.OIL_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.TOLL_COST ? '0' : list.TOLL_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.PARKING_COST ? '0' : list.PARKING_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '3'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">법인차량</div>
                                </td>
                                <td>
                                        ${list.OIL_COST}
                                </td>
                                <td>
                                        ${list.TRAF_COST}
                                </td>
                                <td>
                                        ${list.ROOM_COST}
                                </td>
                                <td>
                                        ${list.TOLL_COST}
                                </td>
                                <td>
                                        ${list.DAY_COST}
                                </td>
                                <td>
                                        ${list.EAT_COST}
                                </td>
                                <td>
                                        ${list.PARKING_COST}
                                </td>
                                <td>
                                        ${list.ETC_COST}
                                </td>
                                <td>
                                        ${list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <tr>
                        <td>
                            <div style="text-align: center">합계</div>
                        </td>
                        <td>
                            <span type="text" id="oilTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="trafTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="roomTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="tollTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="dayTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="eatTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="parkingTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="etcTotalCost" class="totalCost"></span>
                        </td>
                        <td>
                            <span type="text" id="totalTotalCost" class="totalCost"></span>
                        </td>
                    </tr>
                </c:if>
                </thead>
            </table>
        </form>
    </c:if>
    <c:if test="${params.tripType eq '4'}">
        <form style="padding: 20px 30px;">
            <div class="card-header" style="padding: 5px;">
                <h3 class="card-title">경비 내역</h3>
            </div>
            <table class="popTable table table-bordered mb-0 bustripExnpTable">
                <colgroup>
                    <col width="9%">
                    <col width="9%">
                    <col width="12%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                    <col width="9%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="10" style="font-size: 13px; font-weight: bold;">사전정산</th>
                </tr>
                <tr>
                    <th>이름</th>
                    <th>항공료</th>
                    <th>국내이동교통비</th>
                    <th>숙박비</th>
                    <th>비자발급비</th>
                    <th>일비</th>
                    <th>식비</th>
                    <th>보험료</th>
                    <th>기타</th>
                    <th>합계</th>
                </tr>
                <c:if test="${list ne null}">
                    <c:forEach var="list" items="${list}">
                        <%-- 개인 --%>
                        <c:if test="${list.DIVISION eq '1'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">${list.EMP_NAME}</div>
                                </td>
                                <td>
                                        ${list.AIR_COST}
                                </td>
                                <td>
                                        ${list.TRAF_COST}
                                </td>
                                <td>
                                        ${list.ROOM_COST}
                                </td>
                                <td>
                                        ${list.VISA_COST}
                                </td>
                                <td>
                                        ${list.DAY_COST}
                                </td>
                                <td>
                                        ${list.EAT_COST}
                                </td>
                                <td>
                                        ${list.INS_COST}
                                </td>
                                <td>
                                        ${list.ETC_COST}
                                </td>
                                <td>
                                        ${list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '5'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">${list.EMP_NAME}</div>
                                </td>
                                <td>
                                        ${list.AIR_COST}
                                </td>
                                <td>
                                        ${list.TRAF_COST}
                                </td>
                                <td>
                                        ${list.ROOM_COST}
                                </td>
                                <td>
                                        ${list.VISA_COST}
                                </td>
                                <td>
                                        ${list.DAY_COST}
                                </td>
                                <td>
                                        ${list.EAT_COST}
                                </td>
                                <td>
                                        ${list.INS_COST}
                                </td>
                                <td>
                                        ${list.ETC_COST}
                                </td>
                                <td>
                                        ${list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '4'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">업체지급</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '2'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">법인카드</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '3'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">법인차량</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <tr>
                        <td>
                            <div style="text-align: center; font-weight: bold;">합계</div>
                        </td>
                        <td>
                            <span type="text" id="airTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="trafTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="roomTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="visaTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="dayTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="eatTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="insTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="etcTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="totalTotalCost1" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                    </tr>
                </c:if>

                <tr>
                    <th colspan="10" style="font-size: 13px; font-weight: bold;">사후정산</th>
                </tr>
                <tr>
                    <th>이름</th>
                    <th>항공료</th>
                    <th>국내이동교통비</th>
                    <th>숙박비</th>
                    <th>비자발급비</th>
                    <th>일비</th>
                    <th>식비</th>
                    <th>보험료</th>
                    <th>기타</th>
                    <th>합계</th>
                </tr>
                <c:if test="${list2 ne null}">
                    <c:forEach var="list" items="${list2}">
                        <%-- 개인 --%>
                        <c:if test="${list.DIVISION eq '1'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">${list.EMP_NAME}</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '5'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">${list.EMP_NAME}</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '4'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">업체지급</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '2'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">법인카드</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION eq '3'}">
                            <tr>
                                <td>
                                    <div style="text-align: center">법인차량</div>
                                </td>
                                <td>
                                        ${empty list.AIR_COST ? '0' : list.AIR_COST}
                                </td>
                                <td>
                                        ${empty list.TRAF_COST ? '0' : list.TRAF_COST}
                                </td>
                                <td>
                                        ${empty list.ROOM_COST ? '0' : list.ROOM_COST}
                                </td>
                                <td>
                                        ${empty list.VISA_COST ? '0' : list.VISA_COST}
                                </td>
                                <td>
                                        ${empty list.DAY_COST ? '0' : list.DAY_COST}
                                </td>
                                <td>
                                        ${empty list.EAT_COST ? '0' : list.EAT_COST}
                                </td>
                                <td>
                                        ${empty list.INS_COST ? '0' : list.INS_COST}
                                </td>
                                <td>
                                        ${empty list.ETC_COST ? '0' : list.ETC_COST}
                                </td>
                                <td>
                                        ${empty list.TOT_COST ? '0' : list.TOT_COST}
                                </td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <tr>
                        <td>
                            <div style="text-align: center; font-weight: bold;">합계</div>
                        </td>
                        <td>
                            <span type="text" id="airTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="trafTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="roomTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="visaTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="dayTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="eatTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="insTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="etcTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                        <td>
                            <span type="text" id="totalTotalCost2" class="totalCost" style="font-weight: bold;"></span>
                        </td>
                    </tr>
                </c:if>

                <tr>
                    <th colspan="10" style="font-size: 13px; font-weight: bold;">총합</th>
                </tr>
                <tr>
                    <th>이름</th>
                    <th>항공료</th>
                    <th>국내이동교통비</th>
                    <th>숙박비</th>
                    <th>비자발급비</th>
                    <th>일비</th>
                    <th>식비</th>
                    <th>보험료</th>
                    <th>기타</th>
                    <th>합계</th>
                </tr>

                <tr>
                    <td>
                        <div style="text-align: center; font-weight: bold;">합계</div>
                    </td>
                    <td>
                        <span type="text" id="airTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="trafTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="roomTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="visaTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="dayTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="eatTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="insTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="etcTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                    <td>
                        <span type="text" id="totalTotalCost3" class="totalCost" style="font-weight: bold;"></span>
                    </td>
                </tr>

                </thead>
            </table>
        </form>
    </c:if>
</div>

</div>

<div id="pdfDiv" class="pdfDiv" style="display: none;">
    <%--<form style="padding: 20px 30px;width:60%;">
        <h2 style="text-align: center;">여 비 지 출 증 빙 자 료</h2>
        <table style="padding-left: 5px;height:100%;width:100%;font-size: 15px;background: white;font-weight: bold;color: black;outline: 1px solid black;">
            <tr>
                <th style="width:110px;height: 40px;background-color: #ffe0e0;padding-left: 5px;border: 1px solid black;">사용일</th>
                <td style="padding-left: 5px; border: 1px solid black;"></td>
                <th style="width:110px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;">카드사용</th>
                <td style="padding-left: 5px; border: 1px solid black;"></td>
            </tr>
            <tr>
                <th style="width:110px; height: 40px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;">사용구분</th>
                <td style="padding-left: 5px; border: 1px solid black;"></td>
                <th style="width:110px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;">사용금액</th>
                <td style="padding-left: 5px; border: 1px solid black;"></td>
            </tr>
            <tr>
                <th style="width:110px; height: 40px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;">사용자</th>
                <td colspan="3" style="padding-left: 5px; border: 1px solid black;"></td>
            </tr>
            <tr>
                <th style="width:110px; height: 40px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;">사용목적</th>
                <td colspan="3" style="padding-left: 5px; border: 1px solid black;"></td>
            </tr>
            <tr>
                <th style="width:110px; height: 40px; background-color: #ffe0e0; padding-left: 5px; border: 1px solid black;">관련사업</th>
                <td colspan="3" style="padding-left: 5px; border: 1px solid black;"></td>
            </tr>
            <tr>
                <th colspan="4" style="background-color: #ffe0e0; height: 40px; padding-left: 5px; text-align: center; border: 1px solid black;">증 빙 서 류</th>
            </tr>
            <tr>
               <td colspan="4" style="height: 550px;border: 1px solid black;"></td>
            </tr>
        </table>
    </form>--%>
</div>
<script>
    const hrBizReqId = $("#hrBizReqId").val();
    const hrBizReqResultId = $("#hrBizReqResultId").val();
    bustripResultPop.init();

    var modelData = '${jsonList}';
    var modelData2 = '${jsonList2}';

    var airTot = 0;
    var trafTot = 0;
    var roomTot = 0;
    var visaTot = 0;
    var dayTot = 0;
    var eatTot = 0;
    var insTot = 0;
    var etcTot = 0;
    var totTot = 0;

    $(function () {
        // 사전정산
        if(modelData != null && modelData != ""){
            var dataList = JSON.parse(modelData);
            if($("#tripType").val() != '4'){

                var oilTotal = 0;
                var trafTotal = 0;
                var roomTotal = 0;
                var tollTotal = 0;
                var dayTotal = 0;
                var eatTotal = 0;
                var parkingTotal = 0;
                var etcTotal = 0;
                var totTotal = 0;

                $.each(dataList, function(index, item) {
                    oilTotal += Number(item.OIL_COST ? item.OIL_COST.replace(/,/g, '') : 0);
                    trafTotal += Number(item.TRAF_COST ? item.TRAF_COST.replace(/,/g, '') : 0);
                    roomTotal += Number(item.ROOM_COST ? item.ROOM_COST.replace(/,/g, '') : 0);
                    tollTotal += Number(item.TOLL_COST ? item.TOLL_COST.replace(/,/g, '') : 0);
                    dayTotal += Number(item.DAY_COST ? item.DAY_COST.replace(/,/g, '') : 0);
                    eatTotal += Number(item.EAT_COST ? item.EAT_COST.replace(/,/g, '') : 0);
                    parkingTotal += Number(item.PARKING_COST ? item.PARKING_COST.replace(/,/g, '') : 0);
                    etcTotal += Number(item.ETC_COST ? item.ETC_COST.replace(/,/g, '') : 0);
                    totTotal += Number(item.TOT_COST ? item.TOT_COST.replace(/,/g, '') : 0);
                });

                $('#oilTotalCost').text(oilTotal.toLocaleString());
                $('#trafTotalCost').text(trafTotal.toLocaleString());
                $('#roomTotalCost').text(roomTotal.toLocaleString());
                $('#tollTotalCost').text(tollTotal.toLocaleString());
                $('#dayTotalCost').text(dayTotal.toLocaleString());
                $('#eatTotalCost').text(eatTotal.toLocaleString());
                $('#parkingTotalCost').text(parkingTotal.toLocaleString());
                $('#etcTotalCost').text(etcTotal.toLocaleString());
                $('#totalTotalCost').text(totTotal.toLocaleString());

            } else {
                var airTotal = 0;
                var trafTotal = 0;
                var roomTotal = 0;
                var visaTotal = 0;
                var dayTotal = 0;
                var eatTotal = 0;
                var insTotal = 0;
                var etcTotal = 0;
                var totTotal = 0;

                $.each(dataList, function(index, item) {
                    airTotal += Number(item.AIR_COST ? item.AIR_COST.replace(/,/g, '') : 0);
                    trafTotal += Number(item.TRAF_COST ? item.TRAF_COST.replace(/,/g, '') : 0);
                    roomTotal += Number(item.ROOM_COST ? item.ROOM_COST.replace(/,/g, '') : 0);
                    visaTotal += Number(item.VISA_COST ? item.VISA_COST.replace(/,/g, '') : 0);
                    dayTotal += Number(item.DAY_COST ? item.DAY_COST.replace(/,/g, '') : 0);
                    eatTotal += Number(item.EAT_COST ? item.EAT_COST.replace(/,/g, '') : 0);
                    insTotal += Number(item.INS_COST ? item.INS_COST.replace(/,/g, '') : 0);
                    etcTotal += Number(item.ETC_COST ? item.ETC_COST.replace(/,/g, '') : 0);
                    totTotal += Number(item.TOT_COST ? item.TOT_COST.replace(/,/g, '') : 0);
                });

                airTot += airTotal;
                trafTot += trafTotal;
                roomTot += roomTotal;
                visaTot += visaTotal;
                dayTot += dayTotal;
                eatTot += eatTotal;
                insTot += insTotal;
                etcTot += etcTotal;
                totTot += totTotal;

                $('#airTotalCost1').text(airTotal.toLocaleString());
                $('#trafTotalCost1').text(trafTotal.toLocaleString());
                $('#roomTotalCost1').text(roomTotal.toLocaleString());
                $('#visaTotalCost1').text(visaTotal.toLocaleString());
                $('#dayTotalCost1').text(dayTotal.toLocaleString());
                $('#eatTotalCost1').text(eatTotal.toLocaleString());
                $('#insTotalCost1').text(insTotal.toLocaleString());
                $('#etcTotalCost1').text(etcTotal.toLocaleString());
                $('#totalTotalCost1').text(totTotal.toLocaleString());
            }

            // 총합
            $('#airTotalCost3').text(airTot.toLocaleString());
            $('#trafTotalCost3').text(trafTot.toLocaleString());
            $('#roomTotalCost3').text(roomTot.toLocaleString());
            $('#visaTotalCost3').text(visaTot.toLocaleString());
            $('#dayTotalCost3').text(dayTot.toLocaleString());
            $('#eatTotalCost3').text(eatTot.toLocaleString());
            $('#insTotalCost3').text(insTot.toLocaleString());
            $('#etcTotalCost3').text(etcTot.toLocaleString());
            $('#totalTotalCost3').text(totTot.toLocaleString());
        }

        // 사후정산
        if(modelData2 != null && modelData2 != ""){
            var dataList = JSON.parse(modelData2);
            console.log(dataList);

            if($("#tripType").val() != '4'){

            } else {
                var airTotal = 0;
                var trafTotal = 0;
                var roomTotal = 0;
                var visaTotal = 0;
                var dayTotal = 0;
                var eatTotal = 0;
                var insTotal = 0;
                var etcTotal = 0;
                var totTotal = 0;

                $.each(dataList, function(index, item) {
                    airTotal += Number(item.AIR_COST ? item.AIR_COST.replace(/,/g, '') : 0);
                    trafTotal += Number(item.TRAF_COST ? item.TRAF_COST.replace(/,/g, '') : 0);
                    roomTotal += Number(item.ROOM_COST ? item.ROOM_COST.replace(/,/g, '') : 0);
                    visaTotal += Number(item.VISA_COST ? item.VISA_COST.replace(/,/g, '') : 0);
                    dayTotal += Number(item.DAY_COST ? item.DAY_COST.replace(/,/g, '') : 0);
                    eatTotal += Number(item.EAT_COST ? item.EAT_COST.replace(/,/g, '') : 0);
                    insTotal += Number(item.INS_COST ? item.INS_COST.replace(/,/g, '') : 0);
                    etcTotal += Number(item.ETC_COST ? item.ETC_COST.replace(/,/g, '') : 0);
                    totTotal += Number(item.TOT_COST ? item.TOT_COST.replace(/,/g, '') : 0);
                });

                airTot += airTotal;
                trafTot += trafTotal;
                roomTot += roomTotal;
                visaTot += visaTotal;
                dayTot += dayTotal;
                eatTot += eatTotal;
                insTot += insTotal;
                etcTot += etcTotal;
                totTot += totTotal;

                $('#airTotalCost2').text(airTotal.toLocaleString());
                $('#trafTotalCost2').text(trafTotal.toLocaleString());
                $('#roomTotalCost2').text(roomTotal.toLocaleString());
                $('#visaTotalCost2').text(visaTotal.toLocaleString());
                $('#dayTotalCost2').text(dayTotal.toLocaleString());
                $('#eatTotalCost2').text(eatTotal.toLocaleString());
                $('#insTotalCost2').text(insTotal.toLocaleString());
                $('#etcTotalCost2').text(etcTotal.toLocaleString());
                $('#totalTotalCost2').text(totTotal.toLocaleString());

                // 총합
                $('#airTotalCost3').text(airTot.toLocaleString());
                $('#trafTotalCost3').text(trafTot.toLocaleString());
                $('#roomTotalCost3').text(roomTot.toLocaleString());
                $('#visaTotalCost3').text(visaTot.toLocaleString());
                $('#dayTotalCost3').text(dayTot.toLocaleString());
                $('#eatTotalCost3').text(eatTot.toLocaleString());
                $('#insTotalCost3').text(insTot.toLocaleString());
                $('#etcTotalCost3').text(etcTot.toLocaleString());
                $('#totalTotalCost3').text(totTot.toLocaleString());
            }
        }
    });

    function externalDataSet(externalArr){
        let belongText = "";
        let spotText = "";
        let nameText = "";
        let userDeptSn = "";
        for(let i=0; i<externalArr.length; i++) {
            if(nameText != "") {
                belongText += ",";
                spotText += ",";
                nameText += ",";
                userDeptSn += ",";
            }
            belongText += externalArr[i].belong;
            spotText += externalArr[i].spot;
            nameText += externalArr[i].name;
            userDeptSn += externalArr[i].etc;
        }

        $("#externalBelong").val(belongText);
        $("#externalSpot").val(spotText);
        $("#externalName").val(nameText);
        $("#externalEtc").val(userDeptSn);
    }
</script>
</body>
