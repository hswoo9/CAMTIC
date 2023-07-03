<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/attend/personAttendStat.js?v=${toDate}"/></script>

<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">직원근태내역</h4>
            <div class="title-road">근태관리 &gt; 직원근태내역</div>
        </div>
        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>조회 기간</span>
                                    <input type="text" id="startDay" style="width: 130px;">
                                    ~
                                    <input type="text" id="endDay" style="width: 130px;">
                                </div>
                                <div class="mr10">
                                    <span>부서</span>
                                    <input type="text" id="dept" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>팀</span>
                                    <input type="text" id="team" style="width: 200px;">
                                </div>
                                <div class="mr10">
                                    <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">
                                        <span>검색</span>
                                    </button>
                                </div>
                                <div class="mr10">
                                    <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="onDisplay();">
                                        상세검색
                                    </button>
                                </div>
                            </div>
                            <div style="display: none;" id="noneDiv"> <%--상세검색 버튼을 클릭시 div가 보이도록--%>
                                <div style="display:flex;" class="mt10">
                                    <div class="mr10">
                                        <span>상태</span>
                                        <input type="text" id="situation" style="width: 100px; margin-left:28px;">
                                    </div>
                                    <div class="mr10">
                                        <span>근태 항목</span>
                                        <input type="text" id="attendanceItems" style="width: 200px;">
                                    </div>
                                    <div class="mr10">
                                        <span>성명</span>
                                        <input type="text" id="name" style="width: 200px;">
                                    </div>
                                </div>
                                <div style="display:flex;" class="mt10">
                                    <div class="mr10">
                                        <span>직원 구분</span>
                                        <input type="text" id="staffDivision" style="width: 200px;">
                                    </div>
                                    <div class="mr10">
                                        <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">
                                            검색 초기화
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <h4 class="panel-title">* 부서</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="9%" >
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
                                <th>부서</th>
                                <th>정상출근</th>
                                <th>지각</th>
                                <th>연가</th>
                                <th>오전반차</th>
                                <th>오후반차</th>
                                <th>병가</th>
                                <th>공가</th>
                                <th>경조휴가</th>
                                <th>출산휴가</th>
                                <th>선택근로</th>
                                <th>출장</th>
                                <th>대체휴가</th>
                                <th>휴일근로</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style="text-align: center;">합계</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                                <td style="text-align: center;">0</td>
                            </tr>
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                    <h4 class="panel-title">* 근태 현황</h4>
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    personAttendStat.fn_defaultScript();
    personAttendStat.mainGrid();
    function onDisplay() {
        $('#noneDiv').show();
    }
</script>