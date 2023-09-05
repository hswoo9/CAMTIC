<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userReqPop.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmSubInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>


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
                전화번호
            </th>
            <td>
                <input type="text" id="telNum" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                대표자 휴대폰
            </th>
            <td>
                <input type="text" id="phNum" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                팩스번호
            </th>
            <td>
                <input type="text" id="fax" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                설립일
            </th>
            <td>
                <input type="text" id="crmEstNo" style="width: 45%;">
                <span class="red-star" style="">ex) 2011-01-01</span>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                우편번호
            </th>
            <td colspan="3">
                <input type="text" id="post" style="width: 20%;">
                <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="userReqPop.addrSearch();"/>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                주소
            </th>
            <td colspan="3">
                <input type="text" id="addr" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                업태
            </th>
            <td>
                <input type="text" id="crmOcc" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                종목
            </th>
            <td>
                <input type="text" id="crmEvent" style="width: 90%;">
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
        <tr>
            <th scope="row" class="text-center th-color">
                영업상태
            </th>
            <td>
                <input type="text" id="crmStat" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                고객정보파일
            </th>
            <td>
                <label for="crmFile" class="k-button k-button-clear-info">파일 선택</label>
                <span id="crmFileText">선택된 파일 없음</span>
                <input type="file" id="crmFile" style="display: none" onchange="crmSi.fn_fileChange(this)">
<%--                <input type="file" name="file" id="crmFile" style="width: 90%;">--%>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                은행명
            </th>
            <td>
                <input type="text" id="crmBn" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                계좌번호
            </th>
            <td>
                <input type="text" id="crmBnNum" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                예금주
            </th>
            <td>
                <input type="text" id="bnDepo" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                회계담당자
            </th>
            <td>
                <input type="text" id="acntNm" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                회계담당자 이메일
            </th>
            <td colspan="3">
                <input type="text" id="acntEmail" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                사업자등록증
            </th>
            <td>
                <label for="crmLics" class="k-button k-button-clear-info">파일 선택</label>
                <span id="crmLicsText">선택된 파일 없음</span>
                <input type="file" id="crmLics" style="display: none" onchange="crmSi.fn_fileChange(this)">
<%--                <input type="file" name="file" id="crmLics" style="width: 90%;">--%>
            </td>
            <th scope="row" class="text-center th-color">
                통장사본
            </th>
            <td>.
                <label for="bnCp" class="k-button k-button-clear-info">파일 선택</label>
                <span id="bnCpText">선택된 파일 없음</span>
                <input type="file" id="bnCp" style="display: none" onchange="crmSi.fn_fileChange(this)">
<%--                <input type="file" name="file" id="bnCp" style="width: 90%;">--%>
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

<script>
    crmSi.fn_defaultScript();
</script>