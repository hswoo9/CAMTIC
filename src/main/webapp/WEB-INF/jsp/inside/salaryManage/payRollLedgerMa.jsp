<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/inside/salaryManage/payRollLedgerMa.js?v=${today}'/>"></script>
<style>
    #my-spinner { width: 100%; height: 100%; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>


<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">급여대장관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 참여율관리 > 급여대장관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">년월</th>
                        <td>
                            <input type="text" id="searchYear" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyWord" style="width: 20%;"/>
                            <input type="text" id="searchValue" style="width: 30%;" onkeypress="if(window.event.keyCode==13){payRollLedgerMa.gridReload()}"/>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>

                <div id="mainGrid2" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    payRollLedgerMa.fn_defaultScript();
</script>