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
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/purcCrmManagement.js?v=${today}'/>"></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">구매거래협력업체</h4>
            <div class="title-road">캠어취브 &gt; 구매관리 &gt; 구매거래협력업체</div>
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
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                <span style="font-weight: bold; font-size: 13px;">1. 거래금액별, 거래횟수 별 구매현황</span>
                <button type="button" class="k-button k-button-solid-info" onclick="purcCrmManagement.fn_excelDownload(1, '거래금액별, 거래횟수 별 구매현황')">엑셀 다운로드</button>
            </div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(단: 건, 백만원, 부가세별도)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="15%">
                </colgroup>
                <thead id="tableA">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                <span style="font-weight: bold; font-size: 13px;">2. 협력사 지역분포</span>
                <button type="button" class="k-button k-button-solid-info" onclick="purcCrmManagement.fn_excelDownload(2, '협력사 지역분포')">엑셀 다운로드</button>
            </div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="12%">
                    <col width="11%">
                    <col width="11%">
                    <col width="11%">
                    <col width="11%">
                    <col width="11%">
                    <col width="11%">
                    <col width="11%">
                    <col width="11%">
                </colgroup>
                <thead id="tableB">
                </thead>
            </table>
            <div style="width: 100%"><span style="font-weight: bold; font-size: 13px;">*협력사: 구매거래를 한 업체의 수(중복제외)</span></div>
        </div>

        <div class="panel-body">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                <span style="font-weight: bold; font-size: 13px;">3.협력사 관리대상</span>
                <button type="button" class="k-button k-button-solid-info" onclick="purcCrmManagement.fn_excelDownload(3, '협력사 관리대상')">엑셀 다운로드</button>
            </div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="40%">
                    <col width="20%">
                    <col width="20%">
                </colgroup>
                <thead id="tableC">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                <span style="font-weight: bold; font-size: 13px;">4. 사업본부별 주요 거래 협력업체 - 거래금액기준</span>
                <button type="button" class="k-button k-button-solid-info" onclick="purcCrmManagement.fn_excelDownload(4, '사업본부별 주요 거래 협력업체 - 거래금액기준')">엑셀 다운로드</button>
            </div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(상위TOP10)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="20%">
                    <col width="10%">
                </colgroup>
                <thead id="tableD">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                <span style="font-weight: bold; font-size: 13px;">5. 사업본부별 주요 거래 협력업체 - 거래 빈도 수 기준</span>
                <button type="button" class="k-button k-button-solid-info" onclick="purcCrmManagement.fn_excelDownload(5, '사업본부별 주요 거래 협력업체 - 거래 빈도 수 기준')">엑셀 다운로드</button>
            </div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(상위TOP10)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="20%">
                    <col width="10%">
                </colgroup>
                <thead id="tableE">
                </thead>
            </table>
        </div>

        <div class="panel-body">
            <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                <span style="font-weight: bold; font-size: 13px;">6. 사업본부별 주요 거래 협력업체 - 신규거래, 금액기준</span>
                <button type="button" class="k-button k-button-solid-info" onclick="purcCrmManagement.fn_excelDownload(6, '사업본부별 주요 거래 협력업체 - 신규거래, 금액기준')">엑셀 다운로드</button>
            </div>
            <div style="width: 100%; text-align: right"><span style="font-size: 10px;">(상위TOP10)</span></div>

            <table class="searchTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="20%">
                    <col width="10%">
                </colgroup>
                <thead id="tableF">
                </thead>
            </table>
        </div>
    </div>
</div><!-- col-md-9 -->

<div id="hiddenGrid1" style="display: none;"></div>
<div id="hiddenGrid2" style="display: none;"></div>
<div id="hiddenGrid3" style="display: none;"></div>
<div id="hiddenGrid4" style="display: none;"></div>
<div id="hiddenGrid5" style="display: none;"></div>
<div id="hiddenGrid6" style="display: none;"></div>

<script>
    purcCrmManagement.fn_defaultScript();
</script>
