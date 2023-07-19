<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/history/historyReqPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<div class="card-header pop-header">
    <h3 class="card-title title_NM">인사발령 등록</h3>
</div>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-body" style="padding: 20px 0px;">
            <div>
                <table class="searchTable table table-bordered mb-0" style="border: 0; margin-left: 20px;  margin-top : 5px; border: 1px solid #dedfdf; width: 1400px">
                    <colgroup>
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="23%">
                        <col width="10%">
                        <col width="23%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="dept" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="team" style="width: 200px;">
                        </td>
                        <th class="text-center th-color">성명</th>
                        <td>
                            <input type="text" id="searchVal" style="width: 200px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReqPop.gridReload()">조회</button>
                        </td>
                    </tr>
                </table>
                <div class="col-md-3 col-lg-3 dash-left">
                    <div class="col-md-10 col-lg-10 dash-left mt10">
                        <h4>· 직원목록</h4>
                        <div id="mainGrid" style="margin:34px 0;"></div>
                    </div>
                    <div class="col-md-2 col-lg-2 dash-left" style="position: absolute; right: -16px; top: 50%;">
                        →
                    </div>
                </div>
                <div class="col-md-9 col-lg-9 dash-left mt-10">
                    <table class="searchTable table table-bordered mb-0" id="">
                        <colgroup>
                            <col width="10%">
                            <col width="23%">
                            <col width="10%">
                            <col width="23%">
                            <col width="10%">
                            <col width="23%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>호수</th>
                            <td>
                                <input type="text" id="numberName" class="defaultVal" style="width: 200px;">
                            </td>
                            <th>관련근거</th>
                            <td>
                                <input type="text" id="relevantName" class="defaultVal" style="width: 200px;">
                            </td>
                            <th>발령 일자</th>
                            <td colspan="3">
                                <input type="text" id="historyDate" class="defaultVal" style="width: 200px;">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="table-responsive mt20">
                        <div id="popMainGrid">

                        </div>
<%--                        <table class="table table-bordered">--%>
<%--                            <colgroup>--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                                <col width="6%" >--%>
<%--                            </colgroup>--%>
<%--                            <thead>--%>
<%--                            <tr>--%>
<%--                                <th rowspan="2"><input type="checkbox" class="apntCheckAll" id="apntCheckAll"></th>--%>
<%--                                <th rowspan="2">성명</th>--%>
<%--                                <th rowspan="2">발령기준</th>--%>
<%--                                <th colspan="5">발령전</th>--%>
<%--                                <th colspan="5">발령후</th>--%>
<%--                                <th rowspan="2">비고</th>--%>
<%--                            </tr>--%>
<%--                            <tr>--%>
<%--                                <th>부서</th>--%>
<%--                                <th>팀</th>--%>
<%--                                <th>직급/등급</th>--%>
<%--                                <th>직책</th>--%>
<%--                                <th>직무</th>--%>
<%--                                <th>부서</th>--%>
<%--                                <th>팀</th>--%>
<%--                                <th>직급/등급</th>--%>
<%--                                <th>직책</th>--%>
<%--                                <th>직무</th>--%>
<%--                            </tr>--%>
<%--                            </thead>--%>
<%--                            <tbody id="apntBody">--%>

<%--                            </tbody>--%>
<%--                        </table>--%>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    historyReqPop.init();
</script>
</body>
