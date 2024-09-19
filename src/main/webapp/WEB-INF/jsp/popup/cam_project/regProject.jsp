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

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item+.k-item {
        margin-left: 0px !important;
    }

    .k-tabstrip-top>.k-tabstrip-items-wrapper .k-item {
        border-bottom: 0px !important;
    }

    .k-window  div.k-window-content
    {
        overflow: hidden;
    }


</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/regProject.js?v=${today}'/>"></script>
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
<input type="hidden" id="mngCk" value="N">

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">프로젝트 등록</span>
                <input type="text" id="busnLgClass" style="width: 200px;"  />
                <input type="text" id="busnClass" style="width: 200px; display:none" />
                  <input type="hidden" id="pjtStep" value="E">
                <input type="hidden" id="pjtStepNm" value="상담">
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="regPrj.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="regPrj.fn_save()">수정</button>
                <c:if test="${loginVO.uniqId eq data.WRITER_EMP_SEQ}">
                    <button type="button" id="stopBtn" class="k-button k-button-solid-error" style="display: none;" onclick="regPrj.fn_stopModal()"> 중단</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div id="vEngi" style="padding: 20px 30px;display: none;">
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
                        <span class="red-star"></span>프로젝트코드
                    </th>
                    <td colspan="3">
                        <input type="text" id="contCd" style="width: 30%;" value="${data.PJT_CD}" disabled>
                    </td>


                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>상담일자
                    </th>
                    <td>
                        <input type="text" id="consultDt" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>면담자
                    </th>
                    <td>
                        <input type="text" id="deptName" style="width: 40%" value="${loginVO.orgnztNm}" disabled>
                        <input type="hidden" id="deptSeq" value="${loginVO.orgnztId}" disabled>
                        <input type="text" id="empName" style="width: 30%" value="${loginVO.name}" disabled>
                        <input type="hidden" id="empSeq" value="${loginVO.uniqId}">
<%--                        <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">--%>
<%--                            검색--%>
<%--                        </button>--%>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>제목
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtNm" style="width: 95%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>견적가
                    </th>
                    <td>
                        <input type="text" id="expAmt" style="width: 70%; text-align: right" onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> 원 (VAT별도)
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수주금액
                    </th>
                    <td>
                        <input type="text" id="pjtAmt2" style="width: 70%; text-align: right" onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0"> 원 (VAT별도)
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>업체명
                    </th>
                    <td>
                        <input type="text" id="contLoc" style="width: 90%;">
                        <input type="hidden" id="contLocSn" name="contLocSn" />
                        <button type="button" id="s" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_popCamCrmList('engn')">
                            조회
                        </button>
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

<div id="pjtSelectModal">
</div>

<div id="pjtSecurityModal">
</div>

<script>

    $("#pjtSelectModal").kendoWindow({
        title : "프로젝트 등록",
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
                '	<button type="button" id="cmCodeCRSaveBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="regPrj.fn_startProject()">등록</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#pjtSelectModal \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="20%">' +
                '		<col width="30%">' +
                '		<col width="50%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color" style="background-color: #4c7fbf; color : #ffffff"><span class="red-star">*</span>프로젝트 선택</th>' +
                '			<td>' +
                '				<input type="radio" id="projectDepthA" value="1" name="projectLg" style="position: relative; top: 3px;" />' +
                '				<label for="projectDepthA" style="margin-right: 15px;">정부사업</label> <br>' +
                '				<input type="radio" id="projectDepthB" value="2" name="projectLg" style="position: relative; top: 3px;" />' +
                '				<label for="projectDepthB">민간사업</label>' +
                '			</td>' +
                '			<td>' +
                '               <span id="deptA">' +
                '				    <input type="radio" id="R" value="R" name="projectSm" style="position: relative; top: 3px;" />' +
                '				    <label for="R">R&D</label> <br>' +
                '				    <input type="radio" id="S" value="S" name="projectSm" style="position: relative; top: 3px;" />' +
                '				    <label for="S">비R&D</label> <br>' +
                '               </span>' +
                '               <span id="deptB">' +
                '				    <input type="radio" id="D" value="D" name="projectSm" style="position: relative; top: 3px;" />' +
                '				    <label for="D">엔지니어링</label> <br>' +
                '				    <input type="radio" id="V" value="V" name="projectSm" style="position: relative; top: 3px;" />' +
                '				    <label for="V">용역/기타</label>' +
                '               </span>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';

            $("#pjtSelectModal").html(htmlStr);

            // modalKendoSetCmCodeCM();

            $("#projectDepthA").click(function (){
                $("#deptA").css("display", "");
                $("#deptB").css("display", "none");
                $("input[name='projectSm']").prop("checked", false)
            });

            $("#projectDepthB").click(function(){
                $("#deptB").css("display", "");
                $("#deptA").css("display", "none");
                $("input[name='projectSm']").prop("checked", false)
            });


            $("#pjtStopRs").kendoTextBox();
        },
        close: function () {
            $("#pjSelect").empty();
        }
    });

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
                '	<button type="button" id="passBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="regPrj.fn_checkPass()">확인</button>' +
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

    function openModalSelect(){
        $("#pjtSelectModal").data("kendoWindow").open();
    }

    function openModal(){
        $("#pjtStopModal").data("kendoWindow").open();
    }

    function openSecurityModal(){
        $("#pjtSecurityModal").data("kendoWindow").open();
    }

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    regPrj.fn_defaultScript();
</script>
</body>
</html>