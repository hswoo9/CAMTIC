<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmMemInfo.js?v=${today}'/>"></script>
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
<input type="hidden" id="crmMemSn" value="" />


<div style="padding: 10px">
    <span style="float: right;">
    <button type="button" id="initBtn" style="margin-right:5px; margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="crmMi.fn_init()">신규</button>
    <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmMi.fn_save()">저장</button>
        </span>
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
                <span class="red-star">*</span>성명
            </th>
            <td colspan="3">
                <input type="text" id="crmMemNm" style="width: 35%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                직위
            </th>
            <td>
                <input type="text" id="crmMemDuty" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                부서
            </th>
            <td>
                <input type="text" id="crmMemDept" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                핸드폰
            </th>
            <td>
                <input type="text" id="crmMemPhn" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                이메일
            </th>
            <td>
                <input type="text" id="crmMemEmail" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                비고
            </th>
            <td colspan="3">
                <input type="text" id="crmMemEtc" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                분류
            </th>
            <td colspan="3">
                <span style="position: relative; top: 3px">
                    <input type="checkbox" id="crmMemClassA" name="crmMemClass" value="A">
                    <label for="crmMemClassA" style="margin-right: 15px;">연구개발</label>
                    <input type="checkbox" id="crmMemClassB" name="crmMemClass" value="B">
                    <label for="crmMemClassB" style="margin-right: 15px;">개발사업</label>
                    <input type="checkbox" id="crmMemClassC" name="crmMemClass" value="C">
                    <label for="crmMemClassC" style="margin-right: 15px;">교육훈련</label>
                    <input type="checkbox" id="crmMemClassD" name="crmMemClass" value="D">
                    <label for="crmMemClassD" style="margin-right: 15px;">기업지원</label>
                    <input type="checkbox" id="crmMemClassE" name="crmMemClass" value="E">
                    <label for="crmMemClassE" style="margin-right: 15px;">기타</label>
                </span>
            </td>
        </tr>
        </thead>
    </table>

    <div id="memGrid" style="margin-top: 5px;"></div>
</div>