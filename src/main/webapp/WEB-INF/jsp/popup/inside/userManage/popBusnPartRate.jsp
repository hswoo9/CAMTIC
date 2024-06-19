<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_project/commonProject.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/userManage/busnPartRate.js?v=${today}"/></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="devSchSn" value="${params.devSchSn}" />

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">사업별 참여현황</span>
            </h3>
        </div>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color" style="font-weight: bold" colspan="4">
                    <span class="red-star"></span>사업정보
                </th>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>프로젝트 코드
                </th>
                <td>
                    <input type="text" disabled id="pjtCd" style="width: 90%;" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>관리시스템
                </th>
                <td>
                    <input type="text" id="busnClass" disabled style="width: 90%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>프로젝트 명
                </th>
                <td colspan="3">
                    <input type="text" id="pjtNm" disabled style="width: 90%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>프로젝트 시작
                </th>
                <td>
                    <input type="text" id="strDt" disabled style="width: 40%; text-align: left">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>프로젝트 종료
                </th>
                <td>
                    <input type="text" id="endDt" disabled style="width: 40%; text-align: left">
                </td>
            </tr>
            </thead>
        </table>

        <div id="btnDiv">
            <button type="button" id="regPayBtn" style="float: right; margin-top: 10px; margin-bottom: 5px;margin-right : 5px"  class="k-button k-button-solid-info" onclick="busnPartRate.fn_reqRegPopup(${params.pjtSn})">지급신청</button>
            <button type="button" id="saveBtn" style="float: right; margin-top: 10px; margin-bottom: 5px; margin-right : 5px" class="k-button k-button-solid-base" onclick="busnPartRate.fn_save()">저장</button>
        </div>
        <table class="popTable table table-bordered mb-0">
            <thead>
                <tr>
                    <th scope="row" class="text-center th-color" colspan="50" style="font-weight: bold">참여인력 인건비 정보</th>
                </tr>
                <tr id="thHtml">

                </tr>
            </thead>
            <tbody id="tdHtml"></tbody>
            <tfoot id="lastTr"></tfoot>
        </table>
    </div>
</div>
<script type="text/javascript">
    busnPartRate.fn_defaultScript();
</script>
</body>
</html>