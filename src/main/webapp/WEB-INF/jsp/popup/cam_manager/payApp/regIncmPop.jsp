<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regIncmPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<form id="payIncpDraftFrm" method="post">
    <input type="hidden" id="payIncpSn" name="payIncpSn" value="${params.payIncpSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="incp">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="status" name="status" value="${params.status}" />
<input type="hidden" id="payDepoSn" name="payDepoSn" value="${params.payDepoSn}" />
<input type="hidden" id="taxType" name="taxType" value="" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    수입결의서
                    <span id="titleStat">작성</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 12px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regIncm.fn_save();">저장</button>
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
                <tr id="project">
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업명</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.AFT_PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.AFT_PJT_SN}" />
                            <input type="hidden" id="pjtCd" name="pjtCd" value="${pjtData.AFT_PJT_CD}">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regIncm.fn_projectPop('incm')">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>예산비목</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="budgetNm" disabled value=""  style="width: 40%;">
                            <input type="hidden" id="budgetSn" value="" />
                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regIncm.fn_budgetPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">결의일자</th>
                    <td colspan="2">
                        <input type="text" id="appDe" style="width: 30%">
                    </td>
                    <th scope="row" class="text-center th-color">결의자/부서</th>
                    <td>
                        <span>
                            <input type="text" id="exnpEmpNm" disabled value="${loginVO.name}"  style="width: 20%;">
                            <input type="hidden" id="g20EmpCd" value="${g20.EMP_CD}" />
                            <input type="hidden" id="exnpEmpSeq" value="${loginVO.uniqId}" />
                            <input type="hidden" id="exnpDeptNm" disabled value="${loginVO.orgnztNm}"  style="display: none;">
                            <input type="hidden" id="exnpDeptSeq" value="${loginVO.orgnztId}" />
                            <input type="text" id="g20DeptCd" value="${g20.DEPT_CD}" style="width: 40%;" disabled />
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">사업장</th>
                    <td colspan="2">
                        <input type="text" id="busnCd" style="width: 30%;">
                    </td>
                    <th scope="row" class="text-center th-color">전표회계단위</th>
                    <td>
                        <input type="text" id="busnExCd" style="width: 30%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>적요</th>
                    <td colspan="4">
                        <input type="text" id="appCont" style="width: 100%;"/>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3" scope="row" class="text-center th-color"><span class="red-star">*</span>입금계좌</th>
                    <th style="width: 10%">계좌명</th>
                    <td colspan="3">
                        <input type="text" id="accNm" disabled style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="regIncm.fn_bankPop()">검색</button>
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
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">반납결의서</th>
                    <td colspan="4">

                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td colspan="2">
                        <div>
                            <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regIncm.fn_regIncmAttPop()">첨부</button>
                            <span id="fileText"></span>
                        </div>
                    </td>
                    <th scope="row" class="text-center th-color">입금예정일</th>
                    <td colspan="2">
                        <input type="text" id="payIncpDe" style="width: 30%">
                    </td>
                </tr>
                </thead>
            </table>


            <table class="popTable table table-bordered mb-0" id="reIncpTable" style="display: none;">
                <colgroup>
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                </colgroup>
                <thead>
                <tr>
                    <th>총액</th>
                    <th>반제결의 승인금액</th>
                    <th>반제결의 대기금액</th>
                    <th>잔액</th>
                </tr>
                </thead>
                <tbody id="reIncpBody">

                </tbody>
            </table>

            <span id="totalPay" style="float: right; font-size: 16px; font-weight: bold; display: none; height: 35px;margin-top: 10px;">총 금액 : </span>
            <c:if test="${params.stat == 'v'}">
                <span id="claimGroup" style="font-size:12px;">
                    <button type="button" style="top:15px;" class="k-button k-button-solid-info" onclick="regIncm.fn_reqClaiming()">청구서작성</button>
                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="regIncm.fn_printEst()">견적요청서 인쇄</button>
<%--                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="regIncm.fn_popCamCrmList('crmSn0', 'crmNm0');">업체수정</button>--%>
                </span>
            </c:if>
            <div class="mt-20">
                <div class="text-right">
                    <button type="button" id="exnpAddBtn" style="display: none" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regIncmDet.fn_exnpAdd()">
                        <span class="k-button-text">지출결의서 작성</span>
                    </button>
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regIncmDet.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <c:if test="${'rev'.equals(params.status)}">
                            <col style="width: 3%;">
                        </c:if>
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 5%; display: none">
                        <col style="width: 3%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <c:if test="${'rev'.equals(params.status)}">
                            <th><input type="checkbox" id="checkAll" /></th>
                        </c:if>
                        <th>증빙유형</th>
                        <th>상호</th>
                        <th>사업자등록번호</th>
                        <th>대표자명</th>
                        <th>비고</th>
                        <th>거래일</th>
                        <th>총액</th>
                        <th>공급가액</th>
                        <th>세액</th>
                        <th>신용카드</th>
                        <th style="display: none;">반제결의</th>
                        <th>명령</th>
                    </tr>
                    </thead>
                    <tbody id="payDestTb">
                    <tr class="payDestInfo newArray" id="pay0" style="text-align: center;">
                        <c:if test="${'rev'.equals(params.status)}">
                            <td><input type="checkbox" id="check0" class="check" /></td>
                        </c:if>
                        <td>
                            <input type="hidden" id="payDestSn0" name="payDestSn" class="payDestSn">
                            <input type="text" id="eviType0" class="eviType" style="width: 100%">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer" id="plusIcon0"  onclick="regIncmDet.fn_popRegDet(1, 0)"></i>
                            <input type="text" style="width: 70%" id="crmNm0" class="crmNm">
                            <input type="hidden" id="trCd0" class="trCd">
                        </td>
                        <td>
                            <input type="text" id="regNo0" class="regNo">
                        </td>
                        <td>
                            <input type="text" id="ceoNm0" class="ceoNm">
                        </td>
                        <td>
                            <input type="text" id="etc0" class="etc">
                        </td>
                        <td>
                            <input type="text" id="trDe0" class="trDe">
                        </td>
                        <td>
                            <input type="text" id="totCost0" class="totCost" value="0" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="supCost0" class="supCost" value="0" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="vatCost0" class="vatCost" value="0" style="text-align: right" onkeyup="regIncm.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer" id="pIcon0"  onclick="regIncmDet.fn_popRegDet(7, 0)"></i>
                            <input type="text" style="width: 80%" disabled id="card0" class="card">
                            <input type="hidden" id="cardNo0" class="cardNo">
                        </td>
                        <td style="display: none;">
                            <input type="text" id="iss0" class="iss" style="display: none;">
                        </td>
                        <td>
                            <div style="text-align: center">
                                <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regIncmDet.delRow(0)">삭제</button>
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
    regIncmDet.fn_defaultScript();
    regIncm.fn_defaultScript();

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

        var result = customKendo.fn_customAjax("/project/getBankData", data);
        var rs = result.data;

        if(rs != null){
            $("#accNm").val(rs.TR_NM);
            $("#bnkSn").val(rs.TR_CD);
            $("#accNo").val(rs.BA_NB);
            $("#bnkNm").val(rs.JIRO_NM);
        }

        if(cd.substring(0, 1) == "M"){
            $("#busnCd").data("kendoDropDownList").select(1)
            $("#busnExCd").data("kendoDropDownList").select(1)
        }
    }
</script>
</body>
</html>