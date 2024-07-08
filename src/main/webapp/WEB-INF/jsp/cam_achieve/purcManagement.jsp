<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/purcManagement.js?v=${today}'/>"></script>


<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>
    .th-color{
        background-color: #00397f96 !important;
        color: white !important;
        padding: 5px 15px !important;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">구매현황</h4>
            <div class="title-road">캠어취브 &gt; 구매관리 &gt; 구매현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="25%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">연도선택</th>
                    <td colspan="6">
                        <input type="text" id="year" style="width: 150px;">
                    </td>
                </tr>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">1. 년도별 구매현황</span></div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(단: 건, 백만원, 부가세별도)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                </colgroup>
                <thead id="tableA">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">2. 사업분야별 구매거래 현황</span></div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(단: 건, 백만원, 부가세별도)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                </colgroup>
                <thead id="tableB">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">3. 구매품목 구분별 거래현황</span></div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(단: 건, %)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="24%">
                    <col width="12%">
                    <col width="16%">
                </colgroup>
                <thead id="tableC">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">4. 자산유무 구분</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="24%">
                    <col width="12%">
                    <col width="16%">
                </colgroup>
                <thead id="tableD">
                </thead>
            </table>
        </div>
    </div>
</div>

<script>
    purcManagement.fn_defaultScript();
</script>
