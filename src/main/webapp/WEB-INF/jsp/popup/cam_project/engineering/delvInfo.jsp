<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/delvInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="expAmt" value="${params.expAmt}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="delvRegEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<form id="delvDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="delv">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="teamStat" name="teamStat">
<input type="hidden" id="delvSn" name="delvSn" value="">
<input type="hidden" id="step" value="E2" />
<input type="hidden" id="stepColumn" value="STEP3" />
<input type="hidden" id="nextStepColumn" value="STEP4" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />

<div style="padding: 10px">
    <div class="table-responsive">
        <div id="delvBtnDiv">
<%--            <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="openModal()">저장</button>--%>
        </div>
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
                    <span class="red-star"></span>프로젝트코드
                </th>
                <td colspan="3">
                    <input type="text" id="pjtCd" disabled style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>견적명
                </th>
                <td colspan="3">
                    <input type="text" id="delvPjtNm" disabled style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>의뢰일자
                </th>
                <td>
                    <input type="text" id="delvEstDe" style="width: 50%;">
                    <input type="hidden" id="befEstDe" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>납기일
                </th>
                <td>
                    <input type="text" id="delvDe" style="width: 50%;">
                    <div id="chgDiv" style="display: none;">
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="delvInfo.fn_updNowYear();">변경</button>
                        <span id="regTxtSpan" style="color: gray; display: none;"> 마지막 변경 : <span id="nowYearRegEmp"></span> (<span id="nowYearRegDt"></span>) </span>
                    </div>
                    <div id="chgDiv2" style="display: none; margin-top: 7px;">
                        <span style="color: red;">* 결재중 또는 결재완료된 전자결재 양식 내의 사업기간은 변경되지않습니다.</span>
                    </div>
                </td>
            </tr>
            <tr style="display:none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>사업기간
                </th>
                <td>
                    <input type="text" id="pjtStrDt" style="width: 43%;"> ~
                    <input type="text" id="pjtEndDt" style="width: 43%"/>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>납품품목
                </th>
                <td>
                    <input type="text" id="delvItem" style="width: 90%;">
                </td><%--
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>입금형태
                </th>
                <td>
                    <input type="text" id="delvPay" style="width: 90%;">
                </td>--%>
            </tr>
            <tr style="display:none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>납품수량
                </th>
                <td>
                    <input type="text" id="delvCnt" style="width: 90%;" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>납품단위
                </th>
                <td>
                    <input type="text" id="delvUnit" style="width: 90%;">
                </td>
            </tr><%--
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>납품장소
                </th>
                <td>
                    <input type="text" id="delvLoc" style="width: 90%;">
                </td>
            </tr>--%>
            <tr style="display: none;">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>납품수단
                </th>
                <td colspan="3">
                    <span style="position: relative; top: 5px;">
                        <input type="radio" id="vatN" name="delvMeans" value="고객수령" checked>
                        <label for="vatN">고객수령</label>
                        <input type="radio" id="vatY" name="delvMeans" value="법인차량" style="margin-left:10px;">
                        <label for="vatY">법인차량</label>
                        <input type="radio" id="vatC" name="delvMeans" value="외부업체" style="margin-left:10px;">
                        <label for="vatC">외부업체</label>
                    </span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>사업내용
                </th>
                <td colspan="3">
                    <textarea type="text" id="delvCont" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>특이사항
                </th>
                <td colspan="3">
                    <textarea type="text" id="delvIssu" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>수주금액
                </th>
                <td>
                    <input type="text" id="delvAmt" style="text-align: right; width: 80%;" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /> 원 (VAT별도)
                    <input type="hidden" id="delvExpAmt" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>계약서
                </th>
                <td>
                    <label for="delvFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="delvFile" name="delvFile" onchange="fileChange(this)" style="display: none">
                    <span id="delvFileName"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>참여부서
                </th>
                <td colspan="3">
                        <span style="position: relative; top: 5px;">
                            <input type="radio" id="A" name="delvDept" value="0">
                            <label for="A">부서내 진행</label>
                            <input type="radio" id="B" name="delvDept" value="1" style="margin-left:10px;">
                            <label for="B">부서간 협업</label>
                        </span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>PM
                </th>
                <td colspan="3">
                    <input type="text" id="pmName" style="width: 25%;" disabled />
                    <input type="hidden" id="pmSeq" style="width: 25%;" />
                    <input type="hidden" id="pmDeptSeq" style="width: 25%;" />
                    <input type="hidden" id="pmDeptName" style="width: 25%;" />
                    <button type="button" id="za" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch()">
                        조회
                    </button>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<div id="dialog"></div>

<script>
    delvInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

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
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="delvInfo.delvDrafting(10)">상신</button>' +
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
                '				<input type="text" id="pjCode" name="pjCode" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>지원부처</th>' +
                '			<td>' +
                '				<input type="text" id="supDep" name="supDep" style="width: 90%"/>' +
                '			</td>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>전담기관</th>' +
                '			<td>' +
                '				<input type="text" id="supDepSub" name="supDepSub" style="width: 90%"/>' +
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

    function delvOpenModal(){
        if(delvInfo.global.codeCk == "N"){
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


        if($("#busnClass").val() == "V"){
            $("#pjCode").data("kendoDropDownList").select(4);
        } else {
            $("#pjCode").data("kendoDropDownList").select(3);
        }

        data.grpSn = "SUP_DEP";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("supDep", lgCodeDs.rs, "LG_CD_NM", "LG_CD", 2);

        $("#supDepSub").kendoDropDownList({
            dataSource : [{text : "선택하세요", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });
        $("#supDep").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#supDep").val();
            data.grpSn = "SUP_DEP";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("supDepSub", smCodeDs.rs, "PJT_CD_NM", "PJT_CD", 2);
        });

        data.grpSn = "BUS_STAT";
        var lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", data);
        customKendo.fn_dropDownList("pjtStat", lgCodeDs.rs, "LG_CD_NM", "LG_CD", 2);

        $("#pjtStatSub").kendoDropDownList({
            dataSource : [{text : "선택하세요", value : ""}],
            dataTextField : "text",
            dataValueField : "value"
        });
        $("#pjtStat").data("kendoDropDownList").bind("change", function(){
            data.lgCd = $("#pjtStat").val();
            data.grpSn = "BUS_STAT";
            var smCodeDs = customKendo.fn_customAjax("/project/selSmCode", data);
            customKendo.fn_dropDownList("pjtStatSub", smCodeDs.rs, "PJT_CD_NM", "PJT_CD", 2);
        });
        $("#supDep").data("kendoDropDownList").value("l");
        $("#supDep").data("kendoDropDownList").trigger("change");

        $("#dialog").css("overflow", "hidden");
    }
</script>
</body>
</html>