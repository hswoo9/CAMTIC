<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budgetConfigView.js?v=${today}'/>"></script>

<style>

</style>
<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">비목세목 예산과목 설정</h4>
            <div class="title-road">캠매니저 > e-나라도움 > 비목세목 예산과목 설정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">예산그룹</th>
                        <td>
                            <input type="text" id="budgetGroup" name="budgetGroup" style="width: 150px;">
                            <button type="button" id="reqBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="budgetConfigView.fn_reqPopOnen()">
                                <span class="k-button-text">검색</span>
                            </button>
                        </td>
                    </tr>
                </table>

                <div id="budgetConfigViewGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    budgetConfigView.fn_defaultScript();
</script>
