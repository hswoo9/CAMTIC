<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/customerIndustryCondition.js?v=${today}'/>"></script>
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
            <h4 class="panel-title">분야별 고객현황</h4>
            <div class="title-road">캠CRM > 통계조회 &gt; 분야별 고객현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div id="depthCustomChart"></div>
            <div style="margin: 50px 0;">
                <div style="font-weight: bold">◎ 분야별 고객현황</div>
                <table class="totalTable table table-bordered" style="margin-bottom: 0px">
                    <thead>
                    <colgroup>
                        <col width="16%">
                        <col width="16%">
                        <col width="16%">
                        <col width="16%">
                        <col width="16%">
                        <col width="16%">
                    </colgroup>
                    <tr style="text-align: center;">
                        <th style="text-align: center;">분야명</th>
                        <th style="text-align: center;">건수</th>
                        <th style="text-align: center;">분야명</th>
                        <th style="text-align: center;">건수</th>
                        <th style="text-align: center;">분야명</th>
                        <th style="text-align: center;">건수</th>
                    </tr>
                    <tr>
                        <td style="text-align: center;">일반기계</td>
                        <td style="text-align: right; background-color: white" id="gmCnt">0</td>
                        <td style="text-align: center;">기타</td>
                        <td style="text-align: right; background-color: white" id="otherCnt">0</td>
                        <td style="text-align: center;">자동차</td>
                        <td style="text-align: right; background-color: white" id="carCnt">0</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">정보영상/인쇄전자/반도체</td>
                        <td style="text-align: right; background-color: white" id="vdCnt">0</td>
                        <td style="text-align: center;">식품/바이오</td>
                        <td style="text-align: right; background-color: white" id="fCnt">0</td>
                        <td style="text-align: center;">소재</td>
                        <td style="text-align: right; background-color: white" id="maCnt">0</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">우주/항공/방산</td>
                        <td style="text-align: right; background-color: white" id="unCnt">0</td>
                        <td style="text-align: center;">RFT/풍력/태양광</td>
                        <td style="text-align: right; background-color: white" id="rftCnt">0</td>
                        <td style="text-align: center;">LED</td>
                        <td style="text-align: right; background-color: white" id="ledCnt">0</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">미지정</td>
                        <td style="text-align: right; background-color: white" id="unRegCnt">0</td>
                        <td style="text-align: center;"></td>
                        <td style="text-align: right; background-color: white"></td>
                        <td style="text-align: center;"></td>
                        <td style="text-align: right; background-color: white"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    industryCondition.fn_defaultScript();
</script>
