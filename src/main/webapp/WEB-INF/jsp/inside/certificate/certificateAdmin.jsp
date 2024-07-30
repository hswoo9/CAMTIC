<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/certificate/certificateAdmin.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/certificate/certificateList.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">증명서 관리</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 증명서관리 &gt; 증명서관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="8%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="10%">
                        <col width="5%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회연도</th>
                        <td>
                            <input type="text" id="docuYearDe" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">발급구분</th>
                        <td>
                            <input type="text" id="proofType" style="width: 100%;">
                            <div class="mr20" style="display: none">
                                <span>처리상태</span>
                                <input type="text" id="status1" style="width: 100%;">
                            </div>
                        </td>
                        <th class="text-center th-color">용도</th>
                        <td>
                            <input type="text" id="purpose" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">처리상태</th>
                        <td>
                            <input type="text" id="status" style="width: 100%;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchType" style="width: 30%">
                            <input type="text" id="searchText" value="" onkeypress="if(window.event.keyCode==13){certificateAdmin.gridReload();}" style="width: 50%;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    certificateAdmin.init();
</script>