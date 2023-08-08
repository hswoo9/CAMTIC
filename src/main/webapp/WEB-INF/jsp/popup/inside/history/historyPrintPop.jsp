<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowComSpace" pattern="yyyy. MM. dd" />
<fmt:formatDate value="${now}" var="nowCom" pattern="yyyy.MM.dd" />
<fmt:formatDate value="${now}" var="nowHyphen" pattern="yyyy-MM-dd" />
<fmt:formatDate value="${now}" var="nowSlash" pattern="yyyy/MM/dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/history/historyPrintPop.js"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<style>
    .pop_head {height: 32px; position: relative; background: #1385db;}
    .pop_head h1 {font-size: 12px; color: #fff; line-height: 32px; padding-left: 16px; margin: 0;}
    #docControlBtnDiv{float: right; margin: 3px 5px 0 0;}
</style>
<body>
    <div class="pop_head">
        <div style="position: absolute;">
            <h1>발령장 조회</h1>
        </div>

        <div id="docControlBtnDiv">
            <button type='button' class='k-button k-button-solid k-button-solid-base' id="docApprovalPDFDownBtn"  style="width: 70px; height: 25px; font-size: 12px;" onclick="certifiPrintPop.print()">
                <span class='k-icon k-i-file-pdf k-button-icon'></span>
                <span class='k-button-text'>인쇄</span>
            </button>
        </div>
    </div>

    <div style="padding: 20px;" id="test">
        <div id="paramDiv">
            <input type="hidden" id="menuCd" name="menuCd" value="">
            <input type="hidden" id="type" name="type" value="">
            <input type="hidden" id="formId" name="formId" value="">
            <input type="hidden" id="formName" name="formName" value="">
            <input type="hidden" id="docNo" name="docNo" value="">
            <input type="hidden" id="docId" name="docId" value="">
            <input type="hidden" id="docType" name="docType" value="">
            <input type="hidden" id="docOpt" name="docOpt" value="">
            <input type="hidden" id="atFileSn" name="atFileSn">
            <input type="hidden" id="compSeq" name="compSeq" value="">
            <input type="hidden" id="linkageType" name="linkageType" value="">
            <input type="hidden" id="processId" name="processId" value="">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
            <input type="hidden" id="empPositionNm" name="empPositionNm" value="${loginVO.positionNm}">
            <input type="hidden" id="empDutyNm" name="empDutyNm" value="${loginVO.dutyNm}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
            <input type="hidden" id="apntSn" name="apntSn" value="${apntSn}">
        </div>
        <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>
        <script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
        <script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
        <script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
    </div>
    <script type="text/javascript">
        let params = JSON.parse('${params}');
        let data = JSON.parse('${data}');
        historyPrintPop.init();
        opener.gridReload();
    </script>
</body>
</html>