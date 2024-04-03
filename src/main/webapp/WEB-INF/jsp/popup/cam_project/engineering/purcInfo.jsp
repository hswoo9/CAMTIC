<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/purcInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>
    .k-footer-template td:nth-child(8) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4),
    .k-footer-template td:nth-child(5) {
        border-width: 0;
    }

    .k-grid-content td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">

<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<div style="padding: 10px">
    <div id="btnDiv" style="background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="radioSelectPurcType"></span>
    </div>

    <br>
    <span style="font-size: 12px;" id="purcTitleWrap">◎ 구매 리스트</span>
    <div class="table-responsive">
        <input type="hidden" id="purcReqEmpSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="purcReqDeptSeq" value="${loginVO.orgnztId}">

        <div id="purcInfoMainGrid"></div>
        <div id="purcInfoMainGrid2" style="display: none"></div>
    </div>
    <span id="mainGrid1Wrap">
        <div style="margin-top:10px;"></div><span style="font-size: 12px;">◎ 구매내역 리스트</span>
        <div class="table-responsive">
            <div id="purcInfoSubGrid"></div>
        </div>
    </span>
</div>

<script>
    var _contextPath_ = '${pageContext.request.contextPath}'

    purcInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>