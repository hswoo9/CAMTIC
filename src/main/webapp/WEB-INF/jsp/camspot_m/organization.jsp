<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/mobile/m_organization.js?v=${today}"/></script>
<style>
    .moveDept{
        cursor: pointer;
    }
</style>
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
            <div class="orgBox mt40" id="chartsDiv">

            </div>
            <!--} 조직도 -->
    		
            
<%--        	<div class="btBox mt40"><a href="/m/organization_write.do">글쓰기</a></div>--%>
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} organization -->
        

<script type="text/javascript">
    mOrg.fn_defaultScript(JSON.parse('${data}'));
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
