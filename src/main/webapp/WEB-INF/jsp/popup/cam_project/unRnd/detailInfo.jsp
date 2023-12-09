<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/unRndDetail.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<style>
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4){
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }
</style>
<input type="hidden" id="step" value="S2" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="unRndSn" value=""/>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>

<form id="unRndDelvDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="unRndDelv">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding: 10px">
    <div id="detailBtnDiv">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDetail.fn_save()">저장</button>
        <button type="button" id="approveBtn" style="display : none; float: right; margin-bottom: 5px; margin-right:5px;" class="k-button k-button-solid-base" onclick="openModal()">결재</button>
        <button type="button" id="aBtn" style="display : none; float: right; margin-bottom: 5px; margin-right:5px;" class="k-button k-button-solid-base" onclick="">열람</button>
    </div>

    <br><br>

    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>총괄책임자
                </th>
                <td colspan="3">
                    <input type="text" id="mngDeptName" style="width: 20%" disabled>
                    <input type="hidden" id="mngDeptSeq" disabled>
                    <input type="text" id="mngEmpName" style="width: 15%" disabled>
                    <input type="hidden" id="mngEmpSeq">
                    <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch('mng');">
                        검색
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사업계획서
                </th>
                <td colspan="3">
                    <label for="bsPlanFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="bsPlanFile" name="bsPlanFile" onchange="unRndDetail.fileChange(this)" style="display: none">
                    <span id="bsPlanFileName"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사업목적
                </th>
                <td colspan="3">
                    <textarea type="text" id="unRndObj" name="unRndObj" style="width: 100%"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사업내용
                </th>
                <td colspan="3">
                    <textarea type="text" id="unRndCont" name="unRndCont" style="width: 100%"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <div id="customBudgetGrid"></div>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<div id="dialog"></div>
<script>
    unRndDetail.fn_defaultScript();

    $("#dialog").kendoWindow({
        title : "프로젝트 분류",
        width: "700px",
        visible: false,
        modal: true,
        position : {
            top : 200,
            left : 400
        },
        open : function (){
            var htmlStr =
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="unRndDetail.fn_approve()">저장</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#dialog \').data(\'kendoWindow\').close()">닫기</button>' +
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
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>프로젝트 구분</th>' +
                '			<td colspan="3">' +
                '				<input type="text" disabled id="pjCode" name="pjCode" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>지원부처</th>' +
                '			<td>' +
                '				<input type="text" id="supDep2" name="supDep" style="width: 90%"/>' +
                '			</td>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>전담기관</th>' +
                '			<td>' +
                '				<input type="text" id="supDepSub2" name="supDepSub" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>사업성격</th>' +
                '			<td>' +
                '				<input type="text" id="pjtStat" name="pjtStat" style="width: 90%"/>' +
                '			</td>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>사업성격2</th>' +
                '			<td>' +
                '				<input type="text" id="pjtStatSub" name="pjtStatSub" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#dialog").html(htmlStr);

            // modalKendoSetCmCodeCM();
            modalSetData()
        },
        close: function () {
            $("#dialog").empty();
        }
    });

    function userSearch(p) {
        window.open("/common/deptListPop.do?params=" + p , "조직도", "width=750, height=650");
    }

    function openModal(){

        $("#dialog").data("kendoWindow").open();
    }

    function modalSetData(){
        var data= {
            cmGroupCode : "BUSN_CLASS"
        }

        var pjCodeDs = customKendo.fn_customAjax("/common/commonCodeList", data)
        customKendo.fn_dropDownList("pjCode", pjCodeDs.rs, "CM_CODE_NM", "CM_CODE");

        $("#pjCode").data("kendoDropDownList").select(2);

        data.grpSn = "SUP_DEP";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("supDep2", lgCodeDs.rs, "LG_CD_NM", "LG_CD");

        $("#supDepSub2").kendoDropDownList({
            dataSource : [{text : "선택", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#supDep2").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#supDep2").val();
            data.grpSn = "SUP_DEP";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("supDepSub2", smCodeDs.rs, "PJT_CD_NM", "PJT_CD");
        });

        data.grpSn = "BUS_STAT";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("pjtStat", lgCodeDs.rs, "LG_CD_NM", "LG_CD");

        $("#pjtStatSub").kendoDropDownList({
            dataSource : [{text : "선택", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });
        $("#pjtStat").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#pjtStat").val();
            data.grpSn = "BUS_STAT";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("pjtStatSub", smCodeDs.rs, "PJT_CD_NM", "PJT_CD");
        });

        $("#supDep2").data("kendoDropDownList").value($("#supDep").val());
        $("#supDep2").data("kendoDropDownList").trigger("change");

        $("#supDepSub2").data("kendoDropDownList").value($("#supDepSub").val());

        $("#dialog").css("overflow", "hidden");
    }
</script>