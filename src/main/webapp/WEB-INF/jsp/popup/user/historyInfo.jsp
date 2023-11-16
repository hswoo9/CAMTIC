<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/historyInfo.js?v=${today}"/></script>

<style>
    #historyContent{border: 1px solid #eee;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div>
        <div class="panel">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">이력관리</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-base" onclick="history.back();">뒤로가기</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="historyInfo.fn_windowClose()">닫기</button>
                </div>
            </div>
                <input type="hidden" id="historySn" value="${params.historySn}" />
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <div style="margin: 20px 20px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="25%">
                        <col width="25%">
                        <col width="25%">
                        <col width="25%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>작성자</th>
                        <td>${data.regEmpName}</td>
                        <th>작성일자</th>
                        <td>${data.REG_DT}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="3">${data.HISTORY_TITLE}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colspan="3">${data.HISTORY_CONTENT}</td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td colspan="3">
                            <ul id="ulSetFileName" style="padding-left: 20px;"></ul>
                            <c:forEach var="fileInfo" items="${fileInfo}" varStatus="status">
                                <li>
                                    <span style="cursor: pointer" onclick="fileDown('${fileInfo.file_path}${fileInfo.file_uuid}', '${fileInfo.file_org_name}.${fileInfo.file_ext}')">
                                        ${fileInfo.file_org_name}.${fileInfo.file_ext}
                                    </span>
                                </li>
                            </c:forEach>
                            <ul id="ulFileName" style="padding-left: 20px;"></ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">

</script>
</body>
</html>