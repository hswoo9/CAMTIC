<%--
  Created by IntelliJ IDEA.
  User: 정호진
  Date: 2023-04-15
  Time: 오후 8:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    table { background-color: white; }
</style>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/overWk/overWkReq.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">시간 외 근무 신청</h4>
            <div class="title-road">시간외근무 &gt; 시간 외 근무 신청</div>
        </div>

        <div class="panel-body">

            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <span id="nowDateWeekNumOfMonth"></span>
                <%--<table class="table table-bordered" style="margin-top:5px;">
                    <tr>
                        <th>주 누계</th>
                        <td>0</td>
                        <th>월 누계</th>
                        <td>0.0</td>
                    </tr>
                </table>--%>
            </div>

            <div style="margin-bottom:10px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">--%>
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tbody>
                    <tr>
                        <td colspan="3">
                            <span class="pdr5">조회기간</span>
                            <input type="text" id="startDay" onchange="dateValidationCheck('startDay', this.value)" style="width: 15%;">
                            ~
                            <input type="text" id="endDay" onchange="dateValidationCheck('endDay', this.value)" style="width: 15%;">
                            <span class="pdr5 pdl3per">승인상태</span>
                            <input type="text" id="status" style="width: 15%;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div id="spclVacManageTabStrip">
                    <ul>
                        <li>목록</li>
                        <li>캘린더</li>
                    </ul>
                    <div>
                        <div id="mainGrid" style="margin-top: 10px">
                        </div>
                    </div>
                    <div>
                        <div id="schedulerDiv" style="margin:10px auto;">
                            <div id="team-schedule" style="float: left">
                            </div>
                            <div id="scheduler"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvalService.jsp?v=${today}"></jsp:include>--%>
<script type="text/javascript">
    /*var datas = JSON.parse('${data}');*/
    /*draftFormList.fnDefaultScript(datas);*/
    overWk.fn_defaultScript();

    $("#checkAll").click(function(){
        if($(this).is(":checked")) $("input[name=owpPk]").prop("checked", true);
        else $("input[name=owpPk]").prop("checked", false);
    });
</script>