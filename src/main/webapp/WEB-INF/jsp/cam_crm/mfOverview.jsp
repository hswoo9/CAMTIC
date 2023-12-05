<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/mfOverView.js?v=${today}'/>"></script>
<style>
    a {
        color : black;
    }

    a:hover{
        cursor: pointer;
        text-decoration: underline !important;
        color: blue;
    }
</style>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">실태조사</h4>
            <div class="title-road">캠CRM > CRM관리 &gt; 실태조사</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="7%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">기준년도</th>
                        <td>
                            <input type="text" id="searchYear" onchange="mov.gridReload()"/>
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td>
                            <input type="hidden" id="searchArea" name="searchArea">
                            <input type="text" id="searchKeyword" style="width: 10%;"/>
                            <input type="text" id="searchValue" style="width: 60%;" onkeypress="if(window.event.keyCode==13){mov.gridReload()}"/>
                        </td>
                    </tr>
                </table>

                <div id="statGrid" style="margin:20px 0;">
                    <table class="searchTable table table-bordered mb-0">
                        <tr id="areaTr">

                        </tr>
                        <tr id="statTr">

                        </tr>
                    </table>
                </div>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    mov.fn_defaultScript();
</script>
