<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/estInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="expAmt" value="${params.expAmt}" />

<input type="hidden" id="step" value="E1" />
<input type="hidden" id="stepColumn" value="STEP2" />
<input type="hidden" id="nextStepColumn" value="STEP3" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />

<input type="hidden" id="version" value="" />

<div style="padding: 10px">
    <div class="table-responsive">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-info" onclick="estInfo.fn_save()">저장</button>
        <button type="button" id="printBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-base" onclick="estInfo.estPrintPop()">인쇄</button>
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
                    <span class="red-star"></span>견적일자
                </th>
                <td colspan="3">
                    <input type="text" id="estDe" style="width: 30%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수신
                </th>
                <td>
                    <input type="text" id="crmCompNm" style="width: 95%;"  disabled>
                </td>
                <th scope="row" class="text-center th-color" >
                    <span class="red-star"></span>참고
                </th>
                <td>
                    <input type="text" id="crmMem" style="width: 95%;" disabled>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>견적명
                </th>
                <td colspan="3">
                    <input type="text" id="estPjtNm" style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>부가세 여부
                </th>
                <td>
                    <span style="position: relative; top: 5px;">
                        <input type="radio" id="vatN" name="vatYn" value="N" checked="checked">
                        <label for="vatN">미포함</label>
                        <input type="radio" id="vatY" name="vatYn" value="Y" style="margin-left:10px;">
                        <label for="vatY">포함</label>
                        <input type="radio" id="vatC" name="vatYn" value="C" style="margin-left:10px;">
                        <label for="vatC">면세</label>
                    </span>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>견적가 합계
                </th>
                <td>
                    <input type="text" id="estExpAmt" style="width: 90%; text-align: right" disabled> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>특이사항
                </th>
                <td colspan="3">
                    <textarea type="text" id="etc" style="width: 100%;"></textarea>
                </td>
            </tr>
            </thead>
        </table>

        <span style="float: right; margin-top:10px;font-size: 12px; font-weight: bold"> * 품목이 1개인 경우에도 반드시 추가 버튼을 이용하여 저장하시기 바랍니다.</span>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="7%">
                <col width="20%">
                <col width="10%">
                <col width="10%">
                <col width="15%">
                <col width="15%">
                <col width="10%">
                <col width="8%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>번호
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>품명 및 규격
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수량
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>단위
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>단가(원)
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>합계(원)
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>비고
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>
                </th>
            </tr>
            </thead>
            <tbody id="productTb">
            <tr>
                <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                <td><input type="text" class="prodNm" alias="prodNm" id="prodNm" /></td>
                <td><input type="text" class="prodCnt" alias="prodCnt" id="prodCnt" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td><input type="text" class="unit" alias="unit" id="unit" /></td>
                <td><input type="text" class="unitAmt" alias="unitAmt" id="unitAmt" style="text-align: right;" onkeyup="estInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td><input type="text" class="supAmt" alias="supAmt" id="supAmt" disabled style="text-align: right;" /></td>
                <td><input type="text" class="prodEtc" alias="prodEtc" id="prodEtc" /></td>
                <td style="text-align: center"><button type="button" id="addBtn" class="k-button k-button-solid-base">추가</button> </td>
            </tr>
            </tbody>
        </table>


        <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="7%">
                    <col width="40%">
                    <col width="18%">
                    <col width="12%">
                    <col width="13%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>버전
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>견적명
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>총 견적가
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>항목수
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>등록/수정일
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>등록자
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>
                    </th>
                </tr>
                </thead>
                <tbody id="productTb2">

                </tbody>
            </table>
    </div>
</div>

<script>
    estInfo.fn_defaultScript();
</script>
</body>
</html>