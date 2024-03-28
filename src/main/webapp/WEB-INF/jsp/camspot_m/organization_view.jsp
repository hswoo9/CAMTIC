<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>
<style>
    #organization_page #dropdown_area .gnb_fml>div>a {
        padding-bottom: 20px;
        padding-left: 20px;
        font-weight: bold;
        text-align: left;
        position: relative;
    }


</style>
    <!-- organization {-->
    <div id="organization_page" class="sub">
    
    	<!-- content {-->
    	<div id="content">
        
            <!-- 뷰 {-->
            <div class="titBox">
            	<a href="javascript:history.back()" class="back"><img src="/images/camspot_m/ico-back.png" /></a>
        
                <script type="text/javascript" src="/js/camspot_m/dropdown.js"></script>
                <div id="dropdown_area">
                    <div class="gnb_fml">
                        <c:set var="flag" value="true"/>
                        <c:forEach items="${dept}" var="item" varStatus="status">
                            <c:choose>
                                <c:when test="${params.deptSeq eq item.DEPT_SEQ}">
                                    <a href="javascript:void(0)" class="txt type24">${item.DEPT_NAME}
                                        <svg viewBox="2154.216 131.6 8.1 4.6">
                                            <g transform="translate(1716.69 126)"><path d="M-1336.5,1100.2h8.1l-4,4.6Z" transform="translate(1774.026 -1094.6)"/></g>
                                        </svg>
                                    </a>
                                </c:when>
                                <c:otherwise>
                                    <c:if test="${flag}">
                                        <c:set var="flag" value="flase"/>
                                        <div style="height: 506px;overflow: auto;">
                                    </c:if>
                                    <a href="javascript:void(0)" onclick="moveToDeptEmpList(${item.DEPT_SEQ})" class="txt type22">${item.DEPT_NAME}</a>
                                    <c:if test="${status.count eq fn:length(dept)}">
                                        </div>
                                    </c:if>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </div>
                </div>
                        
            </div>
            <div class="oviewBox mt20">
                <c:forEach items="${rs}" var="item" varStatus="status">
                    <div class="disF">
                        <font class="num txt type26">${fn:length(rs) - status.index}</font>
                        <div>
                    	<span>
                			<font class="name fP800 txt type30">${item.EMP_NAME_KR}</font>
                			<font class="position txt type22">
                                <c:choose>
                                    <c:when test="${item.DUTY_NAME ne null and item.DUTY_NAME ne ''}">
                                        ${item.DUTY_NAME}
                                    </c:when>
                                    <c:when test="${item.POSITION_NAME ne null and item.POSITION_NAME ne ''}">
                                        ${item.POSITION_NAME}
                                    </c:when>
                                </c:choose>
                            </font>
                        </span>
                            <span class="mt10">
                			<font class="tel txt type22">${item.OFFICE_TEL_NUM}</font>
                			<font class="phone txt type22">${item.MOBILE_TEL_NUM}</font>
                        </span>
                        </div>
                    </div>
                </c:forEach>
<%--            	<div class="disF">--%>
<%--                	<font class="num txt type26">7</font>--%>
<%--                	<div>--%>
<%--                    	<span>--%>
<%--                            <font class="name fP800 txt type30">김나영</font>--%>
<%--                            <font class="position txt type22">주임행정원</font>--%>
<%--                        </span>--%>
<%--                        <span class="mt10">--%>
<%--                            <font class="tel txt type22">063-219-0305</font>--%>
<%--                            <font class="phone txt type22">010-9214-5616</font>--%>
<%--                        </span>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            	<div class="disF">--%>
<%--                	<font class="num txt type26">6</font>--%>
<%--                	<div>--%>
<%--                    	<span>--%>
<%--                            <font class="name fP800 txt type30">박정아</font>--%>
<%--                            <font class="position txt type22">책임행정원</font>--%>
<%--                        </span>--%>
<%--                        <span class="mt10">--%>
<%--                            <font class="tel txt type22">063-219-0324</font>--%>
<%--                            <font class="phone txt type22">010-4663-6399</font>--%>
<%--                        </span>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            	<div class="disF">--%>
<%--                	<font class="num txt type26">5</font>--%>
<%--                	<div>--%>
<%--                    	<span>--%>
<%--                            <font class="name fP800 txt type30">박형준</font>--%>
<%--                            <font class="position txt type22">책임행정원</font>--%>
<%--                        </span>--%>
<%--                        <span class="mt10">--%>
<%--                            <font class="tel txt type22">063-219-0334</font>--%>
<%--                            <font class="phone txt type22">010-5506-8162</font>--%>
<%--                        </span>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            	<div class="disF">--%>
<%--                	<font class="num txt type26">4</font>--%>
<%--                	<div>--%>
<%--                    	<span>--%>
<%--                            <font class="name fP800 txt type30">송은화</font>--%>
<%--                            <font class="position txt type22">팀장</font>--%>
<%--                        </span>--%>
<%--                        <span class="mt10">--%>
<%--                            <font class="tel txt type22">063-219-0335</font>--%>
<%--                            <font class="phone txt type22">010-5877-4379</font>--%>
<%--                        </span>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            	<div class="disF">--%>
<%--                	<font class="num txt type26">3</font>--%>
<%--                	<div>--%>
<%--                    	<span>--%>
<%--                            <font class="name fP800 txt type30">심형준</font>--%>
<%--                            <font class="position txt type22">선임행정원</font>--%>
<%--                        </span>--%>
<%--                        <span class="mt10">--%>
<%--                            <font class="tel txt type22">063-219-0309</font>--%>
<%--                            <font class="phone txt type22">010-6385-0886</font>--%>
<%--                        </span>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            	<div class="disF">--%>
<%--                	<font class="num txt type26">1</font>--%>
<%--                	<div>--%>
<%--                    	<span>--%>
<%--                            <font class="name fP800 txt type30">조승연</font>--%>
<%--                            <font class="position txt type22">주임행정원</font>--%>
<%--                        </span>--%>
<%--                        <span class="mt10">--%>
<%--                            <font class="tel txt type22">063-219-0349</font>--%>
<%--                            <font class="phone txt type22">010-8869-3582</font>--%>
<%--                        </span>--%>
<%--                    </div>--%>
<%--                </div>--%>
                
            </div>
            <!--} 뷰 -->
    		
        	
            
    	</div>   
    	<!--} content -->
                
    </div>
    <!--} organization -->
    
    
<script type="text/javascript">
	$('.m3', $('#menu')).addClass('active');
    function moveToDeptEmpList(e){
        location.href = '/m/organization_view.do?deptSeq=' + e;
    }
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
