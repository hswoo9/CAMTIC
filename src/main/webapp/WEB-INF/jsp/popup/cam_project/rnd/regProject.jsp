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

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item+.k-item {
        margin-left: 0px !important;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item {
        border-bottom: 0px !important;
    }

    .table-responsive {
        overflow-x: hidden !important;
    }

    label {
        margin: 0;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
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

<input type="hidden" id="mainPjtSn" value="${params.pjtSn}" />

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
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="regRnd.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="regRnd.fn_mod()">수정</button>
                <c:if test="${loginVO.uniqId eq data.WRITER_EMP_SEQ}">
                    <button type="button" id="stopBtn" class="k-button k-button-solid-error" style="display: none;" onclick="regRnd.fn_stopModal()" /> 중단</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div id="vRnd" style="padding: 20px 30px;">
            <input type="hidden" id="viewStat" value="Y" />
            <table class="popTable table table-bordered mb-0" id="mainTable">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업구분
                    </th>
                    <td>
                        <input type="text" id="yearClass" style="width: 20%;" value="">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>과제구분
                    </th>
                    <td>
                        <input type="text" id="sbjClass" style="width: 20%;" value="">
                    </td>
                </tr>
                <tr style="display: none">
                    <th scope="row" class="text-center th-color" style="display: none">
                        <span class="red-star">*</span>과제성격
                    </th>
                    <td style="display: none">
                        <input type="text" id="sbjChar" style="width: 90%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>지원부처</th>
                    <td>
                        <input type="text" id="supDep" name="supDep" style="width: 90%"/>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>전담기관</th>
                    <td>
                        <input type="text" id="supDepSub" name="supDepSub" style="width: 90%"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>주관기관</th>
                    <td>
                        <input type="text" id="rndCrmNm" name="rndCrmNm" style="width: 80%"/>
                        <input type="hidden" id="rndCrmSn" name="rndCrmSn" />
                        <button type="button" id="s" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_popCamCrmList()">
                            조회
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color">위탁기관</th>
                    <td>
                        <input type="text" id="rndConCrmNm" name="rndConCrmNm" value="${data.CRM_CON_NM}" style="width: 80%"/>
                        <input type="hidden" id="rndConCrmSn" name="rndConCrmSn" value="${data.CRM_CON_SN}" />
                        <button type="button" id="s2" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_popCamCrmList('con')">
                            조회
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">참여기관</th>
                    <td>
                        <input type="text" id="crmPartNm" name="crmPartNm" style="width: 80%" value="${data.CRM_PART_NM}" />
                        <input type="hidden" id="crmPartSn" name="crmPartSn" value="${data.CRM_PART_SN}" />
                        <button type="button" id="s3" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_popCamCrmList('part')">
                            조회
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>예상 수주금액</th>
                    <td>
                        <input type="text" id="pjtExpAmt" name="pjtExpAmt" style="width: 80%;text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>총 사업비</th>
                    <td>
                        <input type="text" id="allBusnCost" name="allBusnCost" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 80%; text-align: right" value="0"/>
                    </td>
                    <th scope="row" class="text-center th-color">수주금액</th>
                    <td>
                        <input type="text" id="pjtAmt2" name="pjtAmt2" style="width: 80%; text-align: right" disabled value="0"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span><span id="mngText">사업책임자</span><br>(사업계획서상)
                    </th>
                    <td>
                        <input type="text" id="mngDeptName" style="width: 40%" disabled>
                        <input type="hidden" id="mngDeptSeq" disabled>
                        <input type="text" id="mngEmpName" style="width: 30%" disabled>
                        <input type="hidden" id="mngEmpSeq">
                        <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch('mng');">
                            검색
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>과제담당자(PM)<br>(법인내부)
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
                        <span class="red-star">*</span>연구 시작/종료일
                    </th>
                    <td colspan="3">
                        <input type="text" id="sbjStrDe" style="width: 40%;"> ~
                        <input type="text" id="sbjEndDe" style="width: 40%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업명
                    </th>
                    <td colspan="3">
                        <input type="text" id="bsTitle" style="width: 95%;" value="">
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
                        3책 5공
                    </th>
                    <td>
                        <input type="checkbox" id="rndStatYn" name="rndStatYn" style="position: relative; top: 3px;">
                        <label for="rndStatYn">적용</label>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 외부공개 여부
                    </th>
                    <td>
                        <span style="position: relative; top: 5px;">
                            <input type="radio" id="securityN" name="securityYn" value="N" checked="checked">
                            <label for="securityN">공개</label>
                            <input type="radio" id="securityY" name="securityYn" value="Y" style="margin-left:10px;">
                            <label for="securityY">비공개</label>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>세무정보
                    </th>
                    <td>
                        <c:if test="${data.CODE_VAL == '1'}">수익사업</c:if>
                        <c:if test="${data.CODE_VAL == '2'}">고유목적사업</c:if>
                        <c:if test="${data.CODE_VAL == '3'}">공통사업</c:if>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>과세구분
                    </th>
                    <td>
                        <input type="hidden" id="taxGubun" value="${data.TAX_GUBUN}" />
                        <c:if test="${data.TAX_GUBUN == '1'}">과세</c:if>
                        <c:if test="${data.TAX_GUBUN == '2'}">면세</c:if>
                        <c:if test="${data.TAX_GUBUN == '3'}">비과세</c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>예산정보
                    </th>
                    <td colspan="3">
                        <c:if test="${data.BUDGET_GUBUN == 'CASH'}">현금</c:if>
                        <c:if test="${data.BUDGET_GUBUN == 'POINT'}">
                            포인트 -
                            <c:if test="${data.EXEC_SYSTEM == '1'}">e나라도움</c:if>
                            <c:if test="${data.EXEC_SYSTEM == '2'}">RCMS</c:if>
                            <c:if test="${data.EXEC_SYSTEM == '3'}">통합이지바로</c:if>
                            <c:if test="${data.EXEC_SYSTEM == '4'}">보탬e</c:if>
                            <c:if test="${data.EXEC_SYSTEM == '5'}">KIRIA</c:if>
                            <c:if test="${data.EXEC_SYSTEM == '6'}">JBTP</c:if>
                            <c:if test="${data.EXEC_SYSTEM == '99'}">기타</c:if>
                        </c:if>
                    </td>
                </tr>
                </thead>
            </table>

            <div style="text-align: center; cursor: pointer; margin-top: 15px; background-color: #f1f7ff; border: 1px solid #c5c5c5" id="viewBtn"><span id="viewText">&#9650;</span></div>

            <div style="margin-top :15px;">
                <div class="demo-section">
                    <div id="tabstrip">
                        <ul style="font-size: 12px; padding-bottom: 2px">

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

<div id="pjtSecurityModal">
</div>

<script>
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
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="regRnd.fn_stop()">중단</button>' +
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

    $("#pjtSecurityModal").kendoWindow({
        title : "비공개 프로젝트 비밀번호 입력",
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
                '	<button type="button" id="passBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="regRnd.fn_checkPass()">확인</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#pjtSecurityModal \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="popTable table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="20%">' +
                '		<col width="80%">' +
                '	</colgroup>' +
                '	<thead>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span class="red-star">*</span>비밀번호</th>' +
                '			<td>' +
                '				<input type="password" id="pjtSecurity" name="pjtSecurity" style="width: 90%"/>' +
                '			</td>' +
                '		</tr>' +
                '	</thead>' +
                '</table>';

            $("#pjtSecurityModal").html(htmlStr);

            // modalKendoSetCmCodeCM();

            $("#pjtSecurity").kendoTextBox();
        },
        close: function () {
            $("#pjtSecurityModal").empty();
        }
    });

    function openSecurityModal(){
        $("#pjtSecurityModal").data("kendoWindow").open();
    }

    function userSearch(p) {
        window.open("/common/deptListPop.do?params=" + p , "조직도", "width=750, height=650");
    }

    regRnd.fn_defaultScript();
</script>
</body>
</html>