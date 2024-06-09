<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lectureList.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />

<div style="padding: 10px">
    <button type="button" id="conSaveBtn" style="float: right; margin: 8px; display: none;" class="k-button k-button-solid-info" onclick="lecturePop.fn_consultingReqPop(${params.pjtSn})">컨설팅단위사업 등록</button>
    <button type="button" id="eduSaveBtn" style="float: right; margin: 8px; display: none;" class="k-button k-button-solid-info" onclick="lecturePop.fn_lectureReqPop(${params.pjtSn})">교육단위사업 등록</button>
    <button type="button" id="lecSaveBtn" style="float: right; margin: 8px;" class="k-button k-button-solid-info" onclick="lecturePop.lectureTeamPop(${params.pjtSn})">단위사업 등록</button>

    <div id="btnDiv" style="background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="radioSelectLecType"></span>
    </div>

    <br>

    <span style="font-size: 12px;" id="lecTitleWrap">◎ 단위사업 리스트</span>

        <div id="unitMainGrid" style="margin-top:5px; margin-bottom: 20px; display: none"></div>

        <div id="lectureMainGrid" style="margin-top:5px; margin-bottom: 20px; display: none"></div>

        <div id="consultingMainGrid" style="margin-top:5px; margin-bottom: 20px; display: none"></div>

</div>

<script>
    lectList.fn_defaultScript();
</script>