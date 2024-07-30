<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/document/snackList.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">식대신청</h4>
            <div class="title-road">캠인사이드 > 식대관리 > 식대신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">--%>
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="8%">
                        <col width="20%">
                        <col width="8%">
                        <col width="15%">
                        <col width="8%">
                        <col width="15%">
                        <col width="8%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="startDt" class="searchInput" style="width: 45%;">
                            ~
                            <input type="text" id="endDt" class="searchInput" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">식대 구분</th>
                        <td>
                            <input type="text" id="mealsDivision" class="searchInput" style="width: 80%;">
                        </td>
                        <th class="text-center th-color">결제 구분</th>
                        <td>
                            <input type="text" id="payDivision" class="searchInput" style="width: 80%;">
                        </td>
                        <th class="text-center th-color">결재</th>
                        <td>
                            <input type="text" id="approval" class="searchInput" style="width: 80%;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    snackList.init();
</script>