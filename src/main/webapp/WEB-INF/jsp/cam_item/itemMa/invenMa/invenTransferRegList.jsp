<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/invenMa/invenTransferRegList.js?v=${today}'/>"></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">재고이동등록</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 재고관리 > 재고이동등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col style="width: 6%">
                        <col style="width: 17%">
                        <col style="width: 6%">
                        <col style="width: 10%">
                        <col style="width: 6%">
                        <col style="width: 11%">
                        <col style="width: 6%">
                        <col style="width: 11%">
                        <col style="width: 6%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">이동일자</th>
                        <td>
                            <input type="text" id="startDt" style="width: 45%;"> ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">이동구분</th>
                        <td>
                            <input type="text" id="transferType" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">출고처</th>
                        <td>
                            <input type="text" id="forwardingWhCd" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">입고처</th>
                        <td>
                            <input type="text" id="receivingWhCd" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){invenTrl.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    invenTrl.fn_defaultScript();
</script>
