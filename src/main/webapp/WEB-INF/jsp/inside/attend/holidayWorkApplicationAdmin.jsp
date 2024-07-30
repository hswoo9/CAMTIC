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
<script type="text/javascript" src="/js/intra/inside/attend/holidayWorkApplicationAdmin.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="apprMngStat" value="M">
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">휴일 근로 신청(담당자)</h4>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="18%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                        <col width="25%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">일자</th>
                        <td>
                            <input type="text" id="strDt" style="width: 45%;"> ~
                            <input type="text" id="endDt" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">결재상태</th>
                        <td>
                            <input type="text" id="docStatus" style="width: 60%">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){holidayWorkApplicationAdmin.gridReload()}"/>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>
    </div>
</div>

<form id="subHolidayDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="subHoliday">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="subHolidayId" name="subHolidayId" value=""/>
</form>

<script type="text/javascript">
    holidayWorkApplicationAdmin.init();
</script>
