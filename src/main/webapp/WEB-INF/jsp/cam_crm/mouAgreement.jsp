<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/cam_crm/mouAgreement.js?v=${today}"/></script>
<style>
    tr.activeRow td{
        background-color: #ffce60b0;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">MOU 협약</h4>
            <div class="title-road">캠CRM > CRM관리 &gt; MOU 협약</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="baseYear" style="width: 50%;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 15%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){mouAgr.fn_mainGridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div class="col-md-9 col-lg-9" style="padding-left:0; padding-right: 10px;">
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </div>
                <div class="col-md-3 col-lg-3" style="padding: 0;">
                    <div id="subGrid" style="margin:20px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    mouAgr.fn_defaultScript();
</script>