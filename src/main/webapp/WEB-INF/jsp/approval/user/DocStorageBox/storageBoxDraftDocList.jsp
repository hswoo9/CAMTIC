<%--
Created by IntelliJ IDEA.
User: jsy
Date: 2023-02-28
Time: 오후 3:21
To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<style>
    .tit_p{font-weight: bold; margin-bottom: 13px; padding-left: 12px; font-size: 13px;}
    table { background-color: white; }
</style>
<link rel="stylesheet" href="/css/intra/kTreeView.css?${toDate}">
<script type="text/javascript" src="<c:url value='/js/intra/approval/storageBoxDraftDocList.js?${toDate}'/>"></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">상신문서</h4>
        </div>
        <div class="panel-body">
            <div class="table-responsive" style="margin-bottom:10px;">
                <table style="width: 100%">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회기간</th>
                        <td>
                            <input type="text" id="startDay" style="width: 45%;"> ~ <input type="text" id="endDay" style="width: 45%">
                        </td>
                        <th class="text-center th-color">
                            <span class="pdr5 pdl3per">문서명</span>
                        </th>
                        <td>
                            <input type="text" id="docTitle" name="docTitle" style="width: 90%">
                            <button type="button" class=" k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="storageBoxDraft.gridReload()">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="mainGrid">

            </div>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>

<script type="text/javascript">
    storageBoxDraft.fnDefaultScript();
</script>