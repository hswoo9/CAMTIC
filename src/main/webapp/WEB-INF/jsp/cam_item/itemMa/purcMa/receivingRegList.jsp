<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/purcMa/receivingRegList.js?v=${today}'/>"></script>
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
            <h4 class="panel-title">입고등록</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 구매관리 > 입고등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="20%">
                        <col width="6%">
                        <col width="10%">
                        <col width="5%">
                        <col width="17%">
                        <col width="4%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">업체</th>
                        <td>
                            <input type="hidden" id="crmSn" name="crmSn" onchange="recL.gridReload();">
                            <input type="text" id="crmNm" style="width: 180px;" readonly onclick="recL.fn_popCamCrmList()">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recL.fn_popCamCrmList()">
                                조회
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recL.crmSnReset()">
                                초기화
                            </button>
                        </td>
                        <th class="text-center th-color">입고형태</th>
                        <td>
                            <input type="text" id="whType" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">입고일</th>
                        <td>
                            <input type="text" id="startDt" style="width: 110px;"> ~
                            <input type="text" id="endDt" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">창고</th>
                        <td>
                            <input type="text" id="whCd" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){recL.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    recL.fn_defaultScript();
</script>
