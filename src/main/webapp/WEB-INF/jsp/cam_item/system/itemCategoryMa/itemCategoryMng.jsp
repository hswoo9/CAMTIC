<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/cam_item/system/itemCategoryMa/itemCategoryMng.js?v=${today}"/></script>
<style>
    .k-prompt-container, .k-window-content {
        overflow : hidden !important;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">품목 카테고리 관리</h4>
            <div class="title-road">캠아이템 > 시스템관리 > 시스템 > 품목 카테고리 관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div class="col-md-4 col-lg-4">
                    대분류
                    <div id="categoryGridA" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    중분류
                    <div id="categoryGridB" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-4 col-lg-4">
                    소분류
                    <div id="categoryGridC" style="margin:10px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script>
    icm.fn_defaultScript();
</script>
</body>
</html>