<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/history/rewardReq.js?v=${today}"/></script>
<style>
    .hover:hover {text-decoration: underline; cursor: pointer}
    .dash-left .table > tbody > tr > td {padding-left: 10px; padding-right: 10px;}
</style>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">포상 관리</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 발령/포상관리 &gt; 포상 관리</div>
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
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td style="border-bottom:0; background-color: white">
                            <input type="text" id="start_date" style="width: 45%;">
                            ~
                            <input type="text" id="end_date" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">내/외부</th>
                        <td>
                            <input type="text" id="rewardTypeA" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">포상 구분</th>
                        <td>
                            <input type="text" id="rewardName" style="width: 140px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 150px;">
                            <input type="text" id="team" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">
                            검색어
                        </th>
                        <td colspan="5">
                            <input type="text" id="searchType" style="width: 15%;">
                            <input type="text" id="searchText" onkeypress="if(window.event.keyCode==13){rewardReq.gridReload()}" style="width: 25%;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    rewardReq.fn_defaultScript();
</script>