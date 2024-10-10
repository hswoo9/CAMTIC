<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regIncpRePop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regIncmPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>
<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>
<input type="hidden" id="status" name="status" value="${params.status}" />
<input type="hidden" id="payIncpSn" name="status" value="${params.payIncpSn}" />
<input type="hidden" id="payIncpReSn" name="payIncpReSn" value="${params.payIncpReSn}" />
<input type="hidden" id="payIncpDetSn" name="payIncpDetSn" value="${params.payIncpDetSn}" />
<input type="hidden" id="type" name="type" value="${params.type}" />


<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    수입 반제결의
                    <c:if test="${params.type eq 'new'}">
                        작성
                    </c:if>
                    <c:if test="${params.type ne 'new'}">
                        승인
                    </c:if>
                </span>
            </h3>
            <div id="payAppBtnDiv" class="btn-st popButton">
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
                    <th scope="row" class="text-center th-color">사업명</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="pjtNm" disabled value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="pjtCd" name="pjtCd">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="regIncmRe.fn_projectPop('regPay')">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">예산비목</th>
                    <td colspan="4">
                        <span>
                            <input type="text" id="budgetNm" disabled value=""  style="width: 40%;">
                            <input type="hidden" id="budgetSn" value="" />
                            <button type="button" class="k-button k-button-solid-base" id="bgSelBtn" onclick="regIncmRe.fn_budgetPop()">검색</button>
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
                    <th scope="row" class="text-center th-color">적요</th>
                    <td colspan="4">
                        <input type="text" id="appCont" style="width: 100%;"/>
                    </td>
                </tr>
                <tr>
                    <th rowspan="3" scope="row" class="text-center th-color">입금계좌</th>
                    <th style="width: 10%">계좌명</th>
                    <td colspan="3">
                        <input type="text" id="accNm" disabled style="width: 50%;">
                        <button type="button" class="k-button k-button-solid-base" id="bnkSelBtn" onclick="regIncpRe.fn_bankPop()">검색</button>
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
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0" id="reTable">
                <colgroup>
                    <c:if test="${params.type eq 'new'}">
                        <col width="2%">
                    </c:if>
                    <col width="30%">
                    <col width="10%">
                    <col width="20%">
                </colgroup>
                <thead>
                <tr>
                    <c:if test="${params.type eq 'new'}">
                        <th></th>
                    </c:if>
                    <th>상호</th>
                    <th>거래일</th>
                    <th>입금액</th>
                </tr>
                </thead>
                <tbody id="reBody">

                </tbody>
            </table>
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
    regIncpRe.fn_defaultScript();

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