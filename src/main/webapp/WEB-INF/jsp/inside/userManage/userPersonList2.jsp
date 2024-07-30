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
            <h4 class="panel-title" style="margin-bottom: 5px;">인사관리</h4>
            <div class="title-road">캠인사이드 > 인사관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="8%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="20%">
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
                        <th class="text-center th-color">조회기준일</th>
                        <td>
                            <input type="text" id="start_date" style="width: 100%;">
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
                                <label for="dsA">전담직원 [${countMap.dsA}]</label>
                                <input type="checkbox" class="detailSearch" division="1" divisionSub="6" style="margin-left: 10px;" id="dsC">
                                <label for="dsC">위촉직원 [${countMap.dsC}]</label>
                                <input type="checkbox" class="detailSearch" division="3" style="margin-left: 10px;" id="dsB">
                                <label for="dsB">단기직원 [${countMap.dsB}]</label>
                                <input type="checkbox" class="detailSearch" division="4" divisionSub="3" style="margin-left: 10px;" id="dsD">
                                <label for="dsD">시설/환경 [${countMap.dsD}]</label>
                                <input type="checkbox" class="detailSearch" division="2" style="margin-left: 10px;" id="dsG">
                                <label for="dsG">연수생/학생연구원 [${countMap.dsG}]</label>
                                <input type="checkbox" class="detailSearch" division="10" style="margin-left: 10px;" id="dsE">
                                <label for="dsE">기타 [${countMap.dsE}]</label>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    userPersonList2.init();
</script>