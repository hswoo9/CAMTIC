<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndDetail.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="R0" />
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="rndSn" value=""/>
<div style="padding: 10px">

    <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="rndDetail.fn_save()">저장</button>
    <button type="button" id="approveBtn" style="display : none; float: right; margin-bottom: 5px; margin-right:5px;" class="k-button k-button-solid-base" onclick="rndDetail.fn_approve()">결재</button>
    <button type="button" id="aBtn" style="display : none; float: right; margin-bottom: 5px; margin-right:5px;" class="k-button k-button-solid-base" onclick="">열람</button>

    <br><br>

    <div class="table-responsive">
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
                    <span class="red-star">*</span>연구책임자
                </th>
                <td>
                    <input type="text" id="mngDeptName" style="width: 40%" disabled>
                    <input type="hidden" id="mngDeptSeq" disabled>
                    <input type="text" id="mngEmpName" style="width: 30%" disabled>
                    <input type="hidden" id="mngEmpSeq">
                    <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch('mng');">
                        검색
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>출금대표통장
                </th>
                <td>
                    <input type="text" id="bank" style="width: 80%;" value="">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>계좌번호
                </th>
                <td>
                    <input type="text" id="bankNo" style="width: 90%">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>예금주
                </th>
                <td>
                    <input type="text" id="accHold" style="width: 90%;" value="(사)캠틱종합기술원">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color"><span class="red-star"></span>전체연구비</th>
                <td>
                    <input type="text" id="allResCost" name="allResCost" style="width: 80%;text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                </td>
                <th scope="row" class="text-center th-color"><span class="red-star"></span>민간부담금</th>
                <td>
                    현금 : <input type="text" id="peoResCost" name="peoResCost" style="width: 30%;text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                    현물 : <input type="text" id="peoResItem" name="peoResItem" style="width: 30%;text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color"><span class="red-star"></span>계</th>
                <td>
                    <input type="text" id="totResCost" name="totResCost" disabled style="width: 80%;text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                </td>
                <th scope="row" class="text-center th-color"><span class="red-star"></span>연구카드사용여부</th>
                <td>
                    <div>
                        <input type="radio" name="resCardCheck" id="rccY" value="Y" style="position: relative; top:4px;">
                        <label for="rccY" style="position: relative; top:4px;">사용</label>

                        <input type="radio" name="resCardCheck" id="rccN" value="N" style="position: relative; top:4px;">
                        <label for="rccN" style="position: relative; top:4px;">미사용</label>

                        <span style="display: none;" id="rccYRes">
                            <input type="text" id="resCardNo" style="margin-right: 5px; width : 20%" maxlength="4" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/> ※ 사용시 카드번호 뒤 4자리 입력
                        </span>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>중간보고
                </th>
                <td>
                    <input type="text" id="delvDay" disabled style="width: 90%">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>결과보고
                </th>
                <td>
                    <input type="text" id="resDay" disabled style="width: 90%;">
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    rndDetail.fn_defaultScript();

    function userSearch(p) {
        window.open("/common/deptListPop.do?params=" + p , "조직도", "width=750, height=650");
    }
</script>