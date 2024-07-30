<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/employeeInterviewCard.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직원 면담 카드</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사평가 > 직원면담카드</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="15%">
                        <col>
                        <col width="15%">
                        <col>
                        <col width="15%">
                        <col>
                        <col>
<%--                        <col width="20%">--%>
<%--                        <col width="10%">--%>
<%--                        <col width="20%">--%>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchDate" style="width:100%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width:160px;">
                            <input type="hidden" id="dept_seq">
                            <input type="text" id="team" style="width:165px;">
                            <input type="hidden" id="team_seq">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="text" id="searchType" style="width: 80px;">
                            <input type="text" id="searchText" onkeypress="if(window.event.keyCode==13){employeeList.gridReload()}" style="width: 140px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    employeeList.init();

    function gridReload() {
        var grid = $("#mainGrid").data("kendoGrid");
        if (grid) {
            grid.dataSource.read(); // 데이터 소스 새로고침
        }
    }


</script>