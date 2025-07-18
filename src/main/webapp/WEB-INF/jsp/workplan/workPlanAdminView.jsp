<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    table { background-color: white; }
</style>
<script type="text/javascript" src="/js/intra/workPlan/workPlanAdminView.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="searchEmpSeq" value="99999"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">유연근무현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 유연근무 > 유연근무현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">--%>
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0;">
                            <span>년월</span>
                            <input type="text" id="apply_month" style="width: 10%; margin-left: 10px; margin-right:10px;">
                            <span>부서</span>
                            <input type="text" id="dept" style="width: 150px; margin-right:10px;">
                            <span>팀</span>
                            <input type="text" id="team" style="width: 150px; margin-right:10px;">

                            <span>성명</span>
                            <input type="text" id="name" style="width: 100px; margin-right:10px;">
                            <button type="button" id="approButton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0; margin-right:10px;" onclick="">
                                선택
                            </button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="panel-body">
            <div id="mainGrid"></div>
        </div>

        <h4 class="panel-title" style="margin-left: 20px;">상세내역</h4>

        <div class="panel-body">
            <div id="mainGrid2"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    workPlanAdminView.fn_defaultScript();
    workPlanAdminView.mainGrid();
    workPlanAdminView.mainGrid2();
</script>