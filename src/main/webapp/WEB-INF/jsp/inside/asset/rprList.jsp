<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/rprList.js?v=${today}"/></script>
<style>
    .table-bordered > tbody > tr > th {
        padding-left: 5px;
        padding-right: 5px;
    }
    .table-bordered > tbody > tr > td {
        padding-left: 7px;
        padding-right: 5px;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">지식재산권 리스트</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 지식재산권관리 &gt; 지식재산권 리스트</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="15%">
                        <col width="5%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <%--<th class="text-center th-color">기준</th>
                        <td>
                            <input type="text" id="drop1" style="width: 110px;">
                        </td>--%>
                        <%--<th class="text-center th-color">조회기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 110px;">
                            ~
                            <input type="text" id="end_date" style="width: 110px;">
                        </td>--%>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="drop2" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="drop3" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">유지여부</th>
                        <td>
                            <input type="text" id="drop4" style="width: 150px;">
                        </td>
                        <%--<th class="text-center th-color">단독/공동</th>
                        <td>
                            <input type="text" id="drop5" style="width: 70px;">
                        </td>--%>
                        <th class="text-center th-color">검색어</th>
                        <td colspan="3">
                            <input type="text" id="drop6" style="width: 100px;">
                            <input type="text" id="searchType" style="width: 100px;">
                            <input type="text" id="searchVal" style="width: 200px;" onkeypress="if(window.event.keyCode==13){rprList.gridReload();}">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    rprList.fn_defaultScript();
</script>