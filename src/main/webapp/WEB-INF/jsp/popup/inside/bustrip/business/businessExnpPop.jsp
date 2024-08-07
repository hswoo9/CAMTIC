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

    .creditSlip{width:430px; background:url('../../images/bg/bg_creditSlip.png') repeat 0 0; background-position:0 16px;}

    .fwb {font-weight:bold !important;}
    .lh18{line-height:18px !important;}

    .com_ta4 table{width:100%; text-align:center;box-sizing:border-box;} /* 디자인참고 : 수정설정 팝업 */
    .com_ta4 table th, .com_ta4 table td {height:26px;color:#4a4a4a;border:1px solid #eaeaea; padding:5px 0;}
    .com_ta4.rowHeight table th, .com_ta4.rowHeight table td {height:18px;word-break: break-all}
    .com_ta4 table th {background:#f9f9f9;/*background:#f9fafc;*/font-weight:normal;}
    .com_ta4 table .cen {text-align:center !important;padding:0px !important;}
    .com_ta4 table .ri {text-align:right !important;padding-right:10px;}
    .com_ta4 table .le {text-align:left !important;padding-left:10px;}
    .com_ta4 table td.td_cen {text-align:center !important;padding:0px !important;}
    .com_ta4 table td.td_ri {text-align:right !important;padding-right:10px;}
    .com_ta4 table td.td_le {text-align:left !important;padding-left:10px;}
    .com_ta4 table tr:hover td, .com_ta4 table tr.on td {background:#e6f4ff;}
    .com_ta4 table tr.total td{background:#f9f9f9;}
    .com_ta4 table tr.summary td{background:#fff1f1;}
    .com_ta4 table tr.even{background-color:#f9f9f9;}
    .com_ta4.hover_no table tr:hover td {background:none;}
    .com_ta4.hover_no table tr:hover td.bg_blue { background: #f0f6fd;}
    .com_ta4.hover_no table tr.on:hover td {background:#e6f4ff;}
    .com_ta4.hover_no table tr.on:hover td.bg_blue {background: #e6f4ff;}
    .com_ta4.hover_no table tr.total:hover  td{background:#f9f9f9;}
    .com_ta4.ova_sc {overflow:auto;border-bottom:1px solid #eaeaea;}
    .com_ta4.ova_sc table {border-top:none;}
    .com_ta4.ova_sc table tr:first-child td {border-top:none;}
    .com_ta4.ova_sc_all {overflow:auto;}
    .com_ta4.ova_sc td {position:relative;}
    .com_ta4.ova_sc2 {overflow-x:hidden; overflow-y:scroll;}
    .com_ta4.ova_sc2 table td {border-top:none;}
    .com_ta4.ova_line {overflow:auto;}
    .com_ta4.ova_line table tr:first-child td {border-top:none;}
    .com_ta4.bgtable {border-width:0 1px 1px 1px; border-style:solid; border-color:#eaeaea; overflow:auto;background-color:#fcfcfc;} /*팝업-근태관리단위설정-근무조수정 참고*/
    .com_ta4.bgtable table td {border-width:0 0px 1px 0px; border-style:solid; border-color:#eaeaea; background-color:#fff !important;}
    .com_ta4.bgtable.non_head {border-width:1px;}
    .com_ta4.bgnth tr:nth-child(odd) td{background:#f4f4f4;}
    .com_ta4.bgnth tr:nth-child(odd):hover td {background:#f4f4f4;}
    .com_ta4.tdH20 table th, .com_ta4.tdH20 table td {height:20px !important;}

    .com_ta4.bgtable2 {border-width:0 1px 1px 1px; border-style:solid; border-color:#eaeaea; overflow:auto;background-color:#fcfcfc;} /*팝업-게시판분류등록*/
    .com_ta4.bgtable2 table {background:#fff;}
    .com_ta4.bgtable2 table td {border-width:0 0px 1px 1px; border-style:solid; border-color:#eaeaea;}
    .com_ta4.bgtable2 table td:first-child {border-left:none;}
    .com_ta4.bgtable2 table th {border-width:1px 0px 0px 1px; border-style:solid; border-color:#eaeaea;}
    .com_ta4.bgtable2 table th:first-child {border-left:none;}
    .com_ta4.bgtable2 table th:last-child {border-right:none;}
    .com_ta4.bgtable2.non_head {border-width:1px;}

    .com_ta4.bgtable3 {border-width:0 1px 1px 1px; border-style:solid; border-color:#eaeaea; overflow:auto;background-color:#fcfcfc;} /*팝업-게시판분류등록*/
    .com_ta4.bgtable3 table {background:#fff;}
    .com_ta4.bgtable3 table td {border-width:0 0px 1px 1px; border-style:solid; border-color:#eaeaea; }
    .com_ta4.bgtable3 table td:first-child {border-left:none;}
    .com_ta4.bgtable3 table th:first-child {border-left:none;}
    .com_ta4.bgtable3 table th:last-child {border-right:none;}

    .com_ta4 .list_div {height:24px;line-height:24px; width:90%; border:1px solid #e1e1e1;position:relative;margin-left:10px;text-align:left;padding-left:10px;}
    .com_ta4 .list_div .clo {position:absolute; right:10px; top:7px;}
    .com_ta4 .list_div:hover {background:#fcfcfc;}
    .com_ta4.cursor_p table tr:hover td {cursor:pointer;}
</style>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/business/businessExnpPop.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripExnpPop.js?v=${today}"></script>

<!-- 공통팝업 호출 -->

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="tripDayTo" value="" />
<input type="hidden" id="tripDayFr" value="" />
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
        <h3 class="card-title title_NM">해외출장 사전정산</h3>
        <div class="btn-st popButton">
            <c:choose>
                <c:when test="${params.mode eq 'mng'}">
                    <input type="button" class="k-button k-button-solid-primary" value="수정" onclick="busiExnp.fn_saveBtn('${params.hrBizReqId}', '${type}', '${params.mode}')" />
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close()" />
                </c:when>
                <c:when test="${rs.EXP_STAT == 100}">
                    <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="닫기" onclick="window.close()" />
                </c:when>
                <c:when test="${rs.EXP_STAT != 10}">
                    <input type="button" class="k-button k-button-solid-info" value="저장" onclick="busiExnp.fn_saveBtn('${params.hrBizReqId}', '${type}')" />
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

        <table class="popTable table table-bordered mb-0" style="width: 60%">
            <colgroup>

            </colgroup>
            <thead>
            <tr>
                <th>등급</th>
                <td id="grade"></td>
            </tr>
            <tr>
                <th>구분</th>
                <td id="duty">팀장이하</td>
            </tr>
            <tr>
                <th>환율</th>
                <td>
                    <input id="exchangeRate" style="text-align: right; width: 100px" value="0" onkeyup="busiExnp.fn_calc(this)"/> 원 <b>환율은 출장비 지급신청 당일 기준 고시 환율(주거래은행/현찰 살때 기준)을 적용한다. <a href="https://www.jbbank.co.kr/fxec_xriq_xriq.act" target="_blank">전북은행 사이트 바로가기</a></b>
                </td>
            </tr>
            <tr>
                <th>출장자</th>
                <td id="companion"></td>
            </tr>
            <tr>
                <th>출장기간</th>
                <td id="bustripDt"></td>
            </tr>
            </thead>
        </table>

        <table class="popTable table table-bordered mb-0" id="bustExnpTb">
            <colgroup>

            </colgroup>
            <thead>
            <tr>
                <th>이름</th>
                <th>항공료</th>
                <th>국내이동교통비</th>
                <th>숙박비 <span id="roomMaxPay" style="color: blue"></span></th>
                <th>비자발급비</th>
                <th>일비</th>
                <th>식비</th>
                <th>보험료</th>
                <th>기타</th>
                <th>합계</th>
            </tr>

            <c:choose>
                <c:when test="${type eq 'ins'}">
                    <c:forEach var="list" items="${list}">
                        <c:if test="${list.DIVISION ne 1}">
                            <tr class="addData">
                                <td>
                                    <input type="text" id="empName" class="empName" class="defaultVal" value="${list.EMP_NAME}" disabled style="text-align: center">
                                    <input type="hidden" id="empSeq" class="empSeq" name="empSeq" class="defaultVal" value="${list.EMP_SEQ}">
                                    <input type="hidden" id="hrBizOverExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="" />
                                </td>
                                <td>
                                    <input id="oilCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="">
                                    <input type="text" id="oilCost${list.EMP_SEQ}" class="oilCost" value="" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="trafCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="">
                                    <input type="text" id="trafCost${list.EMP_SEQ}" class="trafCost" value="" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="trafDayCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="">
                                    <input type="text" id="trafDayCost${list.EMP_SEQ}" class="trafDayCost" value="" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="tollCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="">
                                    <input type="text" id="tollCost${list.EMP_SEQ}" class="tollCost" value="" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input type="text" id="dayCost${list.EMP_SEQ}" class="dayCost" value="" oninput="onlyNumber(this)" disabled />
                                </td>
                                <td>
                                    <input type="text" id="eatCost${list.EMP_SEQ}" class="eatCost" name="eatCost" value="" oninput="onlyNumber(this)" disabled/>
                                </td>
                                <td>
                                    <input id="parkingCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="">
                                    <input type="text" id="parkingCost${list.EMP_SEQ}" class="parkingCost" value="" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="etcCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="">
                                    <input type="text" id="etcCost${list.EMP_SEQ}" class="etcCost" value="" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input type="text" id="totalCost${list.EMP_SEQ}" class="totalCost" value="" disabled />
                                </td>
                            </tr>
                        </c:if>
                    </c:forEach>
                    <c:forEach var="list" items="${extData}">
                        <tr class="extData">
                            <td>
                                <input type="text" class="empName" style="text-align: center" disabled value="${list.EXT_NM}" >
                                <input type="hidden" id="extCrmExnpId${list.EXT_MEM_SN}" class="hrBizOverExnpId" name="hrBizOverExnpId" value="" />
                                <input type="hidden" id="extMemSn${list.EXT_MEM_SN}" class="extMemSn" name="extMemSn" value="${list.EXT_MEM_SN}" />
                            </td>
                            <td>
                                <input type="text" id="extCrm1" class="extCrmInput"  value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                            </td>
                            <td>
                                <input type="text" id="extCrm2" class="extCrmInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                            </td>
                            <td>
                                <input type="text" id="extCrm3" class="extCrmInput trafDayCost" value="0" oninput="onlyNumber(this)" onkeyup="busiExnp.fn_calc(this)" style="width: 100%;text-align:right;" />
                            </td>
                            <td>
                                <input type="text" id="extCrm4" class="extCrmInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                            </td>
                            <td>
                                <input type="text" id="extCrm5" class="extCrmInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                            </td>
                            <td>
                                <input type="text" id="extCrm6" class="extCrmInput extCrm6" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" disabled />
                            </td>
                            <td>
                                <input type="text" id="extCrm7" class="extCrmInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                            </td>
                            <td>
                                <input type="text" id="extCrm8" class="extCrmInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                            </td>
                            <td>
                                <input type="text" id="extCrm9" class="extCrmInput" value="0" style="width: 100%;text-align:right;" disabled />
                            </td>
                        </tr>
                    </c:forEach>
                    <tr class="corpCrmData">
                        <td>
                            <div style="text-align: center">업체지급</div>
                            <input type="hidden" id="corpCrmExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="" />
                        </td>
                        <td>
                            <input type="text" id="corpCrm1" class="corpCarInput"  value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCrm2" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCrm3" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCrm4" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCrm5" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCrm6" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCrm7" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCrm8" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCrm9" class="corpCarInput" value="0" style="width: 100%;text-align:right;" disabled />
                        </td>
                    </tr>
                    <tr class="corpCardData">
                        <td>
                            <div style="text-align: center">법인카드</div>
                            <input type="hidden" id="corpExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="" />
                        </td>
                        <td>
                            <input type="text" id="corp1" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(1, 'air')"/>
                        </td>
                        <td>
                            <input type="text" id="corp2" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(2, 'traf')"/>
                        </td>
                        <td>
                            <input type="text" id="corp3" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(3, 'room')"/>
                        </td>
                        <td>
                            <input type="text" id="corp4" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(4, 'visa')"/>
                        </td>
                        <td>
                            <input type="text" id="corp5" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(5, 'day')"/>
                        </td>
                        <td>
                            <input type="text" id="corp6" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(6, 'eat')"/>
                        </td>
                        <td>
                            <input type="text" id="corp7" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(7, 'ins')"/>
                        </td>
                        <td>
                            <input type="text" id="corp8" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="0" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(8, 'etc')"/>
                        </td>
                        <td>
                            <input type="text" id="corp9" class="corpInput" style="width: 100%; text-align: right;" value="0" disabled/>
                        </td>
                    </tr>
                    <tr class="corpCarData" style="display: none">
                        <td>
                            <div style="text-align: center">법인차량</div>
                            <input type="hidden" id="corpCarExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="" />
                        </td>
                        <td>
                            <input type="text" id="corpCar1" class="corpCarInput"  value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCar2" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCar3" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCar4" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCar5" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                        </td>
                        <td>
                            <input type="text" id="corpCar6" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCar7" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCar8" class="corpCarInput" value="0" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                        </td>
                        <td>
                            <input type="text" id="corpCar9" class="corpCarInput" value="0" style="width: 100%;text-align:right;" disabled />
                        </td>
                    </tr>
                </c:when>
                <c:otherwise>
                    <c:forEach var="list" items="${list}">
                        <c:if test="${list.DIVISION == 1}">
                            <tr class="addData">
                                <td>
                                    <input type="text" id="empName" class="empName" class="defaultVal" value="${list.EMP_NAME}" disabled style="text-align: center">
                                    <input type="hidden" id="empSeq" class="empSeq" name="empSeq" class="defaultVal" value="${list.EMP_SEQ}">
                                    <input type="hidden" id="hrBizOverExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="${list.HR_BIZ_OVER_EXNP_ID}" />
                                </td>
                                <td>
                                    <input id="oilCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.OIL_CORP_YN}">
                                    <input type="text" id="oilCost${list.EMP_SEQ}" class="oilCost" value="${list.AIR_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="trafCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TRAF_CORP_YN}">
                                    <input type="text" id="trafCost${list.EMP_SEQ}" class="trafCost" value="${list.TRAF_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="trafDayCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TRAF_DAY_CORP_YN}">
                                    <input type="text" id="trafDayCost${list.EMP_SEQ}" class="trafDayCost" value="${list.ROOM_COST == '' ? 0 : list.ROOM_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="tollCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.TOLL_CORP_YN}">
                                    <input type="text" id="tollCost${list.EMP_SEQ}" class="tollCost" value="${list.VISA_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input type="text" id="dayCost${list.EMP_SEQ}" class="dayCost" value="${list.DAY_COST}" oninput="onlyNumber(this)" disabled />
                                </td>
                                <td>
                                    <input type="text" id="eatCost${list.EMP_SEQ}" class="eatCost" name="eatCost" value="${list.EAT_COST}" oninput="onlyNumber(this)" disabled/>
                                </td>
                                <td>
                                    <input id="parkingCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.PARKING_CORP_YN}">
                                    <input type="text" id="parkingCost${list.EMP_SEQ}" class="parkingCost" value="${list.INS_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input id="etcCorpYn${list.EMP_SEQ}" name="corpYn" class="corpYn" style="width: 40%" value="${list.ETC_CORP_YN}">
                                    <input type="text" id="etcCost${list.EMP_SEQ}" class="etcCost" value="${list.ETC_COST}" oninput="onlyNumber(this)" style="width: 100%" />
                                </td>
                                <td>
                                    <input type="text" id="totalCost${list.EMP_SEQ}" class="totalCost" value="${list.TOT_COST}" disabled />
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION == 5}">
                            <tr class="extData">
                                <td>
                                    <input type="text" style="text-align: center !important;" class="empName" value="${list.EMP_NAME}" disabled />
                                    <input type="hidden" id="extExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="${list.HR_BIZ_OVER_EXNP_ID}" />
                                </td>
                                <td>
                                    <input type="text" id="extCrm1" class="extCrmInput"  value="${list.AIR_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="extCrm2" class="extCrmInput" value="${list.TRAF_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="extCrm3" class="extCrmInput trafDayCost" value="${list.ROOM_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="extCrm4" class="extCrmInput" value="${list.VISA_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="extCrm5" class="extCrmInput" value="${list.DAY_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="extCrm6" class="extCrmInput extCrm6" value="${list.EAT_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" disabled/>
                                </td>
                                <td>
                                    <input type="text" id="extCrm7" class="extCrmInput" value="${list.INS_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="extCrm8" class="extCrmInput" value="${list.ETC_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="extCrm9" class="extCrmInput" value="${list.TOT_COST}" style="width: 100%;text-align:right;" disabled />
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION == 4}">
                            <tr class="corpCrmData">
                                <td>
                                    <div style="text-align: center">업체지급</div>
                                    <input type="hidden" id="corpCrmExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="${list.HR_BIZ_OVER_EXNP_ID}" />
                                </td>
                                <td>
                                    <input type="text" id="corpCrm1" class="corpCarInput"  value="${list.AIR_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCrm2" class="corpCarInput" value="${list.TRAF_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCrm3" class="corpCarInput" value="${list.ROOM_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCrm4" class="corpCarInput" value="${list.VISA_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCrm5" class="corpCarInput" value="${list.DAY_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCrm6" class="corpCarInput" value="${list.EAT_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCrm7" class="corpCarInput" value="${list.INS_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCrm8" class="corpCarInput" value="${list.ETC_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCrm9" class="corpCarInput" value="${list.TOT_COST}" style="width: 100%;text-align:right;" disabled />
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION == 2}">
                            <tr class="corpCardData">
                                <td>
                                    <div style="text-align: center">법인카드</div>
                                    <input type="hidden" id="corpExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="${list.HR_BIZ_OVER_EXNP_ID}" />
                                </td>
                                <td>
                                    <input type="text" id="corp1" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.AIR_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(1, 'air')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp2" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.TRAF_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(2, 'traf')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp3" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.ROOM_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(3, 'room')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp4" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.VISA_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(4, 'visa')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp5" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.DAY_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(5, 'day')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp6" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.EAT_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(6, 'eat')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp7" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.INS_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(7, 'ins')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp8" class="corpInput" style="width: 100%; cursor: pointer; text-align: right;" value="${list.ETC_COST}" onkeydown="return false;" onpaste="return false;" oninput="onlyNumber(this)" onclick="bustripExnpReq.fn_paymentCardHistory(8, 'etc')"/>
                                </td>
                                <td>
                                    <input type="text" id="corp9" class="corpInput" style="width: 100%; text-align: right;" value="${list.TOT_COST}" disabled/>
                                </td>
                            </tr>
                        </c:if>
                        <c:if test="${list.DIVISION == 3}">
                            <tr class="corpCarData" style="display: none">
                                <td>
                                    <div style="text-align: center">법인차량</div>
                                    <input type="hidden" id="corpCarExnpId" class="hrBizOverExnpId" name="hrBizOverExnpId" value="${list.HR_BIZ_OVER_EXNP_ID}" />
                                </td>
                                <td>
                                    <input type="text" id="corpCar1" class="corpCarInput"  value="${list.AIR_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCar2" class="corpCarInput" value="${list.TRAF_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCar3" class="corpCarInput" value="${list.ROOM_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCar4" class="corpCarInput" value="${list.VISA_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCar5" class="corpCarInput" value="${list.DAY_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;"/>
                                </td>
                                <td>
                                    <input type="text" id="corpCar6" class="corpCarInput" value="${list.EAT_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCar7" class="corpCarInput" value="${list.INS_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCar8" class="corpCarInput" value="${list.ETC_COST}" oninput="onlyNumber(this)" style="width: 100%;text-align:right;" />
                                </td>
                                <td>
                                    <input type="text" id="corpCar9" class="corpCarInput" value="0" style="width: 100%;text-align:right;" disabled />
                                </td>
                            </tr>
                        </c:if>
                    </c:forEach>
                </c:otherwise>
            </c:choose>

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
    </form>

    <div class="card-header pop-header">
        <h3 class="card-title title_NM">업체지급 지출증빙 첨부</h3>
        <div class="btn-st popButton">
            <input type="button" class="k-button k-button-solid-info" style="margin-right: 5px" value="증빙양식 다운로드" onclick="bustripExnpReq.personalExnpFormDown()" />
        </div>
    </div>

    <form id="fileForm" style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>

            </colgroup>
            <thead>
            <tr>
                <th>항공료</th>
                <th>국내이동교통비</th>
                <th>숙박비</th>
                <th>비자발급비</th>
                <th>보험료</th>
                <th>기타</th>
            </tr>
            <tr>
                <td>
                    <input type="file" id="exnpAir" multiple style="width: 98%;" />
                    <div id="exnpAirDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpTraf" multiple style="width: 98%;" />
                    <div id="exnpTrafDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpRoom" multiple style="width: 98%;" />
                    <div id="exnpRoomDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpVisa" multiple style="width: 98%;" />
                    <div id="exnpVisaDiv">

                    </div>
                </td>
                <td>
                    <input type="file" id="exnpIns" multiple style="width: 98%;" />
                    <div id="exnpInsDiv">

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

    <div class="card-header pop-header">
        <h3 class="card-title title_NM">법인카드 사용내역</h3>
        <div class="btn-st popButton">
            <%--<input type="button" class="k-button k-button-solid-info" value="추가" onclick="bustripExnpReq.fn_paymentCardHistory()" />--%>
            <input type="button" class="k-button k-button-solid-error" style="margin-right: 5px" value="삭제" onclick="bustripExnpReq.fn_ardHistoryDel()" />
        </div>
    </div>

    <form id="hist" style="padding: 20px 30px;">
        <div class="table-responsive detail">
            <table class="teamGrid popTable table table-bordered mb-0" style="margin-top: 0px">
                <colgroup>
                    <col width="4%">
                    <col width="7%">
                    <col width="13%">
                    <col width="10%">
                    <col width="17%">
                    <col width="11%">
                    <col width="15%">
                    <col width="13%">
                    <col width="10%">
                </colgroup>
                <thead id="detailRow">
                <tr>
                    <th><input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll('checkAll', 'card');"/></th>
                    <th>구분</th>
                    <th>승인일자</th>
                    <th>승인번호</th>
                    <th>사용처</th>
                    <th>사업자번호</th>
                    <th>카드명</th>
                    <th>카드번호</th>
                    <th>금액</th>
                </tr>
                </thead>
                <tr>
                    <th colspan="8" style="text-align: center;background-color: #8fa1c04a;">합계</th>
                    <td style="text-align: right;font-weight: bold;" id="corpUseTotal"></td>
                </tr>
            </table>
        </div>
    </form>
</div>


<div class="pop_wrap creditSlip" id="capture" style="display: none; margin-top: 200px">
    <div class="card-header pop_head">
        <h3 class="card-title title_NM"><span style="color: black; margin-left: 11px;">카드승인전표</span>  <!--카드승인전표--></h3>
        <%--			<a href="#n" class="clo"><img src="../../../Images/btn/btn_pop_clo02.png" alt="" /></a>--%>
    </div>

    <div class="pop_con mr25 ml25" style="">
        <div class="com_ta4 bgnth hover_no">
            <table>
                <colgroup>
                    <col width="100"/>
                    <col />
                </colgroup>
                <tr>
                    <td class="ri">카드번호  <!--카드번호--></td>
                    <td class="fwb le" id="cardNum">  </td>
                </tr>
                <tr>
                    <td class="ri">승인일시 <!--승인일시--></td>
                    <td class="fwb le" id="authDate"> </td>
                </tr>
                <tr>
                    <td class="ri">승인번호  <!--승인번호--></td>
                    <td class="fwb le" id="authNum">  </td>
                </tr>
                <tr>
                    <td class="ri">가맹점명  <!--가맹점명--></td>
                    <td class="fwb le" id="tradeName">  </td>
                </tr>
                <tr>
                    <td class="ri">대표자명  <!--대표자명--></td>
                    <td class="fwb le" id="ceoNm">  </td>
                </tr>
                <tr>
                    <td class="ri">사업자번호  <!--사업자번호--></td>
                    <td class="fwb le" id="tradeSeq">  </td>
                </tr>
                <tr id="tr_mccName">
                    <td class="ri">업종  <!--업종--></td>
                    <td class="fwb le" id="mccName">  </td>
                </tr>
                <tr>
                    <td class="ri">주소  <!--주소--></td>
                    <td class="fwb le lh18 vt" style="height:35px;" id="addr">  </td>
                </tr>
                <tr>
                    <td class="ri">전화번호  <!--전화번호--></td>
                    <td class="fwb le" id="tel">  </td>
                </tr>
                <tr>
                    <td class="ri">공급가액  <!--공급가액--></td>
                    <td class="fwb le" id="stdAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">부가세  <!--부가세--></td>
                    <td class="fwb le" id="vatAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">서비스금액  <!--서비스금액--></td>
                    <td class="fwb le" id="serAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">금액  <!--금액--></td>
                    <td class="fwb le" id="amt">  </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div><!--// pop_con -->
</div><!--// pop_wrap -->

<script>
    const hrBizReqResultId = '${params.hrBizReqResultId}';
    const tripDayFr = '${rs.TRIP_DAY_FR}';
    const tripDayTo = '${rs.TRIP_DAY_TO}';
    const tripNum = '${fn:length(list)}';

    busiExnp.init('${type}');

    let index = 0;


    function cardHistSet(list, exnpType, corpType){
        console.log("list");
        console.log(list);

        let corpMoney = 0;

        let selCorpType = {
            'air' : '항공료',
            'traf' : '국내이동교통비',
            'room' : '숙박비',
            'visa' : '비자발급비',
            'day' : '일비',
            'eat' : '식비',
            'ins' : '보험료',
            'etc' : '기타'
        }

        let html = '';
        for(let i=0; i<list.length; i++){
            html = '';
            index ++;

            const e = list[i];
            html += '<tr class="cardData">';
            html += '    <input type="hidden" class="exnpType" value="'+exnpType+'" />';
            html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
            html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
            html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
            html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
            html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';
            html += '    <input type="hidden" id="fileNo'+index+'" class="fileNo"/>';

            html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
            html += '    <td style="text-align: center">'+selCorpType[corpType]+'</td>';
            html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
            html += '    <td>'+e.AUTH_NO+'</td>';
            html += '    <td>'+e.MER_NM+'</td>';
            html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
            html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
            html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
            html += '    <td class="amt" style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
            html += '</tr>';
            corpMoney += Number(e.AUTH_AMT);

            $("#detailRow").append(html);
            fn_setCardInfo(e.AUTH_NO, e.AUTH_DD, e.AUTH_HH, e.CARD_NO, e.BUY_STS, index);
        }

        if(corpMoney != '') {
            if($("#corp" + exnpType).val() == 0) {
                $("#corp" + exnpType).val(fn_numberWithCommas(corpMoney));
            }else{
                $("#corp" + exnpType).val(fn_numberWithCommas(Number(uncomma($("#corp" + exnpType).val())) + corpMoney));
            }
        }
        corpTotalSet();

        busiExnp.fn_setTableSum();

        if($("#corpUseTotal").text() != '' && $("#corpUseTotal").text() != 0) {
            corpMoney += Number(uncomma($("#corpUseTotal").text()));
        }

        $("#corpUseTotal").text(fn_numberWithCommas(corpMoney));
    }

    function corpTotalSet(){
        $("#corp9").val(0);

        var corp1 = $("#corp1").val();
        var corp2 = $("#corp2").val();
        var corp3 = $("#corp3").val();
        var corp4 = $("#corp4").val();
        var corp5 = $("#corp5").val();
        var corp6 = $("#corp6").val();
        var corp7 = $("#corp7").val();
        var corp8 = $("#corp8").val();
        var totalAmt = Number(uncomma(corp1)) + Number(uncomma(corp2)) + Number(uncomma(corp3)) +
            Number(uncomma(corp4)) + Number(uncomma(corp5)) + Number(uncomma(corp6)) + Number(uncomma(corp7)) + Number(uncomma(corp8));

        $("#corp9").val(fn_numberWithCommas(totalAmt));
    }

    function fn_setCardInfo(authNo, authDate, authTime, cardNo, buySts, index){

        var data = {
            authNo : authNo,
            authDate : authDate,
            authTime : authTime,
            cardNo : cardNo,
            buySts : buySts
        }

        $.ajax({
            url : "/cam_mng/companyCard/useCardDetail",
            data : data,
            type : "post",
            dataType: "json",
            async : false,
            success : function(rs){
                var cardInfo = rs.cardInfo;
                var cardNum = cardInfo.CARD_NO;
                var authDate = cardInfo.AUTH_DD;
                var authTime = cardInfo.AUTH_HH;
                var authNum = cardInfo.AUTH_NO;
                var ceoNm = cardInfo.MER_CEONM;
                var tradeName = cardInfo.MER_NM;
                var tradeSeq = cardInfo.MER_BIZNO;
                var addr = cardInfo.MER_ADR1;
                var tel = cardInfo.MER_TELNO;
                var georaeStat = cardInfo.georaeStat;
                var stdAmt = cardInfo.SUPP_PRICE;
                var vatAmt = cardInfo.SURTAX;
                var serAmt = cardInfo.SVC_AMT;
                var amt = cardInfo.AUTH_AMT;

                var mccName = cardInfo.BIZTYPE_NM;
                if(!mccName){
                    $('#tr_mccName').remove();
                }

                $('#cardNum').html(fnGetCardCode(cardNum));
                $('#authDate').html(fnGetAuthDate(authDate, authTime));
                $('#mccName').html(mccName);
                $('#authNum').html(authNum);
                $('#ceoNm').html(ceoNm);
                $('#tradeName').html(tradeName);
                $('#tradeSeq').html(tradeSeq);
                $('#addr').html(addr);
                $('#tel').html(tel);

                $('#stdAmt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, stdAmt), 0 ) );
                $('#vatAmt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, vatAmt), 0 ) );
                $('#serAmt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, serAmt), 0 ) );
                $('#amt').html( fnGetCurrencyCode( fnMinusAmtCheck(georaeStat, amt), 0 ) );

                if(georaeStat === '0'){
                    $('#stdAmt, #vatAmt, #serAmt, #amt').css('color', 'red');
                }

                $("#capture").css("display", "");
                html2canvas(document.querySelector("#capture")).then(function(canvas) {

                    // jsPDF 객체 생성 생성자에는 가로, 세로 설정, 페이지 크기 등등 설정할 수 있다. 자세한건 문서 참고. // 현재 파라미터는 기본값이다 굳이 쓰지 않아도 되는데 저것이 기본값이라고 보여준다
                    var doc = new jsPDF('p', 'mm', 'a4'); // html2canvas의 canvas를 png로 바꿔준다.
                    var imgData = canvas.toDataURL('image/png'); //Image 코드로 뽑아내기 // image 추가
                    imgData = imgData.replace("data:image/png;base64,", "");
                    data.imgValue = 'card';
                    data.imgSrc = imgData;
                    data.empSeq = $("#empSeq").val()
                    $.ajax({
                        type : "POST",
                        data : data,
                        dataType : "text",
                        url : "/mng/imgSaveTest",
                        async : false,
                        success : function(data) {
                            var data = JSON.parse(data);
                            var fileNo = data.result.fileNo;

                            $("#fileNo" + index).val(fileNo);
                        },
                        error : function(a, b, c) {
                            alert("error");
                        }
                    });
                });

            }
        });

        $("#capture").css("display", "none");
    }


    function fnMinusAmtCheck(georaeStat, amtValue){
        if(georaeStat === '0'){
            /* 승인 취소 건 */
            if(amtValue.indexOf('-') < 0){
                if(Number(amtValue.replace(/,/g, '')) != 0){
                    amtValue = '-' + amtValue;
                }
            }
        }

        return amtValue;
    }

    /*  [공통함수] 날짜 표기 형태 리턴
    Params / 날짜, 시간
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetAuthDate(date, time){
        var authDate = date.replace(/[^0-9]/g,'');
        var authTime = time.replace(/[^0-9]/g,'');

        return authDate.substring(0, 4) + '-'+ authDate.substring(4, 6) + '-'+ authDate.substring(6, 8)
            + ' ' +authTime.substring(0, 2) + ':'+ authTime.substring(2, 4) + ':'+ authTime.substring(4, 6);
    }

    /*  [공통함수] 카드 번호 표기 형태 리턴
    Params / 카드 번호
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetCardCode(val){
        var cardNum = val.replace(/[^0-9]/g,'');
        return cardNum.substring(0, 4) + '-'+ cardNum.substring(4, 8) + '-'+ cardNum.substring(8, 12) + '-'+ cardNum.substring(12, 16);
    }

    /*  [공통함수] 통화 코드 적용
    일천 단위에 통화코드 ','적용.
    Params /
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetCurrencyCode(value, defaultVal) {
        value = '' + value || '';
        value = '' + value.split('.')[0];
        value = value.replace(/[^0-9\-]/g, '') || (defaultVal != undefined ? defaultVal : '0');
        var returnVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnVal;
    }
</script>
</body>
