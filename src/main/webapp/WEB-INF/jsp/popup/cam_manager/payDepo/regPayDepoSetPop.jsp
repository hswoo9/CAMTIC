<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/deposit/regPayDepoSetPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regIncmPop.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<input type="hidden" id="payDepoSn" name="payDepoSn" value="${params.payDepoSn }" />
<input type="hidden" id="paramPjtSn" name="paramPjtSn" value="${params.pjtSn }" />
<input type="hidden" id="paramPjtNm" name="paramPjtNm" value="${hashMap.PJT_NM }" />

<input type="hidden" id="auth" value="${params.auth}" />

<input type="hidden" id="paramPm" value="${hashMap.PM}" />
<input type="hidden" id="paramPmSeq" value="${hashMap.PM_EMP_SEQ}" />

<input type="hidden" id="getDelvDe" value="${hashMap.DELV_DE}" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <span id="titleStat">[민간사업] 예산 설정</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regPayDepoSet.fn_save();">저장</button>
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
                    <td colspan="4">
                        <span>
                            <input type="text" id="pjtNm" disabled value=""  style="width: 70%;">
                            <input type="hidden" id="pjtSn" value="" />
                            <input type="hidden" id="pjtCd" name="pjtCd" value="">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regPayDepoSet.fn_projectPop('regPay')">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">예산비목</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="budgetNm" disabled value=""  style="width: 70%;">
                            <input type="hidden" id="budgetSn" value="" />
                            <input type="hidden" id="budgetAmt" value="" />
                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regPayDepoSet.fn_budgetPop()">검색</button>
                        </span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    regPayDepoSet.fn_defaultScript();

    function selectProject(nm, cd){

        $("#budgetNm").val("");
        $("#budgetSn").val("");

        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }
</script>
</body>
</html>