<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndDevJob.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="R2" />
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="devSn" value="" />
<div style="padding: 10px">
    <div class="table-responsive">
        <button type="button" id="jobAddBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="rndDJ.fn_popAddJob()">등록</button>
        <br><br>
        <div id="rndDJMainGrid"></div>

    </div>
</div>

<script>
    rndDJ.fn_defaultScript();
</script>