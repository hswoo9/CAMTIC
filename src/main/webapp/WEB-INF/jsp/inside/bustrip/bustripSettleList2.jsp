<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripSettleListMng.js?v=${today}"/></script>
<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6),
    .k-footer-template td:nth-child(7),
    .k-footer-template td:nth-child(8),
    .k-footer-template td:nth-child(9),
    .k-footer-template td:nth-child(10) {
        border-width: 0;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">출장정산 (관리자)</h4>
            <div class="title-road">캠인사이드 > 출장관리 &gt; 출장정산 (관리자)</div>
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
                        <th class="text-center th-color">출장 년월일</th>
                        <td>
                            <%--<input type="text" id="applyDt" style="width: 150px;">--%>
                            <input type="text" id="start_date" style="width: 110px;">
                            ~
                            <input type="text" id="end_date" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 160px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" style="width: 150px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<form id="bustripDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="bustrip">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="hrBizReqId" name="hrBizReqId"/>
</form>

<script type="text/javascript">
    bustripSettleList.init();
</script>