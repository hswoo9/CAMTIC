<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/baseInfo/itemList.js?v=${today}'/>"></script>
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
            <h4 class="panel-title">품목정보</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 기준정보 > 품목정보</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="8%">
                        <col width="15%">
                        <col width="8%">
                        <col width="15%">
                        <col width="8%">
                        <col width="15%">
                        <col width="8%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">입고창고</th>
                        <td>
                            <input type="text" id="whCd" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">품목구분</th>
                        <td>
                            <input type="text" id="itemType" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">규격</th>
                        <td>
                            <input type="text" id="itemUnitCd" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){itemL.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    itemL.fn_defaultScript();
</script>
