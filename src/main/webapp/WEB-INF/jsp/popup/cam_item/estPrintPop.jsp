<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowKr" pattern="yyyy년MM월dd일" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="/js/intra/cam_item/popup/estPrintPop.js"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<input type="hidden" id="estPrintSn" value="${data.estPrintSn}"/>
<input type="hidden" id="obtainOrderSn" value="${data.obtainOrderSn}"/>

<style>
    .pop_head {height: 32px; position: relative; background: #1385db;}
    .pop_head h1 {font-size: 12px; color: #fff; line-height: 32px; padding-left: 16px; margin: 0;}
    #docControlBtnDiv{float: right; margin: 3px 5px 0 0;}
</style>
<body>
    <div class="pop_head">
        <div style="position: absolute;">
            <h1>견적서 인쇄</h1>
        </div>

        <div id="docControlBtnDiv">
            <button type='button' class='k-button k-button-solid k-button-solid-base' id="docApprovalPDFDownBtn"  style="width: 70px; height: 25px; font-size: 12px;" onclick="estPrintPop.print()">
                <span class='k-icon k-i-file-pdf k-button-icon'></span>
                <span class='k-button-text'>인쇄</span>
            </button>
        </div>
    </div>

    <div style="padding: 20px;" id="test">
        <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>
    </div>

<script type="text/javascript">
    let params = JSON.parse('${params}');
    estPrintPop.init('${nowKr}');
</script>
</body>
</html>