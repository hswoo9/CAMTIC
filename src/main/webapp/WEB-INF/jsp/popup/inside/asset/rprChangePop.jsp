<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/rprChangePop.js?v=${today}"/></script>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<html>
<body class="font-opensans" style="background-color:#fff;">
    <div class="col-lg-11" style="padding:0;">
        <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">지식재산권 일괄변경</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="30%">
                    <col width="60%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="3">지식재산권 일괄변경</th>
                </tr>--%>
                <tr>
                    <td>
                        <input type="checkbox" style="width: 100%; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>상태
                    </th>
                    <td>
                        <input type="text" id="status" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" style="width: 100%; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>유지여부
                    </th>
                    <td>
                        <input type="text" id="maintainYN" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" style="width: 100%; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>기술이전
                    </th>
                    <td>
                        <input type="text" id="tcnTransfer" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" style="width: 100%; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>대외비
                    </th>
                    <td>
                        <input type="text" id="conft" style="width: 100%;">
                    </td>
                </tr>
                </thead>
            </table>
            </div>
        </div>
    </div>
<script>
    rprChangePop.fn_defaultScript();
</script>
</body>
</html>