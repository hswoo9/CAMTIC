<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/exnpDeChangeRs.js?v=${today}'/>"></script>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">지출요청일 변경사유 설정</h4>
            <div class="title-road">캠매니저 > 설정관리 &gt; 지출요청일 변경사유 설정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div id="divBtn">
                <button type="button" id="regBtn" style="float :right" class="k-button k-button-solid-info" onclick="exnpDeChangeRs.fn_regReasonPop()">사유 등록</button>
            </div>
            <div style="margin-top: 35px;">
                <div id="rsMainGrid" style="margin:10px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<div id="dialog">
    <table class="popTable table table-bordered mb-0" id="userReqPopImageTable" style="width: 100%">
        <colgroup>
            <col width="15%">
            <col width="35%">
            <col width="15%">
            <col width="35%">
        </colgroup>
        <thead>
        <tr style="" id="row3">
            <th>사유</th>
            <td colspan="3">
                <input type="text" id="title" style="width: 100%" name="title" value="">
            </td>
        </tr>
        <tr>
            <th>사용여부</th>
            <td colspan="3">
                <input type="radio" id="useY" style="position: relative; top:3px;" name="useYn" value="Y" checked>
                <label for="useY" style="position: relative; top:3px; ">사용</label>
                <input type="radio" id="useN" style="position: relative; top:3px; margin-left: 5px;" name="useYn" value="N">
                <label for="useN" style="position: relative; top:3px;">미사용</label>
            </td>
        </tr>
        </thead>
    </table>
    <button type="button" class="k-button k-button-solid-base" style="float: right; margin-top:8px; font-size: 12px;" onclick="exnpDeChangeRs.fn_save()">저장</button>
</div>

<script>
    $("#dialog").kendoWindow({
        title: "지출예정일 변경 사유 등록",
        visible : false,
        resizable: false,
        modal: true,
        width: 700,
        scrollable: false,
        actions: ["Close"],
    });

    exnpDeChangeRs.fn_defaultScript();

</script>