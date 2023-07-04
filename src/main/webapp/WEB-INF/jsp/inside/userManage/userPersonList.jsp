<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
    table { background-color: white; }
    .table-bordered > tbody > tr > th{ background-color: #8fa1c0; color: white;}
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
            <h4 class="panel-title" style="margin-bottom: 5px;">인사관리</h4>
            <div>직원조회목록</div>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 &gt; 인사관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="table table-bordered" style="border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 200px; margin-right:10px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeam" style="width: 200px; margin-right:10px;">
                        </td>
                        <th class="text-center th-color">성별</th>
                        <td>
                            <input type="text" id="userGender" style="width:200px; margin-right:10px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">적용기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">기타</th>
                        <td colspan="3">
                            <input type="text" id="userKind" style="width: 100px;">
                            <input type="text" id="kindContent" style="width: 200px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReload()">검색</button>
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
<%--                                <div class="mr10">
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
&lt;%&ndash;                                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">상세검색</button>&ndash;%&gt;
                                </div>
                            </div>
                            <div class="mt10">
                                <span>적용기간</span>
                                <input type="text" id="start_date" style="width: 140px;">
                            </div>--%>
                            <style>
                                label {
                                    position: relative;
                                    top: -1px;
                                }
                            </style>
                            <div class="mt10">
                                <input type="checkbox" class="detailSearch" value="0" id="dsA">
                                <label for="dsA">정규직원</label>
                                <input type="checkbox" class="detailSearch" value="4" style="margin-left: 10px;" id="dsB">
                                <label for="dsB">계약직원</label>
<%--                                <input type="checkbox" class="detailSearch" value="2" style="margin-left: 10px;" id="dsC">--%>
<%--                                <label for="dsC">인턴사원</label>--%>
<%--                                <input type="checkbox" class="detailSearch" value="3" style="margin-left: 10px;" id="dsD">--%>
<%--                                <label for="dsD">경비/환경</label>--%>
                                <input type="checkbox" class="detailSearch" value="3" style="margin-left: 10px;" id="dsE">
                                <label for="dsE">단기직원</label>
                                <input type="checkbox" class="detailSearch" value="1" style="margin-left: 10px;" id="dsF">
                                <label for="dsF">위촉직원</label>
                                <input type="checkbox" class="detailSearch" value="2" style="margin-left: 10px;" id="dsG">
                                <label for="dsG">연수생/학생연구원</label>
                                <input type="checkbox" class="detailSearch" value="10" style="margin-left: 10px;" id="dsH">
                                <label for="dsH">기타</label>
<%--                                <input type="checkbox" class="detailSearch" value="8" style="margin-left: 10px;" id="dsI">--%>
<%--                                <label for="dsI">임시직원</label>--%>
<%--                                <input type="checkbox" class="detailSearch" value="9" style="margin-left: 10px;" id="dsJ">--%>
<%--                                <label for="dsJ">퇴사직원</label>--%>
                            </div>
                            <div class="mt10" id="subDiv" style="display: none;">
                                <input type="checkbox" class="detailSubSearch" name="subCk" value="1" id="dsSubA">
                                <label for="dsSubA">계약직원</label>
                                <input type="checkbox" class="detailSubSearch" name="subCk" value="2" style="margin-left: 10px;" id="dsSubB">
                                <label for="dsSubB">인턴사원</label>
                                <input type="checkbox" class="detailSubSearch" name="subCk" value="3" style="margin-left: 10px;" id="dsSubC">
                                <label for="dsSubC">경비/환경</label>
                            </div>
                            <div class="mt10" id="subDiv2" style="display: none;">
                                <input type="checkbox" class="detailSubSearch" name="subCk2" value="6" id="dsSubD">
                                <label for="dsSubD">위촉직원</label>
                                <input type="checkbox" class="detailSubSearch" name="subCk2" value="4" style="margin-left: 10px;" id="dsSubE">
                                <label for="dsSubE">위촉연구원</label>
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
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">상세검색</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;"></div>
            <div id="startView1" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="width: 100%">
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
                                    <input type="text" id="workStatusCode" style="width: 150px; margin-right:10px;">
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