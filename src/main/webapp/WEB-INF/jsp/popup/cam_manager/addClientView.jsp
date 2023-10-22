<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/addClientView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userReqPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>

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
<%
    String ipAddress=request.getRemoteAddr();
%>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="erpEmpCd" value="${loginVO.erpEmpCd}"/>
<input type="hidden" id="ip" value="<%=ipAddress%>" />
<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
            <span style="position: relative; top: 3px;">
                거래처 등록
            </span>
        </h3>
        <div id="btnDiv" class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="addCV.fn_save()">저장</button>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <span>
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="bnkSelBtn" onclick="addCV.fn_popCamCrmList()">캠CRM 검색</button>
        </span>
        <div id="" style="margin-top:12px">
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
                    <th scope="row" class="text-center th-color">거래처명</th>
                    <td>
                        <input type="text" id="crmNm" style="width: 90%">
                    </td>
                    <th scope="row" class="text-center th-color">사업자번호</th>
                    <td>
                        <input type="text" id="crmNo" style="width: 90%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">대표자명</th>
                    <td>
                        <input type="text" id="ceoNm" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">전화번호</th>
                    <td>
                        <input type="text" id="crmTelNum" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        주소
                    </th>
                    <td colspan="3" style="line-height: 30px">
                        <input type="text" id="post" style="width: 20%;">
                        <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="우편번호 검색" onclick="userReqPop.addrSearch();"/>
                        <input type="text" id="addr" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">업종</th>
                    <td>
                        <input type="text" id="crmEvn" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">업태</th>
                    <td>
                        <input type="text" id="crmOcc" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">거래은행</th>
                    <td>
                        <input type="text" id="bankNm" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">계좌번호</th>
                    <td>
                        <input type="text" id="accNo" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">예금주</th>
                    <td colspan="3">
                        <input type="text" id="bankMngNm" style="width: 40%;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>

    </div>
</div>

<script>
    addCV.fn_defaultScript();
</script>
