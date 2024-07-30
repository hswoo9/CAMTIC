<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budget/budgetPreCondition.js?v=${today}'/>"></script>
<style>
    a:hover {
        color: blue;
        text-decoration: underline !important;
        cursor: pointer;
    }

    .table > tbody + tbody {
        border-top: none !important;
    }
</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">예산총괄현황</h4>
            <div class="title-road">캠매니저 > 예산관리 &gt; 예산현황 > 예산총괄현황</div>
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
                        <col width="10%">
                        <col width="25%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td>
                            <input type="text" id="baseYear" style="width: 50%;">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="panel-body">
            <h5> ◎ 세입세출총괄</h5>
            <div>
                <table class="totalTable table table-bordered" style="margin-bottom: 0px; text-align: center">
                    <thead>
                    <colgroup>
                        <col width="22%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                    </colgroup>
                    <tr style="color : white ; background-color: #698bb4;">
                        <td rowspan="2"><b>사업구분</b></td>
                        <td colspan="3"><b>세입</b></td>
                        <td colspan="3"><b>세출</b></td>
                    </tr>
                    <tr style="color : black ; background-color: #f0f6ff;">
                        <td style="text-align: center;"><b>예산</b></td>
                        <td style="text-align: center;"><b>결산</b></td>
                        <td style="text-align: center;"><b>잔액</b></td>
                        <td style="text-align: center;"><b>예산</b></td>
                        <td style="text-align: center;"><b>결산</b></td>
                        <td style="text-align: center;"><b>잔액</b></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; background-color: #FFFFFF"><b>R&D</b></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="RA1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="RA2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="RA3">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="RB1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="RB2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="RB3">0</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; background-color: #FFFFFF"><b>비R&D</b></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="SA1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="SA2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="SA3">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="SB1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="SB2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="SB3">0</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; background-color: #FFFFFF"><b>법인운영</b></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="MA1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="MA2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="MA3">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="MB1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="MB2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="MB3">0</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; background-color: #FFFFFF"><b>엔지니어링</b></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="DA1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="DA2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="DA3">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="DB1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="DB2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="DB3">0</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; background-color: #FFFFFF"><b>용역/기타</b></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="VA1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="VA2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="VA3">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="VB1">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="VB2">0</span></td>
                        <td style="text-align: right; background-color: #FFFFFF"><span id="VB3">0</span></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; background-color: #f0f6ff"><b>합계</b></td>
                        <td style="text-align: right; background-color: #f0f6ff"><b><span id="sumA1">0</span></b></td>
                        <td style="text-align: right; background-color: #f0f6ff"><b><span id="sumA2">0</span></b></td>
                        <td style="text-align: right; background-color: #f0f6ff"><b><span id="sumA3">0</span></b></td>
                        <td style="text-align: right; background-color: #f0f6ff"><b><span id="sumB1">0</span></b></td>
                        <td style="text-align: right; background-color: #f0f6ff"><b><span id="sumB2">0</span></b></td>
                        <td style="text-align: right; background-color: #f0f6ff"><b><span id="sumB3">0</span></b></td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="panel-body">
            <h5> ◎ 예산세부내역</h5>
            <div>
                <table class="totalTable table table-bordered" style="margin-bottom: 0px; text-align: center">
                    <thead>
                    <colgroup>
                        <col width="11%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                        <col width="9%">
                    </colgroup>
                    <tr style="color : white ; background-color: #698bb4;">
                        <td rowspan="2"><b>사업구분</b></td>
                        <td colspan="5"><b>세입예산</b></td>
                        <td colspan="5"><b>세출예산</b></td>
                    </tr>
                    <tr style="color : black ; background-color: #f0f6ff;">
                        <td style="text-align: center;"><b>장</b></td>
                        <td style="text-align: center;"><b>관</b></td>
                        <td style="text-align: center;"><b>항</b></td>
                        <td style="text-align: center;"><b>예산액</b></td>
                        <td style="text-align: center;"><b>결산액</b></td>
                        <td style="text-align: center;"><b>장</b></td>
                        <td style="text-align: center;"><b>관</b></td>
                        <td style="text-align: center;"><b>항</b></td>
                        <td style="text-align: center;"><b>예산액</b></td>
                        <td style="text-align: center;"><b>결산액</b></td>
                    </tr>
                    <tbody id="rBody">

                    </tbody>
                    <tbody id="sBody">

                    </tbody>
                    <tbody id="mBody">

                    </tbody>
                    <tbody id="dBody">

                    </tbody>
                    <tbody id="vBody">

                    </tbody>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    bdgPreCon.fn_defaultScript();

</script>
