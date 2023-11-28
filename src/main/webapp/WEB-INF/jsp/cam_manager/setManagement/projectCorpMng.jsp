<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/projectCorpMng.js?v=${today}'/>"></script>

<input type="hidden" id="myDeptSeq" name="myDeptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="myEmpSeq" name="myEmpSeq" value="${loginVO.uniqId}">

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">법인 프로젝트 관리 (관리자)</h4>
            <div class="title-road">캠매니저 > 설정관리 &gt; 법인프로젝트 관리(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div id="divBtn">
                <button type="button" id="regBtn" style="float :right" class="k-button k-button-solid-info" onclick="prjCorp.fn_popCorpProject()">프로젝트 등록</button>
            </div>
            <div style="margin-top: 35px;">
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>

    prjCorpMng.fn_defaultScript();

</script>