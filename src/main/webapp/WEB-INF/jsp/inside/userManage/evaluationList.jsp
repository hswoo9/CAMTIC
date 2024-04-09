<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-ocean-blue.min.css" />
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationList.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/fn_evaluation.js?v=${today}"/></script>

<style>
    .pink{background-color: #eee0d9;font-weight: bold;text-align: center;}
    .yellow{background-color: #ffffdd;font-weight: bold;text-align: center;}
</style>



<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationList.js?v=${today}"/></script>
<%--<script type="text/javascript" src="/js/intra/inside/evaluation/fn_evaluation.js?v=${today}"/></script>--%>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">평가관리</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 인사평가 > 평가관리</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

       <%-- <div class="panel-body">

            <div id="mainGrid" />
        </div>--%>


        <div class="panel-body">
            <div style="float:right; margin: 10px 5px;">
                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="evaluationList.fn_popEvaluationSet()">
                    <span class="k-button-text">등록</span>
                </button>
            </div>
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="7%">
                        <col width="15%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="15%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                        <col width="5%">
                    </colgroup>
                    <tr>
                        <th rowspan="3" class="text-center th-color">순번</th>
                        <th rowspan="3" class="text-center th-color">년도</th>
                        <th rowspan="3" class="text-center th-color">차수</th>
                        <th rowspan="3" class="text-center th-color">평가 인원</th>
                        <th colspan="10" class="text-center th-color">평가 결과</th>
                    </tr>
                    <tr>
                        <td colspan="5" class="pink">역량 평가</td>
                        <td colspan="5" class="yellow">업적 평가</td>
                    </tr>
                    <tr>
                        <td class="pink">역량 평가</td>
                        <td class="pink">S</td>
                        <td class="pink">A</td>
                        <td class="pink">B</td>
                        <td class="pink">C</td>
                        <td class="yellow">업적 평가</td>
                        <td class="yellow">S</td>
                        <td class="yellow">A</td>
                        <td class="yellow">B</td>
                        <td class="yellow">C</td>
                    </tr>
                    <tbody>
                    <tr style="text-align: center;">
                        <td>1</td>
                        <td>2023년</td>
                        <td>1차</td>
                        <td>86명</td>
                        <td>1차(23/07/04~23/07/10)</td>
                        <td>31</td>
                        <td>39</td>
                        <td>16</td>
                        <td>0</td>
                        <td>2023/01/01 ~ 2023/12/31</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
   /* evaluationList.fn_defaultScript();*/
</script>
