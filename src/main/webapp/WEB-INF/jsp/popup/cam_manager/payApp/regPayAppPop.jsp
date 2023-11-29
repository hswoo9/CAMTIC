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
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<form id="payAppDraftFrm" method="post">
    <input type="hidden" id="payAppSn" name="payAppSn" value="${params.payAppSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="payApp">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="status" name="status" value="${params.status}" />
<input type="hidden" id="auth" name="auth" value="${params.auth}" />

<input type="hidden" id="reqType" value="${params.reqType}" />
<input type="hidden" id="partRatePjtSn" value="${params.pjtSn}" />
<input type="hidden" id="bsYm" value="${params.bsYm}" />
<input type="hidden" id="claimSn" value="${params.claimSn}" />

<input type="hidden" id="docStatus" value=""/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <c:if test='${params.status == "rev"}'>지급신청서</c:if>
                    <c:if test='${params.status == "in"}'>여입신청서</c:if>
                    <c:if test='${params.status == "re"}'>반납신청서</c:if>
                    <c:if test='${params.status == "alt"}'>대체신청서</c:if>
                    <c:if test='${params.status == "" || params.status == null}'>
                        <c:if test='${params.claimSn != "" && params.claimSn != null}'>지급</c:if>
                        신청서
                    </c:if>
                    <span id="titleStat">작성</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regPay.fn_save();">저장</button>
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
                    <th scope="row" class="text-center th-color">신청유형</th>
                    <td colspan="2">
                        <span id="payAppType"></span>
                    </td>
                    <th scope="row" class="text-center th-color">신청일자</th>
                    <td colspan="2">
                        <input type="text" id="appDe" style="width: 40%">
                    </td>
                </tr>
                <tr id="project">
                    <th scope="row" class="text-center th-color">사업명</th>
                    <td colspan="2">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="pjtCd" value="${pjtData.PJT_CD}" />
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regPay.fn_projectPop('regPay')">검색</button>
                        </span>
                    </td>
                    <th scope="row" class="text-center th-color">지출요청일</th>
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
<%--                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regPay.fn_budgetPop()">검색</button>--%>
<%--                        </span>--%>
<%--                    </td>--%>
<%--                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">신청건명</th>
                    <td colspan="2">
                        <input type="text" id="appTitle" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">비용구분</th>
                    <td colspan="2">
                        <input type="text" id="appTeam" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청내용</th>
                    <td colspan="4">
                        <textarea type="text" id="appCont" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3" scope="row" class="text-center th-color" id="trBank">출금계좌</th>
                    <th style="width: 10%">계좌명</th>
                    <td colspan="3">
                        <input type="text" id="accNm" disabled style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="regPay.fn_bankPop()">검색</button>
                        <input type="hidden" id="bnkSn">
                    </td>
                </tr>
                <tr>
                    <th>계좌번호</th>
                    <td colspan="3">
                        <input type="text" id="accNo" disabled style="width: 60%;">
                    </td>
                </tr>
                <tr>
                    <th>은행명</th>
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
                        <button type="button" id="exnpAddBtn" style="display: none" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPayDet.fn_exnpAdd()">
                            <span class="k-button-text">지출결의서 작성</span>
                        </button>
                    </c:if>
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPayDet.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <c:if test="${!'user'.equals(params.auth)}">
                            <c:if test="${'rev'.equals(params.status) or 'in'.equals(params.status) or 're'.equals(params.status) or 'alt'.equals(params.status)}">
                                <col style="width: 3%;">
                            </c:if>
                        </c:if>
                        <col style="width: 5%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <c:if test="${'rev'.equals(params.status) or params.claimSn != ''}">
                            <col style="width: 3%;">
                            <col style="width: 3%;">
                        </c:if>
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
                        <th>증빙유형</th>
                        <th>상호</th>
                        <th>은행명</th>
                        <th>지급계좌</th>
                        <th>예금주</th>
                        <th>거래일</th>
                        <th>총액</th>
                        <th>공급가액</th>
                        <th>세액</th>
                        <th>신용카드</th>
                        <th>비고</th>
                        <th>관련근거</th>
                        <c:if test="${'rev'.equals(params.status) or params.claimSn != ''}">
                            <th>선지급</th>
                            <th>첨부파일</th>
                        </c:if>
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
                                <input type="text" id="budgetNm0" value="" onclick="regPay.fn_budgetPop(0)" style="width: 100%;">
                                <input type="hidden" id="budgetSn0" value="" class="budgetSn"/>
                            </span>
                        </td>
                        <td>
                            <input type="hidden" id="payDestSn0" name="payDestSn" class="payDestSn">
                            <input type="text" id="eviType0" class="eviType" style="width: 100%">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(1, 0)"></i>
                            <input type="text" style="width: 70%" id="crmNm0" class="crmNm">
                            <input type="hidden" id="trCd0" class="trCd">
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
                            <input type="text" id="totCost0" class="totCost" value="0" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="supCost0" class="supCost" value="0" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="vatCost0" class="vatCost" value="0" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
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
                            <input type="text" id="iss0" class="iss">
                        </td>
                        <c:if test="${'rev'.equals(params.status) or params.claimSn != ''}">
                            <td>
                                <input type="checkbox" id="advances0" class="advances" style="width: 26px; height: 26px;">
                            </td>
                            <td>
                                <div style="text-align: center">
                                    <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regPayDet.fn_regPayAttPop(0)">첨부</button>
                                </div>
                            </td>
                        </c:if>
                        <td>
                            <div style="text-align: center">
                                <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(0)">삭제</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    regPayDet.fn_defaultScript();
    regPay.fn_defaultScript();

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

    function selectProject(sn, nm, cd){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);

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
</script>
</body>
</html>