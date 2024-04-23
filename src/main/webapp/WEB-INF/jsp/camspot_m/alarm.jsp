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
