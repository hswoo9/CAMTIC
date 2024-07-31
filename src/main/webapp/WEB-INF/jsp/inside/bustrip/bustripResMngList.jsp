<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripResMngList.js?v=${toDate}"/></script>
<style>
    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">출장결과보고 (관리자)</h4>
            <div class="title-road">캠인사이드 > 출장관리 &gt; 출장결과보고(관리자)</div>
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
                        <th class="text-center th-color">출장 기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 40%;">
                            ~
                            <input type="text" id="end_date" style="width: 40%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 140px;">
                            <input type="text" id="team" style="width: 170px;">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="tripCode" style="width: 90%"/>
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">관련사업</th>
                        <td>
                            <input type="text" id="project" style="width: 90%"/>
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchValue" style="width: 140px;">
                            <input type="text" id="busnName" style="width: 58%;">
                        </td>
                        <th class="text-center th-color">입금상태</th>
                        <td>
                            <input type="text" id="depositStat" style="width: 90%;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    bustripResMngList.init();
</script>