<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/itemMa/shipmentMa/shipmentTrend.js?v=${today}'/>"></script>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">출하실적추이분석</h4>
            <div class="title-road">캠아이템 > 아이템관리 &gt; 출하관리 > 출하실적추이분석</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <tr>
                        <th class="text-center th-color">년도</th>
                        <th class="text-center th-color">1월</th>
                        <th class="text-center th-color">2월</th>
                        <th class="text-center th-color">3월</th>
                        <th class="text-center th-color">4월</th>
                        <th class="text-center th-color">5월</th>
                        <th class="text-center th-color">6월</th>
                        <th class="text-center th-color">7월</th>
                        <th class="text-center th-color">8월</th>
                        <th class="text-center th-color">9월</th>
                        <th class="text-center th-color">10월</th>
                        <th class="text-center th-color">11월</th>
                        <th class="text-center th-color">12월</th>
                        <th class="text-center th-color">합계</th>
                        <th class="text-center th-color">월평균</th>
                    </tr>
                    <tbody id="progressTb">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->
<script>
    std.fn_defaultScript();
</script>
