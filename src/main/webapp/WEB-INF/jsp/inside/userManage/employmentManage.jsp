<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/employmentManage.js?v=${today}"/></script>

<form id="employRF" method="post">
    <input type="hidden" id="employR" name="employR" value="">
</form>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">연봉근로계약서(관리자)</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 > 연봉계약 > 연봉근로계약서(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="7%">
                        <col width="15%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="12%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="startDate" style="width: 45%;">
                            ~
                            <input type="text" id="endDate" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptSeq" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" style="width: 100%;" onchange="employmentManage.gridReload()">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="status" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="text" id="name" style="width: 100%;" onkeypress="if(window.event.keyCode==13){employmentManage.gridReload()}">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    employmentManage.init();
</script>