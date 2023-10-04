<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/g20/project.js?v=${today}"/></script>
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="devSchSn" value="${params.devSchSn}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">프로젝트</span>
            </h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-base" onclick="save()">저장</button>
        </div>
        <table class="popTable table table-bordered mb-0" style="margin-top:15px;">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>기간
                </th>
                <td colspan="3">
                    <input type="text" id="pjtFromDate" style="width: 25%; text-align: left"> ~
                    <input type="text" id="pjtToDate" style="width: 25%; text-align: left">
                </td>
            </tr>
            </thead>
        </table>

        <div id="mainGrid">

        </div>
    </div>
</div>
<script type="text/javascript">

    g20Project.fn_defaultScript();



</script>
</body>
</html>