<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/popAddHistory.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <c:choose>
                    <c:when test="${params.type eq 'M'}">
                        유지보수내역 등록
                    </c:when>
                    <c:otherwise>
                        기타내역 등록
                    </c:otherwise>
                </c:choose>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="popAddHistory.setAstManage()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <input type="hidden" id="astInfoOtherSn" name="astInfoOtherSn" value="${params.astInfoOtherSn}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="astInfoSn" name="astInfoSn" value="${params.astInfoSn}">
            <input type="hidden" id="type" name="type" value="${params.type}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col>
                    <col width="15%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <c:choose>
                            <c:when test="${params.type eq 'M'}">
                                유지보수명
                            </c:when>
                            <c:otherwise>
                                품명
                            </c:otherwise>
                        </c:choose>
                    </th>
                    <td colspan="3">
                        <input type="text" id="otherTitle">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <c:choose>
                            <c:when test="${params.type eq 'M'}">
                                유지보수일
                            </c:when>
                            <c:otherwise>
                                구입일
                            </c:otherwise>
                        </c:choose>
                    </th>
                    <td>
                        <input type="text" id="exeDate" style="width:120px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        단가
                    </th>
                    <td>
                        <input type="text" id="unitPrice" style="text-align:right;" class="numberInput">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <c:choose>
                            <c:when test="${params.type eq 'M'}">
                                관련
                            </c:when>
                            <c:otherwise>
                                모델명
                            </c:otherwise>
                        </c:choose>
                    </th>
                    <td <c:if test="${params.type eq 'M'}">colspan="3" </c:if>>
                        <input type="text" id="etc" style="">
                    </td>
                    <c:if test="${params.type eq 'O'}">
                    <th scope="row" class="text-center th-color">
                        규격
                    </th>
                    <td>
                        <input type="text" id="standard">
                    </td>
                    </c:if>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script>
    popAddHistory.fn_defaultScript();
</script>
</body>
</html>