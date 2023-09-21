<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmMgScale.js?v=${today}'/>"></script>
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
<input type="hidden" id="crmMgScaleSn" value="" />

<div style="padding: 10px">
    <span style="float: right;">
    <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmMgScale.fn_save()">저장</button>
        </span>
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col width="10%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">
                년도
            </th>
            <td>
                <input type="text" id="mgScaleYear" name="mgScaleYear" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="4" style="width: 12%"> 년
            </td>
            <th scope="row" class="text-center th-color">
                자산
            </th>
            <td>
                <input type="text" id="asset" name="asset" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                부채
            </th>
            <td>
                <input type="text" id="liabilities" name="liabilities" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
            <th scope="row" class="text-center th-color">
                부채비율
            </th>
            <td>
                <input type="text" id="liabilitiesRatio" name="liabilitiesRatio" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 12%"> %
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                자본
            </th>
            <td colspan="3">
                <input type="text" id="capitalTotal" name="capitalTotal" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                자본금
            </th>
            <td>
                <input type="text" id="capital" name="capital" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
            <th scope="row" class="text-center th-color">
                자기자본비율
            </th>
            <td>
                <input type="text" id="capitalRatio" name="capitalRatio" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 12%"> %
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                매출액
            </th>
            <td>
                <input type="text" id="sales" name="sales" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
            <th scope="row" class="text-center th-color">
                당기순이익
            </th>
            <td>
                <input type="text" id="netIncome" name="netIncome" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                영업이익
            </th>
            <td>
                <input type="text" id="operatProfit" name="operatProfit" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
            <th scope="row" class="text-center th-color">
                영업이익률
            </th>
            <td>
                <input type="text" id="operatProfitRatio" name="operatProfitRatio" onkeyup="crmMgScale.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                직원수
            </th>
            <td colspan="3">
                <input type="text" id="empCnt" name="empCnt" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 12%"> 명
            </td>
        </tr>
        </thead>
    </table>
</div>
<script>
    crmMgScale.fn_defaultScript();
</script>