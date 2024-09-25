<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/document/docuList.js?v=${today}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">계약대장</h4>
            <div class="title-road">캠인사이드 > 문서관리 > 문서관리 > 계약대장</div>
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
                        <th class="text-center th-color">계약 기간</th>
                        <td>
                            <input type="text" id="startDt" style="width: 45%;">
                            ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="classType" style="width:130px;">
                        </td>
                        <th class="text-center th-color">검색구분</th>
                        <td>
                            <input type="text" id="searchType" style="width:130px;">
                            <input type="text" id="searchText" style="width:150px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid"></div>
                <div id="hiddenGrid" style="margin:20px 0; display: none;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    var btnCk = false;
    docuContractList.init();
</script>