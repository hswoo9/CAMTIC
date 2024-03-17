<%--
  Created by IntelliJ IDEA.
  User: 김에스더
  Date: 2023-11-14
  Time: 오후 12:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/attend/holidayWorkApplicationUser.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">휴일 근로 신청</h4>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">연도</th>
                        <td>
<%--                            <input type="text" id="workDay" style="width: 110px;">--%>
                            <input type="text" id="baseYear" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">처리상태</th>
                        <td>
                            <input type="text" id="status" style="width: 200px;">
                        </td>
                    </tr>
                </table>
            </div>
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>

<form id="subHolidayDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="holidayWork">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="holidayWorkMasterSn" name="holidayWorkMasterSn">
</form>

<script type="text/javascript">
    holidayWorkApplicationUser.init();
</script>
