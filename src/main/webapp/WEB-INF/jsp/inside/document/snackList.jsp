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
    table { background-color: white; }
</style>
<script type="text/javascript" src="/js/intra/inside/document/snackList.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">야근/휴일식대대장</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 문서관리 > 야근/휴일식대대장</div>
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
                                    <span>식대 구분</span>
                                    <input type="text" id="mealsDivision" style="width: 100px;">
                                </div>
                                <div class="mr10">
                                    <span>거래처</span>
                                    <input type="text" id="account" style="width: 150px;">
                                </div>
                            </div>
                            <div style="display:flex;" class="mt10">
                                <div class="mr10">
                                    <span>결제 구분</span>
                                    <input type="text" id="payDivision" style="width: 100px; margin-right:8px;">
                                </div>
                                <div class="mr10">
                                    <span>결재</span>
                                    <input type="text" id="approval" style="width: 100px;">
                                </div>
                                <div class="mr10">
                                    <button type="button" id="approButton" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="">
                                        결재
                                    </button>
                                </div>
                                <div class="mr10">
                                    <button type="button" id="document" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="snackList.snackPopup();">
                                        식대 등록하기
                                    </button>
                                </div>
                                <div class="mr10">
                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                                        <span>검색</span>
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
    snackList.fn_defaultScript();
    snackList.mainGrid();
</script>