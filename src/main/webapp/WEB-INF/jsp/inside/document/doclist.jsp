<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/document/archiveList.js?v=${todate}"/></script>
<input type="hidden" id="archiveSn" name="archiveSn" value="${pk}">
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">문서고</h4>
            <div class="title-road">캠인사이드 > 문서관리 > 문서관리 &gt; 문서고</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchDate" style="width:40%;">
                        </td>
                        <th class="text-center th-color">문서고 상태</th>
                        <td>
                            <input type="text" id="doclistState" style="width:110px;">
                        </td>
                        <th class="text-center th-color">제목선택</th>
                        <td>
                            <input type="text" id="searchType" style="width:100px;">
                            <input type="text" id="searchText" onkeypress="if(window.event.keyCode==13){archiveList.mainGrid()}" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    archiveList.init();
</script>