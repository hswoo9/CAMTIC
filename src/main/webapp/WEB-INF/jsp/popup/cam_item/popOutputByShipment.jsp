<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_item/popup/popOutputByShipment.js?v=${today}"/></script>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="qtyList" name="qtyList" value="${params.qtyList}">
        <input type="hidden" id="itemSnList" name="itemSnList" value="${params.itemSnList}">
        <input type="hidden" id="smRecordSnArr" name="smRecordSnArr" value="${params.smRecordSnArr}">
        <input type="hidden" id="deliveryDt" name="deliveryDt" value="${nowHyphen}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">출하실적등록</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="popOutputShipment.setOutput()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <div class="mt-10">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col style="width: 6%;">
                        <col>
                        <col>
                        <col style="width: 12%;">
                        <col style="width: 12%;">
                        <col style="width: 15%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>순번</th>
                        <th>품번</th>
                        <th>품명</th>
                        <th>필요수량</th>
                        <th>안전재고</th>
                        <th>자재출고창고</th>
                    </tr>
                    </thead>
                    <tbody id="outputTb">

                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript">
    popOutputShipment.fn_defaultScript();
</script>
</body>
</html>