<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner>.k-link {
        justify-content: center;
    }
</style>
<script type="text/javascript" src="/js/intra/inside/attend/holidayWorkReq.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">휴일근로 현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 근태관리 > 휴일근로 현황</div>
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
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>조회 기간</span>
                                    <input type="text" id="startDay" style="width: 130px;">
                                    ~
                                    <input type="text" id="endDay" style="width: 130px;">
                                </div>
                                <div class="mr10">
                                    <span>부서</span>
                                    <input type="text" id="dept" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>팀</span>
                                    <input type="text" id="team" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>상태</span>
                                    <input type="text" id="status" style="width: 100px;">
                                </div>
                                <div class="mr10">
                                    <span>성명</span>
                                    <input type="text" id="name" style="width: 100px;">
                                </div>
                                <div class="mr10">
                                    <button type="button" id="approButton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0; margin-right:10px;" onclick="">
                                        검색
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="panel-body">
            <div id="mainGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    holidayWorkReq.fn_defaultScript();
    holidayWorkReq.mainGrid();
</script>