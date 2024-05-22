<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/project.js?v=${today}'/>"></script>


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
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">재무성과 (팀별)</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 재무성과 (팀별)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <button type="button" class="k-button k-button-solid-base" id="displayBtn" onclick="fn_statTableShowHide();" style="margin-bottom: 5px">통계 ▲</button>
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
                            <td style="text-align: center;"><b>개발일반</b></td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center; background-color: #abe3b1;" rowspan="3"><b>달성사업화지수</b></td>
                            <td colspan="4" style="text-align: center; background-color: #abe3b1;" rowspan="2"><b>1~4월 운영비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>연구개발</b></td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>양산판매</b></td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>1월~4월 운영비</b></td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>인건비</b></td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>자체경비</b></td>
                            <td style="text-align: center; background-color: #abe3b1;"><b>공통경비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; background-color: #abe3b1;"><b>달성실적</b></td>
                            <td style="text-align: right; background-color: #abe3b1;"><b>0</b></td>
                            <td style="text-align: right; background-color: #abe3b1;"><b>0</b></td>
                            <td style="text-align: right; background-color: #abe3b1;"><b>0</b></td>
                            <td style="text-align: center;"><b>28.6</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>개발일반예상</b></td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center; background-color: #eaed77;" rowspan="3"><b>예상사업화지수</b></td>
                            <td colspan="4" style="text-align: center; background-color: #eaed77;" rowspan="2"><b>2024년 예상 운영비_물량취합기준</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>연구개발예상</b></td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>양산판매예상</b></td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center; background-color: #eaed77;"><b>예상운영비</b></td>
                            <td style="text-align: center; background-color: #eaed77;"><b>인건비</b></td>
                            <td style="text-align: center; background-color: #eaed77;"><b>자체경비</b></td>
                            <td style="text-align: center; background-color: #eaed77;"><b>공통경비</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center; background-color: #eaed77;"><b>TOTAL</b></td>
                            <td style="text-align: right; background-color: #eaed77;"><b>0</b></td>
                            <td style="text-align: right; background-color: #eaed77;"><b>0</b></td>
                            <td style="text-align: right; background-color: #eaed77;"><b>0</b></td>
                            <td style="text-align: center;"><b>34.9</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>달성율</b></td>
                            <td style="text-align: center;"><b>0%</b></td>
                            <td style="text-align: center;"><b>0%</b></td>
                            <td style="text-align: center;"><b>0%</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;"><b>예상달성율</b></td>
                            <td style="text-align: center;"><b>0%</b></td>
                            <td style="text-align: center;"><b>0%</b></td>
                            <td style="text-align: center;"><b>0%</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center;" rowspan="2"><b>목표대비현황<br>(최종예상)</b></td>
                            <td style="text-align: center;"><b>수주목표</b></td>
                            <td style="text-align: center;"><b>매출목표</b></td>
                            <td style="text-align: center;"><b>수익목표</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                            <td style="text-align: right;"><b>0</b></td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    $(function(){
        var rs = customKendo.fn_customAjax("/cam_achieve/getAllPjtCalc");


        console.log(rs);
    });




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
