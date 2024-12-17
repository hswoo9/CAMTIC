<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/performanceInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="busnClass" value="${hashMap.BUSN_CLASS}" />

<form id="resDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>


<input type="hidden" id="step" value="E5" />
<input type="hidden" id="stepColumn" value="STEP6" />
<input type="hidden" id="nextStepColumn" value="STEP7" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />

<div style="padding: 10px">
    <div id="resultBtnDiv" style="text-align: right">
        <button type="button" id="saveBtn" style="margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="performanceInfo.fn_save('s')">저장</button>
        <button type="button" id="closingBtn" style="margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="performanceInfo.fn_save('c')">마감</button>
<%--        <button type="button" id="closingCancelBtn" style="margin-bottom: 10px;" class="k-button k-button-solid-error" onclick="performanceInfo.setPerClosingCancel()">마감취소</button>--%>
    </div>

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
                    <span class="red-star"></span>실적률
                </th>
                <td colspan="3">
                    <table>
                        <tbody id="psRsTable">

                        </tbody>
                    </table>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<script>
    performanceInfo.fn_defaultScript();
</script>
</body>
</html>