<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>

<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/equipmentUsePop.js?v=${today}"/></script>
<html>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="crmCd" />
<input type="hidden" id="crmLoc" />
<input type="hidden" id="crmNm" />
<input type="hidden" id="crmProd" />
<input type="hidden" id="crmCeo" />
<input type="hidden" id="crmPost" />
<input type="hidden" id="crmAddr" />
<input type="hidden" id="crmCallNum" />
<input type="hidden" id="crmReqMem" />
<input type="hidden" id="crmPhNum" />
<input type="hidden" id="mainPjtSn" value="${params.pjtSn}"/>
    <div style="padding:0;">
        <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">장비사용 등록</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="equipmentUsePop.equipUseSave()">등록</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
                </div>
            </div>
            <form id="table-responsive" style="padding: 20px 30px;">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="popTable table table-bordered mb-0" style="margin-top: 10px;">
                    <colgroup>
                        <col width="15%">
                        <col width="35%">
                        <col width="15%">
                        <col width="35%">
                    </colgroup>
                    <thead>
                    <%--<tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">장비사용 등록</th>
                    </tr>--%>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>장비명
                        </th>
                        <td colspan="3">
                            <input type="text" id="eqipmnGbnName" style="width: 30%;">
                            <input type="text" id="eqipmnName" style="width: 60%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            관련사업
                        </th>
                        <td colspan="3">
                            <input type="text" id="busnName" name="busnName" style="width: 80%;" disabled />
                            <input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
                            <input type="hidden" id="pjtCd" name="pjtCd">
                            <button type="button" class="k-button k-button-solid-info" onclick="equipmentUsePop.fn_projectPop()" id="projectAddBtn">사업선택</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>사용일자
                        </th>
                        <td>
                            <input id="usePdStrDe" type="date" style="width: 110px;" onchange="equipmentUsePop.fn_calTime()">
                            <input id="time1" style="width: 80px" onchange="equipmentUsePop.fn_calTime()"> ~
                            <input id="time2" style="width: 80px" onchange="equipmentUsePop.fn_calTime()">
                        </td>
                        <td colspan="2">
                            <input id="usePdEndDe" type="date" style="width: 110px;" onchange="equipmentUsePop.fn_calTime()">
                            <input id="endTime1" style="width: 80px" onchange="equipmentUsePop.fn_calTime()"> ~
                            <input id="endTime2" style="width: 80px" onchange="equipmentUsePop.fn_calTime()">
                            <input type="checkbox" id="oneDay" onchange="equipmentUsePop.oneDay()" checked>
                            <label class="__lab" for="oneDay" style="vertical-align: middle;">당일</label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            사용시간
                        </th>
                        <td colspan="4">
                            <input type="text" id="useTime" maxlength="3" oninput="onlyNumber(this);" onkeyup="equipmentUsePop.fn_EqipmnHUF(this.value)" style="text-align: right; width: 80px;" disabled> 시간
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>담당자
                        </th>
                        <td>
                            <input type="text" id="userName" style="width: 80%;" disabled="disabled">
                            <input type="hidden" id="empSeq" style="width: 30%;" disabled="disabled">
                            <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0;" onclick="userSearch();">
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
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>작업내용
                        </th>
                        <td colspan="3"><input type="text" id="operCn" style="width: 100%;">
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            사용대금
                        </th>
                        <td>
                            <input type="text" id="useAmt" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 90%; text-align: right;">원
<%--                            <input type="hidden" id="hourlyUsageFee" value="" />--%>
                        </td>
                        <th scope="row" class="text-center th-color">
                            할인금액
                        </th>
                        <td>
                            사유 : <input id="perReason" style="width: 30%"/>
                            <input type="text" id="perAmt" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 52%; text-align: right;" value="0">원
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>의뢰업체</th>
                        <td><input type="text" id="clientPrtpcoName" disabled style="width: 80%;">
                            <button type="button" id="search1" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0;" onclick="equipmentUsePop.fn_popCamCrmList()">
                                검색
                            </button>
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>업체구분
                        </th>
                        <td><input type="text" id="prtpcoGbnName" style="width: 90%;">
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>작성 일자
                        </th>
                        <td colspan="3">
                            <input id="regDe" type="date" style="width: 30%;">
                        </td>
                    </tr>
                    </thead>
                </table>
            </form>
        </div>
    </div>
</div>


<script>
    equipmentUsePop.fn_defaultScript();

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