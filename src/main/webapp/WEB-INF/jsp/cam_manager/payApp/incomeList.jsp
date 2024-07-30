<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/incomeList.js?v=${today}'/>"></script>
<style>
    a:hover {
        color: blue;
        text-decoration: underline !important;
        cursor: pointer;
    }
    
    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">수입 결의서</h4>
            <div class="title-road">캠매니저 > 결의서관리 &gt; 수입결의서</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="7%">
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                        <col width="10%">
                        <col width="25%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">결의일자</th>
                        <td>
                            <input type="text" id="startDt" style="width: 40%;"> ~ <input type="text" id="endDt" style="width: 40%;">
                        </td>
                        <th class="text-center th-color">상태</th>
                        <td>
                            <input type="text" id="searchDept" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">입금상태</th>
                        <td>
                            <input type="text" id="searchDept2" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="text" id="searchKeyword" style="width: 30%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){incomeList.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
                <div id="hiddenGrid" style="margin:20px 0; display: none;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    incomeList.fn_defaultScript();

</script>
