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
<script type="text/javascript" src="/js/intra/campus/eduReq.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">개인학습신청</h4>
            <div class="title-road">학습관리 &gt; 개인학습신청</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div style="margin-bottom:10px;">
                <table class="table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf; margin-bottom: 0">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            아래의 목록중 <b>학습종류를 선택하시기 바랍니다.</b>
                        </td>
                    </tr>
                </table>
                <br>
                <table class="table table-bordered" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf; width: 250px;">
                    <tr>
                        <td style="border-bottom:0; background-color: white; padding: 0">
                            <span id="eduFormType" style="flex-direction: column; padding: 15px"></span>
                        </td>
                    </tr>
                </table>
                <input type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="학습신청" onclick="eduReq.eduReqPop();"/>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    eduReq.init();
</script>