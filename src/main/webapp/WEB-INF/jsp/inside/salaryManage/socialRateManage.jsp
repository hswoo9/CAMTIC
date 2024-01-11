<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/salaryManage/socialRateManage.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .percentInput {
        text-align: right;
    }
</style>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">사대보험요율관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 참여율관리 > 사대보험요율관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div class="btn-st popButton" style="text-align: right">
                <button type="button" class="k-button k-button-solid-info" onclick="srm.setSocialRate()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="srm.addRow('new')">추가</button>
            </div>
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 10%">
                    <col style="width: 10%">
                    <col style="width: 12%">
                    <col>
                    <col style="width: 12%">
                    <col style="width: 12%">
                    <col style="width: 12%">
                    <col style="width: 12%">
                    <col style="width: 5%">
                </colgroup>
                <thead>
                    <tr>
                        <th>적용시작</th>
                        <th>적용종료</th>
                        <th>국민연금(%)</th>
                        <th>국민연금 공제 한도 금액(원)</th>
                        <th>건강보험(%)</th>
                        <th>장기요양보험(%)</th>
                        <th>고용보험(%)</th>
                        <th>산재보험(%)</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody id="listTb">

                </tbody>
            </table>

            <div style="margin:20px 0;"><h4 class="panel-title">법인계좌 관리</h4></div>
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    srm.fn_defaultScript();
</script>