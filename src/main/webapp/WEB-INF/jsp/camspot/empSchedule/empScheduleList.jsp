<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<link href="/css/schedule/fullcalendar.min.css" rel="stylesheet" />
<link href="/css/schedule/styleA.css" rel="stylesheet" />

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js'/>"></script>
<script type="text/javascript" src="/js/intra/cams_pot/empSchedule/empScheduleList.js?v=${today}"/>
<script>
    esl.fn_defaultScript();
</script>
<style>
    .fc-event{
        cursor: pointer !important;
    }

    .fc .fc-row .fc-content-skeleton table, .fc .fc-row .fc-content-skeleton td, .fc .fc-row .fc-helper-skeleton td {
        border-color: #eaeaea;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직원일정</h4>
            <div class="title-road">캠스팟 > 캠스팟 > 직원일정</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">

            <div style="text-align: right">
                <input type="text" id="publicClass" style="width: 7%">
                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="esl.fn_popScheduleReg()">
                    일정등록
                </button>
            </div>

            <div id="calendar" class="app-fullcalendar"></div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script src="/js/schedule/global.min.js"></script>
<script src="/js/schedule/custom.min.js"></script>
<script src="/js/schedule/jquery-ui.min.js"></script>
<script src="/js/schedule/moment.min.js"></script>
<script src="/js/schedule/fullcalendar.min.js"></script>
<script src="/js/schedule/fullcalendar-init.js?v=${today}"></script>
<script>
    /*var returnYear = '${params.year}';
    var returnMonth = '${params.month}';*/

    jQuery.noConflict();
    $("#publicClass").data("kendoDropDownList").bind("change", function(){
        esl.global.cal.$calendar.fullCalendar("destroy")
        esl.global.cal.init()
    });

    /*$(function () {
        if(returnYear != '' && returnMonth != ''){
            console.log(returnMonth.toString().padStart(2, '0'));
            console.log("03");
            //esl.global.cal.$calendar.fullCalendar('gotoDate', new Date(returnYear.toString() + '-' + returnMonth.toString().padStart(2, '0') + '-01'));
            esl.global.cal.$calendar.fullCalendar('gotoDate', new Date(returnYear.toString() + '-' + returnMonth.toString().padStart(2, '0') + '-01'));
        }
    });*/
</script>