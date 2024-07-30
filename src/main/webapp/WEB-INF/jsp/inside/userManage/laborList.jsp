<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/laborList.js?v=${today}'/>"></script>
<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>


<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">인건비현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 참여율관리 > 인건비현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="25%">
                        <col width="30%">
                        <col width="5%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td>
                            <input type="text" id="baseYear" style="width: 50%;">
                        </td>
                        <td colspan="3">

                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="panel-body">
            <div>
                <table class="totalTable table table-bordered" style="margin-bottom: 0px; text-align: center" id="statusTb">
                    <thead>
                    <colgroup>
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
                        <col width="7%">
                        <col width="7%">
                    </colgroup>
                    <tr style="background-color: #efefef;">
                        <td><b>사업분야</b></td>
                        <td><b>1월</b></td>
                        <td><b>2월</b></td>
                        <td><b>3월</b></td>
                        <td><b>4월</b></td>
                        <td><b>5월</b></td>
                        <td><b>6월</b></td>
                        <td><b>7월</b></td>
                        <td><b>8월</b></td>
                        <td><b>9월</b></td>
                        <td><b>10월</b></td>
                        <td><b>11월</b></td>
                        <td><b>12월</b></td>
                        <td><b>지급총액</b></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td style="text-align: center;">R&D</td>
                        <td style="text-align: right;"><span id="R1">0</span></td>
                        <td style="text-align: right;"><span id="R2">0</span></td>
                        <td style="text-align: right;"><span id="R3">0</span></td>
                        <td style="text-align: right;"><span id="R4">0</span></td>
                        <td style="text-align: right;"><span id="R5">0</span></td>
                        <td style="text-align: right;"><span id="R6">0</span></td>
                        <td style="text-align: right;"><span id="R7">0</span></td>
                        <td style="text-align: right;"><span id="R8">0</span></td>
                        <td style="text-align: right;"><span id="R9">0</span></td>
                        <td style="text-align: right;"><span id="R10">0</span></td>
                        <td style="text-align: right;"><span id="R11">0</span></td>
                        <td style="text-align: right;"><span id="R12">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="RTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td style="text-align: center;">비R&D</td>
                        <td style="text-align: right;"><span id="S1">0</span></td>
                        <td style="text-align: right;"><span id="S2">0</span></td>
                        <td style="text-align: right;"><span id="S3">0</span></td>
                        <td style="text-align: right;"><span id="S4">0</span></td>
                        <td style="text-align: right;"><span id="S5">0</span></td>
                        <td style="text-align: right;"><span id="S6">0</span></td>
                        <td style="text-align: right;"><span id="S7">0</span></td>
                        <td style="text-align: right;"><span id="S8">0</span></td>
                        <td style="text-align: right;"><span id="S9">0</span></td>
                        <td style="text-align: right;"><span id="S10">0</span></td>
                        <td style="text-align: right;"><span id="S11">0</span></td>
                        <td style="text-align: right;"><span id="S12">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="STotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td style="text-align: center;">엔지니어링</td>
                        <td style="text-align: right;"><span id="D1">0</span></td>
                        <td style="text-align: right;"><span id="D2">0</span></td>
                        <td style="text-align: right;"><span id="D3">0</span></td>
                        <td style="text-align: right;"><span id="D4">0</span></td>
                        <td style="text-align: right;"><span id="D5">0</span></td>
                        <td style="text-align: right;"><span id="D6">0</span></td>
                        <td style="text-align: right;"><span id="D7">0</span></td>
                        <td style="text-align: right;"><span id="D8">0</span></td>
                        <td style="text-align: right;"><span id="D9">0</span></td>
                        <td style="text-align: right;"><span id="D10">0</span></td>
                        <td style="text-align: right;"><span id="D11">0</span></td>
                        <td style="text-align: right;"><span id="D12">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="DTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td style="text-align: center;">용역/기타</td>
                        <td style="text-align: right;"><span id="V1">0</span></td>
                        <td style="text-align: right;"><span id="V2">0</span></td>
                        <td style="text-align: right;"><span id="V3">0</span></td>
                        <td style="text-align: right;"><span id="V4">0</span></td>
                        <td style="text-align: right;"><span id="V5">0</span></td>
                        <td style="text-align: right;"><span id="V6">0</span></td>
                        <td style="text-align: right;"><span id="V7">0</span></td>
                        <td style="text-align: right;"><span id="V8">0</span></td>
                        <td style="text-align: right;"><span id="V9">0</span></td>
                        <td style="text-align: right;"><span id="V10">0</span></td>
                        <td style="text-align: right;"><span id="V11">0</span></td>
                        <td style="text-align: right;"><span id="V12">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="VTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td style="text-align: center;">사업비 계</td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum1">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum2">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum3">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum4">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum5">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum6">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum7">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum8">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum9">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum10">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum11">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pSum12">0</span></td>
                        <td style="text-align: right; font-weight: bold;"><span id="pTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #fff4f4;">
                        <td style="text-align: center;">법인운영</td>
                        <td style="text-align: right;"><span id="c1">0</span></td>
                        <td style="text-align: right;"><span id="c2">0</span></td>
                        <td style="text-align: right;"><span id="c3">0</span></td>
                        <td style="text-align: right;"><span id="c4">0</span></td>
                        <td style="text-align: right;"><span id="c5">0</span></td>
                        <td style="text-align: right;"><span id="c6">0</span></td>
                        <td style="text-align: right;"><span id="c7">0</span></td>
                        <td style="text-align: right;"><span id="c8">0</span></td>
                        <td style="text-align: right;"><span id="c9">0</span></td>
                        <td style="text-align: right;"><span id="c10">0</span></td>
                        <td style="text-align: right;"><span id="c11">0</span></td>
                        <td style="text-align: right;"><span id="c12">0</span></td>
                        <td style="text-align: right;"><span id="cTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #efefef;">
                        <td style="text-align: center;">급여총액</td>
                        <td style="text-align: right;"><span id="e1">0</span></td>
                        <td style="text-align: right;"><span id="e2">0</span></td>
                        <td style="text-align: right;"><span id="e3">0</span></td>
                        <td style="text-align: right;"><span id="e4">0</span></td>
                        <td style="text-align: right;"><span id="e5">0</span></td>
                        <td style="text-align: right;"><span id="e6">0</span></td>
                        <td style="text-align: right;"><span id="e7">0</span></td>
                        <td style="text-align: right;"><span id="e8">0</span></td>
                        <td style="text-align: right;"><span id="e9">0</span></td>
                        <td style="text-align: right;"><span id="e10">0</span></td>
                        <td style="text-align: right;"><span id="e11">0</span></td>
                        <td style="text-align: right;"><span id="e12">0</span></td>
                        <td style="text-align: right;"><span id="eTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f0fff5">
                        <td style="text-align: center;">사대보험</td>
                        <td style="text-align: right;"><span id="i1">0</span></td>
                        <td style="text-align: right;"><span id="i2">0</span></td>
                        <td style="text-align: right;"><span id="i3">0</span></td>
                        <td style="text-align: right;"><span id="i4">0</span></td>
                        <td style="text-align: right;"><span id="i5">0</span></td>
                        <td style="text-align: right;"><span id="i6">0</span></td>
                        <td style="text-align: right;"><span id="i7">0</span></td>
                        <td style="text-align: right;"><span id="i8">0</span></td>
                        <td style="text-align: right;"><span id="i9">0</span></td>
                        <td style="text-align: right;"><span id="i10">0</span></td>
                        <td style="text-align: right;"><span id="i11">0</span></td>
                        <td style="text-align: right;"><span id="i12">0</span></td>
                        <td style="text-align: right;"><span id="iTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f0fff5">
                        <td style="text-align: center;">퇴직연금</td>
                        <td style="text-align: right;"><span id="rt1">0</span></td>
                        <td style="text-align: right;"><span id="rt2">0</span></td>
                        <td style="text-align: right;"><span id="rt3">0</span></td>
                        <td style="text-align: right;"><span id="rt4">0</span></td>
                        <td style="text-align: right;"><span id="rt5">0</span></td>
                        <td style="text-align: right;"><span id="rt6">0</span></td>
                        <td style="text-align: right;"><span id="rt7">0</span></td>
                        <td style="text-align: right;"><span id="rt8">0</span></td>
                        <td style="text-align: right;"><span id="rt9">0</span></td>
                        <td style="text-align: right;"><span id="rt10">0</span></td>
                        <td style="text-align: right;"><span id="rt11">0</span></td>
                        <td style="text-align: right;"><span id="rt12">0</span></td>
                        <td style="text-align: right;"><span id="rtTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #f2ffff;">
                        <td style="text-align: center;">인건비 총액</td>
                        <td style="text-align: right;"><span id="t1">0</span></td>
                        <td style="text-align: right;"><span id="t2">0</span></td>
                        <td style="text-align: right;"><span id="t3">0</span></td>
                        <td style="text-align: right;"><span id="t4">0</span></td>
                        <td style="text-align: right;"><span id="t5">0</span></td>
                        <td style="text-align: right;"><span id="t6">0</span></td>
                        <td style="text-align: right;"><span id="t7">0</span></td>
                        <td style="text-align: right;"><span id="t8">0</span></td>
                        <td style="text-align: right;"><span id="t9">0</span></td>
                        <td style="text-align: right;"><span id="t10">0</span></td>
                        <td style="text-align: right;"><span id="t11">0</span></td>
                        <td style="text-align: right;"><span id="t12">0</span></td>
                        <td style="text-align: right;"><span id="tTotal">0</span></td>
                    </tr>
                    <tr style="background-color: #fff4f4;">
                        <td style="text-align: center; padding: 0">법인부담비율</td>
                        <td style="text-align: right;"><span id="p1" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p2" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p3" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p4" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p5" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p6" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p7" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p8" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p9" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p10" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p11" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="p12" class="percentage">0</span></td>
                        <td style="text-align: right;"><span id="peTotal" class="percentage">0</span></td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">

    laborList.fn_defaultScript();
</script>