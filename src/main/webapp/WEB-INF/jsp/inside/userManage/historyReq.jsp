<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/history/historyReq.js?v=${today}"/></script>
<style>
    .hover:hover {text-decoration: underline; cursor: pointer}
    .dash-left .table > tbody > tr > th {
    padding-left: 5px;
    padding-right: 5px;
    }
    .dash-left .table > tbody > tr > td {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">발령 관리</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 발령/포상관리 &gt; 발령 관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <%--<col width="5">
                        <col width="5">
                        <col width="5">
                        <col width="5">
                        <col width="15px">
                        <col width="5">
                        <col width="15px">
                        <col width="5">
                        <col width="5">
                        <col width="5">
                        <col width="15px">--%>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">발령 구분</th>
                        <td>
                            <input type="text" id="historyType" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">발령 기준</th>
                        <td>
                            <input type="text" id="appointmentType" style="width: 80px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 150px;">
                            <input type="text" id="team" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 110px;">
                            ~
                            <input type="text" id="end_date" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">성별</th>
                        <td>
                            <input type="text" id="gender" style="width: 70px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width: 70px;">
                            <input type="text" id="searchText"  onkeypress="if(window.event.keyCode==13){historyList.gridReload()}"style="width: 130px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    historyList.init();
</script>