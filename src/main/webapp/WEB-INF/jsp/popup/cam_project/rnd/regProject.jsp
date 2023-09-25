<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .k-tabstrip-top>.k-tabstrip-items-wrapper {
        border-bottom-width: 0px;
    }
    .k-tabstrip>.k-content {
        border-color: #fff;
    }

    #tabstrip h2 {
        font-weight: lighter;
        font-size: 5em;
        line-height: 1;
        padding: 0 0 0 30px;
        margin: 0;
    }

    #tabstrip h2 span {
        background: none;
        padding-left: 5px;
        font-size: .3em;
        vertical-align: top;
    }

    #tabstrip p {
        margin: 0;
        padding: 0;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item.k-state-active {
        border-color: rgb(18 19 35 / 50%) !important;
    }

    .k-tabstrip-content, .k-tabstrip>.k-content {
        padding : 0;
    }

    .table-responsive {
        overflow-x: hidden !important;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/regProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/document/docuPop.js?v=${today}'/>"></script>
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
<input type="hidden" id="documentSn" value="${data.documentContractSn}"/>

<input type="hidden" id="tab" value="${params.tab}" />

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">프로젝트 등록</span>
                <input type="hidden" id="pjtSn" value="${params.pjtSn}" />
                <input type="hidden" id="pjtStep" value="R">
                <input type="hidden" id="pjtStepNm" value="과제등록">
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="stopBtn" class="k-button k-button-solid-error" onclick="regRnd.fn_stopModal()" /> 중단</button>
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="regRnd.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="regRnd.fn_mod()">수정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div id="vRnd" style="padding: 20px 30px;">
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
                        <span class="red-star">*</span>과제구분
                    </th>
                    <td>
                        <input type="text" id="sbjClass" style="width: 90%;" value="">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>과제성격
                    </th>
                    <td>
                        <input type="text" id="sbjChar" style="width: 90%;" value="">
                    </td>
                </tr>
                <tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>지원부처</th>
                    <td>
                        <input type="text" id="supDep" name="supDep" style="width: 90%"/>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>전담기관</th>                    <td>
                    <input type="text" id="supDepSub" name="supDepSub" style="width: 90%"/>
                </td>
                </tr>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>연구 시작/종료일
                    </th>
                    <td>
                        <input type="text" id="sbjStrDe" style="width: 40%;"> ~
                        <input type="text" id="sbjEndDe" style="width: 40%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>과제담당자
                    </th>
                    <td>
                        <input type="text" id="deptName" style="width: 40%" disabled>
                        <input type="hidden" id="deptSeq" disabled>
                        <input type="text" id="empName" style="width: 30%" disabled>
                        <input type="hidden" id="empSeq">
                        <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>과제명
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtNm" style="width: 95%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>과제명(약칭)
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtSubNm" style="width: 95%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업비 분리사용 유무
                    </th>
                    <td>
                        <span>
                            <input type="radio" id="sbjSepN" name="sbjSepYn" value="N" style="position: relative; top: 3px;">
                            <label for="sbjSepN">없음</label>
                            <input type="radio" id="sbjSepY" name="sbjSepYn" value="Y" style="position: relative; top: 3px;">
                            <label for="sbjSepY">있음</label>
                        </span>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>3책 5공
                    </th>
                    <td>
                        <input type="checkbox" id="rndStatYn" name="rndStatYn" style="position: relative; top: 3px;">
                        <label for="rndStatYn">적용</label>
                    </td>
                </tr>
                </thead>
            </table>

            <div style="margin-top :15px;">
                <div class="demo-section">
                    <div id="tabstrip">
                        <ul style="font-size: 12px;">

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="pjtStopModal">
    <input type="text" id="pjtStopRs" />
</div>
<script>

    regRnd.fn_defaultScript();

    $("#pjtStopModal").kendoWindow({
        title : "프로젝트 중단 사유",
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
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="regPrj.fn_stop()">중단</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#pjtStopModal \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="20%">' +
                '		<col width="80%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>중단사유</th>' +
                '			<td>' +
                '				<input type="text" id="pjtStopRs" name="pjtStopRs" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#pjtStopModal").html(htmlStr);

            // modalKendoSetCmCodeCM();

            $("#pjtStopRs").kendoTextBox();
        },
        close: function () {
            $("#pjtStopModal").empty();
        }
    });

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>