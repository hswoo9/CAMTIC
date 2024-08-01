<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/shipmentMa/shipmentRecordRegList.js?v=${today}'/>"></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">출하실적등록</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 출하관리 > 출하실적등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <input type="hidden" id="deliveryDt" name="deliveryDt" value="${nowHyphen}">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="20%">
                        <col width="7%">
                        <col width="18%">
                        <col width="5%">
                        <col width="25%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">업체</th>
                        <td>
                            <input type="hidden" id="crmSn" name="crmSn" onchange="srrl.gridReload();">
                            <input type="text" id="crmNm" style="width: 190px;" readonly onclick="srrl.fn_popCamCrmList()">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srrl.fn_popCamCrmList()">
                                조회
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="srrl.crmSnReset()">
                                초기화
                            </button>
                        </td>
                        <th class="text-center th-color">납품일자</th>
                        <td>
                            <input type="text" id="startDt" style="width: 45%;"> ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){srrl.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
    <form name="srForm">
        <input type="hidden" id="smRecordSnArr" name="smRecordSnArr">
        <input type="hidden" id="itemSnList" name="itemSnList">
        <input type="hidden" id="qtyList" name="qtyList">
    </form>
</div><!-- col-md-9 -->

<script>
    srrl.fn_defaultScript();
</script>
