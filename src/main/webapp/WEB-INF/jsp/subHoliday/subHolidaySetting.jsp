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
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidaySetting.js?v=${today}"/></script>

<style>
    tr:hover {
        cursor: pointer;
    }
</style>

<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" >
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴가 설정</h4>
            <div class="title-road">캠인사이드 > 휴가관리 &gt; 휴가 설정</div>
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
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="holidayYear" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptName" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidaySetting.gridReload()}" style="width: 150px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidaySetting.gridReload();">검색</button>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/x-kendo-template" id="toolbarTemplate">
    <div>
        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="subHolidaySetting.fn_saveAll();">저장</button>
    </div>
</script>
<script type="text/javascript">
    subHolidaySetting.init();
</script>