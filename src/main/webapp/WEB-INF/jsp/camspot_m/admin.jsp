<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- admin {-->
    <div id="admin_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
        
            <!-- 로그인정보 {-->
            <div class="nameBox disF ac">
            	<div class="nameb">
            		<p><img src="/images/camspot_m/ico-man.png" /></p>
                	<span>
                    	<font class="txt type22">${loginVO.teamNm != '' ? loginVO.teamNm : loginVO.deptNm}</font>
                    	<font class="txt type30 fP800 mt10">${loginVO.name}</font>
                    </span>
                </div>
                <a href="/m/logoutAction" class="logout"><img src="/images/camspot_m/ico-logout.png" alt="로그아웃" /></a>
            </div>   
            <!--} 로그인정보 -->
        	    
            <!-- 알림설정 {-->
            <div class="notiSet mt20">
                
            	<font class="txt type28 fileBox"><b>알림설정</b></font>
                <div class="mt10">
                	<span>
                    	<input type="radio" id="check1" />
                        <label for="check1" class="txt type28">1</label>
                    </span>  
                	<span>
                    	<input type="radio" id="check2" />
                        <label for="check2" class="txt type28">2</label>
                    </span>
                </div>
            </div>
            <!--} 알림설정 -->
            
            <!-- 바로가기 {-->
            <div class="linkfBox mt20">
                
            	<font class="txt type28 fileBox"><b>바로가기</b></font>
                <div class="mt10">
                	<a href="#" target="_blank" class="link"><img src="/images/camspot_m/ico-link.png" />기업성장지원센터</a>
                	<a href="#" target="_blank" class="link"><img src="/images/camspot_m/ico-link.png" />법인 파일서버</a>
                	<a href="#" target="_blank" class="link"><img src="/images/camspot_m/ico-link.png" />데스크탑 페이지 이동</a>                	
                </div>
            </div>
            <!--} 바로가기 -->
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} admin -->
    
    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
