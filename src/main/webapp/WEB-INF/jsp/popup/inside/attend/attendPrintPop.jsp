<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/attend/attendPrintPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<input type="hidden" id="applyMonth" value="${data.applyMonth}"/>

<style>
    .pop_head {height: 32px; position: relative; background: #1385db;}
    .pop_head h1 {font-size: 12px; color: #fff; line-height: 32px; padding-left: 16px; margin: 0;}
    .th-color {background-color: #d2e2f3;}
    .k-list-item span.k-list-item-text {width: 100%;}
    .k-list-item.k-selected.k-hover, .k-list-item.k-selected:hover {color : black;}
    .k-list-item {padding: 2px 8px !important;}
    .k-column-resize-handle-wrapper, .k-row-resize-handle-wrapper, .k-element-resize-handle-wrapper {display: none !important; }
    div.k-list-scroller.k-selectable {border: none;}
    #approveDocContent {font-family: 'Arial_Unicode_MS_Font' !important;}
    .k-dropzone {width: 98px; margin-left: auto;}
    .k-action-buttons {display : none !important;}
    .k-radio-list-horizontal, .k-radio-list.k-list-horizontal {gap: 0;}
    #loadingDiv {position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: white; z-index: 9999; opacity: 1; transition: 0.5s ease;}
    #loadingDiv #loadingSpinner{position: absolute; top: 50%; left: 42%; margin: -40px 0 0 -40px;}
    .d-flex{flex-direction: column; align-items: center;}
    .table-bordered {border: 1px solid #dee2e6 !important;}
    .red-star {color: red; margin-right: 5px;}
    #docControlBtnDiv{float: right; margin: 3px 5px 0 0;}
</style>
<body>
<div class="pop_head">
    <div style="position: absolute;">
        <h1>직원 근태현황 조회</h1>
    </div>

    <div id="docControlBtnDiv">
        <button type='button' class='k-button k-button-solid k-button-solid-base'  style="height: 25px; font-size: 12px;" onclick="attendPrintPop.saveHwp()">
            <span class='k-button-text'>한글파일 다운로드</span>
        </button>
        <button type='button' class='k-button k-button-solid k-button-solid-base' id="docApprovalPDFDownBtn"  style="width: 70px; height: 25px; font-size: 12px;" onclick="attendPrintPop.print()">
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
   attendPrintPop.init();
</script>
</body>
</html>
