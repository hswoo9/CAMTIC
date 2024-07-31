<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .th-color{
        background-color: #00397f96 !important;
        color: white !important;
        padding: 5px 15px !important;
    }

    #tableB {
        table-layout: fixed;
        width: 100%;
    }

    #tableB td {
        padding: 5px 15px;
        line-height: 1.42857143;
        vertical-align: middle;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/purcFundManagement.js?v=${today}'/>"></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">구매자금관리</h4>
            <div class="title-road">캠어취브 &gt; 구매관리 &gt; 구매자금관리</div>
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
                        <input type="text" id="year" style="width: 10%;">
                    </td>
                </tr>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">1. 사업구분별 구매거래 건 수 및 금액</span></div>

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
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">2. 사업구분별 지급예정일</span></div>

            <div style="overflow-x: auto; margin-bottom: 17px">
            <table id="tableB" class="searchTable table-bordered mb-0" style="magin-bottom: 0px !important">
            </table>
            </div>
        </div>

        <div class="panel-body">
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    purcFundManagement.fn_defaultScript();
</script>
