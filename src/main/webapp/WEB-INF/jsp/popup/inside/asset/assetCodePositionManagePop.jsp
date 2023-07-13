<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/assetCodePositionManagePop.js?v=${today}"/></script>
<html>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="astCodeCompanyId" name="astCodeCompanyId" value="${params.astCodeCompanyId}">
<input type="hidden" id="mod" name="mod" value="${params.modify}">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">소속관리 추가</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="assetCodePositionManagePop.fn_saveBtn()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
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
                <%--<tr>
                    <th colspan="4">소속관리 추가</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>소속</th>
                    <td colspan><input type="text" id="astCpCodeNm" style="width: 100%; margin-right:10px;"></td>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>소속 코드</th>
                    <td colspan><input type="text" id="astCpCode" style="width: 100%; margin-right:10px;"></td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    assetCodePositionManagePop.fn_defaultScript();
</script>
</body>
</html>