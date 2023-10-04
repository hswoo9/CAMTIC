<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/crmAccounting.js?v=${today}'/>"></script>
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
<input type="hidden" id="crmAccountingSn" value="" />
<style>
    span[name='imgViewer']:hover{
        text-decoration: underline;
        color: blue;
        cursor: pointer;
    }
</style>
<div style="padding: 10px">
    <span style="float: right;">
    <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmA.fn_save()">저장</button>
        </span>
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col width="15%">
            <col>
            <col width="15%">
            <col>
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">
                은행명
            </th>
            <td>
                <input type="text" id="bankName" name="bankName" style="width: 50%">
            </td>
            <th scope="row" class="text-center th-color">
                계좌번호
            </th>
            <td>
                <input type="text" id="accountNum" name="accountNum" style="width: 50%">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                예금주
            </th>
            <td>
                <input type="text" id="accountHolder" name="accountHolder" style="width: 50%">
            </td>
            <th scope="row" class="text-center th-color">
                회계담당자
            </th>
            <td>
                <input type="text" id="accountChargeNm" name="accountChargeNm" style="width: 50%">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                회계담당 이메일
            </th>
            <td colspan="3">
                <input type="text" id="accountChargeEmail" name="accountChargeEmail" style="width: 50%">
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                사업자등록증
            </th>
            <td>
                <input type="hidden" id="file1Sn" name="file1Sn">
                <label for="file1" class="k-button k-button-solid-base">파일첨부</label>
                <input type="file" id="file1" name="file1" onchange="crmA.fileChange(this)" style="display: none">
                <span id="file1Name"></span>
            </td>
            <th scope="row" class="text-center th-color">
                통장사본
            </th>
            <td>
                <input type="hidden" id="file2Sn" name="file1Sn">
                <label for="file2" class="k-button k-button-solid-base">파일첨부</label>
                <input type="file" id="file2" name="file2" onchange="crmA.fileChange(this)" style="display: none">
                <span id="file2Name"></span>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                사업자등록증 이미지
            </th>
            <td>
                <div style="display: none" id="file1ViewDiv">
                    <span id="file1Img" name="imgViewer">이미지 보기</span>
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" id="file1DelBtn" onclick="crmA.fileDel($('#file1Sn').val(), 'file1Sn')">삭제</button>
                </div>
            </td>
            <th scope="row" class="text-center th-color">
                통장사본 이미지
            </th>
            <td>
                <div style="display: none" id="file2ViewDiv">
                    <span id="file2Img" name="imgViewer">이미지 보기</span>
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" id="file2DelBtn" onclick="crmA.fileDel($('#file2Sn').val(), 'file2Sn')">삭제</button>
                </div>
            </td>
        </tr>
        </thead>
    </table>
</div>