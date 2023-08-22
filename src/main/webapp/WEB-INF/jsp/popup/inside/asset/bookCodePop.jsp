<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/bookCodePop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="bkSn" value="${params.bkSn}"/>

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">도서분류코드</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>도서분류
                        </th>
                        <td colspan="3">
                            <input type="text" id="bkLgCd" style="width: 30%;">
                            <input type="text" id="bkMdCd" style="width: 30%;">
<%--                            <input type="text" id="bkCd" style="width: 30%;">--%>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>등록
                        </th>
                        <td colspan="3">
<%--                            <input type="text" id="cdType" style="width: 15%;">--%>
<%--                            <input type="text" id="addType" style="display: none;">--%>
                            <input type="text" id="cdValue" style="width: 40%;">
                            <button type="button" class="k-button k-button-solid-info">추가</button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script>
    bookCdPop.fn_defaultScript();
</script>
</body>
</html>