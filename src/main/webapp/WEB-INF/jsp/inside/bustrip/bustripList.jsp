<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${toDate}"/></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripList.js?v=${toDate}"/></script>
<input type="hidden" id="pageName" value="bustripList"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">출장신청</h4>
            <div class="title-road">캠인사이드 > 출장관리 &gt; 출장신청</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="25%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">출장 기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 120px;">
                            ~
                            <input type="text" id="end_date" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="tripCode" style="width: 90%"/>
                        </td>
                        <th class="text-center th-color">관련사업</th>
                        <td>
                            <input type="text" id="project" style="width: 90%"/>
                        </td>
                        <th class="text-center th-color">사업명</th>
                        <td>
                            <input type="text" id="busnName" style="width: 90%;">
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
    bustripList.init();
</script>