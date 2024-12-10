<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/monMeet.js?v=${today}'/>"></script>
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
            <h4 class="panel-title">전체 재무성과</h4>
            <div class="title-road">캠어취브 > 캠어취브 &gt; 재무성과 &gt; 전체 재무성과</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <button type="button" class="k-button k-button-solid-base" id="displayBtn" onclick="fn_statTableShowHide();" style="margin-bottom: 5px">통계 ▲</button>
                <span style="bottom: 3px; position: relative;">
                    <input type="text" id="year" style="width: 10%;" />
                </span>
                <button type="button" class="k-button k-button-solid-base" id="searchBtn" onclick="monMeet.fn_dataReset();" style="margin-bottom: 5px; float: right">조회</button>

                <div id="statTable" style="width: 100%; overflow: auto; margin-top: 5px;" view="Y">
                    <table class="totalTable table table-bordered" style="margin-bottom: 0px; white-space:nowrap;">
                        <caption style="text-align: left;">(단위 : 백만원, %)</caption>
                        <thead>
                        <colgroup>
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">

                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">

                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                            <col width="6.6%">
                        </colgroup>
                        <tr style="color : black ; background-color: #f0f6ff;">
                            <td style="text-align: center;" colspan="5"><b>수주</b></td>
                            <td style="text-align: center;" colspan="5"><b>매출</b></td>
                            <td style="text-align: center;" colspan="5"><b>운영수익</b></td>
                        </tr>
                        <tr style="color : black ; background-color: #ffffff;">
                            <td style="text-align: center;background-color: #fffef2;"><b>목표</b></td>
                            <td style="text-align: center;background-color: #fff4f4;"><b>달성</b></td>
                            <td style="text-align: center;background-color: #f2ffff;"><b>예상</b></td>
                            <td style="text-align: center;background-color: #f0fff5;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #fffef2;"><b>목표</b></td>
                            <td style="text-align: center;background-color: #fff4f4;"><b>달성</b></td>
                            <td style="text-align: center;background-color: #f2ffff;"><b>예상</b></td>
                            <td style="text-align: center;background-color: #f0fff5;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;background-color: #fffef2;"><b>목표</b></td>
                            <td style="text-align: center;background-color: #fff4f4;"><b>달성</b></td>
                            <td style="text-align: center;background-color: #f2ffff;"><b>예상</b></td>
                            <td style="text-align: center;background-color: #f0fff5;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                        </tr>
                        <tr style="background-color: white">
                            <td style="text-align: right;background-color: #fffef2;" id="delvObj" name="delvObj"></td>
                            <td style="text-align: right;background-color: #fff4f4;" id="delvAch" name="delvAch"></td>
                            <td style="text-align: right;background-color: #f2ffff;" id="delvExp" name="delvExp"></td>
                            <td style="text-align: right;background-color: #f0fff5;" id="delvSum" name="delvSum"></td>
                            <td style="text-align: right;font-weight: bold;" id="delvPer" name="delvPer"></td>
                            <td style="text-align: right;background-color: #fffef2;" id="saleObj" name="saleObj"></td>
                            <td style="text-align: right;background-color: #fff4f4;" id="saleAch" name="saleAch"></td>
                            <td style="text-align: right;background-color: #f2ffff;" id="saleExp" name="saleExp"></td>
                            <td style="text-align: right;background-color: #f0fff5;" id="saleSum" name="saleSum"></td>
                            <td style="text-align: right;font-weight: bold" id="salePer" name="salePer"></td>
                            <td style="text-align: right;background-color: #fffef2;" id="incpObj" name="incpObj"></td>
                            <td style="text-align: right;background-color: #fff4f4;" id="incpAch" name="incpAch"></td>
                            <td style="text-align: right;background-color: #f2ffff;" id="incpExp" name="incpExp"></td>
                            <td style="text-align: right;background-color: #f0fff5;" id="incpSum" name="incpSum"></td>
                            <td style="text-align: right; font-weight: bold;" id="incpPer" name="incpPer"></td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div class="panel-body">

        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    monMeet.fn_DefaultScript();

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
