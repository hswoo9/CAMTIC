<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/equipmentListAdminView.js?v=${today}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">장비관리 (관리자)</h4>
            <div class="title-road">장비관리 &gt; 장비관리 (관리자)</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>조회년월</span>
                                    <input type="text" id="usePdStrDe" style="width: 130px;">
                                    ~
                                    <input type="text" id="usePdEndDe" style="width: 130px;">
                                </div>
                                <div class="mr10">
                                    <span>구분</span>
                                    <input type="text" id="mainEqipmnGbnName" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>업체구분</span>
                                    <input type="text" id="mainPrtpcoGbnName" style="width: 130px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="searchType" style="width: 140px; margin-right: 6px;">
                                    <input type="text" id="searchVal" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="조회" onclick="equipmentListAdminView.mainGrid();"/>
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="장비관리" onclick="equipmentListAdminView.equipmentmangePopup();"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="" style="margin:20px 0;">
                    <h5>[2023년 5월 장비사용현황]</h5>
                    <table class="table table-bordered" style="width: 200px;">
                        <colgroup>
                            <col width="" >
                            <col width="" >
                        </colgroup>
                        <thead>
                        <tr>
                            <th>진행상황</th>
                            <td>승인</td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    equipmentListAdminView.init();
</script>