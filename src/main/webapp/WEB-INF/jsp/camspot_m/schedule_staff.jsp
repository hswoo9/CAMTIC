<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowDay" pattern="yyyy년MM월dd일" />
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_schedule_staff.js?v=${today}"/></script>
    <!-- schedule {-->
    <div id="schedule_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
        
            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
            	<a href="/m/schedule.do" class="t1">법인일정</a>
            	<a href="/m/schedule_staff.do" class="t2">직원일정</a>
            </div>
            <!--} 탭메뉴 -->
            <!-- 날짜표시 {-->
            <div class="calenderBox">
            	<div class="month disF jc ac">
            		<a class="controller prev" onclick="mScheduleStaff.setDateSetting('prev')">prev</a>
            		<font><input type="text" class="datepicker" id="day" readonly onchange="mScheduleStaff.getScheduleData()"/></font>
            		<a class="controller next" onclick="mScheduleStaff.setDateSetting('next')">next</a>
            	</div>
            </div>
            <!--} 날짜표시 -->
            <!-- 일정 리스트 {-->
            <div class="sclistBox mt40" id="scheduleDiv">
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-1">출장</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-2">휴가</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">기업성장지원본부 > 창업/기업성장지원팀 > 선임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-3">연차</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-4">test1</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-5">test2</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-6">test3</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-7">test4</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-8">test5</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-9">test6</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
<%--            	<span>--%>
<%--            		<font class="txt type28 tit"><i class="ico-10">test7</i> 박정아 </font>--%>
<%--            		<font class="txt type20 posi">테스트부서 > 경영지원팀 > 책임행정원</font>--%>
<%--            	</span>--%>
            </div>
            <!--} 일정 리스트 -->
    		
<%--            <div class="btBox mt40"><a href="/m/schedule_staff_write.do">글쓰기</a></div>--%>
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} schedule -->
    
    
<link rel="stylesheet" href="/css/camspot_m/jquery-ui.css">
<script src="/js/camspot_m/jquery-ui.js"></script>
<script>
	$('.m4', $('#menu')).addClass('active');
	$('.t2', $('.sTabmenu')).addClass('active');

    $( "#day" ).datepicker({
        showOn: "both",
        buttonImage: "/images/camspot_m/ico-calendar.png",
        buttonImageOnly: true,
        minDate: 0,
		dateFormat : "yy년 mm월 dd일",
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
    })
	$('#day').datepicker('setDate', 'today');

	mScheduleStaff.fn_defaultScript();
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
