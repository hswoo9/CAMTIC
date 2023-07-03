<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-06-08
  Time: 오후 16:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/eduManagement.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">공통학습관리(캠화지등)</h4>
            <div class="title-road">학습관리 &gt; 공통학습관리</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div style="margin-bottom:10px;">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div>
                                    <span>조회년도</span>
                                    <input type="text" id="eduYear" style="width: 140px;">
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
    eduManagement.init();
</script>