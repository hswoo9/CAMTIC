<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/regPurcReqPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>
<input type="hidden" id="stat" value="${params.stat}" />

<form id="purcDraftFrm" method="post">
    <input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="purc">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    구매요청서
                    <c:if test="${params.stat != 'v'}">
                        작성
                    </c:if>
                </span>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="prp.setPurcReq('W');">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="purcReqEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="purcReqDeptSeq" value="${loginVO.orgnztId}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">요청일자</th>
                    <td>
                        <input type="text" id="purcReqDate" style="width: 22%;">
                    </td>
                    <th scope="row" class="text-center th-color">문서번호</th>
                    <td>
                        <div id="docNo" style="margin-top:3px;"></div>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">요청자</th>
                    <td id="purcReqEmpName">
                        ${loginVO.name}
                    </td>
                    <th scope="row" class="text-center th-color">요청부서</th>
                    <td id="purcReqDeptName">
                        ${loginVO.orgnztNm}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">요청목적</th>
                    <td colspan="3">
                        <input type="text" id="purcReqPurpose" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">구매구분</th>
                    <td colspan="3">
                        <span id="purcType"></span>
                    </td>
                </tr>
                <tr id="project" style="display: none;">
                    <th scope="row" class="text-center th-color">프로젝트</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="pjtNm" style="width: 40%;">
                            <input type="hidden" id="pjtSn" />
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="prp.fn_projectPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">견적서 파일</th>
                    <td colspan="3">
                        <input type="hidden" id="file1Sn" name="file1Sn">
                        <label for="file1" id="file1Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file1" name="file1" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file1Name"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">요청서 파일</th>
                    <td colspan="3">
                        <input type="hidden" id="file2Sn" name="file1Sn">
                        <label for="file2" id="file2Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file2" name="file2" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file2Name"></span>
                    </td>
                </tr>
                </thead>
            </table>


            <span id="totalPay" style="float: right; font-size: 16px; font-weight: bold; display: none; height: 35px;margin-top: 10px;">총 금액 : </span>
            <c:if test="${params.stat == 'v'}">
                <span id="claimGroup" style="font-size:12px;">
                    <button type="button" style="top:15px;" class="k-button k-button-solid-info" onclick="prp.fn_reqClaiming()">청구서작성</button>
                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="prp.fn_printEst()">견적요청서 인쇄</button>
<%--                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="prp.fn_popCamCrmList('crmSn0', 'crmNm0');">업체수정</button>--%>
                </span>
            </c:if>
            <div class="mt-20">
                <div class="text-right">
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.addRow()">
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
                            <input type="text" id="purcItemUnitPrice0" style="text-align: right" class="purcItemUnitPrice" onkeyup="prp.fn_calc(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemQty0" style="text-align: right" class="purcItemQty" onkeyup="prp.fn_calc(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
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
                            <button type="button" id="crmSelBtn0" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.fn_popCamCrmList('crmSn0', 'crmNm0');">업체선택</button>
                        </td>
                        <td>
                            <input type="text" id="rmk0" class="rmk">
                        </td>
                        <c:if test="${params.stat == 'v'}">
                            <td id="itemStatus0">
                                <button type="button" id="retBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.fn_retItem(0)">
                                    반려
                                </button>
                            </td>
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <td>
                                <button type="button" id="delRowBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.delRow(this)">
                                    삭제
                                </button>
                            </td>
                        </c:if>
                    </tr>
                    </tbody>
                </table>

                <input type="hidden" id="crmSn" onchange="prp.crmInfoChange()">
                <input type="hidden" id="crmNm">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    prp.fn_defaultScript();

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