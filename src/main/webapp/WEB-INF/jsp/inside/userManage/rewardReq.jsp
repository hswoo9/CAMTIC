<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/history/rewardReq.js?v=${today}"/></script>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">포상 관리</h4>
            <div class="title-road">캠인사이드 > 발령/포상관리 &gt; 포상 관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td style="border-bottom:0; background-color: white">
                            <input type="text" id="start_date" style="width: 45%;">
                            ~
                            <input type="text" id="end_date" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">포상 구분</th>
                        <td>
                            <input type="text" id="rewardType" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 45%; margin-right:10px;">
                            <input type="text" id="team" style="width: 50%;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">
                            검색어
                        </th>
                        <td colspan="5">
                            <input type="text" id="searchType" style="width: 100px;">
                            <input type="text" id="searchText" style="width: 200px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">검색</button>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    rewardReq.init();
</script>