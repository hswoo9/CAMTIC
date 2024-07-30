<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationStatA.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<style>
    .pink{background-color: #eee0d9;font-weight: bold;text-align: center;border-bottom: 1px solid rgba(0, 0, 0, .08)}
</style>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">단장평균</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 인사평가 > 평가통계조회 > 단장평균</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col>
                        <col width="10%">
                        <col>
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchDate" style="width:20%;">
                        </td>
                        <th class="text-center th-color">차수</th>
                        <td>
                            <input type="text" id="searchNum" style="width:110px;">
                        </td>
                    </tr>
                </table>
                <div style="float: right; margin-bottom: 10px;">
                    ※ <span style="color: blue;"> 파랑 : 평균보다 높음</span>,<span style="color: red;"> 빨강 : 평균보다 낮음</span>
                </div>

                <div>
                    <table class="searchTable table table-bordered mb-0">
                        <colgroup>
                            <col width="5%">
                            <col width="5%">
                            <col width="7%">
                            <col width="15%">
                            <col width="5%">
                            <col width="5%">
                            <col width="5%">
                            <col width="5%">
                        </colgroup>
                        <tr>
                            <th rowspan="2" class="text-center th-color">순번</th>
                            <th rowspan="2" class="text-center th-color">역량</th>
                            <th rowspan="2" class="text-center th-color">평가 착안점</th>
                            <th rowspan="2" class="text-center th-color">기준점수</th>
                            <th rowspan="2" class="text-center th-color">전체평균</th>
                            <th colspan="3" class="text-center th-color">해당점수</th>
                        </tr>
                        <tr>
                            <td class="pink">단장1</td>
                            <td class="pink">단장2</td>
                            <td class="pink">단장3</td>
                        </tr>
                        <tbody>
                            <tr style="text-align: center;">
                                <td>1</td>
                                <td>환경분석/ 전략수립</td>
                                <td>· 대내외 정부정책, 시장동향, 경영환경 등에 항시 모니터링의 자세를 갖는다.
                                    · 환경분석 결과를 사업전략 및 목표 설정에 활용하고, 이를 전파하는 노력을 한다.
                                    · 구성원과 전략/목표에 대하여 자주 이야기하고 피드백을 통해 실천 의지를 고무시킨다.</td>
                                <td>0</td>
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
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    evaluationStatA.init();
</script>
