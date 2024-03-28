<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_schedule.js?v=${today}"/></script>
<style>
    .linkLayer .detail_sc span font.time {
        width: 160px;
    }
</style>
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
            
            <!-- 일정표 {-->
            <div class="calenderBox">
                <input type="hidden" id="endDate" >
            	<div class="month disF jc ac">
            		<a href="#" class="controller prev">prev</a>
            		<font class="txt type30 year-month">2024년 03월</font>
            		<a href="#" class="controller next">next</a>
            	</div>
            	<div class="calender">
            		<ul class="week">
                        <li class="sun">일</li>
                        <li>월</li>
                        <li>화</li>
                        <li>수</li>
                        <li>목</li>
                        <li>금</li>
                        <li class="sat">토</li>
            		</ul>
            		<ul class="date">
<%--                        <li class="off">25</li>--%>
<%--                        <li class="off">26</li>--%>
<%--                        <li class="off">27</li>--%>
<%--                        <li class="off">28</li>--%>
<%--                        <li class="off">29</li>--%>
<%--                        <li>1</li>--%>
<%--                        <li class='sat'>2</li>--%>
<%--                        <li class='sun'>3</li>--%>
<%--                        <li>4</li>--%>
<%--                        <li>5</li>--%>
<%--                        <li>6</li>--%>
<%--                        <li>7</li>--%>
<%--                        <li>8</li>--%>
<%--                        <li class='sat'>9</li>--%>
<%--                        <li class='sun'>10</li>--%>
<%--                        <li>11</li>--%>
<%--                        <li>12</li>--%>
<%--                        <li>13</li>--%>
<%--                        <li>14</li>--%>
<%--                        <li class='today'>15</li>--%>
<%--                        <li class='sat'>16</li>--%>
<%--                        <li class='sun'>17</li>--%>
<%--                        <li class="on link" onclick="showLayer(1)">18</li>--%>
<%--                        <li>19</li>--%>
<%--                        <li>20</li>--%>
<%--                        <li>21</li>--%>
<%--                        <li class="on link" onclick="showLayer(2)">22</li>--%>
<%--                        <li class='sat'>23</li>--%>
<%--                        <li class='sun'>24</li>--%>
<%--                        <li>25</li>--%>
<%--                        <li>26</li>--%>
<%--                        <li>27</li>--%>
<%--                        <li>28</li>--%>
<%--                        <li>29</li>--%>
<%--                        <li class='sat'>30</li>--%>
<%--                        <li class='sun'>31</li>--%>
<%--                        <li class="off">1</li>--%>
<%--                        <li class="off">2</li>--%>
<%--                        <li class="off">3</li>--%>
<%--                        <li class="off">4</li>--%>
<%--                        <li class="off">5</li>--%>
<%--                        <li class="off">6</li>--%>
            		</ul>
            	</div>
            </div>
            <!--} 일정표 -->
            
            <!-- 상세일정 {-->
            <div id="Layer1" class="linkLayer" style="display:none;">
            	<font class="txt type28 tit" id="date"></font>
                <div class="detail_sc" id="scheduleDiv">
                	<span>
                    	<font class="time">02:00 PM</font>
                        <font class="sce">2024년 캠틱종합기술원 시무식 나래홀</font>
                    </span>
                	<span>
                    	<font class="time">04:00 PM</font>
                        <font class="sce">2024년 캠틱종합기술원 시무식 나래홀 test test test test test</font>
                    </span>
                	<span>
                    	<font class="time">06:00 PM</font>
                        <font class="sce">2024년 캠틱종합기술원 시무식 나래홀 test test test test test</font>
                    </span>
                </div>
            </div>
            <div id="Layer2" class="linkLayer" style="display:none;">
            	<font class="txt type28 tit">2024년 03월 22일</font>
                <div class="detail_sc">
                	<span>
                    	<font class="time">02:00 PM</font>
                        <font class="sce">2024년 캠틱종합기술원 시무식 나래홀</font>
                    </span>
                </div>
                
            </div>
			<script>
            function showLayer (X) {
               for (var i=0; i<25; i++)
               {
                  $("#Layer"+i).hide();
               }
               $("#Layer"+X).fadeIn(1000);
            }
            </script>
            <!--} 상세일정 -->
    		
<%--            <div class="btBox mt40"><a href="/m/schedule_write.do">글쓰기</a></div>--%>
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} schedule -->
    
    
<script type="text/javascript">
	$('.m4', $('#menu')).addClass('active');
	$('.t1', $('.sTabmenu')).addClass('active');
    mSchedule.fn_defaultScript();
</script>
    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
