<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<style>
    .title-road{font-size: 11px; color: #999999; margin-top:10px;}
    .k-grid .k-cell-inner {justify-content: center;}
    table { background-color: white; }
</style>
<script type="text/javascript" src="/js/intra/inside/bustrip/meetingRoomManage.js?v=${today}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">회의실 관리</h4>
            <div class="title-road">차량/회의실관리 > 회의실 관리</div>
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
                            <div style="display:flex;">
                                <div class="mr10">
                                    <span>사용 여부</span>
                                    <input type="text" id="useYN" style="width: 150px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="space" style="width: 200px;">
                                </div>
                                <div class="mr10">
                                    <input type="text" id="titleContent" style="width: 200px;">
                                </div>
                                <div class="mr10">
                                    <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">
                                        <span>검색</span>
                                    </button>
                                </div>
<%--                                <div class="mr10">
                                    <button type="button" id="document" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="meetingRoomManage.meetingRoomManagePopup();">
                                        등록
                                    </button>
                                </div>--%>
                                <%--초기 등록 팝업창 합침--%>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="panel">
                <div class="col-md-6 col-lg-6 dash-left mt10" style="border: 1px solid #d5d5d5; height: 543px;">
                    <div class="mt10"></div>
                    <span style="font-weight: bold;">* 회의실 목록</span>
                    <div id="mainGrid" style="margin:10px 0;"></div>
                </div>
                <div class="col-md-6 col-lg-6 dash-right mt10" style="border: 1px solid #d5d5d5; height: 543px;">
                    <div class="mt10"></div>
                    <span style="font-weight: bold;">* 회의실 등록</span>
                    <div id="" style="margin:10px 0;"></div>
                    <table class="table table-bordered mb-0">
                        <colgroup>
                            <col width="20%">
                            <col width="80%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th colspan="2">
                                <button type="button" id="downLoad" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0; margin-left: 450px;" onclick="">
                                    엑셀 다운로드
                                </button>
                                <button type="button" id="saveButton" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="">
                                    저장
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 여부</th>
                            <td><input type="text" id="useYN1" style="width: 50%; margin-right:10px;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>회의실 명</th>
                            <td><input type="text" id="meetingRoomName" style="width: 50%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>장소</th>
                            <td><input type="text" id="space1" style="width: 50%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>수용 인원</th>
                            <td><input type="text" id="Num" style="width: 50%;">명</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>대관 여부</th>
                            <td><input type="text" id="coronationYN" style="width: 50%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>대관료</th>
                            <td><input type="text" id="rentalFee" style="width: 50%; text-align: right;">원 (VAT 포함 금액)</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>등록자</th>
                            <td><input type="text" id="registrant" style="width: 50%;">
                                <button type="button" id="saveButton1" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="">
                                    검색
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color"><span class="red-star"></span>등록일자</th>
                            <td><input type="text" id="registrant_date" style="width: 50%;"></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color">특이사항</th>
                            <td><textarea type="text" id="significant" style="width: 100%; height: 136px;"></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    meetingRoomManage.fn_defaultScript();
    meetingRoomManage.mainGrid();
</script>