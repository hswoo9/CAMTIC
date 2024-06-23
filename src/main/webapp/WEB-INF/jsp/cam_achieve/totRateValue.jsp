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
                    <input type="text" id="year" style="width: 130px;" />
                </span>
                <span style="bottom: 3px; position: relative;">
                    <input type="text" id="dept" style="width: 250px;" />
                </span>
                <button type="button" class="k-button k-button-solid-base" id="searchBtn" onclick="fn_searchData();" style="margin-bottom: 5px; float: right">조회</button>

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
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;" rowspan="2"><b>R&BD 사업본부</b></td>
                            <td style="text-align: center;">복합소재뿌리기술센터</td>
                            <td style="text-align: right;" id="tEmp_1209" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1209" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1209" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1209" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1209" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">R&D상용화센터</td>
                            <td style="text-align: right;" id="tEmp_1230" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1230" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1230" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1230" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1230" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">R&BD사업본부 소계</td>
                            <td style="text-align: right;" id="dEmp_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dTotPay_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1206" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1206" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;" rowspan="2"><b>기업성장지원본부</b></td>
                            <td style="text-align: center;">창업/기업성장지원팀</td>
                            <td style="text-align: right;" id="tEmp_1211" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1211" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1211" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1211" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1211" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">인재개발팀</td>
                            <td style="text-align: right;" id="tEmp_1212" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1212" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1212" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1212" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1212" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">기업성장지원본부 소계</td>
                            <td style="text-align: right;" id="dEmp_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dTotPay_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1210" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1210" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;" rowspan="2"><b>기업성장지원본부</b></td>
                            <td style="text-align: center;">우주개발팀</td>
                            <td style="text-align: right;" id="tEmp_1215" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1215" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1215" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1215" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1215" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">항공개발팀</td>
                            <td style="text-align: right;" id="tEmp_1216" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1216" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1216" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1216" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1216" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">우주항공사업부 소계</td>
                            <td style="text-align: right;" id="dEmp_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dTotPay_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1214" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1214" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;" rowspan="2"><b>드론사업부</b></td>
                            <td style="text-align: center;">드론산업육성팀</td>
                            <td style="text-align: right;" id="tEmp_1225" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1225" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1225" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1225" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1225" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">상용화기술팀</td>
                            <td style="text-align: right;" id="tEmp_1226" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1226" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1226" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1226" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1226" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">드론사업부 소계</td>
                            <td style="text-align: right;" id="dEmp_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dTotPay_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1217" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1217" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;" rowspan="3"><b>미래전략기획본부</b></td>
                            <td style="text-align: center;">미래전략기획팀</td>
                            <td style="text-align: right;" id="tEmp_1204" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1204" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1204" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1204" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1204" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">J-밸리혁신팀</td>
                            <td style="text-align: right;" id="tEmp_1205" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1205" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1205" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1205" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1205" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">일자리사업기획팀</td>
                            <td style="text-align: right;" id="tEmp_1233" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1233" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1233" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1233" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1233" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">미래전략기획본부 소계</td>
                            <td style="text-align: right;" id="dEmp_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dPubRate_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dTotPay_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dInsPay_1203" name="dept">0</td>
                            <td style="text-align: right;" id="dRetirePay_1203" name="dept">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">사업인력 합계</td>
                            <td style="text-align: right;" id="emp_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="pubRate_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="totPay_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="insPay_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="retirePay_all" name="busnAll">0</td>
                            <td style="text-align: right;" id="payTotal_all">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>

                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" rowspan="3">공통비용</td>
                            <td style="text-align: center;">인사총무팀</td>
                            <td style="text-align: right;" id="tEmp_1227" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1227" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1227" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1227" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1227" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">재무회계팀</td>
                            <td style="text-align: right;" id="tEmp_1228" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1228" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1228" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1228" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1228" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;">사업관리팀</td>
                            <td style="text-align: right;" id="tEmp_1229" name="team">0</td>
                            <td style="text-align: right;" id="tPubRate_1229" name="team">0</td>
                            <td style="text-align: right;" id="tTotPay_1229" name="team">0</td>
                            <td style="text-align: right;" id="tInsPay_1229" name="team">0</td>
                            <td style="text-align: right;" id="tRetirePay_1229" name="team">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">경영지원실 소계</td>
                            <td style="text-align: right;" id="dEmp_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dPubRate_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dTotPay_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dInsPay_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dRetirePay_1219" name="dept2">0</td>
                            <td style="text-align: right;" id="dPayTotal_1219">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; font-weight: bold" colspan="2">사업인력 + 지원인력 총 계</td>
                            <td style="text-align: right;" id="emp" name="all">0</td>
                            <td style="text-align: right;" id="pubRate" name="all">0</td>
                            <td style="text-align: right;" id="totPay" name="all">0</td>
                            <td style="text-align: right;" id="insPay" name="all">0</td>
                            <td style="text-align: right;" id="retirePay" name="all">0</td>
                            <td style="text-align: right;" id="payTotal">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
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
