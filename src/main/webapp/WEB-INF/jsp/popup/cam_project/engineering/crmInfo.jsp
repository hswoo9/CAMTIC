<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/crmInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />

<input type="hidden" id="step" value="E0" />
<input type="hidden" id="stepColumn" value="STEP1" />
<input type="hidden" id="nextStepColumn" value="STEP2" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />
<div style="padding: 10px">
    <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="crmInfo.fn_save()">저장</button>
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
                <span class="red-star">*</span>업체코드
            </th>
            <td>
                <input type="text" id="crmSn" style="width: 80%;" disabled>
                <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="crmInfo.fn_popCamCrmList()">
                    조회
                </button>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>소재지
            </th>
            <td>
                <input type="text" id="crmLoc" style="width: 90%;" disabled>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>업체명
            </th>
            <td>
                <input type="text" id="crmNm" style="width: 90%;" disabled>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>주요생산품
            </th>
            <td>
                <input type="text" id="crmProd" style="width: 90%;" disabled>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>대표자
            </th>
            <td>
                <input type="text" id="crmCeo" style="width: 90%;" disabled>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>우편번호
            </th>
            <td>
                <input type="text" id="crmPost" style="width: 90%;" disabled>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>주소
            </th>
            <td colspan="3">
                <input type="text" id="crmAddr" style="width: 90%;" disabled>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>전화번호
            </th>
            <td>
                <input type="text" id="crmCallNum" style="width: 90%;" disabled>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>팩스번호
            </th>
            <td>
                <input type="text" id="crmFax" style="width: 90%;" disabled>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>의뢰인
            </th>
            <td>
                <input type="text" id="crmReqMem" style="width: 80%;">
                <input type="hidden" id="crmMemSn" />
                <button type="button" class="k-button k-button-solid-base" onclick="crmInfo.fn_popCamCrmMemList();">검색</button>
<%--                <button type="button" id="za" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="javascript:alert('업체를 선택해주세요.')">--%>
<%--
   조회--%>
<%--                </button>--%>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>핸드폰
            </th>
            <td>
                <input type="text" id="crmPhNum" style="width: 90%;" disabled>
            </td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>홈페이지
            </th>
            <td>
                <input type="text" id="crmHp" style="width: 90%;" disabled>
            </td>
            <th scope="row" class="text-center th-color">
                <span class="red-star"></span>메일주소
            </th>
            <td>
                <input type="text" id="crmMail" style="width: 90%;" disabled>
            </td>
        </tr>
        </thead>
    </table>
</div>

<script>
    crmInfo.fn_defaultScript();
</script>