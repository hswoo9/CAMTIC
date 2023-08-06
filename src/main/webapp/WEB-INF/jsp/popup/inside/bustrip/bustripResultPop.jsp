<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripReqPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResultPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/carPop.js?v=${today}"></script>
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
<input type="hidden" id="mod" value="${params.mode}"/>
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">출장결과보고</h3>
            <div class="btn-st popButton">
                <c:choose>
                    <c:when test="${params.mode eq 'mng' && rs.EXP_STAT == 10}">
                        <input type="button" class="k-button k-button-solid-info" value="승인" onclick="bustripResultPop.fn_setCertRep('100');"/>
                        <input type="button" class="k-button k-button-solid-error" value="반려" onclick="bustripResultPop.fn_setCertRep('30');"/>
                    </c:when>
                    <c:when test="${rs.EXP_STAT != 10 || rs.EXP_STAT != 100}">
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
            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <table class="popTable table table-bordered mb-0" id="inBustripReqPopTb">
                <colgroup>
                    <col width="10%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th>사번</th>
                    <td>
                        <input type="text" id="empSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
                    </td>
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>부서명</th>
                    <td>
                        <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;">
                    </td>
                    <th>신청일</th>
                    <td>
                        <input type="text" id="reqDate" name="reqDate" class="defaultVal" disabled style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>구분</th>
                    <td>
                        <input type="text" id="tripCode" style="width: 80%;">
                    </td>
                    <th><span class="red-star">*</span>관련사업</th>
                    <td>
                        <input type="text" id="project" style="width: 80%;">
                    </td>
                </tr>
                <tr id="busnLine" style="display: none;">
                    <th><span class="red-star">*</span>사업명</th>
                    <td colspan="3">
                        <input type="text" id="busnName" name="busnName" readonly style="width: 80%;">
                        <button type="button" class="k-button k-button-solid-info" id="projectAddBtn">사업선택</button>
                    </td>
                </tr>
                <tr>
                    <th>동반자</th>
                    <td colspan="3">
                        <input type="text" id="popEmpName" name="bustripAdd" readonly style="width: 80%;">
                        <button type="button" class="k-button k-button-solid-info" id="addMemberBtn" onclick="fn_userMultiSelectPop();">출장자 추가</button>
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
                        <input type="text" id="visitCrm" style="width: 60%;">
                        <button type="button" class="k-button-solid-base k-button" disabled>업체선택</button>
                    </td>
                    <th><span class="red-star">*</span>출장지역</th>
                    <td>
                        <input type="text" id="visitLoc" style="width: 80%;">
                    </td>
                </tr>
                <tr>
                    <th>경유지</th>
                    <td>
                        <div style="display: flex">
                            <input type="text" id="visitLocCode" style="width: 180px;">
                            <div class="visitMove" style="display: none; margin-left: 10px; margin-top: 5px"><span class="visitMoveSpan"></span></div>
                        </div>
                    </td>
                    <th class="visitLocSub" style="display: none"><span class="red-star">*</span>경유지명</th>
                    <td class="visitLocSub" style="display: none;">
                        <input type="text" id="visitLocSub" style="width: 80%;"/>
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>출장일</th>
                    <td colspan="3">
                        <input type="text" id="date1" style="width: 20%">
                        <input type="text" id="time1" style="width: 13%"> ~
                        <input type="text" id="date2" style="width: 20%">
                        <input type="text" id="time2" style="width: 13%">
                    </td>
                </tr>
                <tr id="carLine">
                    <th>차량</th>
                    <td colspan="3">
                        <input type="text" id="carList" style="width: 40%;">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>출장목적</th>
                    <td colspan="3">
                        <textarea id="bustObj" style="width: 100%; height: 60px"></textarea>
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>운행거리</th>
                    <td colspan="3">
                        <input type="text" id="moveDst" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 10%; text-align: right"> km
                        <button type="button" class="k-button k-button-solid-base" id="moveBtn" onclick="window.open('https://map.naver.com/')">거리측정</button>
                        <button type="button" class="k-button k-button-solid-base" disabled>하이패스</button>
                        ID : camtic0, PW : camtic43   하이패스 번호 : 4617-7550-0003-9145
                        [<a href="#">이용방법 보기</a>]
                    </td>
                </tr>
                <tr>
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
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title">첨부파일</h3>
                </div>
                <div>
                    <div class="table-responsive">
                        <table class="popTable table table-bordered mb-0">
                            <colgroup>
                                <col width="50%">
                                <col width="10%">
                                <col width="30%">
                            </colgroup>
                            <thead>
                            <tr class="text-center th-color">
                                <th>파일명</th>
                                <th>확장자</th>
                                <th>용량</th>
                            </tr>
                            </thead>
                            <tbody id="fileGrid">
                            <tr class="defultTr">
                                <td colspan="3" style="text-align: center">선택된 파일이 없습니다.</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
<script>
    const hrBizReqId = '${params.hrBizReqId}';
    const hrBizReqResultId = '${params.hrBizReqResultId}';
    console.log('${rs}');
    let pageName = 'bustripResReq';
    bustripResultPop.init();
</script>
</body>
