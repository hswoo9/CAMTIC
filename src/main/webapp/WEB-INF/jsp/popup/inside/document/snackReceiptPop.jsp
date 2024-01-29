<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<style>

</style>

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>
<script type="text/javascript" src="/js/intra/inside/document/snackReceiptPop.js?v=${today}"/></script>
<input type="hidden" id="snackInfoSn" value="${params.snackInfoSn}"/>
<input type="hidden" id="fileNo" value="${params.fileNo}"/>

<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">영수증</span>
            </h3>

            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <button type="button" class="k-button k-button-solid-error" onclick="snackReceipt.fn_close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table id="popTable" class="popTable table table-bordered mb-0">
                <thead>
                <tr>
                    <th>파일명</th>
                    <th>확장자</th>
                    <th>크기</th>
                    <th>뷰어</th>
                </tr>
                </thead>
                <tbody id="fileGrid">
                <tr id="emptyTr">
                    <td colspan="5" style="text-align: center">등록된 파일이 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    snackReceipt.init();
</script>
</body>
</html>