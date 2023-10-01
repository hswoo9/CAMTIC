<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndResearcherInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="R0" />
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="engnSn" value="${params.engnSn}" />

<div style="padding: 10px">
<%--    <button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="bustInfo.fn_save()">저장</button>--%>

    <br><br>
    <span style=""> ◎ 연구원 정보</span>
    <div id="rschMainGrid" style="margin-top:5px;"></div>
</div>

<script>
    rndRschInfo.fn_defaultScript();
</script>