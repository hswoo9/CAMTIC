<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<script type="text/javascript" src="/js/intra/cam_item/popup/invenAdjustmentPop.js?v=${today}"/></script>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .percentInput {
        text-align: right;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">

<input type="hidden" id="invenSn" value="${params.invenSn}" />
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
    <div style="padding:0;">
        <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">재고조정</span>
                </h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="invenAdjust.fn_save()">저장</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div>
                <table class="searchTable table table-bordered mb-0 mt10">
                    <colgroup>
                        <col style="width: 10%">
                        <col style="width: 10%">
                        <col style="width: 10%">
                        <col style="width: 10%">
                        <col style="width: 10%;">
                        <col style="width: 12%;">
                        <col style="width: 12%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>창고</th>
                            <th>품명</th>
                            <th>현재고</th>
                            <th>실사재고수량</th>
                            <th>차이</th>
                            <th>재고조정</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody id="listTb">

                    </tbody>
                </table>
            </div>
        </div>
    </div><!-- col-md-9 -->

<script type="text/javascript">
    invenAdjust.fn_defaultScript();
</script>
</body>
</html>