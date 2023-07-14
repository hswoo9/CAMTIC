<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/pdaPeristalsisList.js?v=${today}"/></script>
<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">PDA 연동 목록</h4>
            <div class="title-road">캠인사이드 > 자산관리 &gt; PDA 연동 목록</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="25%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회기간</th>
                        <td>
                            <input type="text" id="start_date" style="width: 110px;"> ~
                            <input type="text" id="end_date" style="width: 110px;">
                        </td>
                        <th class="text-center th-color">기존위치</th>
                        <td>
                            <input type="text" id="drop1" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">신규위치</th>
                        <td>
                            <input type="text" id="drop2" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">작업구분</th>
                        <td>
                            <input type="text" id="drop3" style="width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">자산상태</th>
                        <td>
                            <input type="text" id="drop4" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">재물조사</th>
                        <td>
                            <input type="text" id="drop5" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">위치변경</th>
                        <td>
                            <input type="text" id="drop6" style="width: 120px;">
                        </td>
                        <th class="text-center th-color">상태변경</th>
                        <td>
                            <input type="text" id="drop7" style="width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <th class="text-center th-color">목록</th>
                        <td colspan="4">
                            <input type="text" id="drop8" style="width: 120px;">
                            <input type="text" id="searchType" style="width: 140px; margin-right: 6px;">
                            <input type="text" id="searchVal" style="width: 140px;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">검색</button>
                        </td>
                        <td colspan="3" style="text-align: right">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">가져오기</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">재물조사 업로드</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">바코드 출력(대)</button>
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="">바코드 출력(소)</button>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    pdaPeristalsisList.init();
</script>