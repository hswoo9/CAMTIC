<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/customerDeptRelation.js?v=${today}'/>"></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>

<style>
    .k-detail-row {
        background-color : #ffffff !important;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">부서별 관계이력</h4>
            <div class="title-road">캠CRM > 통계조회 &gt; 부서별 관계이력</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div id="deptRelationChart"></div>
            <div style="margin: 50px 0;">
                <div style="font-weight: bold">◎ 부서별 관계이력 현황</div>
                <table class="totalTable table table-bordered" style="margin-bottom: 0px">
                    <thead>
                    <colgroup>
                        <col width="10%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                        <col width="7%">
                    </colgroup>
                    <tr style="text-align: center;">
                        <th style="text-align: center;">부서명</th>
                        <th style="text-align: center;">1월</th>
                        <th style="text-align: center;">2월</th>
                        <th style="text-align: center;">3월</th>
                        <th style="text-align: center;">4월</th>
                        <th style="text-align: center;">5월</th>
                        <th style="text-align: center;">6월</th>
                        <th style="text-align: center;">7월</th>
                        <th style="text-align: center;">8월</th>
                        <th style="text-align: center;">9월</th>
                        <th style="text-align: center;">10월</th>
                        <th style="text-align: center;">11월</th>
                        <th style="text-align: center;">12월</th>
                    </tr>
                    </thead>
                    <tbody id="deptRelation">

                    </tbody>

                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    deptCondition.fn_defaultScript();
</script>
