<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<script type="text/javascript" src="/js/intra/cam_item/popup/popInvenTransferReg.js?v=${today}"/></script>
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

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<body class="font-opensans" style="background-color:#fff;">
    <div style="padding:0;">
        <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">재고이동등록</span>
                </h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="invenTr.setInvenTransferReg()">저장</button>
                    <button type="button" class="k-button k-button-solid-base" onclick="$('#listTb *').remove()">초기화</button>
                    <button type="button" class="k-button k-button-solid-base" onclick="invenTr.addRow('new')">품목추가</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div>
                <div>
                    <input type="hidden" id="forwardingDate" name="forwardingDate" value="${nowHyphen}">
                    <input type="file" id="file" name="file" onchange="invenTr.fileChange(this)" style="display: none">
                </div>
                <table class="searchTable table table-bordered mb-0 mt10">
                    <colgroup>
                        <col style="width: 10%">
                        <col>
                        <col>
                        <col style="width: 10%">
                        <col style="width: 10%;">
                        <col style="width: 12%;">
                        <col style="width: 12%">
                        <col style="width: 10%">
                        <col style="width: 3%;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>이동구분</th>
                            <th>품번</th>
                            <th>품명</th>
                            <th>현재재고</th>
                            <th>이동수량</th>
                            <th>출고처</th>
                            <th id="">입고처</th>
                            <th>비고</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="listTb">

                    </tbody>
                </table>

                <input type="hidden" id="invenSn" onchange="invenTr.itemInfoChange()">
                <input type="hidden" id="masterSn">
                <input type="hidden" id="itemNo">
                <input type="hidden" id="itemName">
                <input type="hidden" id="currentInven">
                <input type="hidden" id="whCd">
                <input type="hidden" id="whCdNm">
            </div>
        </div>
    </div><!-- col-md-9 -->

    <script type="text/javascript">
        invenTr.fn_defaultScript();
    </script>
</body>
</html>