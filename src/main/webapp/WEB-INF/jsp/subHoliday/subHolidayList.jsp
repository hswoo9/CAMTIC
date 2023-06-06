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
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayList.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">휴가현황</h4>
            <div class="title-road">휴가관리 &gt; 휴가현황</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex; justify-content: space-between;">
                                <div>
                                    <span>조회년도</span>
                                    <input id="datePicker" style="width:150px;">
                                </div>
                                <div>
                                    <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="subHolidayList.subHolidayReqPop();">신청</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                                <col width="7%" >
                            </colgroup>
                            <thead>
                                <tr>
                                    <th colspan="6">연가(사용기간)</th>
                                    <th rowspan="3">병가</th>
                                    <th rowspan="3">공가</th>
                                    <th rowspan="3">경조휴가</th>
                                    <th rowspan="3">출산휴가</th>
                                    <th rowspan="3">대체휴가</th>
                                    <th rowspan="3">근속<br>포상휴가</th>
                                    <th rowspan="3">휴일근로</th>
                                </tr>
                                <tr>
                                    <th rowspan="2">발생</th>
                                    <th rowspan="2">전전년사용</th>
                                    <th rowspan="2">전년사용</th>
                                    <th colspan="2">금년사용</th>
                                    <th rowspan="2">잔여</th>
                                </tr>
                                <tr>
                                    <th>연가</th>
                                    <th>반가</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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
                                    <td style="text-align: center;">0일</td>
                                    <td style="text-align: center;">0일</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
            </div>
        </div>
    </div>

    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">휴가사용내역</h4>
        </div>

        <div class="panel-body">
            <div id="secondView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex; justify-content: space-between;">
                    <div style="display:flex;">
                        <div class="mr20">
                            <span>신청구분</span>
                            <input type="text" id="holidayCate" style="width: 150px;">
                        </div>

                        <div>
                            <span>상태</span>
                            <input type="text" id="status" style="width: 150px;">
                        </div>
                    </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div id="mainGrid" style="margin:20px 0;"></div>
        </div>

    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    subHolidayList.init();
</script>