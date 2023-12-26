<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/project.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/setDelvProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>

<input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">프로젝트 수주승인</span></h3>

            <div class="btn-st popButton" style="font-size: 13px">
                <button type="button" id="appBtn" class="k-button k-button-solid-info" onclick="setDelvPjt.fn_approve(100)">승인</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" onclick="openModal()">코드변경 및 승인</button>
                <button type="button" id="canBtn"  class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding : 10px">
            <table class="popTable table table-bordered mb-0" id="mainTable">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4">
                        코드정보
                    </th>
                </tr>
                <tr>
                    <th>프로젝트 코드</th>
                    <td id="pjtCd"></td>
                    <th>사업구분</th>
                    <td id="busnName"></td>
                </tr>
                <tr>
                    <th>지원부처</th>
                    <td id="supDepName"></td>
                    <th>전담기관</th>
                    <td id="supDepSubName"></td>
                </tr>
                <tr>
                    <th>사업성격</th>
                    <td id="pjtStatName"></td>
                    <th>사업성격2</th>
                    <td id="pjtStatSubName"></td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0" style="margin-top: 15px;" id="mainTable2">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4">
                        프로젝트 정보
                    </th>
                </tr>
                <tr>
                    <th>프로젝트 명</th>
                    <td colspan="3" id="pjtNm"></td>
                </tr>
                <tr>
                    <th>프로젝트 시작</th>
                    <td id="strDt"></td>
                    <th>프로젝트 종료</th>
                    <td id="endDt"></td>
                </tr>
                <tr>
                    <th>담당자</th>
                    <td id="pmNm"></td>
                    <th>승인 요청자</th>
                    <td id="regNm"></td>
                </tr>
                <tr>
                    <th>시스템</th>
                    <td colspan="3" id="url"></td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<div id="dialog"></div>

<script>

    setDelvPjt.fn_defaultScript();

    $("#dialog").kendoWindow({
        title : "프로젝트 분류",
        width: "700px",
        visible: false,
        modal: true,
        position : {
            top : 30,
            left : 100
        },
        open : function (){
            var htmlStr =
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="setDelvPjt.fn_change(\'100\')">승인</button>' +
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

    function userSearch(type, pk) {
        window.open("/common/deptListPop.do?type="+type+"&pk="+pk, "조직도", "width=750, height=650");
    }

    function openModal(){

        $("#dialog").data("kendoWindow").open();
    }

    function modalSetData(){
        var data= {
            cmGroupCode : "BUSN_CLASS"
        }

        var pjCodeDs = customKendo.fn_customAjax("/common/commonCodeList", data);
        customKendo.fn_dropDownList("pjCode", pjCodeDs.rs, "CM_CODE_NM", "CM_CODE");

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

        $("#pjCode").data("kendoDropDownList").value(setDelvPjt.global.pjtCode);

        $("#supDep2").data("kendoDropDownList").value(setDelvPjt.global.supDep);
        $("#supDep2").data("kendoDropDownList").trigger("change");
        $("#supDepSub2").data("kendoDropDownList").value(setDelvPjt.global.supDepSub);

        $("#pjtStat").data("kendoDropDownList").value(setDelvPjt.global.pjtStat);
        $("#pjtStat").data("kendoDropDownList").trigger("change");
        $("#pjtStatSub").data("kendoDropDownList").value(setDelvPjt.global.pjtStatSub);

        $("#dialog").css("overflow", "hidden");
    }

</script>
</body>
</html>