<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/projectBgtManagement.js?v=${today}'/>"></script>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<style>

    :root {
        --line-border-fill: #3498db;
        --line-border-empty: #e0e0e0;
    }

    * {
        box-sizing: border-box;
    }

    .totalTable td {
        height: 38.14px;
    }

    .hoverSpan:hover {
        text-decoration: underline;
    }

    #projectTooltip:hover

    .hide {
        display: none;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5),
    .k-footer-template td:nth-child(6),
    .k-footer-template td:nth-child(7),
    .k-footer-template td:nth-child(8),
    .k-footer-template td:nth-child(9) {
        border-width: 0;
    }

    .k-footer-template td:nth-child(12),
    .k-footer-template td:nth-child(13) {
        border-width: 0;
    }

    .k-footer-template td:nth-child(9),
    .k-footer-template td:nth-child(10){
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">프로젝트 예산관리</h4>
            <div class="title-road">캠매니저 > 설정관리 &gt; 프로젝트 예산관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="auto">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 기간</th>
                        <td>
                            <input type="text" id="frDt" style="width: 40%;" onchange="prjBgtMng.dateValidationCheck('frDt', this.value)"> ~
                            <input type="text" id="toDt" style="width: 40%;" onchange="prjBgtMng.dateValidationCheck('enDt', this.value)">
                        </td>
                        <th class="text-center th-color">사업구분</th>
                        <td>
                            <input type="text" id="busnClass" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">검색</th>
                        <td colspan="4">
                            <input type="text" id="searchValue2" style="width: 150px;">
                            <input type="text" id="searchText" onkeypress="if(event.keyCode==13){ prjBgtMng.gridReload(); }" style="width: 200px;">
                        </td>
                    </tr>
                </table>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    prjBgtMng.fn_defaultScript();

</script>