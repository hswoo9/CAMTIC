<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/userInfoMod.js?v=${today}"/></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">인사정보변경신청</h4>
            <div class="title-road">인사관리 &gt; 인사정보변경신청</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>조회연도</span>
                                    <input type="text" id="start_date" style="width: 140px;">
                                    ~
                                    <input type="text" id="end_date" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <span>부서</span>
                                    <input type="text" id="dept" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>팀</span>
                                    <input type="text" id="team" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>신청 항목</span>
                                    <input type="text" id="drop1" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>상태</span>
                                    <input type="text" id="status" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <span>이름</span>
                                    <input type="text" id="name" style="width: 120px;">
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="검색" onclick="userInfoMod.gridReload()"/>
                                </div>
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
    userInfoMod.init();
</script>