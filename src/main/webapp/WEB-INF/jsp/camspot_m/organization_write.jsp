<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

    <!-- organization {-->
    <div id="organization_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
           
            <!-- 글쓰기 {-->
            <form>
                <div class="bwriteBox">
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
                        <font class="txt type28 fP800">성명</font>
                        <input type="text" />
                    </span>
                    <span>
                        <font class="txt type28 fP800">직위</font>
                        <input type="text" />
                    </span>
                    <span>
                        <font class="txt type28 fP800">전화번호</font>
                        <input type="text" />
                    </span>
                    <span>
                        <font class="txt type28 fP800">핸드폰</font>
                        <input type="text" />
                    </span>
                    
                </div>
<%--                <div class="btBox mt40"><a href="#">글쓰기</a></div>--%>
            </form>
            <!--} 글쓰기 -->
        
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} organization -->
    
<script type="text/javascript">
	$('.m3', $('#menu')).addClass('active');
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
