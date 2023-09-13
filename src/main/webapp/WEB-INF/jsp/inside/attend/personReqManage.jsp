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
</style>
<script type="text/javascript" src="/js/intra/inside/attend/personReqManage.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">근태신청현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 근태신청현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
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
                                    <span>상태</span>
                                    <input type="text" id="situation" style="width: 150px; margin-right:10px;">
                                </div>
                                <div class="mr10">
                                    <span>근태 항목</span>
                                    <input type="text" id="attendanceItems" style="width: 200px; margin-right:10px;">
                                </div>
                                <div>
                                    <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                                        <span>조회</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <h4 class="panel-title">* 신청 현황</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="12.5%" >
                                <col width="10%" >
                                <col width="12.5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="5%" >
                            </colgroup>
                            <thead>
                            <tr>
                                <th>부서</th>
                                <th>성명</th>
                                <th>직위</th>
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
                                <td style="text-align: center;">경영지원실</td>
                                <td style="text-align: center;">홍길동</td>
                                <td style="text-align: center;">책임행정원</td>
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
                    <h4 class="panel-title">* 근태 신청 현황 : 0건</h4>
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    personReqManage.fn_defaultScript();
    personReqManage.mainGrid();
</script>