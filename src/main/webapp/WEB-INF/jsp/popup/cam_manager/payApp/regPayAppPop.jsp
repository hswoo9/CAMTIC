<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>


<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regPayAppPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regPayAppDocument.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>


<form id="payAppDraftFrm" method="post">
    <input type="hidden" id="payAppSn" name="payAppSn" value="${params.payAppSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="payApp">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="status" name="status" value="${params.status}" />
<input type="hidden" id="auth" name="auth" value="${params.auth}" />

<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="loginEmpName" value="${loginVO.name}"/>
<input type="hidden" id="loginDeptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="loginDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="loginTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="loginTeamName" value="${loginVO.teamNm}"/>

<input type="hidden" id="reqType" value="${params.reqType}" />
<input type="hidden" id="bsYm" value="${params.bsYm}" />
<input type="hidden" id="payRollYm" value="${params.payRollYm}" />
<input type="hidden" id="docStatus" value=""/>
<input type="hidden" id="g20BudgetAmt" value="" />

<input type="hidden" id="partRatePjtSn" value="${params.pjtSn}" />
<input type="hidden" id="partRatePjtCd" value="${params.pjtCd}" />
<input type="hidden" id="claimSn" value="${params.claimSn}" />
<input type="hidden" id="purcSn" value="${params.purcSn}" />
<input type="hidden" id="claimExnpSn" value="${params.claimExnpSn}" />

<input type="hidden" id="hrBizReqId" value="${params.hrBizReqId}" />
<input type="hidden" id="hrBizReqResultId" value="${params.hrBizReqResultId}" />
<input type="hidden" id="bList" value="" />
<input type="hidden" id="snackInfoSn" value="${params.snackInfoSn}" />
<input type="hidden" id="sList" value="" />

<input type="hidden" id="cardToSn" value="${params.cardToSn}" />

<input type="hidden" id="accountToSn" value="${params.accountToSn}" />
<input type="hidden" id="cardPjtSn" value="${params.cardPjtSn}" />
<input type="hidden" id="cardPjtCd" value="${params.cardPjtCd}" />
<input type="hidden" id="cardPjtNm" value="${params.cardPjtNm}" />

<input type="hidden" id="apprMngStat" value="${params.vType}">

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <span id="cardTitle">
                        <c:if test='${params.status == "rev"}'>지급신청서</c:if>
                        <c:if test='${params.status == "in"}'>여입신청서</c:if>
                        <c:if test='${params.status == "re"}'>반납신청서</c:if>
                        <c:if test='${params.status == "alt"}'>대체신청서</c:if>
                        <c:if test='${params.status == "" or params.status == null}'>
                            <c:if test='${!"".equals(params.claimSn) or params.claimSn != null}'>지급</c:if>신청서
                        </c:if>
                    </span>
                    <span id="titleStat">작성</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regPay.fn_save('user');">저장</button>
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
                <tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청유형</th>
                    <td colspan="2">
                        <span id="payAppType"></span>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청일자</th>
                    <td colspan="2">
                        <input type="text" id="appDe" style="width: 40%">
                    </td>
                </tr>
                <tr id="project">
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업명</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="firstPjtSn" value="" />
                            <input type="hidden" id="pjtCd" value="${pjtData.PJT_CD}" />
                            <input type="hidden" id="baseYear" value="" />
                            <input type="hidden" id="busnNm" value="" />
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regPay.fn_projectPop('regPay')">검색</button>
                        </span>
                    </td>
<%--                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>지출요청일</th>--%>
<%--                    <td colspan="2">--%>
<%--                        <input type="text" id="reqDe" style="width: 40%" />--%>
<%--                    </td>--%>
                </tr>
<%--                <tr>--%>
<%--                    <th scope="row" class="text-center th-color">예산비목</th>--%>
<%--                    <td colspan="4">--%>
<%--                        <span>--%>
<%--                            <input type="text" id="budgetNm" disabled value=""  style="width: 40%;">--%>
<%--                            <input type="hidden" id="budgetSn" value="" />--%>
<%--                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regPay.fn_budgetPop()">검색</button>--%>
<%--                        </span>--%>
<%--                    </td>--%>
<%--                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청건명</th>
                    <td colspan="4">
                        <input type="text" id="appTitle" style="width: 100%;">
                    </td>
                </tr>
                <tr id="reasonContTr">
                    <th scope="row" class="text-center th-color">신청내용</th>
                    <td colspan="4">
                        <textarea type="text" id="appCont" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3" scope="row" class="text-center th-color" id="trBank"><span class="red-star">*</span>출금계좌</th>
                    <th style="width: 10%"><span class="red-star">*</span>계좌명</th>
                    <td colspan="3">
                        <input type="text" id="accNm" disabled style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="regPay.fn_bankPop()">검색</button>
                        <input type="hidden" id="bnkSn">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>계좌번호</th>
                    <td colspan="3">
                        <input type="text" id="accNo" disabled style="width: 60%;">
                    </td>
                </tr>
                <tr>
                    <th><span class="red-star">*</span>은행명</th>
                    <td colspan="3">
                        <input type="text" id="bnkNm" disabled style="width: 60%;">
                    </td>
                </tr>
                <tr style="display: none">
                    <th scope="row" class="text-center th-color">전결구분</th>
                    <td colspan="4">
                        <span id="payAppStat"></span>
                    </td>
                </tr>
                <tr>
<%--                    <th scope="row" class="text-center th-color">선지급여부</th>--%>
<%--                    <td colspan="2">--%>
<%--                        <input type="checkbox" id="advances" class="advances" style="width: 26px; height: 26px;">--%>
<%--                    </td>--%>
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td colspan="4">
                        <div>
                            <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regPayDet.fn_regPayAttPop()">첨부</button>
                            <span id="fileText"></span>
                        </div>
                    </td>
                </tr>
                </thead>
            </table>


            <span id="totalPay" style="float: right; font-size: 16px; font-weight: bold; display: none; height: 35px;margin-top: 10px;">총 금액 : </span>
            <c:if test="${params.stat == 'v'}">
                <span id="claimGroup" style="font-size:12px;">
                    <button type="button" style="top:15px;" class="k-button k-button-solid-info" onclick="regPay.fn_reqClaiming()">청구서작성</button>
                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="regPay.fn_printEst()">견적요청서 인쇄</button>
<%--                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="regPay.fn_popCamCrmList('crmSn0', 'crmNm0');">업체수정</button>--%>
                </span>
            </c:if>
            <div class="mt-20">
                <div class="text-right">
                    <c:if test='${!"user".equals(params.auth)}'>
                        <c:if test="${'rev'.equals(params.status) or 'in'.equals(params.status) or 're'.equals(params.status) or 'alt'.equals(params.status)}">
                            <button type="button" id="exnpAddBtn" style="display: none; font-size: 12px;" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPayDet.fn_exnpAdd()">
                                <span class="k-button-text">지출결의서 작성</span>
                            </button>
                        </c:if>
                    </c:if>
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="float: left" onclick="regPayDet.fn_budgetAll()">
                        <span class="k-button-text">예산비목 설정</span>
                    </button>
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPayDet.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>
                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <c:if test="${!'user'.equals(params.auth)}">
                            <c:if test="${'rev'.equals(params.status) or 'in'.equals(params.status) or 're'.equals(params.status) or 'alt'.equals(params.status)}">
                                <col style="width: 2%;">
                            </c:if>
                        </c:if>
                        <col style="width: 5%;">
                        <col id="reasonCol" style="width: 3%; display: none">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 4%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 3%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <c:if test="${!'user'.equals(params.auth)}">
                            <c:if test="${'rev'.equals(params.status) or 'in'.equals(params.status) or 're'.equals(params.status) or 'alt'.equals(params.status)}">
                                <th><input type="checkbox" id="checkAll" /></th>
                            </c:if>
                        </c:if>

                        <th>예산비목</th>
                        <th style="display:none;" id="reasonTh">내용</th>
                        <th style="display:none;">비용구분</th>
                        <th>증빙유형</th>
                        <th>상호</th>
                        <th>사업자(주민)번호</th>
                        <th>은행명</th>
                        <th>지급계좌</th>
                        <th>예금주</th>
                        <th>거래일</th>
                        <th>총액</th>
                        <th>공급가액</th>
                        <th>세액</th>
                        <th>신용카드</th>
                        <th>비고</th>
                        <th>명령</th>
                    </tr>
                    </thead>
                    <tbody id="payDestTb">
                    <tr class="payDestInfo newArray" id="pay0" style="text-align: center;">
                        <c:if test="${!'user'.equals(params.auth)}">
                            <c:if test="${'rev'.equals(params.status) or 'in'.equals(params.status) or 're'.equals(params.status) or 'alt'.equals(params.status)}">
                                <td><input type="checkbox" id="check0" class="check" /></td>
                            </c:if>
                        </c:if>
                        <td>
                            <span>
                                <input type="text" id="budgetNm0" dir="rtl" value="" onclick="regPay.fn_budgetPop(0)" style="width: 100%;text-align: right;" class="budgetNm">
                                <input type="hidden" id="budgetSn0" value="" class="budgetSn"/>
                                <input type="hidden" id="budgetAmt0" value="" class="budgetAmt"/>
                            </span>
                        </td>
                        <td class="reasonTr" style="display: none;">
                            <button type="button" id="reasonBtn0" value="0" class="k-button k-button-solid-base reasonBtn" onclick="regPay.fn_reasonClickModal(0)">내용</button>
                            <input type="hidden" id="reason0" class="reason" style="width: 100%">
                        </td>
                        <td style="display: none;">
                            <input id="appTeam0" class="appTeam" style="width: 100%">
                        </td>
                        <td>
                            <input type="hidden" id="payDestSn0" name="payDestSn" class="payDestSn">
                            <input type="text" id="eviType0" class="eviType" style="width: 100%">
                            <input type="hidden" id="fileNo0" class="fileNo">
                            <input type="hidden" id="authNo0" class="authNo" style="width: 100%">
                            <input type="hidden" id="authHh0" class="authHh" style="width: 100%">
                            <input type="hidden" id="authDd0" class="authDd" style="width: 100%">
                            <input type="hidden" id="issNo0" class="issNo">
                            <input type="hidden" id="coCd0" class="coCd">
                            <input type="hidden" id="taxTy0" class="taxTy">
                            <input type="hidden" id="expRate0" class="expRate">
                            <input type="hidden" id="taxRate0" class="taxRate">
                            <input type="hidden" id="payAmt0" class="payAmt">
                            <input type="hidden" id="incTax0" class="incTax">
                            <input type="hidden" id="locIncTax0" class="locIncTax">
                            <input type="hidden" id="subAmt0" class="subAmt">
                            <input type="hidden" id="actPayAmt0" class="actPayAmt">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer" id="plusIcon0"  onclick="regPayDet.fn_popRegDet(1, 0)"></i>
                            <input type="text" style="width: 70%" id="crmNm0" class="crmNm">
                            <input type="hidden" id="buySts0" value="" />
                            <input type="hidden" id="trCd0" class="trCd">
                        </td>
                        <td>
                            <input id="regNo0" class="regNo0" style="width: 100%">
                        </td>
                        <td>
                            <input type="text" id="crmBnkNm0" class="crmBnkNm">
                        </td>
                        <td>
                            <input type="text" id="crmAccNo0" class="crmAccNo">
                        </td>
                        <td>
                            <input type="text" id="crmAccHolder0" class="crmAccHolder">
                        </td>
                        <td>
                            <input type="text" id="trDe0" class="trDe">
                        </td>
                        <td>
                            <input type="text" id="totCost0" class="totCost" value="0" style="text-align: right" onchange="regPay.fn_changeAllCost()" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="supCost0" class="supCost" value="0" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="vatCost0" class="vatCost" value="0" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(3, 0)"></i>
                            <input type="text" style="width: 70%" disabled id="card0" class="card">
                            <input type="hidden" id="cardNo0" class="cardNo">
                        </td>
                        <td>
                            <input type="text" id="etc0" class="etc">
                        </td>
                        <td>
                            <div style="text-align: center">
                                <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(0)">삭제</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th id="footerLine" colspan="8" style="text-align: right; font-weight: bold">
                            합계
                        </th>
                        <td style="text-align: right; font-weight: bold">
                            <span id="totalAllCost">0</span> 원
                        </td>
                        <th colspan="5" style="text-align: right;">
                        </th>
                    </tr>
                    </tfoot>
                </table>

            </div>
        </div>
    </div>
</div>

<div id="dialog">
    <input type="text" id="reasonPopText" style="width: 80%" name="reasonPopText" value="">
    <input type="hidden" id="reasonIdx">
    <button type="button" id="updBtn" class="k-button k-button-solid-base" onclick="regPay.fn_updReason();">확인</button>
</div>

<div id="dialogRecall">
    <input type="text" id="reCallReason" style="width: 85%" name="reasonPopText" value="">
    <input type="hidden" id="reCallDocId" value="" >
    <button type="button" id="reCallConfrimBtn" class="k-button k-button-solid-base" onclick="regPay.fn_revertDet();">반려</button>
</div>

<div id="dialogDraft" style="text-align: center">
    <table class="popTable table table-bordered mb-0" id="userReqPopImageTable" style="width: 100%">
        <colgroup>
            <col width="15%">
            <col width="35%">
            <col width="15%">
            <col width="35%">
        </colgroup>
        <thead>
        <tr id="row1">
            <th colspan="4" style="text-align: center;">
                <span>
                    법인 자금집행 기준에 따른 본 지급신청의 지출예정일은 <br>
                    [<span style="color: red; font-weight: bold" id="payExnpDeText"></span>] 입니다.<br>
                    위 일자에 지출할 경우 문서번호를 생성하세요.<br>
                </span>
            </th>
        </tr>
        <tr style="display:none;" id="row2">
            <th>지출요청일</th>
            <td colspan="3">
                <input type="text" id="reqDe" style="width: 80%" name="reqDe" value="">
            </td>
            <th style="display:none">지출예정일</th>
            <td style="display:none">
                <input type="text" id="payExnpDe" style="width: 80%" name="payExnpDe" value="">
                <input type="hidden" id="tmpPayDe" />
            </td>
        </tr>
        <tr style="display:none;" id="row3">
            <th>사유</th>
            <td colspan="3">
                <input type="text" id="exnpIss" style="width: 80%" name="exnpIss" value="">
            </td>
        </tr>
        </thead>
    </table>
<%--    <button type="button" onclick="regPay.fn_save('user')" id="modalSaveBtn" class="k-button k-button-solid-info" style="float: right; margin-left: 5px; margin-top:8px; font-size: 12px; display: none;">저장</button>--%>

    <span id="apprBtnBox">
        <button type="button" onclick="regPay.payAppDrafting()" class="k-button k-button-solid-info" style="float: right; margin-top:8px; font-size: 12px;">상신</button>
    </span>
    <button type="button" class="k-button k-button-solid-base" id="changeBtn" style="float: right; margin-top:8px; margin-right: 5px; font-size: 12px;" onclick="regPay.fn_exnpDeChange()">지출예정일 변경</button>
</div>

<script type="text/javascript">
    regPayDet.fn_defaultScript();
    regPay.fn_defaultScript();

    $("#dialog").kendoWindow({
        title: "내용",
        visible : false,
        resizable: false,
        modal: true,
        width: 500,
        scrollable : false,
        actions: ["Close"],
    });

    $("#dialogRecall").kendoWindow({
        title: "반려사유",
        visible : false,
        resizable: false,
        modal: true,
        width: 500,
        scrollable : false,
        actions: ["Close"],
    });

    $("#dialogDraft").kendoWindow({
        title: "지출예정일 확인",
        visible : false,
        resizable: false,
        modal: true,
        width: 700,
        scrollable: false,
        actions: ["Close"],
    });


    if($("#stat").val() == "v"){
        $("input[type='text'], input[type='radio']").prop("disabled", true);

        $("#delRowBtn0, #addBtn, #pjtSelBtn, #file1Label, #file2Label, .crmSelBtn").css("display", "none");
        $(".crmNm").css("width", "100%");
        var len = $("#purcItemTb > tr").length;

        for(var i = 0 ; i < len ; i++){
            $("#purcItemType" + i).data("kendoDropDownList").enable(false);
            $("#productA" + i).data("kendoDropDownList").enable(false);
            $("#productB" + i).data("kendoDropDownList").enable(false);
            $("#productC" + i).data("kendoDropDownList").enable(false);
        }
    }
    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function selectProject(sn, nm, cd, baseYear, busnNm){
        /** 이전 프로젝트와 현재 프로젝트가 다르면 예산비목 초기화 */
        if($("#pjtCd").val() != "" && $("#pjtCd").val() != cd){
            fn_selBudgetInfo("", "", "all", "");
        }

        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
        $("#baseYear").val(baseYear);
        $("#busnNm").val(busnNm);

        var data = {
            pjtCd : (cd || ""),
            PJT_CD : (cd || "")
        }

        if(cd != null){
            var g20Result = customKendo.fn_customAjax("/mng/getG20ProjectData", data);
            var g20PjtData = g20Result.data;
            if(g20PjtData != null && Object.entries(g20PjtData).length != 0 && g20PjtData.PJT_NM != null){
                $("#pjtNm").val(g20PjtData.PJT_NM);
            }
        }


        if(cd.substring(0, 1) == "M" || (cd.substring(0, 1) == "Z" && busnNm == "") && !(cd == "Za9g923011" || cd == "Za9g923012")) {
            $("#reasonTh").css("display", "none");
            $(".reasonTr").css("display", "none");
            $("#reasonCol").css("display", "none");
            $("#footerLine").attr("colspan", "8");
            $("#reasonContTr").css("display", "");
        } else {
            $("#reasonTh").css("display", "");
            $(".reasonTr").css("display", "");
            $("#reasonCol").css("display", "");
            $("#reasonContTr").css("display", "none");
            $("#footerLine").attr("colspan", "9");
        }
        var result = customKendo.fn_customAjax("/project/getBankData", data);
        var rs = result.data;

        if(rs != null && Object.entries(rs).length != 0){
            $("#accNm").val(rs.TR_NM);
            $("#bnkSn").val(rs.TR_CD);
            $("#accNo").val(rs.BA_NB);
            $("#bnkNm").val(rs.JIRO_NM);
        } else {
            var data = {
                frPjtSn : sn
            }

            $.ajax({
                url : "/mng/getManageDepo",
                data : data,
                type : "post",
                dataType : "json",
                success : function(rs){
                    var rsult = rs.rsult;

                    if(rsult != null) {
                        var result2 = customKendo.fn_customAjax("/project/getBankData", {pjtCd : rsult.PJT_CD});
                        var rs2 = result2.data;

                        $("#accNm").val(rs2.TR_NM);
                        $("#bnkSn").val(rs2.TR_CD);
                        $("#accNo").val(rs2.BA_NB);
                        $("#bnkNm").val(rs2.JIRO_NM);
                    }
                }
            });
        }

        data.pjtSn = cd;
        const bgtInfo = customKendo.fn_customAjax("/mng/getProjectBgtList", data);
        const bgtList = bgtInfo.list;

        console.log("bgtList : ", bgtList);
        if(bgtList.length != 0){
            regPay.global.bgtArr = bgtList;
        }
    }
</script>
</body>
</html>