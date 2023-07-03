<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/classManage.js?v=${today}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">분류관리</h4>
            <div class="title-road">자산관리 &gt; 분류관리</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <div class="col-md-4 col-lg-4">
                    소속관리
                    <div id="mainGrid" style="margin:5px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    구분관리
                    <div id="mainGrid2" style="margin:5px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    위치관리
                    <div id="mainGrid3" style="margin:5px 0;"></div>
                </div>
            </div>
        </div>

        <div class="panel-body">
            <div>
                카테고리관리
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>카테고리</span>
                                    <input type="text" id="drop1" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <span>소속코드</span>
                                    <input type="text" id="drop2" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <span>명칭</span>
                                    <input type="text" id="searchVal" style="width: 140px;">
                                </div>
                                <div class="mr10">
                                    <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="검색" onclick=""/>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid4" style="margin:10px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    classManage.init();
</script>