<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/recruit/recruitListEval.js?v=${today}"/></script>
<style>
    a:hover{
        text-decoration: underline !important;
        color: blue;
    }
</style>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">채용관리(면접위원)</h4>
            <div class="title-road">캠인사이드 > 채용관리 &gt; 채용관리(면접위원)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td>
                            <input type="text" id="recruitYear" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="searchType" style="width: 100px;">
                            <input type="text" id="searchVal" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    recruitListEval.init();
</script>
<script type="text/x-kendo-template" id="template">
    <div class='subGrid'></div>
</script>