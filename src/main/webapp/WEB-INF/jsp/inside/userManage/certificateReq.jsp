<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/certificate/certificateReq.js?v=${today}"/></script>
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
    table { background-color: white; }
    .table-bordered > tbody > tr > th{ background-color: #8fa1c0; color: white;}
</style>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">증명서신청</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 증명서관리 > 증명서신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회연도</th>
                        <td>
                            <input type="text" id="docuYearDe" style="width: 200px; margin-right:10px;">
                        </td>
                        <th class="text-center th-color">발급구분</th>
                        <td>
                            <input type="text" id="proofType" style="width: 200px; margin-right:10px;">
                        </td>
                        <th class="text-center th-color">처리상태</th>
                        <td>
                            <input type="text" id="status" style="width: 200px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">검색</button>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script type="text/javascript">
    certificateReq.init();
</script>