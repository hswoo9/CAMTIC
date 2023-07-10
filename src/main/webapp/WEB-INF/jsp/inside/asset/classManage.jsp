<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/asset/classManage.js?v=${today}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
    .k-grid-norecords{justify-content: space-around;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">분류관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 자산관리 &gt; 분류관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div class="col-md-4 col-lg-4">
                    소속관리
                    <div id="positionGrid" style="margin:5px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    구분관리
                    <div id="divisionGrid" style="margin:5px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    위치관리
                    <div id="placeGrid" style="margin:5px 0;"></div>
                </div>
            </div>
        </div>

        <div class="panel-body">
            <div>
                카테고리관리
                <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
                <div>
                    <div class="col-md-4 col-lg-4">
                        카테고리(대)
                        <div id="categoryGridA" style="margin:10px 0;"></div>
                    </div>
                    <div class="col-md-4 col-lg-4">
                        카테고리(중)
                        <div id="categoryGridB" style="margin:10px 0;"></div>
                    </div>
                    <div class="col-md-4 col-lg-4">
                        카테고리(소)
                        <div id="categoryGridC" style="margin:10px 0;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    classManage.init();
</script>