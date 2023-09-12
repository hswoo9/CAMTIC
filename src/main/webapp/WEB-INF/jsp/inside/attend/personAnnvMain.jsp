<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner>.k-link {
        justify-content: center;
    }
    .k-filter-row th, .k-grid-header th.k-header {
        vertical-align: middle;
    }
</style>
<script type="text/javascript" src="/js/intra/inside/attend/personAnnvMain.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">개인연차현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 &gt; 개인연차현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <h4 class="panel-title">* 연차 현황</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="10%" >
                                <col width="8" >
                                <col width="8%" >
                                <col width="8%" >
                                <col width="10%" >
                                <col width="8%" >
                                <col width="8%" >
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowspan="2">귀속년도</th>
                                    <th colspan="2">연차 적용 기간</th>
                                    <th colspan="4">부여 (A)</th>
                                    <th colspan="4">소진 (B)</th>
                                    <th rowspan="2">잔여연차 (A-B)</th>
                                </tr>
                                <tr>
                                    <th>시작일자</th>
                                    <th>종료일자</th>
                                    <th>발생연차</th>
                                    <th>전년 발생</th>
                                    <th>전 전년 발생</th>
                                    <th>소계</th>
                                    <th>올해 사용</th>
                                    <th>전년 사용</th>
                                    <th>전 전년 사용</th>
                                    <th>소계</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style="text-align: center;">2023</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                                <td style="text-align: center;">0일</td>
                            </tr>
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                    <h4 class="panel-title">* 2023년도 상세 사용 일수 내역 (전체 건수 0 건 / 사용 일수 0 일)</h4>
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    personAnnvMain.init();
</script>