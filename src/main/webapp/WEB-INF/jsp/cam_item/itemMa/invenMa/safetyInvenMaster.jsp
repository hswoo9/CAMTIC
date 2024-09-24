<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/invenMa/safetyInvenMaster.js?v=${today}'/>"></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">안전재고마스터</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 재고관리 > 안전재고마스터</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="8%">
                        <col width="20%">
                        <col width="8%">
                        <col>
                        <col width="8%">
                        <col>
                        <col width="8%">
                        <col width="22%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">품번</th>
                        <td>
                            <input type="hidden" id="masterSn" name="masterSn" onchange="safetyInvenMa.gridReload();">
                            <input type="text" id="itemNo" class="k-input k-textbox" readonly style="width: 63%" onclick="safetyInvenMa.fn_popItemNoList();"/>
                            <button type="button" id="itemSelBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="safetyInvenMa.fn_popItemNoList();">선택</button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="safetyInvenMa.masterSnReset()">초기화</button>
                        </td>
                        <th class="text-center th-color">품명</th>
                        <td>
                            <input type="text" id="itemName" class="k-input k-textbox" readonly onclick="safetyInvenMa.fn_popItemNoList();"/>
                        </td>
                        <th class="text-center th-color">품목구분</th>
                        <td>
                            <input type="text" id="itemType" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){safetyInvenMa.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    safetyInvenMa.fn_defaultScript();
</script>
