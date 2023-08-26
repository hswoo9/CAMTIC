<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/eduStat.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">학습통계</h4>
            <div class="title-road">학습통계 &gt; 학습통계</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="eduYear" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">직무</th>
                        <td>
                            <input type="text" id="largeCategory" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">구분</th>
                        <td>
                            <input type="text" id="eduCategory" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">Level</th>
                        <td>
                            <input type="text" id="level" style="width: 140px;">
                        </td>
                        <th class="text-center th-color">학습목표</th>
                        <td colspan="3">
                            <input type="text" id="eduCategoryDetail" style="width: 140px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    eduStat.init();
</script>