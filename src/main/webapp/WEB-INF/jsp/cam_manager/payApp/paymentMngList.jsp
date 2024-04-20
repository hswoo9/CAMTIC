<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/paymentMngList.js?v=${today}'/>"></script>
<style>
    a:hover {
        color: blue;
        text-decoration: underline !important;
        cursor: pointer;
    }

    .k-master-row {
        white-space: nowrap !important;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">지급신청서 (관리자)</h4>
            <div class="title-road">캠매니저 > 지출관리 &gt; 지급신청서 (관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="20%">
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">기간</th>
                        <td>
                            <input type="text" id="payAppStrDe" style="width: 45%;"> ~ <input type="text" id="payAppEndDe" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">문서유형</th>
                        <td>
                            <input type="text" id="payAppType" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="searchDept" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){crm.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<div id="dialog" style="overflow-x: hidden;">
    <table class="popTable table table-bordered mb-0" id="userReqPopImageTable" style="width: 100%">
        <colgroup>
            <col width="25%">
            <col width="25%">
            <col width="15%">
            <col width="35%">
        </colgroup>
        <thead>
        <tr style="" id="row3">
            <th>지출예정일</th>
            <td colspan="3">
                <input type="text" id="payExnpDe" style="width: 90%" name="payExnpDe" value="">
            </td>
        </tr>
        </thead>
    </table>
    <button type="button" onclick="paymentMngList.fn_changeExnpDe()" class="k-button k-button-solid-base" style="float: right; margin-top:8px; font-size: 12px;">변경</button>
</div>
<script>

    $("#dialog").kendoWindow({
        title: "지출예정일 변경",
        visible : false,
        resizable: false,
        modal: true,
        width: 500,
        actions: ["Close"],
    });

    paymentMngList.fn_defaultScript();

</script>
