<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/jobInvenReportPop.js?v=${today}"/></script>
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
                <h3 class="card-title title_NM">직무발명 신고</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="30%">
                    <col width="70%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="2">직무발명 신고</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>발명자 / 저자
                    </th>
                    <td>
                        <input type="text" id="author" style="width: 70%;">
                        <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:80px; height:27px; line-height:0;" onclick="">
                            직원 선택
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>지식재산권 종류
                    </th>
                    <td>
                        <input type="text" id="type" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>지식재산권 명칭
                    </th>
                    <td>
                        <input type="text" id="name" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>주요내용
                    </th>
                    <td>
                        <textarea type="text" id="document" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>작성일
                    </th>
                    <td>
                        <input type="text" id="regDate" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>첨부 서류1
                    </th>
                    <td style="padding:5px;">
                        <input type="file">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>첨부 서류2
                    </th>
                    <td style="padding:5px;">
                        <input type="file">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>출원관련 견적서
                    </th>
                    <td style="padding:5px;">
                        <input type="file">
                    </td>
                </tr>
                </thead>
            </table>
            </div>
        </div>
    </div>
<script>
    jobInvenReportPop.fn_defaultScript();
</script>
</body>
</html>