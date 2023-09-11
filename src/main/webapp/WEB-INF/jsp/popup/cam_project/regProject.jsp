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
</style>
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
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">프로젝트 등록</span>
                <input type="text" id="busnClass" style="width: 200px" />
                <input type="hidden" id="pjtStep" value="E">
                <input type="hidden" id="pjtStepNm" value="상담">
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="regPrj.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="regPrj.fn_mod()">수정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div id="vEngi" style="padding: 20px 30px;display: none;">
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
                        <span class="red-star"></span>상담코드
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
                        <span class="red-star">*</span>예상견적가
                    </th>
                    <td>
                        <input type="text" id="expAmt" style="width: 90%; text-align: right" onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> 원
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>장소
                    </th>
                    <td>
                        <input type="text" id="contLoc" style="width: 90%;">
                    </td>
                </tr>
                </thead>
            </table>

            <div style="margin-top :15px;">
                <div class="demo-section">
                    <div id="tabstrip">
                        <ul style="font-size: 12px;">
                            <li class="k-active">
                                업체정보
                            </li>
                            <li>
                                출장정보
                            </li>
                            <li>
                                견적관리
                            </li>
                            <li>
                                수주보고
                            </li>
                            <li>
                                개발계획
                            </li>
                            <li>
                                공정
                            </li>
                            <li>
                                납품
                            </li>
                            <li>
                                결과보고
                            </li>
                            <li>
                                원가보고
                            </li>
                        </ul>
                        <div>
                            <div>
<%--                                <jsp:include page="/WEB-INF/jsp/popup/cam_project/engineering/crmInfo.jsp" flush="true">--%>
<%--                                    <jsp:param name="pjtSn" value="${params.pjtSn}"/>--%>
<%--                                    <jsp:param name="engnSn" value="${data.ENGN_SN}"/>--%>
<%--                                </jsp:include>--%>
                            </div>
                        </div>
<%--                        <div>--%>
<%--                            <div>--%>
<%--                                <jsp:include page="/WEB-INF/jsp/popup/cam_project/engineering/bustInfo.jsp" flush="true">--%>
<%--                                    <jsp:param name="pjtSn" value="${params.pjtSn}"/>--%>
<%--                                    <jsp:param name="engnSn" value="${data.ENGN_SN}"/>--%>
<%--                                </jsp:include>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <div>--%>
<%--                            <div>--%>
<%--                                <jsp:include page="/WEB-INF/jsp/popup/cam_project/engineering/estInfo.jsp" flush="true">--%>
<%--                                    <jsp:param name="pjtSn" value="${params.pjtSn}"/>--%>
<%--                                    <jsp:param name="engnSn" value="${data.ENGN_SN}"/>--%>
<%--                                    <jsp:param name="expAmt" value="${data.EXP_AMT}"/>--%>
<%--                                </jsp:include>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <div>--%>
<%--                            <div>--%>
<%--                                <jsp:include page="/WEB-INF/jsp/popup/cam_project/engineering/delvInfo.jsp" flush="true">--%>
<%--                                    <jsp:param name="pjtSn" value="${params.pjtSn}"/>--%>
<%--                                    <jsp:param name="engnSn" value="${data.ENGN_SN}"/>--%>
<%--                                    <jsp:param name="expAmt" value="${data.EXP_AMT}"/>--%>
<%--                                </jsp:include>--%>
<%--                            </div>--%>
<%--                        </div>--%>
                    </div>
                </div>
            </div>
        </div>



<%--        <div id="commFileHtml" style="display: none;">--%>
<%--            <form style="padding: 0px 30px;">--%>
<%--                <div class="card-header" style="padding: 5px;">--%>
<%--                    <h3 class="card-title">첨부파일</h3>--%>
<%--                    <div class="card-options">--%>
<%--                        <div class="filebox">--%>
<%--                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">--%>
<%--                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>--%>
<%--                                <span class="k-button-text">파일첨부</span>--%>
<%--                            </button>--%>
<%--                            <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--                <div class="table-responsive">--%>
<%--                    <table class="popTable table table-bordered mb-0">--%>
<%--                        <colgroup>--%>
<%--                            <col width="50%">--%>
<%--                            <col width="10%">--%>
<%--                            <col width="30%">--%>
<%--                            <col width="10%">--%>
<%--                        </colgroup>--%>
<%--                        <thead>--%>
<%--                        <tr class="text-center th-color">--%>
<%--                            <th>파일명</th>--%>
<%--                            <th>확장자</th>--%>
<%--                            <th>용량</th>--%>
<%--                            <th>기타</th>--%>
<%--                        </tr>--%>
<%--                        </thead>--%>
<%--                        <tbody id="fileGrid">--%>
<%--                        <tr class="defultTr">--%>
<%--                            <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>--%>
<%--                        </tr>--%>
<%--                        </tbody>--%>
<%--                    </table>--%>
<%--                </div>--%>
<%--            </form>--%>
<%--        </div>--%>
    </div>
</div>

<script>
    var inParameters = JSON.parse('${map}');

    regPrj.fn_defaultScript(inParameters);

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>