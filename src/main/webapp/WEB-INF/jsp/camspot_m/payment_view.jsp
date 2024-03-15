<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- payment {-->
    <div id="payment_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
        
            <!-- 버튼모음 {-->
            <div class="btWrap disF">
            	<a href="javascript:history.back()" class="back"><img src="/images/camspot_m/ico-back.png" /></a>
                <span class="pbtBox disF">
                	<a href="#" class="txt type26">결재</a>
                	<a href="#" class="txt type26">반려</a>
                	<a href="#" class="txt type26">의견보기</a>
                </span>
            </div>
            <!--} 버튼모음 -->
            
            <!-- 뷰 {-->
            <div class="PviewBox mt20">
            	<font class="txt type28"><b>문서정보</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-document.png" />[휴일근로신청서] 경영지원팀24-국민</a>
                </div>
                
            	<font class="txt type28 mt40"><b>첨부파일</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증1.jpg</a>
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>
                	
                </div>
                
            	<font class="txt type28 mt40"><b>본문</b></font>
                <div class="content_output mt10">
                	내용 출력
                </div>
            </div>
            <!--} 뷰 -->
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} payment -->
    
<script type="text/javascript">
	$('.m2', $('#menu')).addClass('active');
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
