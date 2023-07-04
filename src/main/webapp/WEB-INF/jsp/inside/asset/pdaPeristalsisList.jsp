<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/pdaPeristalsisList.js?v=${today}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">PDA 연동 목록</h4>
            <div class="title-road">자산관리 &gt; PDA 연동 목록</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>조회기간</span>
                                    <input type="text" id="start_date" style="width: 100px;">
                                    ~
                                    <input type="text" id="end_date" style="width: 100px;">
                                </div>
                                <div class="mr10">
                                    <span>기존위치</span>
                                    <input type="text" id="drop1" style="width: 80px;">
                                </div>
                                <div class="mr10">
                                    <span>신규위치</span>
                                    <input type="text" id="drop2" style="width: 80px;">
                                </div>
                                <div class="mr10">
                                    <span>작업구분</span>
                                    <input type="text" id="drop3" style="width: 80px;">
                                </div>
                                <div class="mr10">
                                    <span>자산상태</span>
                                    <input type="text" id="drop4" style="width: 80px;">
                                </div>
                                <div class="mr10">
                                    <span>재물조사</span>
                                    <input type="text" id="drop5" style="width: 80px;">
                                </div>
                                <div class="mr10">
                                    <span>위치변경</span>
                                    <input type="text" id="drop6" style="width: 80px;">
                                </div>
                                <div class="mr10">
                                    <span>상태변경</span>
                                    <input type="text" id="drop7" style="width: 80px;">
                                </div>
                            </div>
                            <div style="display:flex;" class="mt10">

                                <div class="mr10">
                                    <span>목록</span>
                                    <input type="text" id="drop8" style="width: 120px; margin-left: 24px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="searchType" style="width: 140px; margin-right: 6px;">
                                    <input type="text" id="searchVal" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick=""/>
                                </div>
                            </div>
                            <div style="display:flex;" class="mt10">
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="가져오기" onclick=""/>
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="재물조사 업로드" onclick=""/>
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="바코드 출력(대)" onclick=""/>
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="바코드 출력(소)" onclick=""/>
                                </div>
                            </div>
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