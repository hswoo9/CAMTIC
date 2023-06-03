<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>



<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<script type="text/javascript" src="/js/intra/holidayPlan/holidayPlan.js?v=${today}"/></script>



<style>
    .card-header{padding:40px 0 15px 0; display: flex; justify-content: space-between;}
    .card-title{font-size: 18px; font-weight: 600;}
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .titleLine{padding: 30px 0 0 0; border-top: 2px solid #dfdfdf;}
    .k-grouping-header{display:none;}
</style>


<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-body">
            <div class="chart __layout pt pb mop" style="width:1180px; margin:0 auto;">
                <div class="inner">
                    <div class="card-header">
                        <div class="card-title">휴가현황</div>
                        <div class="title-road">홈 &gt; 캠인사이드2.0 &gt; 휴가관리 &gt; 휴가현황</div>
                    </div>
                    <div class="titleLine"></div>
                    <div>
                        <div style="display:flex; justify-content: space-between;">
                            <div>
                                <span>조회년도</span>
                                <input id="datePicker" style="width:150px;">
                            </div>
                            <%--<div><button id="primaryTextButton">신청</button></div>--%>
                        </div>
                        <div style="margin:20px 0;">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <colgroup>
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
                                        <col width="8%" >
                                        <col width="8%" >
                                        <col width="8%" >
                                    </colgroup>
                                    <tr>
                                        <th colspan="6" class="tableThSt">연가(사용기간)</th>
                                        <th rowspan="3" class="tableThSt">병가</th>
                                        <th rowspan="3" class="tableThSt">공가</th>
                                        <th rowspan="3" class="tableThSt">경조휴가</th>
                                        <th rowspan="3" class="tableThSt">출산휴가</th>
                                        <th rowspan="3" class="tableThSt">대체휴가</th>
                                        <th rowspan="3" class="tableThSt">근속<br>포상휴가</th>
                                        <th rowspan="3" class="tableThSt">휴일근로</th>
                                    </tr>
                                    <tr>
                                        <th rowspan="2" class="tableThSt">발생</th>
                                        <th rowspan="2" class="tableThSt">전전년사용</th>
                                        <th rowspan="2" class="tableThSt">전년사용</th>
                                        <th colspan="2" class="tableThSt">금년사용</th>
                                        <th rowspan="2" class="tableThSt">잔여</th>
                                    </tr>
                                    <tr>
                                        <th class="tableThSt">연가</th>
                                        <th class="tableThSt">반가</th>
                                    </tr>
                                    <tr>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                        <td class="tableTdSt">0일</td>
                                    </tr>
                                </table>
                            </div><!-- table-responsive -->
                        </div>
                        <div class="card-title" style="margin-bottom:10px;">휴가사용내역</div>
                    </div>
                    <div id="subHolidayStatusTable" style="margin-bottom:20px;">
                        <div id="Holidaygrid"></div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    holidayPlan.holidayPlanInit();

</script>
<script>
$(document).ready(function() {





});



</script>