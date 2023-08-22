<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/document/snackAdminList.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">야근/휴일식대대장 (관리자)</h4>
            <div class="title-road">캠인사이드 > 문서관리 > 야근/휴일식대대장 (관리자)</div>
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
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="startDt" class="searchInput" style="width: 110px;">
                            ~
                            <input type="text" id="endDt" class="searchInput" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" class="searchInput" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" class="searchInput" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">식대 구분</th>
                        <td>
                            <input type="text" id="mealsDivision" class="searchInput" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">결제 구분</th>
                        <td>
                            <input type="text" id="payDivision" class="searchInput" style="width: 70px;">
                        </td>
                        <th class="text-center th-color">결재</th>
                        <td>
                            <input type="text" id="approval" class="searchInput" style="width: 80px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    snackAdminList.init();
</script>