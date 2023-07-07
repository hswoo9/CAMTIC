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
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
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
            <h4 class="panel-title">휴가설정</h4>
            <div class="title-road"style="text-align: right; margin-bottom: 5px;">캠인사이드 > 휴가관리 &gt; 휴가설정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr20">
                                    <span>조회연도</span>
                                    <input type="text" id="holidayYear" style="width: 150px;">
                                </div>
                                <div class="mr20">
                                    <span>부서</span>
                                    <input type="text" id="deptName" style="width: 200px;">
                                </div>
                                <div class="mr20">
                                    <span>이름</span>
                                    <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidaySetting.gridReload()}" style="width: 150px;">
                                </div>
                                <div class="mr20">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick="subHolidaySetting.gridReload()"/>
                                </div>

                            </div>
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
        <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" value="저장" onclick="subHolidaySetting.fn_saveAll()"/>
    </div>
</script>
<script type="text/javascript">
    subHolidaySetting.init();
</script>