<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/campus/hist/eduInfoHist.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/hist/studyInfoHist.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/hist/propagInfoHist.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/hist/ojtInfoHist.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/hist/openstudyInfoHist.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/campus/hist/commonEduInfoHist.js?v=${today}"/></script>

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
            <h4 class="panel-title">나의학습현황이력(~2023년)</h4>
            <div class="title-road">캠퍼스 &gt; 나의학습현황이력(~2023년)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회 연도</th>
                        <td>
                            <input type="text" id="eduYear" style="width: 110px;">
                        </td>
                    </tr>
                </table>
                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 개인 직무학습</span></div></div>
                <div id="mainGrid" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 학습조</span></div></div>
                <div id="mainGrid2" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 전파학습</span></div></div>
                <div id="mainGrid3" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ OJT</span></div></div>
                <div id="mainGrid4" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 오픈스터디</span></div></div>
                <div id="mainGrid5" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 공통학습</span></div></div>
                <div id="mainGrid6" style="margin: 5px 0 25px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    histEduInfo.fn_defaultScript();
</script>