<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationPerReq.js?v=${today}"/></script>

<style>
    .pink{background-color: #fce4d6;font-weight: bold;text-align: center;}
    .yellow{background-color: #fff2cc;font-weight: bold;text-align: center;}
    .green{background-color: #e2efda;font-weight: bold;text-align: center;}
    .blue{background-color: #ddebf7;font-weight: bold;text-align: center;}
    .orange{background-color: #ffcc99;font-weight: bold;text-align: center;}
    #evalList td{text-align: center}
    #evalListDiv {width: 100%;overflow-x: auto;white-space: nowrap;}

</style>

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
<%--                    <c:if test="${loginVO.dutyCode ne '1'}">--%>
<%--                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="evaluationPerReq.evalReqPop()">--%>
<%--                        <span class="k-button-text">개인별 수주/매출/수익 설정</span>--%>
<%--                    </button>--%>
<%--                    </c:if>--%>
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
                            <th colspan="3" class="text-center th-color green">수주</th>
                            <th colspan="3" class="text-center th-color yellow">매출</th>
                            <th colspan="3" class="text-center th-color blue">수익</th>
                            <th colspan="3" class="text-center th-color pink">비용</th>
                            <th colspan="3" class="text-center th-color orange">사업화지수</th>
                        </tr>
                        <tr>
                            <td class="green">목표</td>
                            <td class="green">달성</td>
                            <td class="green">점수</td>
                            <td class="yellow">목표</td>
                            <td class="yellow">달성</td>
                            <td class="yellow">점수</td>
                            <td class="blue">목표</td>
                            <td class="blue">달성</td>
                            <td class="blue">점수</td>
                            <td class="pink">목표</td>
                            <td class="pink">달성</td>
                            <td class="pink">점수</td>
                            <td class="orange">목표</td>
                            <td class="orange">달성</td>
                            <td class="orange">점수</td>
                        </tr>
                        <tbody id="evalList">
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    evaluationPerReq.init();
</script>
