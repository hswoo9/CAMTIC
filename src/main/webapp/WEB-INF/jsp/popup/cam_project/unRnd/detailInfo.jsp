<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/unRndDetail.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<style>
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5){
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    #tooltip span {
        cursor: pointer;
        display: block;
        width: 20px;
        height: 20px;
        background-image: url("/images/ico/ico_alert.png");
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

    .k-tooltip {
        font-size: 12px !important;
    }
</style>
<input type="hidden" id="step" value="S2" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="unRndSn" value=""/>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>

<form id="unRndDelvDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="unRndDelv">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="unRndStep1TmpCd" value="${data.PJT_TMP_CD}" />


<div style="padding: 10px">
    <div id="detailBtnDiv">
        <button type="button" id="delvSaveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDetail.fn_save()">저장</button>
        <button type="button" id="delvAppBtn" style="display : none; float: right; margin-bottom: 5px; margin-right:5px;" class="k-button k-button-solid-base" onclick="">열람</button>
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
                    <span class="red-star">*</span>사업 목적/내용
                </th>
                <td colspan="3">
                    <textarea type="text" id="unRndObj" name="unRndObj" style="width: 100%"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>특이사항
                </th>
                <td colspan="3">
                    <textarea type="text" id="unRndEtc" name="unRndEtc" style="width: 100%"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사업계획서
                </th>
                <td colspan="3">
                    <label for="bsPlanFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="bsPlanFile" name="bsPlanFile" onchange="fileChange(this)" style="display: none">
                    <span id="bsPlanFileName"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사업비 분리사용 유무
                </th>
                <td colspan="3">
                    <span>
                        <div style="float: left">
                            <input type="radio" id="sbjSepN" name="sbjSepYn" value="N" style="position: relative; top: 3px;">
                            <label for="sbjSepN">없음</label>
                            <input type="radio" id="sbjSepY" name="sbjSepYn" value="Y" style="position: relative; top: 3px;">
                            <label for="sbjSepY">있음</label>
                        </div>
                        <div style="float: left; padding-left: 10px;">
                            <div id="checkboxDiv" style="display: none"> |&nbsp&nbsp
                                <label for="at1"><input type='checkbox' style="position: relative; top: 3px;" id='at1' name='accountType' class='accountType' value='1'/> 국비&nbsp&nbsp</label>
                                <label for="at2"><input type='checkbox' style="position: relative; top: 3px;" id='at2' name='accountType' class='accountType' value='2'/> 도비&nbsp&nbsp</label>
                                <label for="at3"><input type='checkbox' style="position: relative; top: 3px;" id='at3' name='accountType' class='accountType' value='3'/> 시비&nbsp&nbsp</label>
                                <label for="at4"><input type='checkbox' style="position: relative; top: 3px;" id='at4' name='accountType' class='accountType' value='4'/> 자부담&nbsp&nbsp</label>
                                <label for="at5"><input type='checkbox' style="position: relative; top: 3px;" id='at5' name='accountType' class='accountType' value='5'/> 업체부담&nbsp&nbsp</label>
                                <label for="at9"><input type='checkbox' style="position: relative; top: 3px;" id='at9' name='accountType' class='accountType' value='9'/> 기타</label>
                            </div>
                        </div>
                    </span>
                </td>
            </tr>
            <tr class="budgetExDiv" style="display: none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>법인사업비(현금)<br><span style="color: blue">(하단 사업비 입력 시 자동반영)</span>
                </th>
                <td colspan="3">
                    <input type="text" id="peoResCost" value="0" name="peoResCost" style="width: 15%;text-align: right" disabled/>
                </td>
            </tr>
            <tr class="budgetExDiv" style="display: none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>법인사업비(현물)
                </th>
                <td colspan="3">
                    <input type="text" id="peoResItem" value="0" name="peoResItem" style="width: 15%;text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                </td>
            </tr>
            <tr class="budgetExDiv" style="display: none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주금액<br><span style="color: blue">(하단 사업비 입력 시 자동반영)</span>
                </th>
                <td colspan="3">
                    <input type="text" id="totResCost" name="totResCost" style="width: 32%;text-align: right" value="0" disabled/>
                </td>
            </tr>
            <tr id="nowYearBetween">
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>당해년도 사업기간<br><span style="color: blue"></span>
                </th>
                <td colspan="3">
                    <input type="text" id="nowStrDe" name="nowStrDe" style="width: 15%"/> ~
                    <input type="text" id="nowEndDe" name="nowEndDe" style="width: 15%"/>
                </td>
            </tr>
            <tr style="display: none">
                <%--<th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>과제책임자
                </th>
                <td colspan="3">
                    <input type="text" id="mngDeptName" style="width: 20%" disabled>
                    <input type="hidden" id="mngDeptSeq" disabled>
                    <input type="text" id="mngEmpName" style="width: 15%" disabled>
                    <input type="hidden" id="mngEmpSeq">
                    <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch('mng');">
                        검색
                    </button>
                </td>--%>
            </tr>
            <tr id="budgetExDiv" class="budgetExDiv" style="display: none">
                <td colspan="4">
                    <br>
                    <div style="display: flex; justify-content: space-between;">
                        <span id="budgetType"></span>
                        <span id="tooltip">
                            <span href="#" title="사업비 분리사용 유무에 따른 예산등록 금액 = 수주금액, 법인사업비(현금) / 현물 존재시 입력" id="projectTooltip"></span>
                        </span>
                    </div>
                    <div id="customBudgetGrid-1"></div>
                    <div id="customBudgetGrid0"></div>
                    <div id="customBudgetGrid1"></div>
                    <div id="customBudgetGrid2"></div>
                    <div id="customBudgetGrid3"></div>
                    <div id="customBudgetGrid4"></div>
                    <div id="customBudgetGrid5"></div>
                    <div id="customBudgetGrid6"></div>
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
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="unRndDetail.delvDrafting(10)">상신</button>' +
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

            if($("#unRndStep1TmpCd").val() != "" && $("#unRndStep1TmpCd").val().toString().substring(0, 1) == 'S'){
                $("#pjtStat").data("kendoDropDownList").value($("#unRndStep1TmpCd").val().toString().substring(3,4));
                $("#pjtStat").data("kendoDropDownList").trigger("change");
                $("#pjtStatSub").data("kendoDropDownList").value($("#unRndStep1TmpCd").val().toString().substring(4,5));
            }
        },
        close: function () {
            $("#dialog").empty();
        }
    });

    function userSearch(p) {
        window.open("/common/deptListPop.do?params=" + p , "조직도", "width=750, height=650");
    }

    function openModalUnRnd(){
        if($("#totResCost").val() == 0){
            alert("예산이 설정되지 않았습니다. 예산 설정 후 저장버튼을 누르고 진행 바랍니다."); return;
        }

        if(unRndDetail.global.codeCk == "N"){
            alert("수주보고전 세무정보 체크해주세요-재무회계팀에 문의"); return;
        }

        $("#dialog").data("kendoWindow").open();
    }

    function modalSetData(){
        var data= {
            cmGroupCode : "BUSN_CLASS"
        }

        var pjCodeDs = customKendo.fn_customAjax("/common/commonCodeList", data)
        customKendo.fn_dropDownList("pjCode", pjCodeDs.rs, "CM_CODE_NM", "CM_CODE", 2);

        $("#pjCode").data("kendoDropDownList").select(2);

        data.grpSn = "SUP_DEP";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("supDep2", lgCodeDs.rs, "LG_CD_NM", "LG_CD", 2);

        $("#supDepSub2").kendoDropDownList({
            dataSource : [{text : "선택하세요", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });

        $("#supDep2").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#supDep2").val();
            data.grpSn = "SUP_DEP";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("supDepSub2", smCodeDs.rs, "PJT_CD_NM", "PJT_CD", 2);
        });

        data.grpSn = "BUS_STAT";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("pjtStat", lgCodeDs.rs, "LG_CD_NM", "LG_CD", 2);

        $("#pjtStatSub").kendoDropDownList({
            dataSource : [{text : "선택", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });
        $("#pjtStat").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#pjtStat").val();
            data.grpSn = "BUS_STAT";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("pjtStatSub", smCodeDs.rs, "PJT_CD_NM", "PJT_CD", 2);
        });

        $("#supDep2").data("kendoDropDownList").value($("#supDep").val());
        $("#supDep2").data("kendoDropDownList").trigger("change");

        $("#supDepSub2").data("kendoDropDownList").value($("#supDepSub").val());

        $("#dialog").css("overflow", "hidden");
    }
</script>