<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/unRndDevPlan.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="S1" />
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="devSn" value="" />
<div style="padding: 10px">
    <div class="table-responsive">
        <button type="button" id="saveBtn2" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="unRndDP.fn_save()">저장</button>
        <button type="button" id="approveBtn2" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-base" onclick="unRndDP.fn_approve()">상신</button>
        <button type="button" id="rsBtn2" style="float: right; margin-bottom: 5px; margin-right: 5px; display: none" class="k-button k-button-solid-base" disabled onclick="unRndDP.fn_docView()">열람</button>
        <button type="button" id="addVerBtn2" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-base" onclick="unRndDP.fn_addVersion()">예비원가 추가</button>


        <br><br>

        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="10%">
                <col width="10%">
                <col width="20%">
                <col width="20%">
                <col width="10%">
                <col width="10%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th>버전</th>
                <th>문서번호</th>
                <th>날짜</th>
                <th>투자금액</th>
                <th>등록자</th>
                <th>예비원가서</th>
                <th>상태</th>
            </tr>
            </thead>
            <tbody id="verTable">

            </tbody>
        </table>

        <div id="addPSActive" style="display: none;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>개발목표/개발내용
                    </th>
                    <td colspan="3">
                        <textarea id="devPlanCont" style="width: 100%; text-align: left"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>특이사항
                    </th>
                    <td colspan="3">
                        <textarea id="devPlanIss" style="width: 100%; text-align: left"></textarea>
                    </td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="7%">
                    <col width="15%">
                    <col width="10%">
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="14%">
                    <col width="20%">
                </colgroup>
                <thead>
                <tr>
                    <th>순번</th>
                    <th><span class="red-star">*</span>건명</th>
                    <th>수량</th>
                    <th>단위</th>
                    <th>견적금액</th>
                    <th>견적처</th>
                    <th>비고</th>
                    <th>명령</th>
                </tr>
                </thead>
                <tbody id="invTable">
                <tr>
                    <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                    <td><input type="text" id="invNm" class="invNm" /></td>
                    <td><input type="text" id="invCnt" class="invCnt" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" id="invUnit" class="invUnit" /></td>
                    <td><input type="text" id="estTotAmt" style="text-align: right" class="estTotAmt" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" id="estOfc" class="estOfc" /></td>
                    <td><input type="text" id="invEtc" class="invEtc" /></td>
                    <td style="text-align: center;"><button type="button" id="addBtn" onclick="unRndDP.fn_addInv()" class="k-button k-button-solid-base">추가</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    unRndDP.fn_defaultScript();
</script>