<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regExnpPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regPayAppPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>
<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>
<form id="payAppDraftFrm" method="post">
    <input type="hidden" id="exnpSn" name="exnpSn" value="${params.exnpSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="exnp">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="teamSeq" value="${loginVO.orgnztId}" />
<input type="hidden" id="item" name="item" value="${params.item}">
<input type="hidden" id="payAppSn" name="payAppSn" value="${params.payAppSn}">
<input type="hidden" id="payIncpSn" name="payIncpSn" value="${params.payIncpSn}">
<input type="hidden" id="status" name="status" value="${params.status}" />
<input type="hidden" id="mode" name="mode" value="" />
<input type="hidden" id="docMode" value="${params.docMode}" />

<input type="hidden" id="detArr" value="${params.detArr}" />
<input type="hidden" id="regFlag" value="${params.regFlag}" />
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <c:if test='${params.status == "rev"}'>지출결의서</c:if>
                    <c:if test='${params.status == "in"}'>여입결의서</c:if>
                    <c:if test='${params.status == "re"}'>반납결의서</c:if>
                    <c:if test='${params.status == "alt"}'>대체결의서</c:if>
                    <span id="titleStat">작성</span>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regExnp.fn_save();">저장</button>
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
                    <th scope="row" class="text-center th-color">결의일자</th>
                    <td colspan="2">
                        <input type="text" id="exnpDe" style="width: 40%">
                    </td>
                </tr>
                <tr id="project">
                    <th scope="row" class="text-center th-color">사업명</th>
                    <td colspan="2">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.PJT_NM}"  style="width: 80%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="pjtCd" name="pjtCd">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regExnp.fn_projectPop()">검색</button>
                        </span>
                    </td>
                    <th scope="row" class="text-center th-color">결의자/부서</th>
                    <td colspan="2">
                        <span>
                            <input type="text" id="exnpEmpNm" disabled value="${loginVO.name}"  style="width: 20%;">
                            <input type="hidden" id="g20EmpCd" value="${g20.EMP_CD}" />
                            <input type="hidden" id="exnpEmpSeq" value="${loginVO.uniqId}" />
                            <input type="text" id="exnpDeptNm" disabled value="${loginVO.orgnztNm}"  style="width: 30%;">
                            <input type="hidden" id="exnpDeptSeq" value="${loginVO.orgnztId}" />
                            <input type="hidden" id="g20DeptCd" value="${g20.DEPT_CD}" />
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">사업장</th>
                    <td colspan="2">
                        <input type="text" id="busnCd" style="width: 15%;">
                    </td>
                    <th scope="row" class="text-center th-color">예산비목</th>
                    <td colspan="2">
                        <input type="text" id="budgetNm" value="" onclick="regExnp.fn_budgetPop('N')"  style="width: 100%;">
                        <input type="hidden" id="budgetSn" value="" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">적요</th>
                    <td colspan="4">
                        <input type="text" id="exnpBriefs" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">추가적요<br>(G20연동 안됨)</th>
                    <td colspan="4">
                        <textarea type="text" id="addExnpBriefs" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3" scope="row" id="trBank" class="text-center th-color">출금계좌</th>
                    <th style="width: 10%">계좌명</th>
                    <td colspan="3">
                        <input type="text" id="accNm" disabled style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="regExnp.fn_bankPop()">검색</button>
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
                    <th scope="row" class="text-center th-color">지출 날짜 설정</th>
                    <td colspan="4">
                        지출요청일 : <input id="reqDe" style="width: 150px">&nbsp;
                        지출예정일 : <input id="reqExDe" style="width: 150px">&nbsp;
                        지출완료일 : <input id="reqEndDe" style="width: 150px">&nbsp;
                    </td>
                </tr>
                <tr id="dtTr">
                    <th scope="row" class="text-center th-color">결의서 날짜 설정</th>
                    <td colspan="4">
                        회계발의일 : <input id="DT1" style="width: 150px">&nbsp;
                        등기일자 : <input id="DT2" style="width: 150px">&nbsp;
                        지출부기재 일자 : <input id="DT3" style="width: 150px">&nbsp;
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td colspan="4">
                        <div>
                            <button type="button" class="k-button k-button-solid-base" id="attBtn" onclick="regExnpDet.fn_regPayAttPop()">첨부</button>
                            <span id="fileText"></span>
                        </div>
                    </td>
                </tr>
                </thead>
            </table>


            <span id="totalPay" style="float: right; font-size: 16px; font-weight: bold; display: none; height: 35px;margin-top: 10px;">총 금액 : </span>
            <c:if test="${params.stat == 'v'}">
                <span id="claimGroup" style="font-size:12px;">
                    <button type="button" style="top:15px;" class="k-button k-button-solid-info" onclick="regExnp.fn_reqClaiming()">청구서작성</button>
                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="regExnp.fn_printEst()">견적요청서 인쇄</button>
<%--                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="regExnp.fn_popCamCrmList('crmSn0', 'crmNm0');">업체수정</button>--%>
                </span>
            </c:if>
            <div class="mt-20">
                <div class="text-right" id="addBtnDiv" style="display: none;">
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regExnpDet.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>
                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <c:if test="${params.exnpSn == null and params.exnpSn == ''}">
                            <c:if test="${'rev'.equals(params.status)}">
                                <col style="width: 3%;">
                            </c:if>
                        </c:if>

                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 6%;">
                        <col style="width: 4%;">
                        <col style="width: 4%;">
                        <col style="width: 4%;">
                        <col style="width: 4%;">
                        <col style="width: 6%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 4%;">
                        <col style="width: 4%;">
                        <col style="width: 5%;">
                        <col id="newInCol" style="display:none; width: 3%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <c:if test="${params.exnpSn == null and params.exnpSn == ''}">
                            <c:if test="${'rev'.equals(params.status)}">
                                <th><input type="checkbox" id="checkAll" /></th>
                            </c:if>
                        </c:if>
                        <th>증빙유형</th>
                        <th>비용구분</th>
                        <th>상호</th>
                        <th>사업자(주민)번호</th>
                        <th>은행명</th>
                        <th>지급계좌</th>
                        <th>예금주</th>
                        <th>거래일</th>
                        <th>회계단위</th>
                        <th>총액</th>
                        <th>공급가액</th>
                        <th>세액</th>
                        <th>신용카드</th>
                        <th id="newInTh" style="display: none;">삭제</th>
                    </tr>
                    </thead>
                    <tbody id="payDestTb">
                    <tr class="payDestInfo newArray" id="pay0" style="text-align: center;">
                        <c:if test="${params.exnpSn == null or params.exnpSn == ''}">
                            <c:if test="${'rev'.equals(params.status)}">
                                <td><input type="checkbox" id="check0" class="check" /></td>
                            </c:if>
                        </c:if>
                        <td>
                            <input type="hidden" id="payDestSn0" name="payDestSn" class="payDestSn">
                            <input type="text" id="eviType0" class="eviType" style="width: 100%">
                            <input type="hidden" id="fileNo0" class="fileNo"/>
                            <input type="hidden" id="authNo0" class="authNo" style="width: 100%">
                            <input type="hidden" id="authHh0" class="authHh" style="width: 100%">
                            <input type="hidden" id="authDd0" class="authDd" style="width: 100%">
                            <input type="hidden" id="buySts0" value="" />
                        </td>
                        <td>
                            <input id="appTeam0" class="appTeam" style="width: 100%">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(1, 0, 'Y')"></i>
                            <input type="text" style="width: 80%;" id="crmNm0" class="crmNm">
                            <input type="hidden" id="trCd0" class="trCd">
                        </td>
                        <td>
                            <input type="text" id="regNo0" class="regNo">
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
                            <input id="busnCd0" class="busnCd">
                        </td>
                        <td>
                            <input type="text" id="totCost0" class="totCost" value="0" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="supCost0" class="supCost" value="0" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="vatCost0" class="vatCost" value="0" style="text-align: right" onkeyup="regExnp.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regExnpDet.fn_popRegDet(3, 0)"></i>
                            <input type="text" disabled style="width: 70%" id="card0" class="card">
                            <input type="hidden" id="cardNo0" class="cardNo" />
                        </td>
                        <td id="newInTd0" style="display: none;">
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
<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<script type="text/javascript">
    regExnpDet.fn_defaultScript();
    regExnp.fn_defaultScript();

    // var aCnt = 0
    // $(".eviType").each(function(){
    //     var eviType = $("#eviType" + aCnt).data("kendoDropDownList");
    //     eviType.enable(false);
    //     aCnt++
    // });


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
    }

</script>
</body>
</html>