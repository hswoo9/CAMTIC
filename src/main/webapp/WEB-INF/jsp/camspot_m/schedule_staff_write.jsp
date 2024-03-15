<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

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
            <!-- 글쓰기 {-->
            <form>
                <div class="bwriteBox mt20">
                    <span>
                        <font class="txt type28 fP800">날짜</font>
                        <i><input type="text" class="datepicker" id="day" placeholder="2024년 03월 15일" /></i>
                    </span>
                    <span>
                        <font class="txt type28 fP800">성명</font>
                        <input type="text" />
                    </span>    
                    <span>
                        <font class="txt type28 fP800">일정</font>
                        <select>
                            <option>선택</option>
                            <option>출장</option>
                            <option>휴가</option>
                            <option>연차</option>
                            <option>test1</option>
                            <option>test2</option>
                            <option>test3</option>
                            <option>test4</option>
                            <option>test5</option>
                            <option>test6</option>
                            <option>test7</option>
                        </select>
                    </span>                
                    <span>
                        <font class="txt type28 fP800">부서</font>
                        <select>
                        	<option>선택</option>
                        	<option>테스트부서</option>
                        	<option>미래전략기획본부</option>
                        	<option>R&amp;BD사업본부</option>
                        	<option>기업성장지원본부</option>
                        	<option>일자리혁신지원센터</option>
                        </select>
                    </span>
                    <span>
                        <font class="txt type28 fP800">팀</font>
                        <select>
                        	<option>선택</option>
                        	<option>경영지원팀</option>
                        </select>
                    </span>
                    <span>
                        <font class="txt type28 fP800">직위</font>
                        <input type="text" />
                    </span>        
                         
                    
                </div>
                <div class="btBox mt40"><a href="#">글쓰기</a></div>
            </form>
            <!--} 글쓰기 -->
        
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} schedule -->
    
<link rel="stylesheet" href="/css/camspot_m/jquery-ui.css">
<script src="/js/camspot_m/jquery-ui.js"></script>
<script>
    $( "#day" ).datepicker({
        showOn: "both",
        buttonImage: "/images/camspot_m/ico-calendar.png",
        buttonImageOnly: true,
        minDate: 0,
        dateFormat: 'yy년 mm월 dd일',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
</script>
    
<script type="text/javascript">
	$('.m4', $('#menu')).addClass('active');
	$('.t2', $('.sTabmenu')).addClass('active');
</script>
    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
