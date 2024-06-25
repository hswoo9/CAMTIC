<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_achieve/monMeet.js?v=${today}'/>"></script>

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
</style>
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
                    <input type="text" id="year" style="width: 130px;" />
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
                            <td style="text-align: center;"><b>목표</b></td>
                            <td style="text-align: center;"><b>달성</b></td>
                            <td style="text-align: center;"><b>예상</b></td>
                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;"><b>목표</b></td>
                            <td style="text-align: center;"><b>달성</b></td>
                            <td style="text-align: center;"><b>예상</b></td>
                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                            <td style="text-align: center;"><b>목표</b></td>
                            <td style="text-align: center;"><b>달성</b></td>
                            <td style="text-align: center;"><b>예상</b></td>
                            <td style="text-align: center;"><b>합계</b></td>
                            <td style="text-align: center;"><b>(%)</b></td>
                        </tr>
                        <tr style="background-color: white">
                            <td style="text-align: right;" id="delvObj" name="delvObj"></td>
                            <td style="text-align: right;" id="delvAch" name="delvAch"></td>
                            <td style="text-align: right;" id="delvExp" name="delvExp"></td>
                            <td style="text-align: right;" id="delvSum" name="delvSum"></td>
                            <td style="text-align: right;font-weight: bold;" id="delvPer" name="delvPer"></td>
                            <td style="text-align: right;" id="saleObj" name="saleObj"></td>
                            <td style="text-align: right;" id="saleAch" name="saleAch"></td>
                            <td style="text-align: right;" id="saleExp" name="saleExp"></td>
                            <td style="text-align: right;" id="saleSum" name="saleSum"></td>
                            <td style="text-align: right;font-weight: bold" id="salePer" name="salePer"></td>
                            <td style="text-align: right;" id="incpObj" name="incpObj"></td>
                            <td style="text-align: right;" id="incpAch" name="incpAch"></td>
                            <td style="text-align: right;" id="incpExp" name="incpExp"></td>
                            <td style="text-align: right;" id="incpSum" name="incpSum"></td>
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
