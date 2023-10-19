<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />


<script type="text/javascript" src="/js/intra/cam_project/management/labor.js?v=${today}"/></script>

<style>
    .k-prompt-container, .k-window-content {
        overflow : hidden !important;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">노임단가/경비 관리</h4>
            <div class="title-road">캠프로젝트 > 프로젝트관리 &gt; 노임단가/경비관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div> ◈ 노임단가 관리</div>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>

        <div class="panel-body">
            <div>
                <div> ◈ 경비 관리</div>
                <div id="mainGrid2" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<div id="laborSetModal"></div>
<div id="teamCostSetModal"></div>

<script>
    labor.fn_defaultScript();

    $("#laborSetModal").kendoWindow({
        title : "노임단가 등록",
        width: "1000px",
        visible: false,
        modal: true,
        position : {
            top : 300,
            left : 480
        },
        open : function (){
            var htmlStr = '<input type="hidden" id="positionCd" name="positionCd">' +
                '<input type="hidden" id="laborSn" name="laborSn">' +
                '<input type="hidden" id="laborHistSn" name="laborHistSn">' +
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" style="display: none" onclick="labor.fn_add()">추가</button>' +
                '	<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="labor.fn_save()">저장</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#laborSetModal\').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="15%">' +
                '		<col width="35%">' +
                '		<col width="15%">' +
                '		<col width="35%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>직급</th>' +
                '			<td>' +
                '				<input type="text" id="positionNm" disabled name="positionNm" style="width: 80.5%"/>' +
                '			</td>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>노임단가</th>' +
                '			<td>' +
                '				<input type="text" id="laborAmt" name="laborAmt" style="width: 80.5%; text-align: right" onkeyup="labor.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /> 원' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>적용기간</th>' +
                '			<td colspan="3">' +
                '				<input type="text" id="strDe" name="strDe" style="width: 20%"/> ~ ' +
                '				<input type="text" id="endDe" name="endDe" style="width: 20%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#laborSetModal").html(htmlStr);

            var data = {
                cmGroupCode : "POSITION",
            }
            var result = customKendo.fn_customAjax("/common/commonCodeList", data);

            customKendo.fn_dropDownList("positionNm", result.rs, "CM_CODE_NM", "CM_CODE");

            $("#positionNm").data("kendoDropDownList").bind("change", labor.fn_positionChange);

            customKendo.fn_textBox(["laborAmt"]);
            customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date());
            customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", "");

        },
        close: function () {
            $("#laborSetModal").empty();
        }
    });

    $("#teamCostSetModal").kendoWindow({
        title : "경비 등록",
        width: "1000px",
        visible: false,
        modal: true,
        position : {
            top : 300,
            left : 480
        },
        open : function (){
            var htmlStr = '<input type="hidden" id="deptSeq" name="deptSeq">' +
                '<input type="hidden" id="teamCostSn" name="teamCostSn">' +
                '<input type="hidden" id="teamCostHistSn" name="teamCostHistSn">' +
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" style="display: none" onclick="labor.fn_add(\'team\')">추가</button>' +
                '	<button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="labor.fn_save(\'team\')">저장</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#teamCostSetModal\').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="15%">' +
                '		<col width="35%">' +
                '		<col width="15%">' +
                '		<col width="35%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>팀</th>' +
                '			<td>' +
                '				<input type="text" id="deptNm" disabled name="deptNm" style="width: 80.5%"/>' +
                '			</td>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>경비</th>' +
                '			<td>' +
                '				<input type="text" id="teamCostAmt" name="teamCostAmt" style="width: 80.5%; text-align: right" onkeyup="labor.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" /> %' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>적용기간</th>' +
                '			<td colspan="3">' +
                '				<input type="text" id="strDe" name="strDe" style="width: 20%"/> ~ ' +
                '				<input type="text" id="endDe" name="endDe" style="width: 20%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#teamCostSetModal").html(htmlStr);

            var data = {
                deptLevel : "2",
            }
            var teamResult = customKendo.fn_customAjax("/common/teamList", data);
            customKendo.fn_dropDownList("deptNm", teamResult.list, "dept_name", "dept_seq");

            customKendo.fn_textBox(["teamCostAmt"]);
            customKendo.fn_datePicker("strDe", "depth", "yyyy-MM-dd", new Date());
            customKendo.fn_datePicker("endDe", "depth", "yyyy-MM-dd", "");

        },
        close: function () {
            $("#teamCostSetModal").empty();
        }
    });
</script>
</body>
</html>