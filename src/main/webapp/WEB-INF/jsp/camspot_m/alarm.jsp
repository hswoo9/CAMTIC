<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_alarm.js?v=${today}"/></script>
    <!-- alarm {-->
    <div id="alarm_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
            
            <!-- 알림내용 {-->            
            <div class="oviewBox mt20" id="alarmListDiv">
            	<a href="#">
                    <font class="txt type18 time">2024-03-15 14:09</font>
                    <font class="txt type30 fP800 mt10 tit">[수입결의서] 테스트팀-관리자 testtesttesttest</font>
                    <font class="txt type22 mt10 cate">홈 > 전자결재</font>
                </a>
            	<a href="#">
                    <font class="txt type18 time">2024-03-15 14:09</font>
                    <font class="txt type30 fP800 mt10 tit">[수입결의서] 테스트팀-관리자 testtesttesttest</font>
                    <font class="txt type22 mt10 cate">홈 > 전자결재</font>
                </a>
            </div>
            <!--} 알림내용 -->

    	</div>   
    	<!--} content -->
                
    </div>
    <!--} alarm -->
<script>
    mAlarm.fn_defaultScript();
</script>
    
    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
