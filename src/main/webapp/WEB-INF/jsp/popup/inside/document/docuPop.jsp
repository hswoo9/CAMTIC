<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/docuPop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="card-header pop-header">
        <div class="table-responsive">
            <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
            <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">계약대장</h3>
                    <div class="btn-st" style="margin-top:10px; text-align:center;">
                        <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                    </div>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table class="popTable table table-bordered mb-0" style="margin-top: 10px;">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                    <%--<tr>
                        <th colspan="4">계약대장</th>
                    </tr>--%>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>계약 기관
                        </th>
                        <td colspan="3">
                            <input type="text" id="contAgency" style="width: 150px; margin-right:10px;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>구분
                        </th>
                        <td>
                            <input type="text" id="division" style="width: 150px; margin-right:10px;">
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>계약 일시
                        </th>
                        <td>
                            <input type="text" id="startDay" onchange="dateValidationCheck('startDay', this.value)" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>계약건명
                        </th>
                        <td colspan="3">
                            <input type="text" id="contractTitle" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>계약 금액
                        </th>
                        <td>
                            <input type="text" id="contractAmount" style="width: 90%; text-align: right;"> 원
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>계약 기간
                        </th>
                        <td>
                            <input type="text" id="startDay2" onchange="dateValidationCheck('startDay2', this.value)" style="width: 45%;">
                            ~
                            <input type="text" id="endDay" onchange="dateValidationCheck('endDay', this.value)" style="width: 45%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>계약 업체(자)
                        </th>
                        <td colspan="3">
                            <input type="text" id="contractor" style="width: 37%;">
                            <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>비고
                        </th>
                        <td colspan="3">
                            <textarea type="text" id="remark" style="width: 100%;"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>첨부
                        </th>
                        <td colspan="3" style="padding:5px;">
                            <input type="file">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>관련
                        </th>
                        <td colspan="3" style="padding:5px;">
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>


<script>
    docuPop.fn_defaultScript();
    overWk.fn_defaultScript();
</script>
</body>
</html>