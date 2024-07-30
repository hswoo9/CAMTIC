<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationStatB.js?v=${today}"/></script>

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
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="15%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">조회년도</th>
                        <td>
                            <input type="text" id="searchDate" style="width: 80%;">
                        </td>
                        <th class="text-center th-color">차수</th>
                        <td>
                            <input type="text" id="searchNum" style="width:80%;">
                        </td>
                        <th class="text-center th-color">부서/팀</th>
                        <td>
                            <input type="text" id="dept" style="width:45%">
                            <input type="hidden" id="dept_seq">
                            <input type="text" id="team" style="width:45%;">
                            <input type="hidden" id="team_seq">
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
                                    <col width="5%">
                                    <col width="5%">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">성명</th>
                                    <th>환경분석 / 전략수립</th>
                                    <th>조직이해</th>
                                    <th>재무이해</th>
                                    <th>동기부여 / 코칭</th>
                                    <th>임파워먼트</th>
                                    <th>자원 / 성과관리</th>
                                    <th>팀워크 형성</th>
                                    <th>네트워크 형성</th>
                                    <th>고객지향</th>
                                    <th>협상</th>
                                    <th>갈등관리 / 조정</th>
                                    <th rowspan="2">계</th>
                                </tr>
                                <tr>
                                    <th>정부정책, 시장동향, 경영환경 변화 등을 감지하고 예측하여 사업 및 조직에 미치는 영향을 파악해 내고, 이를 바탕으로 전략과 목표를 수립한다.</th>
                                    <th>법인의 비전과 사업의 특성을 잘 이해하고 이를 업무에 활용한다.</th>
                                    <th>수익과 비용의 흐름을 잘 알고, 법인 수익에 어떠한 영향을 주는지 파악하며 업무를 추진한다.</th>
                                    <th>부하 직원이 지닌 능력을 최대한 발휘하여 조직의 목표 달성을 위해 자발적인 노력을 기울이도록 지속적으로 관찰하고 지원한다.</th>
                                    <th>직원이 책임과 권한을 가지고 주도적이고 자발적으로 업무를 수행할 수 있도록 한다.</th>
                                    <th>업무 특성에 따라 직원들에게 인적, 물적자원을 적절히 배분하고, 그에 따른 성과를 관리/조정한다.</th>
                                    <th>조직 공동의 목표를 위해 몰입할 수 있도록 구성원 간의 친밀감과 협력적인 분위기를 조성한다.</th>
                                    <th>시장, 고객과의 적극적인 네트워킹을 통해 사업 및 비즈니스의 확대와 성장을 도모한다.</th>
                                    <th>내외부 고객의 요구를 우선적으로 감안하고, 고객만족을 위해서 노력한다.</th>
                                    <th>논리적인 설득과 합리적인 조정을 통해 서로 Win-Win 할 수 있는 관계를 유지하도록 노력하고, 합의를 도출한다.</th>
                                    <th>갈등 상황이 발생했을 때 개인 뿐 아니라 조직 전체, 혹은 상호 이익과 만족을 추구하는 차원에서 적극적으로 대화와 타협을 도모한다.</th>
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
                                        <td>10.0</td>
                                        <td>10.0</td>
                                        <td>100.0</td>
                                    </tr>
                                    <tr class="borderBt">
                                        <td>팀장1</td>
                                        <td>4.5</td>
                                        <td>9.0</td>
                                        <td>4.5</td>
                                        <td>9.3</td>
                                        <td>9.0</td>
                                        <td>8.3</td>
                                        <td>9.7</td>
                                        <td>9.0</td>
                                        <td>9.0</td>
                                        <td>90.6</td>
                                        <td>10.0</td>
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
                                    <col width="5%">
                                    <col width="5%">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">성명</th>
                                    <th>환경분석 / 전략수립</th>
                                    <th>조직이해</th>
                                    <th>재무이해</th>
                                    <th>동기부여 / 코칭</th>
                                    <th>임파워먼트</th>
                                    <th>자원 / 성과관리</th>
                                    <th>팀워크 형성</th>
                                    <th>네트워크 형성</th>
                                    <th>고객지향</th>
                                    <th>협상</th>
                                    <th>갈등관리 / 조정</th>
                                    <th rowspan="2">계</th>
                                </tr>
                                <tr>
                                    <th>정부정책, 시장동향, 경영환경 변화 등을 감지하고 예측하여 사업 및 조직에 미치는 영향을 파악해 내고, 이를 바탕으로 전략과 목표를 수립한다.</th>
                                    <th>법인의 비전과 사업의 특성을 잘 이해하고 이를 업무에 활용한다.</th>
                                    <th>수익과 비용의 흐름을 잘 알고, 법인 수익에 어떠한 영향을 주는지 파악하며 업무를 추진한다.</th>
                                    <th>부하 직원이 지닌 능력을 최대한 발휘하여 조직의 목표 달성을 위해 자발적인 노력을 기울이도록 지속적으로 관찰하고 지원한다.</th>
                                    <th>직원이 책임과 권한을 가지고 주도적이고 자발적으로 업무를 수행할 수 있도록 한다.</th>
                                    <th>업무 특성에 따라 직원들에게 인적, 물적자원을 적절히 배분하고, 그에 따른 성과를 관리/조정한다.</th>
                                    <th>조직 공동의 목표를 위해 몰입할 수 있도록 구성원 간의 친밀감과 협력적인 분위기를 조성한다.</th>
                                    <th>시장, 고객과의 적극적인 네트워킹을 통해 사업 및 비즈니스의 확대와 성장을 도모한다.</th>
                                    <th>내외부 고객의 요구를 우선적으로 감안하고, 고객만족을 위해서 노력한다.</th>
                                    <th>논리적인 설득과 합리적인 조정을 통해 서로 Win-Win 할 수 있는 관계를 유지하도록 노력하고, 합의를 도출한다.</th>
                                    <th>갈등 상황이 발생했을 때 개인 뿐 아니라 조직 전체, 혹은 상호 이익과 만족을 추구하는 차원에서 적극적으로 대화와 타협을 도모한다.</th>
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
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="borderBt">
                                    <td>팀장1</td>
                                    <td>4.5</td>
                                    <td>9.0</td>
                                    <td>4.5</td>
                                    <td>9.3</td>
                                    <td>9.0</td>
                                    <td>8.3</td>
                                    <td>9.7</td>
                                    <td>9.0</td>
                                    <td>9.0</td>
                                    <td>90.6</td>
                                    <td>10.0</td>
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
                                    <col width="5%">
                                    <col width="5%">
                                </colgroup>
                                <thead>
                                <tr>
                                    <th rowspan="2">성명</th>
                                    <th>환경분석 / 전략수립</th>
                                    <th>조직이해</th>
                                    <th>재무이해</th>
                                    <th>동기부여 / 코칭</th>
                                    <th>임파워먼트</th>
                                    <th>자원 / 성과관리</th>
                                    <th>팀워크 형성</th>
                                    <th>네트워크 형성</th>
                                    <th>고객지향</th>
                                    <th>협상</th>
                                    <th>갈등관리 / 조정</th>
                                    <th rowspan="2">계</th>
                                </tr>
                                <tr>
                                    <th>정부정책, 시장동향, 경영환경 변화 등을 감지하고 예측하여 사업 및 조직에 미치는 영향을 파악해 내고, 이를 바탕으로 전략과 목표를 수립한다.</th>
                                    <th>법인의 비전과 사업의 특성을 잘 이해하고 이를 업무에 활용한다.</th>
                                    <th>수익과 비용의 흐름을 잘 알고, 법인 수익에 어떠한 영향을 주는지 파악하며 업무를 추진한다.</th>
                                    <th>부하 직원이 지닌 능력을 최대한 발휘하여 조직의 목표 달성을 위해 자발적인 노력을 기울이도록 지속적으로 관찰하고 지원한다.</th>
                                    <th>직원이 책임과 권한을 가지고 주도적이고 자발적으로 업무를 수행할 수 있도록 한다.</th>
                                    <th>업무 특성에 따라 직원들에게 인적, 물적자원을 적절히 배분하고, 그에 따른 성과를 관리/조정한다.</th>
                                    <th>조직 공동의 목표를 위해 몰입할 수 있도록 구성원 간의 친밀감과 협력적인 분위기를 조성한다.</th>
                                    <th>시장, 고객과의 적극적인 네트워킹을 통해 사업 및 비즈니스의 확대와 성장을 도모한다.</th>
                                    <th>내외부 고객의 요구를 우선적으로 감안하고, 고객만족을 위해서 노력한다.</th>
                                    <th>논리적인 설득과 합리적인 조정을 통해 서로 Win-Win 할 수 있는 관계를 유지하도록 노력하고, 합의를 도출한다.</th>
                                    <th>갈등 상황이 발생했을 때 개인 뿐 아니라 조직 전체, 혹은 상호 이익과 만족을 추구하는 차원에서 적극적으로 대화와 타협을 도모한다.</th>
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
                                    <td>10.0</td>
                                    <td>10.0</td>
                                    <td>100.0</td>
                                </tr>
                                <tr class="borderBt">
                                    <td>팀장1</td>
                                    <td>4.5</td>
                                    <td>9.0</td>
                                    <td>4.5</td>
                                    <td>9.3</td>
                                    <td>9.0</td>
                                    <td>8.3</td>
                                    <td>9.7</td>
                                    <td>9.0</td>
                                    <td>9.0</td>
                                    <td>90.6</td>
                                    <td>10.0</td>
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
    evaluationStatB.init();
</script>