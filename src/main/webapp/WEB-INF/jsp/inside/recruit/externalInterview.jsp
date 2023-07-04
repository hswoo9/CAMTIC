<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/recruit/externalInterview.js?v=${today}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">캠틱종합기술원 면접심사 채용공고</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 채용관리 &gt; 외부의원 면접심사</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <div class="table-responsive">
                    <div>
                        <table class="table table-bordered mb-0" id="holidayPlanReqPopTb">
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
            <h4 class="panel-title">직무(모집분야)</h4>
        </div>

        <div class="panel-body">
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>모집분야</span>
                                    <input type="text" id="recruitment" style="width: 140px;">
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
    externalInterview.init();
</script>