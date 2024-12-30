<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationPerReq.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/cam_project/engn/costCalc.js?v=${today}"/></script>

<style>
    .pink{background-color: #fce4d6;font-weight: bold;text-align: center;}
    .yellow{background-color: #fff2cc;font-weight: bold;text-align: center;}
    .green{background-color: #e2efda;font-weight: bold;text-align: center;}
    .blue{background-color: #ddebf7;font-weight: bold;text-align: center;}
    .orange{background-color: #ffcc99;font-weight: bold;text-align: center;}
    #evalList td{text-align: center}
    #evalListDiv {width: 100%;overflow-x: auto;white-space: nowrap;}

    #my-spinner { width: 100%; height: 100vh; top: 0; left: 0; display: none; opacity: .6; background: silver; position: absolute; z-index: 2; }
    #my-spinner div { width: 100%; height: 100%; display: table; }
    #my-spinner span { display: table-cell; text-align: center; vertical-align: middle; }
    #my-spinner img { background: white; padding: 1em; border-radius: .7em; }
</style>

<div id='my-spinner'>
    <div>
    <span>
    	<img src='//cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif'>
    </span>
    </div>
</div>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyCode" value="${loginVO.dutyCode}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">업적평가하기</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 성과관리 > 인사평가 > 업적평가하기</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="8%">
                        <col width="">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchYear" style="width:10%;">
                            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="evaluationPerReq.getEvaluationList()">조회</button>
                        </td>

                    </tr>
                </table>
                <div style="float: right; margin: 10px 5px;">
                    <c:if test="${loginVO.dutyCode eq '5'}">
                        <div id="approveDiv" style="display: unset;">

                        </div>
                    </c:if>

                    <c:if test="${loginVO.dutyCode eq '1' or loginVO.dutyCode eq '2' or loginVO.dutyCode eq '3' or loginVO.dutyCode eq '4' or loginVO.dutyCode eq '5' or loginVO.dutyCode eq '7'}">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="evaluationPerReq.evalScorePop()">
                        <span class="k-button-text">개인 업적평가 점수산출</span>
                    </button>
                    </c:if>
                </div>

                <div id="evalListDiv">
                    <table class="searchTable table table-bordered mb-0">
                        <tr>
<%--                            <th rowspan="2" class="text-center th-color chkTb" style="padding: 5px;">선택</th>--%>
                            <th rowspan="2" class="text-center th-color">부서</th>
                            <th rowspan="2" class="text-center th-color">팀명</th>
                            <th rowspan="2" class="text-center th-color">이름</th>
                            <th colspan="4" class="text-center th-color green">수주</th>
                            <th colspan="4" class="text-center th-color yellow">매출</th>
                            <th colspan="4" class="text-center th-color blue">수익</th>
                            <th colspan="2" class="text-center th-color pink">비용</th>
                            <th colspan="2" class="text-center th-color orange">사업화지수</th>
                        </tr>
                        <tr>
                            <td class="green">목표</td>
                            <td class="green">달성</td>
                            <td class="green">반영점수</td>
                            <td class="green">환산점수</td>
<%--                            <td class="green">등급</td>--%>
                            <td class="yellow">목표</td>
                            <td class="yellow">달성</td>
                            <td class="yellow">반영점수</td>
                            <td class="yellow">환산점수</td>
<%--                            <td class="yellow">등급</td>--%>
                            <td class="blue">목표</td>
                            <td class="blue">달성</td>
                            <td class="blue">반영점수</td>
                            <td class="blue">환산점수</td>
<%--                            <td class="blue">등급</td>--%>
                            <td class="pink">목표</td>
                            <td class="pink">달성</td>
<%--                            <td class="pink">반영점수</td>--%>
<%--                            <td class="pink">환산점수</td>--%>
<%--                            <td class="pink">등급</td>--%>
                            <td class="orange">목표</td>
                            <td class="orange">달성</td>
<%--                            <td class="orange">반영점수</td>--%>
<%--                            <td class="orange">환산점수</td>--%>
<%--                            <td class="orange">등급</td>--%>
                        </tr>
                        <tbody id="evalList">
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<form id="evalAchieveDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="evalAchieve">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="approveTeamSeq" name="approveTeamSeq" />
    <input type="hidden" id="evalAchieveApproveGroup" name="evalAchieveApproveGroup" />
</form>

<script type="text/javascript">
    evaluationPerReq.init();
</script>
