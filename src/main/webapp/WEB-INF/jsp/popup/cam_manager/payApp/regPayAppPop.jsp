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

<form id="purcDraftFrm" method="post">
    <input type="hidden" id="purcSn" name="payAppSn" value="${params.payAppSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="purc">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    지급신청서 작성
                </span>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regPay.setPayApp();">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="regDeptSeq" value="${loginVO.orgnztId}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청유형</th>
                    <td>
                        <span id="payAppType"></span>
                    </td>
                    <th scope="row" class="text-center th-color">신청일자</th>
                    <td>
                        <input type="text" id="appDe" style="width: 20%">
                    </td>
                </tr>
                <tr id="project">
                    <th scope="row" class="text-center th-color">사업명</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regPay.fn_projectPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">예산비목</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="budgetNm" disabled value=""  style="width: 40%;">
                            <input type="hidden" id="budgetSn" value="" />
                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regPay.fn_budgetPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청건명</th>
                    <td colspan="3">
                        <input type="text" id="appTitle" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">신청내용</th>
                    <td colspan="3">
                        <textarea type="text" id="appCont" style="width: 100%;"></textarea>
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
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPay.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <c:if test="${params.stat == 'v'}">
                            <col style="width: 3%;">
                        </c:if>
                        <col style="width: 480px;">
                        <col>
                        <col style="width: 6%;">
                        <col style="width: 8%;">
                        <col style="width: 5%;">
                        <col style="width: 4%;">
                        <col style="width: 10%;">
                        <c:if test="${params.stat == 'v'}">
                            <col style="width: 10%;">
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <col style="width: 15%;">
                        </c:if>
                        <col style="width: 5%;">
                        <c:if test="${params.stat == 'v'}">
                            <col style="width: 3%">
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <col style="width: 3%">
                        </c:if>
                    </colgroup>
                    <thead>
                    <tr>
                        <c:if test="${params.stat == 'v'}">
                            <th>
                                <input type="checkbox" id="checkAll" class="k-checkbox" style="margin-left: 2px;" />
                            </th>
                        </c:if>
                        <th>구분</th>
                        <th>품명</th>
                        <th>규격</th>
                        <th>단가</th>
                        <th>수량</th>
                        <th>단위</th>
                        <th>금액</th>
                        <th>업체명</th>
                        <th>비고</th>
                        <c:if test="${params.stat == 'v'}">
                            <th>상태</th>
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <th>삭제</th>
                        </c:if>
                    </tr>
                    </thead>
                    <tbody id="purcItemTb">
                    <tr class="purcItemInfo newArray" id="item0">
                        <c:if test="${params.stat == 'v'}">
                            <td>
                                <input type="checkbox" id="check0" class="childCheck k-checkbox" style="margin-left: 3px;" value="0" />
                            </td>
                        </c:if>
                        <td>
                            <input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn">
                            <input type="text" id="purcItemType0" class="purcItemType" style="width: 110px">
                            <input type="text" id="productA0" class="productA" style="width: 110px">
                            <input type="text" id="productB0" class="productB" style="width: 110px; display: none">
                            <input type="text" id="productC0" class="productC" style="width: 110px; display: none">
                        </td>
                        <td>
                            <input type="text" id="purcItemName0" class="purcItemName">
                        </td>
                        <td>
                            <input type="text" id="purcItemStd0" class="purcItemStd">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnitPrice0" style="text-align: right" class="purcItemUnitPrice" onkeyup="regPay.fn_calc(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemQty0" style="text-align: right" class="purcItemQty" onkeyup="regPay.fn_calc(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnit0" class="purcItemUnit">
                        </td>
                        <td>
                            <input type="text" id="purcItemAmt0" class="purcItemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="hidden" id="crmSn0" class="crmSn">
                            <input type="text" id="crmNm0" disabled class="crmNm" style="width: 60%">
                            <button type="button" id="crmSelBtn0" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPay.fn_popCamCrmList('crmSn0', 'crmNm0');">업체선택</button>
                        </td>
                        <td>
                            <input type="text" id="rmk0" class="rmk">
                        </td>
                        <c:if test="${params.stat == 'v'}">
                            <td id="itemStatus0">
                                <button type="button" id="retBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="regPay.fn_retItem(0)">
                                    반려
                                </button>
                            </td>
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <td>
                                <button type="button" id="delRowBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="regPay.delRow(this)">
                                    삭제
                                </button>
                            </td>
                        </c:if>
                    </tr>
                    </tbody>
                </table>

                <input type="hidden" id="crmSn" onchange="regPay.crmInfoChange()">
                <input type="hidden" id="crmNm">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
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

    function selectProject(sn, nm){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
    }
</script>
</body>
</html>