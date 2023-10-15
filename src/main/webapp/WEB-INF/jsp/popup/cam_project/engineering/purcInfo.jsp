<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/purcInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">

<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<div style="padding: 10px">
    <div id="btnDiv">
<%--        <button type="button" class="k-button k-button-solid-info" style="float: right; margin-bottom: 10px; " id="reqBtn" onclick="purcInfo.setPurcReq('C');">요청하기</button>--%>
<%--        <button type="button" class="k-button k-button-solid-info" style="float: right; margin-bottom: 10px ; margin-right:5px;" id="saveBtn" onclick="purcInfo.setPurcReq('W');">저장</button>--%>
    </div>

    <div class="table-responsive">
        <input type="hidden" id="purcReqEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="purcReqDeptSeq" value="${loginVO.orgnztId}">

        <div id="mainGrid" style="margin-top: 20px"></div>
    </div>
</div>

<script>
    purcInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>