<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/userInfoModReg.js?v=${today}"/></script>
<script src="https://kendo.cdn.telerik.com/2023.2.606/js/jszip.min.js"></script>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">인사정보 변경 신청(사용자)</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 인사정보 변경 신청(사용자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="start_date" style="width: 110px;">
                            ~
                            <input type="text" id="end_date" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                            <input type="text" id="deptName" name="deptName" style="width: 150px;" value="${loginVO.name}" disabled>
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="hidden" id="teamSeq" name="teamId" value="${loginVO.teamId}">
                            <input type="text" id="teamNm" name="teamNm" style="width: 180px;" value="${loginVO.teamNm}" disabled>
                        </td>
                        <th class="text-center th-color">신청 항목</th>
                        <td>
                            <input type="text" id="drop1" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="status" style="width: 70px;">
                        </td>
                        <th class="text-center th-color">이름</th>
                        <td>
                            <input type="hidden" id="empSeq" style="width: 150px;" value="${loginVO.uniqId}">
                            <input type="text" id="empName" style="width: 150px;" value="${loginVO.name}" disabled>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    userInfoModReg.init();
</script>