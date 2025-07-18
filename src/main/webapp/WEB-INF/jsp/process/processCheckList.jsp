<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/process/processCheckList.js?v=${today}'/>"></script>
<style>
    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">승인함 </h4>
            <div class="title-road">캠도큐먼트 > 승인함</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="24%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">요청일시</th>
                        <td>
                            <input type="text" id="strDe" style="width: 45%;"> ~ <input type="text" id="endDe" style="width: 45%;">
                        </td>
                        <th class="text-center th-color">승인상태</th>
                        <td>
                            <input id="inspectStat" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input id="searchKeyword" style="width: 30%;"/>
                            <input id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){pcList.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="processMainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    pcList.fn_defaultScript();

</script>
