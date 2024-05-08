<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/system/itemCategoryMa/popup/itemCategoryReg.js?v=${today}"/></script>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="itemCgSn" name="itemCgSn" value="${params.pk}">
        <input type="hidden" id="parentCode" name="parentCode" value="${params.parentCode}">
        <input type="hidden" id="parentCodeNm" name="parentCodeNm" value="${params.parentCodeNm}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">품번 카테고리 등록</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="icr.setCategoryCodeReg()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 11%">
                    <col style="width: 39%">
                    <col style="width: 11%">
                    <col style="width: 39%">
                </colgroup>
                <thead>
                    <tr>
                        <th>분류</th>
                        <td style="line-height: 24px;">
                            <input type="hidden" id="cgType" value="${params.type}">
                            <c:if test="${params.type eq 'A'}">대분류</c:if>
                            <c:if test="${params.type eq 'B'}">중분류</c:if>
                            <c:if test="${params.type eq 'C'}">소분류</c:if>
                        </td>
                        <th>
                            <span class="red-star">*</span>코드
                        </th>
                        <td>
                            <input type="text" id="cgCode" name="cgCode" style="width: 50%;">
                            <button type="button" class="k-button k-button-solid-base" onclick="icr.getCgDuplicateChk()">중복확인</button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    icr.fn_defaultScript();
</script>
</body>
</html>