<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndPayMv.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="R2" />
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="devSn" value="" />
<div style="padding: 10px">
    <div class="table-responsive">
        <button type="button" id="" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" disabled onclick="">인쇄</button>
        <br><br>
        <div id="pmMainGrid"></div>

        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="10%">
                <col width="20%">
                <col width="10%">
                <col width="20%">
                <col width="10%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr class="text-center th-color">
                <th>입금금액합계</th>
                <td style="text-align: right">0원</td>
                <th>지급금액합계</th>
                <td style="text-align: right">0원</td>
                <th>잔액합계</th>
                <td style="text-align: right; font-weight: bold">0원</td>
            </tr>
            </thead>
        </table>

    </div>
</div>

<script>
    rndPM.fn_defaultScript();
</script>