<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/g20Callback.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/companyCard/regCardToPop.js?v=${today}'/>"></script>

<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>


<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }
</style>


<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="cardToSn" value="${params.cardToSn}"/>
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="cardToTitle">
                    반출요청서
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 12px;">
            <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regCardToPop.fn_save()">등록</button>
<%--            <button type="button" class="k-button k-button-solid-primary" style="display:none" id="modBtn" onclick="fn_update()">수정</button>--%>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반출자
                </th>
                <td>
                    <input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
                    <input type="text" id="empName" value="${loginVO.name}" disabled>
<%--                    <button type="button" class="k-button k-button-solid-base" onclick="userSearch()">검색</button>--%>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>카드선택
                </th>
                <td colspan="3">
                    <input type="hidden" id="trCd" style="" value="${params.trCd}">
                    <input type="text" id="trNm" disabled style="width: 70%" value="${params.trNm}">
                    <input type="hidden" id="cardBaNb" disabled style="width: 100%;" value="${params.baNb}">
                    <button type="button" class="k-button k-button-solid-base" onclick="regCardToPop.fn_popRegDet(8, 0);">검색</button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반출목적
                </th>
                <td colspan="3">
                    <input type="text" id="cardToPurpose" value="" style="width: 20%;">
                    <span id="cardToPurpose2Div" style="display: none;">
                        <input type="text" id="cardToPurpose2" style="width: 30%;" />
                    </span>
                    <span id="cardToBustripDiv" style="display: none;">
                        <input type="hidden" id="hrBizReqId" style="width: 30%;" />
                        <input type="text" id="hrBizVisitCrm" style="width: 40%;" disabled />
                        <button type="button" class="k-button k-button-solid-base" onclick="regCardToPop.fn_bustripPop();">검색</button>
                    </span>
                    <span id="cardToPurcDiv" style="display: none;">
                        <input type="hidden" id="purcSn" style="width: 30%;" />
                        <input type="text" id="purcReqPurpose" style="width: 40%;" disabled />
                        <button type="button" class="k-button k-button-solid-base" onclick="regCardToPop.fn_purcPop();">검색</button>
                    </span>
                    <span id="cardToMeeting" style="margin-left: 5px; display:none">
                        <input type="checkbox" class="k-checkbox k-checkbox-md" id="chkMeeting"/>
                        <label for="chkMeeting" class="k-checkbox-label">사전승인</label>
                    </span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반출일시
                </th>
                <td>
                    <input type="text" id="cardToDe" value="" style="width: 48%;">
                    <input type="text" name="cardToTime" id="cardToTime" style="width: 48%">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>반납예정일시
                </th>
                <td>
                    <input type="text" id="cardFromDe" value="" style="width: 48%;">
                    <input type="text" name="cardFromTime" id="cardFromTime" style="width: 48%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>관련사업
                </th>
                <td colspan="3">
                    <input type="text" id="businessYn" style="width: 20%;" onchange="regCardToPop.fn_businessChk();">
                    <span id="busWrap" style="display: none;">
                        <input type="text" id="pjtNm" value="" style="width: 70%;" disabled>
                        <input type="hidden" id="pjtSn" value="" />
                        <input type="hidden" id="pjtCd" value="" />
                        <button type="button" class="k-button k-button-solid-base" onclick="regCardToPop.fn_projectPop();">검색</button>
                    </span>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>

    regCardToPop.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }
</script>