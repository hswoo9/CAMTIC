<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<style>
    table { background-color: white; }
</style>
<script type="text/javascript" src="/js/intra/inside/bustrip/meetingRoomReq.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">회의실 사용 신청</h4>
            <div class="title-road">차량/회의실관리 > 회의실 사용 신청</div>
        </div>

        <div class="panel-body">

            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>


            <div style="margin-bottom:10px;">
                <%--<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">--%>
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0;">
                            <span>년월</span>
                            <input type="text" id="datePicker" style="width: 10%; margin-left: 10px; margin-right:10px;">
                            <span>회의실 구분</span>
                            <input type="text" id="meetingRoomDivision" style="width: 150px; margin-right:10px;">
                            <span>사용 목적</span>
                            <input type="text" id="usePurpose" style="width: 150px; margin-right:10px;">
                            <span>대관료</span>
                            <input type="text" id="rentalFee" style="width: 150px; margin-right:10px;">

                            <span>검색구분</span>
                            <input type="text" id="searchDivision" style="width: 150px; margin-right:10px;">
                            <input type="text" id="name" style="width: 100px; margin-right:10px;">
                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                            <button type="button" id="searchRebutton" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0; margin-right:10px;" onclick="">
                                검색 초기화
                            </button>
                            <button type="button" id="calendar" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="">
                                달력 보기 (BAR)
                            </button>
                            <%--<button type="button" id="list" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="">
                                목록 보기
                            </button>--%>
                            <button type="button" id="document" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" onclick="meetingRoomReq.meetingRoomPopup();">
                                회의실 사용 신청
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="table-responsive">
                <div id="spclVacManageTabStrip">
                    <ul>
                        <li class="k-state-active">목록</li>
                        <li>캘린더</li>
                    </ul>
                    <div>
                        <div id="mainGrid" style="margin-top: 10px">
                        </div>
                    </div>
                    <div>
                        <div id="schedulerDiv" style="margin:10px auto;">
                            <div id="team-schedule" style="float: left">
                            </div>
                            <div id="scheduler"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<%--        <div class="panel-body">
            <div class="table-responsive">
                <div id="scheduler"></div>
            </div>
        </div>--%>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    meetingRoomReq.fn_defaultScript();
    meetingRoomReq.mainGrid();
</script>