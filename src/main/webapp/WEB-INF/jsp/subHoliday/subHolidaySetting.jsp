<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidaySetting.js?v=${today}"/></script>

<style>
    tr:hover {
        cursor: pointer;
    }
</style>

<input type="hidden" id="modEmpSeq" name="empSeq" value="${loginVO.uniqId}" >
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴가 설정</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 휴가관리 &gt; 휴가 설정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="holidayYear" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 150px;">
                            <input type="text" id="team" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidaySetting.gridReload()}" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<div id="modal" class="pop_wrap_dir"></div>

<script type="text/javascript">
    subHolidaySetting.init();

    $("#modal").kendoWindow({
        title : "수정 사유",
        width: "1000px",
        visible: false,
        modal: true,
        position : {
            top : 300,
            left : 480
        },
        open : function (){
            var htmlStr = '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="subHolidaySetting.fn_saveAll()">저장</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#modal\').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="20%">' +
                '		<col width="35%">' +
                '		<col width="15%">' +
                '		<col width="30%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>수정사유</th>' +
                '			<td colspan="3">' +
                '				<input id="modReason" style="width: 80.5%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#modal").html(htmlStr);
            modalKendoSet();
        },
        close: function () {
            $("#modal").empty();
        }
    });

    function subHolidaySettingPop() {
        var url = "/subHoliday/pop/subHolidaySettingPop.do";
        var name = "subHolidaySettingPop";
        var option = "width=1528, height=700, top=100, left=200, location=no";
        var popup = window.open(url, name, option);
    }

    function modalKendoSet(){
        $("#modReason").kendoTextBox();
    }

    function openModal(){
        $("#modal").data("kendoWindow").open();
    }
</script>