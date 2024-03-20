<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="/js/intra/campus/dutyInfo.js?v=${toDate}"/></script>
<script type="text/javascript" src="/js/intra/campus/dutyInfoLeader.js?v=${toDate}"/></script>
<style>
    .hover:hover {text-decoration: underline; cursor: pointer}
</style>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">
<input type="hidden" id="myEmpName" name="myEmpName" value="${loginVO.name}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">목표/직무기술서 승인</h4>
            <div class="title-road">캠퍼스 > 학습관리 > 직무관리 > 목표/직무기술서 승인</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                        <col width="%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="requestYear" class="searchInput" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" class="searchInput" style="width: 150px;">
                            <input type="text" id="team" class="searchInput" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input id="searchValue" onkeypress="if(window.event.keyCode==13){gridReload()}" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">목표기술서</th>
                        <td>
                            <input type="text" id="status" class="searchInput" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">직무기술서</th>
                        <td>
                            <input type="text" id="status2" class="searchInput" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">퇴사자</th>
                        <td>
                            <input type="text" id="active" class="searchInput" style="width: 100px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    dutyInfoLeader.init();
</script>