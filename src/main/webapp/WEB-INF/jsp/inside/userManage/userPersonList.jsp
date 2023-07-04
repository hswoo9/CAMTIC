<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
    table { background-color: white; }
</style>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/inside/userManage/userPersonList.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>

        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직원조회목록</h4>
            <div class="title-road" style="text-align: right;">인사관리 &gt; 직원조회목록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>부서</span>
                                    <input type="text" id="deptComp" style="width: 150px; margin-right:10px;">
                                </div>
                                <div class="mr10">
                                    <span>팀</span>
                                    <input type="text" id="deptTeam" style="width: 200px; margin-right:10px;">
                                </div>
                                <div class="mr10">
                                    <span>성별</span>
                                    <input type="text" id="userGender" style="width:70px; margin-right:10px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="userKind" style="width: 100px;">
                                    <input type="text" id="kindContent" style="width: 200px;">
                                </div>
                                <div class="mr10">
                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReload()">검색</button>
<%--                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">상세검색</button>--%>
                                </div>
                            </div>
                            <div class="mt10">
                                <span>조회기간</span>
                                <input type="text" id="start_date" style="width: 140px;">
                                ~
                                <input type="text" id="end_date" style="width: 140px;">
                            </div>
                            <div class="mt10">
                                <input type="text" id="detailSearch" style="width: 90%;">
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
                <div style="display: flex; justify-content: end">
                    <div class="mr10">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">직급/등급 관리</button>
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">직책관리</button>
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">서열관리</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">상세검색</h4>
            <div class="title-road">인사관리 &gt; 직원조회목록</div>
        </div>

        <div class="panel-body">
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div style="margin-bottom:10px;">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="50%">
                        <col width="50%">
                    </colgroup>
                    <tr>
                        <td colspan="2" style="border-bottom:0; background-color: white">
                        <div style="display:flex; justify-content: space-between;">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>현황</span>
                                    <input type="text" id="drop1" style="width: 150px; margin-right:10px;">
                                </div>
                                <div class="mr10">
                                    <span>조회 기간</span>
                                    <input type="text" id="start_date_detail" style="width: 140px;">
                                    ~
                                    <input type="text" id="end_date_detail" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReloadDetail()">검색</button>
<%--                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">일반검색</button>--%>
                                </div>
                            </div>
                            <div>
                                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">검색초기화</button>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;">유형</span>
                            <input type="text" id="detailSearch2" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">성별</span>
                            <input type="text" id="detailSearch3" style="width: 90%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">부서</span>
                            <input type="text" id="detailSearch4" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">팀</span>
                            <input type="text" id="detailSearch5" style="width: 90%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">직급</span>
                            <input type="text" id="detailSearch6" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">연령</span>
                            <input type="text" id="detailSearch7" style="width: 90%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">근속년수</span>
                            <input type="text" id="detailSearch8" style="width: 90%;"></div>
                        </td>
                        <td>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span class="mr10">최종학력</span>
                            <input type="text" id="detailSearch9" style="width: 90%;"></div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid2" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<%--<jsp:include page="/WEB-INF/jsp/popup/approval/popup/approvalService.jsp?v=${today}"></jsp:include>--%>
<script type="text/javascript">
    userPersonList.init();
</script>