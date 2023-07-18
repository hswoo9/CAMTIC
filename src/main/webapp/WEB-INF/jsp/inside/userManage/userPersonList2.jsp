<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="/js/intra/inside/userManage/userPersonList2.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 5px;">인사관리(사용자)</h4>
            <div>직원조회 목록</div>
            <div class="title-road">캠인사이드 > 인사관리 &gt; 인사관리(사용자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="5%">
                        <col width="6%">
                        <col width="10%">
                        <col width="5%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeam" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">성별</th>
                        <td>
                            <input type="text" id="userGender" style="width:70px;">
                        </td>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td colspan="3">
                            <input type="text" id="userKind" style="width: 100px;">
                            <input type="text" id="kindContent" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <style>
                                label {
                                    position: relative;
                                    top: -1px;
                                }
                            </style>
                            <div class="mt10">
                                <input type="checkbox" class="detailSearch" id="dsA" checked>
                                <label for="dsA">전담직원</label>
                                <input type="checkbox" class="detailSearch" division="3" style="margin-left: 10px;" id="dsB">
                                <label for="dsB">단기직원</label>
                                <input type="checkbox" class="detailSearch" division="1" divisionSub="1,2" style="margin-left: 10px;" id="dsC">
                                <label for="dsC">위촉직원</label>
                                <input type="checkbox" class="detailSearch" division="2" style="margin-left: 10px;" id="dsD">
                                <label for="dsD">연수생/학생연구원</label>
                                <input type="checkbox" class="detailSearch" division="10" style="margin-left: 10px;" id="dsE">
                                <label for="dsE">기타</label>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
                <div style="display: flex; justify-content: end">
                    <div class="mr10">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="">직급/등급 관리</button>
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="">직책관리</button>
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="">서열관리</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel" id="detailSearchDiv" style="display: none;">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">상세검색</h4>
            <div class="title-road"></div>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">현황</th>
                        <td>
                            <input type="text" id="workStatusCode" style="width: 150px; margin-right:10px;">
                        </td>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="start_date_detail" style="width: 140px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReloadDetail()">검색</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">검색초기화</button>
                        </td>
                    </tr>
                </table>
                <table class="searchTable table table-bordered mb-0">
                    <tr style="width: 100%;">
                        <td style="width: 50%">
                            <div style="display: flex; justify-content: space-between; align-items: center;">유형</span>
                            <input type="text" id="detailSearch2" style="width: 90%;"></div>
                        </td>
                        <td style="width: 50%">
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

<script type="text/javascript">
    userPersonList2.init();
</script>