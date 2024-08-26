<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/obtainOrderMa/obtainOrderRegList.js?v=${today}'/>"></script>
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
            <h4 class="panel-title">수주등록</h4>
            <div class="title-road">캠아이템 > 아이템관리 > 수주관리 > 수주등록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="22%">
                        <col width="7%">
                        <col width="18%">
                        <col width="7%">
                        <col width="7%">
                        <col width="5%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">업체</th>
                        <td>
                            <input type="hidden" id="crmSn" name="crmSn" onchange="oorl.gridReload();">
                            <input type="text" id="crmNm" style="width: 190px;" readonly onclick="oorl.fn_popCamCrmList()">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oorl.fn_popCamCrmList()">
                                조회
                            </button>
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oorl.crmSnReset()">
                                초기화
                            </button>
                        </td>
                        <th class="text-center th-color">수주일</th>
                        <td>
                            <input type="text" id="startDt" style="width: 45%;"> ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">마감구분</th>
                        <td>
                            <input type="text" id="deadLine" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){oorl.gridReload()}"/>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">품번</th>
                        <td colspan="7">
                            <input type="text" id="categoryA" name="categoryA" style="width: 120px">
                            <input type="text" id="categoryB" name="categoryB" style="width: 120px">
                            <input type="text" id="categoryC" name="categoryC" style="width: 120px">
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    oorl.fn_defaultScript();
</script>
<script type="text/x-kendo-template" id="template">
    <div class='subGrid'></div>
</script>
