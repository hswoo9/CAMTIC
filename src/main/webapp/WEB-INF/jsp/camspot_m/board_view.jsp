<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- baord {-->
    <div id="baord_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
        
            <!-- 탭메뉴 {-->
            <div class="sTabmenu">
            	<a href="/m/board.do" class="t1">공지사항</a>
            	<a href="#" class="t2">업무보고</a>
            	<a href="#" class="t3">함께보아요</a>
            </div>
            <!--} 탭메뉴 -->
                        
            <!-- 뷰 {-->
            <div class="PviewBox mt20">
            
            	<div class="titBox">
                	<font class="txt type28 tit">2024년 캠틱종합기술원 재직자 교육훈련일정 안내 _ 2023.11.14</font>
                	<font class="txt type18 mt10"><i>작성자 : 관리자</i><i>작성일 : 2023-11-30</i><i>조회수 : 410</i></font>
                </div>
                    
                    
                
                <div class="content_output mt40">
                	내용 출력
                </div>
                
                
            	<font class="txt type28 mt40 fileBox"><b>첨부파일</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증1.jpg</a>
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>
                	
                </div>
            </div>
            <!--} 뷰 -->
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} baord -->
    
<script type="text/javascript">
	$('.m5', $('#menu')).addClass('active');
	$('.t1', $('.sTabmenu')).addClass('active');
</script>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
