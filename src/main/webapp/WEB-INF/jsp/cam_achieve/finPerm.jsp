<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/finPerm.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/costCalc.js?v=${today}'/>"></script>


<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>
    @import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");

    :root {
        --line-border-fill: #3498db;
        --line-border-empty: #e0e0e0;
    }

    * {
        box-sizing: border-box;
    }

    .totalTable td {
        height: 38.14px;
    }

    #tooltip span {
        cursor: pointer;
        display: block;
        margin-top : 12px;
        width: 20px;
        height: 20px;
        background-image: url("../images/ico/ico_alert.png");
        background-size: 20px;
        -moz-border-radius: 30px;
        -webkit-border-radius: 30px;
        border: none;
        -moz-box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
        /*-webkit-box-shadow: 0 0 0 1px rgba(0,0,0,0.5);*/
        /*box-shadow: 0 0 0 1px rgba(0,0,0,0.5);*/
        -moz-transition:  -moz-box-shadow .3s;
        -webkit-transition:  -webkit-box-shadow .3s;
        transition:  box-shadow .3s;
    }

    #tooltip span:hover {
        -moz-box-shadow: 0 0 0 15px rgba(0,0,0,0.5);
        -webkit-box-shadow: 0 0 0 15px rgba(0,0,0,0.5);
        box-shadow: 0 0 0 15px rgba(0,0,0,0.5);
        -moz-transition:  -moz-box-shadow .3s;
        -webkit-transition:  -webkit-box-shadow .3s;
        transition:  box-shadow .3s;
    }

    .hoverSpan:hover {
        text-decoration: underline;
    }

    #projectTooltip:hover

    .hide {
        display: none;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6),
    .k-footer-template td:nth-child(7),
    .k-footer-template td:nth-child(8) {
        border-width: 0;
        text-align: right;
    }

    .k-footer-template td:nth-child(11),
    .k-footer-template td:nth-child(12) {
        border-width: 0;
    }

    .k-footer-template td:nth-child(9){
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-grid-content {
        min-height: 400px;
        max-height: 400px;
    }

    .k-grid-norecords{
        line-height: 400px;
    }

    #my-spinner { width: 100%; height: 100vh; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }

</style>

<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">팀 재무성과</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 재무성과 &gt; 팀재무성과</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <button type="button" class="k-button k-button-solid-base" id="displayBtn" onclick="fn_statTableShowHide();" style="margin-bottom: 5px">통계 ▲</button>
                <span style="bottom: 3px; position: relative;">
                    <input type="text" id="year" style="width: 10%;" />
                </span>
                <span style="bottom: 3px; position: relative;">
                    <input type="text" id="dept" style="width: 250px;" />
                </span>
                <div style="float: right;">
                    <button type="button" class="k-button k-button-solid-base" onclick="finPerm.fn_objSetting('team');" style="margin-bottom: 5px;">팀 목표설정</button>
                    <button type="button" class="k-button k-button-solid-base" onclick="finPerm.fn_objSetting('oper');" style="margin-bottom: 5px;">운영 목표설정</button>
                    <button type="button" class="k-button k-button-solid-base" id="searchBtn" onclick="finPerm.fn_searchData();" style="margin-bottom: 5px;">조회</button>
                </div>

                <div id="statTable" style="" view="Y">
                    <table class="totalTable table table-bordered" style="margin-bottom: 0px">
                        <thead>
                        <colgroup>
                            <col width="11%">
                            <col width="11%">
                            <col width="11%">

                            <col width="11%">
                            <col width="12%">
                            <col width="11%">

                            <col width="11%">
                            <col width="11%">
                            <col width="11%">
                        </colgroup>
                        <tr style="color : white ; background-color: #698bb4;">
                            <td colspan="9" style="text-align: center;"><b>재무실적 현황</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center;"><b>구분</b></td>
                            <td style="text-align: center;"><b>수주</b></td>
                            <td style="text-align: center;"><b>매출</b></td>
                            <td style="text-align: center;"><b>운영수익</b></td>
                            <td style="text-align: center;"><b>사업화지수</b></td>
                            <td colspan="5" style="text-align: center;"><b>운영비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('R');">R&D</b></td>
                            <td style="text-align: right;" id="rndDelvAmt">0</td>
                            <td style="text-align: right;" id="rndSaleAmt">0</td>
                            <td style="text-align: right;" id="rndIncpAmt">0</td>
                            <td style="text-align: center; background-color: #abe3b1;" rowspan="4"><b>달성사업화지수</b></td>
                            <td colspan="4" style="text-align: center; background-color: #abe3b1;" rowspan="3"><b>운영비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('S');">비R&D</b></td>
                            <td style="text-align: right;" id="unRndDelvAmt">0</td>
                            <td style="text-align: right;" id="unRndSaleAmt">0</td>
                            <td style="text-align: right;" id="unRndIncpAmt">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('D');">엔지니어링</b></td>
                            <td style="text-align: right;" id="engnDelvAmt">0</td>
                            <td style="text-align: right;" id="engnSaleAmt">0</td>
                            <td style="text-align: right;" id="engnIncpAmt">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('V');">용역/기타</b></td>
                            <td style="text-align: right;" id="otherDelvAmt">0</td>
                            <td style="text-align: right;" id="otherSaleAmt">0</td>
                            <td style="text-align: right;" id="otherIncpAmt">0</td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>운영비</b></td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>인건비</b></td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>자체경비</b></td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>공통경비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; background-color: #abe3b1;"><b>달성소계</b></td>
                            <td style="text-align: right; background-color: #abe3b1;"><b id="delvTotAmt">0</b></td>
                            <td style="text-align: right; background-color: #abe3b1;"><b id="saleTotAmt">0</b></td>
                            <td style="text-align: right; background-color: #abe3b1;"><b id="incpTotAmt">0</b></td>
                            <td style="text-align: center;"><b id="operPer">0</b></td>
                            <td style="text-align: right;"><b id="operTotAmt">0</b></td>
                            <td style="text-align: right;"><b id="payTotAmt">0</b></td>
                            <td style="text-align: right;"><b id="exnpTotAmt">0</b></td>
                            <td style="text-align: right;"><b id="commTotAmt">0</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('R');">R&D예상</b></td>
                            <td style="text-align: right;" id="expRndAmt">0</td>
                            <td style="text-align: right;" id="expSaleRndAmt">0</td>
                            <td style="text-align: right;" id="expIncpRndAmt">0</td>
                            <td style="text-align: center; background-color: #eaed77;" rowspan="4"><b>예상사업화지수</b></td>
                            <td colspan="4" style="text-align: center; background-color: #eaed77;" rowspan="3"><b>2024년 예상 운영비_물량취합기준</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('S');">비R&D예상</b></td>
                            <td style="text-align: right;" id="expUnRndAmt">0</td>
                            <td style="text-align: right;" id="expSaleUnRndAmt">0</td>
                            <td style="text-align: right;" id="expIncpUnRndAmt">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('D');">엔지니어링예상</b></td>
                            <td style="text-align: right;" id="expEngnAmt">0</td>
                            <td style="text-align: right;" id="expSaleEngnAmt">0</td>
                            <td style="text-align: right;" id="expIncpEngnAmt">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b style="cursor: pointer" onclick="finPerm.fn_pjtSearch('V');">용역/기타예상</b></td>
                            <td style="text-align: right;" id="expOtherAmt">0</td>
                            <td style="text-align: right;" id="expSaleOtherAmt">0</td>
                            <td style="text-align: right;" id="expIncpOtherAmt">0</td>
                            <td style="text-align: center; background-color: #eaed77;"><b>예상운영비</b></td>
                            <td style="text-align: center; background-color: #eaed77;"><b>인건비</b></td>
                            <td style="text-align: center; background-color: #eaed77;"><b>자체경비</b></td>
                            <td style="text-align: center; background-color: #eaed77;"><b>공통경비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; background-color: #eaed77;"><b>예상소계</b></td>
                            <td style="text-align: right; background-color: #eaed77;"><b id="expTotAmt">0</b></td>
                            <td style="text-align: right; background-color: #eaed77;"><b id="expSaleTotAmt">0</b></td>
                            <td style="text-align: right; background-color: #eaed77;"><b id="expIncpTotAmt">0</b></td>
                            <td style="text-align: center;"><b id="expOperPer">0</b></td>
                            <td style="text-align: right;"><b id="expOperTotAmt">0</b></td>
                            <td style="text-align: right;"><b id="expPayTotAmt">0</b></td>
                            <td style="text-align: right;"><b id="expExnpTotAmt">0</b></td>
                            <td style="text-align: right;"><b id="expCommTotAmt">0</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; background-color: #efb098;"><b>합계</b></td>
                            <td style="text-align: right; background-color: #efb098;"><b id="totAmtSum">0</b></td>
                            <td style="text-align: right; background-color: #efb098;"><b id="saleTotAmtSum">0</b></td>
                            <td style="text-align: right; background-color: #efb098;"><b id="incpTotAmtSum">0</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>달성율</b></td>
                            <td style="text-align: center;"><b id="delvPer">0%</b></td>
                            <td style="text-align: center;"><b id="salePer">0%</b></td>
                            <td style="text-align: center;"><b id="incpPer">0%</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>예상달성율</b></td>
                            <td style="text-align: center;"><b id="expDelvPer">0%</b></td>
                            <td style="text-align: center;"><b id="expSalePer">0%</b></td>
                            <td style="text-align: center;"><b id="expIncpPer">0%</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center;" rowspan="2"><b>목표대비현황<br>(최종예상)</b></td>
                            <td style="text-align: center;"><b>수주목표</b></td>
                            <td style="text-align: center;"><b>매출목표</b></td>
                            <td style="text-align: center;"><b>수익목표</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: right;"><b id="objDelvAmt">0</b></td>
                            <td style="text-align: right;"><b id="objSaleAmt">0</b></td>
                            <td style="text-align: right;"><b id="objIncpAmt">0</b></td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div id="rndGrid"></div>
            <div id="unRndGrid"></div>
            <div id="engnGrid"></div>
            <div id="otherGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    finPerm.fn_DefaultScript();




    function fn_statTableShowHide(){
        if($("#statTable").attr("view") == "Y"){
            $("#statTable").attr("view", "N");
            $("#statTable").hide();
            $("#displayBtn").text("통계 ▼");
        } else {
            $("#statTable").attr("view", "Y");
            $("#statTable").show();
            $("#displayBtn").text("통계 ▲");
        }
    }
</script>
