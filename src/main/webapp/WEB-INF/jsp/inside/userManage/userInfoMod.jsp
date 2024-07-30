<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/userInfoMod.js?v=${today}"/></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">인사정보 변경 신청(관리자)</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사관리 > 인사정보 변경 신청(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="start_date" style="width: 40%;">
                            ~
                            <input type="text" id="end_date" style="width: 40%;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" style="width: 50%;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">신청 항목</th>
                        <td>
                            <input type="text" id="drop1" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="status" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="text" id="name" style="width: 50%;">
                        </td>
                    </tr>
                    <%--<tr>
                        <th class="text-center th-color">신청 항목</th>
                        <td>
                            <input type="text" id="drop1" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="status" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="text" id="name" style="width: 150px;">
                            <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick="userInfoMod.gridReload()"/>
                        </td>
                    </tr>--%>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    userInfoMod.init();
</script>