<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>



<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .tit_p{font-weight: bold; margin-bottom: 13px; padding-left: 12px; font-size: 13px;}
    table { background-color: white; }
</style>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="<c:url value='/js/intra/approval/storageBoxDraftDocList.js?${toDate}'/>"></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div id="mainContentArea">
    <div class="col-md-12 col-lg-12 dash-left">
        <div class="panel">
            <div class="panel-heading">
            </div>
            <div style="padding-left : 20px; padding-right: 20px;">
                <h4 class="panel-title">상신문서</h4>
                <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠도큐먼트 > 전자결재 > 상신/보관함 &gt; 상신문서</div>
                <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            </div>
            <div class="panel-body">
                <div style="margin-bottom:10px;">
                    <table class="searchTable table table-bordered" style="width: 100%">
                        <colgroup>
                            <col width="8%">
                            <col width="20%">
                            <col width="8%">
                            <col width="10%">
                            <col width="8%">
                            <col width="auto">
                        </colgroup>
                        <tr>
                            <th class="text-center th-color">조회기간</th>
                            <td>
                                <input type="text" id="startDay" style="width: 45%;"> ~ <input type="text" id="endDay" style="width: 45%">
                            </td>
                            <th class="text-center th-color">결재상태</th>
                            <td>
                                <input type="text" id="docStatus" style="width: 100%;">
                            </td>
                            <th class="text-center th-color">
                                <span class="pdr5 pdl3per">검색어</span>
                            </th>
                            <td>
                                <input type="text" id="searchKeyword" style="width: 20%;"/>
                                <input type="text" id="docTitle" onkeypress="if(window.event.keyCode==13){storageBoxDraft.gridReload()}" name="docTitle" style="width: 75%">
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="mainGrid">

                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    storageBoxDraft.init();
</script>