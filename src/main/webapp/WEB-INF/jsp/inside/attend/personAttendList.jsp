<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/attend/personAttendList.js?v=${today}"/></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">개인근태현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 근태관리 > 근태관리 &gt; 개인근태현황</div>
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
                                    <input type="text" id="startDt" style="width: 130px;">
                                    ~
                                    <input type="text" id="endDt" style="width: 130px;">
                                </div>
                                <div class="mr10">
                                    <span>상태</span>
                                    <input type="text" id="situation" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <span>근태 항목</span>
                                    <input type="text" id="attendanceItems" style="width: 200px;">
                                </div>
                                <div>
                                    <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="personAttend.gridReload();">
                                        <span>검색</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <h4 class="panel-title">* 근태 현황</h4>
                <div style="margin:20px 0;">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="9%" >
                                <col width="8%" >
                                <col width="9%" >
                                <col width="6%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="6%" >
                                <col width="6%" >
                                <col width="5%" >
                                <col width="5%" >
                                <col width="6%" >
                                <col width="6%" >
                                <col width="5%" >
                                <col width="6%" >
                                <col width="7%" >
                                <col width="6%" >
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

                                <th>출장</th>

                                <th>대체휴가</th>
                                <th>근속포상휴가</th>
                                <th>휴일근로</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style="text-align: center;">${loginVO.teamNm}</td>
                                <td style="text-align: center;">${loginVO.name}</td>
                                <td style="text-align: center;">${loginVO.dutyNm eq '' ? loginVO.positionNm : loginVO.dutyNm}</td>

                                <td id="normal" style="text-align: center;"></td>
                                <td id="late" style="text-align: center;"></td>

                                <td id="annual" style="text-align: center;"></td>
                                <td id="morning" style="text-align: center;"></td>
                                <td id="afternoon" style="text-align: center;"></td>
                                <td id="sick" style="text-align: center;"></td>
                                <td id="publicholi" style="text-align: center;"></td>
                                <td id="condolences" style="text-align: center;"></td>
                                <td id="maternity" style="text-align: center;"></td>

                                <td id="hr" style="text-align: center;"></td>

                                <td id="alternative" style="text-align: center;"></td>
                                <td id="longaward" style="text-align: center;"></td>
                                <td id="holidaywork" style="text-align: center;"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 class="panel-title">* 전체 : 0건</h4>
                    <div id="mainGrid" style="margin:20px 0;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div><!-- col-md-9 -->
<script type="text/javascript">
    personAttend.fn_defaultScript();
</script>