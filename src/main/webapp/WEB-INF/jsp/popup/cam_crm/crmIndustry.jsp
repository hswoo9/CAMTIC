<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmIndustry.js?v=${today}'/>"></script>
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
<input type="hidden" id="crmIndustrySn" value="" />

<div style="padding: 10px">
    <span style="float: right;">
    <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmIndustry.fn_save()">저장</button>
        </span>
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col width="10%">
            <col width="40%">
            <col width="10%">
            <col width="40%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" rowspan="2" class="text-center th-color">
                산업분야
            </th>
            <td colspan="3">
                <span id="mainCode" style="gap: 0px;"></span>
            </td>
        </tr>
        <tr>
            <td colspan="3" id="subCdTr" style="height: 27px">

            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                단지구분
            </th>
            <td>
                <input type="text" id="complexType" style="width: 90%;">
            </td>
            <th scope="row" class="text-center th-color">
                단지명
            </th>
            <td>
                <input type="text" id="complexName" style="width: 90%;">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                부설연구소
            </th>
            <td colspan="3">
                <textarea id="laboratory"></textarea>
            </td>
        </tr>
        </thead>
    </table>
</div>