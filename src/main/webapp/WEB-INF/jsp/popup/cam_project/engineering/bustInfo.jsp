<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/bustInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/bustrip/bustripList.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>


<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />

<div style="padding: 10px">
    <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="bustInfo.fn_save()">저장</button>
    <button type="button" id="bustReqBtn" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-info" onclick="bustInfo.bustripReqPop('${params.pjtSn}')">출장신청</button>

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
                    <span class="red-star"></span>상담내용
                </th>
                <td colspan="3">
                    <textarea id="contEtc" style="width: 100%;" disabled></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출장정보
                </th>
                <td colspan="3">
                    <input type="text" id="bustripReq" disabled style="width: 90%;">
                    <input type="hidden" id="hrBizReqResultId" />
                    <input type="hidden" id="hrBizReqId"/>
                    <button type="button" id="searchBustrip" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bustInfo.fn_popBustrip();">
                        조회
                    </button>
                </td>
            </tr>
        </thead>
    </table>

    <br>
    <span style=""> ※ 출장 정보</span>
    <div id="bustripMainGrid"></div>
</div>

<script>
    bustInfo.fn_defaultScript();
</script>