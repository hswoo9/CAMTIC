<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/bookManagePop.js?v=${today}"/></script>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<!DOCTYPE html>
<html>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">도서 분류관리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <form style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="50%">
                    <col width="30%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="3">도서 분류관리</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>대분류
                    </th>
                    <td>
                        <input type="text" id="division1" style="width: 100%;">
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>중분류
                    </th>
                    <td>
                        <input type="text" id="division2" style="width: 100%;">
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>소분류
                    </th>
                    <td>
                        <input type="text" id="division3" style="width: 100%;">
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>분류추가
                    </th>
                    <td>
                        <input type="text" id="addDivision" style="width: 40%;"><br>
                        <input type="text" id="addDivisionVal" style="width: 100%;">
                    </td>
                    <td style="text-align: center;">
                        <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="">
                            분류 추가
                        </button>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>


<script>
    bookManagePop.fn_defaultScript();
</script>
</body>
</html>