<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/equipInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/asset/equipmentList.js?v=${today}'/>"/></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<style>
    table {margin-top: 0 !important;}
</style>


<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<form id="costDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">

<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<div style="padding: 10px">
    <div id="costBtnDiv">
        <%--<button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="costInfo.fn_save()">저장</button>--%>
    </div>
    <div class="table-responsive">
        <span style=""> ※ 장비 정보</span>
        <div id="equipGrid"></div>
    </div>
</div>

<script>
    equipInfo.fn_defaultScript();
</script>
</body>
</html>