<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/equipmentUseUpdatePop.js?v=${today}"/></script>
<html>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">장비사용 등록 수정</h3>
            <div class="btn-st popButton">
                <button type="button" id="save" class="k-button k-button-solid-info" onclick="equipmentUseUpdatePop.equipUpdate();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <form style="padding: 20px 30px;">
            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <input type="hidden" id="eqipmnUseSn" name="eqipmnUseSn" value="${pk}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="4">장비사용 등록 수정</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>장비명</th>
                    <td colspan="3"><input type="text" id="eqipmnGbnName" style="width: 30%;">
                        <input type="text" id="eqipmnName" style="width: 60%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관련사업
                    </th>
                    <td colspan="3">
                        <input type="text" id="busnName" name="busnName" style="width: 80%;" disabled />
                        <input type="hidden" id="pjtSn" />
                        <input type="hidden" id="pjtCd" name="pjtCd">
                        <button type="button" class="k-button k-button-solid-info" onclick="equipmentUseUpdatePop.fn_projectPop()" id="projectAddBtn">사업선택</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>사용일자</th>
                    <td>
                        <input id="usePdStrDe" type="date" style="width: 34.4%;">
                        <input id="time1" style="width: 26%" onchange="equipmentUseUpdatePop.fn_calTime()"> ~
                        <input id="time2" style="width: 26%" onchange="equipmentUseUpdatePop.fn_calTime()">
                    </td>
                    <th scope="row" class="text-center th-color">
                        사용시간
                    </th>
                    <td>
                        <input type="text" id="useTime" maxlength="3" oninput="onlyNumber(this);" onkeyup="equipmentUseUpdatePop.fn_EqipmnHUF(this.value)" style="text-align: right; width: 65%;" disabled> 시간
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>담당자</th>
                    <td>
                        <input type="text" id="userName" style="width: 80%;" disabled="disabled">
                        <input type="hidden" id="empSeq" style="width: 30%;" disabled="disabled">
                        <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사용자
                    </th>
                    <td>
                        <input type="text" id="custNm" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>작업내용</th>
                    <td colspan="3"><input type="text" id="operCn" style="width: 100%;">
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사용대금
                    </th>
                    <td>
                        <input type="text" id="useAmt" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 90%; text-align: right;">원
                        <input type="hidden" id="hourlyUsageFee" value="" />
                    </td>
                    <th scope="row" class="text-center th-color">
                        할인금액
                    <td>
                        사유 : <input id="perReason" style="width: 30%"/>
                        <input type="text" id="perAmt" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 52%; text-align: right;" value="0">원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>의뢰업체</th>
                    <td><input type="text" id="clientPrtpcoName" disabled style="width: 80%;">
                        <button type="button" id="search1" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0;" onclick="equipmentUseUpdatePop.fn_popCamCrmList()">
                            검색
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>업체구분
                    </th>
                    <td><input type="text" id="prtpcoGbnName" style="width: 90%;">
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>작성 일자</th>
                    <td colspan="3"><input id="regDe" type="date" style="width: 35%;"></td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>


<script>
    equipmentUseUpdatePop.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }

    function selectProject(key, name){
        $("#busnName").val(name);
        $("#pjtSn").val(key);
    }

</script>
</body>
</html>