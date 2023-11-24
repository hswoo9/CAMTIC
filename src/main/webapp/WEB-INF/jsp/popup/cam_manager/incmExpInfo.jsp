<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/incmExpInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    [type="radio"]{ vertical-align: middle; }
</style>

<input type="hidden" id="subPjtCd" value="${params.pjtCd}" />
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="setYn" value="" />

<input type="hidden" id="step" value="E0" />
<input type="hidden" id="stepColumn" value="STEP1" />
<input type="hidden" id="nextStepColumn" value="STEP2" />
<input type="hidden" id="version" value="" />

<div style="padding: 10px">
    <div class="table-responsive">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-info" onclick="incmExpInfo.fn_save()">저장</button>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">구분</th>
                <th scope="row" class="text-center th-color">장</th>
                <th scope="row" class="text-center th-color">관</th>
                <th scope="row" class="text-center th-color">항</th>
                <th scope="row" class="text-center th-color">예산</th>
            </tr>
            </thead>
            <tbody id="bgtTblBody">

            </tbody>
        </table>
    </div>
</div>

<script>
    var inParameters = JSON.parse('${paramsMap}');

    incmExpInfo.fn_defaultScript(inParameters);
</script>
</body>
</html>