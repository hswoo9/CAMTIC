<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<style>
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
                            <span>사용 여부</span>
                            <input type="text" id="useYN" style="width: 150px; margin-right:10px;">
                            <input type="text" id="space" style="width: 200px; margin-right:10px;">
                            <input type="text" id="titleContent" style="width: 200px;">
                            <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">
                                <span class="k-icon k-i-search k-button-icon"></span>
                            </button>
                            <button type="button" id="document" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="meetingRoomManage.meetingRoomManagePopup();">
                                등록
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="panel-body">
            <div id="mainGrid"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    meetingRoomManage.fn_defaultScript();
    meetingRoomManage.mainGrid();
</script>