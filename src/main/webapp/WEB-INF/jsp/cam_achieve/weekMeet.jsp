<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/weekMeet.js?v=${today}'/>"></script>
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
            <h4 class="panel-title">부서 재무성과</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 재무성과 &gt; 부서재무성과</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <button type="button" class="k-button k-button-solid-base" id="displayBtn" onclick="fn_statTableShowHide();" style="margin-bottom: 5px">통계 ▲</button>
                <span style="bottom: 3px; position: relative;">
                    <input type="text" id="year" style="width: 10%;" />
                </span>
                <button type="button" class="k-button k-button-solid-base" id="searchBtn" onclick="weekMeet.fn_dataReset();" style="margin-bottom: 5px; float: right">조회</button>
<%--                <button type="button" class="k-button k-button-solid-base" id="objSetting" onclick="weekMeet.fn_objSetting();" style="margin-bottom: 5px; margin-right:5px; float: right">목표설정</button>--%>

                <div id="statTable" style="width: 100%; overflow: auto; margin-top: 5px;" view="Y">
                    <table class="totalTable table table-bordered" style="margin-bottom: 0px; white-space:nowrap; width: auto">
                        <caption style="text-align: left;">(단위 : 백만원)</caption>
                        <thead>
                        <colgroup>
                            <col width="8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">

                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">

                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                            <col width="3.8%">
                        </colgroup>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center;" rowspan="2"><b>구분</b></td>
                            <td style="text-align: center;" colspan="7"><b>수주</b></td>
                            <td style="text-align: center;" colspan="7"><b>매출</b></td>
                            <td style="text-align: center;" colspan="10"><b>운영수익</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;background-color: #fffef2;"><b>목표</b></td>
                            <td style="text-align: center;background-color: #fff4f4;"><b>달성</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #f2ffff;"><b>예상</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #f0fff5;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #fffef2;"><b>목표</b></td>
                            <td style="text-align: center;background-color: #fff4f4;"><b>달성</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #f2ffff;"><b>예상</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #f0fff5;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #fffef2;"><b>목표</b></td>
                            <td style="text-align: center;background-color: #fff4f4;"><b>달성</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #f2ffff;"><b>예상</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #f0fff5;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center; font-size: 10px"><b>운영비</b></td>
                            <td style="text-align: center; font-size: 10px"><b>사업화지수</b></td>
                            <td style="text-align: center; font-size: 10px"><b>사업화지수<br>예상</b></td>
                        </tr>
                        <c:forEach var="l" items="${list}" varStatus="status">
                            <tr style="background-color: white">
                                <td style="text-align: center; font-weight: bold"><b style="cursor: pointer" onclick="weekMeet.fn_pjtSearch('${l.dept_seq}');">${l.dept_name}</b></td>
                                <td style="text-align: right;background-color: #fffef2;" id="delvObj_${l.dept_seq}" name="delvObj"></td>
                                <td style="text-align: right;background-color: #fff4f4;" id="delvAch_${l.dept_seq}" name="delvAch"></td>
                                <td style="text-align: right;font-weight: bold;" id="delvAchPer_${l.dept_seq}" name="delvAchPer"></td>
                                <td style="text-align: right;background-color: #f2ffff;" id="delvExp_${l.dept_seq}" name="delvExp"></td>
                                <td style="text-align: right;font-weight: bold;" id="delvExpPer_${l.dept_seq}" name="delvExpPer"></td>
                                <td style="text-align: right;background-color: #f0fff5" id="delvSum_${l.dept_seq}" name="delvSum"></td>
                                <td style="text-align: right;font-weight: bold;" id="delvSumPer_${l.dept_seq}" name="delvSumPer"></td>
                                <td style="text-align: right;background-color: #fffef2;" id="saleObj_${l.dept_seq}" name="saleObj"></td>
                                <td style="text-align: right;background-color: #fff4f4;" id="saleAch_${l.dept_seq}" name="saleAch"></td>
                                <td style="text-align: right;font-weight: bold;" id="saleAchPer_${l.dept_seq}" name="saleAchPer"></td>
                                <td style="text-align: right;background-color: #f2ffff;" id="saleExp_${l.dept_seq}" name="saleExp"></td>
                                <td style="text-align: right;font-weight: bold;" id="saleExpPer_${l.dept_seq}" name="saleExpPer"></td>
                                <td style="text-align: right;background-color: #f0fff5" id="saleSum_${l.dept_seq}" name="saleSum"></td>
                                <td style="text-align: right; font-weight: bold" id="saleSumPer_${l.dept_seq}" name="saleSumPer"></td>
                                <td style="text-align: right;background-color: #fffef2;" id="incpObj_${l.dept_seq}" name="incpObj"></td>
                                <td style="text-align: right;background-color: #fff4f4;" id="incpAch_${l.dept_seq}" name="incpAch"></td>
                                <td style="text-align: right;font-weight: bold;" id="incpAchPer_${l.dept_seq}" name="incpAchPer"></td>
                                <td style="text-align: right;background-color: #f2ffff;" id="incpExp_${l.dept_seq}" name="incpExp"></td>
                                <td style="text-align: right;font-weight: bold;" id="incpExpPer_${l.dept_seq}" name="incpExpPer"></td>
                                <td style="text-align: right;background-color: #f0fff5" id="incpSum_${l.dept_seq}" name="incpSum"></td>
                                <td style="text-align: right; font-weight: bold;" id="incpSumPer_${l.dept_seq}" name="incpSumPer"></td>
                                <td style="text-align: right"></td>
                                <td style="text-align: right"></td>
                                <td style="text-align: right"></td>
                            </tr>
                        </c:forEach>
                        <tr style="background-color: white">
                            <td style="text-align: center;background-color: #f0f6ff;font-weight: bold;">총계</td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvObjTotal" name="delvObjTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvAchTotal" name="delvAchTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvAchPerTotal" name="delvAchPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvExpTotal" name="delvExpTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvExpPerTotal" name="delvExpPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvSumTotal" name="delvSumTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="delvSumPerTotal" name="delvSumPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleObjTotal" name="saleObjTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleAchTotal" name="saleAchTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleAchPerTotal" name="saleAchPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleExpTotal" name="saleExpTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleExpPerTotal" name="saleExpPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleSumTotal" name="saleSumTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="saleSumPerTotal" name="saleSumPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpObjTotal" name="incpObjTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpAchTotal" name="incpAchTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpAchPerTotal" name="incpAchPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpExpTotal" name="incpExpTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpExpPerTotal" name="incpExpPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpSumTotal" name="incpSumTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;" id="incpSumPerTotal" name="incpSumPerTotal"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;"></td>
                            <td style="text-align: right;background-color: #f0f6ff;font-weight: bold;"></td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <c:forEach var="l" items="${list}" varStatus="status">
                <div id="grid_${l.dept_seq}" name="deptGrid"></div>
            </c:forEach>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    weekMeet.fn_DefaultScript();




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
