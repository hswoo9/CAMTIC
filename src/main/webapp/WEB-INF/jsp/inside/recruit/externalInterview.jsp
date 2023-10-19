<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/recruit/externalInterview.js?v=${today}"/></script>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">캠틱종합기술원 면접심사 채용공고</h4>
            <div class="title-road">캠인사이드 > 인사관리 > 채용관리 &gt; 외부위원 면접심사</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div class="table-responsive">
                    <div>
                        <table class="searchTable table table-bordered mb-0" id="holidayPlanReqPopTb">
                            <colgroup>
                                <col width="10%">
                                <col width="30%">
                                <col width="20%">
                                <col width="30%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th>공고명</th>
                                <td colspan="3">
                                    2024년도 화면 설명용
                                </td>
                            </tr>
                            <tr>
                                <th>면접심사일시</th>
                                <td colspan="3">
                                    2024-01-01 10:00 ~ 2024-01-31 17:00
                                </td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title" style="margin-bottom: 20px;">직무(모집분야)</h4>
            <div class="title-road"></div>
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">모집분야</th>
                        <td>
                            <input type="text" id="recruitment" style="width: 140px;">
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    externalInterview.init();
</script>