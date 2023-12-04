<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setPayRequest.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>


<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>


<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="type" value="${params.type}" />
<input type="hidden" id="index" value="${params.index}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    ${params.empNameKr}님의 소득금액 입력
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="spr.fn_setData()">등록</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>소득자코드
                </th>
                <td>
                    <input type="text" id="trCd" value="${params.trCd}" style="width: 170px;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>소득자명
                </th>
                <td>
                    <input type="text" id="empNameKr" value="${params.empNameKr}" style="width: 170px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>주민번호
                </th>
                <td>
                    <input type="text" id="regNo" value="${params.regNo}" style="width: 170px;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>프로젝트명
                </th>
                <td>
                    <input type="text" id="pjtNm" value="" style="width: 170px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>지급일자
                </th>
                <td>
                    <input type="text" id="appDe" style="width: 100%;" >
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>영수일자
                </th>
                <td>
                    <input type="text" id="reqDe" style="width: 70%;">
                </td>
            </tr>
            <tr style="display: none" id="gubunTr">
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>소득구분
                </th>
                <td>
                    <input type="text" id="gubun" value="76. 강연료등" style="width: 100%;" >
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>필요경비율
                </th>
                <td>
                    <input type="text" id="bustAmt" value="60" style="text-align: right; width: 90%;"> %
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>지급액
                </th>
                <td>
                    <input type="text" id="supAmt" value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>세율
                </th>
                <td>
                    <input type="text" id="vatAmt" value="3" style="text-align: right; width: 90%;"> %
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>소득세
                </th>
                <td>
                    <input type="text" disabled id="incomeAmt" style="text-align: right; width: 100%;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>지방소득세
                </th>
                <td>
                    <input type="text" disabled id="locIncomeAmt" style="text-align: right; width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>공제총액
                </th>
                <td>
                    <input type="text" disabled id="supAllAmt" style="text-align: right; width: 100%;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>실지급액
                </th>
                <td>
                    <input type="text" disabled id="totAmt" style="text-align: right; width: 100%;">
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    spr.fn_defaultScript();


    function inputNumberFormat (obj){
        obj.value = comma(uncomma(obj.value));
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function uncomma(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    }
</script>