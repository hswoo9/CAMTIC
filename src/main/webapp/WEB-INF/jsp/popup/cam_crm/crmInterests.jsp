<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmInterests.js?v=${today}'/>"></script>
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
<style>
    label {
        margin: 0;
    }
</style>
<input type="hidden" id="crmSn" value="<%=crmSn%>" />
<input type="hidden" id="regEmpSeq" value="<%=regEmpSeq%>" />
<input type="hidden" id="crmInterestsSn" value="" />

<div style="padding: 10px">
    <span style="float: right;">
    <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmI.fn_save()">저장</button>
        </span>
    <table class="popTable table table-bordered mb-0" style="line-height: 30px">
        <colgroup>
            <col width="10%">
            <col width="10%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">
                연구개발
            </th>
            <td id="mainDepth1">

            </td>
            <td id="subDepth1_1">

            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                개발사업
            </th>
            <td id="mainDepth2">

            </td>
            <td id="subDepth2_1">

            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                기업지원
            </th>
            <td id="mainDepth3">

            </td>
            <td id="subDepth3_1">

            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                교육훈련
            </th>
            <td id="mainDepth4">

            </td>
            <td id="subDepth4_1">

            </td>
        </tr>
        </thead>
    </table>
</div>
<script>
    crmI.fn_defaultScript();
</script>