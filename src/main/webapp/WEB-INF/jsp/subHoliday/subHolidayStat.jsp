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

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayStat.js?v=${today}"/></script>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴가 사용 현황</h4>
            <div class="title-road">캠인사이드 > 휴가관리 &gt; 휴가 사용 현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
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
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeamName" style="width: 200px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">이름</th>
                        <td colspan="5">
                            <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayStat.gridReload()}" style="width: 150px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayStat.gridReload();">검색</button>
                        </td>
                    </tr>
                        <%--<td style="border-bottom:0; background-color: white">
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
                                    <span>팀</span>
                                    <input type="text" id="deptTeamName" style="width: 150px;">
                                </div>
                                &lt;%&ndash;<div class="mr20">
                                    <span>휴가구분</span>
                                    <input type="text" id="edtHolidayKindTop" name="edtHolidayKindTop" required="required" style="width:150px;">
                                </div>&ndash;%&gt;
                                <div class="mr20">
                                    <span>이름</span>
                                    <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayStat.gridReload()}" style="width: 150px;">
                                </div>
                                <div>
                                    <input type="button" class="k-grid-button k-button k-button-md  k-button-solid k-button-solid-base" value="검색" onclick="subHolidayStat.gridReload()"/>
                                </div>
                            </div>
                        </td>--%>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    subHolidayStat.init();
</script>