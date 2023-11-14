<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    td {
        padding-left: 5px !important;
        padding-right: 5px !important;;
    }
</style>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripExnpPop.js?v=${today}"></script>
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
<input type="hidden" id="hrBizReqId" value="${params.hrBizReqId}"/>
<input type="hidden" id="mod" value="${params.mode}"/>
<input type="hidden" id="type" value="${type}"/>
<div class="table-responsive">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">출장 여비정산</h3>
        <div class="btn-st popButton">
            <c:choose>
                <c:when test="${rs.EXP_STAT == 100}">
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:when>
                <c:when test="${rs.EXP_STAT != 10}">
                    <input type="button" class="k-button k-button-solid-info" value="승인요청" onclick="bustripExnpReq.fn_saveBtn('${params.hrBizReqId}', '${type}')" />
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:when>
                <c:otherwise>
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="opener.gridReload(); window.close()" />
                </c:otherwise>
            </c:choose>
        </div>
    </div>
    <form id="inBustripReqPop" style="padding: 20px 30px;">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
        <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">

        <table class="popTable table table-bordered mb-0" id="bustExnpTb">
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
            <c:forEach var="list" items="${list}">
                <tr class="addData">
                    <td>
                        <input type="text" id="empName" class="empName" class="defaultVal" value="${list.EMP_NAME}" disabled style="text-align: center">
                        <input type="hidden" id="empSeq" class="empSeq" name="empSeq" class="defaultVal" value="${list.EMP_SEQ}">
                        <input type="hidden" id="hrBizExnpId" class="hrBizExnpId" name="hrBizExnpId" value="${list.HR_BIZ_EXNP_ID}" />
                    </td>
                    <td>
                        <input id="oilCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.OIL_CORP_YN}">
                        <input type="text" id="oilCost${list.EMP_SEQ}" class="oilCost" value="${list.OIL_COST}" oninput="onlyNumber(this)" style="width: 55%" disabled />
                    </td>
                    <td>
                        <input id="trafCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TRAF_CORP_YN}">
                        <input type="text" id="trafCost${list.EMP_SEQ}" class="trafCost" value="${list.TRAF_COST}" oninput="onlyNumber(this)" style="width: 55%" />
                    </td>
                    <td>
                        <input id="trafDayCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TRAF_DAY_CORP_YN}">
                        <input type="text" id="trafDayCost${list.EMP_SEQ}" class="trafDayCost" value="${list.TRAF_DAY_COST}" oninput="onlyNumber(this)" style="width: 55%" />
                    </td>
                    <td>
                        <input id="tollCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TOLL_CORP_YN}">
                        <input type="text" id="tollCost${list.EMP_SEQ}" class="tollCost" value="${list.TOLL_COST}" oninput="onlyNumber(this)" style="width: 55%" />
                    </td>
                    <td>
                        <input type="text" id="dayCost${list.EMP_SEQ}" class="dayCost" value="${list.DAY_COST}" oninput="onlyNumber(this)" disabled />
                    </td>
                    <td>
                        <input id="eatCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn eatCorpYn" style="width: 40%" value="${list.EAT_CORP_YN}">
                        <input type="text" id="eatCost${list.EMP_SEQ}" class="eatCost" name="eatCost" value="${list.EAT_COST}"<%-- onkeyup="bustripExnpReq.fn_eatCostCheck(this);"--%> oninput="onlyNumber(this)" style="width: 55%" />
                    </td>
                    <td>
                        <input id="parkingCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.PARKING_CORP_YN}">
                        <input type="text" id="parkingCost${list.EMP_SEQ}" class="parkingCost" value="${list.PARKING_COST}" oninput="onlyNumber(this)" style="width: 55%" />
                    </td>
                    <td>
                        <input id="etcCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.ETC_CORP_YN}">
                        <input type="text" id="etcCost${list.EMP_SEQ}" class="etcCost" value="${list.ETC_COST}" oninput="onlyNumber(this)" style="width: 55%" />
                    </td>
                    <td>
                        <input type="text" id="totalCost${list.EMP_SEQ}" class="totalCost" value="${list.TOT_COST}" disabled />
                    </td>
                </tr>
            </c:forEach>
                <tr class="TotalData">
                    <td>
                        <div style="text-align: center">합계</div>
                    </td>
                    <td>
                        <input type="text" id="oilTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="trafTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="trafDayTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="tollTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="dayTotalCost" class="totalCost" value="0" style="width: 100%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="eatTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="parkingTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="etcTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                    <td>
                        <input type="text" id="totalTotalCost" class="totalCost" value="0" style="width: 98%; text-align: right" disabled />
                    </td>
                </tr>
            </thead>
        </table>
        <table class="popTable table table-bordered mb-0">
            <colgroup>

            </colgroup>
            <thead>
            <tr>
                <th>교통비</th>
                <th>교통일비</th>
                <th>통행료</th>
                <th>식비</th>
                <th>주차비</th>
                <th>기타</th>
            </tr>
            <tr>
                <td>
                    <input type="file" id="exnpTraf" multiple style="width: 98%;" />
                    <div id="exnpTrafDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpTrafDay" multiple style="width: 98%;" />
                    <div id="exnpTrafDayDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpToll" multiple style="width: 98%;" />
                    <div id="exnpTollDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpEat" multiple style="width: 98%;" />
                    <div id="exnpEatDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpParking" multiple style="width: 98%;" />
                    <div id="exnpParkingDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpEtc" multiple style="width: 98%;" />
                    <div id="exnpEtcDiv">

                    </div>
                </td>
            </tr>
            </thead>
        </table>
    </form>
</div>
<script>
    const hrBizReqResultId = '${params.hrBizReqResultId}';
    const tripDayFr = '${rs.TRIP_DAY_FR}';
    const tripDayTo = '${rs.TRIP_DAY_TO}';
    const tripNum = '${fn:length(list)}';

    bustripExnpReq.init('${type}');
</script>
</body>
