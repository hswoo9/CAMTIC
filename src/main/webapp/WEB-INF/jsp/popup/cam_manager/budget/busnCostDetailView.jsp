<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .table-responsive {
        overflow-x: hidden !important;
    }

    a:hover{
        text-decoration: underline !important;
        cursor: pointer;
    }

    #budgetMainGrid TD{
        border-width: 0 0 1px 1px !important;
    }

    #budgetMainGrid2 TD{
        border-width: 0 0 1px 1px !important;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budget/busnCostDetailView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

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

<input type="hidden" id="pjtCd" value="${params.pjtCd}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="title">사업비 현황</span>

            </h3>

            <div class="btn-st popButton" style="font-size: 13px;">

            </div>
        </div>

        <div class="col-md-12 col-sm-12" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="40%">
                    <col width="10%">
                    <col width="40%">
                </colgroup>
                <thead>
                <tr>
                    <th class="text-center th-color">조회기간</th>
                    <td colspan="3">
                        <input type="text" id="strDe" style="width: 200px;"> ~ <input type="text" id="endDe" style="width: 200px;">
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bcd.gridReload()">
                            <span class="k-button-text">조회</span>
                        </button>
                    </td>
                </tr>
                </thead>
            </table>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="8%">
                    <col width="7%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="5" style="font-weight: bold">프로젝트정보</th>
                </tr>
                <tr>
                    <th colspan="2" scope="row" class="text-center th-color">
                        예산코드
                    </th>
                    <td colspan="3">
                        ${g20Info.PJT_CD}
                    </td>
                </tr>
                <tr>
                    <th colspan="2" scope="row" class="text-center th-color">
                        프로젝트명
                    </th>
                    <td colspan="3">
                        ${projectInfo.PJT_NM}
                    </td>
                </tr>
                <tr>
                    <th colspan="2" scope="row" class="text-center th-color">
                        예산프로젝트명
                    </th>
                    <td colspan="3">
                        ${g20Info.PJT_NM}
                    </td>
                </tr>
                <tr>
                    <th colspan="2" scope="row" class="text-center th-color">
                        프로젝트 시작일
                    </th>
                    <td>
                        ${g20Info.FR_DT}
                        <input type="hidden" id="g20FrDt" value="${g20Info.FR_DT}"/>
                    </td>
                    <th scope="row" class="text-center th-color">
                        프로젝트 종료일
                    </th>
                    <td>
                        ${g20Info.TO_DT}
                        <input type="hidden" id="g20ToDt" value="${g20Info.TO_DT}"/>
                    </td>
                </tr>
                <tr>
                    <th colspan="2" scope="row" class="text-center th-color">
                        관리예금계좌명
                    </th>
                    <td>
                        ${g20Info.ATPJT_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        계좌번호
                    </th>
                    <td>
                        <input type="hidden" id="bankNB" value="${g20Info.BA_NB}">
                        ${g20Info.BANK_NM} - ${g20Info.BA_NB}
                    </td>
                </tr>
                <tr>
                    <th rowspan="2" scope="row" class="text-center th-color">
                        이월금액
                    </th>
                    <th scope="row" class="text-center th-color">
                        현금
                    </th>
                    <td>
                        <input type="text" id="carryoverCash" style="width: 200px; text-align: right;" onkeyup="inputNumberFormatN(this)">
                        <button class="k-button k-button-solid-base" onclick="bcd.fn_carryoverSave('cash');">저장</button>
                    </td>
                    <th rowspan="2" scope="row" class="text-center th-color">
                        시재현황
                    </th>
                    <td rowspan="2" style="vertical-align: middle;">
                        <span id="currentAmt"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        포인트
                    </th>
                    <td>
                        <input type="text" id="carryoverPoint" style="width: 200px; text-align: right;" onkeyup="inputNumberFormatN(this)">
                        <button class="k-button k-button-solid-base" onclick="bcd.fn_carryoverSave('point');">저장</button>
                    </td>
                </tr>
                </thead>
            </table>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="85%">
                </colgroup>
                <thead>
                <tr>
                    <th style="font-weight: bold">수입지출 총괄</th>
                    <td>
                        <table class="popTable table table-bordered mb-0">
                            <colgroup>
                                <col width="10%">
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                                <col width="20%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th style="font-weight: bold">구분</th>
                                <th style="font-weight: bold">수입</th>
                                <th style="font-weight: bold">지출</th>
                                <th style="font-weight: bold">계</th>
                                <th style="font-weight: bold">설명</th>
                            </tr>
                            <tr>
                                <td style="text-align: center">예산반영</td>
                                <td style="text-align: right" id="incpA"></td>
                                <td style="text-align: right" id="exnpA"></td>
                                <td style="text-align: right" id="sumA"></td>
                                <td style="">정상적 입출금</td>
                            </tr>
                            <tr>
                                <td style="text-align: center">예산미반영</td>
                                <td style="text-align: right" id="incpB"></td>
                                <td style="text-align: right" id="exnpB"></td>
                                <td style="text-align: right" id="sumB"></td>
                                <td style="">타프로젝트 자금이 당계좌로 입출될 경우</td>
                            </tr>
                            <tr>
                                <td style="text-align: center">타계좌</td>
                                <td style="text-align: right" id="incpC"></td>
                                <td style="text-align: right" id="exnpC"></td>
                                <td style="text-align: right" id="sumC"></td>
                                <td style="">해당프로젝트 자금이 타계좌로 입출될 경우</td>
                            </tr>
                            </thead>
                        </table>
                    </td>
                </tr>
                </thead>
            </table>
        </div>

        <div style="margin-top: 10px; font-size: 12px; text-align: right;">
            <form action="/mng/budgetExcelDownLoad" method="get">
                <input type="hidden" id="formPjtCd" name="formPjtCd" value="${params.pjtCd}" />
                <input type="hidden" id="formPjtNm" name="formPjtNm" value="${g20Info.PJT_NM}" />
                <input type="hidden" id="formStartDt" name="formStartDt" />
                <input type="hidden" id="formEndDt" name="formEndDt" />
                <input type="hidden" id="formBaseDate" name="formBaseDate" />
                <input type="hidden" id="formGisu" name="formGisu" />
                <button id="excelDownBtn" class="k-button k-button-solid-base">엑셀 다운로드</button>
            </form>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8" style="font-weight: bold">수입예산</th>
                </tr>
                </thead>
            </table>
            <div id="budgetMainGrid"></div>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8" style="font-weight: bold">지출예산</th>
                </tr>
                </thead>
            </table>
            <div id="budgetMainGrid2"></div>
        </div>
    </div>
</div>

<script>
    const frDt = "${g20Info.FR_DT}";
    const toDt = "${g20Info.TO_DT}";
    console.log("frDt", frDt);
    console.log("toDt", toDt);
    const year = frDt.substring(0, 4);
    const month = frDt.substring(4, 6);
    const day = frDt.substring(6, 8);
    const year2 = toDt.substring(0, 4);
    const month2 = toDt.substring(4, 6);
    const day2 = toDt.substring(6, 8);
    customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date(year+"-"+month+"-"+day));
    customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", new Date(year2+"-"+month2+"-"+day2));
    bcd.fn_defaultScript();
</script>
</body>
</html>