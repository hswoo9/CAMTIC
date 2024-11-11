<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/goodsInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<form id="devDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="devSn" name="devSn" value="">
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>


<input type="hidden" id="step" value="E4" />
<input type="hidden" id="stepColumn" value="STEP5" />
<input type="hidden" id="nextStepColumn" value="STEP6" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />


<input type="hidden" id="getDelvDe" value="${hashMap.DELV_DE}" />
<input type="hidden" id="saveCk" value="N"/>

<div style="padding: 10px">
    <div style="float: left;" id="goodsTxtDiv">
        <span style="font-size: 12px; color: red;">* 추가 버튼을 클릭하여 납품을 진행해주세요. 작성 후 저장 버튼을 클릭해야 적용됩니다.</span>
    </div>
    <div id="btnDiv">
        <button type="button" id="teamAppBtn" style="display:none; float: right;" class="k-button k-button-solid-base" onclick="goodsInfo.fn_teamProjectApp()">프로젝트 마감</button>
        <button type="button" id="goodsAddBtn" style="float: right;" class="k-button k-button-solid-base" onclick="goodsInfo.fn_goodsAdd()">추가</button>
<%--        <button type="button" id="delvDeHistBtn" style="display:none; float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="goodsInfo.pjtDelvDeSetPop()">납품일자 변경</button>--%>

<%--        <button type="button" id="printBtn" style="display:none; float: right; margin-right: 5px;" class="k-button k-button-solid-base" onclick="goodsInfo.goodsPrintPop()">인쇄</button>--%>
    </div>

    <div class="table-responsive" style="" id="versionDiv">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="7%">
                <col width="20%">
                <col width="15%">
                <col width="15%">
                <col width="15%">
                <col width="7%">
                <col width="7%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">번호</th>
                <th scope="row" class="text-center th-color">품명</th>
                <th scope="row" class="text-center th-color">납품금액</th>
                <th scope="row" class="text-center th-color">납품일자</th>
                <th scope="row" class="text-center th-color">신청일자</th>
                <th scope="row" class="text-center th-color">상태</th>
                <th scope="row" class="text-center th-color">인쇄</th>
            </tr>
            </thead>
            <tbody id="goodsInfoTbody">
                <tr>
                    <td colspan="7" style="text-align: center;">
                        납품 내역이 없습니다.
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="text-align: right; font-weight: bold; font-size: 12px; margin-top: 3px;">
            <span>견적가 : <span id="estExpAmt">0</span> 원 (부가세 <span id="vatTxt"></span>)&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span>총 납품 확정금액 : <span id="allGoodsAmt">0</span> 원&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span>납품잔액 : <span id="balGoodsAmt">0</span> 원</span>
        </div>
    </div>

    <div class="table-responsive" id="inputDiv" style="display: none; margin-top: 20px;">
        <div style="float: left;">
            <span style="font-size: 12px; color: red;">* 확정 후 다음 납품 진행 가능</span>
        </div>
        <div style="float: right;">
            <button type="button" id="confirmBtn" style="display:none; margin-right: 5px; margin-bottom: 5px;" class="k-button k-button-solid-primary" onclick="goodsInfo.fn_goodsConfirm()">납품 확정</button>
            <button type="button" id="delvDeHistBtn" style="display:none; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-info" onclick="goodsInfo.pjtDelvDeSetPop()">납품일자 변경</button>
            <button type="button" id="saveBtn2" style="margin-right: 5px; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="goodsInfo.fn_save()">저장</button>
        </div>
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
                    <span class="red-star"></span>프로젝트코드
                </th>
                <td>
                    <input type="text" id="goodsPjtSn" disabled value="${hashMap.PJT_CD}" style="width: 90%; text-align: left" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>납품일자
                </th>
                <td>
                    <input type="text" id="goodsDelvDe" style="width: 90%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수신
                </th>
                <td>
                    <input type="text" id="goodsCrmNm" disabled value="${hashMap.CRM_NM}" style="width: 90%; text-align: left" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>참고
                </th>
                <td>
                    <input type="text" id="goodCrmMem" disabled value="${hashMap.CRM_MEM_NM}" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>품명
                </th>
                <td colspan="3">
                    <input type="hidden" id="goodsPjtNmTemp" value="${hashMap.PJT_NM}" style="width: 100%;" />
                    <input type="text" id="goodsPjtNm" value="${hashMap.PJT_NM}" style="width: 100%;" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>특이사항
                </th>
                <td colspan="3">
                    <textarea type="text" id="goodsIss" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>납품가 합계
                </th>
                <td colspan="3">
                    <input type="text" id="goodsTotAmt" disabled onkeyup="goodsInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 40%; text-align: right"> 원
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
                    <span class="red-star"></span>단가
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>공급가액
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>비고
                </th>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>
                </th>
            </tr>
            </thead>
            <tbody id="goodsProductTb">
            <tr>
                <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                <td><input type="text" class="goodsProdNm" alias="goodsProdNm" id="goodsProdNm" /></td>
                <td><input type="text" class="goodsProdCnt" alias="goodsProdCnt" id="goodsProdCnt" style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td><input type="text" class="goodsUnit" alias="goodsUnit" id="goodsUnit" /></td>
                <td><input type="text" class="goodsUnitAmt" alias="goodsUnitAmt" id="goodsUnitAmt" style="text-align: right;" onkeyup="goodsInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td><input type="text" class="goodsSupAmt" alias="goodsSupAmt" id="goodsSupAmt" disabled style="text-align: right;" /></td>
                <td><input type="text" class="goodsProdEtc" alias="goodsProdEtc" id="goodsProdEtc" /></td>
                <td style="text-align: center"><button type="button" id="addBtn" onclick="goodsInfo.fn_add()" class="k-button k-button-solid-base">추가</button> </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
    goodsInfo.fn_defaultScript();
</script>
</body>
</html>