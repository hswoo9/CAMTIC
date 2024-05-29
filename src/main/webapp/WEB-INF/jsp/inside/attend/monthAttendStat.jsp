<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/attend/monthAttendStat.js?v=${toDate}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">월별근태보고</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 근태관리 &gt; 월별근태보고</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>조회 기간</span>
                                    <input id="applyMonth" style="width: 120px; margin-left: 10px;">
                                </div>
                                <div>
                                    <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="monthAttendStat.attendPrintPop();">
                                        <span>인쇄</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <h3 id="title" class="panel-title" style="text-align: center;">OOOO년 OO월 직원 근태현황</h3>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="8%" >
                                <col width="12%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                            </colgroup>
                            <thead>
                            <tr>
                                <th rowspan="2">인원</th>
                                <th rowspan="2">평균 근무시간</th>
                                <th colspan="2">휴가</th>
                                <th colspan="2">지참</th>
                                <th colspan="2">조퇴</th>
                                <th colspan="2">지각</th>
                                <th colspan="2">기타</th>
                            </tr>
                            <tr>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                            </tr>
                            </thead>

                            <tbody id="allStatTable">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>

                <h4 class="panel-title">* 팀별 근태내역</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="10%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                                <col width="7.5%" >
                            </colgroup>
                            <thead>
                            <tr>
                                <th rowspan="2">팀명</th>
                                <th rowspan="2">인원</th>
                                <th rowspan="2">평균 근무시간</th>
                                <th colspan="2">휴가</th>
                                <th colspan="2">지참</th>
                                <th colspan="2">조퇴</th>
                                <th colspan="2">지각</th>
                                <th colspan="2">기타</th>
                            </tr>
                            <tr>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                                <th style="text-align: center;">명</th>
                                <th style="text-align: center;">건</th>
                            </tr>
                            </thead>
                            <tbody id="deptStatTable">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
                <h4 class="panel-title">* 개인별 근태내역</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                                <col width="10%" >
                            </colgroup>
                            <thead>
                            <tr>
                                <th>부서명</th>
                                <th>팀명</th>
                                <th>이름</th>
                                <th>직위</th>
                                <th>평균 근무시간</th>
                                <th>휴가</th>
                                <th>지참</th>
                                <th>조퇴</th>
                                <th>지각</th>
                                <th>기타</th>
                            </tr>
                            </thead>
                            <tbody id="personalStatTable">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    monthAttendStat.fn_defaultScript();
</script>