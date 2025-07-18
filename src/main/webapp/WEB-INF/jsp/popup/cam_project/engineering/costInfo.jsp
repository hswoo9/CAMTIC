<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/costInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<form id="costDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding: 10px">
    <div id="costBtnDiv">
        <%--<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>--%>
    </div>
    <div class="table-responsive">
        <span style="position: relative; top:10px; font-size: 12px;">◎ 비용상세내역</span>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
            </colgroup>
            <thead>
            <tr>
                <th><span class="red-star"></span>비용</th>
                <th><span class="red-star"></span>원재료</th>
                <th><span class="red-star"></span>외주비</th>
                <th><span class="red-star"></span>노무비</th>
                <th><span class="red-star"></span>경비</th>
                <th><span class="red-star"></span>출장</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style="text-align: center"><input type="text" disabled id="costAmt" value="0" class="costAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td style="text-align: center"><input type="text" disabled id="rawAmt" value="0" class="rawAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td style="text-align: center"><input type="text" disabled id="outsAmt" value="0" class="outsAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td style="text-align: center"><input type="text" disabled id="laborAmt" value="0" style="text-align: right; width: 90%" class="laborAmt" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td style="text-align: center"><input type="text" disabled id="chargeAmt" value="0" class="chargeAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td style="text-align: center"><input type="text" disabled id="bustAmt" value="0" class="bustAmt" style="text-align: right; width: 90%" onkeyup="costInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
            </tr>
            </tbody>
        </table>

        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
                <col width="16.6%">
            </colgroup>
            <thead>
            <tr>
                <th><span class="red-star"></span>작업명</th>
                <th><span class="red-star"></span>직급</th>
                <th><span class="red-star"></span>성명</th>
                <th><span class="red-star"></span>노임단가</th>
                <th><span class="red-star"></span>작업시간</th>
                <th><span class="red-star"></span>합계</th>
            </tr>
            </thead>
            <tbody id="costDetailTable">
            <tr>
                <td style="text-align: center" colspan="6">공정 내역이 없습니다.</td>
            </tr>
            </tbody>
        </table>

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
                    <span class="red-star"></span>비고
                </th>
                <td colspan="3">
                    <textarea type="text" id="costEtc" style="width: 100%;"></textarea>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    costInfo.fn_defaultScript();
</script>
</body>
</html>