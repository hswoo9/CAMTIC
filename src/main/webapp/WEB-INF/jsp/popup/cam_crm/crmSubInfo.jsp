<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmSubInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<%
    String crmSn = request.getParameter("crmSn");
    String regEmpSeq = request.getParameter("regEmpSeq");
    if(crmSn == null){
        return ;
    }
    if(regEmpSeq == null){
        return ;
    }

%>
<input type="hidden" id="crmSn" value="<%=crmSn%>" />
<input type="hidden" id="regEmpSeq" value="<%=regEmpSeq%>" />


<div style="padding: 10px">
    <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmSi.fn_save()">저장</button>
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
                <span class="red-star">*</span>고객 유치경로
            </th>
            <td colspan="3">
                <input type="text" id="crmAtt" style="width: 35%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star">*</span>고객분류
            </th>
            <td colspan="3">
                <input type="text" id="crmClass" style="width: 15%;">
                <span id="boxA">
                    <input type="text" id="crmSubClass" style="width: 20%;">
                </span>
                <span id="boxB" style="display: none">
                    <input type="text" id="crmSubClassText" style="width: 20%;">
                </span>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star">*</span>거래처분류
            </th>
            <td>
                <span style="position: relative; top: 3px">
                    <input type="checkbox" id="buyCl" name="crmClientVal">
                    <label for="buyCl" style="margin-right: 15px;">구매거래처</label>
                    <input type="checkbox" id="miCl" name="crmClientVal">
                    <label for="miCl">입주기업</label>
                </span>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>소재지
            </th>
            <td>
                <span style="position: relative; top: 3px">
                    <input id="crmLoc" style="width: 90%;">
                </span>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                홈페이지
            </th>
            <td>
                <input type="text" id="homepage" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                주생산품
            </th>
            <td>
                <input type="text" id="crmProd" style="width: 90%;">
            </td>
        </tr>
        <tr style="display:none;">
            <th scope="row" class="text-center th-color">
                영업상태
            </th>
            <td>
                <input type="text" id="crmStat" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                고객정보파일
            </th>
            <td colspan="3">
                <label for="crmFile" class="k-button k-button-clear-info">파일 선택</label>
                <span id="crmFileText">선택된 파일 없음</span>
                <input type="file" id="crmFile" style="display: none" onchange="crmSi.fn_fileChange(this)">
<%--                <input type="file" name="file" id="crmFile" style="width: 90%;">--%>
            </td>
        </tr>
<%--        <tr>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                은행명--%>
<%--            </th>--%>
<%--            <td>--%>
<%--                <input type="text" id="crmBn" style="width: 90%;">--%>
<%--            </td>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                계좌번호--%>
<%--            </th>--%>
<%--            <td>--%>
<%--                <input type="text" id="crmBnNum" style="width: 90%;">--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                예금주--%>
<%--            </th>--%>
<%--            <td>--%>
<%--                <input type="text" id="bnDepo" style="width: 90%;">--%>
<%--            </td>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                회계담당자--%>
<%--            </th>--%>
<%--            <td>--%>
<%--                <input type="text" id="acntNm" style="width: 90%;">--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                회계담당자 이메일--%>
<%--            </th>--%>
<%--            <td colspan="3">--%>
<%--                <input type="text" id="acntEmail" style="width: 90%;">--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                사업자등록증--%>
<%--            </th>--%>
<%--            <td>--%>
<%--                <label for="crmLics" class="k-button k-button-clear-info">파일 선택</label>--%>
<%--                <span id="crmLicsText">선택된 파일 없음</span>--%>
<%--                <input type="file" id="crmLics" style="display: none" onchange="crmSi.fn_fileChange(this)">--%>
<%--                <input type="file" name="file" id="crmLics" style="width: 90%;">--%>
<%--            </td>--%>
<%--            <th scope="row" class="text-center th-color">--%>
<%--                통장사본--%>
<%--            </th>--%>
<%--            <td>--%>
<%--                <label for="bnCp" class="k-button k-button-clear-info">파일 선택</label>--%>
<%--                <span id="bnCpText">선택된 파일 없음</span>--%>
<%--                <input type="file" id="bnCp" style="display: none" onchange="crmSi.fn_fileChange(this)">--%>
<%--                <input type="file" name="file" id="bnCp" style="width: 90%;">--%>
<%--            </td>--%>
<%--        </tr>--%>
        <tr>
            <th scope="row" class="text-center th-color">
                사업자 등록상태
            </th>
            <td>
                <input id="bStt" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                과세자
            </th>
            <td>
                <input id="taxType" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                비고
            </th>
            <td colspan="3">
                <textarea type="text" id="etc" style="width: 100%;"></textarea>
            </td>

        </tr>
        </thead>
    </table>
</div>