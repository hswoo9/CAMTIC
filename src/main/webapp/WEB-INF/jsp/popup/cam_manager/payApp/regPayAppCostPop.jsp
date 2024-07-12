<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regPayAppCostPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>


<form id="payAppDraftFrm" method="post">
    <input type="hidden" id="payAppSn" name="payAppSn" value="${params.payAppSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="payApp">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="status" name="status" value="${params.status}" />
<input type="hidden" id="auth" name="auth" value="${params.auth}" />

<input type="hidden" id="loginDeptSeq" value="${loginVO.orgnztId}" />
<input type="hidden" id="reqType" value="${params.reqType}" />
<input type="hidden" id="partRatePjtSn" value="${params.pjtSn}" />
<input type="hidden" id="bsYm" value="${params.bsYm}" />
<input type="hidden" id="claimSn" value="${params.claimSn}" />
<input type="hidden" id="purcSn" value="${params.purcSn}" />
<input type="hidden" id="hrBizReqResultId" value="${params.hrBizReqResultId}" />
<input type="hidden" id="docStatus" value=""/>

<input type="hidden" id="g20BudgetAmt" value="" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <c:if test='${params.status == "rev"}'>지급신청서</c:if>
                    <c:if test='${params.status == "in"}'>여입신청서</c:if>
                    <c:if test='${params.status == "re"}'>반납신청서</c:if>
                    <c:if test='${params.status == "alt"}'>대체신청서</c:if>
                    <c:if test='${params.status == "" or params.status == null}'>
                        <c:if test='${!"".equals(params.claimSn) or params.claimSn != null}'>지급</c:if>신청서
                    </c:if>
                    <span id="titleStat">작성</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="costProcess.fn_save();">저장</button>
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
                    <td colspan="2">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="pjtCd" value="${pjtData.PJT_CD}" />
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="costProcess.fn_projectPop('regPay')">검색</button>
                        </span>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>지출요청일</th>
                    <td colspan="2">
                        <input type="text" id="reqDe" style="width: 40%" />
                    </td>
                </tr>
<%--                <tr>--%>
<%--                    <th scope="row" class="text-center th-color">예산비목</th>--%>
<%--                    <td colspan="4">--%>
<%--                        <span>--%>
<%--                            <input type="text" id="budgetNm" disabled value=""  style="width: 40%;">--%>
<%--                            <input type="hidden" id="budgetSn" value="" />--%>
<%--                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="costProcess.fn_budgetPop()">검색</button>--%>
<%--                        </span>--%>
<%--                    </td>--%>
<%--                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>신청건명</th>
                    <td colspan="4">
                        <input type="text" id="appTitle" style="width: 100%;">
                    </td>
                </tr>
                <tr>
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
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="costProcess.fn_bankPop()">검색</button>
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
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td colspan="4">
                        <div>
                            <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regPayDet.fn_regPayAttPop()">첨부</button>
                        </div>
                    </td>
                </tr>
                </thead>
            </table>


            <span id="totalPay" style="float: right; font-size: 16px; font-weight: bold; display: none; height: 35px;margin-top: 10px;">총 금액 : </span>
            <c:if test="${params.stat == 'v'}">
                <span id="claimGroup" style="font-size:12px;">
                    <button type="button" style="top:15px;" class="k-button k-button-solid-info" onclick="costProcess.fn_reqClaiming()">청구서작성</button>
                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="costProcess.fn_printEst()">견적요청서 인쇄</button>
                </span>
            </c:if>
            <div class="mt-20">
                <div class="text-right">
                    <c:if test='${!"user".equals(params.auth)}'>
                        <button type="button" id="exnpAddBtn" style="display: none; font-size: 12px;" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPayDet.fn_exnpAdd()">
                            <span class="k-button-text">지출결의서 작성</span>
                        </button>
                    </c:if>
                </div>
                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col style="width: 5%;">
                        <col id="reasonCol" style="width: 3%; display: none">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 3%;">
                    </colgroup>
                    <thead>
                    <tr>
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
                        <td>
                            <span>
                                <input type="text" id="budgetNm0" value="" onclick="costProcess.fn_budgetPop(0)" style="width: 100%;">
                                <input type="hidden" id="budgetSn0" value="" class="budgetSn"/>
                                <input type="hidden" id="budgetAmt0" value="" />
                            </span>
                        </td>
                        <td class="reasonTr" style="display: none;">
                            <button type="button" id="reasonBtn0" value="0" class="k-button k-button-solid-base reasonBtn" onclick="costProcess.fn_reasonClickModal(0)">내용</button>
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
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(1, 0)"></i>
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
                            <input type="text" id="totCost0" class="totCost" value="0" style="text-align: right">
                        </td>
                        <td>
                            <input type="text" id="supCost0" class="supCost" value="0" style="text-align: right">
                        </td>
                        <td>
                            <input type="text" id="vatCost0" class="vatCost" value="0" style="text-align: right">
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
                        <th id="footerLine" colspan="9" style="text-align: right; font-weight: bold">
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
    <button type="button" id="updBtn" class="k-button k-button-solid-base" onclick="costProcess.fn_updReason();">확인</button>
</div>


<script type="text/javascript">
    regPayDet.fn_defaultScript();
    costProcess.fn_defaultScript();

    $("#dialog").kendoWindow({
        title: "내용",
        visible : false,
        resizable: false,
        modal: true,
        width: 500,
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

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);

        var data = {
            pjtCd : cd
        }

        console.log(cd.substring(0, 1));
        if(cd.substring(0, 1) == "R" || cd.substring(0, 1) == "S") {
            $("#reasonTh").css("display", "");
            $(".reasonTr").css("display", "");
            $("#reasonCol").css("display", "");
        } else {
            $("#reasonTh").css("display", "none");
            $(".reasonTr").css("display", "none");
            $("#reasonCol").css("display", "none");
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
</script>
</body>
</html>