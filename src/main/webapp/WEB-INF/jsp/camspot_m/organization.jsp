<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- organization {-->
    <div id="organization_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
    		
            <!-- 검색폼 {-->
            <div class="searchBox">
                <form>
                	<input type="text" placeholder="" />
                	<input type="submit" />
                </form>
            </div>
            <!--} 검색폼 -->
            
            <!-- 조직도 {-->
            <div class="orgBox mt40">
                <div class="org-1">
                	<span><img src="/images/camspot_m/ico-org1.png" /><font class="txt type28 fP800">캠틱종합기술원</font></span>
                
                    <div class="org-2">
                        <span><img src="/images/camspot_m/ico-org2.png" /><font class="txt type28 fP600">테스트부서</font></span>
                        
                        <div class="org-3">
                        	<a href="/m/organization_view.do"><font class="txt type26">경영지원팀</font></a>
                        </div>
                    </div>
                    
                    <div class="org-2">
                        <span><img src="/images/camspot_m/ico-org2.png" /><font class="txt type28 fP600">미래전략기획본부</font></span>
                        
                        <div class="org-3">
                        	<a href="#"><font class="txt type26">미래전략기획팀</font></a>
                        	<a href="#"><font class="txt type26">J-밸리혁신팀</font></a>
                        </div>
                    </div>
                    
                    <div class="org-2">
                        <span><img src="/images/camspot_m/ico-org2.png" /><font class="txt type28 fP600">R&amp;BD사업본부</font></span>
                        
                        <div class="org-3">
                        	<a href="#"><font class="txt type26">신기술융합팀</font></a>
                        	<a href="#"><font class="txt type26">제조혁신팀</font></a>
                        	<a href="#"><font class="txt type26">복합소재뿌리기술센터</font></a>
                        </div>
                    </div>
                    
                    <div class="org-2">
                        <span><img src="/images/camspot_m/ico-org2.png" /><font class="txt type28 fP600">기업성장지원본부</font></span>
                        
                        <div class="org-3">
                        	<a href="#"><font class="txt type26">창업/기업성장지원팀</font></a>
                        	<a href="#"><font class="txt type26">인재개발팀</font></a>
                        </div>
                    </div>
                    
                    <div class="org-2">
                        <span><img src="/images/camspot_m/ico-org2.png" /><font class="txt type28 fP600">일자리혁신지원센터</font></span>
                        
                        <div class="org-3">
                        	<a href="#"><font class="txt type26">일자리사업팀</font></a>
                        	<a href="#"><font class="txt type26">전북조선업도약팀</font></a>
                        	<a href="#"><font class="txt type26">익산고용안정팀</font></a>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <!--} 조직도 -->
    		
            
<%--        	<div class="btBox mt40"><a href="/m/organization_write.do">글쓰기</a></div>--%>
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} organization -->
        

<script type="text/javascript">
	$('.m3', $('#menu')).addClass('active');
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
