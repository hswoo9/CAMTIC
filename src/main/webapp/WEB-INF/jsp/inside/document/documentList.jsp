<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/document/documentList.js?v=${today}"/></script>
<input type="hidden" id="documentSn" value="${data.documentSn}"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">등록대장</h4>
            <div class="title-road">캠인사이드 > 문서관리 > 문서관리 > 등록대장</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="startDt" style="width: 45%;">
                            ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="documentPart" style="width:160px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width:200px;">
                            <input type="text" id="searchText" style="width: 200px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    docuList.init();
</script>