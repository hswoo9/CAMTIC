<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationStatC.js?v=${today}"/></script>

<style>
    .subTitSt{font-weight: 600; text-align: left; font-size: 13px; padding: 10px;}
    .pink{background-color: #eee0d9;font-weight: bold;text-align: center;border-bottom: 1px solid rgba(0, 0, 0, .08)}
    .borderBt td{border-bottom: 1px solid #d8dce3;}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">팀장평균</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 인사평가 > 평가통계조회 > 팀장평균</div>
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
                        <col width="10%">
                        <col width="30%">
                        <col width="10%">
                        <col width="30%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchDate" style="width:110px;">
                        </td>
                        <th class="text-center th-color">차수</th>
                        <td>
                            <input type="text" id="searchNum" style="width:110px;">
                        </td>
                        <th class="text-center th-color">부서/팀</th>
                        <td>
                            <input type="text" id="dept" style="width:160px;">
                            <input type="hidden" id="dept_seq">
                            <input type="text" id="team" style="width:165px;">
                            <input type="hidden" id="team_seq">
                        </td>
                        <th class="text-center th-color">직책/직급</th>
                        <td>
                            <input type="text" id="position" style="width: 160px;">
                            <input type="text" id="duty" style="width: 160px;">
                        </td>
                    </tr>
                </table>
            </div>
            <div style="float: right; margin-bottom: 10px;">
                ※ <span style="color: blue;"> 파랑 : 평균보다 높음</span>,<span style="color: red;"> 빨강 : 평균보다 낮음</span>
            </div>

            <div>
                <div class="capabilityTb">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="subTitSt">· 기술직</div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <div>
                            <table class="searchTable table" style="text-align:center;">
                                <colgroup>
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">성명</th>
                                    <th>도전성</th>
                                    <th>고객지향</th>
                                    <th>기획력</th>
                                    <th>창의력</th>
                                    <th>업무관리</th>
                                    <th>경제적 타당성</th>
                                    <th>분석적 사고 / 문제해결</th>
                                    <th>경쳥 / 공감</th>
                                    <th>표현 / 설득</th>
                                    <th rowspan="2">계</th>
                                </tr>
                                <tr>
                                    <th>불확실하고 어려운 상황에서도 기회를 찾아내고 용기있게 과감히 도전한다.</th>
                                    <th>고객의 수요를 파악하기 위해 시장 및 고객과 자주 접촉하며 고객 만족을 위해 노력한다.</th>
                                    <th>대내외 환경분석을 통해 수행 사업(업무) 계획을 논리적으로 전개하고, 추진방법 등을 강구한다.</th>
                                    <th>다양하고 독창적인 아이디어를 발상, 제안하며 이를 적용 가능한 아이디어로 발전시켜 나간다.</th>
                                    <th>과업 달성을 위하여 시간과 자원 등을 효과적으로 계획하고, 납기 준수와 품질 유지를 위하여 맡은 업무를 철저히 관리한다.</th>
                                    <th>평소 수익 창출과 비용 절감을 고려하며 사업(업무)을 수행한다.</th>
                                    <th>발생된 문제에 대해 정보를 수집/분석하여 정확한 원인을 파악하고, 이를 근거로 적기에 문제를 해결한다.</th>
                                    <th>내/외부 고객의 의견을 충분히 청취하고, 공감함으로써 의사소통의 핵심을 파악한다.</th>
                                    <th>내/외부 고객에게 자신의 의견과 정보를 정확하게 전달한다. 다양한 채널을 통해 자신의 입장을 표현하고 동의하도록 유도한다.</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pink">
                                    <td>기준점수</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="pink">
                                    <td>평균점수</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="borderBt">
                                    <td>직원1</td>
                                    <td>4.5</td>
                                    <td>9.0</td>
                                    <td>4.5</td>
                                    <td>9.3</td>
                                    <td>9.0</td>
                                    <td>8.3</td>
                                    <td>9.7</td>
                                    <td>9.0</td>
                                    <td>9.0</td>
                                    <td>100.0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="capabilityTb">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="subTitSt">· 일반직 (사업)</div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <div>
                            <table class="searchTable table" style="text-align:center;">
                                <colgroup>
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">성명</th>
                                    <th>도전성</th>
                                    <th>고객지향</th>
                                    <th>기획력</th>
                                    <th>창의력</th>
                                    <th>업무관리</th>
                                    <th>경제적 타당성</th>
                                    <th>분석적 사고 / 문제해결</th>
                                    <th>경쳥 / 공감</th>
                                    <th>표현 / 설득</th>
                                    <th rowspan="2">계</th>
                                </tr>
                                <tr>
                                    <th>불확실하고 어려운 상황에서도 기회를 찾아내고 용기있게 과감히 도전한다.</th>
                                    <th>고객의 수요를 파악하기 위해 시장 및 고객과 자주 접촉하며 고객 만족을 위해 노력한다.</th>
                                    <th>대내외 환경분석을 통해 수행 사업(업무) 계획을 논리적으로 전개하고, 추진방법 등을 강구한다.</th>
                                    <th>다양하고 독창적인 아이디어를 발상, 제안하며 이를 적용 가능한 아이디어로 발전시켜 나간다.</th>
                                    <th>과업 달성을 위하여 시간과 자원 등을 효과적으로 계획하고, 납기 준수와 품질 유지를 위하여 맡은 업무를 철저히 관리한다.</th>
                                    <th>평소 수익 창출과 비용 절감을 고려하며 사업(업무)을 수행한다.</th>
                                    <th>발생된 문제에 대해 정보를 수집/분석하여 정확한 원인을 파악하고, 이를 근거로 적기에 문제를 해결한다.</th>
                                    <th>내/외부 고객의 의견을 충분히 청취하고, 공감함으로써 의사소통의 핵심을 파악한다.</th>
                                    <th>내/외부 고객에게 자신의 의견과 정보를 정확하게 전달한다. 다양한 채널을 통해 자신의 입장을 표현하고 동의하도록 유도한다.</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pink">
                                    <td>기준점수</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="pink">
                                    <td>평균점수</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="borderBt">
                                    <td>직원1</td>
                                    <td>4.5</td>
                                    <td>9.0</td>
                                    <td>4.5</td>
                                    <td>9.3</td>
                                    <td>9.0</td>
                                    <td>8.3</td>
                                    <td>9.7</td>
                                    <td>9.0</td>
                                    <td>9.0</td>
                                    <td>100.0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="capabilityTb">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="subTitSt">· 일반직 (지원)</div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <div>
                            <table class="searchTable table" style="text-align:center;">
                                <colgroup>
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                    <col width="5%">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">성명</th>
                                    <th>도전성</th>
                                    <th>고객지향</th>
                                    <th>기획력</th>
                                    <th>창의력</th>
                                    <th>업무관리</th>
                                    <th>경제적 타당성</th>
                                    <th>분석적 사고 / 문제해결</th>
                                    <th>경쳥 / 공감</th>
                                    <th>표현 / 설득</th>
                                    <th rowspan="2">계</th>
                                </tr>
                                <tr>
                                    <th>불확실하고 어려운 상황에서도 기회를 찾아내고 용기있게 과감히 도전한다.</th>
                                    <th>고객의 수요를 파악하기 위해 시장 및 고객과 자주 접촉하며 고객 만족을 위해 노력한다.</th>
                                    <th>대내외 환경분석을 통해 수행 사업(업무) 계획을 논리적으로 전개하고, 추진방법 등을 강구한다.</th>
                                    <th>다양하고 독창적인 아이디어를 발상, 제안하며 이를 적용 가능한 아이디어로 발전시켜 나간다.</th>
                                    <th>과업 달성을 위하여 시간과 자원 등을 효과적으로 계획하고, 납기 준수와 품질 유지를 위하여 맡은 업무를 철저히 관리한다.</th>
                                    <th>평소 수익 창출과 비용 절감을 고려하며 사업(업무)을 수행한다.</th>
                                    <th>발생된 문제에 대해 정보를 수집/분석하여 정확한 원인을 파악하고, 이를 근거로 적기에 문제를 해결한다.</th>
                                    <th>내/외부 고객의 의견을 충분히 청취하고, 공감함으로써 의사소통의 핵심을 파악한다.</th>
                                    <th>내/외부 고객에게 자신의 의견과 정보를 정확하게 전달한다. 다양한 채널을 통해 자신의 입장을 표현하고 동의하도록 유도한다.</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pink">
                                    <td>기준점수</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="pink">
                                    <td>평균점수</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>5.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="borderBt">
                                    <td>직원1</td>
                                    <td>4.5</td>
                                    <td>9.0</td>
                                    <td>4.5</td>
                                    <td>9.3</td>
                                    <td>9.0</td>
                                    <td>8.3</td>
                                    <td>9.7</td>
                                    <td>9.0</td>
                                    <td>9.0</td>
                                    <td>100.0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    evaluationStatC.init();
</script>