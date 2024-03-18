
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayReqPop2.js?v=${today}"></script>

<style>
    /*.k-icon-button {*/
    /*  display: none;*/
    /*}*/
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">휴일근로신청</h3>
            <div class="btn-st popButton">
                <span id="holidayWorkBtnBox">

                </span>
                <button type="button" class="k-button k-button-solid-info request" onclick="subHolidayReqPop2.fn_save()" id="saveBtn">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <form id="subHolidayReqPop" style="padding: 20px 30px;">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <input type="hidden" id="apprStat" value="N">
            <input type="hidden" id="code" value="${code}">
            <table class="popTable table table-bordered mb-0" id="holidayPlanReqPopTb" style="margin-top: 10px;">
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
                        <input type="hidden" id="empSeq" value="${loginVO.uniqId}">
                        <input type="text" id="erpEmpCd" name="erpEmpCd" class="defaultVal" value="${loginVO.erpEmpCd}" style="width: 200px;">
                    </td>
                    <th>성명</th>
                    <td>
                        <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 200px;">
                    </td>
                </tr>
                <tr>
                    <th>부서명</th>
                    <td>
                        <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 200px;">
                    </td>
                    <th>직급</th>
                    <td>
                        <c:if test="${loginVO.dutyNm != null && loginVO.dutyNm != ''}">
                            <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.dutyNm}" style="width: 200px;">
                        </c:if>
                        <c:if test="${loginVO.dutyNm == null || loginVO.dutyNm == ''}">
                            <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.positionNm}" style="width: 200px;">
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th>신청구분</th>
                    <td colspan="3">
                        <input type="text" id="edtHolidayKindText" value="휴일근로" style="width: 200px;">
                        <input type="hidden" id="edtHolidayKindTop" value="11">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">안내사항</th>
                    <td colspan="3">
                        * 휴일근로는 공휴일, 토요일, 일요일 등 휴무일에 근로가 필요한 경우 신청합니다.
                        <br>
                        * 휴일근로는 대체휴가(1:1)로 처리하오니 대체휴가일을 선택해서 신청합니다.(필수)
                        <br>
                        * 근로일자가 지정된 신청내용만 저장됩니다.
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">근로일자</th>
                    <td colspan="3">
                        <table style="width:100%; margin-top:5px;">
                            <colgroup>
                                <col width="25%">
                                <col width="30%">
                                <col width="25%">
                                <col width="15%">
                            </colgroup>
                            <tr style="background-color:#d8dce36b;">
                                <th>근로일자</th>
                                <th>근로시간</th>
                                <th>대채휴가일자</th>
                                <th>비고</th>
                            </tr>
                            <tr class="addData" style="background-color:#fff; text-align:center;">
                                <td>
                                    <input type="hidden" id="vacUseHistId_0" class="vacUseHistId" style="width:80%;">
                                    <input id="edtHolidayWorkDay_0" class="edtHolidayWorkDay" data-bind="value:start" style="width: 80%;">
                                </td>
                                <td>
                                    <input id="edtHolidayStartHourTop_0" class="edtHolidayStartHourTop" style="width: 40%;">
                                    <span style="width: 9%;"> ~ </span>
                                    <input id="edtHolidayEndHourTop_0" class="edtHolidayEndHourTop" style="width: 40%;">
                                </td>
                                <td>
                                    <input id="edtHolidayAlternativeDate_0" class="edtHolidayAlternativeDate" style="width:80%;">
                                </td>
                                <td style="text-align: center"><input type="button" id="resetBtn_0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="subHolidayReqPop2.dataClear(0)"/></td>
                            </tr>
                            <tr class="addData" style="background-color:#fff; text-align:center;">
                                <td>
                                    <input type="hidden" id="vacUseHistId_1" class="vacUseHistId" style="width:80%;">
                                    <input id="edtHolidayWorkDay_1" class="edtHolidayWorkDay" data-bind="value:start" style="width: 80%;">
                                </td>
                                <td>
                                    <input id="edtHolidayStartHourTop_1" class="edtHolidayStartHourTop" style="width: 40%;">
                                    <span style="width: 9%;"> ~ </span>
                                    <input id="edtHolidayEndHourTop_1" class="edtHolidayEndHourTop" style="width: 40%;">
                                </td>
                                <td>
                                    <input id="edtHolidayAlternativeDate_1" class="edtHolidayAlternativeDate" style="width:80%;">
                                </td>
                                <td style="text-align: center"><input type="button" id="resetBtn_1" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="subHolidayReqPop2.dataClear(1)"/></td>
                            </tr>
                            <tr class="addData" style="background-color:#fff; text-align:center;">
                                <td>
                                    <input type="hidden" id="vacUseHistId_2" class="vacUseHistId" style="width:80%;">
                                    <input id="edtHolidayWorkDay_2" class="edtHolidayWorkDay" data-bind="value:start" style="width: 80%;">
                                </td>
                                <td>
                                    <input id="edtHolidayStartHourTop_2" class="edtHolidayStartHourTop" style="width: 40%;">
                                    <span style="width: 9%;"> ~ </span>
                                    <input id="edtHolidayEndHourTop_2" class="edtHolidayEndHourTop" style="width: 40%;">
                                </td>
                                <td>
                                    <input id="edtHolidayAlternativeDate_2" class="edtHolidayAlternativeDate" style="width:80%;">
                                </td>
                                <td style="text-align: center"><input type="button" id="resetBtn_2" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="subHolidayReqPop2.dataClear(2)"/></td>
                            </tr>
                            <tr class="addData" style="background-color:#fff; text-align:center;">
                                <td>
                                    <input type="hidden" id="vacUseHistId_3" class="vacUseHistId" style="width:80%;">
                                    <input id="edtHolidayWorkDay_3" class="edtHolidayWorkDay" data-bind="value:start" style="width: 80%;">
                                </td>
                                <td>
                                    <input id="edtHolidayStartHourTop_3" class="edtHolidayStartHourTop" style="width: 40%;">
                                    <span style="width: 9%;"> ~ </span>
                                    <input id="edtHolidayEndHourTop_3" class="edtHolidayEndHourTop" style="width: 40%;">
                                </td>
                                <td>
                                    <input id="edtHolidayAlternativeDate_3" class="edtHolidayAlternativeDate" style="width:80%;">
                                </td>
                                <td style="text-align: center"><input type="button" id="resetBtn_3" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="subHolidayReqPop2.dataClear(3)"/></td>
                            </tr>
                            <tr class="addData" style="background-color:#fff; text-align:center;">
                                <td>
                                    <input type="hidden" id="vacUseHistId_4" class="vacUseHistId" style="width:80%;">
                                    <input id="edtHolidayWorkDay_4" class="edtHolidayWorkDay" data-bind="value:start" style="width: 80%;">
                                </td>
                                <td>
                                    <input id="edtHolidayStartHourTop_4" class="edtHolidayStartHourTop" style="width: 40%;">
                                    <span style="width: 9%;"> ~ </span>
                                    <input id="edtHolidayEndHourTop_4" class="edtHolidayEndHourTop" style="width: 40%;">
                                </td>
                                <td>
                                    <input id="edtHolidayAlternativeDate_4" class="edtHolidayAlternativeDate" style="width:80%;">
                                </td>
                                <td style="text-align: center"><input type="button" id="resetBtn_4" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="subHolidayReqPop2.dataClear(4)"/></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사유</th>
                    <td colspan="3">
                        <textarea name="holiday_reason" id="holiday_reason" rows="5" style="width:100%; /*border: 1px solid #eee;padding-left: 10px;*/"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청일</th>
                    <td colspan="3">
                        <input id="now_date" style="width: 20%;">
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>

<form id="subHolidayDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="holidayWork">
    <input type="hidden" id="type" name="type" value="${type}">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="holidayWorkMasterSn" name="holidayWorkMasterSn" value="${params.holidayWorkMasterSn}">
</form>

<script>
    subHolidayReqPop2.fn_defaultScript();

    // URL에서 승인 상태 값을 가져오기
    var urlParams = new URLSearchParams(window.location.search);
    var apprStat = urlParams.get('apprStat');

    // 승인 상태에 따라 저장 버튼 숨기기
    if (apprStat === 'Y') {
        var saveBtn = document.getElementById("saveBtn");
        if (saveBtn) {
            saveBtn.style.display = "none";
        }
    }
</script>
</body>
