<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/archiveReqPop.js?v=${today}"/></script>
<input type="hidden" id="archiveSn" value="${data.archiveSn}"/>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">문서고 등록</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="archiveReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <form style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="4">개발사업 수주대장</th>
                </tr>--%>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>문서년도
                    </th>
                    <td>
                        <input type="text" id="docYear" style="width: 150px; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>문서번호
                    </th>
                    <td>
                        <input type="text" id="docNum" style="width: 100%; margin-right:10px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>부서명
                    </th>
                    <td>
                        <input type="text" id="dept" style="width: 150px; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>팀명
                    </th>
                    <td>
                        <input type="text" id="team" style="width: 100%; margin-right:10px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>문서위치
                    </th>
                    <td colspan="3">
                        <input type="text" id="visit" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>담당자
                    </th>
                    <td colspan="3">
                        <input type="text" id="empName" style="width: 65%;">
                        <input type="hidden" id="empSeq">
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px;" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>보존년한
                    </th>
                    <td>
                        <input type="text" id="prePeriod" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>폐기년도
                    </th>
                    <td>
                        <input type="text" id="disYear" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>첨부파일
                    </th>
                    <td colspan="3">
                        <input type="file" disabled>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>


<script>
    archiveReq.init();
</script>
</body>
</html>