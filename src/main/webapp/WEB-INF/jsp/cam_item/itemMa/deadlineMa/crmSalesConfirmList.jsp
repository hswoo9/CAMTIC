<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/deadlineMa/crmSalesConfirmList.js?v=${today}'/>"></script>
<style>
    a:hover{
        text-decoration: underline !important;
        color: blue;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">매출확정</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 마감관리 > 매출확정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="14%">
                        <col width="5%">
                        <col width="7%">
                        <col width="5%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">업체</th>
                        <td>
                            <input type="hidden" id="crmSn" name="crmSn" onchange="cscl.gridReload();">
                            <input type="text" id="crmNm" style="width: 220px;" readonly onclick="cscl.fn_popCamCrmList()">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cscl.fn_popCamCrmList()">
                                조회
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cscl.crmSnReset()">
                                초기화
                            </button>
                        </td>
                        <th class="text-center th-color">년월</th>
                        <td>
                            <input type="text" id="yearMonth" style="width: 80%;">
                        </td>
                        <th class="text-center th-color">확정여부</th>
                        <td>
                            <input type="text" id="confirmYn" style="width: 110px;">
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    cscl.fn_defaultScript();
</script>
