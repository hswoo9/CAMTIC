<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<style>
#header,
#notBar{margin-bottom:40px;}
</style>


    <!-- main {-->
    <div id="main">
    
    	<!-- content {-->
    	<div id="content">
        
    		<!-- payment {-->
            <div id="payment" class="sec-1">
            	<font class="txt type30 fP700">결재현황</font>
                <div class="disF">
                	<span onclick="location.href='/m/payment.do'">
                    	<font class="txt type35 num fP800">${strStatus}</font>
                    	<font class="txt type24 con mt10 fP600">상신문서</font>
                    </span>
                	<span onclick="location.href='/m/payment_wait.do'">
                    	<font class="txt type35 num fP800">${waitStatus}</font>
                    	<font class="txt type24 con mt10 fP600">결재대기</font>
                    </span>
                	<span>
                    	<font class="txt type35 num fP800">${ckStatus}</font>
                    	<font class="txt type24 con mt10 fP600">승인함</font>
                    </span>
                </div>
            </div>
    		<!--} payment -->
            
    		<!-- schedule {-->
            <div id="schedule" class="sec-2">
            	<font class="txt type30 fP700 pl10">일정</font>
            	<font class="txt type22 fP200 pl10">schedule</font>
            
                <link rel="stylesheet" href="/css/camspot_m/swiper.css"/>
                <script src="/js/camspot_m/swiper.js"></script>
                <script src="/js/camspot_m/sch-main.js"></script>
                <div class="best-prd mt20">
                    <div class="goods_list">
                        <div class="goods_list_cont">
                            <div class="item_basket_type">
                                <ul>
                                	<li>
                                    	<a href="#" class="item_cont">
                                    		<font class="txt type18 date fP200">24.01.01 09:00 - <br>24.01.01 10:00</font>
                                            <font class="txt type24 tit fP700">2024년 캠틱종합기술원 시무식</font>
                                    	</a>
                                    </li>
                                	<li>
                                    	<a href="#" class="item_cont">
                                    		<font class="txt type18 date fP200">24.01.01 09:00 - <br>24.01.01 10:00</font>
                                            <font class="txt type24 tit fP700">2024년 1월 캠화지</font>
                                    	</a>
                                    </li>
                                	<li>
                                    	<a href="#" class="item_cont">
                                    		<font class="txt type18 date fP200">24.01.01 09:00 - <br>24.01.01 10:00</font>
                                            <font class="txt type24 tit fP700">2024년 캠틱종합기술원 시무식</font>
                                    	</a>
                                    </li>
                                	<li>
                                    	<a href="#" class="item_cont">
                                    		<font class="txt type18 date fP200">24.01.01 09:00 - <br>24.01.01 10:00</font>
                                            <font class="txt type24 tit fP700">2024년 캠틱종합기술원 시무식</font>
                                    	</a>
                                    </li>
                                	<li>
                                    	<a href="#" class="item_cont">
                                    		<font class="txt type18 date fP200">24.01.01 09:00 - <br>24.01.01 10:00</font>
                                            <font class="txt type24 tit fP700">2024년 1월 캠화지</font>
                                    	</a>
                                    </li>
                                                                  
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>        
                    <div class="swiper-scrollbar"></div>
                </div>
        
            </div>
    		<!--} schedule -->
                
    		<!-- board {-->
            <div id="board" class="sec-3">
        
                <ul class="disF jfs" id="tabMainMenu">
                    <li class="active"><a href="#tabMain-1"><font class="txt type28 fP700">공지사항</font></a></li>
                    <li><a href="#tabMain-2"><font class="txt type28 fP700">업무보고</font></a></li>
<%--                    <li><a href="#tabMain-3"><font class="txt type28 fP700">함께보아요</font></a></li>--%>
                </ul>
                
                <div class="tabMain-cont" id="tabMain-1" style="display:none;">            
                    <div class="mBoard">
                    	<a href="#">
                    		<font class="txt type24 tit">[43회차] 2024년 3월 캠-퍼스 공통학습(캠.화.지) 일정 안내(3.21) </font>
                    		<font class="txt type24 date">24.03.05</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">법인 직원 현황 업데이트(2024.03.04.)</font>
                    		<font class="txt type24 date">24.03.04</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">인사발령 공고(2024-05호)</font>
                    		<font class="txt type24 date">24.02.23</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">법인 직원 현황 업데이트(2024.02.22.)</font>
                    		<font class="txt type24 date">24.02.22</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">인사발령 공고(2024-04호)</font>
                    		<font class="txt type24 date">24.02.19</font>
                    	</a>
                    </div>                
                </div>
                <div class="tabMain-cont" id="tabMain-2" style="display:none;">            
                    <div class="mBoard">
                    	<a href="#">
                    		<font class="txt type24 tit">캠틱 주간업무 보고(24.03.18. ~ 24.03.22.)</font>
                    		<font class="txt type24 date">24.03.17</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">인사발령 공고(2024-07호)</font>
                    		<font class="txt type24 date">24.03.15</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">인사발령 공고(2024-06호)</font>
                    		<font class="txt type24 date">24.03.12</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">캠틱 주간업무 보고(24.03.11. ~ 24.03.15.)</font>
                    		<font class="txt type24 date">24.03.08</font>
                    	</a>
                    	<a href="#">
                    		<font class="txt type24 tit">2024년 2월 LEADERS 소통회의</font>
                    		<font class="txt type24 date">24.02.24</font>
                    	</a>
                    </div>                
                </div>
<%--                <div class="tabMain-cont" id="tabMain-3" style="display:none;">            --%>
<%--                    <div class="mBoard">--%>
<%--                    	<a href="#">--%>
<%--                    		<font class="txt type24 tit">함께보아요 1번 글 입니다. 함께보아요 1번 글 입니다. 함께보아요 1번 글 입니다. </font>--%>
<%--                    		<font class="txt type24 date">24.01.11</font>--%>
<%--                    	</a>--%>
<%--                    	<a href="#">--%>
<%--                    		<font class="txt type24 tit">함께보아요 2번 글 입니다. 함께보아요 2번 글 입니다. 함께보아요 2번 글 입니다. </font>--%>
<%--                    		<font class="txt type24 date">24.01.11</font>--%>
<%--                    	</a>--%>
<%--                    	<a href="#">--%>
<%--                    		<font class="txt type24 tit">함께보아요 3번 글 입니다. 함께보아요 3번 글 입니다. 함께보아요 3번 글 입니다. </font>--%>
<%--                    		<font class="txt type24 date">24.01.11</font>--%>
<%--                    	</a>--%>
<%--                    	<a href="#">--%>
<%--                    		<font class="txt type24 tit">함께보아요 4번 글 입니다. 함께보아요 4번 글 입니다. 함께보아요 4번 글 입니다. </font>--%>
<%--                    		<font class="txt type24 date">24.01.11</font>--%>
<%--                    	</a>--%>
<%--                    	<a href="#">--%>
<%--                    		<font class="txt type24 tit">함께보아요 5번 글 입니다. 함께보아요 5번 글 입니다. 함께보아요 5번 글 입니다. </font>--%>
<%--                    		<font class="txt type24 date">24.01.11</font>--%>
<%--                    	</a>--%>
<%--                    </div>                --%>
<%--                </div>              --%>
                <script>
                $(document).ready(function() {
                    // 처음 세팅
                    $(".tabMain-cont").hide();
                    $("#tabMainMenu li:first").addClass("active").show();
                    $("#tabMainMenu li:last").css("margin-right","0");
                    $(".tabMain-cont:first").show();
                
                
                    // 클릭 이벤트
                    $("#tabMainMenu li").click(function() {
                        
                        $("#tabMainMenu li").removeClass("active");

                        $(this).addClass("active");
                        $(".tabMain-cont").hide();
                
                
                        var activeTab = $(this).find("a").attr("href");
                        $(activeTab).show();
                        return false;
                    });
                
                });
                </script>                    
                  
            </div>
    		<!--} board -->
            
            
    	</div>   
    	<!--} content -->
             
    </div>
    <!--} main -->
    
    

<script type="text/javascript">
	$('.m1', $('#menu')).addClass('active');
</script>


<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
