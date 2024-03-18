<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/campus/hist/studyInfoHist.js?v=${today}"/></script>

<style>
    a:hover{
        text-decoration: underline !important;
        color: blue;
    }
</style>
<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">학습조신청목록이력(~2023년)</h4>
            <div class="title-road">캠퍼스 &gt; 학습조신청목록이력(~2023년)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <div id="mainGrid2" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    studyInfoHist.fn_defaultScript();
</script>