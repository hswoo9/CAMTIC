<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/history/historyReq.js?v=${today}"/></script>
<style>
    .hover:hover {text-decoration: underline; cursor: pointer}
    .dash-left .table > tbody > tr > th {
    padding-left: 5px;
    padding-right: 5px;
    }
    .dash-left .table > tbody > tr > td {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">발령 관리</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 발령/포상관리 &gt; 발령관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">발령 구분</th>
                        <td>
                            <input type="text" id="historyType" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">발령 기준</th>
                        <td>
                            <input type="text" id="appointmentType" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 45%;">
                            <input type="text" id="team" style="width: 45%;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 45%;">
                            ~
                            <input type="text" id="end_date" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">성별</th>
                        <td>
                            <input type="text" id="gender" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width: 30%">
                            <input type="text" id="searchText"  onkeypress="if(window.event.keyCode==13){historyList.gridReload()}"style="width: 60%;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<div id="modAf">
</div>
<script type="text/javascript">
    historyList.init();

    $("#modAf").kendoWindow({
        title : "직무 변경",
        width: "700px",
        visible: false,
        modal: true,
        position : {
            top : 200,
            left : 600
        },
        open : function (){
            var htmlStr =
                '<input type="hidden" id="selectKey" />' +
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyList.saveChangeAf()">저장</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#modAf \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="20%">' +
                '		<col width="80%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star"></span>성명</th>' +
                '			<td>' +
                '				<input type="text" id="chngNm" name="chngNm" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star"></span>직급</th>' +
                '			<td>' +
                '				<input type="text" id="chngPt" name="chngPt" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star"></span>부서</th>' +
                '			<td>' +
                '				<input type="text" id="chngDept" name="chngDept" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#modAf").html(htmlStr);

            // modalKendoSetCmCodeCM();

            $("#chngNm ,#chngPt, #chngDept").kendoTextBox();
        },
        close: function () {
            // $("#pjtStopModal").empty();
        }
    });
</script>