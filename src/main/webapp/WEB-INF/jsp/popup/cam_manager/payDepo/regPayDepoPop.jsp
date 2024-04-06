<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/deposit/regPayDepoPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/incomeList.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regIncmPop.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<input type="hidden" id="payDepoSn" name="payDepoSn" value="${params.payDepoSn }" />
<input type="hidden" id="paramPjtSn" name="paramPjtSn" value="${params.pjtSn }" />
<input type="hidden" id="paramPjtCd" name="paramPjtCd" value="${hashMap.PJT_CD }" />
<input type="hidden" id="paramPjtNm" name="paramPjtNm" value="${hashMap.PJT_NM }" />

<input type="hidden" id="auth" value="${params.auth}" />

<input type="hidden" id="paramPm" value="${hashMap.PM}" />
<input type="hidden" id="paramPmSeq" value="${hashMap.PM_EMP_SEQ}" />

<input type="hidden" id="getDelvDe" value="${hashMap.DELV_DE}" />
<input type="hidden" id="getPjtAmt" value="${hashMap.PJT_AMT}" />
<input type="hidden" id="totDepoAmt" value="${hashMap.TOT_DEPO_AMT}" />

<input type="hidden" id="crmMemTempNm" value="${hashMap.CRM_MEM_TEMP_NM}" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <span id="titleStat">입금처리 요청서 작성</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="display: none;" id="incpBtn" onclick="incomeList.fn_incomePopup('${params.payDepoSn}')">수입결의서 작성</button>
                <button type="button" class="k-button k-button-solid-info" style="display: none;" id="apprBtn" onclick="incomeList.fn_apprIncome('${params.payDepoSn}')">수입결의 요청</button>
                <c:if test="${hashMap.PM == 'Y'}"></c:if>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regPayDepo.fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="regDeptSeq" value="${loginVO.orgnztId}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="25%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr style="display: none;" id="payDepReqUserTh">
                    <th scope="row" class="text-center th-color">요청자</th>
                    <td colspan="4">
                        <input type="text" id="payDepoReqUser" style="width: 15%" disabled>
                    </td>
                </tr>
                <tr id="project">
                    <th scope="row" class="text-center th-color">사업명</th>
                    <td colspan="2">
                        <span>
                            <input type="text" id="pjtNm" disabled value=""  style="width: 50%;">
                            <input type="hidden" id="pjtSn" name="pjtSn" value="" />
                            <input type="hidden" id="pjtCd" name="pjtCd" value="">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regPayDepo.fn_projectPop('regPay')">검색</button>
                        </span>
                    </td>
                    <th scope="row" class="text-center th-color">예산비목</th>
                    <td colspan="2">
                        <span>
                            <input type="text" id="budgetNm" disabled value=""  style="width: 50%;">
                            <input type="hidden" id="budgetSn" value="" />
                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regPayDepo.fn_budgetPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청건명</th>
                    <td colspan="4">
                        <input type="text" id="depoTitle" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">업체선택</th>
                    <td colspan="2">
                        <input type="hidden" id="crmSn" class="crmSn" value="">
                        <input type="hidden" id="regNo" class="regNo" value="">
                        <input type="text" id="crmNm" disabled class="crmNm" value="" style="width: 80%">
                        <button type="button" id="crmSelBtn" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPayDepo.fn_popCamCrmList();">업체선택</button>
                    </td>
                    <th scope="row" class="text-center th-color">사업자등록증</th>
                    <td colspan="2">
                        <div style="max-width: 100% !important;">
                            <div style="width:80%;" >
                                <input type="hidden" id="fileSn" name="fileSn" value="" />
                                <label for="files" class="k-button k-button-solid-base">파일첨부</label>
                                <input type="file" id="files" name="files" onchange="fileChange(this)" style="display: none">
                                <span id="fileName"></span>

                                <button type="button" class="k-button k-button-solid-base" id="viewerBtn" style="display:none; float: right">보기</button>
                            </div>
                        </div>

                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">청구여부</th>
                    <td colspan="2">
                        <input type="text" id="gubun" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">입금여부</th>
                    <td colspan="2">
                        <input type="text" id="depoStat" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">작성일자</th>
                    <td colspan="2">
                        <input type="text" id="appDe" style="width: 30%">
                    </td>
                    <th scope="row" class="text-center th-color" id="thPayIncpDeText">입금예정일</th>
                    <td colspan="2">
                        <input type="text" id="payIncpDe" style="width: 30%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">입금액(VAT포함)</th>
                    <td colspan="2">
                        <input type="text" id="depoAmt" style="text-align: right; width: 90%;" value="0" onkeyup="regPayDepo.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                    </td>
                    <th scope="row" class="text-center th-color">담당자</th>
                    <td colspan="2">
                        <input type="text" id="depoManager" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">발행유형</th>
                    <td colspan="2">
                        <input type="text" id="eviType" style="width: 40%" />
                        <input type="hidden" id="taxChGubun" />
                    </td>
                    <th scope="row" class="text-center th-color">메일주소</th>
                    <td colspan="2">
                        <input type="text" id="email" style="width: 90%" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">기타요청사항</th>
                    <td colspan="4">
                        <textarea type="text" id="depoCont" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr style="display:none;">
                    <th rowspan="3" scope="row" class="text-center th-color">입금계좌</th>
                    <th style="width: 10%">계좌명</th>
                    <td colspan="3">
                        <input type="text" id="accNm" disabled style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="regIncm.fn_bankPop()">검색</button>
                        <input type="hidden" id="bnkSn">
                    </td>
                </tr>
                <tr style="display:none;">
                    <th>계좌번호</th>
                    <td colspan="3">
                        <input type="text" id="accNo" disabled style="width: 60%;">
                    </td>
                </tr>
                <tr style="display:none;">
                    <th>은행명</th>
                    <td colspan="3">
                        <input type="text" id="bnkNm" disabled style="width: 60%;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    regPayDepo.fn_defaultScript();

    function selectProject(sn, nm, cd, baseYear){
        $("#budgetNm").val("");
        $("#budgetSn").val("");
        regPayDepo.global.setFlag = false;

        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);

        $("#depoTitle").val("입금신청 - " + nm);
        var data = {
            pjtCd : cd
        }

        var result = customKendo.fn_customAjax("/project/getBankData", data);
        var rs = result.data;

        if(rs != null){
            $("#accNm").val(rs.TR_NM);
            $("#bnkSn").val(rs.TR_CD);
            $("#accNo").val(rs.BA_NB);
            $("#bnkNm").val(rs.JIRO_NM);
        }
    }

    function fileChange(e){
        $("#fileSn").val("");
        $(e).next().text($(e)[0].files[0].name);
    }
</script>
</body>
</html>