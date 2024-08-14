<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/carReqMng.js?v=${today}"/></script>
<input type="hidden" id="carCodeSn">
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">차량사용신청관리(관리자)</h4>
            <div class="title-road">캠인사이드 > 자산관리 > 차량관리 > 차량사용신청관리(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
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
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="startDt" style="width: 45%;"> ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <%--<th class="text-center th-color">운행구분</th>
                        <td>
                            <input type="text" id="carType" style="width: 45%;">
                        </td>--%>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width: 30%">
                            <input type="text" id="searchText"  onkeypress="if(window.event.keyCode==13){carReqMng.gridReload()}" style="width: 60%;">
                        </td>
                    </tr>
                </table>
            </div>
            <div class="panel">
                <div id="mainGrid" style="margin:10px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<form id="carDraftFrm" method="post">
    <input type="hidden" id="carReqSn" name="carReqSn" value=""/>
    <input type="hidden" id="menuCd" name="menuCd" value="car">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>
<script type="text/javascript">
    carReqMng.fn_defaultScript();
</script>