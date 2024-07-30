<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="/js/intra/cam_achieve/totRateValue.js?v=${today}"/></script>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">총괄표</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 재무성과 &gt; 총괄표</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <span style="bottom: 3px; position: relative;">
                    <input type="text" id="year" style="width: 10%;" />
                </span>
<%--                <span style="bottom: 3px; position: relative;">--%>
<%--                    <input type="text" id="dept" style="width: 250px;" />--%>
<%--                </span>--%>
                <div style="float: right;">
<%--                    <button type="button" class="k-button k-button-solid-base" onclick="trv.fn_saveData();" style="margin-bottom: 5px;">월 마감</button>--%>
<%--                    <button type="button" class="k-button k-button-solid-base" onclick="trv.fn_updStatus();" style="margin-bottom: 5px;">마감취소</button>--%>
                    <button type="button" class="k-button k-button-solid-base" id="searchBtn" onclick="trv.fn_searchData();" style="margin-bottom: 5px;">조회</button>
                </div>

                <div id="statTable" style="" view="Y">
                    <table class="totalTable table table-bordered" style="margin-bottom: 0px">
                        <thead>
                        <colgroup>
                            <col width="13%">
                            <col width="10%">

                            <col width="5%">
                            <col width="5%">

                            <col width="5%">
                            <col width="5%">
                            <col width="5%">
                            <col width="5%">

                            <col width="5%">
                            <col width="5%">
                            <col width="5%">

                            <col width="10%">
                            <col width="10%">
                        </colgroup>
                        <tr style="color : white ; background-color: #698bb4;">
                            <td colspan="13" style="text-align: center;"><b>부서 운영비용 배분</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center;" rowspan="2"><b>구분</b></td>
                            <td style="text-align: center;" rowspan="2"><b>팀명</b></td>
                            <td style="text-align: center;" rowspan="2"><b>전담인력</b></td>
                            <td style="text-align: center;" rowspan="2"><b>공통비<br>배분율</b></td>
                            <td colspan="4" style="text-align: center;"><b>인건비</b></td>
                            <td colspan="3" style="text-align: center;"><b>자체경비</b></td>
                            <td style="text-align: center;" rowspan="2"><b>공통경비</b></td>
                            <td style="text-align: center;" rowspan="2"><b>비용합계</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>인건비</b></td>
                            <td style="text-align: center;"><b>사대보험</b></td>
                            <td style="text-align: center;"><b>퇴직연금</b></td>
                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: center;"><b>직접비</b></td>
                            <td style="text-align: center;"><b>4번</b></td>
                            <td style="text-align: center;"><b>합계</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1206" name="1209">
                            <td style="text-align: center; background-color: #f0fde9;" rowspan="2"><b>R&BD 사업본부</b></td>
                            <td style="text-align: center;">복합소재뿌리기술센터</td>
                            <td style="text-align: right;" id="tEmp_1209" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1209" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1209" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1209" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1209" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1209" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1209" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1209" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1209" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1206" name="1230">
                            <td style="text-align: center;">R&D상용화센터</td>
                            <td style="text-align: right;" id="tEmp_1230" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1230" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1230" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1230" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1230" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1230" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1230" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1230" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1230" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #fff8df;">
                            <td style="text-align: center; font-weight: bold" colspan="2">R&BD사업본부 소계</td>
                            <td style="text-align: right;" id="dEmp_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1206" name="dept">-</td>
                            <td style="text-align: right;" id="dTotPay_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1206" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dExnpPay_1206" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dCommPay_1206" class="dCommPay" name="dept">0</td>
                            <td style="text-align: right;" id="dTotalPay_1206" class="dTotalPay" name="dept">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1210" name="1211">
                            <td style="text-align: center; background-color: #f0fde9;" rowspan="2"><b>기업성장지원본부</b></td>
                            <td style="text-align: center;">창업/기업성장지원팀</td>
                            <td style="text-align: right;" id="tEmp_1211" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1211" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1211" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1211" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1211" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1211" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1211" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1211" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1211" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1210" name="1212">
                            <td style="text-align: center;">인재개발팀</td>
                            <td style="text-align: right;" id="tEmp_1212" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1212" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1212" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1212" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1212" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1212" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1212" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1212" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1212" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #fff8df;">
                            <td style="text-align: center; font-weight: bold" colspan="2">기업성장지원본부 소계</td>
                            <td style="text-align: right;" id="dEmp_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1210" name="dept">-</td>
                            <td style="text-align: right;" id="dTotPay_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1210" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dExnpPay_1210" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dCommPay_1210" class="dCommPay" name="dept">0</td>
                            <td style="text-align: right;" id="dTotalPay_1210" class="dTotalPay" name="dept">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1214" name="1215">
                            <td style="text-align: center; background-color: #f0fde9;" rowspan="2"><b>우주항공사업부</b></td>
                            <td style="text-align: center;">우주개발팀</td>
                            <td style="text-align: right;" id="tEmp_1215" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1215" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1215" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1215" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1215" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1215" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1215" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1215" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1215" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1214" name="1216">
                            <td style="text-align: center;">항공개발팀</td>
                            <td style="text-align: right;" id="tEmp_1216" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1216" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1216" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1216" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1216" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1216" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1216" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1216" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1216" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #fff8df;">
                            <td style="text-align: center; font-weight: bold" colspan="2">우주항공사업부 소계</td>
                            <td style="text-align: right;" id="dEmp_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1214" name="dept">-</td>
                            <td style="text-align: right;" id="dTotPay_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1214" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dExnpPay_1214" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dCommPay_1214" class="dCommPay" name="dept">0</td>
                            <td style="text-align: right;" id="dTotalPay_1214" class="dTotalPay" name="dept">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1217" name="1225">
                            <td style="text-align: center; background-color: #f0fde9;" rowspan="2"><b>드론사업부</b></td>
                            <td style="text-align: center;">드론산업육성팀</td>
                            <td style="text-align: right;" id="tEmp_1225" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1225" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1225" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1225" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1225" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1225" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1235" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1235" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1235" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1217" name="1226">
                            <td style="text-align: center;">상용화기술팀</td>
                            <td style="text-align: right;" id="tEmp_1226" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1226" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1226" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1226" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1226" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1226" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1226" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1226" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1226" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #fff8df;">
                            <td style="text-align: center; font-weight: bold" colspan="2">드론사업부 소계</td>
                            <td style="text-align: right;" id="dEmp_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1217" name="dept">-</td>
                            <td style="text-align: right;" id="dTotPay_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1217" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dExnpPay_1217" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dCommPay_1217" class="dCommPay" name="dept">0</td>
                            <td style="text-align: right;" id="dTotalPay_1217" class="dTotalPay" name="dept">0</td>
                        </tr>
                        <tr style="color : black; background-color: #ffffff;" class="rateTr dept_1203" name="1204">
                            <td style="text-align: center; background-color: #f0fde9;" rowspan="3"><b>미래전략기획본부</b></td>
                            <td style="text-align: center;">미래전략기획팀</td>
                            <td style="text-align: right;" id="tEmp_1204" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1204" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1204" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1204" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1204" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1204" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1204" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;" id="tTotalPay_1204" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1203" name="1205">
                            <td style="text-align: center;">J-밸리혁신팀</td>
                            <td style="text-align: right;" id="tEmp_1205" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1205" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1205" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1205" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1205" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1205" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1205" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;" id="tTotalPay_1205" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr dept_1203" name="1233">
                            <td style="text-align: center;">일자리사업기획팀</td>
                            <td style="text-align: right;" id="tEmp_1233" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1233" class="tPubRate" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1233" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1233" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1233" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;" id="tPayTotal_1233" class="tPayTotal" name="team">0</td>
                            <td style="text-align: right;" id="tExnpPay_1233" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tCommPay_1233" class="tCommPay" name="team">0</td>
                            <td style="text-align: right;" id="tTotalPay_1233" class="tTotalPay" name="team">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #fff8df;">
                            <td style="text-align: center; font-weight: bold" colspan="2">미래전략기획본부 소계</td>
                            <td style="text-align: right;" id="dEmp_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1203" name="dept">-</td>
                            <td style="text-align: right;" id="dTotPay_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1203" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dExnpPay_1203" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="dCommPay_1203" class="dCommPay" name="dept">0</td>
                            <td style="text-align: right;" id="dTotalPay_1203" class="dTotalPay" name="dept">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">사업인력 합계</td>
                            <td style="text-align: right;" id="emp_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="pubRate_all" name="busnAll">100</td>
                            <td style="text-align: right;" id="totPay_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="insPay_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="retirePay_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="payTotal_all">0</td>
                            <td style="text-align: right;" id="exnpPay_all" name="busnAll">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="commPay_all" name="bunsAll">0</td>
                            <td style="text-align: right;" id="totalPay_all" name="busnAll">0</td>
                        </tr>

                        <tr style="color : black ; background-color: #ffffff;" class="rateTr" name="1227">
                            <td style="text-align: center; font-weight: bold; background-color: #f0fde9;" rowspan="4">공통비용</td>
                            <td style="text-align: center;">인사총무팀</td>
                            <td style="text-align: right;" id="tEmp_1227" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1227" name="team">-</td>
                            <td style="text-align: right;" id="tTotPay_1227" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1227" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1227" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tExnpPay_1227" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr" name="1228">
                            <td style="text-align: center;">재무회계팀</td>
                            <td style="text-align: right;" id="tEmp_1228" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1228" name="team">-</td>
                            <td style="text-align: right;" id="tTotPay_1228" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1228" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1228" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tExnpPay_1228" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr" name="1229">
                            <td style="text-align: center;">사업관리팀</td>
                            <td style="text-align: right;" id="tEmp_1229" class="tEmp" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1229" name="team">-</td>
                            <td style="text-align: right;" id="tTotPay_1229" class="tTotPay" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1229" class="tInsPay" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1229" class="tRetirePay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="tExnpPay_1229" class="tExnpPay" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;" class="rateTr" name="99999">
                            <td style="text-align: center;">공통운영비</td>
                            <td style="text-align: right;" id="cEmp" class="tEmp" name="common">0</td>
                            <td style="text-align: right;" id="cPubRate" class="tPubRate" name="common">0</td>
                            <td style="text-align: right;" id="cTotPay" class="tTotPay" name="common">0</td>
                            <td style="text-align: right;" id="cInsPay" class="tInsPay" name="common">0</td>
                            <td style="text-align: right;" id="cRetirePay" class="tRetirePay" name="common">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="cExnpPay" class="tExnpPay" name="common">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #fff8df;">
                            <td style="text-align: center; font-weight: bold" colspan="2">경영지원실 소계</td>
                            <td style="text-align: right;" id="dEmp_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dPubRate_1219" name="dept2">-</td>
                            <td style="text-align: right;" id="dTotPay_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dInsPay_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dRetirePay_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dPayTotal_1219">0</td>
                            <td style="text-align: right;" id="dExnpPay_1219" name="dept2">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">-</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">사업인력 + 지원인력 총계</td>
                            <td style="text-align: right;" id="emp" name="all">0</td>
                            <td style="text-align: right;" id="pubRate" name="all">0</td>
                            <td style="text-align: right;" id="totPay" name="all">0</td>
                            <td style="text-align: right;" id="insPay" name="all">0</td>
                            <td style="text-align: right;" id="retirePay" name="all">0</td>
                            <td style="text-align: right;" id="payTotal">0</td>
                            <td style="text-align: right;" id="exnpPay" name="all">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;" id="commPay" name="all">0</td>
                            <td style="text-align: right;" id="totalPay" name="all">0</td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    trv.fn_defaultScript();


</script>
